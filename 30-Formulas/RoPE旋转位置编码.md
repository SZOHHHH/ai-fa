---
type: formula
formula_id: ROPE
aliases: [RoPE公式, 旋转位置编码公式, Rotary Position Embedding]
domain: 架构
tags: [formula]
---

# RoPE 旋转位置编码

## 1. 标准形式

对位置 $m$ 的 query 和位置 $n$ 的 key（按维度两两分组 $d_k = 2\ell$）：

$$\tilde q_m = R_m q, \qquad \tilde k_n = R_n k$$

其中旋转矩阵（对角块结构）：
$$R_m = \begin{pmatrix} \cos m\theta_1 & -\sin m\theta_1 & & \ \sin m\theta_1 & \cos m\theta_1 & & \ & & \ddots & \ & & & \cos m\theta_\ell \ \ -\sin m\theta_\ell \ & & & \sin m\theta_\ell \ \ \ \ \cos m\theta_\ell \end{pmatrix}, \qquad \theta_i = 10000^{-2i/d_k}$$

**核心恒等式**（相对性的来源）：
$$\langle \tilde q_m, \tilde k_n \rangle = q^\top R_m^\top R_n\, k = q^\top R_{n-m}\, k$$
——打分只依赖**相对距离 $n-m$**。

## 2. 表示对照表

| 表示名 | 核心 | 出处 | 说明 |
|---|---|---|---|
| 实数旋转矩阵（本库标准） | 如上 | RoFormer 2021 | 原始 |
| 复数形式 | $f(x, m) = x e^{im\theta}$（复数域） | 同上 | 理论推导更优雅 |
| 实现（按位置交织） | 逐 pair 旋转（非矩阵乘，逐元素更高效） | 各实现 | 工程等价 |
| NTK/YaRN 缩放版 | $\theta_i = B^{-2i/d}$，调 base $B$ | 线 6 | 外推改造（B5 批回填） |

## 3. 直觉解释

- **二维旋转的图像**：把每对维度看作平面坐标，RoPE 让每个位置把向量旋转一个正比于位置的角度——**远处转得多、近处转得少**
- **内积为何呈相对性**：$m$ 转了 $m\theta$、$n$ 转了 $n\theta$，比较时差值 $n\theta - m\theta = (n-m)\theta$——只剩相对角
- **多频率设计**：$\theta_i$ 从 1 到 $1/10000$——低维对转得快（捕捉短程位置差异）、高维对转得慢（捕捉长程）——类似正弦编码的"多尺度秒表"
- **为什么 V 不旋转**：RoPE 只需出现在打分 $QK^\top$ 里；值向量的"携带内容"不需要位置搅动

## 4. 出处

| 论文 | 贡献 |
|---|---|
| [[10-Papers/01-架构演进/RoFormer- Enhanced Transformer with Rotary Position Embedding（RoPE）]] | 提出 |

## 5. 数学概念分解

- [[40-Concepts/位置编码]]：母概念
- [[40-Concepts/内积]]：旋转不变性 $\langle Ra, Rb\rangle = \langle a,b\rangle$
- [[40-Concepts/注意力机制]]：作用位置（每层 Q/K）

## 6. 与其他公式的关系

- → **作用于** [[30-Formulas/注意力核心公式]] 的打分项
- ≡ **改进自** 正弦绝对编码（Transformer 原文）——绝对旋转实现相对语义
- → **被改造**：PI（线性插值）、NTK-aware、YaRN（线 6 批次建链）——长上下文的"手术对象"
- 现代 LLM（LLaMA/Qwen/DeepSeek/Flux）默认位置方案
