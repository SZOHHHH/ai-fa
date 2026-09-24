---
type: formula
formula_id: RLHF-OBJ
aliases: [RLHF目标, RLHF objective, KL正则化奖励最大化]
domain: 强化学习与对齐
loss_type: expectation-of-ratio
tags: [formula]
---

# RLHF 目标

## 1. 标准形式

$$\max_{\pi_\theta}\ \mathbb{E}_{x \sim \mathcal{D},\ y \sim \pi_\theta(\cdot \mid x)}\!\left[ r_\phi(x, y) \right] - \beta\, D_{\mathrm{KL}}\!\left( \pi_\theta(\cdot \mid x)\ \Big\|\ \pi_{\mathrm{ref}}(\cdot \mid x) \right)$$

- $r_\phi(x, y)$：奖励模型（从人类偏好学出，见 [[40-Concepts/Bradley-Terry模型]]）
- $\pi_{\mathrm{ref}}$：参考策略（通常是 SFT 后的模型）——"别飘太远"的锚
- $\beta$：KL 惩罚系数（本库记号规范 §3）
- **读法**：最大化奖励模型打分，同时别偏离初始语言模型太远

## 2. 表示对照表

| 表示名 | 公式核心 | 出处 | 说明 |
|---|---|---|---|
| KL 正则目标（本库标准） | 如上 | Christiano 2017 / InstructGPT 2022 | 理论标准形 |
| PPO 实现式 | 每步奖励 $r_t - \beta\log\frac{\pi_\theta}{\pi_{\text{ref}}}$ 加进 per-token 奖励 | InstructGPT | KL 摊到每个 token |
| RLAIF 版 | $r_\phi$ 换成 AI 评判（ Constitutional AI 系） | CAI 2022 | 人类 → AI 反馈 |
| 闭式最优解 | $\pi^*(y\mid x) = \frac{1}{Z(x)}\pi_{\mathrm{ref}}(y\mid x)\exp\!\left(\frac{1}{\beta}r(x,y)\right)$ | DPO 推导用 | **Boltzmann 分布形态**——DPO 的起点 |

## 教程：闭式最优解 = Boltzmann 重加权（汇率现场）

**第 1 步：偏好宇宙。** prompt 下只有两个候选 $y^+$/$y^-$；奖励模型打分 $r(y^+) = 1,\ r(y^-) = 0$；SFT 参考模型 $\pi_{\mathrm{ref}} = (0.5, 0.5)$；$\beta = 0.5$。

**第 2 步：套闭式解。** $\pi^*(y) \propto \pi_{\mathrm{ref}}(y)\, e^{r(y)/\beta}$：$y^+$ 的权 $= 0.5\times e^{1/0.5} = 0.5\times e^2 = 3.695$；$y^-$ 的权 $= 0.5\times e^{0} = 0.5$。归一化 $Z = 4.195$：$\pi^* = (0.881,\ 0.119)$——**奖励差 1 分被 β 兑换成 88:12 的概率比**。

**第 3 步：β 就是汇率。** $\beta\to\infty$：$e^{r/\beta}\to1$ → $\pi^* = (0.5, 0.5)$（一分奖励换不动概率，模型不动）；$\beta\to0$：$\pi^*(y^+)\to1$（奖励几乎无限兑换，全押高分——语言崩坏）。$\beta=0.5$ 的中间态 = "信任奖励但保留语言能力"。

**第 4 步：为什么 KL 锚不可省（保险丝现场）。** 奖励模型是从有限偏好数据学的——它爱听的话 ≠ 真话。若 $\beta = 0$ 直接追分：模型找到 reward model 的漏洞（比如说空话刷分），$\pi^*$ 塌到单点；KL 项把每一步的概率变化都记在账上（偏离参考要付费），漏洞收益 < 偏离成本时自动停。

**第 5 步：这个闭式解的地位。** 它证明**奖励可以用策略比表达**：$r = \beta\log\frac{\pi}{\pi_{\mathrm{ref}}} + \beta\log Z$——DPO 把这个反解式代进 [[40-Concepts/Bradley-Terry模型]] 的偏好似然，成对相减时 $Z$ 消掉，得到无需奖励模型、无需采样的纯监督损失（推导链见 [[30-Formulas/DPO损失]]；BT 侧的 Z 消元手算见 [[40-Concepts/Bradley-Terry模型]] §教程）。

## 3. 直觉解释

- 奖励模型会**过拟合**（reward hacking）：模型学会说奖励模型爱听的话而非真话——KL 锚是保险丝
- $\beta$ 大小 = 信任奖励 vs 保持语言能力的平衡：$\beta\to\infty$ 完全不动，$\beta\to 0$ 拼命追分（语言崩坏）
- 闭式解揭示本质：最优策略 = 参考策略 × 奖励的指数重加权（每条候选 $y$ 按 $e^{r/\beta}$ 重新分配概率）——RLHF 就是"软性重新加权"
- 这个闭式解的存在是 DPO 全部推导的地基：**奖励可用策略比表达**

## 4. 出处

| 论文 | 贡献 |
|---|---|
| [[10-Papers/04-强化学习与对齐/Deep reinforcement learning from human preferences（RLHF）]] | RLHF 框架 |
| [[10-Papers/04-强化学习与对齐/Training language models to follow instructions with human feedback（InstructGPT）]] | LLM 规模化落地 |
| [[10-Papers/04-强化学习与对齐/A General Language Assistant as a Laboratory for Alignment（Assistant Lab）]] | 系统比较对齐方法 |
| [[10-Papers/04-强化学习与对齐/Constitutional AI- Harmlessness from AI Feedback（CAI）]] | RLAIF：反馈源换 AI |

## 5. 数学概念分解

- [[40-Concepts/Bradley-Terry模型]]：奖励模型的训练方式
- [[40-Concepts/KL散度]]：正则项
- [[40-Concepts/期望]]：目标骨架
- [[40-Concepts/贝尔曼方程]] / [[40-Concepts/策略梯度定理]]：优化路径（PPO）

## 6. 自测

1. $r = (1, 0)$、$\pi_{\mathrm{ref}} = (0.5,0.5)$、$\beta = 0.5$：$\pi^*$？（softmax 权重 $(e^2, e^0)$ → $(0.881, 0.119)$）
2. $\beta\to\infty$ 与 $\beta\to0$ 各退化成什么？（不动（$\pi^* = \pi_{\mathrm{ref}}$）/ 全押最高分（语言崩坏））
3. KL 锚防的是什么病？（reward hacking——奖励模型过拟合，说它爱听的话；偏离要付费，漏洞收益不足时自动停）
4. 闭式解为什么是 DPO 的地基？（$r = \beta\log\frac{\pi}{\pi_{\mathrm{ref}}}+\beta\log Z$——奖励可用策略比表达，成对相减 $Z$ 消元）

## 7. 与其他公式的关系

- → **由 PPO 优化**：[[30-Formulas/PPO裁剪目标]]（工程主路径）
- → **闭式解反推**：[[30-Formulas/DPO损失]]（理论主路径）——"同一目标的两种解法"是 B2 线核心叙事
- → **简化**：[[30-Formulas/GRPO目标]]（去 critic、组内基线）
- → **无参考变体**：[[30-Formulas/ORPO损失]]（KL 融进对比项）
- 对比 [[30-Formulas/条件流匹配损失]]：同为"期望下优化"，RL 的期望在**策略诱导的分布**上（可采样），生成模型的期望在**固定数据分布**上
