---
type: paper
tags: [paper]
title: Variational Autoencoders and Nonlinear ICA- A Unifying Framework
aliases: [iVAE]
year: 2019
authors: [Ilyes Khemakhem, Diederik P. Kingma, Ricardo Pio Monti, Aapo Hyvärinen]
venue: AISTATS 2020（1045+ 引用）
arxiv: "1907.04809"
pdf: 已下载（PDF/）
line: 后处理与压缩
matrix_coords: [—, 理论, —]
---

# iVAE

## 1. 一句话贡献

可辨识 [[Auto-Encoding Variational Bayes（VAE）|VAE]] 的奠基：证明**条件先验**（潜变量依附辅助变量 u，如时间/类别）下潜变量可辨识到很弱的等价类——把 VAE 与非线性 ICA 统一。

## 2. 核心贡献

1. 在 p(z|u) 属指数族且条件独立的假设下，从数据分布族恢复潜变量（至旋转/逐元素非线性）
2. iVAE 架构：推断网络输入 (x,u)

## 3. 方法概要

在 p(z|u) 属指数族且条件独立的假设下，从数据分布族恢复潜变量（至旋转/逐元素非线性）；iVAE 架构：推断网络输入 (x,u)。
## 4. 核心公式


$$
p_\theta(x, z \mid u):\ p(x\mid z)\ \text{固定},\ p(z\mid u)=\mathcal{N}\big(f(u), \mathrm{diag}(g(u))\big)\ \Rightarrow\ \text{identifiable}
$$


## 5. 与前作/矩阵关系

← [[10-Papers/02-生成建模与扩散/Auto-Encoding Variational Bayes（VAE）]]（不可辨识的原始版）；→ B10 孵化 #2（潜动作接口可辨识性的理论工具）；→ LAPA/3R2D 的码本可辨识性问题

## 6. 影响与占位意义

B18 奠基补齐：潜变量可辨识性理论的标准引用，补齐知识库的 ICA 支线。

> 近邻同族：[[A Reduction of Imitation Learning and Structured Prediction to No-Regret Online Learning（DAGGER）]] · [[A Simple and Effective Pruning Approach for Large Language Models（SparseGPT）]]

> 数学根基：[[潜变量变分下界]] · [[ELBO目标]] · [[KL散度]]


## 7. 读前须知

需要：指数族分布；条件独立假设；可辨识性的含义（参数只能恢复到什么等价类）；为什么原始 VAE 不可辨识而条件先验可以
