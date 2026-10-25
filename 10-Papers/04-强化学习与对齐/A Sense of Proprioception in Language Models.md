---
type: paper
title: "A Sense of Proprioception in Language Models"
aliases: [数字本体感受, LM Proprioception]
year: 2026
authors: [Jonas Geiping]
venue: arXiv 2610.17495（cs.LG/cs.CL，28 页 22 图，2026-10-12）
arxiv: "2610.17495v1"
pdf: https://arxiv.org/pdf/2610.17495v1
line: 强化学习与对齐（decision-aware-rl 组命中）
matrix_coords: [LM内部状态自感知(数字本体感受), 可验证内部信号构造(路由/token熵/决策深度/logit lens), SFT+on-policy训练, 情境意识/可读性/副现象性三维评测, 不改变模型能力约束]
tags: [paper, 精化层（摘要级）]
layer: 精化层（摘要级精读）
---
# A Sense of Proprioception in Language Models

> 精化升级 2026-10-14（每日日常处理段，摘要级——HTML 通道无全文，28 页正文未展开）。Geiping（本人独立署名）：给语言模型造"数字本体感受"——训练模型报告自己的内部状态（哪些 MoE 专家被激活、token 熵、决策深度、logit lens 信息），并系统检验这种自我可及性是否改变行为。

## 1. 一句话贡献
类比人体本体感受（有专门受体、结果可验证、独立于内省），给 LM 装上"数字本体感受"——把训练时模型自己看不到的内部量（MoE 路由决策、token 熵、决策深度、logit lens）构造成可验证信号，用 SFT+on-policy 训练让模型准确报告它们且不伤原有能力，再经情境意识/可读性/副现象性三维评测看自我可及性如何改变行为。

## 2. 核心贡献
- **概念框架**：本体感受 ≠ 内省——本体感受有专门受体与可验证结果；LM 的内部状态"因其内在"既可及又可构造为可验证信号，这给"数字本体感受"提供理论基础。
- **训练法**：SFT + on-policy 训练使现代模型学会报告多类内部量（路由决策意识、token 熵、决策深度、logit lens 信息）而不影响模型能力（"不伤能力"是硬约束）。
- **评测三件套**：情境意识（situational awareness）/可读性（legibility）/副现象性（epiphenomenality）——特别是最后一问：接触内部状态是否只读不写、还是真的改变行为。

## 3. 方法概要
（摘要级）①从模型前向中抽取内部量（路由/熵/深度/logit lens）构造成" receptors + 可验证结果"；②SFT 教模型以自然语言报告这些量；③on-policy 训练对齐报告与真实内部状态；④三维评测电池检验能力保持与行为改变。

## 4. 核心公式
- （摘要级，统一记号示意）内部状态预测头训练目标：$\mathcal{L} = -\mathbb{E}_{(q, s) \sim \mathcal{D}_{\text{内部}}}\left[\log p_\theta(\hat{s} = s \mid q)\right]$，其中 $s$ 为可验证内部真值（路由选择/token 熵/决策深度）（直觉：把"模型自己"变成监督信号源——标签由前向计算免费生成，无需人工标注；正文 28 页含 on-policy 目标的完整形式，待精读补）
- 副现象性检验（概念式）：$\Delta_{\text{行为}} = d\left(\pi_{\text{有本体感受}}, \pi_{\text{基线}}\right) \overset{?}{\approx} 0$（直觉：若接触内部状态不改变行为则"副现象"；论文的系统贡献在于把这一问做成可测电池）

## 5. 与前作/矩阵关系
- 线锚：[[20-Algorithms/混合专家（MoE）]]（路由决策意识的对象）· [[20-Algorithms/GRPO与RLVR]]（on-policy 训练通道）· [[40-Concepts/思维链（CoT）]]（内省式输出的近邻概念）· [[40-Concepts/softmax函数]]（token 熵/logit lens 的载体）
- ≡ 自我知识同族：[[10-Papers/04-强化学习与对齐/Can an Agent Learn to Predict Its Own Failure Outcome-Grounded Confidence Calibration in LLM Agents|Can an Agent Learn to Predict Its Own Failure]]（同日同题近邻——那边预测外部多步结局校准自信，这边报告内部状态；同为"自我知识可验证化"）
- ← 前身：模型内省/自知识评测线（know-what-you-know 一族）、logit lens 可解释性工具线（此处把工具变训练对象）

## 6. 影响后续
- 给"LM 自我知识"一个带生理学类比的干净框架与训练配方；内部量=免费可验证标签的思想可迁移到任何"模型报告自身计算"的场景（安全审计、路由透明化、校准）。

## 7. 读前须知
- 前置：[[20-Algorithms/混合专家（MoE）]]（路由是什么）、[[40-Concepts/softmax函数]]（token 熵与 logit lens 都在 logits 上做文章）、SFT/on-policy 基本分野。
- 原文：https://arxiv.org/pdf/2610.17495v1（28 页 22 图，正文含完整训练与评测细节，本卡为摘要级——精读时补 §公式与三维评测操作化定义）
