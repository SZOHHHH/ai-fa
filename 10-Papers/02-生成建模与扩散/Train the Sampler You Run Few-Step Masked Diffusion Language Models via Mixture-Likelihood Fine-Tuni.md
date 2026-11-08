---
type: paper
title: "Train the Sampler You Run: Few-Step Masked Diffusion Language Models via Mixture-Likelihood Fine-Tuning"
aliases: [Mix-FT, Mixture-Likelihood Fine-Tuning]
year: 2026
authors: [Amin Najafgholizadeh]
venue: 待核（arXiv 2026-11-02）
arxiv: "2611.02666v1"
pdf: https://arxiv.org/pdf/2611.02666v1
line: 生成建模与扩散
matrix_coords: [掩码扩散LM, 采样器匹配训练(无教师), 少步生成]
tags: [paper]
---
# Mix-FT：训练你实际运行的采样器（掩码扩散 LM 少步化）

> 中文速览：指出掩码扩散 LM 的「训练-采样失配」：少步随机顺序并行采样时实际运行的是「揭示计划」上的混合分布，而交叉熵训练只拟合逐 token 条件。提出 Mix-FT：对学生自己采样器的似然做重要性加权上界微调——无教师、不改架构不改采样器。效果：LLaDA-8B 上 LoRA 微调仅 0.002% 预训练算力，OpenWebText 续写在所有测试步数下都优于继续交叉熵与 Alpha diffusion；步数减半（16 vs 32 步/块）续写仍更好，两个盲测 LLM 评委偏好 69%/71%；text8 精确似然归因显示约四分之三增益来自「按计划解释好坏加权」。

## 1. 一句话贡献

把「训练拟合的分布对齐采样实际运行的分布」做成无教师微调（Mix-FT）：对采样器的揭示计划混合似然做重要性加权上界优化——极少算力（0.002% 预训练）让掩码扩散 LM 在更少步数下生成更好。

## 2. 核心贡献
- （待精读）

## 3. 方法概要
（待精读）

## 4. 核心公式
（待精读）

## 5. 与前作/矩阵关系
- ← 前身：LLaDA 系掩码扩散 LM 与块扩散 LM 的训练范式（未入库）；问题定义=「交叉熵拟合 token 条件 vs 采样运行计划混合」的失配；
- ≡ 同族近邻（261103）：[[10-Papers/02-生成建模与扩散/Asynchronous Flow Map Language Models|aFMLM]]（同命题「训练要匹配实际运行的采样器」——其内化生成顺序、本文拟合揭示计划混合，殊途同归）· [[10-Papers/01-架构演进/Looped Uniform Diffusion Language Models|Looped Uniform DLM]]（扩散 LM 结构变体近邻）· [[10-Papers/02-生成建模与扩散/Distilled Continuous Diffusion Language Models Can Write Code in Few Steps---or One|PlaidQ]]（少步扩散 LM 的蒸馏路线对照：本文用无教师微调替代 teacher 蒸馏）；
- 概念链：[[40-Concepts/采样器]]（train-the-sampler-you-run 命题的载体）· [[30-Formulas/交叉熵]]（被替换的默认目标）· [[40-Concepts/重要性采样]]（计划加权的重要性加权视角）· [[40-Concepts/KL散度]]（似然上界）· [[20-Algorithms/扩散模型]]。

## 6. 影响后续
（待精读）

## 7. 读前须知
（待精读）原文：https://arxiv.org/pdf/2611.02666v1；在线全文（新论文）：https://arxiv.org/html/2611.02666v1

---

> 谱系枢纽：[[10-Papers/02-生成建模与扩散/Asynchronous Flow Map Language Models|aFMLM]]（图谱连通入口）

> 数学根基：[[30-Formulas/交叉熵]] · [[40-Concepts/重要性采样]] · [[40-Concepts/采样器]]
