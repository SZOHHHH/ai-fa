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
输出恒正、和为 1。带温度 $\tau$ 版：$\mathrm{softmax}(z_i/\tau)$——$\tau$ 小 → 越接近 argmax（尖锐）；$\tau$ 大 → 越接近均匀。

## 2. 数学形式

- **数值稳定实现**：减最大值 $\mathrm{softmax}(z)_i = \frac{e^{z_i - \max z}}{\sum_j e^{z_j - \max z}}$（数学等价、防溢出）
- **梯度**：$\frac{\partial p_i}{\partial z_j} = p_i(\delta_{ij} - p_j)$——简洁的雅可比结构
- **与 log 配对**：$\log\mathrm{softmax}$ 数值稳定（logsumexp 技巧），交叉熵损失的标准实现
- **与 [[40-Concepts/Bradley-Terry模型]] 同构**：BT 偏好概率就是两选项的 softmax
- **与 [[40-Concepts/能量模型]] 玻尔兹曼分布同构**：softmax = 能量的玻尔兹曼归一化（离散版）——统计物理、RL 决策、注意力共享同一数学

## 3. 为什么 AI 需要它

| 出现场景 | 用法 |
|---|---|
| [[40-Concepts/注意力机制]] | 相关系数 → 注意力权重 |
| 语言模型输出层 | logits → 下一个 token 的概率分布 |
| [[30-Formulas/DPO损失]] | $\log\sigma$ 的 sigmoid 是两选项 softmax 特例 |
| 策略离散化 | RL 离散动作的策略头 |
| MoE 路由 | Soft MoE 的专家加权（[[20-Algorithms/混合专家（MoE）]]） |

## 4. 常见误区

- **误区**：softmax 输出"概率"就代表模型置信度——校准问题是独立课题
- **误区**：温度只是工程 trick——它出现在 RLHF 采样策略、知识蒸馏（KD 用高温软化）等理论位置
- **误区**：softmax 平移不变（全加同一常数不变）——真，这也是数值稳定实现的依据

## 5. 相关概念

- [[40-Concepts/能量模型]]：连续版玻尔兹曼
- [[40-Concepts/Bradley-Terry模型]]：二选项特例
- [[40-Concepts/梯度]]：雅可比结构
