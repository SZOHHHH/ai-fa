---
type: paper
title: From Parameter Rebasin to Functional Transfer Across Heterogeneous Transformers
aliases: [Ariadne, 功能迁移]
year: 2026
authors: [Filippo Rinaldi, Aniello Panariello, Giacomo Salici, et al.]
venue: arXiv 2026（摩德纳大学等）
arxiv: "2610.32581v1"
pdf: https://arxiv.org/pdf/2610.32581v1
line: 架构演进
matrix_coords: [参数迁移, 激活空间, 语言/视觉模型适配]
tags: [paper]
---
# From Parameter Rebasin to Functional Transfer Across Heterogeneous Transformers（Ariadne）

> 261026 升级（在线全文+摘要）。

## 1. 一句话贡献
提出 Ariadne：**免训练**把微调带来的任务行为跨不同深宽的异构 Transformer 迁移——不搬参数（task vector），而是搬"微调在激活空间造成的位移"，经局部 Procrustes 对齐 + 闭式岭回归直接合成目标架构原生的参数更新。

## 2. 核心贡献
- 范式转换：把"搬运源 task vector（参数空间 rebasin）"改为"复现微调的功能效应（激活空间位移）"——源/目标模型无需形状兼容，不需缩放源模型。
- 局部 Procrustes 对齐源/目标基座激活 + 闭式岭回归合成目标侧稀疏更新，时间与内存开销远低于 Theseus/BiCo 等跨架构 rebasin。
- 在 ViT 扩张/收缩与语言模型变体迁移上提升目标模型表现。

## 3. 方法概要
1. 按相对深度配对源/目标 block，在小校准集上收集三方激活库（源基座、源微调、目标基座）。
2. 每对 block 解矩形 Procrustes（SVD 闭式）把源基座激活映到目标坐标系。
3. 把"源微调−源基座"的激活位移经该映射得到目标系下期望位移，岭回归解出目标某个 residual 写入分量的加性参数更新，使其产生该位移。

## 4. 核心公式
- Procrustes 对齐（原文式(1)）：$\min_{Q\in\text{Stiefel}}\lVert X_s Q-X_t\rVert_F^2$，闭式解取 $Q=UV^{\top}$（对 $X_t^{\top}X_s=U\Sigma V^{\top}$）—— **直觉：找一个旋转，让源/目标基座的激活空间在同一坐标系里对上，只当"桥"用而非优化目标**。
- 目标系位移（原文式(3)）：$\Delta_t=Q\,(A_s^{\text{ft}}-A_s^{\text{base}})$ —— **直觉：微调到底改变了什么，用激活位移刻画；桥搭好后原样搬过去**。

## 5. 与前作/矩阵关系
- ← 前身：Theseus / BiCo / GradFix（跨架构 rebasin：搬参数，需重采样与架构假设——本文以搬激活取代）
- ↔ 对照路线：[[40-Concepts/知识蒸馏]]（蒸馏靠输出监督跨尺寸传递，无需参数对应——Ariadne 走"功能效应复现"第三条路：闭式、免训练）
- ← 地基：[[20-Algorithms/Transformer]]（block/residual stream 结构）· [[30-Formulas/注意力核心公式]]（block 内核心算子）

## 6. 影响后续
- "功能空间而非参数空间做迁移"的又一证据；对异构模型生态（同一行为要部署到多尺寸骨干）是工程级解放。
- 局限：依赖 block 级对应关系与校准集；对非 Transformer 结构未验证。

## 7. 读前须知
- [[30-Formulas/注意力核心公式]] · [[20-Algorithms/Transformer]]；数学前置：Procrustes 问题与 SVD、岭回归闭式解、Stiefel 流形概念。
