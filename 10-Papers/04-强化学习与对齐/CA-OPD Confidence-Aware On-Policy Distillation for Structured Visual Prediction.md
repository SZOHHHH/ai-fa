---
type: paper
title: "CA-OPD: Confidence-Aware On-Policy Distillation for Structured Visual Prediction"
aliases: [CA-OPD]
year: 2026
authors: Menghao Li, Linjie Mu, Yin Wang, et al.
venue: arXiv
arxiv: 2609.02401
pdf: 10-Papers/PDF/CA-OPD Confidence-Aware On-Policy Distillation for Structured Visual Prediction.pdf
line: 强化学习与对齐
matrix_coords: 待评
tags: [paper, 占位, 0910补扫]
---

## 1. 一句话贡献

on-policy 蒸馏中学生早期不可靠预测会带偏自己的 rollout——用教师置信度选择性纠正不可靠转移，严格→宽松逐步交棒，纠正位吃教师 CE、保留位吃教师完整分布。

## 2. 核心贡献

- 教师置信度门控：只在学生"真不行"的位置出手纠正，避免过度干预毁掉 on-policy 性质
- 进度表控制权移交：训练早期教师多接管、后期逐步放权（strict-to-relaxed schedule）
- 干预对齐监督：纠正的位置用教师预测的直接交叉熵，保留的位置用教师完整预测分布（保留不确定性信息）
- 多教师设置（GUI grounding + OCR）：Qwen3.5-0.8B 六基准全升（ScreenSpot-Pro +9.5）

## 3. 方法概要

① 学生自己 rollout → ② 教师按置信度判定哪些转移不可靠 → ③ 不可靠位替换为教师续写 + 直接 CE 监督；可靠位保留 + 全分布监督 → ④ 随训练进度收紧/放松接管率

## 4. 核心公式

（待精读——占位卡，Tier 升级时补）

## 5. 与前作/矩阵关系

- 谱系锚：[[40-Concepts/知识蒸馏]]，[[40-Concepts/on-policy与off-policy]]
- **哨兵研判（9/10 补扫）**：🟢 E1 同盟：核心思想"监督密度对齐学生实际状态分布"与我们读出对齐同族；置信度门控≈用判头读数当监督滤波器（监督只走梯度、不进推理的同款设计）。域是 VLM 非游戏，无撞车。可引作 on-policy 蒸馏家族证据。

## 6. 影响后续

（待精读）

## 7. 读前须知

（待精读；升级时按 [[00-Meta/模板与建模指南]] 补全）

> 建卡：2026-09-10 哨兵盲区补扫（API 429 限流期间经 arxiv.org 网页搜索通道人工核对元数据）
