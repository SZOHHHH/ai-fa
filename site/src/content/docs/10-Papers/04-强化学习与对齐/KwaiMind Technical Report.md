---
type: paper
title: "KwaiMind Technical Report"
aliases: [KwaiMind]
year: 2026
authors: [Junlong Wu, Zijun Li, Yuting Hu, et al.]
venue: arXiv 2026
arxiv: "2609.26375v1"
pdf: 已下载（PDF/——处理段补档：31.8MB、EOF=1）
line: 强化学习与对齐
matrix_coords: [偏好对齐(DPO+在线RL), 扩散策略(MMDiT编辑), on-policy蒸馏合并]
tags: [paper]
---

# KwaiMind

## 1. 一句话贡献

快手电商图像编辑系统技术报告：MMDiT 底座上走"持续预训练→SFT→混合离线/在线偏好优化→前向扩散过程上的在线 RL→on-policy 蒸馏合并"全链，配五 agent 闭环数据引擎（约 180 万高质量编辑对）与 CTR/文字渲染/商品一致性三个专用奖励——开源编辑器中综合最强（ImgEdit/GEdit/REDEdit 双语/Ecom-Bench 视觉质量），在线 A/B 按预测 CTR 选主图带来真实 CTR +2.44%。

## 2. 核心贡献

- **agent 数据引擎**：Data/Filter/Generation/Caption/Coordinator 五 agent 状态机闭环——Filter 用自我迭代的模拟人类 VLM 评估器做前后双滤、Generation 按诊断报告修复与补缺、Caption 三级分层指令+差异掩码引导+LLM 反向审计、Coordinator 管样本生命周期与预算；产出领域浓缩、质量可控的 1.8M 编辑对
- **分阶段对齐管线**：720p 以上子集+指令增强做持续预训练（高分辨率编辑能力）→任务均衡 SFT（115K 通用+119.9K 电商对）→DPO（混合离线/在线）→**前向扩散过程上的在线 RL**：通用编辑由视觉-语言 judge 驱动，电商三性质由专用奖励模型驱动（CTR 模型管商业吸引力、粗到细奖励管视觉文字渲染、一致性奖励管商品与模特身份保持）
- **on-policy 蒸馏合并**：每个目标单独训最有效但互相干涉——先得一组专门策略，再蒸馏合并为单一编辑器（继承全部能力、免跨任务干涉）
- **Ecom-Bench**：11 个电商编辑任务、行为锚定的分任务维度选取+几何平均协议（单点致命缺陷拖垮总分）、外加学习型 CTR 分

## 3. 方法概要

1. 数据引擎产出（源-目标-指令）三元组与评估集
2. MMDiT（Qwen-Image 架构系）持续预训练+SFT
3. 偏好优化：DPO 混合离线/在线数据
4. 在线 RL：奖励=VL judge（通用）+三个专用模型（电商），作用在前向扩散过程上
5. 专门策略经 on-policy 蒸馏合并成单模型
6. 评测：四个通用编辑基准+Ecom-Bench（含 Ecom-CTR 排名）；离线 CTR 引导优化把"生成图预测 CTR 超原图"的比例 12.16%→37.41%；在线 A/B 验证 +2.44% 真实 CTR

## 4. 核心公式

多目标奖励与合并（概念式，报告为系统管线而非单一闭式目标）：

`$$r(x) = r_{\text{judge}}(x) + \lambda_1 r_{\text{CTR}}(x) + \lambda_2 r_{\text{text}}(x) + \lambda_3 r_{\text{id}}(x);\quad \text{各目标单训专门策略 } p_k^{\star} \to \text{on-policy 蒸馏合并入单模型 } p_\theta$$`

**直觉**：商业落地里"好图"是多个互相拉扯的量（好看/字对/货真/点击），一个策略同时优化全部会互相干涉——先分而治之（每个奖励养一个专家），再在专家的在线样本上把学生拉向"该任务下像对应专家"（蒸馏保分布、不保单点）。这与多任务学习的梯度手术是同一问题的两种解法。

## 5. 与前作/矩阵关系

- 对齐谱系：[DPO系（离线偏好优化）](/ai-fa/explore/20-Algorithms/DPO系（离线偏好优化）) · [DPO损失](/ai-fa/explore/30-Formulas/DPO损失)（其混合离线/在线 DPO 阶段）· [RLHF](/ai-fa/explore/20-Algorithms/RLHF) · [RLHF目标](/ai-fa/explore/30-Formulas/RLHF目标)（奖励驱动的在线 RL 阶段，作用对象换成前向扩散过程）
- 蒸馏谱系：[知识蒸馏](/ai-fa/explore/40-Concepts/知识蒸馏) + [CausalOPD- First-Wrong-Step Supervision for Distilling Causal Chain Reasoning](/ai-fa/explore/10-Papers/04-强化学习与对齐/CausalOPD- First-Wrong-Step Supervision for Distilling Causal Chain Reasoning（CausalOPD）)（on-policy 蒸馏一族：在学生自己的分布上向教师/专家学习）——本文把"on-policy 蒸馏"用作**策略合并器**而非压缩器，是少见用法
- 底座：[潜在扩散模型（LDM）](/ai-fa/explore/20-Algorithms/潜在扩散模型（LDM）) / [扩散模型](/ai-fa/explore/20-Algorithms/扩散模型)（MMDiT 双流注意力骨干）· [视觉语言模型（VLM）](/ai-fa/explore/40-Concepts/视觉语言模型（VLM）)（judge 与数据引擎的执行件）
- 线锚：04-强化学习与对齐（rl-alignment 轮换哨兵命中）

## 6. 影响后续

- "专用策略+on-policy 蒸馏合并"给多目标生成式系统的部署提供了免干涉整合的工程模板
- 商业指标（CTR）作为可学习奖励进 RLHF 管线、并用在线 A/B 做最终裁决——"离线奖励→在线业务指标"的两级验证链条值得垂类系统效仿
- 五 agent 数据引擎把数据生产本身做成可审计状态机，是数据 scaling 的系统化样本

## 7. 读前须知

[DPO损失](/ai-fa/explore/30-Formulas/DPO损失)（偏好优化阶段的语言）· [知识蒸馏](/ai-fa/explore/40-Concepts/知识蒸馏)（软目标与在线分布）· [扩散模型](/ai-fa/explore/20-Algorithms/扩散模型)（前向过程上做 RL 意味着把去噪轨迹当策略轨迹）· [视觉语言模型（VLM）](/ai-fa/explore/40-Concepts/视觉语言模型（VLM）)（judge 评估器的偏差与自我迭代风险——报告用人工兜底关键检查点）。
