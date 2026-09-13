---
type: paper
title: "Decision-Metric Alignment in Latent World Models: Diagnostics and Action-Conditioned Objectives for MPC Planning"
aliases: [Decision-Metric Alignment in Latent World Models]
year: 2026
authors: Jiawei Wang, Ke Rui, Yushen Zuo, Yichun Feng, Minglei Li
venue: arXiv
arxiv: 2608.18746
pdf: 10-Papers/PDF/Decision-Metric Alignment in Latent World Models Diagnostics and Action-Conditioned Objectives for MPC Planning.pdf
line: 世界模型与JEPA
matrix_coords: 待评
tags: [paper, 占位, 0910补扫]
---

## 1. 一句话贡献

JEPA 世界模型解码再好，"到目标的 latent 欧氏距离"也不保证按真实任务进度给候选动作排序——作者命名这一缺口为 decision-metric alignment，并用 IDM+目标动作头修复。

## 2. 核心贡献

- 命名并度量缺口：Plan-Real Spearman（随机规划上 latent-真实排名一致性）与 CEM-stage Spearman（搜索聚焦处的一致性）两个诊断
- 理论刻画：encoder 畸变、终端 rollout 误差、候选动作间隔三个量控制距离保序的充分条件
- DA-LeWM 修复：在 LeWM 上加逆动力学（IDM）+ 示范条件化 goal-action 头——让 latent 几何被动作结构塑形
- 全实验加速收敛、在线成功率高于 LeWM（探针分数相近——表征"能力"没变，"几何"变了）

## 3. 方法概要

① 定义 decision-metric alignment + 双 Spearman 诊断 → ② 在 LeWM 上定位经验性对齐缺口 → ③ 加 IDM 头+示范条件化目标动作头 → ④ CEM 规划在线评测对照

## 4. 核心公式

（待精读——占位卡，Tier 升级时补）

## 5. 与前作/矩阵关系

- 谱系锚：[[20-Algorithms/世界模型]]，[[30-Formulas/MCTS置信上界]]
- **哨兵研判（9/10 补扫）**：🟢→强同盟（今日最重要的手工补录）：**E1 命题的 latent 版同构**——"latent 距离（表征保真）不保证任务排序（决策保真）"正是我们"像素保真≠决策保真"在潜空间的镜像表述；且修复件恰好是 IDM 头（与 E2 同款）。8/19 发文、哨兵盲区期（每日链 9/6 才建）错过——本次补录。E1 理论章 + E2 动机节双挂。

## 6. 影响后续

（待精读）

## 7. 读前须知

（待精读；升级时按 [[00-Meta/模板与建模指南]] 补全）

> 建卡：2026-09-10 哨兵盲区补扫（API 429 限流期间经 arxiv.org 网页搜索通道人工核对元数据）
