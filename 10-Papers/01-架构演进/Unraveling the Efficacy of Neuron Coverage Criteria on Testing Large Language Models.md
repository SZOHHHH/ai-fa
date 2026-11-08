---
type: paper
title: Unraveling the Efficacy of Neuron Coverage Criteria on Testing Large Language Models
aliases: [Neuron Coverage 实证]
year: 2026
authors: [Xiaoning, Ren]
venue: 待核（arXiv 2026-10-29）
arxiv: "2610.40234v1"
pdf: https://arxiv.org/pdf/2610.40234v1
line: 架构演进
matrix_coords: [LLM测试实证, 神经元覆盖, 可靠性评估]
tags: [paper]
---
# Unraveling the Efficacy of Neuron Coverage Criteria on Testing Large Language Models

> 中文速览：系统评测六种神经元覆盖准则（四种经典+两种新近）在 Transformer 语言模型测试上的真实实效，横跨 encoder-only/decoder-only/encoder-decoder 三类架构，从错误揭示、分布多样性、样本公平性、测试输入生成引导四个维度考察。效果：结论"参差"——错误样本比噪声样本只多 0.32% 覆盖（揭错能力≈安慰剂），覆盖引导只让对抗样本多产 4.56%；但 33 组配置中 26/30 组能有效评估分布多样性与样本公平性——多样性解药、揭错误区，实际价值取决于计算开销是否值回票价。

## 1. 一句话贡献

LLM 神经元覆盖准则的系统性体检：评多样性/公平性有效（26/30 组配置），揭错基本无效（+0.32% 覆盖/+4.56% 对抗产出）——"多样性解药、揭错安慰剂"。

## 2. 核心贡献
- （待精读）

## 3. 方法概要
（待精读）

## 4. 核心公式
（待精读）

## 5. 与前作/矩阵关系
- 深度学习测试线（神经元覆盖源自传统 DNN 测试）在 LLM 上的首次大规模实证清算；
- 同批近邻（261102）：[[10-Papers/01-架构演进/A Unified Hessian-Guided Framework for Post-Training Quantization|Hessian PTQ]]（同批 LLM 部署/可靠性实证研究，互挂）；
- 概念链：[[20-Algorithms/Transformer]]（被测架构：encoder/decoder/enc-decoder 三形态）· [[40-Concepts/注意力机制]]（覆盖定义所在的表征层）。

## 6. 影响后续
（待精读）

## 7. 读前须知
（待精读）原文：https://arxiv.org/pdf/2610.40234v1；在线全文（新论文）：https://arxiv.org/html/2610.40234v1

---

> 谱系枢纽：[[10-Papers/01-架构演进/Attention Is All You Need（Transformer）|Transformer 本命卡]]（图谱连通入口）

> 数学根基：[[30-Formulas/注意力核心公式]] · [[40-Concepts/注意力机制]]
