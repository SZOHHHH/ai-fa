---
type: paper
layer: 占位
title: Distribution Matching Distillation without Fake Score Network
aliases: [FSF-DMD]
year: 2026
authors: [（arXiv，赵桉竞品）]
venue: arXiv 2026
arxiv: "2605.19256"
pdf: 已下载（PDF/）
line: 生成建模与扩散
matrix_coords: [扩散, 蒸馏(score/KL/对抗), 蒸馏预训练]
tags: [paper, 占位层]
---

# Distribution Matching Distillation without Fake Score Network（FSF-DMD·七节版）

## 1. 一句话贡献

去掉 fake-score 网络的分布匹配蒸馏——**组内赵桉的竞品论文**（RS 红线之一）。

## 2. 核心贡献

1. 去掉 fake-score 网络的分布匹配蒸馏
2. 组内赵桉的竞品论文（RS 红线之一）。

## 3. 方法概要

DMD 家族需要在线 fake score 网络估计 student 分布；本文证明可由 teacher 与 student 的闭式组合替代，省一个在线网络。

## 4. 核心公式

$$
\mathcal{L} = \mathrm{KL}\big(p_S\ \Vert\ p_T\big)\ \text{的估计用}\ \big(s_T - s_\theta\big)\text{ 闭式替换}\ \big(s_T - s_{\text{fake}}\big)
$$

**直觉**：占位层公式为结构示意，精读原文后应校正为论文最终形式并补逐项解释。

## 5. 与前作/矩阵关系

🚩 占扩散×蒸馏×无 fake 网络格；≡ 你 RS 库 IDEA-2026-arcflow-self-distillation 草稿的直接竞品（那条线也在去 fake 网络）


## 6. 影响与占位意义

**组内红线情报**：此方向已有人占，相关 idea 必须避开或差异化。

> 近邻同族：[[Diff-Instruct++- Training One-step Text-to-image Generator Model to Align with Human Preferences（Diff-Instruct++）]] · [[Diff-Instruct- A Universal Approach for Transferring Knowledge From Pre-trained Diffusion Models（Diff-Instruct）]]
> 数学根基（占位层）：[[概率分布]]
> 数学根基：[[蒸馏损失]] · [[DSM目标]]

## 7. 读前须知

需要：蒸馏损失族（前向 KL/反向 KL/矩匹配/分布匹配）；teacher-student 分布失配；fake score 的角色
