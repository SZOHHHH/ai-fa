---
type: paper
title: Training language models to follow instructions with human feedback
aliases: [InstructGPT]
year: 2022
authors: [Long Ouyang, Jeff Wu, Xu Jiang, Diogo Almeida, Carroll L. Wainwright, Pamela Mishkin, Chong Zhang, Sandhini Agarwal, Katarina Slama, Alex Ray, et al.]
venue: NeurIPS 2022
arxiv: "2203.02155"
line: 强化学习与对齐
matrix_coords: [成对比较, RL目标(在线), 有]
tags: [paper]
---

# InstructGPT

## 1. 一句话贡献

把 RLHF 三阶段流程（SFT→RM→PPO）在 GPT-3 规模跑通——1.3B 的对齐模型胜过 175B 未对齐模型，ChatGPT 的直接前身。

## 2. 核心贡献

- **三阶段流水线定型**：SFT → 奖励模型 → PPO（+KL 锚）
- **规模反转发现**：对齐带来的可用性提升远超参数量提升
- **PPO 工程细节**：per-token KL 惩罚、奖励白化等实战配置（后来所有 RLHF 实现照抄）

## 3. 方法概要

1. SFT：人类示范微调 GPT-3 → $\pi_{\text{ref}}$
2. RM：标注员对模型输出排序 → 训 $r_\phi$
3. PPO：奖励 = $r_\phi(x,y) - \beta\log\frac{\pi_\theta}{\pi_{\text{ref}}}$，用 GAE+PPO 优化
4. 数据：指令多样来源；1.3B 模型即显著优于 175B 原版

## 4. 核心公式

- [[30-Formulas/RLHF目标]] —— 全流程目标
- [[30-Formulas/PPO裁剪目标]] —— 优化器（LLM 版配置）

## 5. 与前作的关系

- 组合了 [[10-Papers/04-强化学习与对齐/Deep reinforcement learning from human preferences（RLHF）]]（范式）与 [[10-Papers/04-强化学习与对齐/Proximal Policy Optimization Algorithms（PPO）]]（优化器）
- 扩展了 [GPT-3 few-shot] 到指令跟随场景

## 6. 影响与后续

- ChatGPT 的技术底座；"对齐税"（alignment tax）概念实证
- 催生 Alpaca/self-instruct 等指令数据生态
- 三阶段范式被 [[Direct Preference Optimization- Your Language Model is Secretly a Reward Model（DPO）|DPO]] 论文当作靶子（"两步就够了"）

## 7. 读前须知

[[20-Algorithms/RLHF]]、[[30-Formulas/RLHF目标]]、[[30-Formulas/PPO裁剪目标]]、[[40-Concepts/广义优势估计GAE]]
