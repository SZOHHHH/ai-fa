---
type: concept
aliases: [过程奖励模型, PRM, Outcome Reward Model, ORM, 结果奖励, 验证器]
domain: 推理
tags: [concept]
---

# 过程奖励 vs 结果奖励（PRM/ORM）

## 1. 定义（直觉 → 形式）

**直觉**：检查数学作业两种方式——只看最后答案对不对（**结果奖励 ORM**）vs 每一步都批改（**过程奖励 PRM**）。ORM 便宜但粗糙（蒙对也算对）；PRM 精确但贵（每步要人工标注）。

**形式**：
- **ORM**：$r(y) = \mathbb{I}[\text{最终答案正确}]$（或学习型打分）——[[30-Formulas/GRPO目标]] 的 RLVR 默认
- **PRM**：$r(z_t \mid x, z_{<t})$——逐步骤打分（$z_t$ 为第 t 个推理步）
- PRM 引导的搜索：$p(\text{选路径}) \propto \prod_t \sigma(r(z_t))$（best-of-N 加权）或束搜索剪枝

## 2. 数学形式

- **PRM 训练的标注困境**：逐步人工标注极贵 → "Let's Verify"用**蒙特卡洛估计**：给每步自动采样后继，用最终正确率当该步的价值——$V(z_t) \approx \hat P(\text{最终对} \mid z_{\le t})$
- **PRM800K 数据集**：80 万步级标注——OpenAI 的重投入
- **PRM vs ORM 实证**（Let's Verify）：best-of-N 搜索下 PRM 一致优于 ORM（MATH +11.6%）
- **与 RL 的关系**：PRM 也可当 RL 的密集奖励（每步 reward）——R1 选择了规则 ORM（答案对错）+ 自发长链，PRM 路线在 OpenAI o1 系（推断）

## 3. 为什么 AI 需要它

| 出现场景 | 用法 |
|---|---|
| [[10-Papers/07-推理模型/Let's Verify Step by Step（PRM）]] | PRM 系统验证 |
| [[30-Formulas/GRPO目标]] | R1 的 ORM+规则路线对照 |
| best-of-N 采样 | PRM 当 reranker |
| o1（2024） | 推测采用 PRM 类密集信号（未公开） |

## 4. 常见误区

- **误区**：PRM 一定更好——PRM 本身会错（reward hacking 的面更大：每步都可被钻空子）；ORM 简单鲁棒
- **误区**：PRM 就是分步 ORM——蒙特卡洛估计的 $V(z_t)$ 是"该步后验成功率"，信息量大于单步对错
- **误区**：过程奖励=可解释——分数高不代表推理"合理"，只是与最终正确相关

## 5. 相关概念

- [[40-Concepts/贝尔曼方程]]：$V(z_t)$ 即中间状态的价值函数——PRM 是"推理的 critic"
- [[40-Concepts/思维链（CoT）]]：作用对象
- [[30-Formulas/GRPO目标]]：另一条路线
