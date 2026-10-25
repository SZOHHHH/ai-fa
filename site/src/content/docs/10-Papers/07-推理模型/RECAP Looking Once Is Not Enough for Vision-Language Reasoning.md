---
type: paper
title: "RECAP: Looking Once Is Not Enough for Vision-Language Reasoning"
aliases: []
year: 2026
authors: [Zhaolu, Kang]
venue: 待核（占位层，来自 arXiv 2026-10-22）
arxiv: "2610.30834v1"
pdf: https://arxiv.org/pdf/2610.30834v1
line: 推理模型
matrix_coords: 待评
tags: [paper, 占位层]
layer: 占位
---
# RECAP: Looking Once Is Not Enough for Vision-Language Reasoning

> **占位层卡**（daily 自动采集 2026-10-25 建卡，元数据出自 arXiv API=已核实）。本链 Claude 处理段将自动精读升级：七节补全+中文速览+挂全链。
> 摘要（原文）：Long chain-of-thought reasoning improves vision-language models (VLMs), but it also exposes a temporal grounding failure: as generation unfolds, models may drift from image evidence while reinforcement learning still provides only a final-answer reward. We study this gap through visual revisit, a temporally localized reactivation of image evidence during reasoning. Across three VLM backbones, revisit peaks are predictive of correctness and causally linked to performance: masking them degrades accuracy more than masking non-peaks, while injecting revisit-like peaks into failed rollouts partiall

## 1. 一句话贡献
定义并解剖 **visual revisit**（长 CoT 中图像证据的时间局域再激活）：三个 VLM 底座上 revisit 峰值预测答案正确性且因果相关（遮峰掉分>遮非峰、向失败 rollout 注入类峰可部分救回正确答案；排除注意力强度/不确定性/logit margin/隐状态范数等替代表现）；提出 GRPO 兼容训练法 **RECAP**（revisit 条件化优势估计+动态折扣+门控价值预测）把视觉接地传回推理——HallusionBench +6.1~+6.5 且不伤纯文本推理。

## 2. 核心贡献
- （待精读）

## 3. 方法概要
1. 测量：定位长 CoT 中图像 token 注意力的再激活峰（时间局域信号，跨三底座）；
2. 因果验证：遮峰 vs 遮非峰对照 + 失败 rollout 注入类 revisit 峰——因果链成立且不被原始注意力强度等混淆量解释；
3. RECAP 三组件：revisit 条件化优势估计（视觉重要步拿更大信用）+动态折扣（沿 revisit 时序传最终奖励）+门控价值预测——零额外奖励/rollout/推理时改动，GRPO 即插即用；
4. 验证：Qwen2.5-VL-7B/InternVL3-8B/LLaVA-OV-7B 一致超 GRPO/VPPO，附 LoRA 大模型、中文零样本、视觉扰动与人工评估。

## 4. 核心公式
（待精读）

## 5. 与前作/矩阵关系
- 线锚：[视觉语言模型（VLM）](/ai-fa/explore/40-Concepts/视觉语言模型（VLM）) · [GRPO目标](/ai-fa/explore/30-Formulas/GRPO目标)（训练底座）· [思维链（CoT）](/ai-fa/explore/40-Concepts/思维链（CoT）)（长 CoT 证据接地）
- ≡ 同族（证据接地家族三分工）：[CausalCoT](/ai-fa/explore/10-Papers/07-推理模型/Causal Chain of Thought Mitigating Attention Leakage via Context Isolation)（架构侧修复注意力泄漏）· [VLA 反事实审计](/ai-fa/explore/10-Papers/07-推理模型/Measuring the Reasoning-Action Coupling in Driving Vision-Language-Action Models through Counterfact)（测量侧）——本卡=训练信号侧修复

## 6. 影响后续
（待精读）

## 7. 读前须知
（待精读）原文：https://arxiv.org/pdf/2610.30834v1；在线全文（新论文）：https://arxiv.org/html/2610.30834v1
