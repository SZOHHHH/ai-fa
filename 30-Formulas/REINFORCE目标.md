---
type: formula
aliases: [REINFORCE目标, 最简策略梯度, REINFORCE Objective]
domain: 数学基础
loss_type: expectation-of-ratio
tags: [concept]
---

# REINFORCE 目标（最简策略梯度）

> 本页按公式页标准写（虽归在概念区，因为是 RL 线公式的起点）。

## 1. 标准形式

$$\nabla_\theta J(\theta) = \mathbb{E}_{\tau \sim \pi_\theta}\!\left[ \sum_t \nabla_\theta \log \pi_\theta(a_t \mid s_t)\, G_t \right]$$
或带基线版：
$$\nabla_\theta J(\theta) = \mathbb{E}\!\left[ \nabla_\theta \log \pi_\theta(a_t \mid s_t)\, (G_t - b(s_t)) \right]$$

## 2. 表示对照表

| 表示名 | 公式核心 | 出处 | 说明 |
|---|---|---|---|
| 轨迹回报版 | $\nabla\log p(\tau) G(\tau)$ | Williams 1992 | 原始 REINFORCE |
| 带基线版 | $G_t - b(s_t)$ | Williams 1992 | 方差缩减 |
| 优势版 | $A_t$（[[40-Concepts/贝尔曼方程]]） | Actor-Critic 谱系 | 现代默认 |

## 3. 直觉解释

- 每条轨迹结束后，按总回报"奖惩"全程每个动作的对数概率
- **为什么是 log**：$\nabla p = p \nabla\log p$（[[40-Concepts/RL中的log导数技巧]]），采样被拆出梯度外
- **致命弱点**：单轨迹回报 $G_t$ 方差巨大——催生基线 → critic → GAE → 信赖域 → 裁剪整条演进线
- `#loss/expectation-of-ratio` 族（log-概率加权期望）

## 4. 出处

| 论文 | 贡献 |
|---|---|
| Williams, "Simple Statistical Gradient-Following Algorithms..."（1992） | 提出 |
| [[10-Papers/04-强化学习与对齐/Trust Region Policy Optimization（TRPO）]] | 稳定化起点 |

## 5. 数学概念分解

[[40-Concepts/RL中的log导数技巧]]、[[40-Concepts/马尔可夫决策过程]]、[[40-Concepts/期望]]

## 6. 与其他公式的关系

- → **演进为** [[30-Formulas/TRPO目标]]（+信赖域）→ [[30-Formulas/PPO裁剪目标]]（+裁剪）
- → **另一支** [[30-Formulas/GRPO目标]]（+组内相对优势）
- 与 [[40-Concepts/策略梯度定理]] 互为"实例/定理"
