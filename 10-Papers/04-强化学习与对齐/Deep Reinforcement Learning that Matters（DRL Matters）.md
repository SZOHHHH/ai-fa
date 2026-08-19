---
type: paper
title: Deep Reinforcement Learning that Matters
aliases: [DRL Matters]
year: 2017
authors: [Henderson et al.]
venue: AAAI 2018
arxiv: "1709.06560"
pdf: 已下载（PDF/）
line: DRL 复现性危机的系统解剖：随机种子/超参/实现差异导致结果剧变——**DRL 科学的地基检测报告**（本库 RL 线的"实验方法论锚点"）。
matrix_coords: 强化学习与对齐
tags: [paper]
---

# DRL Matters

## 1. 一句话贡献

跨实现/种子/环境的系统对照实验；报告方差与偏差源。

## 2. 核心贡献

1. $$
\text{Var}(\text{score}\ \vert\ \text{seed, impl, env})\ \text{系统测量}
$$

## 3. 方法概要

$$
\text{Var}(\text{score}\ \vert\ \text{seed, impl, env})\ \text{系统测量}
$$
## 4. 核心公式

→ RLYork/SPIRAL 等基准线；RS 主线做 RL 实验时必须引用的"防自欺手册"

**直觉**：DRL 报告规范的推动者；种子方差的著名证据（同算法同环境结果差 2 倍）

## 5. 与前作/矩阵关系

需要：无数学；读作方法论疫苗

## 6. 影响后续

undefined

## 7. 读前须知

undefined

---

> 谱系枢纽：[[Direct Preference Optimization- Your Language Model is Secretly a Reward Model（DPO）]]（图谱连通入口）

> 近邻同族：[[A General Language Assistant as a Laboratory for Alignment（Assistant Lab）]] · [[A General Theoretical Paradigm to Understand Learning from Human Preferences（IPO）]]

> 数学根基：[[策略梯度定理]]

> 数学根基：[[REINFORCE目标]]
