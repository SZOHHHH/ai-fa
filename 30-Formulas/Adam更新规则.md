---
type: formula
title: Adam更新规则
status: active
tags: [formula]
---

# Adam更新规则

## 标准形式


$$
m_t=\beta_1 m_{t-1}+(1-\beta_1)g_t,\ v_t=\beta_2 v_{t-1}+(1-\beta_2)g_t^2,\ \theta\leftarrow\theta-\eta\hat m_t/(\sqrt{\hat v_t}+\epsilon)
$$


## 一句话

Adam优化器的一阶二阶矩自适应更新

**直觉**：动量（方向）除以二阶矩（尺度）=每参数自适应步长

## 本命论文

[[Adam- A Method for Stochastic Optimization（Adam）]] · 相关论文：AdamW

> 待办：精读时补"表示对照表"（不同论文的符号差异换算）
