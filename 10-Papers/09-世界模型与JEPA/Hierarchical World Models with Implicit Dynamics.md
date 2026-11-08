---
type: paper
title: Hierarchical World Models with Implicit Dynamics
aliases: [ID-WM]
year: 2026
authors: [Gaoyue Zhou, Yvonne Wu, Zichen Jeff Cui, Nicolas Ballas, Mido Assran, Lerrel Pinto, Yann LeCun]
venue: arXiv 2026（2610.30 提交，cs.RO；NYU Courant+Meta FAIR+AMI Labs，LeCun 署名）
arxiv: "2610.42146v1"
pdf: https://arxiv.org/pdf/2610.42146v1
line: 世界模型与JEPA
matrix_coords: [潜在状态(DINO特征), 分层规划(噪声隐式动作), 扩散高层采样]
tags: [paper]
---
# Hierarchical World Models with Implicit Dynamics（ID-WM）

> 中文速览：提出层级世界模型 ID-WM，把"状态可达性"与"局部控制"解耦，解决长视野规划的误差累积与搜索爆炸。做法：高层用扩散模型（DDPM 训练+DDIM 确定性采样）从高斯噪声生成当前状态 Δ 步内可达的邻域子目标——噪声向量被当作"隐式高层动作"；低层用 transformer 世界模型当逆动力学求解器，通过 CEM 搜索把子目标落成可执行动作；双层 CEM 规划+MPC 重规划。效果：三套导航/操作环境（Wall/PushT/Maze）上比 SOTA 策略与扩散规划器总体 +38.5%、比单层 WM MPC +135%（随机目标 PushT 成功率 0.77 vs 0.21）。

## 1. 一句话贡献

把层级世界模型的"去哪"（状态可达性）与"怎么去"（局部控制）拆开：高层扩散模型只负责生成物理可达的邻域子目标（扩散噪声=隐式高层动作），低层确定性 WM 靠规划反推执行动作——无需任务专属价值函数/预训练策略，长视野零样本规划比单层 WM MPC 提升 135%。

## 2. 核心贡献

- **解耦可达性与控制**：高层 WM $f_{hi}(s_{t+\Delta}\mid s_t,\Delta)$ 是"邻域状态生成器"——只隐式建模动力学（输出限定在 Δ 步可达流形上），不管怎么执行；低层 WM $f_{lo}(s_{t+1}\mid s_{t-k:t},a_{t-k:t})$ 是 DINO-WM 式 transformer 确定性预测器，通过规划当逆动力学求解器用；
- **噪声=隐式高层动作**：DDIM 确定性采样把初始噪声 $z_t$ 映射到可达子目标，规划器在高斯空间上搜索（平滑良态），替代不连续的离散技能/宏动作空间——规避技能空间的拓扑断裂与模式坍缩；
- **噪声正则防"虫洞"**：无约束规划会钻 WM 空子（生成不现实转移），对 $|z|>\tau$ 的噪声幅值惩罚把搜索压在高概率区内——"用强大优化器规划学习型 WM 必然对抗性"的直接对策；
- **三层实证**：子目标分布多样且物理可达（100 采样可视化）；三套环境总体 +38.5%（vs HIQL/GCBC/Diffuser/H-Diffuser）、+135%（vs 单层 WM MPC）；150 步远目标近满分、任务规模扩展（Giant Maze 13×13）保持最优。

## 3. 方法概要

1. **低层 WM（基座）**：Zhou et al.（DINO-WM）的 transformer 确定性模型——DINOv2 特征潜空间里，条件过去 $k$ 步状态+动作预测下一步，监督学习 L2 损失；两层共享统一结构：编码器 $\text{enc}_\theta$ / 转移模型 $p_\theta$ / 解码器 $q_\theta$；
2. **高层 WM（核心创新）**：条件 DDPM——把"Δ 步后的真实状态"当生成目标，条件当前状态 $s_t$ 与时间半径 Δ，学 ε-预测；推理用 DDIM 确定性采样，初始噪声 $z_t$ 经确定映射 $\mathcal{G}_\theta(s_t,z_t)$ 落到可达子目标；
3. **高层规划**：CEM 搜噪声序列 $z_0,\dots,z_{H_{hi}-1}$，代价=终点到目标距离+噪声正则；子目标间距约束 ≤Δ 步（保证低层搜得动）；
4. **低层规划**：对每个子目标再跑 CEM 搜动作序列，$\min\|\hat{s}_{H_{lo}}-s^*\|$；执行后进下一子目标；
5. **MPC 循环**：整段高层计划执行完从当前状态重规划（最多 15 次），不需预知目标距离；全程无奖励标签、无策略训练（纯离线 WM+测试时搜索）。

## 4. 核心公式

$\mathcal{L}_{\text{diff}}=\mathbb{E}_{x_{0},\epsilon\sim\mathcal{N}(0,I),j}\left[\lVert\epsilon-\epsilon_{\theta}(x_{j},j,s_{t})\rVert^{2}\right]$

