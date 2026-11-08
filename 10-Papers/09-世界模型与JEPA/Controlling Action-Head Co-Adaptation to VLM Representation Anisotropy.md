---
type: paper
title: Controlling Action-Head Co-Adaptation to VLM Representation Anisotropy
aliases: [AdaIE]
year: 2026
authors: [Jiayin Zheng, Zheng Zhang]
venue: arXiv 2026-11（UCSB+XPeng）
arxiv: "2611.04006v1"
pdf: https://arxiv.org/pdf/2611.04006v1
line: 世界模型与JEPA
matrix_coords: [表征接口干预(敏感度重加权), VLM潜空间/JEPA式, 机器人VLA+WM规划]
---

# Controlling Action-Head Co-Adaptation to VLM Representation Anisotropy（AdaIE）

> 261105 精读升级（全文 https://arxiv.org/html/2611.04006v1）。一句话：动作头会"迁就"冻结 VLM 表征的各向异性、把敏感度堆到高方差通道上，表征与任务错配时有害——零参数在线重加权（AdaIE）压平它，VLA 真机 +19pp，同一干预直接外推到 JEPA 世界模型提升规划成功率。

## 1. 一句话贡献
发现并受控验证「下游动作头对预训练 VLM 表征几何的共适应」现象（敏感度向高方差通道集中、错配时有害），给出零参数两步干预 AdaIE（Hutchinson 敏感度探针+逆幂重加权+幅值匹配），GR00T 式 VLA 仿真 +5.28pp、真机人形平均 +19pp，并直接搬进 LeWM/DINO-WM 等 JEPA 世界模型提升规划成功率。

## 2. 核心贡献
- **现象学**：VLM 输出通道方差高度各向异性；动作头训练中雅可比能量 $\mathbf{g}_j$ 渐进集中到高方差通道（"接口共适应"）——首次把模块化架构里"头迁就表征缺陷"作为受控研究对象；
- **受控因果实验**：冻结接口重加权 $\mathbf{s}_j=(\hat g_j)^{-\alpha}$ 扫 α 符号——对齐接口（DINOv2→深度、DeiT→分类）重加权无增益；错配接口（Diffusion Policy/Push-T、GR00T/RoboCasa）Equalize > Baseline > Exploit，因果坐实"错配下共适应有害"；
- **AdaIE 方法**：在线 Hutchinson 探针（一次反传、EMA ρ=0.99、每 8 步一探）估通道敏感度 → $(\hat g_j+\epsilon)^{-0.25}$ 逆幂重加权 → NormMatch 幅值回对齐；零新增参数、训练开销 3.7%、推理期冻结零开销；
- **跨域外推**：同一干预插入 LeWM（端到端 JEPA+扩散转向 MPC）与 DINO-WM，规划成功率上升——"表征接口干预"不限于 VLA。

## 3. 方法概要
1. **测敏感度**：动作头 $f_\theta(\mathbf{C})$（流匹配 DiT）对 VLM 特征 $\mathbf{C}$ 各通道的长期平均敏感度，用 Hutchinson 探针近似——随机向量 $\mathbf{r}$ 算 $\mathbf{Q}=\partial\langle\mathbf{r},f_\theta(\mathbf{C})\rangle/\partial\mathbf{C}$，免整雅可比；
2. **重加权**：$\mathbf{s}_j=(\hat g_j+\epsilon)^{-\alpha}$（α=0.25）逐通道缩放输入，逼头的容量离开"高方差易学"通道；
3. **幅值匹配（NormMatch）**：重加权改变输入幅值分布，用 EMA 幅值比把缩放后的特征拉回原幅值尺度（无梯度追踪）；
4. **冻结部署**：推理期 $\mathbf{s}$ 固定零开销；训练开销 3.7%（65.45h→67.88h，4×H200，2B，150K 步）；
5. **实验矩阵**：RoboCasa-GR1 24 任务×60 rollouts（2B 42.36→47.64、4B 47.99→50.07）；RoboTwin 2.0 50 任务 +1.68pp；真机 IRON-R01-1.11 人形 5 任务×20 trials 平均 +19pp（5875 episodes/16.4h）；WM 侧 LeWM（Two Room/Push-T/Reacher/OGBench-Cube，5 seeds×50 eps）与 DINO-WM（10 seeds×50 eps）规划成功率均升。

