---
type: paper
layer: 占位
title: Trajectory as the Teacher- Few-Step Discrete Flow Matching via Energy-Navigated Distillation
aliases: [FS-DFM]
year: 2026
authors: [（arXiv）]
venue: arXiv 2026
arxiv: "2605.07924"
pdf: 已下载（PDF/）
line: 生成建模与扩散
matrix_coords: [FM(离散), 蒸馏, 蒸馏预训练]
tags: [paper, 占位层]
---

# Trajectory as the Teacher- Few-Step Discrete Flow Matching via Energy-Navigated Distillation（FS-DFM·七节版）

## 1. 一句话贡献

少步**离散**流匹配：多步轨迹当 teacher，能量导航蒸馏到少步 student——**直接占全景图机会格②"流×离散码本"**。

## 2. 核心贡献

1. 少步离散流匹配：多步轨迹当 teacher，能量导航蒸馏到少步 student
2. 直接占全景图机会格②"流×离散码本"。

## 3. 方法概要

离散步空间中，teacher 的多步轨迹作为监督信号，能量函数导航 student 的少步跳跃；显式 mode-seeking 行为分析。

## 4. 核心公式

$$
\mathcal{L} = \mathbb{E}_{\text{traj}\sim\pi_T}\big[E_{\psi}(y^{\text{few-step}}_{\theta}) - E_{\psi}(y^{\text{GT}})\big] + \beta\,\mathrm{KL}_{\text{discrete}}
$$

**直觉**：占位层公式为结构示意，精读原文后应校正为论文最终形式并补逐项解释。

## 5. 与前作/矩阵关系

🚩🚩 占 [[60-Matrices/生成建模范式矩阵]]"流×离散码本"机会格——**该格已被占，全景图排行榜第 2 名需降级**


## 6. 影响与占位意义

**重要敌情**：B9 识别的机会格② 已有 2026-05 占位者。

---

> 谱系枢纽：[[Denoising Diffusion Probabilistic Models（DDPM）]]（图谱连通入口）
> 近邻同族：[[Align Your Flow- Scaling Continuous-Time Flow Map Distillation（AYF）]] · [[Analyzing and Improving the Image Quality of StyleGAN（StyleGAN2）]]
> 数学根基（占位层）：[[概率分布]]
> 数学根基：[[蒸馏损失]] · [[DSM目标]]

## 7. 读前须知

需要：概率流 ODE；条件流匹配损失（v-prediction）；平均速度场与瞬时速度场之别
