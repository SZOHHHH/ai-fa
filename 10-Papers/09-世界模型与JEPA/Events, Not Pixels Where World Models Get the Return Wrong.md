---
type: paper
title: "Events, Not Pixels: Where World Models Get the Return Wrong"
aliases: [Events Not Pixels, 事件非像素]
year: 2026
authors: [Haoyue Liu, Xiaoying Tang]
venue: arXiv 2026（CUHK-Shenzhen/FNii）
arxiv: "2610.29435v1"
pdf: https://arxiv.org/pdf/2610.29435v1
line: 世界模型与JEPA
matrix_coords: [诊断(评测), 显式像素, 游戏控制(RL)]
tags: [paper]
---
# Events, Not Pixels: Where World Models Get the Return Wrong

> 261026 精读升级（在线全文 arxiv.org/html/2610.29435v1）。

## 1. 一句话贡献
提出 **transition 级替换诊断**：把世界模型想象 rollout 里选中的转移换成真实转移，测 return 误差降多少——证明 **return 误差集中在少数"事件转移"（得分/终止步），而这些帧的渲染质量与普通帧无异，MSE/SSIM/LPIPS 完全定位不到它们**。

## 2. 核心贡献
- **诊断工具**：每游戏训一个冻结无记忆检测器（从相邻帧对读 reward 符号与终止标志），四臂替换——事件臂 / 预算匹配随机臂 / 补集臂（非事件）/ 全真臂——把"误差在哪"变成可测量的对照实验。黑盒，直接适用于已发布 checkpoint（DIAMOND/IRIS/Simulus 三家族、26 个 Atari-100k 游戏）。
- **发现 1（定位）**：44 个模型-集合对中 39 个事件臂胜出（中位 +44pt）；恢复事件转移消除**中位 70% 的 return 误差**，但事件帧像素误差与普通帧之比中位仅 0.85——**按 MSE/SSIM/LPIPS 最大误差选点修复，效果不如随机选点**（15%/11%/15% vs 随机 17%）。
- **发现 2（结构）**：确定性模型漏掉的事件**不是画错时间而是根本没画出来**（8 步容差只救回少数，至少 76% 的召回缺口仍在）；预注册规则（基线事件召回 <0.4 ⇒ 扩散网络能修复）**4/4 命中**；修复来自扩散网络本身而非采样（同网络换 MSE 目标也能修）。
- **决策相关性**：事件替换把 8 选 1 计划排序的 pairwise accuracy 在 7/7 个可靠对上全部提升，top-1 regret 0.565→0.141——**携带 return 误差的转移也正是决定计划选择的转移**；DMC 稀疏奖励任务（cartpole +54pt）同样集中。

## 3. 方法概要
1. **探针构造**：一段真实上下文 + 固定动作序列；世界模型从同一上下文想象 rollout，模拟器回放同一动作得真实 rollout——两者只差"谁画的帧"。
2. **冻结检测器**：每游戏一次训练，独立数据上 reward 事件 F1 达标才准入（防止检测器自身成为误差源）；reward 只取符号（Atari-100k 惯例，全游戏同尺度）。
3. **替换与对照**：掩码 m 选中若干转移，帧对（含前一帧）整体换成真实帧再过检测器重算 return；事件臂按"真实 reward≠0 或终止"选点并向前后各膨胀 1 步；随机臂取同数步数（预算匹配——随机也会偶然命中事件，lift 只记超出运气部分）。
4. **修复实验**：确定性 MSE 预测器 vs 同数据训练的扩散模型，比较事件召回 / return 误差 / 计划排序；判据规则在看到结果前书面记录（预注册）。

## 4. 核心公式
- 想象回报（原文式(1)，记号统一改写）：$\hat{G}=\sum_{t=1}^{H}\gamma^{t}\,\text{sgn}(\hat{r}_t)$，其中 $\hat{r}_t=\phi(\hat{o}_{t-1},\hat{o}_t,a_t)$ 由检测器 $\phi$ 从帧对读出，首个终止截断 —— **直觉：planner 排序动作序列用的就是这个量；reward 只留符号是为了 26 个游戏共用一把尺**。
- 相对修复（原文式(2)）：$\text{Fix}(m)=1-\dfrac{\lvert\hat{G}(m)-G\rvert}{\lvert\hat{G}(\varnothing)-G\rvert}$（对全真臂另有归一）—— **直觉：只换 m 选中的那几步，return 误差掉多少，就说明误差"住"在那几步**。
- 定向优势（原文式(3)）：$\text{Lift}=\text{Fix}(m_{\text{event}})-\text{Fix}(m_{\text{random}})$，两臂步数相同 —— **直觉：扣除"随机也偶尔砸中事件"的运气后，事件定向还值多少分**。

## 5. 与前作/矩阵关系
- ≡ 同族诊断：[[Decision-Metric Alignment in Latent World Models Diagnostics and Action-Conditioned Objectives for MPC Planning]]（DMA 是潜空间 WM 的"决策-度量错位"诊断+目标修复，本文是像素 WM 的"事件定位"诊断+网络类修复——同一病理两种穿刺点）· [[WorldExam- Benchmarking World Models from Apparent Appearance to Inherent Reactivity（WorldExam）]]（评测基准同族）
- ↔ 蒸馏侧对照：[[Causal Forcing- 自回归扩散蒸馏的正确姿势（Causal Forcing）]]（蒸馏家族只保生成指标——本文恰好证明生成指标定位不到决策错误，为"蒸馏目标缺决策保真"提供病理学证据）
- ← 方法地基：[[20-Algorithms/世界模型]]（想象规划管线）· [[30-Formulas/DDPM训练目标]]（修复实验的扩散网络）

## 6. 影响后续
- 预注册规则（召回 <0.4 ⇒ 扩散修复有效）是"可预测修复"方法论范本，可迁移到蒸馏修复链的先验登记。
- 倡议：WM 评测应加"return 误差在哪里发生"，不止"帧画得多好"——评测规范级影响。
- References 里近邻待跟踪：Not all errors matter（2609.32322，决策相关误差预测规划质量）、Cloning Deterministic Worlds、kinematic null 诊断（2607.05966）、event-aware WM（2601.19336）。

## 7. 读前须知
- [[40-Concepts/马尔可夫决策过程]]（reward/return/折扣）· [[20-Algorithms/世界模型]]（想象规划：Dreamer/MuZero 系管线）· [[Diffusion for World Modeling- Visual Details Matter in Atari（DIAMOND）]]（被检家族代表）
- 统计上需要：符号检验、探针 bootstrap 区间、预注册（pre-registration）的基本概念。
