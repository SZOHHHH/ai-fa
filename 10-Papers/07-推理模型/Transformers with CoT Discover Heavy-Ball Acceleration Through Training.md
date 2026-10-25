---
type: paper
title: Transformers with CoT Discover Heavy-Ball Acceleration Through Training
aliases: []
year: 2026
authors: [Yuxuan, Cai]
venue: 待核（占位层，来自 arXiv 2026-10-22）
arxiv: "2610.31089v1"
pdf: https://arxiv.org/pdf/2610.31089v1
line: 推理模型
matrix_coords: 待评
tags: [paper, 占位层]
layer: 占位
---
# Transformers with CoT Discover Heavy-Ball Acceleration Through Training

> **占位层卡**（daily 自动采集 2026-10-25 建卡，元数据出自 arXiv API=已核实）。本链 Claude 处理段将自动精读升级：七节补全+中文速览+挂全链。
> 摘要（原文）：Modern transformers often solve complex tasks by generating and refining intermediate reasoning steps. To develop a theoretical understanding of chain-of-thought (CoT) reasoning, a notable recent study by Huang et al. (2025) viewed transformers as algorithm executors, and showed that when transformers' CoT steps are supervised by a gradient-descent teacher, they can learn to implement gradient descent for in-context weight prediction in linear regression. In this paper, we study the same in-context weight prediction task but ask whether CoT reasoning can go beyond merely imitating the teacher 

## 1. 一句话贡献
在与 Huang et al. (2025) 相同的 in-context 线性回归权重预测任务上证明：先用梯度下降老师监督 CoT 步，再切换到**真实回归权重的轨迹级监督**继续训练，transformer 的 CoT 会**自发发现 Heavy-Ball 动量加速算法**——超越被模仿的老师、且从未见过任何动量法老师——给出"CoT 推理可通过训练发现新算法（而非仅模仿监督算法）"的具体理论实例。

## 2. 核心贡献
- （待精读）

## 3. 方法概要
1. 任务与视角：transformer=算法执行器，CoT 步=算法迭代，考场=in-context 线性回归权重预测；
2. 阶段一：GD 老师监督 CoT 步（复现 Huang 2025 的"学会执行 GD"）；
3. 阶段二：换监督目标——只用真实回归权重做轨迹级监督（不再提供算法步骤供模仿）；
4. 分析发现：模型学到的更新规则=GD+动量项（Heavy-Ball），收敛加速超过 GD 老师；
5. 结论：监督从"模仿算法"换成"到达真值"后，CoT 能发现监督之外的新算法。

## 4. 核心公式
（待精读）

## 5. 与前作/矩阵关系
- 线锚：[[40-Concepts/思维链（CoT）]]（CoT 理论线）· [[20-Algorithms/梯度下降与优化器谱系]]（Heavy-Ball 动量在优化器谱系中的位置）· [[30-Formulas/Adam更新规则]]（动量项的现代后裔）
- ← 前身：Huang et al. 2025（GD-supervised CoT 学 in-context 权重预测，未入库）
- ≡ 同族：[[10-Papers/07-推理模型/Causal Chain of Thought Mitigating Attention Leakage via Context Isolation|CausalCoT]]（CoT 理论两翼：学到的算法能否超越老师 vs 学到的步骤是否因果驱动答案）· [[10-Papers/01-架构演进/The Dichotomy Between Pattern Recognition and Step-by-Step Reasoning|Dichotomy]]（CoT 谱系理论邻居）

## 6. 影响后续
（待精读）

## 7. 读前须知
（待精读）原文：https://arxiv.org/pdf/2610.31089v1；在线全文（新论文）：https://arxiv.org/html/2610.31089v1
