---
type: paper
title: "ZYT-World: A Real-Time Controllable World Model for Closed-Loop Autonomous-Driving Simulation"
aliases: []
year: 2026
authors: [Boni, Hu]
venue: 待核（占位层，来自 arXiv 2026-09-18）
arxiv: "2609.21712v1"
pdf: 已下载（PDF/）
line: 生成建模与扩散
matrix_coords: 待评
tags: [paper, 占位层]
layer: 占位
---
# ZYT-World: A Real-Time Controllable World Model for Closed-Loop Autonomous-Driving Simulation

> **占位层卡**（daily 自动采集 2026-09-21 建卡，元数据出自 arXiv API=已核实）。本链 Claude 处理段将自动精读升级：七节补全+中文速览+挂全链。
> 摘要（原文）：Generative world models offer controllable and repeatable closed-loop simulation for end-to-end and vision-language-action driving policies, but production deployment exposes three unresolved requirements: faithfully reproducing a mixed fisheye-pinhole rig at native resolutions; reconciling causal, per-timestep interaction with long-horizon stability and low latency; and preserving scene identity when a location is revisited. We present ZYT-World, a single architecture that natively generates four fisheye views with field of view &gt; 180° and three pinhole views. Projection-specific Plucker a

## 1. 一句话贡献
（待精读）

## 2. 核心贡献
- （待精读）

## 3. 方法概要
（待精读）

## 4. 核心公式
（待精读）

## 5. 与前作/矩阵关系
- 线锚：[扩散模型](/ai-fa/explore/20-Algorithms/扩散模型) · [一致性模型](/ai-fa/explore/20-Algorithms/一致性模型)（因果一致性蒸馏 CD 是其 40→1 步蒸馏链的第二段）
- 同族：[Astronex-World 1.0](/ai-fa/explore/10-Papers/02-生成建模与扩散/Astronex-World 1.0 Real-Time Interactive World Model Foundation)（同为实时交互式 WM 基座） · [UniSim](/ai-fa/explore/10-Papers/09-世界模型与JEPA/Learning Interactive Real-World Simulators（UniSim）)（同为可交互真实世界仿真器，用于策略闭环评测）
- 蒸馏链同轴：[DMD](/ai-fa/explore/10-Papers/02-生成建模与扩散/One-step Diffusion with Distribution Matching Distillation（DMD）)（其 self-rollout DMD 段的分布匹配根基） · [DMD2](/ai-fa/explore/10-Papers/02-生成建模与扩散/Improved Distribution Matching Distillation for Fast Image Synthesis（DMD2）)
- 概念链：[知识蒸馏](/ai-fa/explore/40-Concepts/知识蒸馏)（教师→学生全链主题） · [量化](/ai-fa/explore/40-Concepts/量化)（W8A8 部署侧） · [KV缓存](/ai-fa/explore/40-Concepts/KV缓存)（每步因果流式推理的载体）

## 6. 影响后续
（待精读）

## 7. 读前须知
（待精读）自动下载备注：已下载（PDF/）
