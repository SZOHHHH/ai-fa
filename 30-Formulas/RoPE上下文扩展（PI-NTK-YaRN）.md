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
代入 [[30-Formulas/RoPE旋转位置编码]]：$R_{\tilde m \theta_i}$——用训练见过的角度表示更长序列。

**NTK-aware 缩放**——改基频而非线性压位置：
$$\theta_i' = \text{base}'^{-2i/d}, \qquad \text{base}' = \text{base} \times s^{d/(d-2)} \quad (s = L_{\text{target}}/L_{\text{train}})$$
高频（短程）几乎不动、低频（长程）外推——"直觉：秒针照常，时针变慢"。

**YaRN**：NTK + 注意力温度修正 $t = 0.1\ln s + 1$（softmax logits 除以 $t$）+ 渐进式外推调度。

## 2. 表示对照表

| 方法 | 核心操作 | 训练需求 | 出处 |
|---|---|---|---|
| 直接外推 | 什么都不做 | 0 | （基线，灾难性退化） |
| PI（线性插值） | $m \to m/s$ | ~1000 步微调 | [[10-Papers/06-长上下文/Extending Context Window of Large Language Models via Positional Interpolation（PI）]] |
| NTK-RoPE | base $\times s^{d/(d-2)}$ | 可 0-shot | 社区（Bowen Peng） |
| YaRN | NTK + 温度 + 渐进调度 | ~400 步 | [[10-Papers/06-长上下文/YaRN- Efficient Context Window Extension of Large Language Models（YaRN）]] |
| CLEX / LongRoPE 等 | 非均匀插值、进化搜索 | 各异 | 2023–24 |

## 3. 直觉解释

- **为什么直接外推会崩**：RoPE 频率 $\theta_i$ 是为 $[0, L]$ 设计的——训练没见过的角度（高频转过头、低频进欠采样区）分布偏移
- **PI 的代价**：均匀压缩把高频（局部位置关系）也压了——相邻 token 的区分度下降（NTK 修的就是这）
- **频率谱视角**（理解三方法的钥匙）：低频通道编码"绝对位置"、高频通道编码"局部顺序"。**保高频、放低频**=NTK；**全压**=PI；**温度补注意力分布漂移**=YaRN 的补充
- YaRN 的温度项与 [[40-Concepts/温度参数]] 家族再次同构——softmax 尺度修正是万能钥匙

## 4. 出处

| 论文 | 贡献 |
|---|---|
| [[10-Papers/06-长上下文/Extending Context Window of Large Language Models via Positional Interpolation（PI）]] | PI 首个系统方案 |
| [[10-Papers/06-长上下文/YaRN- Efficient Context Window Extension of Large Language Models（YaRN）]] | NTK+温度统一框架 |

## 5. 数学概念分解

- [[30-Formulas/RoPE旋转位置编码]]：手术对象
- [[40-Concepts/位置编码]]：频率谱视角
- [[40-Concepts/温度参数]]：YaRN 的 t 项
- [[40-Concepts/softmax函数]]：温度作用处

## 6. 与其他公式的关系

- → **改造** [[30-Formulas/RoPE旋转位置编码]]（不改架构只改频率/位置）
- → **作用于** [[30-Formulas/注意力核心公式]] 的打分项
- 与 [[30-Formulas/注意力计算复杂度]] 的两条战线互补：外推解决"位置编码没见过"，稀疏/线性注意力解决"算不起"——长上下文问题的两个正交维度
