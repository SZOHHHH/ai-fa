---
type: concept
aliases: [思维链, Chain-of-Thought, CoT, 推理链]
domain: 推理
tags: [concept]
---

# 思维链 CoT

## 1. 定义（直觉 → 形式）

**直觉**：问模型"答案是什么"常答错；问它"一步一步想，把过程写出来"正确率大涨——**生成的中间 token 是免费的计算**。像做数学题打草稿：草稿不是答案，但没有草稿做不对。

**形式**：自回归分解的视角（Wei et al. 2022 的核心洞察）：
$$p(y \mid x) = \frac{p(y, z \mid x)}{p(z \mid x, y)} \le p(y, z \mid x)$$
（$z$ = 中间推理步）——**先给 $z$ 再给 $y$ 的联合概率 ≥ 直接给 $y$**。且 CoT 把推理"外化"成序列计算：Transformer 单层是固定深度电路，但生成 $k$ 个推理 token = 展开成 $k$ 层深度的计算图。

## 2. 数学形式

- **计算深度论证**：常数深度的 Transformer 表达能力有限（电路复杂度类 TC⁰）；CoT 步数 $t$ 使可表达问题类随 $t$ 扩展（如迭代算法、组合问题）——"时间换深度"
- **涌现性**：CoT 增益随模型规模阶跃（小模型 CoT 反而降分）——[[10-Papers/01-架构演进/Language Models are Few-Shot Learners（GPT-3）]] 规模叙事的延续
- **测试时计算**（2024–25 主线）：答案质量随"思考预算"（采样条数/步长）提升——o1/R1/s1 的经济学

## 3. 为什么 AI 需要它

| 出现场景 | 用法 |
|---|---|
| [[10-Papers/07-推理模型/Chain-of-Thought Prompting Elicits Reasoning in Large Language Models（CoT）]] | 提出（few-shot CoT） |
| [[10-Papers/07-推理模型/Self-Consistency Improves Chain of Thought Reasoning in Language Models（Self-Consistency）]] | 多数投票增强 |
| [[10-Papers/07-推理模型/Tree of Thoughts- Deliberate Problem Solving with Large Language Models（ToT）]] | 链 → 树（搜索化） |
| [[10-Papers/07-推理模型/ReAct- Synergizing Reasoning and Acting in Language Models（ReAct）]] | 推理+行动交织 |
| R1/o1 | RL 训练自发长 CoT（见 [[10-Papers/04-强化学习与对齐/DeepSeek-R1- Incentivizing Reasoning Capability in LLMs via Reinforcement Learning（R1）]]） |

## 4. 常见误区

- **误区**：CoT 只是提示工程——它揭示的是**架构深度与生成长度的等价性**（理论意义远超 prompt）
- **误区**：中间步骤写出来=模型"真的在推理"——可解释性与忠实度是两个问题（CoT 忠实度研究是独立方向）
- **误区**：所有任务受益——简单任务 CoT 无益甚至有害（涌现阈值以下）

## 5. 相关概念

- [[40-Concepts/马尔可夫链]]：生成即逐步展开
- [[40-Concepts/期望]]：Self-Consistency 的边缘化视角
- [[30-Formulas/GRPO目标]]：R1 时代 CoT 被 RL 塑形
