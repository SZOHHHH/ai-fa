---
type: paper
title: EDELINE- Enhancing Memory in Diffusion-based World Models via Linear-Time Sequence Modeling
aliases: [EDELINE]
year: 2025
authors: [Jia-Hua Lee, Bor-Jiun Lin, Wei-Fang Sun, Chun-Yi Lee]
venue: NeurIPS 2025 Spotlight（261013 核实）
arxiv: "2502.00466"
pdf: https://arxiv.org/pdf/2502.00466
line: 世界模型与JEPA
matrix_coords: [记忆增强(SSM), 显式像素, 游戏控制(RL)]
tags: [paper]
---

# EDELINE（Mamba 记忆增强的扩散世界模型：无搜索 MBRL 新 SOTA）

## 1. 一句话贡献

给 DIAMOND 补上"长期记忆"——用 Mamba 状态空间模型处理**无界**观测-动作序列（替代 DIAMOND 的固定 4 帧窗口）、并把奖励/终止判头并入统一架构——Atari 100k 均值 HNS **1.866**（DIAMOND 1.459），拿下**无 look-ahead search 的 MBRL 新 SOTA**。

## 2. 核心贡献

- **REM 循环嵌入模块**：Mamba SSM 递归压缩全部历史 $$\Rightarrow$$ 隐状态 $$h_t$$ 承载"无限长记忆"——动机实验钉死 DIAMOND 的病：MiniGrid MemoryS7/S9 上 DIAMOND 因 4 帧窗口丢失早期状态而预测崩坏，EDELINE 近最优；
- **统一架构**：奖励/终止预测直接条件在 $$h_t$$ 上（两个 MLP），**废除 DIAMOND 的独立 CNN-LSTM 判头**——观测/奖励/终止三任务共享表征，WM 更新提速 26.8%；
- **动态损失调和**：引入 HarmonyDream 的 harmonizer $$w_o, w_r$$，变分式动态平衡高维观测损失与标量奖励损失的量纲鸿沟；
- **跨域验证记忆假说**：Atari 100k（1.866，13 游戏超人类）、Crafter（超 DIAMOND **4.1×**，同 11M 参数）、ViZDoom 3D 第一人称（DeadlyCorridor 全程走廊记忆）三线全胜。

## 3. 方法概要

1. **三部件**：REM（Mamba，3 层，$$d_{model}=512$$）吃 $$(o_t, a_t)$$ 递归产 $$h_t$$；Next-Frame Predictor（EDM 预条件化 U-Net，同 DIAMOND）预测下一帧；奖励/终止头 = 读 $$h_t$$ 的 MLP；
2. **$$h_t$$ 如何进 U-Net**（对 DIAMOND 的两处改造）：①AdaGroupNorm 条件从 $$(\tau, \text{动作嵌入})$$ 扩展为 $$(\tau, h_t)$$；②新增 **cross-attention 块**（LDM 式：U-Net 特征做 query，$$h_t$$ 与 $$\tau$$ 做 key/value）——DIAMOND 完全没有 attention；帧条件保留最近 $$L=4$$ 帧；
3. **训练技巧**：Mamba parallel scan 一次算出整段 $$h_i$$；**观测损失只在随机单时间步 $$j$$ 上算**（burn-in $$B=4$$，段长 $$T=19$$）——绕开递归模块逐帧算扩散损失的爆炸成本，效率与 DIAMOND 持平；奖励/终止损失整段交叉熵平均；
4. **玩家协议原封不动**：actor-critic 完全照抄 DIAMOND（REINFORCE + λ-return + 熵正则，超参同 $$\gamma=0.985, \lambda=0.95, H=15$$）——想象前先 burn-in 真实轨迹初始化 LSTM 与 Mamba 状态，再滚 15 步梦；
5. **采样不变**：确定性 3 步 Euler——**NFE 仍是 3，蒸馏压缩空间与 DIAMOND 同构**。

## 4. 核心公式

$$h_{t}=f_{\phi}\big(h_{t-1},\,o_{t},\,a_{t}\big),\quad \hat{o}_{t+1}\sim p_{\phi}\big(\hat{o}_{t+1}\,\big|\,h_{t}\big),\quad \hat{r}_{t}\sim p_{\phi}\big(\hat{r}_{t}\,\big|\,h_{t}\big),\quad \hat{d}_{t}\sim p_{\phi}\big(\hat{d}_{t}\,\big|\,h_{t}\big)$$

**直觉解释**：一个隐状态 $$h_t$$ 供养三个头——画帧（扩散）、读分（奖励）、判终（done）——**记忆是一切预测的公共入口**。对比 DIAMOND：判头自带独立 LSTM 各记各的，画面只看 4 帧，两套记忆互不通气。

$$\mathcal{L}(\phi)=w_{o}\,\mathcal{L}_{\text{obs}}(\phi)+w_{r}\,\mathcal{L}_{\text{rew}}(\phi)+\mathcal{L}_{\text{end}}(\phi)+\log\big(w_{o}^{-1}\big)+\log\big(w_{r}^{-1}\big)$$

**直觉解释**：harmonizer 让"像素级的大损失"与"标量级的小损失"自动配平——$$w$$ 是可学的天平砝码，$$\log(w^{-1})$$ 项防止砝码无限增大（保持 $$\mathbb{E}[w\cdot\mathcal{L}]=1$$ 的变分约束）。消融显示去掉后 BankHeist 里角色直接从预测中消失。

