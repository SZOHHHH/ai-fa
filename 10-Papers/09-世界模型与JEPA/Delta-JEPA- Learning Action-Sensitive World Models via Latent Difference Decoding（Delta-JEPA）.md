---
type: paper
layer: 占位
title: Delta-JEPA- Learning Action-Sensitive World Models via Latent Difference Decoding
aliases: [Delta-JEPA]
year: 2026
authors: [（arXiv）]
venue: arXiv 2026
arxiv: "2606.31232"
pdf: 已下载（PDF/）
line: 世界模型与JEPA
matrix_coords: [特征预测(JEPA系), 潜在状态, 可操作(动作条件)]
tags: [paper, 占位层]
---

# Delta-JEPA- Learning Action-Sensitive World Models via Latent Difference Decoding（Delta-JEPA·七节版）

## 1. 一句话贡献

免重建世界模型 + 潜差分解的动作表征：用"潜状态差"显式承载动作效应——latent action 空间的动作敏感化。

## 2. 核心贡献

1. 免重建世界模型 + 潜差分解的动作表征：用"潜状态差"显式承载动作效应
2. latent action 空间的动作敏感化。

## 3. 方法概要

潜向前预测之外，并行预测"潜差分"（同一状态在有无动作下的潜量差），动作信息集中编码在差分通道。

## 4. 核心公式

$$
\Delta z = z(s, a) - z(s),\ \mathcal{L} = \|\hat z_{t+1} - z_{t+1}\|^2 + \lambda\|\widehat{\Delta z} - \Delta z\|^2
$$

**直觉**：占位层公式为结构示意，精读原文后应校正为论文最终形式并补逐项解释。

## 5. 与前作/矩阵关系

🚩 占世界模型矩阵"潜动作×潜差编码"格（与 3R2D/LAPA 的接口问题正交的动作表征路线）


## 6. 影响与占位意义

动作表征细分占位（B10 孵化 #2 的邻格活动证据）。

---

> 谱系枢纽：[[Dream to Control- Learning Behaviors by Latent Imagination（Dreamer）]]（图谱连通入口）
> 近邻同族：[[DF3- World Modeling via Decoder-Free Feature Forecasting in Autonomous Navigation（DF3）]] · [[Revisiting Feature Prediction for Learning Visual Representations from Video（V-JEPA）]]
> 数学根基（占位层）：[[扩散条件去噪]] · [[贝尔曼方程]]

## 7. 读前须知

需要：贝尔曼方程；RSSM（确定性+随机潜状态）；想象训练（imagination rollout）；价值等价 vs 重建两种哲学
