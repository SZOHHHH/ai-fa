---
type: paper
title: A Unified Hessian-Guided Framework for Post-Training Quantization
aliases: [Hessian PTQ]
year: 2026
authors: [Mads, Toftrup]
venue: 待核（arXiv 2026-10-29）
arxiv: "2610.40345v1"
pdf: https://arxiv.org/pdf/2610.40345v1
line: 架构演进
matrix_coords: [后训练量化(PTQ), LLM部署, 联合优化]
tags: [paper]
---
# A Unified Hessian-Guided Framework for Post-Training Quantization

> 中文速览：把 LLM 后训练量化（PTQ）的三大自由度——量化范围、线性变换、权重舍入——从"各自独立局部优化"统一为同一目标下的联合优化。做法：推导 Hessian 引导的近似来估计权重+激活联合量化对模型输出的影响（ tractable Fisher 近似使下游效应可算），以输出敏感度为目标统一优化三组件，替代对下游预测影响不敏感的局部重构目标。效果：通道级与块级量化设置下全面超越 SOTA 变换与舍入方法，对现代大模型仍实用。

## 1. 一句话贡献

用 Hessian/Fisher 近似的"输出敏感度"目标把 PTQ 的范围/变换/舍入三组件联合优化——解决各组件局部重构目标与下游预测脱节的问题。

## 2. 核心贡献
- （待精读）

## 3. 方法概要
（待精读）

## 4. 核心公式
（待精读）

## 5. 与前作/矩阵关系
- ← GPTQ 谱系（二阶 Hessian 补偿）的联合优化升级：前身 [[10-Papers/03-后处理/GPTQ- Accurate Post-Training Quantization for Generative Pre-trained Transformers（GPTQ）|GPTQ]]；同场竞品 SmoothQuant/AWQ（激活迁移/激活感知路线，库内 03-后处理 有卡）；
- 同族近邻（261102）：[[10-Papers/01-架构演进/G$^2$PTQ Improving LLM Post-Training Quantization with Generalized Gradient Compensation|G²PTQ]]（梯度补偿路线）· [[10-Papers/02-生成建模与扩散/DSAQuant Denoising-Stage-Aligned Quantization-Aware Training for Video Generation|DSAQuant]]（QAT 侧对照）· [[10-Papers/01-架构演进/Unraveling the Efficacy of Neuron Coverage Criteria on Testing Large Language Models|Neuron Coverage 实证]]（同批 LLM 部署可靠性实证）；
- 概念链：[[40-Concepts/量化]] · [[30-Formulas/量化误差与异常值]] · [[20-Algorithms/Transformer]]。

## 6. 影响后续
（待精读）

## 7. 读前须知
（待精读）原文：https://arxiv.org/pdf/2610.40345v1；在线全文（新论文）：https://arxiv.org/html/2610.40345v1

---

> 谱系枢纽：[[10-Papers/03-后处理/GPTQ- Accurate Post-Training Quantization for Generative Pre-trained Transformers（GPTQ）|GPTQ]]（图谱连通入口）

> 数学根基：[[30-Formulas/量化误差与异常值]] · [[40-Concepts/量化]]
