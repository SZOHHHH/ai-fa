---
type: paper
layer: 占位
title: Co-Evolving Latent Action World Models
aliases: [CoLA]
year: 2025
authors: [（arXiv）]
venue: arXiv 2025
arxiv: "2510.26433"
pdf: 已下载（PDF/）
line: 世界模型与JEPA
matrix_coords: [隐式(视频自监督), 潜在状态, 可操作(动作条件)]
tags: [paper, 占位层]
---

# Co-Evolving Latent Action World Models（CoLA·七节版）

## 1. 一句话贡献

潜动作模型与预训练视频世界模型**联合进化**训练——潜动作不再两阶段而是端到端共生。

## 2. 核心贡献

1. 潜动作模型与预训练视频世界模型联合进化训练
2. 潜动作不再两阶段而是端到端共生。

## 3. 方法概要

潜动作模块与视频世界模型共同训练，潜动作空间随世界模型能力演化而调整（双向适配）。

## 4. 核心公式

$$
\min_{\phi,\theta}\ \mathcal{L}_{\text{WM}}\big(f_\theta; z_\phi\big) + \mathcal{L}_{\text{LA}}\big(z_\phi; f_\theta\big)\ \text{交替/联合}
$$

**直觉**：占位层公式为结构示意，精读原文后应校正为论文最终形式并补逐项解释。

## 5. 与前作/矩阵关系

🚩🚩 **占 [[60-Matrices/世界模型矩阵]] "潜动作接口"格的联合训练侧**（B10 新机会格"接口可辨识性"的邻格，端到端路线已被占）


## 6. 影响与占位意义

潜动作家族 2025-10 已扩展到共进化训练——该方向占坑速度与 OPD 同级。

---

> 谱系枢纽：[[Dream to Control- Learning Behaviors by Latent Imagination（Dreamer）]]（图谱连通入口）
> 近邻同族：[[Factored Latent Action World Models（FLAM）]] · [[Hierarchical Planning with Latent World Models（HPLWM）]]
> 数学根基（占位层）：[[扩散条件去噪]] · [[贝尔曼方程]]

## 7. 读前须知

需要：贝尔曼方程；RSSM（确定性+随机潜状态）；想象训练（imagination rollout）；价值等价 vs 重建两种哲学
