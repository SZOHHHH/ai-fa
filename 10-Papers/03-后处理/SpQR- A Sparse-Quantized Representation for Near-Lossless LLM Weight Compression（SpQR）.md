---
type: paper
title: "SpQR: A Sparse-Quantized Representation for Near-Lossless LLM Weight Compression"
aliases: [SpQR]
year: 2023
authors: [Tim Dettmers, Ruslan Svirschevski, Vage Egiazarian, Denis Kuznedelev, Elias Frantar, Saleh Ashkboos, Alexander Borzunov, Torsten Hoefler, Dan Alistarh]
venue: arXiv 2023-06（NeurIPS 2023；Dettmers=LLM.int8 作者，ISTA/ETH 系量化线）
arxiv: "2306.03078"
pdf: 已下载（PDF/）
line: 后处理
matrix_coords: 量化×异常值稀疏隔离×近无损压缩(3-4bit)
tags: [paper, 后处理, 量化]
---
# SpQR: A Sparse-Quantized Representation for Near-Lossless LLM Weight Compression

> **中文速览**：做了什么——LLM 量化到 3-4 bit 通常掉精度（1-10B 小模型尤甚，恰是边缘部署的主力），SpQR 实现近无损 3-4 bit 压缩。怎么做的——三件套：①找出"对量化致命"的稀疏异常权重（约 0.5-1%），单独用 16 bit 高精度存（行独立的列粒度）；其余 99% 稠密权重量化到 3-4 bit。②**双重量化**：一级量化的分组常数本身再量化到 8 bit（省掉"管理开销"）。③训练时的小误差补偿项（LoRA 风格）。效果——LLaMA-65B 压到 3-4 bit 精度近 16 bit；配套 GPU 推理引擎让 3-4 bit 推理**快于** 16 bit（省带宽），笔记本/手机跑大模型成为可能。

## 1. 一句话贡献
近无损 3-4 bit LLM 压缩：把量化误差的元凶（稀疏异常权重）单独隔离成 16 bit 稠密块、其余权重放心压到 3-4 bit，再用双重量化压掉分组常数的存储税——"精度只花在刀刃上"。

## 2. 核心贡献
- **稀疏异常值隔离**：量化敏感权重（离群元素）以行独立的列子集粒度识别，16 bit 存储；观察到异常值分布高度不均匀且逐层逐行变化——固定全局粒度（LLM.int8 的行级/向量级）在小比特下不够细。
- **双重量化（Double-Quantization）**：分组量化常数（如 64 权重一组一个 scale）本身占可观显存——对常数再量化到 8 bit，平均每权重省约 0.5 bit 预算。
- **训练时误差补偿**：量化后权重加一个小可学修正项（受 LoRA 启发），在极低比特下补回剩余精度损失。
- **端到端推理引擎**：稀疏矩阵×稠密矩阵的 GPU 核 fused 实现——卸载到显存后 3-4 bit 推理吞吐反超 16 bit（解带宽瓶颈而非算力瓶颈）。

## 3. 方法概要（分步）
1. **识别异常值**：逐层分析量化损失，迭代找出"去掉它量化误差显著下降"的权重集合 $\mathcal{O}$（~0.5-1%）；粒度=行独立的列集合（每行自己的刺头列不同）。
2. **分解存储**：$\mathcal{O}$ 存 16 bit 稀疏格式（索引+值）；其余 $W \setminus \mathcal{O}$ 分组量化到 3-4 bit。
3. **双重量化**：一级 scale/zero 常数分组再量化到 8 bit。
4. **误差补偿**：冻结量化权重，训练小补偿矩阵 $\Delta$（低秩）吸收剩余误差。
5. **推理**：自定义 GPU 核做"16bit 稀疏异常 + 3-4bit 稠密主体"的混合矩阵乘，权重按需解压。

## 4. 核心公式
- 稀疏分解：$W \approx Q_{3\text{-}4\mathrm{bit}}(W \setminus \mathcal{O}) + \mathcal{O}_{16\mathrm{bit}}$——直觉：99% 的权重安分守己住 3-4 bit 集体宿舍，<1% 的"刺头"（对舍入误差极敏感）单独住 16 bit 单间；总预算仍接近全低比特。
- 异常值判据（迭代式）：$e(W) - e(W \setminus \{w_i\}) > \tau$ 则 $w_i \in \mathcal{O}$——直觉：**拿走它误差就明显降=它是误差主凶**，逐个揪出。
- 双重量化：$c_1 = Q_{8\mathrm{bit}}(c_1)$（分组常数本身量化）——直觉：宿舍管理费本身也要省着花；平均每权重省 ~0.5 bit。
- 误差链视角：总误差 $=$ 稠密项舍入误差 $+$ 异常项（≈0，16bit 视为无损）$+$ 补偿残差——与 [[30-Formulas/量化误差与异常值]] 的"误差被异常值主导"命题同源。

## 5. 与前作/矩阵关系
- ← 异常值发现者：[[LLM.int8()- 8-bit Matrix Multiplication for Transformers at Scale（LLM.int8）|LLM.int8]]（Dettmers 同作者——先证明"异常值是量化拦路虎"（8bit 行级隔离），SpQR 把同一思想推到 3-4 bit（列级稀疏隔离）；矩阵上=int8 近无损→3-4bit 近无损的比特下探）。
- ↔ 同族对照：[[GPTQ- Accurate Post-Training Quantization for Generative Pre-trained Transformers（GPTQ）|GPTQ]]（Hessian 逐列量化+误差传播补偿——正交技术，可组合）、[[AWQ- Activation-aware Weight Quantization for LLM Compression and Acceleration（AWQ）|AWQ]]（激活感知缩放——从"保护哪些权重"换成"缩放哪个通道"）；三分支构成 2023 量化轴的三种异常值哲学：**隔离（SpQR）/补偿（GPTQ）/缩放（AWQ）**。
- 数学根基：[[40-Concepts/量化]]（均匀量化骨架）、[[30-Formulas/量化误差与异常值]]（误差-异常值依赖定律）。

## 6. 影响后续
- 边缘部署叙事成型："笔记本/手机跑 65B"从口号变系统方案；后续 llama.cpp/GGUF 系量化格式（Q4_K 族的分组+重要层加精度）承其衣钵。
- 双重量化成为低比特流水线标准件（被 AWQ/QoQ 等沿用）。
- 局限：稀疏异常值的索引结构使加载/解码路径复杂；训练时补偿需要校准数据与少量训练算力。

## 7. 读前须知
[[40-Concepts/量化]]（均匀量化/分组量化骨架）→ [[30-Formulas/量化误差与异常值]]（为什么 <1% 权重主导量化误差——本卡的全部动机）；对照读 LLM.int8（异常值现象发现）效果最佳。
