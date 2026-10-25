---
type: paper
title: "WorkRover: Scaling Long-Horizon Cowork Agent Training Via Recursive Environment Evolution"
aliases: [WorkRover]
year: 2026
authors: [Hang, He]
venue: arXiv 2610.18067（cs.AI，2026-10-13）
arxiv: "2610.18067v1"
pdf: https://arxiv.org/pdf/2610.18067v1
line: 强化学习与对齐（rl-alignment 轮换）
matrix_coords: [长视野协作智能体训练, 递归环境演化, 测试套件驱动合成(环境/工作上下文/验证器共演化), 环境规模化的缺陷修复环, RL训练基础设施]
tags: [paper, 精化层（摘要级）]
layer: 精化层（摘要级精读）
---
# WorkRover: Scaling Long-Horizon Cowork Agent Training Via Recursive Environment Evolution

> 精化升级 2026-10-14（每日日常处理段，摘要级）：交互环境生成后要测、要修——修任务还得连着工作上下文和验证器一起改；WorkRover 用递归环境演化让构造智能体在测试驱动下三件套共演化，规模化生产长视野训练环境。

## 1. 一句话贡献
给长视野智能体 RL 的瓶颈（交互环境难规模化、生成后有缺陷要迭代修复、改一处需环境/工作上下文/验证器三件同步）提出递归环境演化框架 WorkRover——测试套件驱动的合成管线让构造智能体能对环境做测试-修复循环，环境、上下文与验证器保持对齐地共同演化，从而规模化生产长视野协作训练环境。

## 2. 核心贡献
- **问题重定位**：环境规模化不只是"生成更多"，而是"生成后可迭代精化"——修一个任务的缺陷常牵连其工作上下文与验证器，现有管线对这种联合精化支持不足。
- **递归演化机制**：harness 驱动的合成让构造智能体自测自修（生成→测试→发现缺陷→三件套联合更新→再测），环境质量随轮次递归上升。
- **训练侧收益**：在此环境族上训练的长视野协作智能体（WorkRover agent）能力随环境演化同步扩展（摘要口径；细节数字待精读）。

## 3. 方法概要
（摘要级）①初始生成环境（任务+上下文+验证器三件套）；②构造智能体跑 harness 内测试，定位缺陷；③按缺陷类型联合更新三件套（环境/上下文/验证器对齐地改）；④循环递归直至通过；⑤通过的环境进 RL 训练池，智能体与环境共演化。

## 4. 核心公式
- 递归演化（概念式，摘要级示意）：$$\mathcal{E}_{n+1} = \mathrm{Refine}\left(\mathcal{E}_n,\; \mathrm{TestSignals}(\mathcal{E}_n)\right)$$，$$\mathcal{E} = (\text{任务}, \text{上下文}, \text{验证器})$$（直觉：环境不是一次性产物而是带测试反馈环的软件工件——与"验证器即环境的一部分"的现代评测观一致；正文无核心数学对象，属系统/基础设施论文）

## 5. 与前作/矩阵关系
- 线锚：[GRPO与RLVR](/ai-fa/explore/20-Algorithms/GRPO与RLVR)（下游训练范式）· [过程奖励与结果奖励（PRM-ORM）](/ai-fa/explore/40-Concepts/过程奖励与结果奖励（PRM-ORM）)（验证器=可验证奖励的实现位）· [马尔可夫决策过程](/ai-fa/explore/40-Concepts/马尔可夫决策过程)（环境形式化）
- ≡ 同族：[ProAS](/ai-fa/explore/10-Papers/04-强化学习与对齐/ProAS A Progress-Aware Advantage Shaping Framework for Multi-Turn Agentic Reinforcement Learning)（同日同批：多轮智能体 RL 的算法侧配套——环境侧规模化×信用分配侧修正）· [Can an Agent Learn to Predict Its Own Failure](/ai-fa/explore/10-Papers/04-强化学习与对齐/Can an Agent Learn to Predict Its Own Failure Outcome-Grounded Confidence Calibration in LLM Agents)（评测/信号侧配套）
- ← 前身：环境合成/课程生成线（生成任务+验证器再 RL 训练的一族）→ 此文补"生成后的迭代精化"环节

## 6. 影响后续
- 智能体训练数据基础设施方向：环境当软件工件管理（测试驱动、版本化递归演化）的范式会外溢；验证器共演化观点与可验证奖励工程直接相关。

## 7. 读前须知
- 前置：[GRPO与RLVR](/ai-fa/explore/20-Algorithms/GRPO与RLVR)、[过程奖励与结果奖励（PRM-ORM）](/ai-fa/explore/40-Concepts/过程奖励与结果奖励（PRM-ORM）)（验证器为何是一等公民）；无重数学门槛，属系统论文读法（管线图+harness 设计）。
- 原文：https://arxiv.org/pdf/2610.18067v1 ｜ 在线全文：https://arxiv.org/html/2610.18067v1（本卡摘要级）
