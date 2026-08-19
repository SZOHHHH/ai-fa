---
type: paper
title: HybridFlow- A Flexible and Efficient RLHF Framework
aliases: [verl]
year: 2024
authors: [Sheng et al. (伯克利 vLLM 团队)]
venue: EuroSys 2025
arxiv: "2409.19256"
pdf: 已下载（PDF/）
line: 架构演进
matrix_coords: [—, —, —]
tags: [paper]
---

# verl

## 1. 一句话贡献

RLHF/RLVR 训练系统的解耦设计：单控制器编排+混合引擎（训练/生成/推理三角色复用）——**OPD/[[GRPO与RLVR|GRPO]] 实验的标准底座**。

## 2. 核心贡献

1. Hybrid controller：单控制器逻辑+多 worker 执行
2. 模型分片复用避免重载
3. Colocate 资源调度

## 3. 方法概要

Hybrid controller：单控制器逻辑+多 worker 执行；模型分片复用避免重载；Colocate 资源调度。
## 4. 核心公式


$$
\text{Controller}(\text{plan}) \to \text{Workers}(\text{train/rollout/eval})\ \text{混合引擎}
$$


**直觉**：→ OPD 文档（verl 内置）/[[DAPO- An Open-Source LLM Reinforcement Learning System at Scale（DAPO）|DAPO]] recipe/[[Entropy-Aware On-Policy Distillation of Language Models（EOPD）|EOPD]] 实验底座——B10-B14 全部 OPD 论文的公共基础设施；→ [[Efficient Memory Management for Large Language Model Serving with PagedAttention（vLLM）]]（同系）

## 5. 与前作/矩阵关系

OPD 浪潮的工程使能者；用户若做 OPD 系实验即在此框架上

## 6. 影响后续

无新数学；系统论文；读 OPD 论文时遇到的 verl 术语出处

## 7. 读前须知

undefined

> 近邻同族：[[Adam- A Method for Stochastic Optimization（Adam）]] · [[Bag of Tricks for Efficient Text Classification（FastText）]]

> 数学根基：[[注意力机制]]

> 数学根基：[[REINFORCE目标]]
