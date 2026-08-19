---
type: algo
aliases: [DPO系, 直接偏好优化, Direct Preference Optimization, 偏好优化家族]
line: 强化学习与对齐
tags: [algo]
---

# DPO 系（离线偏好优化家族）

## 1. 定义

**非数学语言**：RLHF 的三步流程（打分模型→强化学习）太贵太玄。DPO 发现：RLHF 目标的最优解有闭式公式，把"奖励"用"策略自身的对数概率"表达出来，**直接在偏好数据上做监督学习**就等价于做完了 RL——省掉奖励模型和在线采样。

**数学语言**：由 [[30-Formulas/RLHF目标]] 的闭式解反解 $r = \beta\log\frac{\pi}{\pi_{\text{ref}}} + \beta\log Z$，代入 [[40-Concepts/Bradley-Terry模型]] 偏好似然（$Z$ 在成对差分中抵消），得 [[30-Formulas/DPO损失]]。

## 2. 本命论文群（家族演进——正是"每个后者优化前者"的范例）

| 论文 | 优化了前作的什么 | 年份 |
|---|---|---|
| [[10-Papers/04-强化学习与对齐/Direct Preference Optimization- Your Language Model is Secretly a Reward Model（DPO）]] | （起点）RLHF 闭式化，去 RM 去 RL | 2023 |
| [[10-Papers/04-强化学习与对齐/A General Theoretical Paradigm to Understand Learning from Human Preferences（IPO）]] | 修 DPO 过优化病：sigmoid→平方回归（有界目标） | 2023 |
| [[10-Papers/04-强化学习与对齐/KTO- Model Alignment as Prospect Theoretic Optimization（KTO）]] | 改数据形态：成对比较→单标签好坏（前景理论加权） | 2024 |
| [[10-Papers/04-强化学习与对齐/ORPO- Monolithic Preference Optimization without Reference Model（ORPO）]] | 去参考模型 + 单阶段（SFT 与偏好合一，odds 比率） | 2024 |
| [[10-Papers/04-强化学习与对齐/SimPO- Simple Preference Optimization with a Reference-Free Reward（SimPO）]] | 去参考 + 长度归一化 + 目标间距 γ | 2024 |

**演进的三条主轴**：①损失形式修正（IPO）②数据假设放宽（KTO）③流程与资源简化（ORPO/SimPO）——同一基础公式上的三条独立优化线。

## 3. 核心公式

- [[30-Formulas/DPO损失]]（母公式）→ [[30-Formulas/IPO损失]] / [[30-Formulas/KTO损失]] / [[30-Formulas/ORPO损失]] / [[30-Formulas/SimPO损失]]

## 4. 数学概念分解

[[40-Concepts/Bradley-Terry模型]]（家族共同地基）、[[40-Concepts/KL散度]]（β 的意义）、[[40-Concepts/梯度]]（DPO 的自适应梯度权重）

## 5. 变体与演进

见 §2 表——家族本身就是变体表。

## 6. 对比表

| 算法 | 参考模型 | 数据形态 | 损失类型 | 独特机制 |
|---|---|---|---|---|
| DPO | 要 | 成对 $(y^+,y^-)$ | `#loss/expectation-of-ratio` | 闭式隐式奖励 |
| IPO | 要 | 成对 | `#loss/regression` | 有界回归目标 $\frac{1}{2\beta}$ |
| KTO | 要 | **单标签** good/bad | `#loss/expectation-of-ratio` | 前景理论非对称权重 |
| ORPO | **不要** | 成对 | `#loss/expectation-of-ratio` | 单阶段 SFT+偏好，odds 比率 |
| SimPO | **不要** | 成对 | `#loss/expectation-of-ratio` | 长度归一 + margin γ |

**记忆锚点**：带 I 的修理论（IPO），带 K 的改数据（KTO），带 O/R 的去参考或单阶段（ORPO），带 Sim 的做减法（SimPO）。
