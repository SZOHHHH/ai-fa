---
type: paper
title: "Greenscapes: Optimized Vegetation Configurations in Cities"
aliases: [Greenscapes]
year: 2026
authors: [Patryk, Bartkowiak]
venue: 待核（arXiv 2026-10-29）
arxiv: "2610.40007v1"
pdf: https://arxiv.org/pdf/2610.40007v1
line: 架构演进
matrix_coords: [VLM应用, 城市场景生成, CMA-ES优化]
tags: [paper]
---
# Greenscapes: Optimized Vegetation Configurations in Cities

> 中文速览：3D 城市场景的植被自动布局方法（灌木到大乔木），兼顾功能（遮荫/天空曝露平衡、微气候、碳汇、声学屏蔽）与美学风格（规整式/现代主义/风景画式）。做法：以单个地块为输入，条件 VLM 生成俯视植被渲染图→检测植株位置+选 3D 资产落地为 3D 场景→确定性可行性修复后，用 CMA-ES 优化每株尺度变换与离散资产替换（遮荫/路径声学曝露的高效代理模型+逐步渲染视图算感知描述子当目标函数）。效果：能生成美学与功能兼得的城市绿化布局。

## 1. 一句话贡献

条件 VLM 生成俯视植被图+3D 资产落地+CMA-ES 尺度/资产优化（遮荫声学代理+视图感知描述子做目标）——美学与功能兼得的城市绿化自动布局。

## 2. 核心贡献
- （待精读）

## 3. 方法概要
（待精读）

## 4. 核心公式
（待精读）

## 5. 与前作/矩阵关系
- VLM 生成能力在城市设计场景的应用例（轮换线收编，非主线）：[[40-Concepts/视觉语言模型（VLM）]]（生成引擎）；
- 多模态应用近邻：[[10-Papers/01-架构演进/DVD Dynamic Vector Decoding for Efficient MLLM-based Perception|DVD]]（MLLM 感知侧效率）——一感知一生成，MLLM 应用两面；
- 概念链：[[20-Algorithms/Transformer]] · [[30-Formulas/CLIP对比损失]]（VLM 视觉编码器的对齐空间）。

## 6. 影响后续
（待精读）

## 7. 读前须知
（待精读）原文：https://arxiv.org/pdf/2610.40007v1；在线全文（新论文）：https://arxiv.org/html/2610.40007v1

---

> 谱系枢纽：[[40-Concepts/视觉语言模型（VLM）]]（图谱连通入口）

> 数学根基：[[30-Formulas/CLIP对比损失]] · [[20-Algorithms/Transformer]]
