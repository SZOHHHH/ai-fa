---
type: paper
title: "Causal Chain of Thought: Mitigating Attention Leakage via Context Isolation"
aliases: []
year: 2026
authors: [Gabriele, Dominici]
venue: 待核（占位层，来自 arXiv 2026-10-22）
arxiv: "2610.31639v1"
pdf: https://arxiv.org/pdf/2610.31639v1
line: 推理模型
matrix_coords: 待评
tags: [paper, 占位层]
layer: 占位
---
# Causal Chain of Thought: Mitigating Attention Leakage via Context Isolation

> **占位层卡**（daily 自动采集 2026-10-25 建卡，元数据出自 arXiv API=已核实）。本链 Claude 处理段将自动精读升级：七节补全+中文速览+挂全链。
> 摘要（原文）：Chain-of-thought (CoT) prompting elicits step-by-step rationales that appear to explain model predictions, but there is no guarantee these steps causally drive the final answer. In standard autoregressive generation, dense attention allows each reasoning step to attend to the full context, enabling the model to derive answers through direct lookup while generating plausible-sounding but post-hoc justifications. We introduce CausalCoT, an inference framework that enforces causal transparency by decomposing problems into a directed acyclic graph of atomic sub-questions, evaluating each node in a

## 1. 一句话贡献
诊断自回归生成的**注意力泄漏**：稠密注意力让每步推理可回看全上下文，模型能直接"查表"拿答案、再生成听着合理的事后辩护；提出 CausalCoT——把问题分解为原子子问题的 DAG，每个节点只在**只含其直接因果父节点**的隔离上下文中求值（马尔可夫化切断非父通路），解释的因果敏感度平均 +12（最高 +21）个百分点且保住竞争性预测性能。

## 2. 核心贡献
- （待精读）

## 3. 方法概要
1. 分解：问题拆成原子子问题 DAG（节点=自含小问题，边=对父节点答案的依赖）；
2. 隔离求值：每节点上下文只放其直接因果父的答案——切断对非父内容的注意力通路，下游预测只能依赖局部推理而非全局泄漏；
3. 效果：多样推理基准上预测性能保持竞争，解释忠实度（中间步骤的因果敏感度）大幅提升；
4. 附赠测试时干预：局部修正一个节点答案，改动沿 DAG 可预测地传播到下游推理。

## 4. 核心公式
（待精读）

## 5. 与前作/矩阵关系
- 线锚：[[40-Concepts/思维链（CoT）]]（CoT 忠实度方向——理由是否因果驱动答案）· [[40-Concepts/注意力机制]]（泄漏的载体）· [[30-Formulas/注意力核心公式]]
- ≡ 同族（CoT 证据接地/忠实性家族）：[[10-Papers/07-推理模型/RECAP Looking Once Is Not Enough for Vision-Language Reasoning|RECAP]]（视觉证据时间性漂移+训练信号修复）· [[10-Papers/07-推理模型/Measuring the Reasoning-Action Coupling in Driving Vision-Language-Action Models through Counterfact|驾驶 VLA 反事实审计]]（推理-行为耦合测量）· [[10-Papers/07-推理模型/Legibility is Not Interpretability Comparing Judged and Actual Importance in Chain-Of-Thought Reason|Legibility≠Interpretability]]（重要性审计）

## 6. 影响后续
（待精读）

## 7. 读前须知
（待精读）原文：https://arxiv.org/pdf/2610.31639v1；在线全文（新论文）：https://arxiv.org/html/2610.31639v1
