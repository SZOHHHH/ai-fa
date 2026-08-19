---
type: formula
title: MCTS置信上界
status: active
tags: [formula]
---

# MCTS置信上界

## 标准形式


$$
a^*=\arg\max_a Q(s,a)+c\sqrt{\log N(s)/N(s,a)}
$$


## 一句话

MuZero 类树搜索的选择

**直觉**：利用+探索的置信上界平衡

## 本命论文

[[Mastering Atari, Go, Chess and Shogi by Planning with a Learned Model（MuZero）]] · 相关论文：AlphaGo系

> 待办：精读时补"表示对照表"（不同论文的符号差异换算）
