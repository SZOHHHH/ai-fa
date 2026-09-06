---
type: paper
title: High-Dimensional Continuous Control Using Generalized Advantage Estimation
aliases: [GAE]
year: 2015
authors: [John Schulman, Philipp Moritz, Sergey Levine, Michael Jordan, Pieter Abbeel]
venue: arXiv 2015
arxiv: "1506.02438"
line: 强化学习与对齐
matrix_coords: [—(RL基础设施), RL目标(在线), 有]
tags: [paper]
---

# GAE（广义优势估计：偏差-方差之间的平滑旋钮）

## 1. 一句话贡献

用一个参数 $\lambda$ 在"蒙特卡洛（准而吵）"与"自举（稳而偏）"之间**连续滑动**地估计优势——策略梯度的方差-偏差权衡第一次有了平滑旋钮，从此成为策略梯度家族的标准配件（PPO/Dreamer/世界模型想象训练全在用）。

## 2. 核心贡献

- **GAE(γ, λ) 定义**：优势估计 = TD 误差的指数加权和 $\hat A_t=\sum_{l\ge0}(\gamma\lambda)^l\,\delta_{t+l}$；
- **λ 谱系**：λ=0 → 单步 TD（最低方差、依赖 critic 准确）/ λ=1 → 蒙特卡洛（无偏、方差爆炸）——**两个极端都是特例，中间连续可调**；
- **γ 与 λ 的分工**：γ 管"未来看到多远"（环境侧），λ 管"自举信多少"（估计侧）——两旋钮解耦后调参清晰化；
- 实证：连续控制上大降方差、提速收敛——从此"策略梯度+GAE"成套出现。

## 3. 方法概要

1. rollout 攒轨迹，critic（价值头）对每个状态出 $V(s_t)$；
2. 算每步 TD 误差 $\delta_t=r_t+\gamma V(s_{t+1})-V(s_t)$；
3. 沿轨迹向后指数加权累加：$\hat A_t=\delta_t+\gamma\lambda\,\delta_{t+1}+(\gamma\lambda)^2\delta_{t+2}+\dots$（**一行递推**：$\hat A_t=\delta_t+\gamma\lambda\hat A_{t+1}$——从尾往头一遍扫完）；
4. $\hat A_t$ 进策略梯度当权重；价值头对 $\hat A_t+V(s_t)$ 回归（λ-return 作 target）。

## 4. 核心公式

$$\hat A^{GAE}_t\;=\;\sum_{l=0}^{\infty}(\gamma\lambda)^l\,\delta_{t+l}\;=\;\big(1-\lambda\big)\sum_{n=1}^{\infty}\lambda^{n-1}\,\hat A^{(n)}_t,\qquad \delta_t=r_t+\gamma V(s_{t+1})-V(s_t)$$

**直觉解释**：n 步优势 $\hat A^{(n)}$（看 n 步真实奖励再自举）构成一个"看得越远越准但越吵"的谱；GAE=给这个谱做**指数平滑**（权重 $(1-\lambda)\lambda^{n-1}$，总 和=1）。记忆口诀：**λ=往后看多远打折多少**——折扣率 γλ 越大，远处的 TD 误差越能影响当前估计。为什么用 TD 误差当原料：每个 $\delta_t$ 天然是"新信息"（这一步的惊讶），把未来的惊讶按折扣记账到现在的动作头上——**功劳簿记法**。

- 需要的前置：[[40-Concepts/广义优势估计GAE]]（概念卡完整推导）、[[40-Concepts/TD误差与自举]]、[[40-Concepts/贝尔曼方程]]

## 5. 与前作/矩阵关系

- ← 统一了 Sutton 1988 的 TD(λ)（值估计侧的 λ 混合）与策略梯度——把"值函数的老工具"搬到"优势估计"上；
- 与 [[10-Papers/04-强化学习与对齐/Trust Region Policy Optimization（TRPO）|TRPO]] 同作者配套（TRPO 的优势就是 GAE 供的）；
- → [[10-Papers/04-强化学习与对齐/Proximal Policy Optimization Algorithms（PPO）|PPO]] 标配；→ 世界模型想象训练（Dreamer/DIAMOND 的 λ-return+V 收尾=同一谱系的 H 步截断版：梦里只演 H 步，尾部用 $V(s_H)$ 打包——**GAE 的"自举收尾"在梦里的化身**）。

## 6. 影响与后续

- RLHF 的 per-token 奖励+GAE 成为 LLM 训练默认（InstructGPT 起一脉相承）；
- "偏差-方差权衡"从此是 RL 论文标准讨论节；
- 局限：λ/γ 仍需调（虽平滑）；对 critic 误差敏感的域（λ 低时）需配 critic 预热。

## 7. 读前须知

- **必前置**：[[40-Concepts/贝尔曼方程]]、[[40-Concepts/TD误差与自举]]、[[40-Concepts/策略梯度定理]]、[[40-Concepts/期望]]；
- **易混点**：①γ 与 λ 是两个旋钮（折扣 vs 平滑），别混；②GAE 估的是**优势**不是价值（价值= $\hat A+V$ 顺手得到）；③TD(λ) 是 GAE 的值函数侧亲戚，别当成同一物；
- **读法建议**：正文短；§2-§3 的两个恒等式推导务必亲手推一遍；表 1（λ 扫描）看一眼感受谱系两端。

> 数学根基：[[40-Concepts/广义优势估计GAE]] · [[40-Concepts/TD误差与自举]] · [[30-Formulas/贝尔曼最优方程]]
