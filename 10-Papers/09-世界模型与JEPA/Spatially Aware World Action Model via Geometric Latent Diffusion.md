---
type: paper
title: Spatially Aware World Action Model via Geometric Latent Diffusion
aliases: []
year: 2026
authors: [Javier Alejandro Lopetegui Gonzalez]
venue: 待核（占位层，来自 arXiv 2026-09-02）
arxiv: "2609.02531v1"
pdf: 已下载（PDF/）
line: 世界模型与JEPA
matrix_coords: 待评
tags: [paper, 占位层]
layer: 占位
---
# Spatially Aware World Action Model via Geometric Latent Diffusion

> **占位层卡**（daily 自动采集 2026-09-06 建卡，元数据出自 arXiv API=已核实）。**待 Tier B 精读升级**：七节补全+中文名+挂全链。
> 摘要（原文）：World Action Models (WAMs) leverage the capabilities of large-scale pretrained video diffusion models to jointly predict future observations and actions, inheriting rich visual and physical priors from internet-scale video. This has made them a promising paradigm for robot policy learning, yet the prevailing models operate exclusively on RGB observations and do not leverage 3D information. To bridge this gap, we introduce a Spatially Aware World Action Model (SA-WAM), which repurposes a pretrained video model for joint action, RGB, and depth prediction, enabling 3D-aware world modeling and act
> ★ 中文速览（9/7 Tier B）：把 3D 几何（点云/深度/法向）作为原生状态与 RGB 视觉潜变量**联合扩散**的世界动作模型——让视频扩散 WAM 从"只看画面"升级为"看画面+看几何"，机器人操作域。
> ★ 敌情研判：🟡 E2/WAM 谱系：3D 表征轴，不做反推不少步化非游戏——与我们正交；Related Work 引用素材。

## 1. 一句话贡献
（待精读）

## 2. 核心贡献
- （待精读）

## 3. 方法概要
（待精读）

## 4. 核心公式
（待精读）

## 5. 与前作/矩阵关系
- 线锚：[[20-Algorithms/世界模型]] · [[20-Algorithms/扩散模型]]（占位挂链，Tier B 精化）
- 同族：[[10-Papers/09-世界模型与JEPA/World Models（世界模型）|World Models]]（V-M-C 三件套）·[[20-Algorithms/扩散模型]]（几何潜变量扩散）；表征近邻：[[10-Papers/09-世界模型与JEPA/Genie- Generative Interactive Environments（Genie）|Genie]]
- 近邻：[[10-Papers/09-世界模型与JEPA/GIFT Guided Intermediate Feature Training via Action-Oriented Structural Supervision for Robotic Man|GIFT]]——同"给 WAM 加 3D"但进法相反：本文 3D 为**输入/预测模态**，GIFT 3D 为**训练期监督**（推理期丢弃）

## 6. 影响后续
（待精读）

## 7. 读前须知
（待精读）自动下载备注：已下载（PDF/）
