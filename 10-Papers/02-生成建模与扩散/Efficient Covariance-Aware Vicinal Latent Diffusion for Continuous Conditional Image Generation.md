---
type: paper
title: Efficient Covariance-Aware Vicinal Latent Diffusion for Continuous Conditional Image Generation
aliases: [CAViLD]
year: 2026
authors: [Xin Ding, Shuo Huang, Zhenglong Ding, Sen Zhang, Nenglun Chen, Peibei Cao, Yongwei Wang, Fei Wu]
venue: 待核（arXiv 2026-10-29）
arxiv: "2610.39277v1"
pdf: https://arxiv.org/pdf/2610.39277v1
line: 生成建模与扩散
matrix_coords: [连续条件生成(CCGM), 潜扩散特化, 4NFE渐进蒸馏]
tags: [paper]
---
# CAViLD：连续条件生成的高效协方差感知邻域潜扩散

> 中文速览：面向连续标量标签条件生成（CCGM）的高效潜扩散框架 CAViLD：先构建净化的条件感知潜空间（密度自适应邻域学习缓解长尾标签数据稀疏+辅助语义正则+NIQE 引导的负样本增广），再用 EMA 教师把 CFG 引导方向内化进单支路推理（免推理期双前向），最后对标签依赖的概率流 ODE 做协方差感知渐进蒸馏，采样压到 4 NFE。RC-49/UTKFace/Steering Angle 三基准上生成保真、条件一致与采样效率三边占优。

## 1. 一句话贡献

把 CCGM（连续标量标签条件生成）的三大痛点——长尾标签数据稀疏、推理期 CFG 双前向开销、多步采样开销——分别用条件感知潜空间、EMA 教师内化引导、协方差感知渐进蒸馏（4 NFE）打包解决。

## 2. 核心贡献
- （待精读）

## 3. 方法概要
（待精读）

## 4. 核心公式
（待精读）

## 5. 与前作/矩阵关系
- ← 前身：[[10-Papers/02-生成建模与扩散/Progressive Distillation for Fast Sampling of Diffusion Models（渐进蒸馏）|渐进蒸馏]]（协方差感知版）与 [[20-Algorithms/潜在扩散模型（LDM）|LDM]]（潜空间+连续条件特化）；邻域学习承 Vicinal/标签邻域正则线；
- ≡ 同族近邻（261103）：CFG 内化与 [[10-Papers/02-生成建模与扩散/Improved Distribution Matching Distillation for Fast Image Synthesis（DMD2）|DMD2]] 的教师 CFG 处理对照（训练期解决 vs 推理期加倍前向）；少步端 4 NFE 与 [[10-Papers/02-生成建模与扩散/One Step Diffusion via Shortcut Models（Shortcut）|Shortcut]]/[[10-Papers/02-生成建模与扩散/Mean Flows for One-step Generative Modeling（MeanFlow）|MeanFlow]] 一步家族对照（渐进蒸馏路线 vs 流图路线）；
- 概念链：[[30-Formulas/无分类器引导（CFG）]] · [[30-Formulas/概率流ODE]]（标签依赖 PF-ODE）· [[30-Formulas/蒸馏损失]] · [[40-Concepts/NFE（函数求值次数）]] · [[20-Algorithms/扩散模型]]。

## 6. 影响后续
（待精读）

## 7. 读前须知
（待精读）原文：https://arxiv.org/pdf/2610.39277v1；在线全文（新论文）：https://arxiv.org/html/2610.39277v1

---

> 谱系枢纽：[[10-Papers/02-生成建模与扩散/Progressive Distillation for Fast Sampling of Diffusion Models（渐进蒸馏）|渐进蒸馏]]（图谱连通入口）

> 数学根基：[[30-Formulas/无分类器引导（CFG）]] · [[30-Formulas/概率流ODE]] · [[30-Formulas/蒸馏损失]]
