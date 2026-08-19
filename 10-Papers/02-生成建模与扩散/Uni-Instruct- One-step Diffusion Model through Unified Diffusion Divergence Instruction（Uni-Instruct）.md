---
type: paper
layer: 占位
title: Uni-Instruct- One-step Diffusion Model through Unified Diffusion Divergence Instruction
aliases: [Uni-Instruct]
year: 2025
authors: [Y. Wang et al.]
venue: arXiv 2025
arxiv: "2505.20755"
pdf: 已下载（PDF/）
line: false
matrix_coords: [扩散, 蒸馏(score/KL/对抗), 蒸馏预训练]
tags: [paper, 占位层]
---

# Uni-Instruct- One-step Diffusion Model through Unified Diffusion Divergence Instruction（Uni-Instruct·七节版）

## 1. 一句话贡献

从统一变分散度出发推导各家方法为目标的不同实例化；理论上给出一致的梯度估计器。

## 2. 核心贡献

1. 从统一变分散度出发推导各家方法为目标的不同实例化
2. 理论上给出一致的梯度估计器。

## 3. 方法概要


$$
\mathcal{L}_{\text{unified}} = \mathbb{E}_{t,x_0}\big[D\big(p_T(\cdot|x_t)\ \Vert\ p_\theta(\cdot|x_t)\big)\ \text{的统一实例化}\big]
$$


## 4. 核心公式

≡ [[Score-Based Generative Modeling through Stochastic Differential Equations（Score-SDE）]]（统一者角色）；⊃ [[One-step Diffusion with Distribution Matching Distillation（DMD）|DMD]]/f-distill/Diff-Instruct；🚩 占蒸馏损失族统一格

**直觉**：占位层公式为结构示意，精读原文后应校正为论文最终形式并补逐项解释。

## 5. 与前作/矩阵关系

B18 奠基补齐：蒸馏损失族的统一层（B13 检索发现，RS 情报亦点名）。


## 6. 影响与占位意义

undefined

> 近邻同族：[[Diff-Instruct++- Training One-step Text-to-image Generator Model to Align with Human Preferences（Diff-Instruct++）]] · [[Diff-Instruct- A Universal Approach for Transferring Knowledge From Pre-trained Diffusion Models（Diff-Instruct）]]
> 数学根基（占位层）：[[概率分布]]

## 7. 读前须知

本卡为占位层升级版；需要的数学基础见"数学根基"行所链接的公式/概念实体。
