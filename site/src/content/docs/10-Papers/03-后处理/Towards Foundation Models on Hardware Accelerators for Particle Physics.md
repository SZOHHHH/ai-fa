---
type: paper
title: "Towards Foundation Models on Hardware Accelerators for Particle Physics"
aliases: [粒子物理FM硬件蒸馏]
year: 2026
authors: [Maya Benyas, et al.]
venue: arXiv 2026
arxiv: "2609.26899v1"
pdf: 已下载（PDF/）
line: 后处理
matrix_coords: [基础模型蒸馏, 硬件加速器部署, 粒子物理/喷注标记, 实时约束]
tags: [paper]
---

# Towards Foundation Models on Hardware Accelerators for Particle Physics

## 1. 一句话贡献

把在数十亿喷注上预训练的亿级参数粒子物理基础模型（OmniLearn 系教师），用知识蒸馏迁移到高效小型网络，冲着硬件加速器/FPGA 级实时部署去——让对撞机触发端的实时喷注标记用上基础模型学到的知识。

## 2. 核心贡献

- 场景卡位：对撞机带宽约束要求触发端实时决策（微秒级），而 SOTA 喷注标记是离线基础模型——KD 是把两者接起来的桥
- 大教师→小学生蒸馏配方：亿级参数教师（数十亿喷注预训练）→硬件友好高效网络
- 量化蒸馏到硬件友好数值精度/算子的探索（摘要级；具体压缩率与吞吐数字待精读）

## 3. 方法概要

1. 教师=OmniLearn 类基础模型（数百 M 参数、数十亿喷注预训练，离线 SOTA 喷注标记）
2. 学生=高效网络（算子/精度对硬件加速器友好）
3. 知识蒸馏：学生对齐教师在喷注表征/预测上的输出
4. 评估压缩后模型在触发级延迟预算内的精度保持（细节待精读）

## 4. 核心公式

本文骨架即经典蒸馏目标（响应+可选特征对齐）：

`$$\mathcal{L} = \mathrm{CE}(y, p_s) + \lambda\, \mathrm{KL}\!\left(\mathrm{softmax}(z_s/T)\ \|\ \mathrm{softmax}(z_t/T)\right)$$`

**直觉**：学生既答对标签又模仿教师的软输出（温度 $$T$$ 暴露类间结构——喷注类型间的相似层次）；部署时只留学生进硬件。与库内 KD 谱系同式，创新在"教师=领域基础模型、学生=硬件算子级定制"这一端。

## 5. 与前作/矩阵关系

- ←[Distilling the Knowledge in a Neural Network](/ai-fa/explore/10-Papers/03-后处理/Distilling the Knowledge in a Neural Network（KD）)（同式骨架）
- ≡大规模→小模型同族 [Breaking the Token Ceiling: Distilling Smaller, Stronger Byte Models](/ai-fa/explore/10-Papers/03-后处理/Breaking the Token Ceiling - Distilling Smaller Stronger Byte Models（字节蒸馏scaling）)：都在"大预训练模型的知识如何进入可部署小网络"，此处约束更硬（硬件实时）
- ↔[量化](/ai-fa/explore/40-Concepts/量化)：硬件部署侧的姊妹手段（蒸馏换架构、量化换精度）

## 6. 影响后续

"基础模型能力下沉到触发级硬件"的模板，粒子物理外（工业实时检测、边缘设备）可复用；对库内主线的价值=E1 蒸馏叙事的又一外部域平行案例（离线大模型→实时小模型，容量换延迟）。

## 7. 读前须知

- 喷注标记：把对撞机事件聚类出的粒子喷注分类（夸克/胶子/轻子喷注等），触发端必须微秒级
- 硬件约束直觉：FPGA/ASIC 上全精度浮点与任意算子不可用——理解"硬件友好"指什么
- [知识蒸馏](/ai-fa/explore/40-Concepts/知识蒸馏) 与 [量化](/ai-fa/explore/40-Concepts/量化) 基本概念
