---
type: paper
title: On-Policy Distillation（Thinking Machines 博客）
aliases: [OPD 博客, Tinker OPD]
year: 2025
authors: [Kevin Lu, Thinking Machines Lab]
venue: 博客（Connectionism, 2025-10）
arxiv: "无（技术博客）"
pdf: none（博客原文 https://thinkingmachines.ai/blog/on-policy-distillation/）
line: 强化学习与对齐
matrix_coords: [学生轨迹, 反向KL, token级]
tags: [paper]
---

# Thinking Machines《On-Policy Distillation》

## 1. 一句话贡献

把 OPD 讲成一句话——**"带 KL 正则的 RL 改一行：把正则模型换成 teacher"**——并用 Qwen3 复现验证其恐怖效率：AIME'24 74.4% / 1,800 GPU 时 vs RL 67.6% / 17,920 GPU 时（**10 倍便宜还更强**）。

## 2. 核心贡献

1. 概念澄清：SFT=off-policy+dense、RL=on-policy+sparse、**OPD=on-policy+dense**（取两家之长）
2. 实现：per-token 反向 KL 直接当 advantage（`A_t = -(logπ_S − logπ_T)`），teacher 只需一次前向算 logprob，无梯度穿过
3. 系列实验：数学蒸馏（9-30× 算力效率）、自蒸馏（RL 策略蒸馏回 base，50-100×）、单 prompt 数据复用、持续学习（SFT 忘记的行为被 OPD 恢复）
4. 理论观点：RL 的算力花在**策略搜索**上，蒸馏只需学**最终策略**——"搜索与学习分离"

## 3. 方法概要

RLHF/RLVR 框架不动：采样（student）→ 算奖励（换成 teacher logprob 差）→ [[重要性采样]]。KL(π_S∥π_T) 逐 token 无偏单样本估计。折扣因子取 0（每步只看下一个 token）。

## 4. 核心公式

$$r_t = \log\pi_{\text{teacher}}(y_t\mid y_{<t}) - \log\pi_\theta(y_t\mid y_{<t}),\qquad A_t = -r_t = \mathrm{KL}_t(\pi_\theta\Vert\pi_{\text{teacher}})$$

反向 KL"不可 hack"：KL 低 ⟺ 高概率生 teacher 认可的 token（不像学出来的 RM 会被钻空子）。mode-seeking（学一个确定行为而非平均多个）+ 免曝光偏差。

**直觉**：把"教师的每次心跳"变成打分——学生每说一个 token，教师立刻告诉它"我会这么说吗"。90 分钟 RL 换 9 分钟 OPD。

## 5. 与前作关系

- ← DAGGER(2010)（学生状态+教师修正思想源头）→ [[On-Policy Distillation of Language Models- Learning from Self-Generated Mistakes（GKD）|GKD]]/[[MiniLLM- On-Policy Distillation of Large Language Models（MiniLLM）]]（2023 学术版）→ Qwen3 技术报告（生产版）→ 本博客（**工程化定型 + 传播引爆**）
- ≡ [[Let's Verify Step by Step（PRM）|PRM]]（[[10-Papers/07-推理模型/Let's Verify Step by Step（PRM）]]）：博客自认"类似过程奖励建模"——token 级信号，但奖励源是 teacher 分布而非标注的步级评分器
- #loss/distillation + #loss/expectation-of-ratio（IS 损失借 RL 基建）

## 6. 影响后续

引爆 2025-26 OPD 浪潮：survey（2604.00626）、[[Entropy-Aware On-Policy Distillation of Language Models（EOPD）|EOPD]]（ICML 2026）、verl/Tinker cookbook 落地。**开放问题（原文点名）：per-token 蒸馏奖励与序列级环境奖励的组合——[[60-Matrices/蒸馏域矩阵]] §3 的核心机会格即由此来**。

## 7. 读前须知

- 需要：KL 正则在 RLHF 中的角色（π_ref 锚）——OPD 只是换了锚（teacher）
- 关键差异：logprob 差当 reward 时**不需要反向传播穿过 teacher**（一次前向），这是便宜的本质
- 免责：博客数字基于 Tinker 平台，复现需注意其 FLOPs 折算口径（博客自己给了三种口径 9×/18×/30×）

> 数学根基：[[策略梯度定理]]

> 数学根基：[[蒸馏损失]] · [[DSM目标]]
