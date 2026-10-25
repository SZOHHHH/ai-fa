---
type: paper
title: "Ask the Expert: LLM-Guided Reinforcement Learning for Autonomous Cyber Defense"
aliases: []
year: 2026
authors: [Fernando, Martinez]
venue: 待核（占位层，来自 arXiv 2026-10-07）
arxiv: "2610.09337v1"
pdf: https://arxiv.org/pdf/2610.09337v1
line: 架构演进
matrix_coords: 待评
tags: [paper, 占位层]
layer: 占位
---
# Ask the Expert: LLM-Guided Reinforcement Learning for Autonomous Cyber Defense

> **占位层卡**（daily 自动采集 2026-10-12 建卡，元数据出自 arXiv API=已核实）。本链 Claude 处理段将自动精读升级：七节补全+中文速览+挂全链。
> 摘要（原文）：Policy-based reinforcement learning (RL) approaches have produced promising results for autonomous cyber defense; however, they are sample-inefficient in settings where defenders must respond under delayed, partial observations with actions from large action spaces. While large language models (LLMs) may reason semantically about security state space, high latency and trust assumptions prevent attractive in-line deployment models. We introduce Ask the Expert, a training-time guidance framework which first summarizes hard cyber-defense states, then intermittently queries an LLM for host-level d

## 1. 一句话贡献
解决网络防御 RL 样本效率低（延迟部分观测+大动作空间）与 LLM 高延迟不可在线部署的矛盾：训练期指导框架"Ask the Expert"——总结难状态、间歇性经受限动作接口查询 LLM 主机级防御建议、转成分层奖励塑形喂给 PPO，训练完丢弃 LLM、部署纯 RL 策略；CAGE CC1/CC2 上样本效率超 PPO 并胜 PBRS 基线。

## 2. 核心贡献
- （占位层，待精读补充）

## 3. 方法概要
（占位层，待精读补充）

## 4. 核心公式
（占位层，待精读补充）

## 5. 与前作/矩阵关系
- 公式锚：[PPO裁剪目标](/ai-fa/explore/30-Formulas/PPO裁剪目标)（底座优化器）· [注意力核心公式](/ai-fa/explore/30-Formulas/注意力核心公式)
- 概念锚：[策略梯度定理](/ai-fa/explore/40-Concepts/策略梯度定理) · [思维链（CoT）](/ai-fa/explore/40-Concepts/思维链（CoT）)（LLM 语义推理作为训练期专家知识源）· [Transformer](/ai-fa/explore/20-Algorithms/Transformer)

## 6. 影响后续
（待精读）

## 7. 读前须知
（待精读）原文：https://arxiv.org/pdf/2610.09337v1；在线全文（新论文）：https://arxiv.org/html/2610.09337v1
