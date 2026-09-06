---
type: concept
aliases: [熵正则, 最大熵RL, max-entropy RL, 熵奖金, entropy regularization]
domain: 强化学习
tags: [concept]
---

# 熵正则 RL（最大熵目标）

## 1. 定义（直觉 → 形式）

**直觉**：在"赢"之外再发一份奖金——**你表现得越"不可预测"，奖金越高**。策略必须在"拿高分"和"保持随机"之间权衡：**任务目标 + 尽量随机地完成它**。

**形式**（把策略的熵直接加进目标）：

$$J_\eta(\pi)\;=\;\mathbb{E}\Big[\sum_t \big(r_t \;+\;\eta\,\mathcal{H}(\pi(\cdot\mid s_t))\big)\Big],\qquad \mathcal{H}(\pi)=-\sum_a\pi(a)\log\pi(a)$$

- $\eta$（温度）= 每一点"随机性"换多少分的汇率：$\eta\to 0$ 退化回普通 RL；$\eta$ 大→策略倾向均匀随机。
- 等价视角：**最大化 $\log\pi$ 的同时惩罚 $\log\pi$ 太尖**——softmax 输出别过早坍缩到单一动作。

## 2. 为什么值得花真金白银买随机性

| 收益 | 机理 |
|---|---|
| **探索** | 还没证明谁好之前，别把门全关上——熵阻止过早收敛 |
| **多模态** | 多条路都通向高分时，正则解是**混合策略**（各留概率），而不是挑一条死磕——这对多模态环境（对手可能左可能右）是本质保护 |
| **鲁棒/可迁移** | 随机最优策略对环境扰动更稳（最大熵 RL 与鲁棒控制有形式对应） |
| **训练稳定** | 概率不触零→对数不爆炸，梯度良态 |

## 3. 家族与系数

| 成员 | 形态 | 熵的地位 |
|---|---|---|
| **软 Q 学习 / SAC** | 把熵并进贝尔曼方程（软价值 $V=\mathbb{E}[Q]-\eta\log\pi$），off-policy + 随机 actor | 一等公民（目标的一部分，自动温度） |
| **A3C / PPO 系** | loss 末尾挂 $-\beta\,\mathcal{H}(\pi)$ 小项 | 二等公民（正则项，小系数） |
| 世界模型系（Dreamer/DIAMOND 的 AC） | 同上——小系数熵项（$10^{-3}$ 量级）挂进总 loss | 二等公民 |
| 离散 vs 连续 | 离散动作熵= categorical 熵直接算；连续动作=高斯微分熵 | |

一句话史：最大熵思想从**最大熵逆强化学习**（Ziebart 2010，解释人类行为为何"不抄近道死磕"）进入 RL，经软 Q 学习（2017）理论化，由 [[10-Papers/04-强化学习与对齐/Soft Actor-Critic- Off-Policy Maximum Entropy Deep Reinforcement Learning with a Stochastic Actor（SAC）|SAC]] 成为连续控制标配。

## 4. 易混点

- **熵正则 ≠ 温度参数**：熵正则是目标里的一项；[[40-Concepts/温度参数]]是 softmax/蒸馏里控制分布尖锐度的旋钮——名字常混，机制不同（虽然 SAC 的自动温度 α 确实在调"这一项多重"）。
- **熵 vs 探索噪声**：ε-greedy 是外面撒噪声（策略不变）；熵正则是把随机性**长进策略本身**（策略自己学会保留随机）。
- **加法合法性**：熵项并进目标后，策略梯度定理对**新目标**照常成立——它不是 trick，是换了一个（等价的）优化目标。

## 5. 与库内实体的关系

- ← 地基：[[40-Concepts/softmax函数]]（策略输出与熵的计算）、[[30-Formulas/交叉熵]]（$\mathcal{H}+\mathrm{KL}$ 语言同源）
- → 用户：[[10-Papers/04-强化学习与对齐/Soft Actor-Critic- Off-Policy Maximum Entropy Deep Reinforcement Learning with a Stochastic Actor（SAC）|SAC]]（一等公民版）、[[10-Papers/04-强化学习与对齐/Asynchronous Methods for Deep Reinforcement Learning（A3C）|A3C]]（二等公民版首挂）、[[30-Formulas/REINFORCE目标]]（未正则的裸目标对照）
- → 概念亲缘：[[40-Concepts/策略梯度定理]]（"换目标重跑定理"的合法性来源）
