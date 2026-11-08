---
type: paper
title: "SwarmEvolve: Latent Agent Swarms for Evolutionary Discovery and Optimization"
aliases: []
year: 2026
authors: [Qile, Jiang]
venue: 待核（占位层，来自 arXiv 2026-11-05）
arxiv: "2611.08483v1"
pdf: https://arxiv.org/pdf/2611.08483v1
line: 推理模型
matrix_coords: 待评
tags: [paper, 占位层]
layer: 占位
---
# SwarmEvolve: Latent Agent Swarms for Evolutionary Discovery and Optimization

> **占位层卡**（daily 自动采集 2026-11-08 建卡，元数据出自 arXiv API=已核实）。本链 Claude 处理段将自动精读升级：七节补全+中文速览+挂全链。
> 摘要（原文）：LLM-guided evolutionary search uses AI agents to improve programs for mathematical and computational problems by iteratively refining solutions and combining high-scoring methods. However, the process is often slow because the LLM generates a long textual chain of thought for each round and must repeat this generation many times to maintain population diversity. We present SwarmEvolve, a framework in which hundreds of low-cost agents per round work in swarms, reason in latent space without decoding to text, and share information by passing KV caches. Each swarm studies the problem from a diffe

## 1. 一句话贡献
（待精读）

## 2. 核心贡献
- （待精读）

## 3. 方法概要
（待精读）

## 4. 核心公式
（待精读）

## 5. 与前作/矩阵关系
- ← 谱系：LLM 引导进化搜索（AlphaEvolve 线）×[[40-Concepts/思维链（CoT）]] 去 Text 化——群体在潜空间推理不解码文本
- ≡ 潜在推理同族：[[10-Papers/07-推理模型/Astar-Thought-V2 - Efficient Latent Reasoning via Geometric Dynamics of LLM（Astar-Thought-V2）|Astar-Thought-V2]]（单 agent 潜空间推理提效）/ [[10-Papers/07-推理模型/Lapras Latent Reasoning for Time Series Language Models|Lapras]]——本文把它推到"数百 agent 群体+KV 互传"规模
- ≡ 程序搜索前辈：[[10-Papers/07-推理模型/The AI Scientist- Towards Fully Automated Open-Ended Scientific Discovery（AI Scientist）|AI Scientist]]（单 LLM 长链慢迭代 → 群体潜空间 3-8 分钟达 60 分钟水平）
- ⊃ 机制工具：[[40-Concepts/KV缓存]]（agent 间传 KV=零解码通信；summarizer 收全群合并 KV 完成潜空间交叉）· 隐状态向量距离做新颖性过滤

## 6. 影响后续
（待精读）

## 7. 读前须知
（待精读）原文：https://arxiv.org/pdf/2611.08483v1；在线全文（新论文）：https://arxiv.org/html/2611.08483v1
