---
type: paper
title: ORPO - Monolithic Preference Optimization without Reference Model
aliases: [ORPO]
year: 2024
authors: [Yujin Hong, Wonpyo Park, et al.]
venue: EMNLP 2024
arxiv: "2403.07691"
line: 强化学习与对齐
matrix_coords: [成对比较, 无参考, 无]
tags: [paper]
---

# ORPO

## 1. 一句话贡献

单阶段偏好优化：SFT 损失与 odds 比率偏好项合在一个目标里——参考模型、独立 SFT 阶段全部省掉。

## 2. 核心贡献

- **单调（monolithic）训练**：一步完成指令学习 + 偏好对齐
- **odds 比率**：$\frac{p/(1-p)}$ 形式天然放大对"完全拒绝样本"的惩罚
- **参考角色内化**：SFT 项兼任语言能力锚

## 3. 方法概要

1. 数据：成对偏好（同 [[Direct Preference Optimization- Your Language Model is Secretly a Reward Model（DPO）|DPO]]）
2. 损失 = 对 $y^+$ 的 SFT 交叉熵 + λ × odds 比率对比项
3. 单模型单阶段端到端
4. 推理部署与 SFT 模型无差别

## 4. 核心公式

- [[30-Formulas/ORPO损失]]

## 5. 与前作的关系

- 组合/简化了 [[10-Papers/04-强化学习与对齐/Direct Preference Optimization- Your Language Model is Secretly a Reward Model（DPO）]]（去参考）与 SFT 流程（单阶段化）
- 与 [[10-Papers/04-强化学习与对齐/SimPO- Simple Preference Optimization with a Reference-Free Reward（SimPO）]] 同为去参考路线，机制不同（odds vs 长度归一似然）

## 6. 影响与后续

- 流程极简：适合数据/算力受限的团队
- "对齐流程还能再短吗"路线的阶段性答案

## 7. 读前须知

[[30-Formulas/DPO损失]]、[[40-Concepts/期望]]

> 近邻同族：[[A General Language Assistant as a Laboratory for Alignment（Assistant Lab）]] · [[A General Theoretical Paradigm to Understand Learning from Human Preferences（IPO）]]
