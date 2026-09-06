---
type: paper
title: World Models
aliases: [World Models, Ha世界模型]
year: 2018
authors: [David Ha, Jürgen Schmidhuber]
venue: NeurIPS 2018
arxiv: "1803.10122"
line: 世界模型与JEPA
matrix_coords: [像素重建(生成式), 显式像素, 游戏控制(RL)]
tags: [paper]
---

# World Models（世界模型奠基之作）

## 1. 一句话贡献

"智能体可以在**自己脑内的梦境模型里训练**"——V（视觉压缩）+ M（记忆预测）+ C（简单控制器）三件套，第一次把"学世界模型→在模型里做梦练策略→回真实环境用"整条流水线走通，世界模型范式的开山。

## 2. 核心贡献

- **三件套架构**：V=[[Auto-Encoding Variational Bayes（VAE）|VAE]] 把 64×64 像素压成 32 维隐向量；M=MDN-RNN 预测下一隐状态（**混合密度输出——天然表达多模态未来**）；C=线性策略（只有几千参数）；
- **梦中训练**：策略完全在模型 rollout 里用进化算法优化，**真实环境零交互**（VizDoom 实验）；
- **分阶段冻结训练法**：先随机游走采数据训 V→冻结 V 训 M→冻结 V+M 在梦里进化 C——三件各司其职的流水线成为后续世界模型工作的默认骨架；
- 训练开销极小（家用 GPU/几十万参数级）——"小而完整的范式演示"，胜在思想不在规模。

## 3. 方法概要

1. **采数据**：随机策略跑 CarRacing/VizDoom，存 1 万局帧序列；
2. **训 V**：VAE 学"帧 ↔ 32 维隐向量"双向映射（重建=训练信号）；
3. **训 M**：MDN-RNN 吃 $(h_{t-1},z_{t-1},a_{t-1})$ 输出**下一 $z_t$ 的混合高斯分布**（5 个分量）——对手可能左可能右=混合的两个峰，不是单个均值；
4. **进化 C**：CMA-ES 在**纯想象 rollout**（M 生成的 $z$ 序列）上优化线性控制器 $a=W\,[z,h]$——奖励在梦里结算；
5. **迁移**：训好的 C 直接装回真实环境（VizDoom 版全程没在真环境练过一枪）。

## 4. 核心公式

$$z_t\;\sim\;\mathrm{MDN}\big(h_{t-1},z_{t-1},a_{t-1}\big)\;=\;\sum_{k=1}^{K}\pi_k\,\mathcal{N}\big(\mu_k,\sigma_k\big),\qquad a_t\;=\;W\begin{bmatrix}z_t\\ h_t\end{bmatrix}$$

**直觉解释**：MDN（混合密度网络）的输出不是"下一帧长什么样"的**一个答案**，而是**若干种可能的加权混合**——这是"世界有多条未来"最早的网络级表达。对照表：MDN 的混合高斯（2018）→ RSSM 的分类潜变量（2019）→ 像素扩散（2024 直接画帧、天然多模态）——**多模态处理的三代演进**都从这篇的"混合密度"思想出发。

- 需要的前置：[[20-Algorithms/变分自编码器]]（V 件）、[[30-Formulas/ELBO目标]]、[[40-Concepts/马尔可夫决策过程]]（C 件所处的决策框架）

## 5. 与前作/矩阵关系

- ← 旧思想："Daydreaming"幻想学习（2015 前后，Schmidhuber 系）+ 控制论的内部模型原理（ Internal Model Principle）；本文=给老思想配上现代深度生成模型；
- → 直系：[[Learning Latent Dynamics for Planning from Pixels（PlaNet）|PlaNet]]（三件套→RSSM+规划器）、[[Dream to Control- Learning Behaviors by Latent Imagination（Dreamer）|Dreamer]]（进化→梯度、线性→深度策略）、直到像素路线 [[Diffusion for World Modeling- Visual Details Matter in Atari（DIAMOND）|DIAMOND]]——**"梦"的叙事与流水线骨架贯穿全谱系**；
- 矩阵坐标：像素生成 × 显式（VAE 重建）× 游戏——占"范式奠基"位。

## 6. 影响与后续

- 引爆"model-based RL 复兴"；**"World Models"一词从此指代这个范式**（题目本身成了领域名）；
- 分阶段训练（V→M→C 各自冻结）成为标准做法（DIAMOND 的 denoiser/裁判/AC 三网分训同构）；
- 局限（后续工作的燃料）：①线性控制器只够简单梦——复杂任务需要深度策略与梯度（Dreamer 的动机）；②VAE 重建损失主导，**细节丢失**（"压缩掉的信息里有没有策略要用的"由此成为悬案，2024 年被 DIAMOND 反转）；③梦里训的策略受模型误差伤害（"梦山≠真山"问题的第一现场）。

## 7. 读前须知

- **必前置**：[[20-Algorithms/变分自编码器]]（V 件全部机制）、[[20-Algorithms/世界模型]]（总览卡）、[[40-Concepts/马尔可夫决策过程]]；
- **易混点**：①本文的"想象训练"=进化算法黑盒搜索，与 Dreamer 的"梯度穿梦"是两回事；②MDN-RNN 预测的是 **VAE 隐空间**不是像素——梦里没有画面，只有 $z$；③三件套是**分开训**的（当时端到端训不稳）——对照今天端到端联合训练的演化；
- **读法建议**：正文极短（9 页）；重点看图 2（架构总览）与图 5（VizDoom 梦中训练对比）；MDN 细节可跳过概念即可。

> 数学根基：[[30-Formulas/ELBO目标]] · [[40-Concepts/贝尔曼方程]] · [[40-Concepts/概率分布]]
