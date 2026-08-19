---
type: paper
title: Video Language Planning
aliases: [VLP]
year: 2023
authors: [Lin et al. (Meta)]
venue: arXiv 2023
arxiv: "2310.10625"
pdf: 已下载（PDF/）
line: 多模态
matrix_coords: [投影接口, 生成(条件LM), —]
tags: [paper]
---

# VLP

## 1. 一句话贡献

视频作为规划空间：LLM 在"未来帧候选树"上做语言引导搜索——多模态×推理矩阵的交叉占位。

## 2. 核心贡献

1. 文本→视频生成器展开候选未来→LLM 评分选择→循环（树搜索式视觉规划）

## 3. 方法概要

文本→视频生成器展开候选未来→LLM 评分选择→循环（树搜索式视觉规划）。
## 4. 核心公式


$$
a^* = \arg\max_a\ \mathrm{LLM}\big(\mathrm{VLM}(\text{future}(s,a))\big)
$$


**直觉**：≡ 世界模型×推理矩阵交叉；→ 视频世界模型规划线的早期作

## 5. 与前作/矩阵关系

多模态规划谱系（LLM+视频生成器组合）的开创

## 6. 影响后续

需要：树搜索+VLM 评分的组合直觉

## 7. 读前须知

undefined

---

> 谱系枢纽：[[Learning Transferable Visual Models From Natural Language Supervision（CLIP）]]（图谱连通入口）

> 近邻同族：[[BLIP-2- Bootstrapping Language-Image Pre-training with Frozen Image Encoders and Large Lan（BLIP-2）]] · [[Flamingo- a Visual Language Model for Few-Shot Learning（Flamingo）]]

> 数学根基：[[视觉语言模型（VLM）]]
