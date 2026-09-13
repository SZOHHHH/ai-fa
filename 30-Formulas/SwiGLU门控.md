---
type: formula
title: SwiGLU门控
status: active
tags: [formula]
---

# SwiGLU门控

## 标准形式


$$
\mathrm{SwiGLU}(x)=\mathrm{Swish}(xW_1)\odot xW_2
$$


## 一句话

门控线性单元的 Swish 变体

**直觉**：门控×双路投影——Transformer FFN 现代默认（族谱定位见 [[40-Concepts/激活函数族]]，Swish = $x\sigma(x)$ 用 [[40-Concepts/sigmoid函数|sigmoid]] 自门控）

## 本命论文

[[GLU Variants Improve Transformer（SwiGLU）]]

> 待办：精读时补"表示对照表"（不同论文的符号差异换算）
