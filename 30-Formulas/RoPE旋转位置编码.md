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

## 教程：一对维度的完整手算（含恒等式验证）

**第 1 步：最小设定。** 单对维度（$\ell{=}1$），$\theta = \pi/4$；$q = (1, 0)$ 在位置 $m=1$，$k = (0, 1)$ 在位置 $n=2$。

**第 2 步：各自旋转。**
$$\tilde q_1 = R_{\pi/4}(1,0)^\top = (\cos\tfrac{\pi}{4},\ \sin\tfrac{\pi}{4}) = (0.707,\ 0.707)$$
$$\tilde k_2 = R_{\pi/2}(0,1)^\top = (-\sin\tfrac{\pi}{2},\ \cos\tfrac{\pi}{2}) = (-1,\ 0)$$

**第 3 步：打分 + 恒等式验证。** $\tilde q_1^\top \tilde k_2 = -0.707$。恒等式另一边：$q^\top R_{n-m}k = q^\top R_{\pi/4}\,(0,1)^\top = (1,0)\cdot(-0.707, 0.707) = -0.707$ ✓——**两种算法分毫不差**（$R_m^\top R_n = R_{n-m}$，正交矩阵群的可交换红利）。

**第 4 步：平移不变验证。** q 移到 $m=6$、k 移到 $n=7$（间距仍 1）：$q^\top R_{\pi/4}k = -0.707$ 不变 ✓——**"距离 1 的关系"全场同价**，这正是相对位置编码的语义。

**第 5 步：多频率全图。** $d_k=64$ 有 32 对维度，$\theta_i = 10000^{-2i/64}$：第 1 对 $\theta\approx1$（转得飞快——分辨相邻 token 的"毫米尺"）、最后一对 $\theta\approx 1/10000$（10000 步才转一圈——量程万步的"千米尺"）。**打分=32 把不同尺度距离尺的读数之和**——近程关系靠高频对、远程对齐靠低频对（完整直觉链见 [[40-Concepts/位置编码]] §教程）。

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

## 6. 自测

1. 教程例中若 k 移到 $n=5$（间距 3），打分？（$q^\top R_{3\pi/4}(0,1)^\top = -\sin(3\pi/4) = -0.707$——恰与间距 1 相同：振荡波的同值点，单频率会混淆、多频率合起来才区分）
2. 为什么实现用逐元素乘不用矩阵乘？（$R_m$ 是稀疏块对角——拆成逐 pair 的 cos/sin 乘加，省 $d^2$ 矩阵乘）
3. 第 5 步里"毫米尺/千米尺"分别对应哪些位置关系？（相邻词序/段落级长程依赖）
4. V 为什么不旋转？（位置语义只需进入打分 $QK^\top$；内容运输（V）无需位置搅动）

## 7. 与其他公式的关系

- → **作用于** [[30-Formulas/注意力核心公式]] 的打分项
- ≡ **改进自** 正弦绝对编码（Transformer 原文）——绝对旋转实现相对语义
- → **被改造**：PI（线性插值）、NTK-aware、YaRN（线 6 批次建链）——长上下文的"手术对象"
- 现代 LLM（LLaMA/Qwen/DeepSeek/Flux）默认位置方案
