---
type: concept
aliases: [softmax函数, softmax, 归一化指数函数]
domain: 数学基础
tags: [concept]
---

# softmax 函数

## 1. 定义（直觉 → 形式）

**直觉**：把一列任意分数变成"和为 1 的正数概率"——分数高的占比大，但不会归零其他。像加权投票：赢家多拿，输家也有份。

**形式**：
$$\mathrm{softmax}(z)_i = \frac{\exp(z_i)}{\sum_{j=1}^{n} \exp(z_j)}$$
输出恒正、和为 1。带温度 $$\tau$$ 版：$$\mathrm{softmax}(z_i/\tau)$$——$$\tau$$ 小 → 越接近 argmax（尖锐）；$$\tau$$ 大 → 越接近均匀。

## 2. 数学形式

- **数值稳定实现**：减最大值 $$\mathrm{softmax}(z)_i = \frac{e^{z_i - \max z}}{\sum_j e^{z_j - \max z}}$$（数学等价、防溢出）
- **梯度**：$$\frac{\partial p_i}{\partial z_j} = p_i(\delta_{ij} - p_j)$$——简洁的雅可比结构
- **与 log 配对**：$$\log\mathrm{softmax}$$ 数值稳定（logsumexp 技巧），交叉熵损失的标准实现
- **与 [Bradley-Terry模型](/ai-fa/explore/40-Concepts/Bradley-Terry模型) 同构**：BT 偏好概率就是两选项的 softmax，也即 [sigmoid函数](/ai-fa/explore/40-Concepts/sigmoid函数)（sigmoid = 二类 softmax 的差分形式）
- **与 [能量模型](/ai-fa/explore/40-Concepts/能量模型) 玻尔兹曼分布同构**：softmax = 能量的玻尔兹曼归一化（离散版）——统计物理、RL 决策、注意力共享同一数学

## 教程：三个分数手算 + 梯度结构现场

**第 1 步：手算。** $$z = (2,\ 1,\ 0)$$：$$e^z = (7.39,\ 2.72,\ 1.00)$$，和 $$=11.11$$，$$p = (0.665,\ 0.245,\ 0.090)$$——**赢家通吃但输家有份**。

**第 2 步：数值稳定版验证平移不变。** 全减 max=2：$$z'=(0,\ -1,\ -2)$$，$$e^{z'}=(1,\ 0.37,\ 0.14)$$，和 $$=1.51$$，$$p=(0.665,\ 0.245,\ 0.090)$$ ✓ 分毫不差——**减 max 是纯防御**（原式 $$e^{200}$$ 会溢出为 inf）。

**第 3 步：梯度结构（训练时的性格）。** $$\partial p_i/\partial z_j = p_i(\delta_{ij} - p_j)$$：
- 对角（$$i{=}j{=}1$$）：$$0.665\times(1-0.665)=0.223$$（正——推自己）
- 非对角（$$i{=}1, j{=}2$$）：$$0.665\times(-0.245)=-0.163$$（负——压别人）
- **读法**：softmax 是零和的——赢家涨必有输家跌；这与"one-hot 标签+交叉熵"绝配（梯度 $$p - y$$ 的简洁结局来源，[交叉熵](/ai-fa/explore/30-Formulas/交叉熵) §教程第 3 步）。

**第 4 步：温度族一眼看清。** $$\tau=0.5$$：$$p=(0.867, 0.117, 0.016)$$（尖）；$$\tau=2$$：$$(0.506, 0.307, 0.186)$$（平）——完整手算见 [温度参数](/ai-fa/explore/40-Concepts/温度参数) §教程（同一组数字）。

**第 5 步：它在库内的四个身份。** 分类出口（LM 头）/注意力权重（[注意力核心公式](/ai-fa/explore/30-Formulas/注意力核心公式)）/玻尔兹曼决策（[能量模型](/ai-fa/explore/40-Concepts/能量模型)）/偏好概率 K=2 特例（[Bradley-Terry模型](/ai-fa/explore/40-Concepts/Bradley-Terry模型)）——**一个函数撑起四处江山**，全因"任意分数→合法分布"是机器学习的永恒需求。

## 3. 为什么 AI 需要它

| 出现场景 | 用法 |
|---|---|
| [注意力机制](/ai-fa/explore/40-Concepts/注意力机制) | 相关系数 → 注意力权重 |
| 语言模型输出层 | logits → 下一个 token 的概率分布 |
| [DPO损失](/ai-fa/explore/30-Formulas/DPO损失) | $$\log\sigma$$ 的 sigmoid 是两选项 softmax 特例（[sigmoid函数](/ai-fa/explore/40-Concepts/sigmoid函数)） |
| 策略离散化 | RL 离散动作的策略头 |
| MoE 路由 | Soft MoE 的专家加权（[混合专家（MoE）](/ai-fa/explore/20-Algorithms/混合专家（MoE）)） |

## 4. 常见误区

- **误区**：softmax 输出"概率"就代表模型置信度——校准问题是独立课题
- **误区**：温度只是工程 trick——它出现在 RLHF 采样策略、知识蒸馏（KD 用高温软化）等理论位置
- **误区**：softmax 平移不变（全加同一常数不变）——真，这也是数值稳定实现的依据

## 5. 自测

1. $$z=(3,3,3)$$ 的输出？（$$(1/3, 1/3, 1/3)$$——平移不变外：全同分必均匀）
2. 数值稳定实现减 max 后第 2 步验证了什么？（概率不变——softmax 平移不变的直接推论）
3. 梯度的零和性怎么读？（$$\sum_i \partial p_i/\partial z_j = 0$$——所有概率和恒 1，一方涨各方跌）
4. K=2 时 softmax 与 sigmoid 的换算？（$$\mathrm{softmax}(z_1,z_2)=(\sigma(z_1-z_2),\ \sigma(z_2-z_1))$$——只对差敏感）

## 6. 相关概念

- [能量模型](/ai-fa/explore/40-Concepts/能量模型)：连续版玻尔兹曼
- [Bradley-Terry模型](/ai-fa/explore/40-Concepts/Bradley-Terry模型)：二选项特例
- [sigmoid函数](/ai-fa/explore/40-Concepts/sigmoid函数)：K=2 时的差分形式
- [独热编码（One-Hot）](/ai-fa/explore/40-Concepts/独热编码（One-Hot）)：采样/argmax 的出口形态
- [梯度](/ai-fa/explore/40-Concepts/梯度)：雅可比结构
