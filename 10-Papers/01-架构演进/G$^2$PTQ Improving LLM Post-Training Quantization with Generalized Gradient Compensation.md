---
type: paper
title: "G$^2$PTQ: Improving LLM Post-Training Quantization with Generalized Gradient Compensation"
aliases: [G2PTQ, G²PTQ]
year: 2026
authors: [Ruikang Liu, et al.]
venue: arXiv 2026-09
arxiv: "2609.31009v1"
pdf: https://arxiv.org/pdf/2609.31009v1
line: 架构演进
matrix_coords: [权重, 量化, 训练后]
tags: [paper]
---

# G²PTQ：广义梯度补偿的 LLM 训练后量化

## 1. 一句话贡献

把 GPTQ 系 PTQ 的"局部逐层目标缺全局监督、全局目标 Hessian 固定且忽略一阶梯度"两块短板合成一个框架——按 Transformer 块刷新梯度+Hessian 估计的块级全局优化，配信赖域缩放防一阶补偿爆炸。

## 2. 核心贡献

- **诊断二分**：GPTQ 系两类路线互补失效——逐层局部目标无全局监督；全局目标把 Hessian 冻结在起点且不用一阶梯度，量化推进中指导变"陈旧"（stale）；
- **广义梯度补偿**：一阶+二阶信息统一进块级（block-wise）全局监督目标，每个 Transformer 块量化前**刷新**梯度与 Hessian 估计——治"陈旧"；
- **信赖域缩放**：精确一阶补偿的步长动态设上界，防权重更新爆炸（[[40-Concepts/信赖域]] 思想在 PTQ 里的落地）；
- 块级 Hessian 近似与精确梯度补偿的高效实现；多模型族多 bit 宽下对齐全精度模型优于 SOTA。

## 3. 方法概要

1. 以块（若干 Transformer 层）为优化单位设全局目标，而非逐层独立；
2. 每块量化前重算该块的梯度与 Hessian——反映"前面块已量化"后的真实误差景观；
3. 一阶梯度补偿走信赖域缩放步（限幅），二阶走 Hessian 修正；
4. 交替推进直到全网量化完成（摘要级：未读正文，超参/实现细节待精读）。

## 4. 核心公式

补偿方向的统一形式（示意，摘要级推导）：

`$\Delta W = -\lambda_{tr}\,\nabla_W \mathcal{L}_{block} - H^{-1}_{block}\,\delta_{quant}$`

**直觉**：量化误差 $\delta_{quant}$ 的二阶修正（GPTQ 的老配方）加上损失面的一阶下拉力；$\lambda_{tr}$ 是信赖域系数——梯度方向只敢走"限幅后的半步"，因为 PTQ 没有再训练兜底，一步走猛就是不可逆的权重破坏。（未读正文，精确记号待核）

## 5. 与前作/矩阵关系

- ← 直接前身 [[10-Papers/03-后处理/GPTQ- Accurate Post-Training Quantization for Generative Pre-trained Transformers（GPTQ）|GPTQ]]（二阶逐列补偿）——本卡=GPTQ 的"全局化+刷新化"改造；
- ≡ 同场竞品 [[10-Papers/03-后处理/SmoothQuant- Accurate and Efficient Post-Training Quantization for Large Language Models（SmoothQuant）]]（激活迁移路线）、[[10-Papers/03-后处理/AWQ- Activation-aware Weight Quantization for LLM Compression and Acceleration（AWQ）]]（激活感知路线）；
- 概念链：[[40-Concepts/量化]]、[[30-Formulas/量化误差与异常值]]、[[40-Concepts/信赖域]]、[[20-Algorithms/Transformer]]。

## 6. 影响后续

PTQ 从"逐层贪心"进化到"块级全局+在线刷新"的代表作之一；对部署侧（4bit 生态）是精度天花板抬升。代码开源（github.com/G2PTQ/G2PTQ）。

## 7. 读前须知

[[10-Papers/03-后处理/GPTQ- Accurate Post-Training Quantization for Generative Pre-trained Transformers（GPTQ）|GPTQ]] 的 Hessian 补偿推导；[[30-Formulas/量化误差与异常值]]；信赖域直觉看 [[40-Concepts/信赖域]]（为何限幅：无再训练兜底的不可逆操作）。
