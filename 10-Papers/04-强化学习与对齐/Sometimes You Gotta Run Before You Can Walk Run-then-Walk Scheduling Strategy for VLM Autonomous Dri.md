---
type: paper
title: "Sometimes You Gotta Run Before You Can Walk: Run-then-Walk Scheduling Strategy for VLM Autonomous Driving"
aliases: [Run-then-Walk]
year: 2026
authors: [Yuqi Ye, Shangkun Sun, Junhong Lin, et al.]
venue: arXiv 2026
arxiv: "2609.25831v1"
pdf: 已下载（PDF/）
line: 强化学习与对齐
matrix_coords: [GRPO奖励调度(两阶段), 课程(先探索后修复), VLM驾驶]
tags: [paper]
---

# Run-then-Walk

## 1. 一句话贡献

发现 VLM 驾驶 GRPO 微调存在两种失败对称的体制——直接 Run（激进进度）撞安全、直接 Walk（保守安全）不前进——提出先 Run 后 Walk 的两阶段奖励调度：先用进度主导奖励让策略逃出 SFT 保守域发现高进度模式，再用终点距离+安全门控奖励修复安全问题；多基准性能更好且 RL 训练 epoch 省 40-50%。

## 2. 核心贡献

- **两体制诊断（toy 实验）**：同一 SFT 起点直接 Run-GRPO——EP 迅速上升但碰撞/出界飙升、PDMS 跌破 SFT 基线，进入激进域后只能"在激进里找最安全"难回平衡；直接 Walk-GRPO——只在 SFT 保守解附近的安全围栏里探索，PDMS 缓涨。两种单阶段各有失败模式
- **Run-then-Walk 调度**：Run 期奖励=PDMS（进度权重占 5/12 且最易优化）；Walk 期奖励=安全指示门控×（安全项+分段终点奖励），一旦不安全整个规划奖励清零
- **planner 无关性**：两阶段只消费解码后的轨迹与闭环反馈——自回归 VLM 规划器与扩散头规划器都适用
- **实证**：NAVSIMv1/v2、Navhard、nuScenes 多 VLM 规划器上一致优于单阶段与 Walk-first 调度，训练 epoch 少 40-50%

## 3. 方法概要

1. Run 阶段：$R^{\text{run}}_{\text{plan}}(\tau_i) = \text{PDMS}(\tau_i)$——故意放松安全修复，换取进度模式的发现
2. Walk 阶段：终点误差 $d_E$（预测终点与专家终点的 $L_1$ 距离）经分段衰减映射成终点奖励，与安全项（NC+DAC）一起被安全指示门控
3. 组内标准化成优势（GRPO 式），架构原生辅助奖励（格式/感知/预测）两阶段不变
4. 超参 $\Delta$（终点容差）与 $\eta$（衰减步长）直接调 Walk 期的保守/激进程度
5. 切换点是唯一的调度决策：太早切安全修不完、太晚切浪费探索预算

## 4. 核心公式

Walk 期规划奖励：

`$R^{\text{walk}}_{\text{plan}}(\tau_i, \tau_i^{\star}) = \mathbb{I}_{\text{safe}}(\tau_i)\left(R_{\text{safe}}(\tau_i) + R_{\text{end}}(d_E)\right),\quad d_E = \lVert p_T - g_T \rVert_1$`

**直觉**：安全指示是乘法门——不安全则整条奖励归零（不是扣分，是出局）；安全时终点奖励用"离专家终点还有几段 $\Delta$"计件扣分。终点而非全程轨迹误差做锚，避免 Walk 期把 Run 期探索出的多样高进度模式又压回 SFT 的窄走廊。

组相对优势（两阶段同形）：

`$A^{(s)}_i = \frac{R^{(s)}_i - \bar R^{(s)}}{\sigma^{(s)}_R + \epsilon},\quad s \in \{\text{run}, \text{walk}\}$`

**直觉**：GRPO 的组内标准化原样保留——变的是**喂进组的奖励函数随训练阶段切换**。课程不体现在数据难度上（那要难度标签），体现在目标函数的时序上：先最大化"能到哪"，再约束"怎么到"。

## 5. 与前作/矩阵关系

- 谱系锚：[[20-Algorithms/GRPO与RLVR]] · [[30-Formulas/GRPO目标]]（本文=其奖励侧的两阶段课程化）· [[40-Concepts/策略梯度定理]]
- 奖励设计：分段终点奖励+门控安全与 [[40-Concepts/过程奖励与结果奖励（PRM-ORM）]] 的"结果奖励整形"一族相接
- 同域对照：[[ForeDrive Foresight-Guided End-to-End Autonomous Driving with a Planning-Relevant Latent World Model|ForeDrive]]——同在 NAVSIM，ForeDrive 证明纯 IL+世界模型未来注入已到 89.9，本文走 RL 后训练路线并给出"先探索后修复"的课程序；两条线共同把"安全约束的引入时机"变成显式设计维度
- 线锚：[[40-Concepts/视觉语言模型（VLM）]]

## 6. 影响后续

- "目标函数课程"（同数据同算法、只按阶段切换奖励）是最轻量的课程学习——无需难度标注、无需改架构，可移植到一切 GRPO 后训练
- 两体制诊断（激进域锁定效应 vs 保守围栏效应）给"RL 后训练何时伤基线"提供了可复现的观察协议

## 7. 读前须知

[[30-Formulas/GRPO目标]]（组相对优势的形式）· [[40-Concepts/策略梯度定理]] · NAVSIM/PDMS 指标结构（NC/DAC/EP 等子项——Run 期选 PDMS 正因 EP 是其中最易优化的分量）· [[40-Concepts/过程奖励与结果奖励（PRM-ORM）]]（奖励整形的背景谱系）。