- 需要的前置：[DIAMOND](/ai-fa/explore/10-Papers/09-世界模型与JEPA/Diffusion for World Modeling- Visual Details Matter in Atari（DIAMOND）)（基座与训练循环）、[Mamba](/ai-fa/explore/10-Papers/01-架构演进/Mamba- Linear-Time Sequence Modeling with Selective State Spaces（Mamba）)（选择性 SSM 与 parallel scan）、[EDM](/ai-fa/explore/10-Papers/02-生成建模与扩散/Elucidating the Design Space of Diffusion-Based Generative Models（EDM）)（预条件化四系数）

## 5. 与前作/矩阵关系

- ← [DIAMOND](/ai-fa/explore/10-Papers/09-世界模型与JEPA/Diffusion for World Modeling- Visual Details Matter in Atari（DIAMOND）)（像素扩散基座，训练循环与玩家协议全套继承）+ [Mamba](/ai-fa/explore/10-Papers/01-架构演进/Mamba- Linear-Time Sequence Modeling with Selective State Spaces（Mamba）)（记忆引擎）+ HarmonyDream（损失调和，ICML 2024，库内无卡）——"DIAMOND 的 4 帧短记忆换成 Mamba 无界记忆，判头并入"；
- ↔ 对照 Drama（arXiv 2410.08893，库内无卡）：同为"Mamba×WM"，但 Drama 在 **RSSM 潜空间**上做（Dreamer 系），EDELINE 在**像素扩散**上做——正好横跨两大谱系的记忆轴改造，互为镜像；
- ↔ 对照 [WorldDynCache](/ai-fa/explore/10-Papers/09-世界模型与JEPA/WorldDynCache- Risk-Controlled Latent Dynamics Approximation for Diffusion World Models（WorldDynCache）)：同为"扩散 WM 效率/架构改造"近邻族，一个改记忆轴（质量），一个做缓存近似（速度）——都不碰"蒸馏后决策保真"；

## 6. 影响与后续

- Atari 100k 无搜索 MBRL **新 SOTA**（mean 1.866 / median 0.817 / IQM 0.940，3 seeds）；关键单游戏：**Breakout 250.5 vs DIAMOND 132.5**（近翻倍）、Seaquest 2140 vs 551（4 倍）、Hero 12780 vs 5621、Boxing 88.1 vs 86.9；
- 开辟"扩散 WM 记忆轴"：证明 DIAMOND 的短板不是像素生成而是上下文窗口——为后续记忆改造（SSM/attention/token 记忆）提供基准；
- **附录 D.9.4 关键消融**：transformer 版 REM 在 MiniGrid 上与 Mamba 持平，但 Crafter 上低 **29.2%** 且训练慢 25%——"transformer 不是记忆轴的自动更优解"的直接实验证据；
- 效率画像（RTX 4090）：WM 更新快 26.8%，但想象 rollout 每步 24.4ms（SSM 递归+cross-attn 开销）使 actor-critic 更新慢 17.7%——总训练时间与 DIAMOND 持平，**不省计算只增记忆**；

## 7. 读前须知

- **必前置**：[DIAMOND](/ai-fa/explore/10-Papers/09-世界模型与JEPA/Diffusion for World Modeling- Visual Details Matter in Atari（DIAMOND）)、[Mamba](/ai-fa/explore/10-Papers/01-架构演进/Mamba- Linear-Time Sequence Modeling with Selective State Spaces（Mamba）)、[EDM](/ai-fa/explore/10-Papers/02-生成建模与扩散/Elucidating the Design Space of Diffusion-Based Generative Models（EDM）)；
- **易混点**：①$$h_t$$ **不是**潜空间观测——观测仍是全像素直接扩散，$$h_t$$ 只是把"全部历史"压成一个条件向量注入（AGN+cross-attn），与 Dreamer 系"在潜空间里做梦"有本质区别；②团队是台大+NVIDIA（Chun-Yi Lee 组），**不是 DIAMOND 原班人马**——外部团队的接力改进；③观测损失只在单时间步算是为省算力的近似（不是每步都算）——训练信号比 DIAMOND 稀疏但 parallel scan 补偿；④2025-02 提交（v2），**NeurIPS 2025 Spotlight 已核实**（官方代码 github.com/LJH-coding/EDELINE，Python，star 少=复现坑风险，阶段 0 须先跑通官方 demo）；⑤DIAMOND 同为 NeurIPS 2024 Spotlight——连续两代 Spotlight 家族；

> 近邻同族：[WorldDynCache](/ai-fa/explore/10-Papers/09-世界模型与JEPA/WorldDynCache- Risk-Controlled Latent Dynamics Approximation for Diffusion World Models（WorldDynCache）) · [Diffusion Forcing](/ai-fa/explore/10-Papers/09-世界模型与JEPA/Diffusion Forcing- Next-token Prediction Meets Full-Sequence Diffusion（Diffusion Forcing）)

> 数学根基：[扩散条件去噪](/ai-fa/explore/30-Formulas/扩散条件去噪) · [RSSM转移模型](/ai-fa/explore/30-Formulas/RSSM转移模型)（对照：h_t 单流 vs RSSM h+z 双流）
