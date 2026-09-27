---
type: paper
title: "You Only Need 2/3 of the Chosen Experts: An Empirical Study of Dynamic Expert Pruning in Fine-Grained MoE LLMs"
aliases: [2/3专家剪枝实证]
year: 2026
authors: [Yuanteng Chen, et al.]
venue: arXiv 2026
arxiv: "2609.25809v1"
pdf: 已下载（PDF/）
line: MoE
matrix_coords: [细粒度MoE, 动态专家剪枝, 推理加速, 12检查点×9架构族实证]
tags: [paper]
---

# 只留 2/3 专家就够（细粒度 MoE 动态专家剪枝实证）

## 1. 一句话贡献

细粒度 MoE（数百专家、每 token 选更多）动态专家剪枝的首个系统实证（12 个检查点×9 架构族×11 基准）：**逐 token 专家选择远比现行操作点假设的冗余**——均匀只保留所选专家的约 2/3，平均保住 98.8% 未剪枝性能，只需改一个整数、实测 1.2-1.7× 加速；这个朴素基线让"保守预算下的动态分配"几乎无利可图（最好已发表规则在同等专家预算下与均匀截断差 <1%），动态规则的价值要到激进剪枝区才显现（+3.0%，集中于退化最狠的生成任务）。

## 2. 核心贡献

- 三问填补（细粒度政权下的空白）：逐 token 专家选择有多冗余？现有剪枝方法多好地利用了冗余？什么决定模型对剪枝的敏感度？（先前证据多来自粗粒度架构+似然打分多选基准）
- **2/3 均匀截断基线**：一行整数改动（每 token 少留 1/3 TopK 专家）→ 98.8% 性能保留+两个服务后端 1.2-1.7× 实测加速
- 动态分配的"何时值回复杂度"结论：保守预算下最好规则增益 <1%；激进区最好规则 +3.0%（生成型任务受益最大）
- 敏感度规律：更大模型与 thinking 模型更耐剪，多模态模型更脆

## 3. 方法概要

1. 采集 12 个细粒度 MoE 检查点（9 架构族），统一 11 基准评测（知识问答/数学/代码生成/通用推理——刻意避开似然打分多选，用生成侧评测）
2. 冗余度测量：按 TopK 排序均匀截断到各保留比例，画性能-保留率曲线
3. 对照现有动态剪枝/分配规则（同等专家预算下与均匀截断比）
4. 敏感度因素分析：模型规模/thinking 模式/多模态三轴

## 4. 核心公式

均匀截断基线（本文最强基线，一行改动）：

`$E_{\text{used}}(x)=\mathrm{Top}_{\lfloor rK\rfloor}\, g(x),\qquad r\approx\tfrac{2}{3}\ \Rightarrow\ \text{性能保留}\approx 98.8\%$`

**直觉**：门控分数排序后直接砍尾——不改训练、不加元信息；它之所以强，是因为细粒度 MoE 的 TopK 专家间高度冗余（同 token 的多个细专家编码相近功能），砍掉尾部的 1/3 几乎不换信息。动态规则要在"哪些专家可砍"上超过这个盲砍，只有分布外/激进区才有空间。

## 5. 与前作/矩阵关系

- ≡直接同族 [[Higher-order pruning of experts in mixture-of-experts language models]]（专家剪枝谱系，本文是其细粒度政权+生成侧评测的系统化续作）
- ≡运行时跳专家同族 [[ACE Adaptive Calibration-Free Expert Skipping for MoE-based LLMs]]（免校准专家跳过——本文"已发表规则"对照群的一员）
- ←细粒度政权地基 [[DeepSeekMoE- Towards Ultimate Expert Specialization in Mixture-of-Experts Language Model（DeepSeekMoE）]]（更多更小专家的架构决定创造了"数百专家"这个被研究对象）
- ↔[[Switch Transformers- Scaling to Trillion Parameter Models with Simple and Efficient Spars（Switch）]]（TopK=1 时代的操作点之争——细粒度时代重演）
- 实体锚 [[20-Algorithms/混合专家（MoE）]]

## 6. 影响后续

细粒度 MoE 部署的新常识："先试 2/3 均匀截断再谈动态分配"大概率进服务栈默认检查单；对动态分配研究的启示=必须在激进预算区证明超出均匀基线的增益才有存在权。

## 7. 读前须知

- MoE TopK 路由记号：[[30-Formulas/MoE门控公式]]、[[20-Algorithms/混合专家（MoE）]]
- "细粒度"=专家小而多（DeepSeekMoE/OLMoE 系），与 Switch/Mixtral 的粗粒度对照
