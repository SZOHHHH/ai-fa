---
type: paper
layer: 占位
title: One-step Diffusion Models with f-Divergence Distribution Matching
aliases: [f-distill]
year: 2025
authors: [NVIDIA]
venue: arXiv 2025
arxiv: "2502.15681"
pdf: 已下载（PDF/）
line: 生成建模与扩散
matrix_coords: [扩散, 蒸馏(score/KL/对抗), 蒸馏预训练]
tags: [paper, 占位层]
---

# One-step Diffusion Models with f-Divergence Distribution Matching（f-distill·七节版）

## 1. 一句话贡献

[[One-step Diffusion with Distribution Matching Distillation（DMD）|DMD]] 的 f-散度泛化：分布匹配损失从固定 KL 扩展到任意 f-散度族——蒸馏损失族的"参数化升维"。

## 2. 核心贡献

1. [[One-step Diffusion with Distribution Matching Distillation（DMD）|DMD]] 的 f-散度泛化：分布匹配损失从固定 KL 扩展到任意 f-散度族
2. 蒸馏损失族的"参数化升维"。

## 3. 方法概要

把 student/teacher 分布比写成 f-散度，统一 DMD/Diff-Instruct 类方法并分析不同 f 的 mode-seeking 行为。

## 4. 核心公式

$$
\mathcal{L} = D_f\big(p_S\ \Vert\ p_T\big) = \mathbb{E}_{p_T}\big[f\big(p_S/p_T\big)\big]
$$

**直觉**：占位层公式为结构示意，精读原文后应校正为论文最终形式并补逐项解释。

## 5. 与前作/矩阵关系

🚩 占蒸馏损失族泛化格；↔ [[Entropy-Aware On-Policy Distillation of Language Models（EOPD）|EOPD]] 的散度切换（LLM 域同款思想）；≡ [[Uni-Instruct- One-step Diffusion Model through Unified Diffusion Divergence Instruction（Uni-Instruct）]]


## 6. 影响与占位意义

散度选择轴的奠基级占位（NVIDIA）。

> 近邻同族：[[Diff-Instruct++- Training One-step Text-to-image Generator Model to Align with Human Preferences（Diff-Instruct++）]] · [[Diff-Instruct- A Universal Approach for Transferring Knowledge From Pre-trained Diffusion Models（Diff-Instruct）]]
> 数学根基（占位层）：[[概率分布]]
> 数学根基：[[蒸馏损失]] · [[DSM目标]]

## 7. 读前须知

需要：蒸馏损失族（前向 KL/反向 KL/矩匹配/分布匹配）；teacher-student 分布失配；fake score 的角色
