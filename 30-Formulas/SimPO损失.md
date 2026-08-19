---
type: formula
formula_id: SIMPO-LOSS
aliases: [SimPO损失, Simple Preference Optimization, 无参考偏好优化]
domain: 强化学习与对齐
loss_type: expectation-of-ratio
tags: [formula]
---

# SimPO 损失

## 1. 标准形式

$$\mathcal{L}_{\text{SimPO}}(\theta) = -\,\mathbb{E}\!\left[ \log\sigma\!\left( \frac{\beta}{|y^+|}\log\pi_\theta(y^+\mid x) - \frac{\beta}{|y^-|}\log\pi_\theta(y^-\mid x) - \gamma \right) \right]$$

- 奖励定义：$r(x,y) = \frac{\beta}{|y|}\log\pi_\theta(y\mid x)$——**长度归一化的平均对数似然**
- $\gamma > 0$：目标间距（margin）——$y^+$ 至少赢 $y^-$ 这个分数

## 2. 表示对照表

| 表示名 | 公式核心 | 出处 | 说明 |
|---|---|---|---|
| 长度归一无参考（本库标准） | 如上 | SimPO 2024 | 原始 |
| DPO 对照 | $\beta\log\frac{\pi_\theta}{\pi_{\text{ref}}}$ 比差 | DPO | 见 §3 对比 |

## 3. 直觉解释

- **两大改动**：① 去掉 $\pi_{\text{ref}}$（省一半显存/部署成本）② 奖励按**长度平均**（短回答天然对数概率和更小，不归一会偏好长回答——DPO 隐患之一）
- **为什么敢去参考**：参考的作用是防漂移；SimPO 用"平均对数似然本身当奖励"——隐式自约束（概率和有界）
- **γ 间距**：给 $y^+$/$y^-$ 设胜负线，防止过度自信；实验中 0.3–0.6
- 与 [[30-Formulas/DPO损失]] 的关系：**更简单且实测更强**——"简化者胜"路线的代表

## 4. 出处

| 论文 | 贡献 |
|---|---|
| [[10-Papers/04-强化学习与对齐/SimPO- Simple Preference Optimization with a Reference-Free Reward（SimPO）]] | 提出 |

## 5. 数学概念分解

- [[40-Concepts/期望]]、[[40-Concepts/梯度]]
- [[40-Concepts/KL散度]]（对比理解：无显式 KL 时的隐式约束）

## 6. 与其他公式的关系

- → **简化自** [[30-Formulas/DPO损失]]（去参考 + 长度归一）
- 同族对照：[[30-Formulas/IPO损失]]（理论修正路线）、[[30-Formulas/ORPO损失]]（另一条去参考路线：比率对比）
