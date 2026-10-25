---
type: paper
title: "Smoothing the Top-k Exposure Boundary for Sparse Mixture-of-Experts"
aliases: [Elastic Expert Routing, 弹性专家路由]
year: 2026
authors: [Yunkai, Chai]
venue: arXiv 2610.11575（cs.CL，13 页 4 图，2026-10-08）
arxiv: "2610.11575v1"
pdf: https://arxiv.org/pdf/2610.11575v1
line: MoE
matrix_coords: [token级路由, Top-K暴露边界软化, 弹性专家预算采样(期望算力守恒)]
tags: [paper, 精读层]
layer: 精化层（摘要级+摘要核实，全文待深读）
---
# Smoothing the Top-k Exposure Boundary for Sparse Mixture-of-Experts

## 1. 一句话贡献
静态 top-k 把连续路由分布切成刚性阶跃函数，制造"全监督 vs 零反馈"的脆边界——分数微小波动就决定专家生死；Elastic Expert Routing 改为从以 $$k$$ 为中心的对称局部离散分布随机采样激活专家数，期望算力不变，把硬阈值软化成概率坡。

## 2. 核心贡献
- **暴露边界病理**：边界附近的专家只因门控分数的微小涨落就被任意分进"全监督区"或"零反馈区"，训练信号高度脆弱。
- **弹性路由机制**：激活预算 $$k'$$ 从 $$k \pm \delta$$ 的对称邻域分布中采样——期望计算成本与确定性训练相同，推理预算不受影响。
- **实证**：SFT 下 OLMoE-1B-7B / Qwen3-30B-A3B 下游宏平均分别 +0.84 / +2.02；从零预训练平均 +1.6。

## 3. 方法概要
1. 每个 token 路由时不再硬取 top-k，先从局部离散分布（支撑在 $$k-\delta, \ldots, k+\delta$$）抽一个预算 $$k'$$；
2. 按 $$k'$$ 选专家并照常加权训练；
3. 多轮迭代下，边界附近的专家以概率获得监督，阶跃边界被平滑成渐变分布；
4. 对称邻域保证 $$E[k'] = k$$——算力期望守恒，无需改推理。

## 4. 核心公式
- 弹性预算：$$k' \sim P(\cdot)$$，$$P$$ 支撑于 $$\{k-\delta, \ldots, k+\delta\}$$ 且对称，故 $$E[k'] = k$$
  - 直觉：给训练期的路由预算加"期望守恒的抖动"——像把 0/1 阶跃信号过低通滤波，边界专家从"全有或全无"变成"按距离衰减的梯度监督"。
- 路由本体见[MoE门控公式](/ai-fa/explore/30-Formulas/MoE门控公式)。

## 5. 与前作/矩阵关系
- 路由训练动力学族：[Auxiliary-Loss-Free 负载均衡](/ai-fa/explore/10-Papers/05-MoE/Auxiliary-Loss-Free Load Balancing Strategy for Mixture-of-Experts（无辅助损失MoE）)（都在修"训练期路由信号"——那篇修偏置、这篇修暴露边界）、[Expert Choice](/ai-fa/explore/10-Papers/05-MoE/Mixture-of-Experts with Expert Choice Routing（Expert Choice）)（双向选择绕开 top-k 硬边界的另一条路）；
- 锚：[混合专家（MoE）](/ai-fa/explore/20-Algorithms/混合专家（MoE）) · [MoE门控公式](/ai-fa/explore/30-Formulas/MoE门控公式)。

## 6. 影响后续
- 近乎一行改动的训练增益；专家越细粒度、门控分数越稠密，暴露边界问题越重——与同日 DivMoE 的路由塌陷病理互为参照（一软一硬两条补丁）。

## 7. 读前须知
- 前置：[MoE门控公式](/ai-fa/explore/30-Formulas/MoE门控公式)、top-k 路由基本流程。
- 原文：https://arxiv.org/pdf/2610.11575v1 ｜ 在线全文：https://arxiv.org/html/2610.11575v1
