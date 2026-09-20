---
type: paper
title: "CrossDistill: Balancing Quality and Diversity via Trajectory-Level Hybrid Few-Step Distillation"
aliases: [CrossDistill]
year: 2026
authors: [Yuxi Liu, Haoyu Li, Yixiang Cai, Tengxu Sun, Kun Yuan, Kai Zhang]
venue: arXiv 2026-09-13（北大 Melon+清华+阿里，实验在 Wan2.1-T2V 1.3B/14B）
arxiv: "2609.14725v1"
pdf: 已下载（PDF/）
line: 生成建模与扩散
matrix_coords: 扩散/少步蒸馏×视频生成域×蒸馏(轨迹+分布的噪声段调度)
tags: [paper, 核心组命中(wm-distill-fewstep), 生成建模与扩散]
layer: 精读层（PDF 前 12 页全读，260916 ⑦推荐）
---
# CrossDistill: Balancing Quality and Diversity via Trajectory-Level Hybrid Few-Step Distillation

> **中文速览**：做了什么——少步蒸馏的"保多样性 vs 保锐度"矛盾（轨迹蒸馏 TD 保模式覆盖但糊、分布匹配 DM 锐但坍缩多样性）被改写成**噪声轴上的调度问题**：高噪步定全局模式、低噪步磨局部细节，两类目标各管一段。怎么做的——在采样轨迹上取交叉点 $\tau^\star=0.94$ 切两段：高噪段 $[\tau^\star,1]$ 用轨迹保持目标（PCM 一步接力）、低噪段 $[0,\tau^\star]$ 用分布匹配（DMD 三步），两段经交叉点状态耦合、梯度互不穿透。效果——Wan2.1-T2V 四步学生中语义/总分最优（1.3B 总分超全步教师），种子级多样性恢复教师的 86%（DMD 仅 57%、AnyFlow 66%）；反向调度对照双输，证明"谁在哪段"是收益来源。

## 1. 一句话贡献
把少步蒸馏的"多样性-锐度"张力变成**噪声区间上的目标指派问题**：高噪段交给轨迹保持目标保住全局分支、低噪段交给分布匹配磨细节，一个交叉点耦合两段——并用四种损失组合全有效+反向调度全面失败两组对照，证明起作用的是**调度**而非任何具体损失对。

## 2. 核心贡献
- **噪声区间-目标指派成为显式设计轴**：coarse-to-fine 去噪（高噪定语义模式/低噪修纹理）→ TD 管 $[\tau^\star,1]$、DM 管 $[0,\tau^\star]$；与损失级混合（每个噪声层同时受两目标拉扯）、训练时序两段式（AnyFlow/From-Structure-to-Detail 按阶段切但不切噪声段）正交且实证更优。
- **轨迹级接力结构**：$\epsilon\to x_{\tau^\star}\to\hat x_0$ 两段串联，DMD 梯度在交叉点截断不回传进高噪接力——高噪段只受轨迹监督（保分支），低噪段始终在当前接力器产出的 $x_{\tau^\star}$ 上训练（经验分布耦合）。
- **"调度而非损失"的论证**：DFD$_H$/PCM$_H$ × TDM$_L$/DMD$_L$ 四种组合在同等分割与协议下全部有效（Table 2）——设计对象是噪声段调度，损失是即插即用件。
- **反向调度对照（最硬的一组消融）**：同分割同预算、把 DM 换到高噪段——总分 82.42 vs 85.41、多样性同步塌（V-JEPA2 cos 0.082 vs 0.106）——排序本身是因果源，不是 TD+DM 组合就行。

## 3. 方法概要（分步）
1. **找相变点**：跨 prompt 可视化教师多步去噪的中间态，全局语义模式稳定在 $\tau\approx 0.94$ 从噪声中定格（跨 prompt/种子一致的相变边界）→ 取 $\tau^\star=0.94$，网格搜索印证其为质量-多样性最优点。
2. **高噪段接力器 $f_\theta$**：缺省用 PCM 相位一致性——同一条教师轨迹段上的任意状态必须映到相同段端点（式 2）；一步直达 $x_{\tau^\star}$。可替换为 DFD：直接 MSE 回归教师 PF-ODE 流到 $\tau^\star$ 的状态（式 3，更简单的回归版）。
3. **低噪段子采样器 $g_\theta$**：从 $x_{\tau^\star}$ 起做三步学生速度评估得 $\hat x_0$；DMD 损失（教师/假去噪器 score 差，式 4）只施加在低噪区间 $s\sim U(L)$，假模型在停梯度的学生 rollout 上训练。
4. **梯度解耦**：DMD 梯度在交叉点 stop——分布匹配压力只 refine 局部统计，不反向篡改高噪段的模式选择。
5. **NFE 预算分配**：4 步=1 高噪+3 低噪（模式在 0.94 已定型，高噪多花步数只是精修已承诺结构、多样性边际递减）；2 步预算同原则 1+1，总分仅微降。

