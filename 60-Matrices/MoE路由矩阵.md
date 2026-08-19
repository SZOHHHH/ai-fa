---
type: matrix
title: MoE 路由矩阵
axes: { 行: [路由粒度], 列: [路由决策形式], 切片: [负载均衡机制] }
status: active
updated: 2026-08-18
---

# MoE 路由矩阵

> [!purpose] 目标
> 混合专家（MoE）的核心变量——路由器——的设计空间全景。核心问题：**专家分配的数学还能怎么变**。评估见 [[00-Meta/研究矩阵规范]] §2。

## 1. 轴定义

| 轴 | 取值 | 判据 |
|---|---|---|
| **粒度** | token 级、专家级、块级 | 路由决策的作用单位 |
| **决策形式** | Top-K 稀疏 softmax、软混合（全专家加权）、专家自选、细粒度分段 | argmax/加权/双向匹配 |
| **均衡** | 辅助均衡损失、无显式损失（容量因子）、**去偏置** | 怎么防专家塌缩 |

## 2. 矩阵表（粒度 × 决策形式；★=首次定义该格）

| 粒度 \ 决策形式 | Top-K 稀疏路由 | 软混合 | 专家自选 | 细粒度分段 |
|---|---|---|---|---|
| **token 级** | ★[[10-Papers/03-后处理/Outrageously Large Neural Networks- The Sparsely-Gated Mixture-of-Experts Layer（稀疏MoE）]]→[[10-Papers/05-MoE/GShard- Scaling Giant Models with Conditional Computation and Automatic Sharding（GShard）]]→[[10-Papers/05-MoE/Switch Transformers- Scaling to Trillion Parameter Models with Simple and Efficient Spars（Switch）]]→[[10-Papers/05-MoE/GLaM- Efficient Scaling of Language Models with Mixture-of-Experts（GLaM）]]→[[10-Papers/05-MoE/Mixtral of Experts（Mixtral）]] | [[10-Papers/05-MoE/From Sparse to Soft Mixtures of Experts（Soft MoE）]] | [[10-Papers/05-MoE/Mixture-of-Experts with Expert Choice Routing（Expert Choice）]] | [[10-Papers/05-MoE/DeepSeekMoE- Towards Ultimate Expert Specialization in Mixture-of-Experts Language Model（DeepSeekMoE）]]（共享+细粒度） |
| **序列/块级** | — | — | — | [[10-Papers/06-长上下文/MoBA- Mixture of Block Attention for Long-Context LLMs（MoBA）]]（注意力块粒度，跨界 [[60-Matrices/长上下文机制矩阵]]） |

## 3. 格评估（四维）

| 格 | 评估 | 结论 |
|---|---|---|
| token 级 × Top-K | 3/5/2/2 | 已是工业标配（Switch→Mixtral→DeepSeek 系），纯改 Top-K 无空间 |
| **token 级 × 软混合 × 理论** | 3/4/**4/4** | 🌱 半机会格：Soft MoE 证明可行，但软路由的可微最优性分析（均衡损失是否=精确约束的松弛？）仍薄——"一个格+一个定理"适用。风险：视觉域已占，语言域训练成本高 |
| **去偏置路由 × 理论保证** | 4/5/4/5 | 🚩🚩 **工程主位已被占（B17 核查）**：[[10-Papers/05-MoE/Auxiliary-Loss-Free Load Balancing Strategy for Mixture-of-Experts（无辅助损失MoE）]]（2408.15664，bias 只进选择不进门控，DeepSeek-V3 全面采用）+ [[10-Papers/05-MoE/DeepSeek-V3 Technical Report（DeepSeek-V3）]]（生产装配）——**B9 机会格"去偏置路由×理论"的工程侧关闭**；理论保证（收敛性/方差界）仍薄但作为纯理论贡献的窗口已窄 |
| 专家自选 × 负载均衡 | 4/5/3/4 | Expert Choice 天然均衡但"被冷落 token"理论无人补——分析型论文的机会（ICLR/NeurIPS 风格，ICML 也可） |
| 块级路由 × 生成 | 4/4/4/4 | MoBA 已占（注意力侧）；"FFN 层的序列级路由"（与 [[60-Matrices/长上下文机制矩阵]] 交叉）边缘开放 |

## 4. 矩阵洞察

1. **路由器 = MoE 版的"稳定化机制"**：均衡损失之于 MoE ≈ 裁剪之于 PPO（[[60-Matrices/RL稳定化矩阵]]）——都是"辅助约束防崩"，且都面临**同一痛点：辅助项挤占主目标梯度**（MoE 均衡损失 vs GRPO 长度偏置）。这条同构已两次独立爆发（Dr.GRPO ↔ MoE 去偏），是跨线共振之二
2. **粒度轴的走向**：token → 专家自选 → 块——与 RL 线"token→序列→组"完全同构（[[60-Matrices/RL稳定化矩阵]] 洞察 1）：**聚合粒度的改变是所有分配类问题（注意力/路由/优势估计）的通用创新轴**
3. Soft↔Sparse 的对偶：Soft MoE（全专家加权，无 token 丢弃）与 Top-K（稀疏，有 token 丢弃）——放松 vs 收紧同一约束（cf. 硬裁剪 vs 软门控），**"软硬对偶"在三条线同时出现**（RL 裁剪/MoE 路由/扩散采样）

> 全景定位：本矩阵格况见 00-Meta/全景机会格图（12 矩阵汇总）
