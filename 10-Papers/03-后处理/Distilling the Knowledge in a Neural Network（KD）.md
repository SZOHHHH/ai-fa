---
type: paper
title: Distilling the Knowledge in a Neural Network
aliases: [KD, Hinton蒸馏]
year: 2015
authors: [Geoffrey Hinton, Oriol Vinyals, Jeff Dean]
venue: NeurIPS Workshop 2014 / arXiv 2015
arxiv: "1503.02531"
line: 后处理与压缩
matrix_coords: [知识(行为), 蒸馏, 训练后]
tags: [paper]
---

# 蒸馏（Hinton KD）

## 1. 一句话贡献

用高温软标签把大模型（或集成）的"暗知识"蒸进小模型——模型压缩与知识转移的总纲。

## 2. 核心贡献

- **软标签 + 温度 τ**：$\tau^2 \mathrm{KL}(T\|S)$——类间结构信息传递（[[30-Formulas/蒸馏损失]]）
- **"dark knowledge"概念**：负类的相对概率携带教师学到的相似性结构
- 多教师集成 → 单模型、专项模型 → 通用模型两种用法

## 3. 方法概要

1. 教师在温度 τ 下输出软分布
2. 学生损失 = 软 KL + 硬交叉熵（α 混合）
3. 专项教师训练时可混入通用数据（"专属数据"）
4. MNIST/语音识别验证：小模型逼近大集成

## 4. 核心公式

- [[30-Formulas/蒸馏损失]]

## 5. 与前作的关系

- 正式化并命名了 [Caruana 2006 模型压缩]（用 logits 回归）——引入温度与概率视角
- 与集成学习（bagging/boosting）的血缘：集成=多教师，蒸馏=知识打包

## 6. 影响与后续

- DistilBERT/TinyBERT 等 BERT 压缩线；扩散蒸馏（渐进蒸馏/一致性）；R1 蒸馏小模型
- "教师-学生"范式溢出到自蒸馏、在线蒸馏、数据集蒸馏
- 暗知识 → 知识的连续谱视角影响可解释性

## 7. 读前须知

[[40-Concepts/知识蒸馏]]、[[40-Concepts/KL散度]]、[[40-Concepts/温度参数]]

> 核心公式：[[归一化温度与蒸馏]]
