---
type: paper
title: "Semigroup-JEPA: Latent Dynamics Consistency for Zero-Shot Physics Generalization"
aliases: [Semigroup-JEPA]
year: 2026
authors: Andy Zeyi Liu, Haoran Sun, Lucas Baker, Randall Balestriero, John Sous
venue: arXiv
arxiv: 2609.10464
pdf: https://arxiv.org/pdf/2609.10464
line: 世界模型与JEPA
matrix_coords: 待评
tags: [paper, 占位, 0910补扫]
---

## 1. 一句话贡献

把"控制物理规律的参数"（如引力场强度）当动作条件注入 JEPA 世界模型，联合训练编码器+预测器，让 latent rollout 在陌生物理下也能外推——零样本物理泛化。

## 2. 核心贡献

- 物理参数动作条件化：同一物理定律、不同参数（弱引力漂浮 ↔ 强引力急弹）共享一个时间模型，形成"物理半群"结构
- 多步 rollout loss 反传进表征：编码器被迫保留"预测器带得走"的特征——即动力学真正依赖的特征
- 2D 开环误差降 2×（vs DINO-WM）；3D 机器人控制成功率升 2.5×（配独立 diffusion policy）
- 线性特征模型把 rollout 误差拆成"局部误差"与"递归放大"两部分，解释增益主要来自编码器学到更好的特征而非预测器学得更好

## 3. 方法概要

① LeWorldModel 框架上把物理参数并入动作通道 → ② 自回归 latent rollout 联合训编码器+预测器（多步损失反传） → ③ 设计不同引力场下的动力学任务做 OOD 测试 → ④ 线性特征模型归因分析

## 4. 核心公式

（待精读——占位卡，Tier 升级时补）

## 5. 与前作/矩阵关系

- 谱系锚：[[20-Algorithms/世界模型]]，[[20-Algorithms/扩散模型]]

## 6. 影响后续

（待精读）

## 7. 读前须知

（待精读；升级时按 [[00-Meta/模板与建模指南]] 补全）

> 建卡：2026-09-10 哨兵盲区补扫（API 429 限流期间经 arxiv.org 网页搜索通道人工核对元数据）
