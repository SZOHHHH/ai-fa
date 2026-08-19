---
type: formula
title: RSSM转移模型
status: active
tags: [formula]
---

# RSSM转移模型

## 标准形式


$$
h_t=f(h_{t-1},s_{t-1},a_{t-1}),\ q_t\sim p(s_t|h_t,o_t)
$$


## 一句话

Dreamer 的循环状态空间

**直觉**：确定性h+随机z混合潜状态

## 本命论文

[[Learning Latent Dynamics for Planning from Pixels（PlaNet）]] · 相关论文：Dreamer

> 待办：精读时补"表示对照表"（不同论文的符号差异换算）
