---
type: algo
aliases: [RLAIF, Constitutional AI, AI反馈强化学习, 宪法AI]
line: 强化学习与对齐
tags: [algo]
---

# RLAIF / Constitutional AI

## 1. 定义

**非数学语言**：人类偏好标注又贵又慢又不一致。宪法 AI 的方案：给 AI 一部"宪法"（一组行为准则），让 AI 按宪法**自我批评→自我修订→自我对比打分**，产出偏好数据再走 RLHF 流程——人类只在写宪法时出现一次。

**数学语言**：流程与 RLHF 相同（[[30-Formulas/RLHF目标]]），唯一替换：偏好数据 $(y^+ \succ y^-)$ 的标注者从人类换成"遵循宪法的 AI 评判"。

## 2. 本命论文群

| 论文 | 引入/发展了什么 | 年份 |
|---|---|---|
| [[10-Papers/04-强化学习与对齐/Constitutional AI- Harmlessness from AI Feedback（CAI）]] | 宪法式自我改进 + RLAIF 全流程 | 2022 |
| Bai et al. 2022（RLAIF 实验篇） | 证明 AI 反馈 ≈ 人类反馈效果 | 2022 |
| [[10-Papers/04-强化学习与对齐/Self-Rewarding Language Models]] | 更彻底：奖励模型都不要，LLM 自评 | 2024 |
| Constitutional AI 相关：模型规范/模型规约（2024） | 宪法作为治理文件的思想扩展 | 2024 |

## 3. 核心公式

- 复用 [[30-Formulas/RLHF目标]]（仅数据来源替换）
- 宪法修订链：$y \to \text{critique}(y, \text{宪法}) \to \text{revise} \to y'$——无新数学，新在流程

## 4. 数学概念分解

[[40-Concepts/Bradley-Terry模型]]（AI 评判仍产成对偏好）、[[40-Concepts/期望]]、[[40-Concepts/KL散度]]

## 5. 变体与演进

| 变体 | 相比本概念改了什么 | 代表 |
|---|---|---|
| Self-Rewarding | 自评奖励，迭代自我提升 | [[10-Papers/04-强化学习与对齐/Self-Rewarding Language Models]] |
| LLM-as-Judge | 同思想用于**评估**（MT-Bench 等）而非训练 | 2023+ |
| RLAIF-DPO | AI 反馈 + DPO 训练（Zephyr 路线） | 2023 |

## 6. 对比表

| | RLHF | RLAIF/CAI | Self-Rewarding |
|---|---|---|---|
| 偏好标注者 | 人类 | AI（依宪法） | 模型自己 |
| 标注成本 | 高 | 低 | 极低 |
| 偏差风险 | 人类偏见 | AI 偏见（被宪法塑形） | 自我强化循环风险 |
| 可扩展性 | 差 | 好 | 最好 |

**历史地位**：Claude 系列的实际生产路线；"AI 参与 AI 训练"的第一块基石，后续 Self-Rewarding、合成数据回流皆源于此思想。
