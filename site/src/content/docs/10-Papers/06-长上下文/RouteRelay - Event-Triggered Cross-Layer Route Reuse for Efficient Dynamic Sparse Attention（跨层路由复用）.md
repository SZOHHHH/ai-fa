---
type: paper
title: "RouteRelay: Event-Triggered Cross-Layer Route Reuse for Efficient Dynamic Sparse Attention"
aliases: [RouteRelay]
year: 2026
authors: [Bin Li, Sisi Liu, Chenyang Hu, Chaoyang Zhang, Wei Li, Hui Song]
venue: arXiv 2026-09-07（cs.CL）
arxiv: "2609.07306"
pdf: 已下载（PDF/）
line: 长上下文
matrix_coords: 动态稀疏注意力×路由开销优化
tags: [paper, 轮换命中, 长上下文]
layer: 精化层（摘要级+摘要核实，PDF 待深读）
---
# RouteRelay: Event-Triggered Cross-Layer Route Reuse for Efficient Dynamic Sparse Attention

> **中文速览**：做了什么——动态稀疏注意力省了注意力计算，但 router 每层都要重建"query 块×key 块"打分矩阵，路由本身成了新瓶颈（尤其层间选路变化很小时纯属浪费）。怎么做的——RouteRelay 跨层复用路由元数据：锚层做全路由；中间层只对"上一次 top-k 路由 + 哨兵集（差点入选的 near-miss + 随机探针）"重打分，**只有哨兵挑战成功（分超过当前最弱选中块）才触发该行重路由**——事件触发而非每层重算。配了 top-k 稳定性条件、漏检挑战者的概率界、行选择性 GPU 执行设计。效果——路由召回 ≥99.99%，低/中/高层间漂移下分别只需重路由 25.0%/55.4%/78.2% 的行；key 块 128→1024 规模下只评估 38.4-51.6% 的打分对仍保 100% 召回；未融合 CPU 版仍慢于稠密矩阵乘，行压缩与账本更新是内核工程方向。

## 1. 一句话贡献
给动态稀疏注意力的 router 减负：路由不必层层重算——锚层算好、后续层"哨兵挑战、事件触发"式按需重路由，99.99%+ 召回下砍掉一半左右的打分开销。

## 2. 核心贡献
- **跨层路由复用**：只复用路由元数据（哪些块被选），注意力仍用当前层自己的 QKV 算——复用的是"决策"不是"结果"。
- **事件触发机制**：哨兵集（near-miss 候选+随机探针）挑战当前最弱选中项，赢了才重路由该行。
- **理论保证**：top-k 路由的稳定性条件 + 漏检挑战者的概率界。
- **系统设计**：行选择性 GPU 执行；诚实报告未融合 CPU 版仍慢于稠密 GEMM，指出剩余瓶颈在行压缩与账本更新。

## 3. 方法概要（分步）
1. 锚层（若干层一个）：完整 router 打分，选出每 query 的 top-k key 块。
2. 中间层：继承上一层路由，另对哨兵集（上次差点入选的块+随机探针）打分。
3. 若某哨兵分超过该行当前最弱的选中块——该行重路由（事件触发）；否则原路由沿用。
4. 注意力计算照常用当前层 QKV 在选中块上做。
5. GPU 侧按"需重路由的行"选择性执行。

## 4. 核心公式
（待 PDF 精读补全——摘要级暂记直觉）事件触发条件形如 $$\text{score}(\text{哨兵}) > \min_{j \in \text{top-}k} \text{score}(j)$$ 才重路由：**路由的惰性求值——"没证据表明该变就不重算"，省下的是层间冗余的整块打分矩阵**。概率界部分（漏检挑战者）是经典的随机采样覆盖论证。

## 5. 与前作/矩阵关系
- ← 谱系：动态稀疏注意力路由族 [MoBA](/ai-fa/explore/10-Papers/06-长上下文/MoBA- Mixture of Block Attention for Long-Context LLMs（MoBA）)（块级路由）、[NSA](/ai-fa/explore/10-Papers/06-长上下文/Native Sparse Attention- Hardware-Aligned and Natively Trainable Sparse Attention（NSA）)（硬件对齐稀疏注意力）——RouteRelay 是 router-agnostic 的开销优化层，可叠加在这些路由器上。
- 概念链：[稀疏与线性注意力](/ai-fa/explore/40-Concepts/稀疏与线性注意力)。
- 方法论呼应：事件触发/惰性求值思想（预注册"何时必须重算"）与实验系统中"按需重评估"的节约逻辑同构——库内工程效率线参考。

## 6. 影响后续
- 长上下文 prefill 成本优化的新支线：从"更聪明的路由"转向"更便宜的路由维护"；行压缩内核若补齐，实用价值直接。
- 与 E1/E2 无域重叠（LLM 推理工程 vs 像素扩散 WM），纯效率工程格。

## 7. 读前须知
- 前置：动态稀疏注意力基本流程（query 块→key 块路由）——先看 [MoBA](/ai-fa/explore/10-Papers/06-长上下文/MoBA- Mixture of Block Attention for Long-Context LLMs（MoBA）) 卡；top-k 选择的概念。
- 理论部分（稳定性条件/概率界）需要基础概率；公式待 PDF 深读补第 4 节。
