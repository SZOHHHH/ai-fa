---
type: paper
title: "SWIM: Learning What Matters from Behaviors for JEPA World Models"
aliases: [SWIM]
year: 2026
authors: [Jiaming Hu, Shi Bo, Yan Zheng, Tian Wang, et al.]
venue: arXiv 2026（Boston University + Unity Technologies）
arxiv: "2610.36662v1"
pdf: https://arxiv.org/pdf/2610.36662v1
line: 世界模型与JEPA
matrix_coords: [状态监督(JEPA), 逆动力学(特征加权), 机器人操作规划]
tags: [paper]
---
# SWIM: Learning What Matters from Behaviors for JEPA World Models

> 261028 精读升级（在线全文 arxiv.org/html/2610.36662v1，261028 ⑦推荐）。

## 1. 一句话贡献
给 JEPA 世界模型的状态监督补上「该重视哪些状态坐标」的缺失环节——用门控逆动力学（IDM）从离线轨迹的行为反推中学出逐坐标权重，定义加权状态度量去校准潜空间几何（SCALE 框架）；IDM 与模拟器状态只在训练期出现，部署仍是纯图像潜空间规划、零额外推理开销。

## 2. 核心贡献
- **病理定位**：JEPA 视觉预测目标不保证「决定任务进展的物理状态」在潜空间可靠可分；状态监督类方法（SCALE 等）把「选哪些坐标、怎么加权」当给定——手选要专家先验，均匀加权让冗余坐标（sin/cos 对）重复计数、无关坐标把噪声写进监督目标，即使潜-态对齐完美，失真也原样进规划代价。
- **门控 IDM 学权重**：行为预测器（Gaussian MLP）从「当前状态+门控的未来位移」预测记录动作块；训练=动作 NLL+判别项（真位移须比批内错配位移更好解释动作，hinge/InfoNCE 二选一）+ℓ1 门正则。判别项不可省：动作常可部分由当前态猜出，预测器若绕开位移，门拿不到梯度。
- **度量转移**：冻结门 $\mathbf g^*$，加权平方距离替换 SCALE 的均匀状态距离目标，用 Pearson 相关损失校准编码器；权重学自行为、与下游目标无关，可移植到其他状态监督目标（物理接地/子空间对齐）。
- **定理+实证**：规划次优性三分解（对齐/潜 rollout/权重失配），均匀权重的失配项不随对齐变好而消失；5 个 OGBench 操作任务×CEM/iCEM×5 种子，较均匀加权（SCALE-All）+0.9–6.0pt、较 LeWM +2.0–8.9pt；26 个结构化干扰坐标混入后门值全≤0.31、原坐标排序 Spearman 0.995 保序。

## 3. 方法概要
1. **Stage 1（学门）**：从离线轨迹抽三元组 $(\mathbf q_t,\mathbf q_{t+h},\mathbf a_t)$（h∈{1,2,4,8} 逐例采样，动作块=5 帧堆叠）；状态逐坐标标准化（均值/方差全数据集一次算好，方差加下界、截断极值）；可训练门 logits $\alpha$ 经 sigmoid 得 $\mathbf g\in(0,1)^d$，逐坐标缩放位移 $\delta=\mathbf q_{t+h}-\mathbf q_t$；MLP 由 $[\mathbf q_t;\,\mathbf g\odot\delta]$ 出动作块的高斯参数，NLL 拟合记录动作。当前状态不设门、单个门向量全环境共享。
2. **判别+正则**：hinge（真位移与批内下一例的错配位移拉开 margin κ=1）或 InfoNCE（1 真+255 错配、批内循环取负例、τ=1）逼预测器真用位移解释动作；$\lambda\lVert\mathbf g\rVert_1$ 鼓励小门、无硬阈值选择（λ∈{0.01,…,1.0} 网格，SWIM-H 用 0.03、SWIM-N 用 0.1）。
3. **Stage 2（传几何）**：门冻结 detach，标准化后的状态乘 $\sqrt{\mathbf g^*}$，成对帧的加权平方距离作为 SCALE 相关损失的目标（替换均匀 $\ell_2$）；预测+SIGReg 主损失不变，只换监督目标。**顺序不可反**：门须在标准化之后进入且不可再二次标准化（否则权重被方差归一抵消）。
4. **部署**：IDM 与模拟器状态全部丢弃——CEM/iCEM 仍在图像潜空间搜动作序列（每 episode 50 步预算、规划窗 5 决策步、MPC 整段执行后重规划），无额外规划期计算。

