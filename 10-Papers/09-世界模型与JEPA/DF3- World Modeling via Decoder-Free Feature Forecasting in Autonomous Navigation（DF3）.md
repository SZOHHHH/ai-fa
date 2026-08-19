---
type: paper
layer: 占位
title: DF3- World Modeling via Decoder-Free Feature Forecasting in Autonomous Navigation
aliases: [DF3]
year: 2026
authors: [arXiv]
venue: arXiv 2026
arxiv: "2608.02428"
pdf: 已下载（PDF/）
line: 世界模型与JEPA
matrix_coords: [特征预测(JEPA系), 潜在状态, 纯离线]
tags: [paper, 占位层]
---

# DF3- World Modeling via Decoder-Free Feature Forecasting in Autonomous Navigation（DF3·七节版）

## 1. 一句话贡献

免解码器特征预测的导航世界模型——JEPA 路线进自动驾驶域。

## 2. 核心贡献

1. 免解码器特征预测的导航世界模型
2. JEPA 路线进自动驾驶域。

## 3. 方法概要

特征空间直接预测未来（无像素解码），服务导航决策。

## 4. 核心公式

$$
\hat s_{t+1} = f_\theta(s_t, a_t)\ \text{(特征域, 无解码)}
$$

**直觉**：占位层公式为结构示意，精读原文后应校正为论文最终形式并补逐项解释。

## 5. 与前作/矩阵关系

🚩 世界模型矩阵"特征预测×导航"格；≡ [[Revisiting Feature Prediction for Learning Visual Representations from Video（V-JEPA）]]（域扩张）


## 6. 影响与占位意义

RS 库 08-03 情报（rel=3）；JEPA 路线任务面证据。

> 近邻同族：[[Delta-JEPA- Learning Action-Sensitive World Models via Latent Difference Decoding（Delta-JEPA）]]
> 数学根基（占位层）：[[扩散条件去噪]] · [[贝尔曼方程]]

## 7. 读前须知

需要：贝尔曼方程；RSSM（确定性+随机潜状态）；想象训练（imagination rollout）；价值等价 vs 重建两种哲学
