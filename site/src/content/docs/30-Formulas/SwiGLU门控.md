---
type: formula
formula_id: SWIGLU
title: SwiGLU门控
aliases: [SwiGLU门控, SwiGLU, GLU, 门控线性单元, Gated Linear Unit]
domain: 架构
tags: [formula]
---

# SwiGLU 门控

## 1. 标准形式

$$\mathrm{FFN}_{SwiGLU}(x) = \Big(\mathrm{Swish}(x W_1)\ \odot\ x W_3\Big)\, W_2, \qquad \mathrm{Swish}(z) = z\,\sigma(z)$$
- **三路投影**：$$W_1$$（门路）、$$W_3$$（货路）、$$W_2$$（输出）——比标准 FFN（两路）多一个矩阵
- $$\odot$$ 逐元素相乘：门控值路
- 维度惯例：$$W_1, W_3 \in \mathbb{R}^{d\times \frac{8}{3}d}$$（取 8/3 而非 4 是为了**让参数量与标准 FFN 持平**——多出的第三个矩阵用更窄的中间层补偿）

## 2. 教程：从一个数字看懂"门×货"

**第 1 步：一维手算。** 设 $$xW_1 \to z_{门} = -1$$，$$xW_3 \to z_{货} = 5$$：
- 门：$$\mathrm{Swish}(-1) = -1\times\sigma(-1) = -1\times0.269 = -0.269$$——**门几乎关死**（负输入 → sigmoid 小 → Swish 输出小）
- 货：5 原样
- 相乘：$$-0.269 \times 5 = -1.34$$——**5 的信息只放行约 27%**（还被带了个负号）
对照：正门 $$\mathrm{Swish}(2) = 2\times0.881 = 1.76$$，货 5 → $$8.8$$——门大开，货几乎全放。

**第 2 步：与旧 FFN 的结构对照。**
- 标准 FFN（ReLU 版）：$$\mathrm{ReLU}(xW_1)\,W_2$$——**一个矩阵既当门又当货**（ReLU 砍负=硬门）
- GLU 系：门与货**分家**——$$\sigma$$ 型门只管开关（0~1），货路线性保真——"**控制流与数据流分离**"（思想同 [LSTM](/ai-fa/explore/20-Algorithms/LSTM) 的门与传送带、[MoE门控公式](/ai-fa/explore/30-Formulas/MoE门控公式) 的路由与专家）
- SwiGLU=门函数选 Swish（比 sigmoid 门/GLU 门在实验里略好，Shazeer 2020 的消融）

**第 3 步：为什么现代 LLM 全用它。** LLaMA/Qwen/DeepSeek 系标配——经验上比 ReLU/GELU FFN 稳定增益约 1% 量级；真正决定性的是**门控线性结构**（分家带来的表达力），Swish 与否是次级选择。配套 [均方根归一化](/ai-fa/explore/30-Formulas/均方根归一化)+RoPE 构成"LLaMA 配方三件套"（[Transformer](/ai-fa/explore/20-Algorithms/Transformer) §5 现代化组件行）。

**第 4 步：参数量对账（8/3 之谜）。** 标准 FFN：$$d\times4d + 4d\times d = 8d^2$$；SwiGLU：$$d\times h + d\times h + h\times d = 3dh$$——令 $$3dh=8d^2$$ 得 $$h=\frac{8}{3}d$$ ✓。**公平比较的工程礼貌**：换结构必须同参数量。

## 3. 表示对照表

| 门控 FFN 变体 | 门函数 | 出处 | 地位 |
|---|---|---|---|
| GLU 原版 | $$\sigma$$ | 2017 | 门控思想起源 |
| GEGLU | GELU | 2020 | 平滑门 |
| **SwiGLU（本卡）** | Swish | [GLU Variants Improve Transformer](/ai-fa/explore/10-Papers/01-架构演进/GLU Variants Improve Transformer（SwiGLU）) | LLM 标配 |
| ReLU² 等 | ReLU 平方 | PaLM 尝试 | 备选 |

## 4. 直觉解释

- **"开关与内容分两条线"**——门路由输入自己决定开多大（自门控），货路保真运输；乘法=信息闸门
- 门控思想谱系：LSTM 时间维门控 → MoE 层间路由 → SwiGLU 通道维门控——**"门控线性"是现代架构反复重用的同一招**
- [sigmoid函数](/ai-fa/explore/40-Concepts/sigmoid函数) 在门控位的长寿（激活函数族 §4："位置决定选择"）

## 5. 数学概念分解

- [sigmoid函数](/ai-fa/explore/40-Concepts/sigmoid函数)：Swish 的门芯
- [GELU激活](/ai-fa/explore/30-Formulas/GELU激活)：近亲（概率门 vs sigmoid 门）
- [激活函数族](/ai-fa/explore/40-Concepts/激活函数族)：族谱（门控线性终点）
- [内积](/ai-fa/explore/40-Concepts/内积)：三路投影全是线性层

## 6. 与其他公式的关系

- ← 前身：标准 FFN（ReLU）+GLU（2017）
- → 现代配方：与 [均方根归一化](/ai-fa/explore/30-Formulas/均方根归一化)、RoPE 组成 LLaMA 系三件套
- ↔ 同思想：[MoE门控公式](/ai-fa/explore/30-Formulas/MoE门控公式)（粗粒度门：选专家）、[LSTM](/ai-fa/explore/20-Algorithms/LSTM)（时间维门）
