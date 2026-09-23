---
type: paper
title: "SAS: Simple Attention Sparsification via End-to-End Optimization of Context Ranking"
aliases: [SAS]
year: 2026
authors: [Zhiwei Li, Lei Zhu, Hao Gu, Xiang Hu, Yan Wang, Haitao Mi, Sirui Han, Leo Liang, Zhijiang Guo]
venue: arXiv 2026-09-11（cs.CL）
arxiv: "2609.13141"
pdf: 已下载（PDF/）
line: 长上下文
matrix_coords: 注意力稀疏化×可训练选择器×端到端
tags: [paper, 轮换命中, 长上下文]
layer: 精化层（摘要级+摘要核实，PDF 待深读）
---
# SAS: Simple Attention Sparsification via End-to-End Optimization of Context Ranking

> **中文速览**：做了什么——训练后注意力稀疏化（给每个 query 只选一小撮上下文单元来算注意力）里，现有可训练方法用轻量选择器打分+硬 Top-K 选择，梯度被截断，只能靠"蒸馏教师稠密注意力分布"来教选择器。指出这错位了：**按稠密注意力权重排序 ≠ 按对预测的影响排序**，预算会浪费在"教师看重但对下游没用"的单元上。怎么做的——SAS 把选择器的连续分数直接以门控形式注入 attention logits，让语言建模损失端到端反传训练选择器；三个关键工程选择：①门放 softmax 内部取 log 形式；②归一化 softmax 门拿"永远保留的当前块"当校准锚；③保留连续分数（学相对优先级而非只学硬选择）。配套 Triton 核融合进 FlashAttention 式计算。效果——推理/长上下文/agentic 任务全预算超可训练稀疏注意力基线，紧预算下增益最大。

## 1. 一句话贡献
注意力稀疏化的目标对齐修复：不再蒸馏教师的注意力分布（中间量），而是把选择器分数变成注意力 logit 里的可微门，让最终任务损失直接教"该看哪里"——排序终于对齐"对预测的影响"而非"教师的权重"。

## 2. 核心贡献
- **错位诊断**：蒸馏稠密注意力分布教选择器，会让预算浪费在教师高权重但对预测无影响的单元——代理目标与真实目标脱节。
- **端到端门控**：选择器连续分数注入 attention logits，语言建模损失经标准反传更新选择器（Top-K 硬选择的梯度阻塞被绕开）。
- **三个关键选择**：log 形式门（softmax 内）、归一化 softmax 门以当前块为校准锚（历史上下文与"必留项"可比）、连续分数保留（相对优先级可学）。
- **工程**：内存高效 Triton 核，FlashAttention 式融合。

## 3. 方法概要（分步）
1. 轻量选择器对每个 query 给上下文单元（token/块）打连续分。
2. 分数经归一化 softmax 门 $$g$$，以 log 形式加进注意力 logits（软偏置，不做硬掩码）。
3. 前向正常算（门让高分单元更受关注），语言建模损失反传时梯度流经门到选择器。
4. 推理时按门分数取预算内 Top-K，只算稀疏注意力。
5. Triton 核实现，训练长序列不爆内存。

## 4. 核心公式
（待 PDF 精读补全精确形式——摘要级暂记直觉）门控注入形如 $$\text{logit}_{q,i} \leftarrow \text{logit}_{q,i} + \log g_i$$，$$g$$ 是选择器分数的归一化 softmax：**软偏置而非硬选择——梯度能穿过门流回选择器，"看哪里"第一次由下游损失而非教师注意力直接决定**。log 门保证 $$g_i \in (0,1]$$ 只调强弱不翻符号；拿当前块当校准锚（分母里恒有它）使历史单元的分数天然以"必留项"为 1 的标尺归一。

## 5. 与前作/矩阵关系
- ← 谱系：可训练稀疏注意力族 [NSA](/ai-fa/explore/10-Papers/06-长上下文/Native Sparse Attention- Hardware-Aligned and Natively Trainable Sparse Attention（NSA）)（原生可训练稀疏注意力）、[MoBA](/ai-fa/explore/10-Papers/06-长上下文/MoBA- Mixture of Block Attention for Long-Context LLMs（MoBA）)（块级混合注意力路由）——SAS 定位是其"训练后+端到端目标对齐"改进。
- 概念链：[稀疏与线性注意力](/ai-fa/explore/40-Concepts/稀疏与线性注意力)（稀疏化两大范式：训练时原生 vs 训练后改造，SAS 属后者）。
- ↔ **E1 方法论镜像**（库内对话位）：SAS 批判"蒸馏中间量（注意力分布）无法保证最终目标（预测质量）"与 E1 红线"蒸馏目标只用像素/生成质量指标无法保证决策保真"同构——**代理目标与真实目标的错位在不同领域反复出现**，E1 论文 Discussion 可引作跨域证据。

## 6. 影响后续
- 训练后稀疏化从"模仿教师注意力"转向"端到端服务任务损失"，可能成为稀疏注意力选择器的默认训练法。
- 跨域启示：任何"用中间量蒸馏教选择器/控制器"的场景（KV 淘汰、检索路由、早退）都适用同样的对齐批判。

## 7. 读前须知
- 前置：softmax 注意力计算流程（[Transformer](/ai-fa/explore/10-Papers/01-架构演进/Attention Is All You Need（Transformer）)）、Top-K 硬选择的梯度截断问题（重参数化/Gumbel 直觉有帮助）。
- 公式细节（门的精确归一化形式）待 PDF 深读补全第 4 节。
