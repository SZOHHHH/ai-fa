---
type: paper
title: Sora 技术报告 - Video Generation Models as World Simulators
aliases: [Sora, 世界模拟器]
year: 2024
authors: [OpenAI（Tim Brooks, Bill Peebles 等）]
venue: OpenAI 技术报告（无 PDF，仅网页）
arxiv: "无（openai.com/research/video-generation-models-as-world-simulators）"
pdf: none
source_note: 纯网页报告——视觉 transformer + [[Scalable Diffusion Models with Transformers（DiT）|DiT]] + 时空 patch；按 [[00-Meta/论文来源策略]] 兜底处理
line: 多模态
matrix_coords: [生成接口, 生成(条件LM), 完全早期融合]
tags: [paper]
---

# Sora（视频生成=世界模拟器）

## 1. 一句话贡献

"时空 patch + DiT + 视频重标注（re-captioning）"配方 + "视频生成模型是世界模拟器"论断——视频扩散时代的宣言（虽无正式论文，影响力等同顶会论文）。

## 2. 核心贡献

- **时空 patch 化**：视频统一切 3D patch token（任意分辨率/时长）——[[An Image is Worth 16x16 Words- Transformers for Image Recognition at Scale（ViT）|ViT]] 的时空版
- **DiT 骨干**：确认 [[10-Papers/02-生成建模与扩散/Scalable Diffusion Models with Transformers（DiT）]] 路线在视频的扩展性
- **Re-captioning**：用视频重标注模型（[[10-Papers/08-多模态/BLIP-2- Bootstrapping Language-Image Pre-training with Frozen Image Encoders and Large Lan（BLIP-2）]] 式 VLM）生成高密度描述——数据质量路线
- **世界模拟器论断**：scale 视频生成 → 涌现物理规律理解（争议中）

## 3. 方法概要

1. 视频压缩网络：原始视频 → 潜时空 patch
2. DiT 在潜空间做扩散去噪（文本/时序条件）
3. 训练数据用 re-captioning 提升文本-视频对齐质量
4. 生成时 ODE 采样 → 解码回像素

## 4. 核心公式

- 复用 [[30-Formulas/DDPM训练目标]]（潜空间）+ DiT 架构（[[10-Papers/02-生成建模与扩散/Scalable Diffusion Models with Transformers（DiT）]]）
- 时空 patch 嵌入：视频 → $N_t \times N_h \times N_w$ token 网格

## 5. 与前作的关系

- 组合了 [[High-Resolution Image Synthesis with Latent Diffusion Models（LDM）|LDM]]（[[10-Papers/02-生成建模与扩散/High-Resolution Image Synthesis with Latent Diffusion Models（LDM）]]）+ DiT + re-captioning 三件已有技术——"工程集大成"
- 与 [[10-Papers/08-多模态/VideoPoet- A Large Language Model for Zero-Shot Video Generation（VideoPoet）]] 的自回归路线同年竞争（扩散胜出主流）
- 与 [[20-Algorithms/世界模型]]：LeCun 批评其"只是像素生成、非世界模型"——路线之争的焦点

## 6. 影响与后续

- 视频生成军备竞赛起点（Veo/Kling/可灵/Wan 等）
- "生成模型当世界模拟器"成为 2024–26 世界模型大辩论的开题

## 7. 读前须知

[[20-Algorithms/潜在扩散模型（LDM）]]、[[10-Papers/02-生成建模与扩散/Scalable Diffusion Models with Transformers（DiT）]]、[[20-Algorithms/世界模型]]
