---
type: paper
title: "SMELT: Scaling Laws for Compute-Matched MoE Looped Transformers"
aliases: [SMELT]
year: 2026
authors: [Shaowen Wang, Ge Zhang, Kairong Luo, Yuhao Wu, Shaofan Liu, Jiaheng Liu, Wenhua Huang, Shen Yan, Jian Li]
venue: arXiv v3 2026-09-11（cs.LG）
arxiv: "2609.01343"
pdf: 已下载（PDF/）
line: MoE
matrix_coords: 循环Transformer×MoE×scaling law
tags: [paper, 轮换命中, MoE]
layer: 精化层（摘要级+摘要核实，PDF 待深读）
---
# SMELT: Scaling Laws for Compute-Matched MoE Looped Transformers

> **中文速览**：做了什么——循环 Transformer（同一块层迭代多次当加深度用）的已有评测都在固定模型尺寸下比，把"架构优势"和"多花 FLOPs"混在一起；SMELT 在**严格计算匹配**（逐 token FLOPs、非嵌入参数、KV cache 三项全对齐）下研究 MoE Transformer 的循环化。怎么做的——系列消融后得到配方 SMELT：**中半层循环两次**（其余不循环），三预算匹配基线；从 ~1B 到 54B 非嵌入参数四档规模，每种架构各拟 Chinchilla 式 scaling law。效果——计算最优前沿省 6.8-18.0% 训练 FLOPs；增益超出验证损失预测、在 Code 上最大、随样本长度与上下文示例数增长；**机制分析发现第二次循环减少 attention sink、把概率质量重定向到内容相关 token**。

## 1. 一句话贡献
计算匹配下循环依然赚：中半层循环两次的 MoE 配方（SMELT）在 FLOPs/参数/KV 三预算全对齐的对比里，scaling 曲线更陡（省 6.8-18% FLOPs），且机制上第二次循环恰好削弱 attention sink。

## 2. 核心贡献
- **干净对照**：逐 token FLOPs+非嵌入参数+KV cache 三预算同时匹配——剥离"循环=多算几次当然好"的混淆。
- **SMELT 配方**：稀疏 MoE Transformer，中半层 loop twice（消融得出：不是越循环越好）。
- **规模实证**：四档规模（至 54B 非嵌入参数）+ 每架构独立拟合 Chinchilla 式 scaling law。
- **机制发现**：第二次循环减少 attention sink、质量移向内容相关 token——循环的归纳偏置可能是增益来源；增益随上下文长度/示例数增长。

## 3. 方法概要（分步）
1. 构造循环 MoE 变体族（循环哪些层、循环几次）。
2. 每个变体调整宽度/专家配置，使三预算与不循环基线对齐。
3. 系列消融（循环位置/次数×MoE 配置）→ 中半层循环两次胜出=SMELT。
4. 四档规模训练，各自拟合 $$L(C)=aC^{-\alpha}+b$$ 类 scaling law，比计算最优前沿。
5. 机制侧：分析第二次循环前后的注意力分布（sink 质量变化、内容 token 质量）。

## 4. 核心公式
（待 PDF 精读补全——摘要级暂记直觉）Chinchilla 式缩放律 $$L(C) = a \cdot C^{-\alpha} + b$$，对每种架构各拟一组 $$(a, \alpha, b)$$：**同一横轴（计算量）下谁的曲线低谁赢——SMELT 曲线整体下移 6.8-18%，意味着同样损失少花一到两成算力**。循环本身 $$h \leftarrow \text{Block}(h)$$ 重复执行——深度不是参数堆出来的，是"算出来的"。

## 5. 与前作/矩阵关系
- ← MoE 谱系：[DeepSeekMoE](/explore/10-Papers/05-MoE/DeepSeekMoE- Towards Ultimate Expert Specialization in Mixture-of-Experts Language Model（DeepSeekMoE）)（细粒度专家专业化）、[Mixtral](/explore/10-Papers/05-MoE/Mixtral of Experts（Mixtral）)（稀疏 MoE 标杆）——SMELT 在 MoE 骨干上叠循环深度复用。
- 数学本体：[MoE门控公式](/explore/30-Formulas/MoE门控公式)（被循环复用的 Block 正是稀疏门控 MoE 层——路由与负载均衡公式是配方根基）。
- ↔ attention sink 机制联动：[StreamingLLM](/explore/10-Papers/06-长上下文/Efficient Streaming Language Models with Attention Sinks（StreamingLLM）)（sink 命名者）与 SinkProbe 卡（[百万 token sink 诊断](/explore/10-Papers/06-长上下文/Do New Attention Mechanisms Actually Fix Attention Sinks at Million-Token Context)）——SMELT 的"第二次循环削 sink"为"sink 是优化/训练动态产物而非架构宿命"添了跨设定证据（改变计算路径不改架构即可削 sink）。
- 方法论：计算匹配对照=单变量归因范式（与 E1 六线"固定环境只改蒸馏目标"同族的实验设计伦理）。

## 6. 影响后续
- "深度复用"从固定尺寸 trick 升级为有 scaling law 背书的规模选项；后续工作会在更大规模验证循环增益边界。
- 与 E1/E2 无域重叠；arch/MoE 线教学参考（干净对照+机制验证双重示范）。

## 7. 读前须知
- 前置：MoE 路由直觉（[DeepSeekMoE](/explore/10-Papers/05-MoE/DeepSeekMoE- Towards Ultimate Expert Specialization in Mixture-of-Experts Language Model（DeepSeekMoE）) 先看）、Chinchilla 缩放律形态、attention sink 概念（[StreamingLLM](/explore/10-Papers/06-长上下文/Efficient Streaming Language Models with Attention Sinks（StreamingLLM）)）。
- 公式细节（缩放律拟合/机制统计量）待 PDF 深读补第 4 节。
