---
type: formula
formula_id: KTO-LOSS
aliases: [KTO损失, Kahn-Tucker Optimization, Prospect Theoretic Optimization, 前景理论优化]
domain: 强化学习与对齐
loss_type: expectation-of-ratio
tags: [formula]
---

# KTO 损失

## 1. 标准形式

$$\mathcal{L}_{\text{KTO}}(\theta) = \mathbb{E}_{x}\Big[ \lambda_D\, \mathbb{E}_{y^{\mathrm{bad}}\sim\mathcal{D}_{\mathrm{bad}}}\,\sigma\!\left(\beta\log\frac{\pi_{\text{ref}}(y^{\mathrm{bad}}|x)}{\pi_\theta(y^{\mathrm{bad}}|x)} - z_0\right) + \lambda_P\, \mathbb{E}_{y^{\mathrm{good}}\sim\mathcal{D}_{\mathrm{good}}}\,\sigma\!\left(z_0 - \beta\log\frac{\pi_{\text{ref}}(y^{\mathrm{good}}|x)}{\pi_\theta(y^{\mathrm{good}}|x)}\right) \Big]$$

其中基准点（从 SFT 参考的对数比算出）：
$$z_0 = \beta\, \mathrm{KL}\!\left( \pi_\theta \| \pi_{\text{ref}} \right) + \text{参考对数比均值修正}$$

- 数据形态革命：**不需要成对 $(y^+, y^-)$**——只要"好/坏"标签的独立样本（点赞点踩）
- $\lambda_P > \lambda_D$：**前景理论**——人类对损失（坏样本）比收益（好样本）更敏感

## 2. 表示对照表

| 表示名 | 公式核心 | 出处 | 说明 |
|---|---|---|---|
| 前景理论版（本库标准） | 如上 | KTO 2024 | 原始 |
| BT 对照 | 成对 sigmoid 差 | DPO | 数据形态对比的核心差异 |

## 3. 直觉解释

- **动机**：现实中偏好数据常是"这个回答好/不好"的单标签（用户反馈），不是精心的两两比较——KTO 直接吃这种数据
- **前景理论**（Kahneman–Tversky，2002 诺奖）：效用函数在损失端更陡——KTO 用非对称权重 $\lambda$ 编码"改掉一个坏回答的价值 > 强化一个好回答"
- **基准点 $z_0$**：好坏的判定不是绝对分数而是相对"当前模型平均水平"——与 DPO 的相对比对精神相通，但作用于单样本
- 类比：DPO 像"二选一考试"，KTO 像"逐题打分"

## 4. 出处

| 论文 | 贡献 |
|---|---|
| [[10-Papers/04-强化学习与对齐/KTO- Model Alignment as Prospect Theoretic Optimization（KTO）]] | 提出 |

## 5. 数学概念分解

- [[40-Concepts/KL散度]]：基准点构成
- [[40-Concepts/期望]]：好坏两支独立期望
- [[40-Concepts/梯度]]

## 6. 与其他公式的关系

- → **重构自** [[30-Formulas/DPO损失]] 的数据假设（成对 → 单标签）
- 同族：[[30-Formulas/SimPO损失]]、[[30-Formulas/IPO损失]]、[[30-Formulas/ORPO损失]]
- 理论基础从 [[40-Concepts/Bradley-Terry模型]] 换成前景理论——家族内"换地基"的代表
