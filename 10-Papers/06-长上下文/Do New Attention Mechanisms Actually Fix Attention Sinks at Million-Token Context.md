---
type: paper
title: "Do New Attention Mechanisms Actually Fix Attention Sinks at Million-Token Context?"
aliases: [SinkProbe]
year: 2026
authors: [Sara Rizwan, Samaanah Abdus Salam]
venue: arXiv 2609.08574（cs.CL，2026-09-08）
arxiv: "2609.08574v1"
pdf: 已下载（PDF/）
line: 长上下文
matrix_coords: 待评
tags: [paper, 每日推荐]
---

# Do New Attention Mechanisms Actually Fix Attention Sinks at Million-Token Context?

> 每日链采集（2026-09-12）+ 处理段同日精读升级（当日⑦推荐篇）。

## 1. 一句话贡献

在百万 token 窗口上用自制四指标诊断套件 **SinkProbe** 检验"门控注意力/线性混合栈是否真修好 attention sink"，结论是三连否定式发现：**sink 由训练目标而非架构产生**、门控效应在受控小模型上未复现已发表数字、sink 质量与位置偏置互相独立——"修好 sink"和"均匀读窗口"根本是两件事。

## 2. 核心贡献

- **SinkProbe 四指标套件**：sink mass（首 token 注意力质量）、massive activation（最大隐藏态激活幅值）、position-resolved recall（按位置解析的召回）、recency gap（近端召回−开头召回），统一定义+估计器+置信处理，开源可复跑
- **四架构受控阶梯**：四个 ~1M 参数模型只改 token 混合与深度混合规则（标准 softmax 栈 / 门控栈 / Kimi K3 式混合栈），宽度/深度/头数/数据/优化器/种子全部固定——机制隔离设计
- **归因证据**：只改训练目标、架构不动，几乎消除 sink——压力来自优化目标而非架构本身
- **Kimi K3 层混搭 cache 增长模型**：93 层中 69 层携带不随上下文增长的定长 cache（层比例不依赖两个未公布维度）
- **预注册协议**：测量点、样本量、数值通过阈值在跑之前固定——防事后解释

## 3. 方法概要

1. **动机——两个坏习惯**：① softmax 注意力每个头的预算总和恒为 1，没事可读时预算全砸首 token（attention sink；前人测得 15B 模型平均 46.7% 注意力在首 token，单层最高 83%）；② 事实在上下文中的位置决定模型找不找得到（lost in the middle 的 U 形曲线）。
2. **证据断档**：门控注意力论文（NeurIPS 2025 最佳论文）的机制诊断止步 128K；Kimi K3 到 1M token 但只报 benchmark 分数——最强长上下文声明的机制证据与部署长度差 8 倍，没人补上。
3. **造测量**：SinkProbe 四指标一套，把散落各文的定义收拢成可比、可跑的协议。
4. **造对照**：四个同规模模型只改混合规则（softmax 栈 / 门控栈 / 3 线性 Delta attention + 1 门控全局层 + attention residuals 的 K3 式栈），隔离"机制"这一个变量。
5. **先注册后跑**：阈值先固定，跑完对号入座。
6. **三结论**：目标产生 sink（不是架构）；门控在其规模未复现 46.7→4.8 的已发表效应；sink mass / 巨激活 / 位置偏置三者独立移动——修第一个不保证第二个。

## 4. 核心公式

- $A_i = \dfrac{\exp(z_i)}{\sum_j \exp(z_j)}$——**直觉**：softmax 归一性让每头预算恒为 1，"不读"不是一个选项；没事可读时预算必须找归宿，无语义的首 token（BOS）成为最安全的泄压阀。sink 不是 bug，是归一化约束与训练目标的合谋。
- $\text{sink mass} = \dfrac{1}{H}\sum_{h=1}^{H} A_{h,0}$——**直觉**：全部头砸在位置 0 的平均注意力质量，直接度量"预算浪费在标记符上"的程度（46.7% 即约一半读力虚耗）。
- $o_h = g(x)\cdot \mathrm{Attn}_h(x),\quad g(x)\in[0,1]$——**直觉**：门控注意力给输出装输入相关阀门，让头可以说"这次我什么都不输出"，于是不再需要 sink 吸收预算——修复思路=给预算一个"花不掉"的出口。
- $\text{recency gap} = R_{\text{近端}} - R_{\text{开头}}$——**直觉**：一个带符号数概括位置偏置的方向与强度；符号不预设（文中报了一例反向运行），防"近端一定占优"的先入为主。

## 5. 与前作/矩阵关系

- **←前身**：[[Efficient Streaming Language Models with Attention Sinks（StreamingLLM）]]——sink 的命名者，"驱逐首 token 流式模型崩溃"是 sink 结构性作用的最早证据；本文把该现象的**测量**推到 1M 窗口并完成归因
- 概念根基：[[30-Formulas/注意力核心公式]]（预算=1 的根源在归一化）· [[40-Concepts/softmax函数]] · [[40-Concepts/注意力机制]]
- 线内对话：[[40-Concepts/稀疏与线性注意力]]（K3 的 Kimi Delta Attention 即线性注意力家族，定长递归状态是消 sink 的另一条路）· [[40-Concepts/KV缓存]]（cache 增长模型：69/93 层不随上下文增长）· [[40-Concepts/位置编码]]（K3 干脆弃用位置编码）
- 同日同族：[[Fine-Tuning a KV Cache Concatenation-Aware Model or Recomputing KV Caches Why Not Both]]（EPIC 家族恰以块内 sink 位置选重算 token——sink 的工程利用面）

## 6. 影响后续

- 点名长上下文领域"benchmark 分数与机制诊断脱钩"的现状；SinkProbe 开源，可能成为长上下文评估的标配诊断件
- 给门控注意力的已发表结论划出**规模边界**（其 ~1M 参数阶梯上未复现），提醒机制声明需在部署规模复查
- 谱系定位：sink 研究"发现（StreamingLLM）→ 利用（KV 驱逐/EPIC）→ 修复（门控）→ **审计**（本文）"四阶段的审计段

## 7. 读前须知

- 前置：[[30-Formulas/注意力核心公式]] · [[40-Concepts/softmax函数]]（归一性是根源）· [[Efficient Streaming Language Models with Attention Sinks（StreamingLLM）]]（sink 命名与流式背景）
- 易混点：sink ≠ 缺陷——softmax 约束下的涌现泄压策略；"修复 sink" ≠ "均匀阅读"，二者独立（本文第三结论）
- 外推警告：~1M 参数小模型的结论不直接预测前沿规模（作者自申限制，作者机构为印度地方学院，单人小团队工作，数字需独立复现）
