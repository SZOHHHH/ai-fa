---
type: paper
title: Distilling the Knowledge in a Neural Network
aliases: [KD, Hinton蒸馏]
year: 2015
authors: [Geoffrey Hinton, Oriol Vinyals, Jeff Dean]
venue: NeurIPS Workshop 2014 / arXiv 2015
arxiv: "1503.02531"
line: 后处理与压缩
matrix_coords: [知识(行为), 蒸馏, 训练后]
tags: [paper]
---

# 蒸馏（Hinton KD：暗知识的发现）

## 1. 一句话贡献

用**高温软标签**把大模型（或集成）的"暗知识"蒸进小模型——教师输出不只说答案是哪个，还说"错项之间谁更像谁"；这一视角让"知识转移"有了可优化的目标，成为一切蒸馏方法（含扩散蒸馏、策略蒸馏、LLM 蒸馏）的总纲。

## 2. 核心贡献

- **软标签+温度 τ**：学生匹配教师在温度 τ 下的完整分布（KL），而非只学硬答案——温度把"几乎为零的负类概率"放大到可读（teacher 给"猫 0.9/狗 0.09/车 0.001"，τ 升高后狗/车的相对差异浮出）；
- **"dark knowledge"命名**：负类的相对概率携带教师学到的类间相似性结构——硬标签里没有、软标签里有；
- **两种任务证明**：①多教师集成→单模型（MNIST 集成知识打包）；②专项模型→通用模型（混入通用数据的"专属数据集"训练）；
- 与硬目标的混合配方：$\mathcal{L}=\alpha\,T^2\,\mathrm{KL}(soft_T\Vert soft_S)+(1-\alpha)\,\mathrm{CE}(y, s)$——软硬兼施。

## 3. 方法概要

1. 教师与学生**同一温度 τ**（常取 3-20）下各出 softmax 分布；
2. 学生损失 = 软 KL（乘 $T^2$ 补偿梯度尺度——高温把 logits 差异压平方倍）+ 硬交叉熵；
3. 训练完学生用 τ=1 正常推理；
4. 集成场景：多个教师的软分布平均成单一目标。

## 4. 核心公式

$$\mathcal{L}_{distill}\;=\;\tau^2\,\mathrm{KL}\Big(\mathrm{softmax}\big(z_T/\tau\big)\,\Big\Vert\,\mathrm{softmax}\big(z_S/\tau\big)\Big)\qquad(\text{温度升高}=\text{分布变软}=\text{暗知识可见})$$

**直觉解释**：教师的高温输出像**批改过的考卷不只给对错、还标了"这题你错得离谱/只差一点"**——学生从相对分数里学到类间结构。数学身份（后续所有工作的地基）：**交叉熵=KL+熵**，目标分布固定时最小化交叉熵 ⇔ 最小化 KL——所以"软标签训练"严格等价于"在教师分布上的分布匹配"。这个三行恒等式后来在扩散蒸馏（soft-DSM）、奖励读出对齐、逆动力学后验匹配里反复出场——**KD 的公式骨架是"用分布当目标"的一切方法的祖先**。

- 需要的前置：[[40-Concepts/知识蒸馏]]、[[40-Concepts/KL散度]]、[[40-Concepts/温度参数]]、[[30-Formulas/交叉熵]]、[[30-Formulas/蒸馏损失]]

## 5. 与前作/矩阵关系

- ← Caruana 2006（模型压缩：学生回归教师 logits）——KD 引入温度/概率视角并命名；
- ↔ 与集成学习血缘：集成=多教师，蒸馏=把"投票知识"打包进单模型；
- → 压缩线（DistilBERT/TinyBERT）；→ **扩散少步化全家**：[[10-Papers/02-生成建模与扩散/Progressive Distillation for Fast Sampling of Diffusion Models（渐进蒸馏）|渐进蒸馏]]（轨迹蒸馏）、[[10-Papers/02-生成建模与扩散/Consistency Models（一致性模型）|一致性模型]]（自洽蒸馏）、[[10-Papers/02-生成建模与扩散/One-step Diffusion with Distribution Matching Distillation（DMD）|DMD]]（分布蒸馏）——蒸馏目标从"分布"演化到"轨迹/分布/分数"，但"软目标"哲学一脉；→ LLM 时代 on-policy 蒸馏（GKD 系）。

## 6. 影响与后续

- "教师-学生"范式溢出：自蒸馏、在线蒸馏、数据集蒸馏、策略蒸馏（RL 行为克隆进小策略）；
- 温度成为通用旋钮（对比学习/RLHF/测试时缩放都在用）；
- 局限：软标签的信息量受教师质量封顶（教师错得自信→学生学错得深）；容量差距过大时蒸馏失效（容量鸿沟问题）。

## 7. 读前须知

- **必前置**：[[40-Concepts/KL散度]]、[[40-Concepts/温度参数]]、[[30-Formulas/交叉熵]]、[[40-Concepts/知识蒸馏]]；
- **易混点**：①训练时 τ>1、推理时 τ=1——温度只在训练侧；②$T^2$ 系数是数学补偿不是超参美学（高温 softmax 的梯度缩小 $1/T^2$）；③"暗知识"在硬标签视角下不可见，但**它不是新增信息**——它一直在 logits 里，只是被 softmax 压没了；
- **读法建议**：正文仅 9 页；§2（暗知识直觉）+ §2.1（公式）精读，实验快速过；配套 [[30-Formulas/蒸馏损失]] 公式卡一起看。

> 核心公式：[[30-Formulas/蒸馏损失]] · [[30-Formulas/归一化温度与蒸馏]]
