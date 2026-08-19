---
type: formula
title: word2vec负采样
status: active
tags: [formula]
---

# word2vec负采样

## 标准形式


$$
\max\sum\log\sigma(v_c^{\top}v_t)+\sum_{k}\log\sigma(-v_k^{\top}v_t)
$$


## 一句话

skip-gram 负采样损失

**直觉**：正邻居拉近、随机负词推远

## 本命论文

[[Efficient Estimation of Word Representations in Vector Space（word2vec）]]

> 待办：精读时补"表示对照表"（不同论文的符号差异换算）
