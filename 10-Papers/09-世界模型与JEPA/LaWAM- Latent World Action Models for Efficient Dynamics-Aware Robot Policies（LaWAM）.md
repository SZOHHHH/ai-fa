---
type: paper
layer: 占位
title: LaWAM- Latent World Action Models for Efficient Dynamics-Aware Robot Policies
aliases: [LaWAM]
year: 2026
authors: [（arXiv）]
venue: arXiv 2026
arxiv: "2606.15768"
pdf: 已下载（PDF/）
line: 世界模型与JEPA
matrix_coords: [隐式(视频自监督), 潜在状态, 可操作(动作条件)]
tags: [paper, 占位层]
---

# LaWAM- Latent World Action Models for Efficient Dynamics-Aware Robot Policies（LaWAM·七节版）

## 1. 一句话贡献

潜世界动作模型：预测的潜子目标直接引导动作生成，绕开像素空间视频预测——潜空间规划的机器人落地。

## 2. 核心贡献

1. 潜世界动作模型：预测的潜子目标直接引导动作生成，绕开像素空间视频预测
2. 潜空间规划的机器人落地。

## 3. 方法概要

潜子目标预测 → 动作生成器（无像素解码），机器人策略高效且动力学感知。

## 4. 核心公式

$$
a_t = \pi\big(s_t, \hat g_{\text{latent}}\big),\ \hat g = \text{LatentWM}\big(s_{\le t}\big)
$$

**直觉**：占位层公式为结构示意，精读原文后应校正为论文最终形式并补逐项解释。

## 5. 与前作/矩阵关系

🚩 占"潜子目标×策略"格（Delta-JEPA 的规划侧对应）


## 6. 影响与占位意义

潜空间规划的 2026 占位（避像素生成的工程路线）。

---

> 谱系枢纽：[[Dream to Control- Learning Behaviors by Latent Imagination（Dreamer）]]（图谱连通入口）
> 近邻同族：[[Co-Evolving Latent Action World Models（CoLA）]] · [[Factored Latent Action World Models（FLAM）]]
> 数学根基（占位层）：[[JEPA联合嵌入预测架构]]
> 数学根基：[[REINFORCE目标]]

## 7. 读前须知

需要：贝尔曼方程；RSSM（确定性+随机潜状态）；想象训练（imagination rollout）；价值等价 vs 重建两种哲学
