---
type: matrix
title: RL 稳定化矩阵
axes: { 行: [算法基座], 列: [稳定化机制], 切片: [粒度] }
status: active
updated: 2026-08-17
---

# RL 稳定化矩阵

> [!purpose] 目标
> LLM 强化学习（对齐/推理）的稳定化技术全景——每个崩溃点都有人打过补丁，矩阵暴露"下一个补丁的位置"。

## 1. 轴定义

| 轴 | 取值 | 判据 |
|---|---|---|
| **基座** | PPO 系（含裁剪）、GRPO 系（组相对）、DPO 系（离线） | 目标函数家族 |
| **机制** | 硬裁剪、**软门控**、KL 锚、组基线、序列级比率、（去 critic） | "在哪里防崩" |
| **粒度** | token / 序列 / 组 | 比率与优势的作用域 |

## 2. 矩阵表（基座 × 机制）

| 基座 \ 机制   | 硬裁剪                           | 软门控                                                                         | KL 锚                           | 组基线                            | 序列级比率                                                                   |
| --------- | ----------------------------- | --------------------------------------------------------------------------- | ------------------------------ | ------------------------------ | ----------------------------------------------------------------------- |
| **PPO**   | [[30-Formulas/PPO裁剪目标]]（2017） | [[10-Papers/04-强化学习与对齐/Soft Adaptive Policy Optimization（SAPO）]]（软门控版，2025） | RLHF 目标配 PPO                   | —                              | [[10-Papers/04-强化学习与对齐/Group Sequence Policy Optimization（GSPO）]]（2025） |
| **GRPO**  | [[30-Formulas/GRPO目标]]（继承裁剪）  | SAPO（组+软门控，Qwen 3.5）                                                        | GRPO 自带                        | [[30-Formulas/GRPO目标]]（组均值即基线） | GSPO（组+序列）                                                              |
| **DPO 系** | —（无采样无裁剪）                     | —                                                                           | β 隐式 KL（[[30-Formulas/DPO损失]]） | —                              | SimPO 的长度归一近亲                                                           |

## 3. 格评估（B14 占位层更新：🚩=已占位）

| 格 | 评估 | 结论 |
|---|---|---|
| PPO×软门控 | 3/5/3/3 | SAPO 已占；纯"软化"的 novelty 窗口已关 |
| GRPO×软门控 | 4/5/3/4 | SAPO 覆盖（生产验证），学术空间在理论解释 |
| **序列级比率×理论分析** | 4/4/4/4 | 🚩 **部分被占（B14）**：[[10-Papers/04-强化学习与对齐/Clip Your Sequences Fairly- Enforcing Length Fairness for Sequence-Level RL（LF-clip）]]（2509.09177）已做 GSPO 裁剪的覆盖偏置理论——"为什么几何平均好"的正面理论仍薄，但最近邻已被踩 |
| **优势估计×过程信号**（PRM×GRPO） | 5/4/4/5 | 🚩🚩🚩 **已被合围占死（B14 核查）**：[[10-Papers/04-强化学习与对齐/GRPO is Secretly a Process Reward Model（GRPO-PRM）]]（理论侧：证明 GRPO 隐式就是 PRM + 频率偏置定理，**ICML 2026 已中**）+ [[10-Papers/04-强化学习与对齐/PRPO- Aligning Process Reward with Outcome Reward in Policy Optimization（PRPO）]]（机制侧：过程×结果混合优势的具体形式）+ [[10-Papers/04-强化学习与对齐/Self-Guided Process Reward Optimization with Redefined Step-wise Advantage for Process Reinforcement Learning（SPRO）]]（免标注步级优势）——**B9 榜首格关闭**。残留：频率偏置修复等次生问题（GRPO-PRM 论文自己留的口子） |
| DPO×在线采样（混合范式） | 4/4/3/4 | 迭代 DPO/在线 DPO 线活跃（部分占据），novelty 需在"何时在线/离线切换"的理论 |
| （B14 新）GRPO 偏置修正 | — | 🚩 [[10-Papers/04-强化学习与对齐/DAPO- An Open-Source LLM Reinforcement Learning System at Scale（DAPO）]]（四件套工业化）+ [[10-Papers/04-强化学习与对齐/Understanding R1-Zero-Like Training- A Critical Perspective（Dr.GRPO）]]（去长度/std 偏置）——**B8 遗留补卡**；裁剪半径自适应：[[10-Papers/04-强化学习与对齐/DCPO- Dynamic Clipping Policy Optimization（DCPO）]] |

## 4. 矩阵洞察

1. **"粒度轴"是 2025 的主战场**：token→序列（GSPO）→组（GRPO）——下一个粒度可能是"推理步"（step-level ratio），与 PRM 格天然相交
2. **稳定化 = 对症下药史**：梯度消失（TRPO 信赖域）→ 方差（GAE）→ 越界（裁剪）→ 长链失稳（序列级）→ 硬边界不连续（软门控）——**每个新崩溃模式催生一个格**
3. 跨线观察：SimPO 长度归一 ≈ GSPO 序列几何平均——**对数域平均思想在 RL 与偏好优化同时出现**（与生成侧"均值化"趋势同构！）——这本身可成为一 idea 的土壤

## 5. 待办

- ~~DAPO/Dr.GRPO 补卡~~ ✅ B14 已清（含 GRPO-PRM/SPRO/PRPO/LF-clip/DCPO 共 7 篇占位层）
- 矩阵 Canvas 视图待生成

> 姊妹矩阵：[[偏好优化矩阵]] · [[推理增强矩阵]]

> 全景定位：本矩阵格况见 00-Meta/全景机会格图（12 矩阵汇总）
