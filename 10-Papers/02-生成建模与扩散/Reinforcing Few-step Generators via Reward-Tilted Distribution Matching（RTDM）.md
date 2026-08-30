---
type: paper
layer: 占位
title: Reinforcing Few-step Generators via Reward-Tilted Distribution Matching
aliases: [RTDM]
year: 2026
authors: [（arXiv）]
venue: arXiv 2026
arxiv: "2605.26108"
pdf: 已下载（PDF/）
line: 生成建模与扩散
matrix_coords: [FM, 蒸馏+RL, 蒸馏预训练]
tags: [paper, 占位层]
---

# Reinforcing Few-step Generators via Reward-Tilted Distribution Matching（RTDM·七节版）

## 1. 一句话贡献

奖励倾斜的分布匹配：少步生成器的 RL 微调（蒸馏+奖励组合）——**生成域的"蒸馏×RL"组合占位**。

## 2. 核心贡献

1. 奖励倾斜的分布匹配：少步生成器的 RL 微调（蒸馏+奖励组合）
2. 生成域的"蒸馏×RL"组合占位。

## 3. 方法概要

[[One-step Diffusion with Distribution Matching Distillation（DMD）|DMD]] 类蒸馏目标加奖励倾斜项，生成器一步采样被 RL 拉向高奖励。

## 4. 核心公式

$$
\mathcal{L} = \mathrm{KL}(p_\theta\ \Vert\ p_T) - \eta\,\mathbb{E}_{p_\theta}[r(x)]\ \text{(蒸馏+奖励)}
$$

**直觉**：占位层公式为结构示意，精读原文后应校正为论文最终形式并补逐项解释。

## 5. 与前作/矩阵关系

🚩🚩 占生成域蒸馏×奖励格——**复核补注**：此交叉在 LLM 域五连占，生成域也已有占位（Diff-Instruct++ 人类偏好+RTDM 奖励倾斜）


## 6. 影响与占位意义

RS 库 05-25 已有；**这个格的敌情对 RS 主线（蒸馏服务 RL）直接相关**。

> 近邻同族：[[Align Your Flow- Scaling Continuous-Time Flow Map Distillation（AYF）]] · [[Computational and Statistical Guarantees of the c-Rectified flow（c-RF理论）]]
> 数学根基（占位层）：[[概率分布]]
> 数学根基：[[REINFORCE目标]]

## 7. 读前须知

需要：蒸馏损失族（前向 KL/反向 KL/矩匹配/分布匹配）；teacher-student 分布失配；fake score 的角色
