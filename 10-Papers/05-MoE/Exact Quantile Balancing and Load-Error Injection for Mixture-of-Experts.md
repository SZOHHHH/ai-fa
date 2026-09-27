---
type: paper
title: "Exact Quantile Balancing and Load-Error Injection for Mixture-of-Experts"
aliases: [EQB+LEI, 精确分位数均衡与负载误差注入]
year: 2026
authors: [Pit Neitemeier, et al.]
venue: arXiv 2026
arxiv: "2609.28053v1"
pdf: 已下载（PDF/）
line: MoE
matrix_coords: [MoE训练系统, 全局/局部负载均衡, 分布式专家并行, BF16分位数]
tags: [paper]
---

# EQB+LEI（MoE 精确分位数均衡与负载误差注入）

## 1. 一句话贡献

MoE 分布式训练的负载均衡双修：**EQB**（精确分位数均衡）算出跨专家并行的**精确全局批 BF16 分位数**（通信开销可忽略），治"分片依赖/近似全局分位数"；**LEI**（负载误差注入）把局部负载误差直接注进路由器分数梯度，治"token 无关的专家偏置保不住微批级均衡"——7.5B MoE、500B token 训练实证：EQB 全面优于朴素 QB，LEI 在同等质量下胜 GShard 损失。

## 2. 核心贡献

- 指出分布式量化均衡（QB）两痛点：现有方法用分片依赖或近似全局分位数；token 无关偏置（每专家一个固定 bias）无法保证微批级局部均衡
- EQB：跨卡算精确的全局批 BF16 分位数（均值/方差统计量聚合，通信量可忽略）——把"近似全局"升级成"精确全局"
- LEI：局部（微批/分片级）负载误差不进辅助损失、直接加到路由分数的梯度上——局部均衡信号从"软惩罚"变"硬反馈"
- 规模实证：7.5B 参数 MoE、最长 500B token 训练，全局均衡+下游性能双指标对照

## 3. 方法概要

1. 全局侧：各分片本地算路由统计（负载/分位数所需矩），全归约聚合成精确全局分位数，再按其均衡专家负载
2. 局部侧：微批内实际负载与目标的误差，直接注入路由分数梯度（等价于对 router logits 的负载敏感扰动）
3. 训练对照：EQB vs 朴素 QB（全局指标）、LEI vs GShard 辅助损失（局部+质量指标）

## 4. 核心公式

GShard 系辅助均衡损失（本文 LEI 的对照锚，变体系见 [[30-Formulas/MoE门控公式]]）：

`$\mathcal{L}_{\text{aux}}=\alpha\sum_{e=1}^{E} f_e\cdot P_e,\qquad f_e=\frac{1}{T}\sum_{t=1}^{T}\mathbf{1}[\arg\max g_t=e],\ P_e=\frac{1}{T}\sum_t \mathrm{softmax}(g_t)_e$`

**直觉**：$f_e$（实际分到专家 e 的 token 占比）× $P_e$（路由器给 e 的平均概率）乘积和——专家"收得多又被看好"就罚，逼概率质量从过载专家移走。LEI 的差别主张：这类**辅助损失是软的、token 无关的**（偏置不随微批变），它把**局部负载误差**改成直接进 $g_t$ 梯度的硬信号——均衡压力跟着每个微批的实际失衡走。

## 5. 与前作/矩阵关系

- ←量化均衡（QB）路线：分布式场景按全局负载分位数平衡专家（本文将其精确化）
- ←辅助损失系 [[GShard- Scaling Giant Models with Conditional Computation and Automatic Sharding（GShard）]]（均衡损失即"GShard loss"，LEI 的头号对照）
- ≡对照 [[Auxiliary-Loss-Free Load Balancing Strategy for Mixture-of-Experts（无辅助损失MoE）]]：同是想绕开辅助损失的失真——那篇走免损失偏置调节（token 无关，正是本文点名的局部均衡短板），本文走梯度注入（token/微批相关）——两卡合看是该争论的两极
- ↔[[Switch Transformers- Scaling to Trillion Parameter Models with Simple and Efficient Spars（Switch）]]（辅助均衡损失谱系的起点之一）
- 实体锚 [[20-Algorithms/混合专家（MoE）]] · 公式锚 [[30-Formulas/MoE门控公式]]

## 6. 影响后续

MoE 大规模分布式训练的系统件：精确全局分位数+梯度级局部均衡大概率成为专家并行训练栈的默认配置；对库内谱系价值在"均衡机制分类学"——辅助损失/免损失偏置/梯度注入三系自此齐整。

## 7. 读前须知

- MoE 基础与路由记号：[[30-Formulas/MoE门控公式]]、[[20-Algorithms/混合专家（MoE）]]
- 专家并行（EP）：专家切到不同卡，负载不均=某些卡成为瓶颈；BF16 数值格式下分位数计算的特殊性
