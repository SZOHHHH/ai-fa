---
type: formula
formula_id: ROPE-EXT
aliases: [RoPE外推, 位置插值, PI, NTK-RoPE, YaRN, 上下文扩展]
domain: 长上下文
tags: [formula]
---

# RoPE 上下文扩展（PI / NTK / YaRN）

## 1. 标准形式

**位置插值 PI**（Microsoft, 2023）——把位置压回训练范围：
$$\tilde m = \frac{L_{\text{train}}}{L_{\text{target}}}\, m \qquad \text{(如 } 2\text{M} \to 8\text{M: 位置缩到 }1/4\text{)}$$
代入 [RoPE旋转位置编码](/ai-fa/explore/30-Formulas/RoPE旋转位置编码)：$$R_{\tilde m \theta_i}$$——用训练见过的角度表示更长序列。

**NTK-aware 缩放**——改基频而非线性压位置：
$$\theta_i' = \text{base}'^{-2i/d}, \qquad \text{base}' = \text{base} \times s^{d/(d-2)} \quad (s = L_{\text{target}}/L_{\text{train}})$$
高频（短程）几乎不动、低频（长程）外推——"直觉：秒针照常，时针变慢"。

**YaRN**：NTK + 注意力温度修正 $$t = 0.1\ln s + 1$$（softmax logits 除以 $$t$$）+ 渐进式外推调度。

## 2. 表示对照表

| 方法 | 核心操作 | 训练需求 | 出处 |
|---|---|---|---|
| 直接外推 | 什么都不做 | 0 | （基线，灾难性退化） |
| PI（线性插值） | $$m \to m/s$$ | ~1000 步微调 | [Extending Context Window of Large Language Models via Positional Interpolation](/ai-fa/explore/10-Papers/06-长上下文/Extending Context Window of Large Language Models via Positional Interpolation（PI）) |
| NTK-RoPE | base $$\times s^{d/(d-2)}$$ | 可 0-shot | 社区（Bowen Peng） |
| YaRN | NTK + 温度 + 渐进调度 | ~400 步 | [YaRN - Efficient Context Window Extension of Large Language Models](/ai-fa/explore/10-Papers/06-长上下文/YaRN- Efficient Context Window Extension of Large Language Models（YaRN）) |
| CLEX / LongRoPE 等 | 非均匀插值、进化搜索 | 各异 | 2023–24 |

## 教程：s=4 外推的三种手术（频率谱全程手算）

**第 0 步：设定。** 训练窗 $$L_{\text{train}}=4096$$，目标 $$L_{\text{target}}=16384$$（$$s=4$$）；$$d_k=128$$ → 64 对频率，$$\theta_i = 10000^{-i/64}$$。

**第 1 步：先看懂频率谱。** 最快对 $$\theta_0 = 1$$（每步转 1 弧度——"秒针"）；最慢对 $$\theta_{63} = 10000^{-63/64} \approx 1.16\times10^{-4}$$（约 8600 步才转一圈——"时针"）。训练时位置最大 4095：时针最大转角 $$= 4095\times1.16\times10^{-4} \approx 0.47$$ 弧度——**训练只见过时针转到 0.47 弧度**。

**第 2 步：直接外推为什么崩。** 位置 $$m=8000$$ 的时针转角 $$= 8000\times1.16\times10^{-4} = 0.93$$ 弧度——**超出训练见过的 $$[0, 0.47]$$ 近一倍**。慢频道（负责远程对齐）读到没见过的角度 → 分布偏移 → 远程注意力乱套。

**第 3 步：PI 线性插值。** $$\tilde m = m/4$$：位置 8000 压回 2000，时针转角 $$= 2000\times1.16\times10^{-4} = 0.23$$ ✓ 回到熟区。**代价**：秒针对的相邻 token 角差从 1 弧度压到 0.25 弧度——**局部分辨力全频道稀释 4 倍**（相邻词序变得难分），需 ~1000 步微调找补。

