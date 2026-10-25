---
type: paper
title: "MOER: Mix-Policy Optimization under Expert Prefix Guidance with Selective Rollback"
aliases: []
year: 2026
authors: [Xuyang, Zhong]
venue: 待核（占位层，来自 arXiv 2026-10-22）
arxiv: "2610.30873v1"
pdf: https://arxiv.org/pdf/2610.30873v1
line: 推理模型
matrix_coords: 待评
tags: [paper, 占位层]
layer: 占位
---
# MOER: Mix-Policy Optimization under Expert Prefix Guidance with Selective Rollback

> **占位层卡**（daily 自动采集 2026-10-25 建卡，元数据出自 arXiv API=已核实）。本链 Claude 处理段将自动精读升级：七节补全+中文速览+挂全链。
> 摘要（原文）：Mix-policy optimization incorporates off-policy expert data into the reinforcement learning (RL) loop to transcend the capability boundary of on-policy RL. However, existing methods either provide static full-trace guidance that suppresses self-exploration, or adopt expert prefix guidance without correctness guarantees, leading to suboptimal performance or even training collapse. In this paper, we propose MOER, a mix-policy optimization framework that harmonizes expert guidance with self-exploration. MOER injects a decaying expert chain-of-thought prefix into the prompt and lets the model comp

## 1. 一句话贡献
提出 mix-policy RL 调和框架 MOER：向 prompt 注入**长度衰减的专家 CoT 前缀**让模型续写剩余推理（退火促自探索），失败续写由**选择性回滚**替换回完整专家轨迹、保证每条 off-policy 轨迹正确；on-policy token 走 GRPO、专家前缀+续写 token 走信赖域 SFT 的混合目标稳住训练——数学与通用推理平均分超全部基础/mix-policy 基线，跨任务/规模/底座一致泛化。

## 2. 核心贡献
- （待精读）

## 3. 方法概要
1. 专家前缀引导：注入衰减长度的专家 CoT 前缀、模型补全余下推理——介于"全轨迹静态引导压制探索"与"无正确性保证的前缀引导"之间；
2. 选择性回滚：续写失败（答案错）→ 回滚为原完整专家轨迹——进 batch 的每条 off-policy 轨迹都正确性有保证；
3. 混合目标：on-policy token 用 GRPO 损失，专家前缀与续写 token 同时用信赖域 SFT 损失——mix-policy 训练显著更稳；
4. 退火：前缀长度渐进减到零，自探索占比上升。

## 4. 核心公式
（待精读）

## 5. 与前作/矩阵关系
- 线锚：[GRPO目标](/ai-fa/explore/30-Formulas/GRPO目标)（on-policy 臂）· [on-policy与off-policy](/ai-fa/explore/40-Concepts/on-policy与off-policy)（mix-policy 的本体问题）· [思维链（CoT）](/ai-fa/explore/40-Concepts/思维链（CoT）)（专家 CoT 前缀=引导载体）
- ≡ 同族：[CausalCoT](/ai-fa/explore/10-Papers/07-推理模型/Causal Chain of Thought Mitigating Attention Leakage via Context Isolation)（概念邻居：MOER 依赖专家 CoT 正确——若专家轨迹被注意力泄漏污染则前缀引导失效，隔离求值可作前缀质检）

## 6. 影响后续
（待精读）

## 7. 读前须知
（待精读）原文：https://arxiv.org/pdf/2610.30873v1；在线全文（新论文）：https://arxiv.org/html/2610.30873v1
