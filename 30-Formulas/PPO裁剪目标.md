---
type: formula
formula_id: PPO-CLIP
aliases: [PPO裁剪目标, PPO clip, clipped surrogate objective]
domain: 强化学习与对齐
loss_type: expectation-of-ratio
tags: [formula]
---

# PPO 裁剪目标

## 1. 标准形式

$$\mathcal{L}^{\text{CLIP}}(\theta) = \hat{\mathbb{E}}_t\!\left[ \min\!\left( \rho_t(\theta)\, \hat{A}_t,\ \ \text{clip}(\rho_t(\theta),\ 1-\epsilon,\ 1+\epsilon)\, \hat{A}_t \right) \right]$$

其中重要性比率：
$$\rho_t(\theta) = \frac{\pi_\theta(a_t \mid s_t)}{\pi_{\text{old}}(a_t \mid s_t)}$$

- $\epsilon$：裁剪幅度（典型 0.1–0.2）
- $\min(\cdot, \text{clip}(\cdot))$：**悲观下界**——两个候选取小，保证不会因裁剪而"虚假乐观"

## 2. 表示对照表

| 表示名 | 公式核心 | 出处 | 说明 |
|---|---|---|---|
| 裁剪版（本库标准） | 如上 | PPO 2017 | 默认工程版 |
| 惩罚版 | $\mathbb{E}[\rho\hat A] - \beta\,\mathrm{KL}$（自适应 β） | 同上 | 简单但难调 |
| 完整目标（RLHF 用） | $-\mathcal{L}^{CLIP} + c_1 \mathcal{L}^{VF} - c_2 \mathcal{S}$（值损失 + 熵正则） | InstructGPT | 多任务混合 |
| LLM 版步长 | GAE($\gamma$, $\lambda$) + 全序列 per-token 比率 | InstructGPT/R1 | 逐 token 化 |

## 3. 直觉解释

**逐行拆解 min+clip 的四种情形**（本页灵魂，考试重点）：

| $\hat A > 0$（好动作） | $\hat A < 0$（坏动作） |
|---|---|
| 想拉高概率 → 比率涨过 $1+\epsilon$ 时**截断梯度**（好动作也不能过度自信） | 想压低概率 → 比率跌破 $1-\epsilon$ 时**截断梯度** |
| min 保底：取更悲观的估计 | 注意：$\hat A<0$ 且比率极小时，min 反而选未裁剪项——**允许把坏动作压回安全区**（设计巧妙处）|

- **裁剪 = 一阶版的信赖域**：TRPO 解二次约束问题，PPO 直接把越界梯度归零——效果相当、实现极简
- **为什么 min**：只用 clip 时（$A>0$、比率已越界）继续优化目标会推比率更大→ 返回未裁剪值更差 → min 让优化停在边界
- `#loss/expectation-of-ratio`：比率加权期望族

## 4. 出处

| 论文 | 贡献 |
|---|---|
| [[10-Papers/04-强化学习与对齐/Proximal Policy Optimization Algorithms（PPO）]] | 提出 |
| [[10-Papers/04-强化学习与对齐/Training language models to follow instructions with human feedback（InstructGPT）]] | LLM 对齐标准配置（PPO+GAE+KL to ref） |
| [[10-Papers/04-强化学习与对齐/Deep reinforcement learning from human preferences（RLHF）]] | PPO 服务的上层目标 |

## 5. 数学概念分解

- [[40-Concepts/重要性采样]]：比率定义
- [[40-Concepts/信赖域]]：裁剪的思想源头
- [[40-Concepts/广义优势估计GAE]]：$\hat A_t$ 的估计器
- [[40-Concepts/期望]]：batch 经验期望 $\hat{\mathbb{E}}$
- [[40-Concepts/KL散度]]：对齐场景追加的参考锚

## 6. 与其他公式的关系

- → **简化自** [[30-Formulas/TRPO目标]]：二阶约束 → 一阶裁剪
- → **服务于** [[30-Formulas/RLHF目标]]：LLM 对齐的优化引擎
- → **被简化为** [[30-Formulas/GRPO目标]]：去 critic + 组内基线（LLM 时代重构）
- 对比 [[30-Formulas/DPO损失]]：PPO 路线"显式奖励+在线采样" vs DPO 路线"闭式离线"——对齐两大范式
