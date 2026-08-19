---
type: paper
title: On-Policy Distillation of Language Models - Learning from Self-Generated Mistakes
aliases: [GKD]
year: 2023
authors: [Rishabh Agarwal, Nino Vieillard, Yongchao Zhou, Piotr Stanczak, Ouafi Mansouri, Vladislav Kolesnikov, Matteo Hessel, Luca Zappella]
venue: arXiv 2023 / OpenReview（821+ 引用）
arxiv: "2306.13649"
pdf: 已下载
line: 强化学习与对齐
matrix_coords: [学生轨迹, JSD/混合, token级]
tags: [paper]
---

# GKD（On-Policy Distillation of Language Models）

## 1. 一句话贡献

把"在谁的分布上训练"变成一个**连续可调的混合系数**——GKD（Generalized Knowledge Distillation）统一了 SFT、SeqKD 与 on-policy 蒸馏，并证明**学生自己的错误轨迹 + 反向 KL/JSD** 是自回归 LM 蒸馏的更好配方。

## 2. 核心贡献

1. 诊断传统蒸馏的死穴：**train/inference 分布失配**（教师轨迹上的状态 ≠ 学生推理时会到访的状态），自回归误差复合
2. 统一框架：on-policy 权重 α∈[0,1] 混合教师/学生数据 × {前向 KL、反向 KL、JSD} 三种散度
3. 实证：on-policy + 反向 KL 在 T5 系上 MMLU/BBH 全面胜出

## 3. 方法概要

标准蒸馏在教师分布上学前向 KL：$\mathbb{E}_{y\sim\pi_T}[\log(\pi_T/\pi_S)]$——问题是学生推理时自己犯错进入教师从未到访的状态（DAGGER 的 imitation learning 视角）。GKD 改为**在学生分布上取期望**（on-policy），散度用学生采样下可无偏估计的反向 KL 或 JSD。策略梯度技巧让反向 KL 不需要遍历词表求和。

## 4. 核心公式

$$\mathcal{L}_{GKD} = \mathbb{E}_{y\sim[(1-\alpha)\pi_T + \alpha\pi_S]}\Big[(1-\beta)\,\mathrm{KL}(\pi_S\Vert\pi_T) + \beta\,\mathrm{JSD}(\pi_S\Vert\pi_T)\Big]$$

- α：数据来源混合（α=0 退化为 SeqKD，α=1 纯 on-policy）
- β：散度选择（β=0 反向 KL，β=1 JSD）
- 逐 token 计算散度（token 级期望），可用单样本估计

**直觉**：α 控制"在谁的地盘上学习"——0 是看棋谱（教师局面），1 是自己下棋有人复盘（学生局面）。β 控制"学得像不像"——反向 KL 只抓教师的强模式，JSD 折中。

## 5. 与前作关系

- ≡ **DAGGER**（2010，imitation learning）：学生状态访问 + 教师修正——GKD 是其 LM 蒸馏版
- ⊃ **SeqKD/SFT**：α=0 特例
- #loss/distillation：与 [[30-Formulas/蒸馏损失]]（Hinton 前向 KL）同族，作用域从"教师 logits"扩到"学生轨迹上的散度选择"

## 6. 影响后续

[[MiniLLM- On-Policy Distillation of Large Language Models（MiniLLM）|MiniLLM]]（策略梯度化反向 KL）→ Qwen3-OPD（生产级验证）→ [[On-Policy Distillation（Thinking Machines 博客）]]（RL 框架一句话实现）→ [[Entropy-Aware On-Policy Distillation of Language Models（EOPD）]]（ICML 2026，熵修复）。**OPD 家族的直接源头**。

## 7. 读前须知

- 需要：KL 散度的两种方向（前向=质量覆盖，反向=模式搜索）——见 40-Concepts/ 目录下 KL散度、策略梯度相关概念卡
- 反向 KL 为何能用单样本估计：$\mathbb{E}_{y\sim\pi_S}[\log\pi_S - \log\pi_T]$ 里两项都是采样样本的 log 概率，不需要对整个词表求和——**这是整个 OPD 家族计算可行的钥匙**
- JSD 用 Jensen 不等式取下界保证可训
