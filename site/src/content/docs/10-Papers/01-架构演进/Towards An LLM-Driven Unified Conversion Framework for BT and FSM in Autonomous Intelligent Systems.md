---
type: paper
title: "Towards An LLM-Driven Unified Conversion Framework for BT and FSM in Autonomous Intelligent Systems"
aliases: [BT-FSM转换, LLM-BTFSM]
year: 2026
authors: [Qi Zhang, et al.]
venue: arXiv 2026-09
arxiv: "2609.29228v1"
pdf: https://arxiv.org/pdf/2609.29228v1
line: 架构演进
matrix_coords: [行为建模, LLM转换, 自主系统]
tags: [paper]
---

# LLM 驱动的 BT/FSM 双向统一转换框架

## 1. 一句话贡献

用 LLM 做行为树（BT）与有限状态机（FSM）之间的自动双向转换——"循环执行 BT 结构"保住行为完备性、"深度压缩策略+差异化分层转换规则"压住状态爆炸，在多个自主决策场景实现准确可扩的双向转换。

## 2. 核心贡献

- **问题**：BT/FSM 原则上功能等价可互转，但既有转换法在"行为完备性保持"与"模型复杂度爆炸"两头失败；
- **FSM→BT**：设计循环执行 BT 结构让 LLM 准确捕捉 FSM 的循环结构（行为完备性）；
- **BT→FSM**：深度压缩策略（LLM prompt 消除冗余控制节点）+差异化分层转换规则，减少所需子 FSM 数量（治状态爆炸）；
- 消费级自主系统（服务机器人/游戏 agent/智能家居）的实用级转换质量。

## 3. 方法概要

1. FSM→BT 方向：LLM 读入 FSM 状态转移，生成带循环执行节点的 BT——循环语义显式建模而非展开；
2. BT→FSM 方向：先用 prompt 驱动的深度压缩删冗余控制节点，再按分层规则把子树映射为子 FSM；
3. 仿真多场景验证双向准确性与生成模型的可扩展性/可维护性（摘要级：转换规则细节待精读）。

## 4. 核心公式

系统/框架工作，无核心数学公式；概念骨架是两组离散结构的形式等价：FSM=状态集+转移函数（[马尔可夫链](/ai-fa/explore/40-Concepts/马尔可夫链) 的无随机版），BT=模组化控制树。转换=两个形式系统间的编译，"行为完备性"=转换前后可接受执行序列一致。

## 5. 与前作/矩阵关系

- 概念链：[马尔可夫决策过程](/ai-fa/explore/40-Concepts/马尔可夫决策过程)（自主系统行为建模的数学上位框架）、[马尔可夫链](/ai-fa/explore/40-Concepts/马尔可夫链)（FSM 的概率化亲戚）、[Transformer](/ai-fa/explore/20-Algorithms/Transformer)（LLM 引擎）、[思维链（CoT）](/ai-fa/explore/40-Concepts/思维链（CoT）)（结构化转换任务的 prompt 组织）；
- 与我们游戏 RL 线的微弱呼应：游戏 agent 的行为控制层（BT/FSM）恰是 DIAMOND 系 WM 所替代/模拟的"手写控制"层——本卡是工程侧，我们学习侧重。

## 6. 影响后续

LLM 当"形式语言编译器"的应用样本；学术影响有限，工程参考价值在游戏 NPC/机器人行为管线的维护成本。

## 7. 读前须知

[马尔可夫链](/ai-fa/explore/40-Concepts/马尔可夫链)/[马尔可夫决策过程](/ai-fa/explore/40-Concepts/马尔可夫决策过程)（离散状态系统直觉）；BT/FSM 基础语义（游戏开发常识层）。