**第 4 步：NTK-aware 改基频。** $$\text{base}' = 10000\times4^{128/126} = 10000\times4.09 \approx 40900$$。重算两极：秒针 $$\theta_0 = \text{base}^0 = 1$$ **与 base 无关、分毫不动**；时针 $$\theta_{63}' = 40900^{-63/64} \approx 2.89\times10^{-5}$$——**恰好放慢 4.0 倍**（$$1.16\times10^{-4} \div 2.89\times10^{-5} = 4.00$$）。位置 8000 的新时针转角 $$= 8000\times2.89\times10^{-5} = 0.23$$ ✓ 同样回到熟区，但**秒针没碰**——局部分辨力零损失。

**第 5 步：YaRN 补温度。** 上下文变长 → 每 token 被更多邻居注意 → 注意力分布整体变尖（熵漂移）。$$t = 0.1\ln 4 + 1 = 1.14$$，logits 除以 1.14 轻轻压平——修的就是这个次生漂移（与 [温度参数](/ai-fa/explore/40-Concepts/温度参数) 同一旋钮）。

**读法总结**：PI = 全频道均匀压；NTK = 保高频、放低频（放慢倍数从 1 渐变到 $$s$$）；YaRN = NTK + 注意力熵修正。

## 3. 直觉解释

- **为什么直接外推会崩**：RoPE 频率 $$\theta_i$$ 是为 $$[0, L]$$ 设计的——训练没见过的角度（高频转过头、低频进欠采样区）分布偏移
- **PI 的代价**：均匀压缩把高频（局部位置关系）也压了——相邻 token 的区分度下降（NTK 修的就是这）
- **频率谱视角**（理解三方法的钥匙）：低频通道编码"绝对位置"、高频通道编码"局部顺序"。**保高频、放低频**=NTK；**全压**=PI；**温度补注意力分布漂移**=YaRN 的补充
- YaRN 的温度项与 [温度参数](/ai-fa/explore/40-Concepts/温度参数) 家族再次同构——softmax 尺度修正是万能钥匙

## 4. 出处

| 论文 | 贡献 |
|---|---|
| [Extending Context Window of Large Language Models via Positional Interpolation](/ai-fa/explore/10-Papers/06-长上下文/Extending Context Window of Large Language Models via Positional Interpolation（PI）) | PI 首个系统方案 |
| [YaRN - Efficient Context Window Extension of Large Language Models](/ai-fa/explore/10-Papers/06-长上下文/YaRN- Efficient Context Window Extension of Large Language Models（YaRN）) | NTK+温度统一框架 |

## 5. 数学概念分解

- [RoPE旋转位置编码](/ai-fa/explore/30-Formulas/RoPE旋转位置编码)：手术对象
- [位置编码](/ai-fa/explore/40-Concepts/位置编码)：频率谱视角
- [温度参数](/ai-fa/explore/40-Concepts/温度参数)：YaRN 的 t 项
- [softmax函数](/ai-fa/explore/40-Concepts/softmax函数)：温度作用处

## 6. 自测

1. $$s=4$$、$$d_k=128$$ 时 NTK 的 base' 是多少？（$$10000\times4^{128/126}\approx40900$$——指数 $$d/(d-2)$$ 使最慢频道恰好放慢 $$s$$ 倍）
2. PI 与 NTK 对"秒针"（最快频道）各做了什么？（PI 压 4 倍伤局部分辨；NTK 不动——$$\theta_0 = \text{base}^0 = 1$$ 与 base 无关）
3. YaRN 温度 $$t$$ 修什么？（长上下文注意力熵漂移——更多 token 分注意力使分布变尖；$$t = 0.1\ln s + 1 = 1.14$$ 压回）
4. 直接外推崩在哪一极？（慢频道：位置超界使时针转角 0.93 弧度、超出训练见过的 0.47——远程对齐失效）

## 7. 与其他公式的关系

- → **改造** [RoPE旋转位置编码](/ai-fa/explore/30-Formulas/RoPE旋转位置编码)（不改架构只改频率/位置）
- → **作用于** [注意力核心公式](/ai-fa/explore/30-Formulas/注意力核心公式) 的打分项
- 与 [注意力计算复杂度](/ai-fa/explore/30-Formulas/注意力计算复杂度) 的两条战线互补：外推解决"位置编码没见过"，稀疏/线性注意力解决"算不起"——长上下文问题的两个正交维度
