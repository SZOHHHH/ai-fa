---
type: paper
title: Controlled Decoding from Language Models
aliases: [CD]
year: 2023
authors: [Mudgal et al. (Google)]
venue: ICLR 2024
arxiv: "2310.17022"
pdf: 已下载（PDF/）
line: 推理模型
matrix_coords: [测试时延长, 链, 推理期控制]
tags: [paper]
---

# CD

## 1. 一句话贡献

推理期解码即控制：value-guided 解码（CTRL 风格），LM+价值函数的 decode 时组合——token 级引导的 RL 无梯度版。

## 2. 核心贡献

1. 把 RLHF 的 KL 正则目标搬到解码步（每步按价值函数重排 logits）
2. 等价于每步做一步策略改进

## 3. 方法概要

把 RLHF 的 KL 正则目标搬到解码步（每步按价值函数重排 logits）；等价于每步做一步策略改进。
## 4. 核心公式


$$
P(y) \propto \exp\big(\log p_\theta(y) + \beta\, V(s,y)\big)\ \text{(逐 token 价值加权)}
$$


**直觉**：→ 测试时引导线；≡ OPD 的镜像（OPD 训练时注入 teacher 信号，CD 推理时注入价值信号）

## 5. 与前作/矩阵关系

解码即对齐的早期代表；test-time steering 谱系

## 6. 影响后续

需要：KL 正则下的最优解码形式（soft RL）

## 7. 读前须知

undefined

---

> 谱系枢纽：[[Chain-of-Thought Prompting Elicits Reasoning in Large Language Models（CoT）]]（图谱连通入口）

> 近邻同族：[[Large Language Monkeys- Scaling Inference Compute with Repeated Sampling（LL Monkeys）]] · [[Provable Scaling Laws for the Test-Time Compute of Large Language Models（PSL）]]

> 数学根基：[[思维链（CoT）]]
