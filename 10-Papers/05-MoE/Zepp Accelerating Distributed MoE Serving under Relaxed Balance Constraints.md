---
type: paper
title: "Zepp: Accelerating Distributed MoE Serving under Relaxed Balance Constraints"
aliases: [Zepp]
year: 2026
authors: [Chang, Chen]
venue: arXiv 2610.11158（cs.DC，2026-10-08）
arxiv: "2610.11158v1"
pdf: https://arxiv.org/pdf/2610.11158v1
line: MoE
matrix_coords: [分布式MoE serving(EP), 均衡=约束(非目标), 瓶颈通信优化(placement/routing/execution)]
tags: [paper, 精读层]
layer: 精化层（摘要级+摘要核实，全文待深读）
---
# Zepp: Accelerating Distributed MoE Serving under Relaxed Balance Constraints

## 1. 一句话贡献
分布式 MoE serving 中"均衡不免费"——为均衡某一维引入的操作本身可能昂贵且失衡；Zepp 把均衡从优化目标降格为 GPU/NIC 物理资源上的约束，直接优化瓶颈通信（放置→路由→执行三级递进），对 7 个 SOTA 系统取得最高 6.68× MoE 层加速（几何均值 1.86×）。

## 2. 核心贡献
- **范式质疑**：负载均衡是 serving 的中心优化目标这一惯例被推翻——均衡计算/通信/内存三维的操作会互相打架，"摆平每一维"不等于"跑得快"。
- **均衡即约束**：只在 GPU 与 NIC 物理资源上保留简化均衡约束，目标函数换成瓶颈通信本身。
- **三级优化**：①专家副本放置（GPU 约束下最小化 token 通信）→②split/merge 原语重塑通信流（NIC 约束）→③专家计算分区与调度、与通信重叠。
- **动态适应**：每迭代联合协调计算、token 通信与专家权重搬移，追的是"最高效执行"而非"单维均衡"。
- **实证**：对比 7 个 SOTA MoE serving 系统，MoE 层最高 6.68×、几何均值 1.86× 加速。

## 3. 方法概要
1. 观测各专家负载分布，在 GPU 容量约束下决定专家副本放哪些节点（减少跨节点 token 搬运）；
2. 在 NIC 带宽约束下用 split/merge 原语把通信流整形（大流拆小、小流合并，避开拥塞链路）；
3. 对专家计算做分区排布，让计算与残余通信重叠；
4. 运行期每个迭代在线重协调三级决策，适应动态倾斜的负载。

## 4. 核心公式
- 优化框架（按摘要重述）：$\min \; \mathrm{comm}(\mathrm{place}, \mathrm{route}, \mathrm{sched}) \;\; \mathrm{s.t.} \;\; \text{GPU 均衡约束}, \; \text{NIC 均衡约束}$
  - 直觉：与其把每张卡摆平，不如认准最慢的那条通信链往死里优化——均衡只需"不违反物理上限"，不必"处处对称"。
- MoE 本体见[[30-Formulas/MoE门控公式|MoE门控公式]]。

## 5. 与前作/矩阵关系
- ← 前身：[[10-Papers/05-MoE/GShard- Scaling Giant Models with Conditional Computation and Automatic Sharding（GShard）|GShard]]（专家并行 EP 开创，均衡即目标的源头）；
- 工程实践对照：[[10-Papers/05-MoE/DeepSeek-V3 Technical Report（DeepSeek-V3）|DeepSeek-V3]]（训练/推理侧均衡设计的当打实践）；
- 训练侧对照：[[10-Papers/05-MoE/Exact Quantile Balancing and Load-Error Injection for Mixture-of-Experts|Exact Quantile Balancing]]（训练期均衡 vs serving 期"均衡约束化"的重定位）；
- 锚：[[20-Algorithms/混合专家（MoE）]] · [[30-Formulas/MoE门控公式]]。

## 6. 影响后续
- serving 系统设计的"约束化均衡"新范式：从多目标摆平退到单目标+物理约束，系统研究的方法论转移；
- 对大规模 MoE 推理成本曲线的实际意义（几何均值近 2×）。

## 7. 读前须知
- 前置：专家并行（EP）基本布局、GPU/NIC 拓扑常识、[[20-Algorithms/混合专家（MoE）]]。
- 原文：https://arxiv.org/pdf/2610.11158v1 ｜ 在线全文：https://arxiv.org/html/2610.11158v1
