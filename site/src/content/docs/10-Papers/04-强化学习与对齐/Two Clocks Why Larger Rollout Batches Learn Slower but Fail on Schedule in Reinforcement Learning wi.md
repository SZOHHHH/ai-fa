---
type: paper
title: "Two Clocks: Why Larger Rollout Batches Learn Slower but Fail on Schedule in Reinforcement Learning with Verifiable Rewards"
aliases: [Two Clocks, 双时钟]
year: 2026
authors: [Yuante Li]
venue: arXiv 2610.18853（cs.LG/cs.AI，2026-10-13）
arxiv: "2610.18853v1"
pdf: https://arxiv.org/pdf/2610.18853v1
line: 强化学习与对齐（rl-alignment 轮换）
matrix_coords: [RLVR批尺度标度律, 平方根学习率规则再审视, 双时钟框架(进步钟vs崩溃钟), 临界批大小, 比率裁剪延迟崩溃, GRPO实测(Qwen2.5-Math-1.5B,16×批幅)]
tags: [paper, 精化层（摘要级）]
layer: 精化层（摘要级精读）
---
# Two Clocks: Why Larger Rollout Batches Learn Slower but Fail on Schedule in Reinforcement Learning with Verifiable Rewards

> 精化升级 2026-10-14（每日日常处理段，摘要级）：把 RLVR 大批训练拆成"进步钟/崩溃钟"两只时钟——平方根学习率规则保住的是每样本一阶漂移而非进步，曲率损耗让大批判得更少更长、输得更多。

## 1. 一句话贡献
提出双时钟框架分离"推进所需的样本"与"崩溃前消耗的样本"：在局部二次模型下，平方根学习率规则只保每样本一阶漂移、不保进步——更大批次更新更少更长、曲率损失更多，存在学习率依赖的临界批大小，超过它样本效率反而退化；崩溃钟的样本数沿平方根规则近似不变（按点崩溃），据此推出"先小批起步、崩溃前切大批"的实用 RLVR 调度。

## 2. 核心贡献
- **双时钟分解**：把"学习进度"与"训练崩溃"当成两只独立计时的钟，分别建模——大批慢学（曲率损耗）与按点崩溃（drift-threshold 假设）由此可同时成立。
- **平方根规则的二阶审计**：$$\sqrt{B}$$ 学习率缩放在一阶（每样本漂移）意义上近似保进度，但在局部二次模型下不保——大更新吃更多曲率亏，给出学习率依赖的临界批大小 $$B^\ast$$。
- **实证覆盖**：Qwen2.5-Math-1.5B 上 $$16\times$$ 批幅受控 GRPO 实验同时支持两钟预测；比率裁剪延迟崩溃（大批尤甚）但进步差距仍在；结论在另一数据集、通用检查点与 7B 模型上复现。

## 3. 方法概要
（摘要级）①局部二次模型下分析每更新进步量（一阶漂移−二阶曲率项）随批大小/学习率的变化；②drift-threshold 假设刻画崩溃钟（参数漂移越过阈值即崩，样本数近似不变）；③受控 GRPO 扫批大小×16 验证两钟；④检查比率裁剪（PPO 式）与放宽裁剪的作用——延迟崩溃 vs 短暂提速的取舍；⑤产出调度建议：低于临界批起步、崩溃前切大批。

## 4. 核心公式
- 平方根规则：$$\eta(B) = \eta_0 \sqrt{B / B_0}$$（直觉：一步一大步、步数等比减少——一阶近似下每样本漂移不变，这是它"看起来对"的原因）
- 局部二次模型下的每更新进步（统一记号，摘要级重构）：$$\Delta \approx \eta\, \lVert g \rVert - \tfrac{1}{2} \eta^2\, g^\top H g$$（直觉：第二项是曲率罚——大 $$\eta$$ 的平方放大它，大批"更少更长"的更新累计曲率亏，进步钟变慢；$$H$$ 为局部 Hessian）
- 崩溃钟（概念式）：$$T_{\text{fail}} \approx N_{\text{fail}} / B$$ 沿平方根规则近似不变（直觉：能熬过的总样本数 $$N_{\text{fail}}$$ 是批大小不敏感量——"按点崩溃"而非按更新崩溃）

## 5. 与前作/矩阵关系
- 线锚：[GRPO与RLVR](/ai-fa/explore/20-Algorithms/GRPO与RLVR)（实验载体）· [PPO裁剪目标](/ai-fa/explore/30-Formulas/PPO裁剪目标)（比率裁剪的角色：延迟崩溃的工具）· [策略梯度定理](/ai-fa/explore/40-Concepts/策略梯度定理) · [梯度下降与优化器谱系](/ai-fa/explore/20-Algorithms/梯度下降与优化器谱系)（批尺度-学习率标度律谱系：大批=大学习率话题的 RL 版）
- ← 前身：RLVR 大批+sqrt LR 惯例（π0.5/DAPO 系工程实践）→ 此文给出"何时该用大批"的机制解释
- ≡ 同族：[DAPO](/ai-fa/explore/10-Papers/04-强化学习与对齐/DAPO- An Open-Source LLM Reinforcement Learning System at Scale（DAPO）)（大批系统侧）· [DeepSeekMath](/ai-fa/explore/10-Papers/04-强化学习与对齐/DeepSeekMath- Pushing the Limits of Mathematical Reasoning in Open Language Models（DeepSeekMath）)（GRPO 出处）· [Token-wise IS](/ai-fa/explore/10-Papers/04-强化学习与对齐/Enabling Token-wise Importance Sampling in Off-Policy RLVR with Proximal KL Regularization)（同日同批：GRPO 训练动力学的 off-policy 数据侧——那边管"旧数据怎么校正"，这边管"大批怎么调度"）

## 6. 影响后续
- RLVR 训练调度的机制级指南（临界批起步+崩溃前切批）；"进步/崩溃双钟"语言给后续批尺度研究提供分解框架。

## 7. 读前须知
- 前置：[策略梯度定理](/ai-fa/explore/40-Concepts/策略梯度定理)、[PPO裁剪目标](/ai-fa/explore/30-Formulas/PPO裁剪目标)（裁剪如何截断大比率）、二阶优化的曲率直觉（$$g^\top H g$$ 为何随步长平方增长）。
- 原文：https://arxiv.org/pdf/2610.18853v1 ｜ 在线全文：https://arxiv.org/html/2610.18853v1（本卡摘要级，正文含连续时间分析与调度推导）