## 4. 核心公式
- 行为预测器得分：$s_t(\delta)=\log p_\phi\big(\mathbf a_t\,\big|\,[\mathbf q_t;\,\mathbf g\odot\delta]\big)$ —— **直觉：当前状态不设门（背景板），只有「位移」被门控筛选——门值高=该坐标的变化帮着反推动作=行为相关**。
- Stage-1 总目标：$\mathcal L_{\text{Stage1}}=\mathcal L_{\text{NLL}}+\gamma\mathcal L_{\text{disc}}+\lambda\lVert\mathbf g\rVert_1,\quad \mathcal L_{\text{disc}}\in\{\mathcal L_{\text{hinge}},\mathcal L_{\text{InfoNCE}}\}$ —— **直觉：NLL 管「拟合动作」、判别项管「必须用位移解释动作」（防绕开位移→门无梯度）、ℓ1 管「门要省着开」，三力平衡下只有真有用的坐标配得上高门**。
- 加权状态距离：$D^2_{\mathbf g^*}(\mathbf q_i,\mathbf q_j)=\sum_{k=1}^{d}g^*_k\,(q_{i,k}-q_{j,k})^2$ —— **直觉：把「哪些差异算差异」从均匀票制改成行为贡献加权票制；门以 $\sqrt{\mathbf g^*}$ 进入状态、平方后恰好线性进入距离**。
- Stage-2 目标：$\mathcal L_{\text{SWIM}}=\mathcal L_{\text{LeWM}}+\lambda_{\text{corr}}\big[1-\rho_P(\mathbf x,\mathbf y^{\text{SWIM}})\big]$ —— **直觉：潜距离向量 $\mathbf x$ 与加权状态距离向量 $\mathbf y$ 的 Pearson 相关最大化=「潜空间的远近该模仿加权状态空间的远近」**。
- 定理 4.1（候选选择界）：$0\le D^2_{\mathbf g^0}(\mathbf q_H^{\hat m},\mathbf q_g)-\min_m D^2_{\mathbf g^0}(\mathbf q_H^{(m)},\mathbf q_g)\le 2\sigma_q\sqrt{M(1-\rho_P)}+2\frac{\sigma_q}{\sigma_z}(2C_zC_{\text{roll}}+C_{\text{roll}}^2)+R^2\lVert\mathbf g-\mathbf g^0\rVert_1$ —— **直觉：选错候选的代价=三税之和——对齐税（潜-态相关不足）+rollout 税（潜预测误差）+度量失配税（学的门 $\mathbf g$≠任务参考权重 $\mathbf g^0$）；均匀权重 $\mathbf g^u$ 下第三税 $R^2\lVert\mathbf g^u-\mathbf g^0\rVert_1$ 永不归零——「均匀度量把失真写进规划代价」的定理级表述**。

## 5. 与前作/矩阵关系
- 线锚：[[20-Algorithms/世界模型]] · [[40-Concepts/逆动力学（IDM）]]（本文=其 §6 用法分岔第七支：训练期特征加权支）· [[40-Concepts/JEPA联合嵌入预测架构]]
- ← 直接前身：SCALE（Hu et al. 2026，arXiv:2608.16287，同作者——潜-态距离对齐的状态监督框架，本文学出其缺失的加权度量）；基座 LeWM（LeWorldModel，Maes et al. 2026）
- ↔ IDM×JEPA 同族：[[10-Papers/09-世界模型与JEPA/Preserving Unstable Modes Through Inverse Dynamics in JEPA World Models|EP-IDM]]（IDM 修「该保什么」的镇定版——保不稳定模态；本文=行为版——学状态权重）；[[10-Papers/09-世界模型与JEPA/Delta-JEPA- Learning Action-Sensitive World Models via Latent Difference Decoding（Delta-JEPA）|Delta-JEPA]]（动作敏感表征同问）；[[10-Papers/09-世界模型与JEPA/LeWAM A JEPA World Action Model with Diffusion-Steering-Based MPC|LeWAM]]（JEPA+逆动力学的任务侧用法）
- ↔ 状态监督家族：[[10-Papers/09-世界模型与JEPA/Toward Physically Grounded JEPA World Models for Goal-Conditioned Robotic Planning|Physically Grounded JEPA]]（物理接地——其「状态坐标固定给定」前提正是本文要松绑的）

## 6. 影响后续
- 「监督度量的可学习化」路线的开山位：把状态监督从「给什么用什么」升级为「从行为学该用什么」——作者点名后续=子空间对齐/物理接地等其他状态监督目标、状态相关的动态加权机制。
- 局限（作者自认）：权重上限受所给状态坐标集合与离线行为覆盖约束；当前只证 SCALE 一个宿主、增益绝对值小（约 1-6pt）——大增益预期在「坐标多且冗余/含噪」的场景。

## 7. 读前须知
- [[40-Concepts/逆动力学（IDM）]]（正逆镜像与良定义性三档）· [[40-Concepts/JEPA联合嵌入预测架构]]（预测目标为何不含任务信息）· [[10-Papers/09-世界模型与JEPA/V-JEPA 2- Self-Supervised Video Models Enable Understanding, Prediction and Planning（V-JEPA 2）|V-JEPA 2]]（JEPA 规划范式与潜空间 CEM/iCEM）
- 概念上需要：Pearson 相关作为几何对齐目标的意思、ℓ1 稀疏化为什么产生「软特征选择」、OGBench 目标条件离线 RL 设定。
