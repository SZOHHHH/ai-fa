---
type: paper
title: "Hunyuan-A13B Technical Report"
aliases: [Hunyuan-A13B, 混元A13B]
year: 2026
authors: [Tencent Hunyuan Team]
venue: arXiv 2026（腾讯）
arxiv: "2609.27284v1"
pdf: 已下载（PDF/）
line: MoE
matrix_coords: [开源MoE大模型, 80B总参/13B激活, 双模思维链, 20T token预训练]
tags: [paper]
---

# Hunyuan-A13B（腾讯混元 80B/13B 激活 MoE）

## 1. 一句话贡献

开源 MoE 大模型技术报告：总参 80B、推理只激活 13B，20T 严格过滤 token（强化 STEM 数据策展）预训练+高质量 SFT+大规模 RL；**双模思维链框架**按任务复杂度自适应推理深度（常规问题快思考、复杂多步问题慢思考）——数学/科学/编程/通用理解/agent 任务上逼近大得多的模型，高推理吞吐适合延迟敏感部署。

## 2. 核心贡献

- 规格定位：80B 总参/13B 激活的稀疏 MoE，能力-算力-部署成本三角平衡的开放权重落点
- 数据策展：20T token 严格过滤+STEM 强化——事实可靠性与推理能力的数据侧抓手
- 双模 CoT（fast/slow thinking）：推理深度适应任务复杂度，避免"什么都慢慢想"的延迟浪费与"什么都快答"的质量损失
- 后训练：高质量 SFT+大规模 RL 两段式；评测覆盖数学/科学/编程/语言理解/agent，多项接近更大模型

## 3. 方法概要

1. 预训练：过滤后 20T token 语料（STEM 占比强化）+MoE 稀疏路由（80B 容量、13B 激活）
2. 后训练：监督微调（指令/推理轨迹）→ 大规模强化学习（数学/代码等可验证奖励域为主力）
3. 双模 CoT：同一模型按输入复杂度路由到快思考（直接答）或慢思考（多步思维链）模式

## 4. 核心公式

MoE 稀疏路由（本模型的能力-成本骨架，家族记号见 [[30-Formulas/MoE门控公式]]）：

`$y=\sum_{e\in \mathrm{TopK}(g(x))} g(x)_e\cdot E_e(x),\qquad \frac{\sum_e\lVert E_e\rVert_{\text{param}}}{\text{激活}}=\frac{80\mathrm{B}}{13\mathrm{B}}$`

**直觉**：每个 token 只唤醒 TopK 个专家、按门控分数加权融合——容量装进 80B 参数里，每个 token 只付 13B 的计算账；"激活率"就是 MoE 把容量与算力解耦的杠杆，双模 CoT 则在时间轴上做同一件事（推理深度按需分配）。

## 5. 与前作/矩阵关系

- ≡同族开放 MoE 技术报告 [[DeepSeek-V3 Technical Report（DeepSeek-V3）]]（数据策展+SFT+RL 全栈叙事同构，本卡是腾讯侧对应物）
- ←细粒度专家设计承 [[DeepSeekMoE- Towards Ultimate Expert Specialization in Mixture-of-Experts Language Model（DeepSeekMoE）]]（更多更小专家+共享专家的谱系）
- ↔[[Mixtral of Experts（Mixtral）]]/[[Switch Transformers- Scaling to Trillion Parameter Models with Simple and Efficient Spars（Switch）]]：开放 MoE 规模化路线的里程碑序列
- 实体锚 [[20-Algorithms/混合专家（MoE）]] · 公式锚 [[30-Formulas/MoE门控公式]]

## 6. 影响后续

13B 激活档位的开源新基准：agent 任务+延迟敏感部署的实用落点；双模 CoT（快慢思考统一）大概率被后续开放模型跟进为标配叙事。

## 7. 读前须知

- MoE 路由基础：[[30-Formulas/MoE门控公式]]、[[20-Algorithms/混合专家（MoE）]]
- SFT+RL 后训练流水线概念级了解即可；技术报告型论文无需数学前置
