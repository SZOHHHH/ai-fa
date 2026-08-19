---
type: paper
title: WaveNet- A Generative Model for Raw Audio
aliases: [WaveNet]
year: 2016
authors: [van den Oord et al. (DeepMind)]
venue: SSW 2016
arxiv: "1609.03499"
pdf: 已下载（PDF/）
line: 多模态
matrix_coords: [生成接口, 生成(条件LM), —]
tags: [paper]
---

# WaveNet

## 1. 一句话贡献

音频自回归生成：膨胀因果卷积+μ-law 量化，逐样本生成——语音/音频生成的 AR 路线起点（也是 AR 生成的"高频分辨率"极端案例）。

## 2. 核心贡献

1. softmax over 256 量化级
2. 条件化（说话人/TTS 前端）

## 3. 方法概要

膨胀卷积扩感受野；softmax over 256 量化级；条件化（说话人/TTS 前端）。
## 4. 核心公式


$$
p(x) = \prod_t p(x_t\ \vert\ x_{<t}, c)\ \text{(逐样本自回归)}
$$


**直觉**：≡ AR 生成谱系的音频极（分辨率最高、序列最长）；→ WaveRNN/Jukebox；与扩散音频（Voicebox 类）对照

## 5. 与前作/矩阵关系

音频生成 AR 路线奠基；"逐样本自回归"的可行极限证明

## 6. 影响后续

需要：膨胀卷积感受野计算；μ-law 量化

## 7. 读前须知

undefined

---

> 谱系枢纽：[[Learning Transferable Visual Models From Natural Language Supervision（CLIP）]]（图谱连通入口）

> 近邻同族：[[Chameleon- Mixed-Modal Early-Fusion Foundation Models（Chameleon）]] · [[Emu3- Next-Token Prediction is All You Need（Emu3）]]

> 数学根基：[[μ-law量化音频]] · [[注意力核心公式]]
