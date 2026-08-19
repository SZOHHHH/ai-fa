---
type: paper
title: GPT-4 Technical Report
aliases: [GPT-4]
year: 2023
authors: [OpenAI]
venue: arXiv 2023
arxiv: "2303.08774"
line: 标杆锚点
tags: [paper]
---

# GPT-4 技术报告

## 1. 一句话贡献

大规模多模态 LLM 的工程巅峰报告——核心贡献是"可预测的扩展"（predictable scaling）方法学与 RLHF 大规模实践，架构细节保密。

## 2. 核心贡献

- **可预测扩展**：小模型损失拟合幂律 → 预测大模型最终损失（实际 GPT-4 预测误差 <1%）——[[10-Papers/01-架构演进/Scaling Laws for Neural Language Models（Scaling Laws）]] 的工程化升级
- **基础设施奇迹**：数千 GPU 上稳定训练数月（故障预测、自动恢复）
- **RLHF 规模化**：基于规则的 RM + PPO 的实战细节
- **多模态输入**：图文混合输入（视觉 tokenizer 化）

## 3. 方法概要（公开部分）

1. 预训练：多模态混合数据（未公开细节）、可预测扩展监控
2. 后训练：SFT + RLHF（PPO）
3. 评测：专业考试（律考/生物奥赛等人类基准）

## 4. 核心公式

- 损失预测：$L(N) = A N^{-\alpha} + E$ 外推（Kaplan 式幂律在内部数据重拟合）
- RLHF 部分即 [[30-Formulas/RLHF目标]] + [[30-Formulas/PPO裁剪目标]]

## 5. 与前作的关系

- 扩展了 [[10-Papers/01-架构演进/Language Models are Few-Shot Learners（GPT-3）]] 与 [[10-Papers/10-标杆锚点/Training Compute-Optimal Large Language Models（Chinchilla）]] 的规模科学
- 对齐栈沿用 [[Training language models to follow instructions with human feedback（InstructGPT）|InstructGPT]]

## 6. 影响与后续

- "预测大模型性能"成为大厂标配流程
- 开源界的对照目标（LLaMA 系对标）；多模态 API 形态定型
- 保密与开放的争论催化剂

## 7. 读前须知

[[10-Papers/01-架构演进/Scaling Laws for Neural Language Models（Scaling Laws）]]、[[30-Formulas/RLHF目标]]（无重数学门槛）

> 谱系成员（10）：[[Emergent Abilities of Large Language Models（涌现）]] · [[Gemini 1.5- Unlocking Multimodal Understanding Across Millions of Tokens of Context（Gemini 1.5）]] · [[Large Language Models- A Survey（LLM Survey 2024）]] · [[Length-Controlled AlpacaEval- A Simple Way to Debias Automatic Evaluators（AlpacaEval2）]] · [[MixEval- Deriving Wisdom of the Crowd from LLM Benchmark Mixtures（MixEval）]] · [[PaLM- Scaling Language Modeling with Pathways（PaLM）]] · [[Qwen2.5 Technical Report（Qwen2.5）]] · [[The Llama 3 Herd of Models（Llama3）]] · [[The Pile- An 800GB Dataset of Diverse Text for Language Modeling（Pile）]] · [[Training Compute-Optimal Large Language Models（Chinchilla）]]
