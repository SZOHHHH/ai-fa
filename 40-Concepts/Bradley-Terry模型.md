---
type: concept
aliases: [Bradley-Terry模型, Bradley-Terry Model, BT模型, 偏好模型]
domain: 数学基础
tags: [concept]
---

# Bradley–Terry 模型

## 1. 定义（直觉 → 形式）

**直觉**：给两个回答分高下，只看"谁更被喜欢"（不问喜欢多少）。BT 模型把"偏好概率"与"两回答的潜在分数"挂钩：分数差越大，压倒性偏好越确定。

**形式**：
$$p(y^+ \succ y^- \mid x) = \frac{\exp r(x, y^+)}{\exp r(x, y^+) + \exp r(x, y^-)} = \sigma\!\left( r(x, y^+) - r(x, y^-) \right)$$
- $r(x, y)$：潜在奖励/分数（人类偏好 induce 出来的标量）
- $\sigma$：sigmoid
- **反向解出奖励**（DPO 的钥匙）：给定偏好数据与最优策略，$r(x,y) = \beta \log \frac{\pi(y\mid x)}{\pi_{\text{ref}}(y\mid x)} + \beta \log Z(x)$——奖励被策略对数比表达！

## 2. 数学形式

- **历史**：Bradley & Terry 1952，成对比较统计模型（体育排名、推荐系统同款）
- **与 RLHF 的连接**：奖励模型 $r_\phi$ 的训练损失 = BT 模型的负对数似然（见 [[30-Formulas/RLHF目标]]）
- **与 DPO 的连接**：把 BT 的闭式奖励代回 RLHF 目标 → [[30-Formulas/DPO损失]]——"奖励模型"被彻底内嵌
- **局限**：只建模成对偏好，不建模"好多少"（打分模型/回归头如 KTO 所批评）

## 3. 为什么 AI 鄙需要它

| 出现场景 | 用法 |
|---|---|
| [[30-Formulas/RLHF目标]] | 奖励模型的训练损失 |
| [[30-Formulas/DPO损失]] | 闭式反推的起点 |
| [[30-Formulas/KTO损失]] | 部分继承（前景理论改写），见其对照表 |
| LLM-as-Judge | 成对比较评估的统计基础 |

## 4. 常见误区

- **误区**：BT 给出"绝对分数"——只对**差**敏感（分数整体平移不变），绝对值无意义
- **误区**：偏好概率 = 质量概率——是"被选中概率"，受提问方式影响
- **误区**：BT 假设传递性——模型形式上传递，人类偏好未必（非理性循环）

## 5. 相关概念

- [[40-Concepts/KL散度]]：RLHF 目标里的正则（与 BT 相遇处）
- [[40-Concepts/期望]]：似然最大化
- [[30-Formulas/DPO损失]]：最重要的派生公式
