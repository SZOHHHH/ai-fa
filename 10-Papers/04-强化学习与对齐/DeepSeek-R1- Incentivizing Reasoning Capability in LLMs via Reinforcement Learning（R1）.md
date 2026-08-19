---
type: paper
title: DeepSeek-R1 - Incentivizing Reasoning Capability in LLMs via Reinforcement Learning
aliases: [DeepSeek-R1, R1]
year: 2025
authors: [DeepSeek-AI]
venue: arXiv 2025
arxiv: "2501.12948"
line: 强化学习与对齐
matrix_coords: [RLVR(可验证), RL目标(在线), 有]
tags: [paper]
---

# DeepSeek-R1（纯 RL 训出推理）

## 1. 一句话贡献

证明不依赖监督推理数据，纯 RL（[[GRPO与RLVR|GRPO]] + 规则奖励）就能激励出长链推理能力——RLVR 范式的宣言论文（o1 路线的开源对应）。

## 2. 核心贡献

- **R1-Zero**：基座模型直接 GRPO，无 SFT——涌现自我验证、反思、长思维链（aha moment）
- **R1**：多阶段流水线（少量冷启动 SFT → 推理 RL → 拒绝采样 SFT → 全场景 RL）
- **规则奖励**：答案正确性 + 格式分——零奖励模型，零 reward hacking 空间
- **蒸馏发现**：R1 蒸馏到小模型 > 小模型自 RL——"大模型教出来的更强"

## 3. 方法概要

1. R1-Zero：模板约束（<think> 标签）+ GRPO，奖励=答案对错+格式
2. 观察：推理链自然变长、出现反思行为（无监督信号下的涌现）
3. R1：冷启动 SFT 数千条 → 推理 RL → 拒绝采样生成新 SFT 数据 → 再 RL（含通用对齐）
4. 蒸馏：R1 输出训练 Qwen/Llama 小模型

## 4. 核心公式

- [[30-Formulas/GRPO目标]]（RL 阶段引擎）
- 蒸馏部分对应 [[30-Formulas/DDPM训练目标]] 家族外的标准 KD 损失（线 3 交叉）

## 5. 与前作的关系

- 扩展了 [[10-Papers/04-强化学习与对齐/DeepSeekMath- Pushing the Limits of Mathematical Reasoning in Open Language Models（DeepSeekMath）]]（GRPO 场景从数学到通用推理）
- 对比 o1（2024，闭源报告）：开放了完整配方
- 组合了 [[10-Papers/04-强化学习与对齐/Proximal Policy Optimization Algorithms（PPO）]] 谱系思想与规则奖励

## 6. 影响与后续

- 2025 年推理模型井喷的引爆点（Qwen-QwQ、Open-R1 复现社区、无数 distill 模型）
- RLVR 成为主流训练阶段（与 SFT/对齐并列）
- 与线 7（推理模型）交叉标注：[[Chain-of-Thought Prompting Elicits Reasoning in Large Language Models（CoT）|CoT]]/[[Let's Verify Step by Step（PRM）|PRM]] 的 RL 路线终点

## 7. 读前须知

[[30-Formulas/GRPO目标]]、[[20-Algorithms/GRPO与RLVR]]、[[40-Concepts/期望]]
