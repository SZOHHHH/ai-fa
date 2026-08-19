---
type: paper
title: STaR - Bootstrapping Reasoning With Reasoning
aliases: [STaR]
year: 2022
authors: [Eric Zelikman, Yuhuai Wu, Jesse Mu, Noah Goodman]
venue: NeurIPS 2022
arxiv: "2203.14465"
line: 推理模型
matrix_coords: [自我引导, 链, 自举(合理性过滤)]
tags: [paper]
---

# STaR（自举推理）

## 1. 一句话贡献

模型自己生成推理链、只保留导致正确答案的、拿去微调自己——"带提示的自我引导"（rationalization），R1 式自我提升的先声。

## 2. 核心贡献

- **自我引导循环**：采样 [[Chain-of-Thought Prompting Elicits Reasoning in Large Language Models（CoT）|CoT]] → 保留对的 → SFT → 更强 → 再采样
- **Rationalization 技巧**：给错误题的答案提示（hint），引导生成有效推理——"知其然再学其所以然"
- 无需人工标注推理数据

## 3. 方法概要

1. 模型对训练题采样 CoT
2. 保留最终答案正确的推理
3. 错题：给正确答案当 hint，重新生成推理再保留
4. 合并数据 SFT，循环迭代

## 4. 核心公式

- 自举：$\theta_{t+1} = \mathrm{SFT}(\{(x, z, y) : y = y^*\})$——**数据筛选的隐式 RL**（正确性当 reward，等价于无梯度策略改进）
- 与 [[GRPO与RLVR]] 的规则奖励同思想（早三年）

## 5. 与前作的关系

- 前置于 [[10-Papers/07-推理模型/Chain-of-Thought Prompting Elicits Reasoning in Large Language Models（CoT）]]：CoT 有了，STaR 让 CoT 进入模型权重
- 直系后续：Quiet-STaR（2024，内部自我推理）与 R1（RL 全面化）

## 6. 影响与后续

- "自我数据闭环"范式确立（V-STaR/ReST/ReST-EM 一族）
- R1 的"RL 从零涌现推理"可视为其极限化（无 hint、纯奖励）

## 7. 读前须知

[[40-Concepts/思维链（CoT）]]、[[10-Papers/07-推理模型/Chain-of-Thought Prompting Elicits Reasoning in Large Language Models（CoT）]]、[[30-Formulas/GRPO目标]]

> 近邻同族：[[A Survey on In-context Learning（ICL Survey）]] · [[Chain-of-Thought Prompting Elicits Reasoning in Large Language Models（CoT）]]
