---
type: paper
title: Genie 2 - A Large-Scale Foundation World Model
aliases: [Genie 2]
year: 2024
authors: [Jack Parker-Holder, et al. (Google DeepMind)]
venue: DeepMind 技术博客（无论文）
arxiv: "无（deepmind.google/discover/blog/genie-2-a-large-scale-foundation-world-model）"
pdf: none
source_note: 纯博客报告——自回归潜扩散世界模型，按 [[00-Meta/论文来源策略]] 兜底处理
line: 世界模型与JEPA
matrix_coords: [隐式(纯视频), 显式像素, 纯离线视频]
tags: [paper]
---

# Genie 2

## 1. 一句话贡献

大规模基础世界模型：单张提示图生成可交互 3D 一致环境（72 秒可持续、键鼠可玩）——"生成式环境"路线的当前顶点。

## 2. 核心贡献

- **单图 → 可玩世界**：无需 3D 引擎/游戏素材，一张概念图生成可探索环境
- **自回归潜扩散**：帧序列以自回归方式在潜空间扩散生成（Sora 的交互化）
- **长程一致性**：72 秒持久记忆（对象永久性、物理交互），超过同期视频生成

## 3. 方法概要（博客公开部分）

1. 自回归 latent diffusion 架构（细节未公开）
2. 海量视频/互动数据训练
3. 用户动作作为条件输入
4. 智能体导航/交互评测

## 4. 核心公式

- 框架 = [[30-Formulas/条件流匹配损失]]/[[30-Formulas/DDPM训练目标]] 家族（潜扩散）+ 自回归帧级生成——组件级复用，无新公开公式

## 5. 与前作的关系

- 规模化 [[10-Papers/09-世界模型与JEPA/Genie- Generative Interactive Environments（Genie）]]：2D 动作发现 → 3D 世界生成
- 对照 [[10-Papers/09-世界模型与JEPA/V-JEPA 2- Self-Supervised Video Models Enable Understanding, Prediction and Planning（V-JEPA 2）]]：生成式（像素世界）vs 预测式（抽象表征）——Google 内部两条路线并行

## 6. 影响与后续

- "世界模型=游戏引擎"叙事的最强公开证据；具身训练环境合成（sim-to-real 数据工厂）
- 与 Sora 系的边界：交互性 vs 影视级画质

## 7. 读前须知

[[20-Algorithms/世界模型]]、[[10-Papers/09-世界模型与JEPA/Genie- Generative Interactive Environments（Genie）]]、[[10-Papers/08-多模态/Sora 技术报告- Video Generation Models as World Simulators（Sora）]]

> 近邻同族：[[Analytic Planning under Uncertainty with Moment Closure（矩闭合规划）]] · [[Co-Evolving Latent Action World Models（CoLA）]]
