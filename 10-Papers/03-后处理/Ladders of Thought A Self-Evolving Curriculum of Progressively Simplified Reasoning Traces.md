---
type: paper
title: "Ladders of Thought: A Self-Evolving Curriculum of Progressively Simplified Reasoning Traces"
aliases: [LoT 课程蒸馏]
year: 2026
authors: [Minghui Liu, et al.]
venue: arXiv 2026
arxiv: "2609.26243v1"
pdf: 已下载（PDF/）
line: 后处理
matrix_coords: [推理蒸馏, 自进化课程, 问题改写降难, LLM]
tags: [paper]
---

# Ladders of Thought（渐进简化推理轨迹的自进化课程）

## 1. 一句话贡献

治中小模型"蒸馏了还是推理脆"的病：LoT 自动生成语义保真但更简单的问题变体，按步数分桶难度，用自进化 bandit 调度器分配训练——让模型沿"问题难度梯子"由易到难学推理，两个推理基准上超越标准 KD（摘要级；具体增益数字待精读）。

## 2. 核心贡献

- **渐进式问题改写**：不是改提示而是改题目——把原问题重写成语义保真的更易版本，从源头造出难度可控的训练数据
- **步数难度分桶**：用基于步数的度量把改写产物组织成难度档
- **自进化 bandit 调度**：训练中按学习信号自适应分配各难度桶的采样——课程不是手工排的，是学出来的
- 组合拳对中小模型推理能力的提升在两个推理基准验证，优于常规 KD

## 3. 方法概要

1. 种子=推理问题及其推理轨迹（多步）
2. 自动改写器生成"更简单但仍语义忠实"的变体问题（降难不改义）
3. 变体按步数度量分入难度桶
4. bandit 调度器决定每轮从哪个桶采样训练（按训练反馈自适应，难度梯子自动攀爬）
5. 与 KD 结合：蒸馏提供表征/输出监督，课程提供数据组织（摘要级流程）

## 4. 核心公式

bandit 调度骨架（按文中思想概括，具体形式待精读）：

`$a_t = \arg\max_{a \in \text{难度桶}} \left[ Q_t(a) + c\sqrt{\frac{\ln t}{N_t(a)}} \right]$`

**直觉**：每个难度档是一台老虎机——估值高的档多采样，长期没进展的档自动降权；$\sqrt{\ln t / N_t(a)}$ 探索项保证冷门难度偶尔还被试到，课程由此"自进化"。

## 5. 与前作/矩阵关系

- ←[[Distilling the Knowledge in a Neural Network（KD）]]：起点是"KD 后中小模型仍脆"的痛点
- ≡近邻 [[10-Papers/03-后处理/On-Policy Distillation for Vision-Language Model Adaptation, an Effective Paradigm on Low-Quality Mu|On-Policy Distillation]]：都在"怎么让小模型从大模型学到位"，这边答案是课程化数据组织而非训练范式切换
- ↔课程学习思想与库内 RL 教学链（RL 系列课程化训练）呼应——难度调度从课程学习搬进蒸馏

## 6. 影响后续

"问题改写降难+自适应课程"成为推理蒸馏的标配组件候选；对我们谱系的价值=EMDMD 剂量曲线（训练信号强度调度）的同构远亲——都在回答"训练信号该按什么曲线给"。

## 7. 读前须知

- 课程学习直觉：由易到难 vs 混合难度之争（库内知识链有对应节）
- bandit/UCB 基本式：估值+探索项的经典平衡
- LLM 推理蒸馏背景：CoT 蒸馏为何对中小模型失效（步子跨太大）
