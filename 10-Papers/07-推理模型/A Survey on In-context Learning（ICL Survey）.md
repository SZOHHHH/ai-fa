---
type: paper
title: A Survey on In-context Learning
aliases: [ICL Survey]
year: 2022
authors: [Dong et al.]
venue: arXiv 2022
arxiv: "2301.00234"
pdf: 已下载（PDF/）
line: 推理模型
matrix_coords: [提示触发, —, —]
tags: [paper]
---

# ICL Survey

## 1. 一句话贡献

上下文学习综述：形式化定义（demonstration 检索/排序/格式化）+理论假说巡礼——本库提示触发列的骨架文献。

## 2. 核心贡献

1. ICL 三要素分解
2. 理论解释（贝叶斯推断/隐式梯度/模式匹配）各派对照

## 3. 方法概要

ICL 三要素分解；理论解释（贝叶斯推断/隐式梯度/模式匹配）各派对照。
## 4. 核心公式


$$
p_\theta(y\ \vert\ \text{demos}, x)\ \text{的形式化}
$$


**直觉**：← [[Language Models are Few-Shot Learners（GPT-3）]]（ICL 能力来源）；→ [[Chain-of-Thought Prompting Elicits Reasoning in Large Language Models（CoT）|CoT]]/自举（ICL 的推理特化）

## 5. 与前作/矩阵关系

ICL 研究的入口文献

## 6. 影响后续

工具型参考卡

## 7. 读前须知

undefined

> 近邻同族：[[Chain-of-Thought Prompting Elicits Reasoning in Large Language Models（CoT）]] · [[Generalizable Chain-of-Thought Prompting in Mixed-task Scenarios with Large Language Models（KoT）]]

> 相关：[[Make Your LLM Fully Utilize the Context（FILU）]]

> 相关：[[Math-Shepherd- Verify and Reinforce LLMs Step-by-step without Human Annotations（Math-Shepherd）]]

> 相关：[[Scaling Instruction-Finetuned Language Models（Flan-T5）]]

> 相关：[[Scaling LLM Test-Time Compute Optimally can be More Effective than Scaling Model Param（Test-Time Compute）]]

> 相关：[[STaR- Bootstrapping Reasoning With Reasoning（STaR）]]

> 相关：[[System 2 Attention (is something you might need too)（S2A）]]

> 相关：[[Test-Time Scaling Makes Overtraining Compute-Optimal（T2T标度律）]]

> 相关：[[The AI Scientist- Towards Fully Automated Open-Ended Scientific Discovery（AI Scientist）]]

> 数学根基：[[思维链（CoT）]]
