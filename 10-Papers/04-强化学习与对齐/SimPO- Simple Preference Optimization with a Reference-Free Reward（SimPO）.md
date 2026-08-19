---
type: paper
title: SimPO - Simple Preference Optimization with a Reference-Free Reward
aliases: [SimPO]
year: 2024
authors: [Yupo Liao, Tianyu Liu, Daniele Bonadiman, Yi Tay, et al.]
venue: NeurIPS 2024
arxiv: "2405.14734"
line: 强化学习与对齐
matrix_coords: [成对比较, 无参考, 无]
tags: [paper]
---

# SimPO

## 1. 一句话贡献

去掉参考模型、用长度归一化平均对数似然当奖励——比 [[Direct Preference Optimization- Your Language Model is Secretly a Reward Model（DPO）|DPO]] 更简单且普遍更强。

## 2. 核心贡献

- **无参考奖励**：$r = \frac{\beta}{|y|}\log\pi(y|x)$
- **长度归一化**：修 DPO 隐含的"偏好长回答"偏置
- **目标间距 γ**：胜负线防过自信

## 3. 方法概要

1. 与 DPO 同样吃成对偏好数据
2. 奖励改为长度归一平均对数似然（无需 $\pi_{\text{ref}}$ 前向）
3. sigmoid(奖励差 − γ) 的负对数为损失
4. 单模型训练——显存与流程双降

## 4. 核心公式

- [[30-Formulas/SimPO损失]]

## 5. 与前作的关系

- 简化了 [[10-Papers/04-强化学习与对齐/Direct Preference Optimization- Your Language Model is Secretly a Reward Model（DPO）]]：去参考 + 长度归一
- 同期平行：ORPO 也去参考但走 odds 路线

## 6. 影响与后续

- 开源社区快速采用（省显存的诱惑）
- "简化者胜"路线代表；Llama-3 系实验中表现优于 DPO

## 7. 读前须知

[[30-Formulas/DPO损失]]（对照阅读最佳）
