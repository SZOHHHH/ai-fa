---
type: paper
title: "When One Step Is Enough: An Empirical Study of Euler Integration in Flow-Matching Policies"
aliases: []
year: 2026
authors: [Shivakanth, Sujit]
venue: 待核（占位层，来自 arXiv 2026-10-22）
arxiv: "2610.30735v1"
pdf: https://arxiv.org/pdf/2610.30735v1
line: 生成建模与扩散
matrix_coords: 待评
tags: [paper, 占位层]
layer: 占位
---
# When One Step Is Enough: An Empirical Study of Euler Integration in Flow-Matching Policies

> **占位层卡**（daily 自动采集 2026-10-27 建卡，元数据出自 arXiv API=已核实）。本链 Claude 处理段将自动精读升级：七节补全+中文速览+挂全链。
> 摘要（原文）：Flow matching is now the dominant approach for vision-language action (VLA) robot policies, thanks to its expressiveness and simple training objective. However, inference for standard flow matching requires iteratively solving an ODE, limiting the control frequency at deployment. While several works have proposed novel methods to allow for single-shot action generation, we ask whether such additional objectives are actually necessary. We find that across six flow matching VLAs, one-step action generation largely matches multi-step sampling at scale: multi-step integration confers little to no 

## 1. 一句话贡献

跨 6 个流匹配 VLA 机器人策略的实证研究：只要训练充分+容量足够，**一步 Euler 积分基本追平多步采样**（多步积分几乎无一致优势）——大 VLA 的单步策略「免费」来自多步模型，无需重训、蒸馏或辅助目标即可低延迟部署。

## 2. 核心贡献
- （待精读）

## 3. 方法概要
（待精读）

## 4. 核心公式
（待精读）

## 5. 与前作/矩阵关系
- ≡ 同问族 [[10-Papers/02-生成建模与扩散/Imitation Learning Policy based on Multi-Step Consistent Integration Shortcut Model（MsciS）|MsciS]]（策略积分步数家族：shortcut 多步一致性目标 vs 本文实证「一步已够」）
- 对照 [[10-Papers/02-生成建模与扩散/Consistency Models（一致性模型）|一致性模型]]：专门少步化目标的必要性在「大模型+足训练」域被实证质疑
- ↔ [[10-Papers/04-强化学习与对齐/On-Policy Distillation（Thinking Machines 博客）|On-Policy Distillation]]（蒸馏必要性讨论的另一参照）
- 数学链 [[20-Algorithms/流匹配]] · [[30-Formulas/条件流匹配损失]] · [[40-Concepts/NFE（函数求值次数）]]

## 6. 影响后续
（待精读）

## 7. 读前须知
（待精读）原文：https://arxiv.org/pdf/2610.30735v1；在线全文（新论文）：https://arxiv.org/html/2610.30735v1
