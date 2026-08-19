---
type: formula
formula_id: ORPO-LOSS
aliases: [ORPO损失, Odds Ratio Preference Optimization, 单调偏好优化]
domain: 强化学习与对齐
loss_type: expectation-of-ratio
tags: [formula]
---

# ORPO 损失

## 1. 标准形式

$$\mathcal{L}_{\text{ORPO}}(\theta) = \mathbb{E}\Big[ \underbrace{\mathcal{L}_{\text{SFT}}(\phi(y^+))}_{\text{语言建模}} + \underbrace{\lambda\, \mathcal{L}_{\text{OR}}}_{\text{偏好对比}} \Big]$$

其中**odds 比率项**：
$$\mathcal{L}_{\text{OR}} = -\log\sigma\!\left( \delta\log\frac{\mathrm{odds}_{\theta}(y^+)}{\mathrm{odds}_{\theta}(y^-)} \right), \qquad \mathrm{odds}_{\theta}(y) = \frac{p_\theta(y\mid x)}{1 - p_\theta(y\mid x)}$$

- **odds**：概率的赔率形式 $\frac{p}{1-p}$——ORPO 用它的对数比做偏好信号
- **单阶段**：SFT 损失 + 偏好损失一起训——**无需参考模型、无需分开的 SFT 阶段**

## 2. 表示对照表

| 表示名 | 公式核心 | 出处 | 说明 |
|---|---|---|---|
| SFT+OR 组合（本库标准） | 如上 | ORPO 2024 | 原始 |
| DPO 对照 | 参考模型对数比 | DPO | 去 ref 的另一路径 |

## 3. 直觉解释

- **流程革命**：DPO 系都要"先 SFT 再偏好微调"两步；ORPO 一步到位——偏好对比项直接嵌进 SFT 训练
- **odds 的妙处**：odds 比率对"已被完全拒绝的样本"（$p\to0$）惩罚自然放大——自带过优化刹车
- 为什么能去参考：SFT 项本身就是"语言能力锚"——正则作用被合并进目标
- $\lambda$ 平衡语言建模与偏好强度

## 4. 出处

| 论文 | 贡献 |
|---|---|
| [[10-Papers/04-强化学习与对齐/ORPO- Monolithic Preference Optimization without Reference Model（ORPO）]] | 提出 |

## 5. 数学概念分解

- [[40-Concepts/期望]]、[[40-Concepts/梯度]]
- [[40-Concepts/KL散度]]（对比：隐式约束 vs 显式 KL）

## 6. 与其他公式的关系

- → **组合/简化自** [[30-Formulas/DPO损失]]（去参考）+ SFT 损失（单阶段化）
- 同族：[[30-Formulas/SimPO损失]]（同去参考）、[[30-Formulas/KTO损失]]（同数据形态革新）
- → **体现**"流程简化"演进线：RLHF（4 阶段）→ DPO（2 阶段）→ ORPO（1 阶段）
