---
type: formula
title: GELU激活
status: active
tags: [formula]
---

# GELU激活

## 标准形式


$$
\mathrm{GELU}(x)=x\Phi(x)\approx 0.5x(1+\tanh(\sqrt{2/\pi}(x+0.044715x^3)))
$$


## 一句话

概率门控线性单元

**直觉**：ReLU 的软开关版

## 本命论文

[[Gaussian Error Linear Units（GELU）]] · 相关论文：SwiGLU

> 待办：精读时补"表示对照表"（不同论文的符号差异换算）
