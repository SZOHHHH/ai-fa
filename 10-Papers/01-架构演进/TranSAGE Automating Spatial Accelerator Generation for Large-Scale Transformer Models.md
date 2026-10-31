---
type: paper
title: "TranSAGE: Automating Spatial Accelerator Generation for Large-Scale Transformer Models"
aliases: [TranSAGE]
year: 2026
authors: [Chi Zhang, et al.]
venue: arXiv 2026
arxiv: "2610.32279v1"
pdf: https://arxiv.org/pdf/2610.32279v1
line: 架构演进
matrix_coords: [硬件加速, 编译/DSE, 推理效率]
tags: [paper]
---
# TranSAGE: Automating Spatial Accelerator Generation for Large-Scale Transformer Models

> 261026 升级（abs 完整摘要；无 HTML 全文）。

## 1. 一句话贡献
编译器式框架 TranSAGE：面向大规模 Transformer 推理**自动生成空间加速器 RTL**——把多算子流水线调度、设计空间探索（DSE）与数据流优化联合优化，替代只支持单算子的旧加速器生成器。

## 2. 核心贡献
- 多算子流水线（multi-operation pipelining）感知的联合调度优化：动态规划图分割找流水友好的算子簇 + 各簇最优数据流参数。
- 空间架构原语 + lowering pass 自动生成 RTL 实现。
- 四个代表性 LLM 上评测：较商用 GPU/NPU 吞吐至多 2.41×、能效 13.04×；较 SOTA 加速器生成器吞吐 11.33×、能效 6.07×。

## 3. 方法概要
1. 输入大模型计算图 → 动态规划图分割聚类出可流水执行的算子簇；2. DSE 引擎对每簇搜数据流参数（并行度/分块）；3. 组合调度与簇间流水；4. 经空间架构原语 lowering 成 RTL。

## 4. 核心公式
（硬件系统工作，核心为 DP 图分割与数据流代价模型；本卡以流程记录为主，无单一核心公式。）

## 5. 与前作/矩阵关系
- ← 地基：[[20-Algorithms/Transformer]]（被加速对象）· [[30-Formulas/注意力核心公式]]（算子开销大头）
- ↔ 同族效率线：[[MoBA- Mixture of Block Attention for Long-Context LLMs（MoBA）]]（注意力层内省算力，TranSAGE 层外造硬件——一软一硬两条推理降本路）

## 6. 影响后续
- 大模型推理成本路线的"硬件自动化"分支：从算法侧压缩（量化/蒸馏）到自动专用架构。
- 与库内主线（WM/蒸馏）无直接交集，作架构线背景卡保留。

## 7. 读前须知
- [[20-Algorithms/Transformer]]；硬件前置：空间架构（dataflow architecture）、设计空间探索、RTL 概念。
