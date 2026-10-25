---
type: paper
title: "Decision-Metric Alignment in Latent World Models: Diagnostics and Action-Conditioned Objectives for MPC Planning"
aliases: [Decision-Metric Alignment in Latent World Models]
year: 2026
authors: Jiawei Wang, Ke Rui, Yushen Zuo, Yichun Feng, Minglei Li
venue: arXiv
arxiv: 2608.18746
pdf: https://arxiv.org/pdf/2608.18746
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
- 评测学表亲（260923）：[[10-Papers/04-强化学习与对齐/Toward Auditable and Calibrated AI for Dementia-Related Crash Severity Prediction A Selective Deferr|Crash Triage Deferral]]——"准确率≠分诊效用"的公共服务域版本（非对称漏分代价+校准+选择性推迟），跨域同族但无 WM/RL 内涵，仅作动机引例。

## 6. 影响后续

- → 后继补记（261009）：[[10-Papers/09-世界模型与JEPA/KineWorld Action-Induced Transport Fields for Embodied World Modeling|KineWorld]]——同「生成目标与决策需求错位」动机的机器人版落地：用动作导出的传输场对生成监督做空间重加权。
（待精读）

## 7. 读前须知

（待精读；升级时按 [[00-Meta/模板与建模指南]] 补全）

> 建卡：2026-09-10 哨兵盲区补扫（API 429 限流期间经 arxiv.org 网页搜索通道人工核对元数据）