## 4. 核心公式
- 接力采样：$\epsilon\sim p_1 \mapsto x_{\tau^\star}:=f_\theta(\epsilon,1) \mapsto \hat x_0:=g_\theta(x_{\tau^\star})$——直觉：两个"各管一段"的子生成器串联，接口是单个中间状态；**多样性在高噪段被锁定、锐度在低噪段被抛光**，预算按信息量分配。
- 高噪一致性（PCM 实例）：$\mathcal{L}_{\text{PCM}}=\mathbb{E}\,\lVert f_\theta(x_t,t)-\text{sg}[f_\theta(\Psi_{t\to t'}(x_t),t')]\rVert_2^2$——直觉：同一条教师轨迹上的点必须映到同一端点=把教师"哪条轨迹→哪个模式"的分支结构压进学生一步（$\Psi$=教师 PF-ODE 流图）。
- 低噪分布匹配（DMD 实例）：$\mathcal{L}_{\text{DMD}}=\mathbb{E}\,\lVert \hat x_0-\text{sg}[\hat x_0-\frac{F_\psi(x_s,s)-F_\phi(x_s,s)}{\text{mean}\lVert\hat x_0-F_\phi\rVert}]\rVert_2^2$——直觉：假/真 score 差≈学生/教师分布的 KL 梯度方向，**只在低噪段**把学生推上数据流形；归一化因子稳住梯度量纲。
- 两目标时间支撑不相交：$\text{supp}_t\,\mathcal{L}_{\text{PCM}}=H,\ \text{supp}_t\,\mathcal{L}_{\text{DMD}}=L$——直觉：聚合损失不在同一噪声层同时施加两个竞争目标，这正是它与损失级混合的分水岭。

## 5. 与前作/矩阵关系
- 线锚：[[20-Algorithms/一致性模型]]（TD 支路本源）· [[20-Algorithms/扩散模型]]
- 数学根基：[[30-Formulas/概率流ODE]]（流图 $\Psi$ 是全部轨迹语言的地基）· [[40-Concepts/NFE（函数求值次数）]]（1+3 步预算分配是调度的落点）
- 近邻同族：[[One-step Diffusion with Distribution Matching Distillation（DMD）]]（DM 支路本源，被本文装进低噪段区间化使用）· [[Consistency Models（一致性模型）]]（TD 支路本源：轨迹自洽保模式覆盖）· [[AnyFlow- Any-Step Video Diffusion Model with On-Policy Flow Map Distillation（AnyFlow）]]（训练时序两段式路线代表+本文直接对照基线：AnyFlow 切训练阶段、不切噪声支撑）
- ↔ E1 对话位（划界与借鉴）：E1 的 EMDMD=分布匹配家族在 WM 蒸馏里的实例——本文实证"DM 类目标全程/过早施加会压掉轨迹分支"（Fig 2：纯 DMD 在 $t\approx0.94$ 已把不同种子拉到相近状态），与 E1"分布伤↔EMDMD+剂量曲线单峰"同向；但其评估全用 VBench/种子多样性=纯生成指标，**决策/任务级口径完全空白**——E1"决策保真"命题的空位仍在。域=文生视频，无动作条件、无游戏 RL，不撞格。

## 6. 影响后续
- 噪声段调度成为少步蒸馏的显式设计轴（与 NFE 预算分配耦合）；对 Wan 系视频蒸馏管线即插即用（PCM/DMD 皆为现成件）。
- 方法论范本："四组合全有效+反向对照全输"的论证结构，把"调度 vs 损失"的归因做干净——值得 E1 写消融时借鉴。
- 局限：只在生成域验证（T2V/I2V），无动作/决策条件；$\tau^\star$ 的跨模型族泛化只在 Wan2.1 内验证；多样性度量依赖冻结编码器距离（V-JEPA2/VideoMAE V2）。

## 7. 读前须知
[[30-Formulas/概率流ODE]]（流图与轨迹）、[[20-Algorithms/一致性模型]]、[[One-step Diffusion with Distribution Matching Distillation（DMD）]]、[[40-Concepts/Score函数]]（DMD 的 score 差语言）
