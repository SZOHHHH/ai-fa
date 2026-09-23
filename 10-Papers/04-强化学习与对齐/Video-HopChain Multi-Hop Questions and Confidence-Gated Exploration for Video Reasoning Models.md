---
type: paper
title: "Video-HopChain: Multi-Hop Questions and Confidence-Gated Exploration for Video Reasoning Models"
aliases: [Video-HopChain, CGE]
year: 2026
authors: [Trung Nguyen Quang, Yuhao Dong, Shuo Sun, et al.]
venue: arXiv 2026
arxiv: "2609.25773v1"
pdf: 已下载（PDF/）
line: 强化学习与对齐
matrix_coords: [RLVR数据合成(多跳可验证), GRPO修复(零方差组), 视频推理]
tags: [paper]
---

# Video-HopChain

## 1. 一句话贡献

把图像域 HopChain 的多跳数据合成搬进视频并顺手修了 GRPO 的一个老毛病：构造 22,550 道"3-6 个 yes/no 链式跳、答案=各跳按答案选中的整数之和"的视频多跳题（精确匹配即 RLVR 可验证奖励），并提出置信门控探索 CGE——前 4 条 rollout 全对/全错的零方差组，后 4 条屏蔽推理段内最自信 token 采样以制造组内方差；八基准均值 55.4→57.9（数据）→59.3（+CGE）。

## 2. 核心贡献

- **可验证多跳视频题设计**：每跳两个整数（yes 取一/no 取另一，重采样至答案组合唯一），最终答案是纯加法——难度来自视频（跨 3 分钟以上镜头的证据链）而非算术；70% 概率 selector 链（前跳答案决定后跳问哪个时刻）强制按序推理，30% flat 可乱序
- **全自动生成管线**：镜头分割→每镜头 caption（MiniMax-M3，caption 是视频唯一记录）→LLM 出题+判题+难度过滤→渲染数据集；每视频至多 2 题
- **CGE（Confidence-Gated Exploration）**：GRPO 的学习信号来自组内奖励方差，全对/全错组优势坍缩零梯度；CGE 不加采样预算——同 8 条 rollout，前 4 条正常采，若全对/全错，后 4 条在推理段内做 top-token 屏蔽（置信 >0.95 的 token 掐掉重归一化），屏蔽位不计损失、8 条全进优势
- **有效性**：数据阶段八基准全升；CGE 再 +1.4 均值；数据/检查点/生成与训练代码全开源

## 3. 方法概要

1. 数据：≥3 分钟源视频→PySceneDetect 切镜头→逐镜头 caption→按固定概率抽跳数/跳型（order/spatial/action/attribute 四类）与链型（flat/selector）→Qwen3.8-27B 两候选出题+判题→难度过滤（被训模型 6/8 对的丢、全错的也处理）→22,550 题
2. 第一阶段：Qwen3-VL-8B 在标准视频数据上 GRPO
3. 第二阶段：Video-HopChain 上继续 GRPO（奖励=和的精确匹配）
4. CGE 修零方差组：前 4 条定组命运，全对/全错→后 4 条屏蔽采样制造对照
5. 评测：八个视频理解/推理基准

## 4. 核心公式

可验证多跳奖励：

`$R = \mathbb{1}\left[\textstyle\sum_{k=1}^{n} b_k(y_k) = y^{\star}\right],\quad b_k(\text{yes}) = a_k,\ b_k(\text{no}) = \bar a_k,\quad \text{组合唯一性：不同答案向量必不同和}$`

**直觉**：和是一个"答案指纹"——任何一跳答错，选中的整数集合就变，和几乎必错（组合唯一性保证）。于是精确匹配这一个比特就验证了整条证据链，不需要过程标注。

置信门控屏蔽采样：

`$p'_t(a) = \frac{p_t(a)\,\mathbb{1}[a \ne a^{\star}_t]}{1 - p_t(a^{\star}_t)}\quad \text{当} \max_a p_t(a) > \tau = 0.95;\quad \text{屏蔽位从损失剔除，8 条全进优势}$`

**直觉**：模型"最自信的下一步"往往就是它错误模式的惯性轨道——掐掉这一步强迫它走自己很少采的路，等于在同题组内注入受控扰动。屏蔽位不计损失=干预本身不算梯度（不让模型学"故意不走最自信 token"），全组进优势=扰动带来的对照免费变成学习信号。

## 5. 与前作/矩阵关系

- 谱系锚：[[20-Algorithms/GRPO与RLVR]]（RLVR 数据合成+GRPO 训练）· [[30-Formulas/GRPO目标]]（CGE 修的正是其组内方差依赖）
- ↔ [[GRPO is Secretly a Process Reward Model（GRPO-PRM）]]：一族"GRPO 信号结构分析/修复"工作——PRM 视角看信号来源，CGE 看信号消失（优势坍缩）的补救
- 数据合成思想：HopChain（图像版前身，本文引入视频）+ [[40-Concepts/思维链（CoT）]]（多跳链式推理暴露跨步复合误差）
- 线锚：[[40-Concepts/视觉语言模型（VLM）]] · [[40-Concepts/马尔可夫决策过程]]（生成视为 token-MDP）

## 6. 影响后续

- "答案=可验证指纹"的出题术（整数选择+求和+组合唯一）是 RLVR 数据合成的可复制模板，视频/多模态皆可搬
- CGE 证明零方差组可以零额外算力救回——与"丢弃补采"（费 rollout）和"优势重塑"（改估计）两条旧路线并列的第三条路：改组内采样过程本身
- 长视频证据链 benchmark（1,000 held-out）补了视频推理评测的空白格

## 7. 读前须知

[[30-Formulas/GRPO目标]]（组相对优势与方差依赖——理解"零方差组"为何零梯度的前提）· [[40-Concepts/思维链（CoT）]]（多跳推理的复合误差结构）· [[40-Concepts/视觉语言模型（VLM）]] · RLVR（可验证奖励强化学习：奖励必须可自动判定，本文的求和指纹是其在多跳场景的实现）。
