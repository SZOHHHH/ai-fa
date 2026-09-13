---
type: paper
title: "A*-Thought-V2: Efficient Latent Reasoning via Geometric Dynamics of LLM"
aliases: [A*-Thought-V2]
year: 2026
authors: [Xiaoang Xu, Siyuan Liu, Shuo Wang, et al.]
venue: arXiv 2609.07821（2026-09-07，北邮 + OpenBMB 等）
arxiv: "2609.07821v1"
pdf: 10-Papers/PDF/Astar-Thought-V2 - Efficient Latent Reasoning via Geometric Dynamics of LLM（Astar-Thought-V2）.pdf
line: 推理模型
matrix_coords: 待评（轮换线）
tags: [paper]
---
# A*-Thought-V2 - Efficient Latent Reasoning via Geometric Dynamics of LLM（Astar-Thought-V2）

## 1. 一句话贡献
把 CoT 建模为隐状态空间的轨迹，投影到 3D PCA 后用"局部转移 vs 问题→解全局方向"的夹角决定每步去留：小角度步保留显式文本、大角度步压成潜 token，显隐交替序列配软标签监督——替代 A*-Thought 的硬剪枝，AIME 上长度减半、ACU 提至 2.29×。

## 2. 核心贡献
- **几何动力学分析**：六个 30° 夹角区间各有语义倾向（0-30° 直接化简/收答案 → 150-180° 重释/分支回 reconsider），角度随步数的变化揭示探索→收敛→精化三阶段
- **显隐交替潜架构**：embedding forcing（冗余步内 token 嵌入分段均值池化为一个潜向量）+ label forcing（潜位用步内 one-hot 平均的多峰软词表分布监督，而非硬标签）
- **工程效率**：压缩预处理时间较 A*-Thought 降 94.6%（无需树搜索）；Qwen3.6-27B 六基准平均 93.9%、token 从 14k 降至 11.8k；阈值 $\tau$=60°/90° 可控压缩率

## 3. 方法概要
1. 对每步推理取隐状态，PCA 投影到 3D：问题 $h_q$、第 n 步 $h_{t(n)}$、解 $h_s$
2. 全局方向 $z_0 = h_s - h_q$，局部转移 $z_n = h_{t(n)} - h_{t(n-1)}$，夹角 $\theta_n$ 决定 flag：$\theta_n < \tau$ 的步保留文本，$\ge \tau$ 的步进压缩
3. **Embedding forcing**：被压步的 $l$ 个 token 嵌入均值池化为单个潜 token $c$，替换原位置，形成文本/潜交替序列
4. **Label forcing**：该潜位的目标 = 步内所有 token 的 one-hot 平均（多峰分布），逼一个潜 token 同时编码整步宏语义
5. 损失 = 文本位标准 CE + λ·潜位软标签 CE
6. 推理：潜位由前一步末层隐状态自回归喂入（训练时用池化嵌入，边界 tag 序列化模式控制）

## 4. 核心公式
- 方向夹角判据：$\theta_n = \arccos\big(\frac{z_n^\top z_0}{\lVert z_n\rVert\,\lVert z_0\rVert}\big)$
**直觉**：一步推理若顺着"从问题指向解"的大方向走，它大概率是可预测的常规推导（压掉不心疼）；若大角度拐弯，往往在检查/纠错/换思路——这类信息密度高，保留显式。
- 软标签构造：$y_{soft}^{(n)} = \frac{1}{l^{(n)}}\sum_{j=1}^{l^{(n)}} y_j^{(n)}$
**直觉**：一个潜 token 要"一句话说清整步"，目标就不该是某个具体 token，而是这步所有 token 的语义混合分布——与蒸馏里的软目标同理（[[30-Formulas/归一化温度与蒸馏]]）。

## 5. 与前作/矩阵关系
- 线锚：[[40-Concepts/思维链（CoT）]] · [[30-Formulas/归一化温度与蒸馏]]（软标签监督）· [[40-Concepts/独热编码（One-Hot）]]（软硬标签之辨）
- ← 前身：A*-Thought（二维树搜索硬剪枝——丢信息；V2 改为压入潜空间保信息）
- 同日同题：[[Structural Process Supervision for Latent Chain-of-Thought Reasoning（PMPS）]] · [[Think Wider - Mitigating Latent Rank Collapse in Implicit Chain-of-Thought Reasoning（WIDER）]]（三篇构成 9 月上旬 latent CoT 压缩小高潮）
- 同族：[[10-Papers/07-推理模型/CoT-Valve- Length-Compressible Chain-of-Thought Tuning（CoT-Valve）]]

## 6. 影响后续
"角度=语义"的几何读法给 CoT 压缩提供了可解释的选步准则（对比学习式启发式）；显隐交替架构是 Coconut（全潜）与纯文本之间的可调中间态。

## 7. 读前须知
PCA 降到 3D 是大胆简化——需要接受"前 3 主成分够分辨推理动态"这一经验假设；其余只需 [[40-Concepts/思维链（CoT）]] 与均值池化常识。
