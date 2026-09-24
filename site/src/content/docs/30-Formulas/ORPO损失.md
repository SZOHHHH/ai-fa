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

- **odds**：概率的赔率形式 $$\frac{p}{1-p}$$——ORPO 用它的对数比做偏好信号
- **单阶段**：SFT 损失 + 偏好损失一起训——**无需参考模型、无需分开的 SFT 阶段**

## 2. 表示对照表

| 表示名 | 公式核心 | 出处 | 说明 |
|---|---|---|---|
| SFT+OR 组合（本库标准） | 如上 | ORPO 2024 | 原始 |
| DPO 对照 | 参考模型对数比 | DPO | 去 ref 的另一路径 |

## 教程：odds 比率手算 + 饱和刹车

**第 1 步：设定。** 二候选偏好对，当前 $$p_\theta(y^+|x) = 0.6$$、$$p_\theta(y^-|x) = 0.4$$（剩余概率分给词表其他候选）；$$\delta = 1$$。

**第 2 步：算 odds。** $$\mathrm{odds}(y^+) = \frac{0.6}{1-0.6} = 1.5$$；$$\mathrm{odds}(y^-) = \frac{0.4}{1-0.4} = 0.667$$——**odds 是对全词表的赔率**（不是两候选内部的概率比）：一个候选占词表 60% 与占 0.6% 的"统治力"完全不同，odds 忠实记这笔账。

**第 3 步：对比项。** $$\log\frac{1.5}{0.667} = \log 2.25 = 0.811$$ → $$\mathcal{L}_{\text{OR}} = -\log\sigma(0.811) = -\log 0.692 = 0.368$$。

**第 4 步：饱和刹车现场。** 训练把 $$y^-$$ 压到 $$p = 0.01$$、$$y^+$$ 到 0.5：odds 比 $$= \frac{1.0}{0.0101} \approx 99$$，$$\log \approx 4.6$$ → $$\sigma(4.6) = 0.990$$，$$\mathcal{L}_{\text{OR}} = 0.010$$ 且梯度 $$\propto \sigma(1-\sigma) = 0.0098\to0$$——**σ 饱和自动断电**：被彻底拒绝的样本不再产生"继续压"的梯度（与 DPO 的 σ 刹车同款，但 odds 把"压到多低"按全词表刻度记）。

**第 5 步：单阶段的账。** $$\mathcal{L}_{\text{SFT}}(y^+)$$ 与 $$\mathcal{L}_{\text{OR}}$$ 同批训练——SFT 项就是语言能力锚（替代了参考模型与独立 SFT 阶段的职能）。流程账：RLHF（训 RM → PPO，多阶段多模型）→ DPO（SFT → 偏好微调，两阶段）→ ORPO（一锅出）——**对齐工程复杂度的三级降**。

## 3. 直觉解释

- **流程革命**：DPO 系都要"先 SFT 再偏好微调"两步；ORPO 一步到位——偏好对比项直接嵌进 SFT 训练
- **odds 的妙处**：odds 比率对"已被完全拒绝的样本"（$$p\to0$$）惩罚自然放大——自带过优化刹车
- 为什么能去参考：SFT 项本身就是"语言能力锚"——正则作用被合并进目标
- $$\lambda$$ 平衡语言建模与偏好强度

## 4. 出处

| 论文 | 贡献 |
|---|---|
| [ORPO - Monolithic Preference Optimization without Reference Model](/ai-fa/explore/10-Papers/04-强化学习与对齐/ORPO- Monolithic Preference Optimization without Reference Model（ORPO）) | 提出 |

## 5. 数学概念分解

- [期望](/ai-fa/explore/40-Concepts/期望)、[梯度](/ai-fa/explore/40-Concepts/梯度)
- [KL散度](/ai-fa/explore/40-Concepts/KL散度)（对比：隐式约束 vs 显式 KL）

## 6. 自测

1. $$p(y^+) = 0.6,\ p(y^-) = 0.4$$：两 odds 与对数比？（$$1.5$$ 与 $$0.667$$；$$\log 2.25 = 0.811$$）
2. odds 为什么比"两候选概率比"更公？（对全词表刻度——占 60% 与占 0.6% 的统治力不同）
3. 饱和刹车在哪？（$$y^-$$ 被压到 $$p\to0$$ 时 $$\sigma(4.6) = 0.99$$、梯度 $$\sigma(1{-}\sigma)\to0$$——自动断电）
4. ORPO 单阶段靠什么锚语言能力？（$$\mathcal{L}_{\text{SFT}}$$ 项——正则职能被合并进目标）

## 7. 与其他公式的关系

- → **组合/简化自** [DPO损失](/ai-fa/explore/30-Formulas/DPO损失)（去参考）+ SFT 损失（单阶段化）
- 同族：[SimPO损失](/ai-fa/explore/30-Formulas/SimPO损失)（同去参考）、[KTO损失](/ai-fa/explore/30-Formulas/KTO损失)（同数据形态革新）
- → **体现**"流程简化"演进线：RLHF（4 阶段）→ DPO（2 阶段）→ ORPO（1 阶段）
