---
type: paper
title: Trust Region Policy Optimization
aliases: [TRPO]
year: 2015
authors: [John Schulman, Sergey Levine, Pieter Abbeel, Michael Jordan, Philipp Moritz]
venue: ICML 2015
arxiv: "1502.05477"
line: 强化学习与对齐
matrix_coords: [—(RL基础设施), RL目标(在线), 有]
tags: [paper]
---

# TRPO（信赖域策略优化：给"别走坏"上保险）

## 1. 一句话贡献

用"新旧策略的 KL 散度 ≤ δ"约束每步更新，**第一次给深度 RL 的策略更新以理论保证**（性能下界不降的近似条件）——PPO 的直系祖先、信赖域思想进入 RL 的原点。

## 2. 核心贡献

- **代理目标+信赖域**：最大化 $\mathbb{E}[\rho_t \hat A_t]$（重要性比率 × 优势），约束 $\bar{D}_{KL}(\pi_{old}\Vert\pi_{new})\le\delta$——"在**行为变化不大**的范围内，找最好的改进方向"；
- **单调改进下界**：基于 Kakade & Langford 2002 的策略改进理论——新旧策略性能差 ≥ 代理目标 − KL 项×系数；小步保证不坏，无数小步累积成大进步；
- **自然梯度的实用化**：二阶近似下最优方向 $=F^{-1}\nabla J$（$F$=Fisher 信息矩阵）——共轭梯度迭代解线性方程、免去 $F^{-1}$ 显式求逆，线搜索回退保约束成立。

## 3. 方法概要

1. 当前策略 $\pi_{old}$ 采样一批轨迹；GAE 算优势 $\hat A_t$；
2. 代理目标线性化（在 $\pi_{old}$ 处：$\rho=1$）、KL 约束二次化（Fisher 矩阵）；
3. 共轭梯度求方向 $\Delta\theta\propto F^{-1}\nabla J$（约 10 次迭代）；
4. 回溯线搜索找满足 KL≤δ 的最大改进步；
5. 更新后**丢弃全部数据**重新采样（on-policy 严格性）——样本效率是它最大的痛。

## 4. 核心公式

$$\max_\theta\;\mathbb{E}_t\Big[\tfrac{\pi_\theta(a_t\mid s_t)}{\pi_{old}(a_t\mid s_t)}\,\hat A_t\Big]\qquad\text{s.t.}\qquad \mathbb{E}_t\big[\mathrm{KL}\big(\pi_{old}(\cdot\mid s_t)\,\Vert\,\pi_\theta(\cdot\mid s_t)\big)\big]\le\delta$$

**直觉解释（为什么要管 KL）**：策略梯度定理只在当前策略**附近**成立——步子一大，"沿这个方向走会更好"的保证就失效（高方差 × 大步 = 灾难）。KL 约束=**给策略的行为上了位移上限**：不管参数怎么动，新旧策略在每个状态下的动作分布不能差太多。自然方向的几何意义：在"分布空间"（而非参数空间）里量距离——参数空间走一小步可能对应行为剧变（Fisher 度量把这种病态校正掉）。

- 需要的前置：[[40-Concepts/策略梯度定理]]、[[40-Concepts/重要性采样]]（比率 $\rho$ 的来源）、[[40-Concepts/信赖域]]、[[40-Concepts/KL散度]]

## 5. 与前作/矩阵关系

- ← Kakade & Langford 2002（策略改进理论，近似不可直接用）→ TRPO 做成可跑的算法；
- ← 自然梯度（Amari 1998）→ 共轭梯度实现；
- → [[10-Papers/04-强化学习与对齐/Proximal Policy Optimization Algorithms（PPO）|PPO]]（一阶化简化版，工业界倒戈）；RLHF 的 KL 惩罚（防奖励模型被 exploit）= 信赖域思想的软化身。

## 6. 影响与后续

- "小步保证不坏"的哲学定型；PPO/GRPO 全家继承；
- 共轭梯度+Fisher 的实现复杂（二阶）是其被 PPO 取代的直接原因——**理论保证换工程简洁**的经典交易；
- 信赖域思想外溢：对齐中的 KL-to-reference、策略蒸馏中的分布约束。

## 7. 读前须知

- **必前置**：[[40-Concepts/策略梯度定理]]、[[40-Concepts/重要性采样]]、[[40-Concepts/KL散度]]、[[40-Concepts/信赖域]]；
- **易混点**：①KL 是对**每个状态的动作分布**算的（不是对轨迹）；②Fisher 矩阵≈KL 的二阶泰勒——两者在无穷小处等价、有限步是近似；③TRPO 无 KL 自适应机制（PPO 的 KL 版有）；
- **读法建议**：§3（理论推导，下界定理）→ 图 1（信赖域直觉图）→ 算法 1；共轭梯度细节可黑盒。

> 数学根基：[[30-Formulas/TRPO目标]] · [[40-Concepts/策略梯度定理]] · [[40-Concepts/KL散度]]
