---
type: paper
title: Language Models are Few-Shot Learners
aliases: [GPT-3]
year: 2020
authors: [Tom B. Brown, Benjamin Mann, Nick Ryder, et al.]
venue: NeurIPS 2020
arxiv: "2005.14165"
line: 架构演进
matrix_coords: [全注意力, 缩放律, 无状态]
tags: [paper]
---

# GPT-3（Language Models are Few-Shot Learners）

## 1. 一句话贡献

175B 参数的自回归模型在提示里给几个例子就能做新任务（in-context learning）——规模本身涌现出能力，微调不再是必需品。

## 2. 核心贡献

- **上下文学习（ICL）**：不动权重、纯靠 prompt 里的示例学习——"元学习出现在大尺度"
- **规模实证**：1.25B→175B 性能持续爬升，few-shot 越大越强
- **API 产品化先声**：能力描述章节直接预言了后来一切 LLM 产品形态

## 3. 方法概要

1. 与 GPT-2 同架构放大到 96 层、12288 维、96 头
2. 300B token 训练（过滤后 CommonCrawl 为主）
3. 评测三种模式：zero-shot（只给指令）/ one-shot / few-shot（prompt 里塞示例）
4. 无梯度更新——纯前向条件概率

## 4. 核心公式

- 自回归似然：$\log p(y \mid x) = \sum_t \log p(y_t \mid x, y_{<t})$——ICL 的全部机制（无隐藏更新）
- 架构同 [[30-Formulas/注意力核心公式]]（因果掩码版）

## 5. 与前作的关系

- 扩展了 GPT-2（零样本）到 few-shot 生态位
- 依托 [[10-Papers/01-架构演进/Language Models are Few-Shot Learners（GPT-3）]] 同期的 [[10-Papers/01-架构演进/Scaling Laws for Neural Language Models（Scaling Laws）]]（同团队，尺度信念的数学版）

## 6. 影响与后续

- "大即美"路线的引爆点 → ChatGPT/[[Training language models to follow instructions with human feedback（InstructGPT）|InstructGPT]] 的底座
- ICL 机制研究成为独立方向（后续理论论文试图解释"梯度在哪"）
- 上下文学习改变了整个人机交互范式

## 7. 读前须知

[[20-Algorithms/Transformer]]、[[30-Formulas/注意力核心公式]]、[[10-Papers/01-架构演进/Scaling Laws for Neural Language Models（Scaling Laws）]]
