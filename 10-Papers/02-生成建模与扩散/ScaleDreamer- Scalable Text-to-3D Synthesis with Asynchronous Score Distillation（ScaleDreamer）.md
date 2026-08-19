---
type: paper
layer: 占位
title: ScaleDreamer- Scalable Text-to-3D Synthesis with Asynchronous Score Distillation
aliases: [ScaleDreamer]
year: 2024
authors: [arXiv]
venue: arXiv 2024
arxiv: "2407.02040"
pdf: 已下载（PDF/）
line: 生成建模与扩散
matrix_coords: [扩散, 蒸馏(score/KL/对抗), 3D域]
tags: [paper, 占位层]
---

# ScaleDreamer- Scalable Text-to-3D Synthesis with Asynchronous Score Distillation（ScaleDreamer·七节版）

## 1. 一句话贡献

异步分数蒸馏的 3D 生成——VSD 系的规模化改进。

## 2. 核心贡献

1. 异步分数蒸馏的 3D 生成
2. VSD 系的规模化改进。

## 3. 方法概要

异步粒子更新降低 VSD 计算耦合。

## 4. 核心公式

$$
\text{async}\ \text{particle updates}\ \text{of VSD}
$$

**直觉**：占位层公式为结构示意，精读原文后应校正为论文最终形式并补逐项解释。

## 5. 与前作/矩阵关系

← [[ProlificDreamer- High-Fidelity and Diverse Text-to-3D Generation with Variational Score Distillation（VSD）]]（本批）；🚩 3D 蒸馏规模化格


## 6. 影响与占位意义

RS 库 07-02 情报。

> 近邻同族：[[Diff-Instruct++- Training One-step Text-to-image Generator Model to Align with Human Preferences（Diff-Instruct++）]] · [[Diff-Instruct- A Universal Approach for Transferring Knowledge From Pre-trained Diffusion Models（Diff-Instruct）]]
> 数学根基（占位层）：[[RSSM转移模型]] · [[贝尔曼方程]] · [[ELBO]]

## 7. 读前须知

需要：蒸馏损失族（前向 KL/反向 KL/矩匹配/分布匹配）；teacher-student 分布失配；fake score 的角色
