---
type: paper
title: "EditDistill: Is It Possible to Guide Video Editing with Image Editing?"
aliases: []
year: 2026
authors: [Guojun, Lei]
venue: 待核（占位层，来自 arXiv 2026-10-25）
arxiv: "2610.34303v1"
pdf: https://arxiv.org/pdf/2610.34303v1
line: 生成建模与扩散
matrix_coords: 待评
tags: [paper, 占位层]
layer: 占位
---
# EditDistill: Is It Possible to Guide Video Editing with Image Editing?

> **占位层卡**（daily 自动采集 2026-10-27 建卡，元数据出自 arXiv API=已核实）。本链 Claude 处理段将自动精读升级：七节补全+中文速览+挂全链。
> 摘要（原文）：Recent advances in image editing have enabled fine-grained and highly controllable visual modifications. However, achieving similar levels of controllability in video editing remains an open challenge, particularly for precise local edits, dynamic temporal effects, and consistent lighting across frames.In this paper, we propose EditDistill, a framework that distills image-level visual transformations from edits to guide video editing.Specifically, given a source video and an edit prompt, we first generate an edited version of the initial video frame using an off-the-shelf image editing model. 

## 1. 一句话贡献

用图像编辑引导视频编辑：现成图像编辑模型先改视频首帧，把「原图-编辑图」的视觉变换**蒸馏成紧凑编辑描述子**，经轻量融合模块注入视频扩散去噪过程——配描述子对齐+DINO 结构一致性损失保运动与布局，并在流匹配下推导出等价的推理期引导式，以图像编辑的可控性换取视频编辑的局部精确/时序动态/光照一致。

## 2. 核心贡献
- （待精读）

## 3. 方法概要
（待精读）

## 4. 核心公式
（待精读）

## 5. 与前作/矩阵关系
- 任务家族：视频编辑×图像编辑知识迁移（把图像编辑的视觉变换蒸馏为视频扩散的引导信号）
- 数学链 [[20-Algorithms/扩散模型]] · [[20-Algorithms/流匹配]] · [[30-Formulas/条件流匹配损失]]（推理期引导式的推导底座）· [[30-Formulas/蒸馏损失]]（图像变换→编辑描述子的宽义蒸馏）

## 6. 影响后续
（待精读）

## 7. 读前须知
（待精读）原文：https://arxiv.org/pdf/2610.34303v1；在线全文（新论文）：https://arxiv.org/html/2610.34303v1
