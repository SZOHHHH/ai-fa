---
type: paper
title: "HiFiPix: Bringing High-Fidelity Real-World Super-Resolution Back to Pixel Space"
aliases: []
year: 2026
authors: [Wenjie, Li]
venue: 待核（占位层，来自 arXiv 2026-10-26）
arxiv: "2610.35515v1"
pdf: https://arxiv.org/pdf/2610.35515v1
line: 生成建模与扩散
matrix_coords: 待评
tags: [paper, 占位层]
layer: 占位
---
# HiFiPix: Bringing High-Fidelity Real-World Super-Resolution Back to Pixel Space

> **占位层卡**（daily 自动采集 2026-10-27 建卡，元数据出自 arXiv API=已核实）。本链 Claude 处理段将自动精读升级：七节补全+中文速览+挂全链。
> 摘要（原文）：Diffusion-based real-world image super-resolution suffers from limited reconstruction fidelity due to information loss in VAE-based latent representations. Recently, pixel-space diffusion models offer a promising high-faithfulness alternative by avoiding latent compression, but adapting them to Real-ISR remains challenging due to inherent patch boundary artifacts and degraded generative capability. To address the issues and maximize the potential of pretrained pixel-space diffusion models, we propose HiFiPix, a pixel-space Real-ISR framework capable of ultra high-fidelity reconstruction and fi

## 1. 一句话贡献

像素空间 Real-ISR 框架：论点=VAE 压缩是 latent 扩散超分重建保真的上限瓶颈，把真实世界超分拉回像素空间——跨尺度小波判别器（CWSD）惩罚补丁边界伪影的高频周期分量、Mixup 对比自蒸馏（MixCSD）正则中间表征、选择性 LoRA 剪枝（LoRA-SP）治理 LoRA 层「生成力-保真度」异质权衡，恢复精度与感知质量全面超 latent 空间 SOTA。

## 2. 核心贡献
- （待精读）

## 3. 方法概要
（待精读）

## 4. 核心公式
（待精读）

## 5. 与前作/矩阵关系
- ≡ 同族（Real-ISR 少步/一步）[[10-Papers/02-生成建模与扩散/One Diffusion Step to Real-World Super-Resolution via Flow Trajectory Distillation（OSEDiff）|OSEDiff]]（latent 一步路线——本文的对照面）· [[10-Papers/02-生成建模与扩散/DUO-VSR- Dual-Stream Distillation for One-Step Video Super-Resolution（DUO-VSR）|DUO-VSR]]（视频双流一步）
- 数学链 [[30-Formulas/LoRA分解]]（LoRA-SP 的剪枝对象）· [[20-Algorithms/生成对抗网络]] · [[30-Formulas/GAN目标]]（CWSD 小波判别器）
- 谱系锚 [[20-Algorithms/扩散模型]]

## 6. 影响后续
（待精读）

## 7. 读前须知
（待精读）原文：https://arxiv.org/pdf/2610.35515v1；在线全文（新论文）：https://arxiv.org/html/2610.35515v1