**直觉解释**：高层就是标准条件 DDPM（条件=当前状态），但生成目标不是"数据集里的图像"而是"Δ 步内可达的未来状态"——扩散学的是**可达性流形**，动力学被"隐式"编码在生成分布里（只生成走得到的地方）。

$\hat{s}_{t+\Delta}=\mathcal{G}_{\theta}(s_{t},z_{t}),\quad z_{t}\sim\mathcal{N}(0,\mathbf{I})$

**直觉解释**：DDIM 把采样变成确定函数——同一个 $z$ 永远映射到同一子目标。于是**噪声空间就是高层动作空间**：各向同性高斯天然平滑良态，任何 $z$ 都对应物理可达状态，规划器搜的是良态分布而非不连续的技能索引（对照实验：等预算 frameskip 的朴素 WM 出现拓扑断裂/虫洞）。

$\mathcal{L}=\lVert\hat{s}_{H_{hi}}-s_{g}\rVert_{2}+\alpha\,\mathbb{E}_{i}\left[\left(\max(0,|z_{i}|-\tau)\right)^{p}\right]$

**直觉解释**：高层规划代价=终点逼近目标+噪声幅值正则。第二项是"防虫洞"：高斯分布高概率区外的 $z$ 可能诱导 DDIM 走出训练流形、生成看似可达实则虚假的转移——惩罚超界幅值把 CEM 压回分布支撑集内。

$\mathcal{L}_{lo}=\lVert\hat{s}_{t+1}-s_{t+1}\rVert_{2}$

**直觉解释**：低层只是个确定性下一步预测器——"逆动力学"不是学出来的头，而是**搜出来的解**：给定目标状态 $s^*$，CEM 在动作序列空间最小化预测终点误差。正演模型+搜索=反演（规划式 IDM）。

## 5. 与前作/矩阵关系

- ← 低层基座 DINO-WM（Zhou et al.，DINOv2 特征潜空间 WM+CEM 规划，库内无卡）——ID-WM 把它的"单层规划"扩成"双层规划"；
- ↔ 对照 HWM（frameskip+宏动作 transformer 编码路线，库内无卡）：PushT 上碾压（Fix 1.00 vs 0.38 / Rand 0.77 vs 0.20）——论据=在高斯噪声空间搜索比在学出的宏动作空间搜索更良态；
- ↔ [[Hierarchical Planning with Latent World Models（HPLWM）]]（潜动作×分层规划族）：同属"分层 WM 规划"格，但此族靠学潜动作/宏动作，ID-WM 的"潜动作"是免费的高斯噪声；
- ↔ [[H-JEPA End-to-End Learning of Hierarchical World Models for Visual Planning|H-JEPA]]（同为 LeCun 署名分层 WM，2610 并置）：H-JEPA 走 JEPA 时间尺度自监督端到端，ID-WM 走扩散高层+显式规划——分层 WM 的两条路线；
- ↔ [[TD-MPC2- Scalable, Robust World Models for Continuous Control（TD-MPC2）]]：同为"潜空间 WM+测试时搜索"，ID-WM 论证单层搜索在长视野上崩（135% 差距来自此）。

## 6. 影响后续

- 长视野零样本规划的新基准路线（无价值函数/无预训练策略依赖）；"扩散=局部生成器而非全局规划器"的定位转变；

## 7. 读前须知

- **必前置**：[[30-Formulas/DDPM训练目标]]、[[30-Formulas/DDIM更新规则]]（DDIM 确定性采样是"噪声=动作"成立的前提）、CEM/MPC 常识（[[30-Formulas/MCTS置信上界]] 同族的测试时搜索思想）、DINOv2 特征空间直觉；
- **易混点**：①"implicit dynamics"指高层**不显式输出转移函数**，动力学隐含在"只生成可达状态"这一约束里——不是隐式神经表达；②高层扩散作用在 **DINO 特征潜空间**（不是像素）；③"逆动力学"全程无 IDM 头——纯靠低层正演 WM+CEM 反演；④无 RL 训练环节：策略=规划器，actor 只负责执行；
- **读法建议**：图 1/2（解耦架构）→ 图 4（100 噪声采样的可达分布可视化——高层质量直觉）→ 表 1（主表，PushT Rand 差距最大）→ 表 2（vs HWM）→ 6.6（噪声正则消融）→ 6.13（等预算 frameskip 对照=虫洞证据）。

> 原文：https://arxiv.org/pdf/2610.42146v1 ｜ 在线全文：https://arxiv.org/html/2610.42146v1 ｜ 视频：https://id-wm.github.io

---

> 谱系枢纽：[[Dream to Control- Learning Behaviors by Latent Imagination（Dreamer）]]（图谱连通入口）

> 近邻同族：[[Hierarchical Planning with Latent World Models（HPLWM）]] · [[H-JEPA End-to-End Learning of Hierarchical World Models for Visual Planning]] · [[TD-MPC2- Scalable, Robust World Models for Continuous Control（TD-MPC2）]]

> 数学根基：[[30-Formulas/DDPM训练目标]] · [[30-Formulas/DDIM更新规则]] · [[40-Concepts/逆动力学（IDM）]] · [[20-Algorithms/世界模型]]
