---
type: formula
formula_id: GRPO-OBJ
aliases: [GRPO目标, Group Relative Policy Optimization, 组相对策略优化]
domain: 强化学习与对齐
loss_type: expectation-of-ratio
tags: [formula]
---

# GRPO 目标

## 1. 标准形式

$$\mathcal{J}_{\text{GRPO}}(\theta) = \mathbb{E}_{x \sim \mathcal{D},\ \{y_i\}_{i=1}^G \sim \pi_{\text{old}}(\cdot\mid x)}\!\left[ \frac{1}{G}\sum_{i=1}^{G} \frac{1}{|y_i|}\sum_{t=1}^{|y_i|} \min\!\left( \rho_{i,t}(\theta)\, \hat{A}_{i,t},\ \text{clip}(\rho_{i,t}, 1-\epsilon, 1+\epsilon)\,\hat{A}_{i,t} \right) - \beta\, D_{\mathrm{KL}}(\pi_\theta \| \pi_{\text{ref}}) \right]$$

其中**组内相对优势**（GRPO 的灵魂）：
$$\hat{A}_{i,t} = \hat{A}_i = \frac{r_i - \mathrm{mean}(\{r_1, \dots, r_G\})}{\mathrm{std}(\{r_1, \dots, r_G\})}$$

- $G$：同一 prompt 采样的回答数（组，典型 4–64）
- $r_i$：每个回答的奖励（规则打分/奖励模型）
- **同一回答内所有 token 共享该回答的优势**（无 per-token credit）

## 2. 表示对照表

| 表示名 | 公式核心 | 出处 | 说明 |
|---|---|---|---|
| 组相对版（本库标准） | 如上 | DeepSeekMath 2024 | 原始 |
| KL 估计式 | $D_{KL}$ 用无偏低方差估计 $\frac{\pi_{\text{ref}}}{\pi_\theta} - \log\frac{\pi_{\text{ref}}}{\pi_\theta} - 1$ | 同上 | k3 估计器 |
| Dr. GRPO | 去掉 std 归一化与长度项修正（偏置修复） | Liu et al. 2025 | 消除长度/难度偏置 |
| R1 版 | 规则奖励（答案对错 + 格式分）替代奖励模型 | DeepSeek-R1 2025 | RLVR 范式 |

## 3. 直觉解释

- **去 critic**：PPO 需要 $V_\phi$ 网络算优势 → 显存翻倍、训练抖。GRPO：**同一题让模型做 G 遍，组内标准化**当优势——"比同组平均好就是正优势"
- **为什么组内基线合法**：蒙特卡洛基线（同状态多个回报取均值）的无偏替代——正是 [[40-Concepts/贝尔曼方程]] 误区区说的"组均值 = V 的蒙特卡洛替身"
- **数学可读性**：整个目标 = PPO 裁剪项 + KL 锚 + 换掉的优势估计器——**三处改动，一个不剩**
- **代价**：每个 prompt 要生成 G 个样本（推理成本 ×G）；稀疏奖励下组内全对/全错时优势全零（梯度消失）
- `#loss/expectation-of-ratio`

## 4. 出处

| 论文 | 贡献 |
|---|---|
| [[10-Papers/04-强化学习与对齐/DeepSeekMath- Pushing the Limits of Mathematical Reasoning in Open Language Models（DeepSeekMath）]] | 提出 GRPO |
| [[10-Papers/04-强化学习与对齐/DeepSeek-R1- Incentivizing Reasoning Capability in LLMs via Reinforcement Learning（R1）]] | GRPO + 规则奖励训练推理（规模化证明） |
| [[10-Papers/04-强化学习与对齐/Proximal Policy Optimization Algorithms（PPO）]] | 裁剪目标来源 |

## 5. 数学概念分解

- [[40-Concepts/重要性采样]]：比率 $\rho_{i,t}$
- [[40-Concepts/期望]]：组内均值与批均值
- [[40-Concepts/KL散度]]：参考锚
- [[40-Concepts/贝尔曼方程]]：优势概念的出处（组均值是 V 的替身）

## 6. 与其他公式的关系

- → **简化自** [[30-Formulas/PPO裁剪目标]]（裁剪保留）+ [[30-Formulas/RLHF目标]]（KL 锚保留），仅换优势估计
- 对比 [[30-Formulas/DPO损失]]：在线采样组对比 vs 离线成对对比
- → **服务于** R1 的纯 RL 训练路线（[[10-Papers/04-强化学习与对齐/DeepSeek-R1- Incentivizing Reasoning Capability in LLMs via Reinforcement Learning（R1）]]，与线 7 交叉）
- → **被修正**：Dr. GRPO（长度偏置）——"每个后面的算法优化前面"的最新一环
