---
type: paper
title: "What Drives the Zero-to-One Jump? Diagnosing and Steering Hard-Prompt Learning in RLVR"
aliases: [Zero-to-One Jump, NAPO, Negative-Augmented Policy Optimization]
year: 2026
authors: [Rui Zhu, Yumou Liu, Zhenzhe Zheng, Fan Wu]
venue: EMNLP 2026（arXiv 2026-11-02）
arxiv: "2611.02747v1"
pdf: https://arxiv.org/pdf/2611.02747v1
line: 强化学习与对齐
matrix_coords: [RLVR诊断(TTFP事件分析), GRPO负样本分级, 难题早解锁]
tags: [paper]
---
# What Drives the Zero-to-One Jump?：RLVR 难题跳变的诊断与导航（NAPO）

> 中文速览：研究 RLVR 难题的「零到一跳变」——某个 prompt 可长期无解后突然学会，其动力学与可操控性此前不明。事件化分析（度量首正样本时间 TTFP）发现：成功转变前的负 rollout 一致保持更高的早期生成熵，可区分「近可解失败」与「死路」。据此提出 NAPO（负样本增强策略优化）：在 GRPO 内用早期分支驱动器对未解决组的负样本排序并赋分级优势，恰在标准组相对更新梯度消失处注入信息性梯度。效果：固定 rollout 预算下加速早期解发现，AIME24/AIME2025 Pass@256 分别 +10.0/+6.6 点（EMNLP 2026）。

## 1. 一句话贡献

用事件化分析（TTFP）诊断 RLVR 难题的「零到一跳变」：成功转变前的负 rollout 一致保持更高早期生成熵（区分近可解失败与死路）；据此提出 NAPO 在 GRPO 未解决组内对负样本分级赋优势——恰在组相对更新梯度消失处注入信号，固定 rollout 预算下 AIME24/25 Pass@256 +10.0/+6.6 点。

## 2. 核心贡献
- （待精读）

## 3. 方法概要
（待精读）

## 4. 核心公式
（待精读）

## 5. 与前作/矩阵关系
- 线锚：[[20-Algorithms/RLHF]] · [[20-Algorithms/GRPO与RLVR]]（NAPO 直接嵌在 GRPO 组相对框架内——挖的是「未解决组梯度消失」这块被浪费的 rollout）；
- ≡ 同族近邻（261104）：[[10-Papers/04-强化学习与对齐/Density-Aware Reward Scaling A Reinforcement Learning Framework for Reward-Proportional Sampling|DARS]]（同日同题：都挖 GRPO 组内被浪费的信号——DARS 挖正样本密度、NAPO 挖负样本分级）；[[10-Papers/04-强化学习与对齐/ThinkPrior Zero-Rollout Difficulty Priors for Cold-Start Prompt Selection in RLVR|ThinkPrior]]（难题选择 vs 难题诊断：一个避零优势组、一个救零优势组）；
- 概念/公式链：[[30-Formulas/GRPO目标]]（NAPO 改的就是其组内优势分配——全零优势组的梯度消失点是插入点）· [[40-Concepts/熵正则RL]]（生成熵作诊断信号而非正则目标）· [[40-Concepts/策略梯度定理]]。

## 6. 影响后续
（待精读）

## 7. 读前须知
（待精读）原文：https://arxiv.org/pdf/2611.02747v1；在线全文（新论文）：https://arxiv.org/html/2611.02747v1

---

> 谱系枢纽：[[20-Algorithms/GRPO与RLVR]]（图谱连通入口）

> 数学根基：[[30-Formulas/GRPO目标]] · [[40-Concepts/熵正则RL]] · [[40-Concepts/策略梯度定理]]
