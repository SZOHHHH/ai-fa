---
type: paper
title: Diffusion Forcing- Next-token Prediction Meets Full-Sequence Diffusion
aliases: [Diffusion Forcing]
year: 2024
authors: [Boyuan Chen, Diego Marti Mogino, Vincent Micheli, et al.]
venue: NeurIPS 2024
arxiv: "2407.01392"
pdf: 已下载（PDF/）
line: 世界模型与JEPA
matrix_coords: [像素重建(生成式), 显式像素, 可操作(动作条件)]
tags: [paper]
---

# Diffusion Forcing（逐帧独立噪声：自回归与全序列扩散的统一）

## 1. 一句话贡献

给序列的**每一帧独立采一个噪声水平**——训练时在"全噪声谱"上学，推理时想让哪帧清晰就解到哪级：**自回归预测（AR）与全序列扩散不再是二选一，而是同一模型的两种极端采样模式**。

## 2. 核心贡献

- **逐位噪声 $k_t$**：序列里第 $t$ 帧的噪声级独立采样（$k_t{=}1$ 全噪声=标准扩散目标；$k_t{=}0$ 无噪声=标准 next-token 预测）——训练目标覆盖整个谱；
- **训练即课程**：随机噪声级的组合天然覆盖"拿清晰历史预测模糊未来"（AR 式）与"全局协调去噪"（扩散式）之间的所有混合形态；
- **稳定长序列生成**：推理时"逐帧解一点、滚动前进"（每帧解到部分去噪级就充当下一帧的清晰条件）——突破全序列扩散的长度上限与 AR 的复合误差两头限制；
- **任务级收益**：视频预测（长且稳）、规划（可与引导结合）、RL 世界模型三场景验证——同一骨架通吃。

## 3. 方法概要

1. Transformer（causal）+ 扩散头：每帧走一遍"加噪-去噪"，但噪声级 $k_t$ 逐帧独立；
2. 训练：随机采 $\{k_t\}$ 组合，去噪网络以"各帧噪声级"为条件预测各帧所加噪声——交叉注意力让后面的帧看得见前面（不同清晰度的）帧；
3. 推理 A（全扩散）：所有帧 $k=1$ 起步，全局去噪——帧间协调最强；
4. 推理 B（AR 滚动）：历史帧 $k=0$（已确定），只生成新帧；折中模式：历史帧**部分去噪**（k 保持中间值）——"记忆允许带点模糊"反而更稳（防早期错误硬锁定）；
5. 规划应用：把"未来某帧钉成目标"（inpainting 式）或对某些帧加引导——与 [[10-Papers/04-强化学习与对齐/Planning with Diffusion for Flexible Behavior Synthesis（Diffuser）|Diffuser]] 的约束思想兼容。

## 4. 核心公式

$$\tilde x_t=\mathrm{noise}\big(x_t,\,\sigma_{k_t}\big),\qquad \mathcal{L}=\mathbb{E}_{\{k_t\}}\Big[\big\lVert \epsilon_\theta\big(\tilde x_{1:T},\,\{k_t\},\,c\big)-\epsilon_{1:T}\big\rVert^2\Big]$$

**直觉解释**：把"序列生成"看成给每帧发一张**模糊度可调的眼镜**——标准扩散=全员同一副最模糊镜片再一起擦亮；标准 AR=历史帧全清晰、只擦新帧。Diffusion Forcing 说：**让网络在任何"谁清晰谁模糊"的组合下都会**——于是推理时自由选组合。"历史半模糊"模式的价值：早期预测错了不会被硬锁死成"确定事实"，后续帧还能把它拉回来——**对复合误差的软抵抗**。

- 需要的前置：[[30-Formulas/DDPM前向过程]]、[[40-Concepts/注意力机制]]、[[10-Papers/04-强化学习与对齐/Planning with Diffusion for Flexible Behavior Synthesis（Diffuser）|Diffuser]]（约束规划语境）

## 5. 与前作/矩阵关系

- ← 统一的两端：AR 预测（next-token/下一帧模型）与全序列扩散（Diffuser/视频扩散）——本文证明它们是同一连续谱的两个端点；
- ↔ 对照 [[10-Papers/09-世界模型与JEPA/Diffusion for World Modeling- Visual Details Matter in Atari（DIAMOND）|DIAMOND]]：DIAMOND=固定 3 步的逐帧自回归扩散（每帧独立生成完再前进）；DF=帧间协调+噪声谱自由——**Atari 100k 上两者正面交锋**（DIAMOND 更强但 DF 理论更普适）；
- ↔ 对照掩码扩散 LM（MaskGIT 类）：离散掩码 vs 连续噪声谱——同一"部分可观测生成"思想的两种度量。

## 6. 影响与后续

- 视频生成/世界模型骨干的重要选项（后续多个游戏世界模型与视频扩散采用逐帧噪声）；
- "稳定长视频生成"的关键技巧源头之一（部分去噪记忆）；
- 局限：训练/推理组合空间大、调参面宽；逐帧噪声条件使框架重（比 DIAMOND 式单帧链贵）。

## 7. 读前须知

- **必前置**：[[30-Formulas/DDPM前向过程]]、[[40-Concepts/注意力机制]]；
- **易混点**：①$k_t$ 是"噪声级选择器"不是扩散时间步本身（每帧自己的扩散进程独立调度）；②"稳定化收益"主要来自推理时的部分去噪模式，不是训练技巧；③与掩码扩散的区别=连续 vs 离散的部分可观测；
- **读法建议**：图 1（谱系图：AR 与扩散统一）→ 图 2（训练/推理示意）→ 规划实验节；理论节可缓读。

> 谱系枢纽：[[Dream to Control- Learning Behaviors by Latent Imagination（Dreamer）]]（图谱连通入口）

> 近邻同族：[[Diffusion for World Modeling- Visual Details Matter in Atari（DIAMOND）]] · [[Genie- Generative Interactive Environments（Genie）]]

> 数学根基：[[30-Formulas/扩散条件去噪]] · [[30-Formulas/逐token独立噪声]]
