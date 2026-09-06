---
type: paper
title: Mastering Diverse Domains through World Models
aliases: [DreamerV3]
year: 2023
authors: [Danijar Hafner, Jurgis Pasukonis, Jimmy Ba, Timothy Lillicrap]
venue: arXiv 2023 / Nature 2025
arxiv: "2301.04104"
line: 世界模型与JEPA
matrix_coords: [奖励驱动(RL内部模型), 潜在状态, 游戏控制(RL)]
tags: [paper]
---

# DreamerV3（一套超参通吃 150+ 域的通用世界模型 RL）

## 1. 一句话贡献

第一个**不调超参**就横跨 150+ 任务（Atari/Crafter/DMC/Crafter/Minecraft）的世界模型 RL 算法，并在 Minecraft 里**无人类数据**采到钻石——"通用 RL 算法"的里程碑与模型基路线规模化可行性的证明。

## 2. 核心贡献

- **跨域稳定性三件套**：①**symlog 编码**——奖励/价值的幅度横跨数量级（-3000 到 20000），回归目标先压进对称对数域；②**离散分类隐状态**（承 V2）：32 维×32 类查表式分布，直通梯度；③**训练稳定化细节包**——KL 平衡（先验/后验各学一半）、free bits（KL 下限免学）、百分位回报归一化（不裁剪也不爆炸）；
- **规模定律证据**：模型从 4M 到 200M 参数单调变强——世界模型也吃规模红利（与 LLM 时代精神对齐）；
- **Minecraft 钻石**：长程稀疏奖励任务，靠"逐技能好奇心奖励"（diamond 前置每步都给小奖励）+世界模型想象训练打通——首个无人类数据完成此成就的算法；
- **"一个算法"哲学**：此前每个域一套超参是惯例；V3 的贡献一半是"证明免调参是可能的"。

## 3. 方法概要

1. RSSM 骨架（分类 $z$，symlog 化的连续量预测）；训练目标=重建+奖励+继续信号+KL（free bits 保护）；
2. 想象 actor-critic（承 DreamerV2）：actor 最大化归一化 $\lambda$-return，critic 快慢两套 target 稳自举；$\gamma$ 与 $\lambda$ 按 continuing/termination 自动切换；
3. 探索增强：逐技能好奇心（对"新技能解锁"发内在奖励，Minecraft 专用）；
4. 全部域一套超参——论文附录表 9 那张"唯一超参表"是本文的图腾。

## 4. 核心公式

$$\mathrm{symlog}(x)=\mathrm{sign}(x)\cdot\log(1+\lvert x\rvert)\qquad\text{（预测头的输出域压缩：大数不吞小数）}$$

**直觉解释**：symlog 把"横跨四个数量级的回归目标"压成"有界但保序"——8000 与 8001 的差异在原域被 8000 与 80 的差异淹没，在对数域里各自可分辨；训练在压缩域算，推理再 symexp 还原。这套"幅度免疫"与分类隐状态、KL 平衡合起来，就是"为什么这套世界模型哪里都能跑"的工程答案。

- 需要的前置：[[30-Formulas/RSSM转移模型]]、[[Dream to Control- Learning Behaviors by Latent Imagination（Dreamer）|Dreamer]]、[[40-Concepts/重参数化]]

## 5. 与前作/矩阵关系

- ← DreamerV1（想象训练）/V2（分类隐状态）——V3=稳定性收口；
- ↔ 对照 [[Mastering Atari, Go, Chess and Shogi by Planning with a Learned Model（MuZero）|MuZero]]（ Atari 100k 榜上的对手是 EfficientZero 系）；对照 [[10-Papers/09-世界模型与JEPA/Diffusion for World Modeling- Visual Details Matter in Atari（DIAMOND）|DIAMOND]]（latent 压缩 vs 像素保真的正面冲突——DIAMOND 正是拿"V3 系丢细节"当动机）；
- → DayDreamer（真机器人四小时学会走路）等延伸。

## 6. 影响与后续

- "通用性"从此是世界模型论文的标配主张维度；
- 训练稳定性技巧包（symlog/free bits/KL 平衡）被 latent 系新工作广泛抄用；
- 局限：仍然重建监督主导（DIAMOND 指其丢像素细节）；离散动作域之外的超参豁免并非全验证。

## 7. 读前须知

- **必前置**：[[Dream to Control- Learning Behaviors by Latent Imagination（Dreamer）|Dreamer]]（V3 全部继承其骨架）、[[30-Formulas/RSSM转移模型]]、[[20-Algorithms/世界模型]]；
- **易混点**：①symlog 是**输出域变换**不是归一化层；②free bits 是"KL 至少学这么多、少了不罚"的下限，防表示坍缩；③Minecraft 成就依赖好奇心奖励设计——不是纯通用性的证据，读结论时分清；
- **读法建议**：图 1（一图流架构）→ 表 1（150 域汇总）→ 附录 C（稳定化技巧逐条）；正文 Minecraft 节可当故事读。

> 数学根基：[[30-Formulas/RSSM转移模型]] · [[30-Formulas/ELBO目标]] · [[40-Concepts/KL散度]]
