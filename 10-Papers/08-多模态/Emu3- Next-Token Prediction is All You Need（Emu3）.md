---
type: paper
title: Emu3- Next-Token Prediction is All You Need
aliases: [Emu3]
year: 2024
authors: [BAAI]
venue: arXiv 2024
arxiv: "2409.18869"
pdf: 已下载（PDF/）
line: 多模态
matrix_coords: [生成接口, 生成(条件LM), 完全早期融合]
tags: [paper]
---

# Emu3

## 1. 一句话贡献

纯 AR 统一多模态：图像/视频/文本全离散 token 化，一个 next-token 目标通吃理解+生成（训练+推理都只用 AR）——"AR 万能"叙事的旗舰证据。

## 2. 核心贡献

1. 3D 因果 tokenizer（时空块），离散码本
2. 理解（图文 QA）与生成（文生图/视频）同一目标同一架构

## 3. 方法概要

3D 因果 tokenizer（时空块），离散码本；理解（图文 QA）与生成（文生图/视频）同一目标同一架构。
## 4. 核心公式


$$
\mathcal{L} = -\log p_\theta\big(\underbrace{x^{I}_{\le T}}_{\text{图token}} \mid \underbrace{x^T_{\le K}}_{\text{文token}}\big)\ \text{(统一 next-token)}
$$


**直觉**：↔ Chameleon（同期同路线）；↔ 流×离散码本机会格（B13 已判 FS-DFM 占蒸馏侧）——AR 统一 vs FM 扩张是当前生成两极

## 5. 与前作/矩阵关系

对"FM 进离散域"类 idea 的对照组：AR 路线的最强证据

## 6. 影响后续

需要：VQ tokenizer；Emu3 的赌注：scaling AR 即可，不需要扩散/FM

## 7. 读前须知

undefined

---

> 谱系枢纽：[[Learning Transferable Visual Models From Natural Language Supervision（CLIP）]]（图谱连通入口）

> 近邻同族：[[Chameleon- Mixed-Modal Early-Fusion Foundation Models（Chameleon）]] · [[Sora 技术报告- Video Generation Models as World Simulators（Sora）]]

> 数学根基：[[视觉语言模型（VLM）]]

> 数学根基：[[VQ-VAE目标]] · [[条件流匹配损失]]
