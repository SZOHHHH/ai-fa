---
type: paper
title: Emergent Abilities of Large Language Models
aliases: [Emergent Abilities]
year: 2022
authors: [Jason Wei, Yi Tay, Rishi Bommasani, et al.]
venue: TMLR 2022
arxiv: "2206.07682"
line: 标杆锚点
tags: [paper]
---

# 涌现能力（Emergent Abilities）

## 1. 一句话贡献

系统化"涌现"概念：小模型近乎零、跨过规模阈值后骤增的能力——"量变引起质变"的 LLM 叙事奠基（也是后续争议焦点）。

## 2. 核心贡献

- **定义**：不存在于小模型、不可由小模型外推的能力
- **实例编目**：few-shot [[Chain-of-Thought Prompting Elicits Reasoning in Large Language Models（CoT）|CoT]]、指令跟随、多位数算术等（横跨基准）
- **两种讨论**：涌现于规模（跨模型）与涌现于训练过程（同模型训练中）

## 3. 方法概要

1. 收集多基准跨规模性能曲线
2. 识别"平线→跳升"形态的能力
3. 分类：prompting 涌现 / 微调涌现
4. 讨论可能机理（相变、回路形成等假说）

## 4. 核心公式

- 无新公式；**对照叙事**：连续缩放（[[10-Papers/10-标杆锚点/Training Compute-Optimal Large Language Models（Chinchilla）]]）vs 非连续涌现——两种世界观

## 5. 与前作的关系

- 正式化了 [[10-Papers/01-架构演进/Language Models are Few-Shot Learners（GPT-3）]] 报告中的"惊喜"与 [[10-Papers/07-推理模型/Chain-of-Thought Prompting Elicits Reasoning in Large Language Models（CoT）]] 的规模阈值现象

## 6. 影响与后续

- "涌现"成为领域叙事关键词（卖点与焦虑并存）
- **重要后续争论**：[Schaeffer 2023《Are Emergent Abilities a Mirage?]——换非线性度量（连续指标）后"涌现"消失，主张是度量假象——本卡必注此争议，避免单边叙事

## 7. 读前须知

[[10-Papers/01-架构演进/Scaling Laws for Neural Language Models（Scaling Laws）]]（平滑幂律对照）、[[10-Papers/01-架构演进/Language Models are Few-Shot Learners（GPT-3）]]

> 数学根基：[[注意力机制]]

> 数学根基：[[注意力核心公式]] · [[CLIP对比损失]]
