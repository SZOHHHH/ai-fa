---
type: paper
title: Deep Neural Networks for Learning Intent from sEMG Signals to Support Hardware Devices for Post-Stroke Neurorehabilitation
aliases: []
year: 2026
authors: [Zakariyya, Brewster]
venue: 待核（占位层，来自 arXiv 2026-09-09）
arxiv: "2609.09971v1"
pdf: 已下载（PDF/）
line: 后处理
matrix_coords: 待评
tags: [paper, 占位层]
layer: 占位
---
# Deep Neural Networks for Learning Intent from sEMG Signals to Support Hardware Devices for Post-Stroke Neurorehabilitation

> **占位层卡**（daily 自动采集 2026-09-10 建卡，元数据出自 arXiv API=已核实）。本链 Claude 处理段将自动精读升级：七节补全+中文速览+挂全链。
> 摘要（原文）：Finger-specific motor intent is a clinically meaningful control signal for post-stroke neurorehabilitation, where residual muscle activity may remain measurable despite weak or incomplete movement. We study five-finger multilabel intent decoding from impaired-arm high-density surface electromyography (sEMG) in PhysioMio, a bilateral longitudinal dataset collected from stroke patients. A common processing protocol aligns movement labels, applies 20--450 Hz Butterworth filtering and Symlet-4 wavelet denoising, segments overlapping 200 ms windows, and extracts twelve time- and frequency-domain de

## 1. 一句话贡献
（待精读）

## 2. 核心贡献
- （待精读）

## 3. 方法概要
（待精读）

## 4. 核心公式
（待精读）

## 5. 与前作/矩阵关系
- 线锚：[[40-Concepts/知识蒸馏]] · [[10-Papers/03-后处理/Distilling the Knowledge in a Neural Network（KD）|KD 奠基]]
- 蒸馏形态：**跨通道蒸馏**（cross-channel KD）——teacher 吃 64 通道 HD-sEMG，学生只吃 4 通道（ECRB/ECRL/FDS/FDP，匹配四传感器硬件设计），蒸馏补回通道压缩损失（五种子均值 0.5219±0.0114 子集准确率，优于直接训练）。这是"压缩**输入维**"而非"压缩模型"的蒸馏用法，与量化/剪枝压缩正交。
- 对我们：医疗嵌入式域的外缘参考（LSTM/CNN/GNN 架构对比 + Optuna 搜 compact CNN + 123K 参数 ONNX 导出），与 E1/E2 无轴重叠，不进主线叙事。

## 6. 影响后续
（待精读）

## 7. 读前须知
（待精读）自动下载备注：已下载（PDF/）
