---
type: paper
title: "Towards Foundation Decision Models: Drex"
aliases: []
year: 2026
authors: [Nischay, Dhankhar]
venue: 待核（占位层，来自 arXiv 2026-11-05）
arxiv: "2611.07854v1"
pdf: https://arxiv.org/pdf/2611.07854v1
line: 推理模型
matrix_coords: 待评
tags: [paper, 占位层]
layer: 占位
---
# Towards Foundation Decision Models: Drex

> **占位层卡**（daily 自动采集 2026-11-08 建卡，元数据出自 arXiv API=已核实）。本链 Claude 处理段将自动精读升级：七节补全+中文速览+挂全链。
> 摘要（原文）：Autoregressive approaches with large language models, such as long chain-of-thought reasoning, have become the default for new AI applications because they reach higher accuracy on a wide range of tasks. In production, however, they give inconsistent answers, require parsing of outputs, and add cost and latency. Decision models address this: given a question and a set of options supplied by the user, they return a probability distribution over the options without autoregressive decoding. We present Drex, a family of four open decision models with 8B (DLM), 9B (v1.5), 35B with 3B active (v2.0),

## 1. 一句话贡献
（待精读）

## 2. 核心贡献
- （待精读）

## 3. 方法概要
（待精读）

## 4. 核心公式
（待精读）

## 5. 与前作/矩阵关系
- ← 问题谱系：长 CoT 自回归推理生产态三宗罪（答案不稳/要解析输出/贵且慢）→ [[40-Concepts/思维链（CoT）]] 的"去自回归化"替代路线：给问题+选项直接读出概率分布
- ≡ 同日对照：[[10-Papers/07-推理模型/Do Recommenders Need to Think in Words Latent Reasoning for Efficient LLM-Based Recommendation|LatentRec]]（同为"推理痕迹去 Text 化"，LatentRec 潜空间迭代推理、Drex 干脆取消解码）
- ⊃ 训练组件：SFT + RLAF（调整反馈强化学习）+ 一致性损失（抗选项顺序扰动）——[[20-Algorithms/RLHF]] 家族的决策模型变体
- ⊃ 生态位：决策模型（Decision Models）开源家族化（8B/9B/35B-A3B/27B 四档+Decision Index/Decision Bench/DecideBench 评测），与自回归 LLM 推理线 [[10-Papers/07-推理模型/StepBack Step-Level Error-Localized Resampling for Efficient Test-Time Reasoning|StepBack]]（测试时提效）互补：Drex 从架构头侧省延迟（183ms vs 2-3.5s）

## 6. 影响后续
（待精读）

## 7. 读前须知
（待精读）原文：https://arxiv.org/pdf/2611.07854v1；在线全文（新论文）：https://arxiv.org/html/2611.07854v1
