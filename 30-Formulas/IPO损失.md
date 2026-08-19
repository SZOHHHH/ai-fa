---
type: formula
formula_id: IPO-LOSS
aliases: [IPO损失, Identity Preference Optimization]
domain: 强化学习与对齐
loss_type: regression
tags: [formula]
---

# IPO 损失

## 1. 标准形式

$$\mathcal{L}_{\text{IPO}}(\theta) = \mathbb{E}_{(x, y^+, y^-)}\!\left[ \left( \hat r_\theta(x, y^+) - \hat r_\theta(x, y^-) - \frac{1}{2\beta} \right)^2 \right], \qquad \hat r_\theta = \beta \log\frac{\pi_\theta}{\pi_{\text{ref}}}$$

——把 DPO 的 sigmoid 对数损失换成**平方回归**，回归目标 $\frac{1}{2\beta}$。

## 2. 表示对照表

| 表示名 | 公式核心 | 出处 | 说明 |
|---|---|---|---|
| 平方回归版（本库标准） | 如上 | Azar et al. 2023（"Ψ-PO" 一般框架的实例） | 原始 |
| Ψ-PO 一般式 | 换不同 Ψ 函数得不同算法 | 同上 | 理论框架 |
| DPO 对照 | $-\log\sigma(\beta\Delta_{logp})$ | DPO | 见下 |

## 3. 直觉解释

- **诊断 DPO 的病**：DPO 的 sigmoid 损失在偏好概率已趋于 1 时**梯度仍不归零**——模型继续无底线拉大 $y^+/y^-$ 差距 → 过优化、分布漂移
- **IPO 的修法**：回归到固定目标 $\frac{1}{2\beta}$——**达到目标就停**（有界）
- 目标值 $\frac{1}{2\beta}$ 从哪来：最优策略下偏好差的理论值（从 RLHF-KL 目标的解算出）——"差这么多刚刚好"
- `#loss/regression`：损失家族从 ratio 换成回归——有趣的是 DPO 系在 IPO 这里短暂回归 MSE 家族

## 4. 出处

| 论文 | 贡献 |
|---|---|
| [[10-Papers/04-强化学习与对齐/A General Theoretical Paradigm to Understand Learning from Human Preferences（IPO）]] | 提出 Ψ-PO 框架与 IPO |

## 5. 数学概念分解

- [[40-Concepts/KL散度]]：目标值的推导
- [[40-Concepts/期望]]：数据期望
- [[40-Concepts/范数]]：平方损失

## 6. 与其他公式的关系

- → **修正** [[30-Formulas/DPO损失]] 的过优化病态
- 同族：[[30-Formulas/SimPO损失]]（另一方向的简化：去参考）、[[30-Formulas/KTO损失]]（换理论基础）
- ⊂ **同属** RLHF 闭式解家族（[[30-Formulas/RLHF目标]] §2 闭式解的三个后裔）
