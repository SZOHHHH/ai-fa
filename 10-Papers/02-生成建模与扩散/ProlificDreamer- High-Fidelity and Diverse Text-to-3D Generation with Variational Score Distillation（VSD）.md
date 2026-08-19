---
type: paper
layer: 占位
title: ProlificDreamer- High-Fidelity and Diverse Text-to-3D Generation with Variational Score Distillation
aliases: [VSD]
year: 2023
authors: [arXiv]
venue: arXiv 2023
arxiv: "2305.16213"
pdf: 已下载（PDF/）
line: 生成建模与扩散
matrix_coords: [扩散, 蒸馏(score/KL/对抗), 3D域]
tags: [paper, 占位层]
---

# ProlificDreamer- High-Fidelity and Diverse Text-to-3D Generation with Variational Score Distillation（VSD·七节版）

## 1. 一句话贡献

变分分数蒸馏（VSD）：粒子群采样 + 变分下界修复 SDS 过饱和——3D 生成蒸馏的地基。

## 2. 核心贡献

1. 变分分数蒸馏（VSD）：粒子群采样 + 变分下界修复 SDS 过饱和
2. 3D 生成蒸馏的地基。

## 3. 方法概要

把 SDS 的 Mode-Seeking 缺陷用粒子群（多样本）修复；NeRF 载体文生 3D。

## 4. 核心公式

$$
\mathcal{L}_{VSD} = \mathbb{E}\big[\mathrm{score}_T(x) - \mathrm{score}_{\phi}(x)\big]\ \text{(变分粒子群)}
$$

**直觉**：占位层公式为结构示意，精读原文后应校正为论文最终形式并补逐项解释。

## 5. 与前作/矩阵关系

← SDS（DreamFusion）；→ RichDreamer/ScaleDreamer；蒸馏域矩阵 3D 域列


## 6. 影响与占位意义

RS 库 05-25 情报；SDS 系（score 蒸馏）的 3D 支线主干。

---

> 谱系枢纽：[[Denoising Diffusion Probabilistic Models（DDPM）]]（图谱连通入口）
> 近邻同族：[[Diff-Instruct++- Training One-step Text-to-image Generator Model to Align with Human Preferences（Diff-Instruct++）]] · [[Diff-Instruct- A Universal Approach for Transferring Knowledge From Pre-trained Diffusion Models（Diff-Instruct）]]
> 数学根基（占位层）：[[RSSM转移模型]] · [[贝尔曼方程]] · [[ELBO]]

## 7. 读前须知

需要：蒸馏损失族（前向 KL/反向 KL/矩匹配/分布匹配）；teacher-student 分布失配；fake score 的角色