## 4. 核心公式
- 通道敏感度：$\mathbf{g}_j=\mathbb{E}_i\left[\mathrm{diag}(\mathbf{J}_i^\top\mathbf{J}_i)_j\right]$（$\mathbf{J}_i=\partial f_\theta(\mathbf{C})_i/\partial\mathbf{C}$——第 j 通道扰动传到输出的能量，沿数据平均）
- Hutchinson 在线估计：$\hat{\mathbf{g}}_j=\frac{1}{N}\sum_i \mathbf{Q}_{i,j}^2$，$\mathbf{Q}=\partial\langle\mathbf{r},f_\theta(\mathbf{C})\rangle/\partial\mathbf{C}$（$\mathbf{r}$ 为随机投影向量——一次反传代替整雅可比）
- 逆幂重加权：$\mathbf{s}_j=(\hat{\mathbf{g}}_j+\epsilon)^{-\alpha}$，$\alpha=0.25$（敏感度越高权重越低；α∈[0.05,0.5] 大体有益，最优值任务相关）
- NormMatch：$\mathbf{Z}=r\,\tilde{\mathbf{C}}$，$r=\sqrt{m_{in}/\max(m_{out},10^{-12})}$（$\tilde{\mathbf{C}}$ 为重加权后特征，$m$ 为 EMA 幅值——幅值回原尺度防分布漂移）

**直觉**：雅可比列能量="这个通道被头用了多少"；各向异性表征里高方差通道最"好学"，头会贪吃它们，错配任务真正需要的低方差通道被饿死——逆幂加权是配给制。

## 5. 与前作/矩阵关系
- 线锚：[[20-Algorithms/世界模型]]（WM 侧外推：LeWM/DINO-WM 规划提升）· [[40-Concepts/JEPA联合嵌入预测架构]]（JEPA 表征接口同域）· [[20-Algorithms/扩散模型]]（动作头=流匹配 DiT；Diffusion Policy 错配实验）
- ↔ 同谱系"表征几何为控制服务"：[[10-Papers/09-世界模型与JEPA/SWIM Learning What Matters from Behaviors for JEPA World Models|SWIM]]（行为度量校准潜几何——改表征本身）vs 本文（冻结表征、修接口分配）；[[10-Papers/09-世界模型与JEPA/Toward Physically Grounded JEPA World Models for Goal-Conditioned Robotic Planning|Physically Grounded JEPA]]（行动可达性塑表征）
- ↔ 互补：[[10-Papers/09-世界模型与JEPA/Decision-Metric Alignment in Latent World Models Diagnostics and Action-Conditioned Objectives for MPC Planning|Decision-Metric Alignment]]（改训练目标对齐决策指标）vs 本文（训练期输入侧干预，零参数）
- 概念链：[[40-Concepts/视觉语言模型（VLM）]]（被干预的冻结表征）

## 6. 影响后续
- "接口共适应"给模块化架构（冻结骨干+下游头）添了新病理学词汇——VLA/WAM 的表征审计多了敏感度探针这件便宜仪器；
- 训练期干预而非改损失：为"不动蒸馏目标也能修接口"提供正交路线；
- 库内 09 线定位：与行动监督式表征（RWM/EP-IDM）、行为加权度量（SWIM）并列的第三条"几何为控制服务"路径——接口分配式。

## 7. 读前须知
前置：雅可比/敏感度直觉（[[40-Concepts/梯度]]）、流匹配动作头（[[20-Algorithms/流匹配]]）、VLA 结构（Qwen3-VL 骨干+DiT 动作头，GR00T-N1 式）。读时抓两条线：受控实验（α 扫描定因果）与 AdaIE 工程化（探针频率 K=8 / 幅值匹配细节）。原文：https://arxiv.org/html/2611.04006v1
