---
type: paper
title: Deep reinforcement learning from human preferences
aliases: [Christiano RLHF, RLHF 2017]
year: 2017
authors: [Paul F. Christiano, Jan Leike, Tom B. Brown, Miljan Martic, Shane Legg, Dario Amodei]
venue: NeurIPS 2017
arxiv: "1706.03741"
line: 强化学习与对齐
matrix_coords: [成对比较, RL目标(在线), 有]
tags: [paper]
---

# Deep RL from Human Preferences（RLHF 开山）

## 1. 一句话贡献

证明"人类成对偏好 → 奖励模型 → RL"这条路在深度 RL 里可行——现代 LLM 对齐的整个范式原型。

## 2. 核心贡献

- **偏好→奖励**：BT 模型拟合人类偏好得 $r_\phi$
- **异步在线标注**：人类在训练过程中持续标偏好（非离线）
- **无需奖励工程**：复杂行为（模拟机器人、Atari）从人类判断学出

## 3. 方法概要

1. 策略与环境交互，定期产出两段行为片段
2. 人类标注哪段更好
3. $r_\phi$ 拟合偏好（[[40-Concepts/Bradley-Terry模型]] 损失）
4. 策略用 RL（TRPO）最大化 $r_\phi$
5. 循环：新片段→新标注→更新 RM→更新策略

## 4. 核心公式

- [[30-Formulas/RLHF目标]] —— 范式定义
- [[40-Concepts/Bradley-Terry模型]] —— RM 训练损失

## 5. 与前作的关系

- 继承 [TAMER / 人类偏好RL 早期工作]：但首次深度 RL + 在线规模验证
- 呼应 [CIRL/assistance games]：对齐的博弈论视角（同期平行工作）

## 6. 影响与后续

- 被 [[Training language models to follow instructions with human feedback（InstructGPT）|InstructGPT]] 搬进 LLM——ChatGPT 的直系技术源头
- 作者群（Christiano/Leike/Brown/Amodei）后来构成 OpenAI 与 Anthropic 的核心——论文即"对齐"事业起点
- "reward hacking / scalable oversight" 研究议程由此展开

## 7. 读前须知

[[40-Concepts/Bradley-Terry模型]]、[[40-Concepts/策略梯度定理]]、[[40-Concepts/KL散度]]
