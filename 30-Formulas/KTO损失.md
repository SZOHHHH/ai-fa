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

## 教程：点赞点踩的两种梯度（简化 $z_0 = 0$ 读形）

**第 1 步：数据形态。** KTO 宇宙里没有成对 $(y^+, y^-)$——只有两条独立反馈：一条 good（点赞）、一条 bad（点踩），来自不同 prompt 不同用户。

**第 2 步：good 支。** $\beta\log\frac{\pi_{\mathrm{ref}}(y^{\mathrm{good}})}{\pi_\theta(y^{\mathrm{good}})}$ 取负号进 sigmoid——展开即 $\sigma\big(\beta\log\frac{\pi_\theta}{\pi_{\mathrm{ref}}}\big)$。设 $\beta = 0.5$、好样本对数比 $+0.4$：$\sigma(0.5\times0.4) = \sigma(0.2) = 0.550$——**好样本的损失把它的对数比往上抬**（抬到越大 σ 越接近 1，损失 $\to0$）。

**第 3 步：bad 支。** 坏样本对数比 $-0.4$（模型已开始压它）：$\sigma\big(\beta\log\frac{\pi_{\mathrm{ref}}}{\pi_\theta} - z_0\big)$，$z_0 = 0$ 简化下 $= \sigma(0.5\times0.4) = 0.550$——**镜像结构**：坏样本的"对数比往下压"同样让 σ 趋 1、损失趋零。好抬坏压，同一把尺（对数比）的两端。

**第 4 步：前景理论权重。** $\lambda_D = 1.5 > \lambda_P = 1$：总损失里坏样本支 ×1.5——**改掉一个坏回答的梯度力度 > 强化一个好回答**。行为经济学根据（Kahneman–Tversky 损失厌恶：丢 100 元的痛 > 捡 100 元的乐）搬进目标函数：用户生态里一个差评的杀伤力确实大于一个好评的增益。

**第 5 步：$z_0$ 的真实含义。** 完整版里 $z_0$ 含 $\beta\,\mathrm{KL}$ 项——"好/坏"的判定线不是绝对分数而是**相对当前模型自己的平均水平**（模型已很好时，及格线水涨船高）。与 DPO 的相对精神相通，但作用于单样本而非成对差。

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

## 6. 自测

1. KTO 与 DPO 的数据形态差？（成对 $(y^+,y^-)$ vs 独立单标签（点赞/点踩流）——现实反馈生态更贴近后者）
2. $\beta = 0.5$、好样本对数比 $+0.4$：good 支 σ？（$\sigma(0.2) = 0.550$——对数比越高损失越低）
3. $\lambda_D > \lambda_P$ 编码了什么？（损失厌恶——改掉坏回答比强化好回答更重要）
4. $z_0$ 的作用？（动态及格线——相对当前模型平均水位判定好坏，非绝对分数）

## 7. 与其他公式的关系

- → **重构自** [[30-Formulas/DPO损失]] 的数据假设（成对 → 单标签）
- 同族：[[30-Formulas/SimPO损失]]、[[30-Formulas/IPO损失]]、[[30-Formulas/ORPO损失]]
- 理论基础从 [[40-Concepts/Bradley-Terry模型]] 换成前景理论——家族内"换地基"的代表
