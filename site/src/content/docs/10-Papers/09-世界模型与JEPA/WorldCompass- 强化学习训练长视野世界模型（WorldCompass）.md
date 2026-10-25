---
type: paper
title: "WorldCompass: Reinforcement Learning for Long-Horizon World Models"
aliases: [WorldCompass]
year: 2026
authors: [Zehan Wang, Tengfei Wang, Haiyu Zhang, Xuhui Zuo, Junta Wu, Haoyuan Wang, et al.]
venue: ICML 2026（腾讯）
arxiv: "2602.09022"
pdf: https://arxiv.org/pdf/2602.09022
line: 世界模型与JEPA
matrix_coords: [RL后训练(修WM本身), 显式像素, 可操作(交互信号)]
tags: [paper]
---

# WorldCompass（腾讯）：用 RL 后训练"驯服"世界模型

## 1. 一句话贡献

**把 RL 从"在世界模型里训策略"翻转为"用交互信号训世界模型本身"**——clip 级 rollout+互补奖励+抗 reward-hacking 设计，让长视野交互 WM 的探索更准更稳（宿主=WorldPlay）。

## 2. 核心贡献

- **范式翻转（本卡核心）**：Dreamer/DIAMOND 用 WM 训 policy（WM 是教练）；WorldCompass 用交互反馈训 WM（RL 是教练）——**WM 从"环境模型"变成"可被 RL 打磨的学生"**；
- **Clip-level rollout 策略**：在同一目标 clip 上生成并评估多个样本—— rollout 效率大增+细粒度奖励；
- **互补奖励函数**：交互遵循准确率 + 视觉质量**两类奖励互补**——**直接监督+显式抑制 reward-hacking**；
- **高效 RL 算法**：negative-aware 微调（负样本感知）+效率优化。

## 3. 方法概要

1. 在训好的交互 WM（WorldPlay）上，采 clip 级多样本 rollout；
2. 双奖励打分：动作响应是否被遵循（interaction-following）+画面质量是否达标；
3. negative-aware 策略梯度微调 WM（好样本推、坏样本拉）；
4. 互补性奖励=天然的 reward-hacking 抑制器（刷单一指标会被另一指标罚）。

## 4. 核心公式

互补奖励（示意）：

`$$r_t = \alpha\,r_{follow}(a_t, \hat x_{t+1}) + (1-\alpha)\,r_{quality}(\hat x_{t+1})$$`

**直觉解释**：单一奖励必然被钻空（只顾画得好不理动作，或反之）——两个正交奖励的**短板效应**让 hacking 无利可图。**与我们 c 线 reward farming（梦里画"裁判眼中有分"的帧，真环境 −81.8）是同一教训的两种处理**：我们是"换蒸馏损失"，他们是"奖励结构上封死"。

## 5. 与前作/矩阵关系

- ← 宿主 [WorldPlay](/ai-fa/explore/10-Papers/09-世界模型与JEPA/WorldPlay- 长期几何一致的实时交互世界建模（HY-WorldPlay）)；RLHF/视频 RLHF（如 VideoScore 系）思想移植；
- → 潜在方向：蒸馏损伤的 RL 修复术（见 §6）。

## 6. 影响后续


## 7. 读前须知

RLHF 基础（reward model+KL 锚）；reward hacking（E1_实验数据台账 c 线节）；clip 级 rollout 与 frame 级 rollout 的效率差。

- → 公式链补记（2601007）：[GRPO目标](/ai-fa/explore/30-Formulas/GRPO目标)（RL 组相对优势）· [贝尔曼方程](/ai-fa/explore/40-Concepts/贝尔曼方程)（长视野价值递归）
