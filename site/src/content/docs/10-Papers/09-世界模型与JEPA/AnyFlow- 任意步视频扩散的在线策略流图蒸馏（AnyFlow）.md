---
type: paper
title: "AnyFlow: Any-Step Video Diffusion Model with On-Policy Flow Map Distillation"
aliases: [AnyFlow]
year: 2026
authors: [Yuchao Gu, Guian Fang, Yuxin Jiang, Weijia Mao, Song Han, Han Cai]
venue: arXiv 2026-05（NVIDIA）
arxiv: "2605.13724"
pdf: 已下载（PDF/AnyFlow（任意步流图蒸馏）.pdf）
line: 世界模型与JEPA
matrix_coords: [蒸馏加速(任意步流图), 显式像素, 可操作(动作条件)]
tags: [paper]
---

# AnyFlow（NVIDIA）：任意步数蒸馏——从"终点一致"到"流图转移"

## 1. 一句话贡献

**第一个 any-step 视频扩散蒸馏框架**：把蒸馏目标从"终点一致性"（$$z_t \to z_0$$）换成**任意区间的流图转移**（$$z_t \to z_r$$），单一模型在 1 步到多步全预算内都能打——且用 **Flow Map Backward Simulation 做在线策略（on-policy）蒸馏**，同时压少步离散误差与因果生成中的曝光偏差。

## 2. 核心贡献

- **终点一致 → 流图转移**：一致性蒸馏把 PF-ODE 轨迹替换成"一致性采样轨迹"，**多给步数反而退化**（test-time scaling 失效）；流图转移学的是 ODE 的**任意段**，步数越多越准（恢复了 test-time scaling）；
- **Flow Map Backward Simulation（本卡核心）**：把整条 Euler rollout 分解为若干 shortcut 流图转移做**on-policy 蒸馏**——学生沿自己当前轨迹训练，**压 exposure bias**（因果生成里学生吃自己输出导致 train/test 分布错位）；
- **规模验证**：双向与因果两种架构 × 1.3B~14B（Wan2.1 四变体），few-step 追平/超一致性系，且随步数继续涨。

## 3. 方法概要

1. 学生学 $$\Phi(z_t, t, r)$$：从时刻 t 的噪声态直接映射到任意中间时刻 r（覆盖 t→0 的所有段）；
2. 反向模拟：从终点回推，把一次长 rollout 拆成一串短转移——学生**用自己的 rollout 状态**（on-policy）作为蒸馏起点；
3. 任意步推理：预算 1 步=一次直达，预算 k 步=k 段拼接——同一个模型。

## 4. 核心公式

流图转移目标：

`$$\mathcal{L} = \mathbb{E}\big[\big\lVert \Phi_\theta(z_t,\,t,\,r) - z_r^{teacher} \big\rVert^2\big]$$`，$$r \sim \mathcal{U}[0, t]$$

**直觉解释**：一致性蒸馏=只教"任意起点直达终点"（一步跳）；流图=教"任意两站之间的直达车"——覆盖全部区间，拼几段就是多步。**on-policy 采样起点=学生跑自己轨迹再回站补票**——**与我们闭环 EMDMD 的思想同源**（我们的尸检结论"学生只在自己分布上工作，就该在自己分布上训"，他们的表述是 exposure bias 的 on-policy 修正）。

## 5. 与前作/矩阵关系

- ← 一致性蒸馏（rCM 等）/flow matching 谱系；DMD 系（[Causal Forcing](/ai-fa/explore/10-Papers/09-世界模型与JEPA/Causal Forcing- 自回归扩散蒸馏的正确姿势（Causal Forcing）) 同用非对称 DMD）；
- ≡ 与我们 EMDMD 的双镜像：同样治"开环蒸馏的分布错位"，他们治视频生成侧（exposure bias），我们治 RL 下游侧（考场传导）；
- → 潜在影响：any-step 化的 WM（推理预算可调）对想象训练吞吐的调度有意义。

## 6. 影响后续

**对我们的礼物**：① on-policy 蒸馏的正规化表述（我们闭环 v3 的手工版有理论亲戚了）；② "z_t→z_r 任意段转移"给 EMDMD 的蒸馏目标提供了比"σmax 直跳 x_0"更平滑的选项（curriculum 效应）——**若重启②面，这是配方升级第一候选**。

## 7. 读前须知

flow matching/流图（ODE 视角）；exposure bias（对比 E1_实验数据台账 尸检节的开环 covariate shift）；一致性蒸馏的 test-time scaling 缺陷。

