---
type: paper
title: Upcycling Language Models for Multiple Specialized Domains
aliases: [DS-Upcycling]
year: 2026
authors: [Mingzi, Cao]
venue: 待核（arXiv 2026-10-29）
arxiv: "2610.40091v1"
pdf: https://arxiv.org/pdf/2610.40091v1
line: 架构演进
matrix_coords: [多领域适配, MoE升级回收, 路由监督]
tags: [paper]
---
# Upcycling Language Models for Multiple Specialized Domains（DS-Upcycling）

> 中文速览：多领域适配新路线 DS-Upcycling：不走"LoRA 逐域适配器+组合"（低秩限容量、且推理时全部激活互相干扰），而是把 dense Transformer 层"升级回收"成 MoE（加专家+路由器，容量更大）。做法：给路由器加领域感知监督（每域仅 256 例），微调每个新域时只更新对应专家+路由器、冻结其余全部参数。效果：适配域平均性能超 LoRA 系基线且保留通用能力；路由准确率 90-98%（无该监督训练的路由器仅 43-70%）。

## 1. 一句话贡献

dense→MoE"升级回收"+领域感知路由监督（每域 256 例）做多领域适配：容量超 LoRA、互不干扰、路由准确率 90-98%（vs 无监督 43-70%）。

## 2. 核心贡献
- （待精读）

## 3. 方法概要
（待精读）

## 4. 核心公式
（待精读）

## 5. 与前作/矩阵关系
- ← LoRA 系多适配器路线（逐域 LoRA+等权/动态加权组合——本文指其两宗罪：无关适配器也激活+低秩限容量）：[[30-Formulas/LoRA分解]]（被替代路线的本体）；
- MoE 工程族：[[10-Papers/01-架构演进/DeepSeek-V2- A Strong, Economical, and Efficient Mixture-of-Experts Language Model（MLA）|DeepSeek-V2]]（MoE 大模型）· [[10-Papers/01-架构演进/ACE Adaptive Calibration-Free Expert Skipping for MoE-based LLMs|ACE]]（MoE 路由效率近邻）；
- 概念链：[[20-Algorithms/混合专家（MoE）]] · [[30-Formulas/MoE门控公式]] · [[20-Algorithms/参数高效微调（PEFT）]]（对照阵营）。

## 6. 影响后续
（待精读）

## 7. 读前须知
（待精读）原文：https://arxiv.org/pdf/2610.40091v1；在线全文（新论文）：https://arxiv.org/html/2610.40091v1

---

> 谱系枢纽：[[10-Papers/01-架构演进/DeepSeek-V2- A Strong, Economical, and Efficient Mixture-of-Experts Language Model（MLA）|DeepSeek-V2]]（图谱连通入口）

> 数学根基：[[30-Formulas/MoE门控公式]] · [[30-Formulas/LoRA分解]]
