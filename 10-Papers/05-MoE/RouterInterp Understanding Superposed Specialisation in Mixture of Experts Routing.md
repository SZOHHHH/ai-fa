---
type: paper
title: "RouterInterp: Understanding Superposed Specialisation in Mixture of Experts Routing"
aliases: [RouterInterp, SSH]
year: 2026
authors: [Ilya, Lasy]
venue: ICML 2026（已录用）；arXiv 2610.11775
arxiv: "2610.11775v1"
pdf: https://arxiv.org/pdf/2610.11775v1
line: MoE
matrix_coords: [专家可解释性, SAE特征×路由决策, 叠加特化假说(SSH), gpt-oss-20b实证]
tags: [paper, 精读层]
layer: 精化层（摘要级+摘要核实，全文待深读）
---
# RouterInterp: Understanding Superposed Specialisation in Mixture of Experts Routing

## 1. 一句话贡献
提出"叠加特化假说（Superposed Specialisation Hypothesis, SSH）"——MoE 专家特化于**多个细粒度特征的不相交并集**而非单一连贯领域——并据此用 SAE 特征解释路由决策，在 gpt-oss-20b 上检测准确率比 token 统计方法高约 65%。

## 2. 核心贡献
- **SSH 假说 + 证据**：主流叙事"每个专家专注一个领域"是错的；按此假设做的可解释性尝试屡屡失败，SSH 给出替代解释——专家像多面手，每一面都是窄技能（细粒度特征），多个不相交特征叠加成一个专家的职责。
- **RouterInterp 方法**：识别对路由决策最具预测力的 SAE（稀疏自编码器）特征，聚合成统一的自然语言解释。
- **量化收益**：gpt-oss-20b 上解释路由的检测准确率较 token 统计类方法提升约 65%。

## 3. 方法概要
1. 对目标模型跑 SAE，得到细粒度、可解释的特征激活字典；
2. 对每个专家，筛选"能否预测某 token 路由到它"最具预测力的特征子集；
3. 把特征组合翻译成统一自然语言描述；
4. 用检测准确率（据解释预测路由行为）客观量化解释质量，替代以往靠人工看 token 列表的低效做法。

## 4. 核心公式
- MoE 前向（[[30-Formulas/MoE门控公式|MoE门控公式]]）：$y = \sum_{i \in \mathrm{TopK}(g(x))} g_i(x)\, e_i(x)$
- SSH 的形式化表述：专家 $e_i$ 的职责集 $\approx$ 细粒度特征的不相交并集 $F_{i,1} \sqcup F_{i,2} \sqcup \cdots$，而非单一宽域 $D_i$。
  - 直觉：路由器不是在"选科室"，而是在"点菜"——一个专家身上叠着好几道不相关的窄技能，只有按特征（菜名）看才对得上号。

## 5. 与前作/矩阵关系
- 对话 [[10-Papers/05-MoE/DeepSeekMoE- Towards Ultimate Expert Specialization in Mixture-of-Experts Language Model（DeepSeekMoE）|DeepSeekMoE]]：细粒度专家切分范式的"分工画像"——SSH 为"细粒度特化到底长什么样"补了实证；
- 锚：[[20-Algorithms/混合专家（MoE）]] · [[30-Formulas/MoE门控公式]]。

## 6. 影响后续
- MoE 可解释性从"看 token 统计"升级为"按 SAE 特征归因"的可扩展方法；
- 对专家分工假设的修正，会反向影响专家剪枝/合并/路由约束等下游操作的设计依据（同日 [[10-Papers/05-MoE/DivMoE Fine-Grained MoE Upcycling via Cross-Domain Expert Composition|DivMoE]] 的域分组路由可视为给"叠加"引入结构先验的另一路）。

## 7. 读前须知
- 前置：SAE（稀疏自编码器）特征概念、[[30-Formulas/MoE门控公式]]。
- 原文：https://arxiv.org/pdf/2610.11775v1 ｜ 在线全文：https://arxiv.org/html/2610.11775v1
