---
type: formula
formula_id: SGNS
title: word2vec负采样
aliases: [word2vec负采样, 负采样, Negative Sampling, SGNS, skip-gram负采样]
domain: 概率与机器学习
tags: [formula]
---

# word2vec 负采样（SGNS）

## 1. 标准形式

$$\max_\theta\; \log\sigma(v_c^\top v_t) + \sum_{k=1}^{K}\log\sigma(-v_k^\top v_t)$$

- 中心词 $$t$$ 的向量 $$v_t$$，真实上下文词 $$c$$ 的向量 $$v_c$$；$$v_k$$ 为按噪声分布抽的 $$K$$ 个**负词**（默认 $$K{=}5$$，噪声分布=词频的 3/4 次幂）
- $$\sigma$$ = [sigmoid](/ai-fa/explore/40-Concepts/sigmoid函数)——每一项都是一次"真/假邻居"的二分类打分

## 2. 教程：一步一步把"邻居"变成"向量表"（含手算）

**第 1 步：任务设定（skip-gram）。** 语料滑窗："低秩 ___ 分解"——中心词"分解"的窗口里有"低秩"。目标：让 $$v_{分解}$$ 能**预测**邻居。全 softmax 要对词表 5 万词归一化——每一步都算不动。负采样=把"5 万分类"降成"1 真 + K 假的二分类"。

**第 2 步：读懂公式的两半。**
- 正项 $$\log\sigma(v_c^\top v_t)$$：**真邻居**（分解↔低秩）的内积要大——"这对真是邻居"的置信度（内积=[内积](/ai-fa/explore/40-Concepts/内积) 相似度）
- 负项 $$\log\sigma(-v_k^\top v_t)$$：**假邻居**（分解↔随机词"番茄"）的内积要小——$$-v_k^\top v_t$$ 大 ⟺ 内积小 ⟺ σ 高
- 全部加起来=**真的拉近、假的推远**。

**第 3 步：手算一轮。** 设 $$v_t=(1, 0)$$，真邻居 $$v_c=(0.8, 0.6)$$，负词 $$v_k=(0, 1)$$：
- 正项：$$v_c^\top v_t = 0.8$$，$$\sigma(0.8)=0.690$$，$$\log\sigma \approx -0.371$$
- 负项：$$v_k^\top v_t = 0$$，$$\sigma(-0)=0.5$$，$$\log\sigma(0) = -0.693$$
- 损失（取负号）：$$-(-0.371) + 0.693 = 1.064$$。**梯度方向**：拉 $$v_c$$ 更靠 $$v_t$$（内积往 1 去）、推 $$v_k$$ 往正交/反向去——一轮更新后真邻居内积↑、假邻居内积↓。

**第 4 步：负词从哪抽（3/4 幂的用意）。** 噪声分布 $$P(w)\propto \mathrm{freq}(w)^{3/4}$$：高频词（"的"）比原始频率**更常**被抽为负例、低频词相对少抽。为什么？高频功能词与谁都共现，抽它们当负例会污染；3/4 幂是"压高频、抬低频"的工程折中——这是 word2vec 最著名的经验配方。

**第 5 步：这张表就是嵌入空间。** 训练完的向量表 $$E$$ 即 [嵌入向量（Embedding）](/ai-fa/explore/40-Concepts/嵌入向量（Embedding）)——"国王-男人+女人≈女王"的可算结构是**副产品**：任务只逼向量"能判邻居"，判邻居需要语义相似度 → 相似词必须向量靠近。谱系：SGNS（2013）→ 对比学习（InfoNCE 与本式同构，[CLIP对比损失](/ai-fa/explore/30-Formulas/CLIP对比损失)）→ 一切"拉近正对/推远负对"的现代训练。

## 3. 表示对照表

| 表示名 | 公式核心 | 出处 | 说明 |
|---|---|---|---|
| **SGNS（本卡）** | $$\log\sigma(v_c^\top v_t)+\sum_k\log\sigma(-v_k^\top v_t)$$ | Mikolov 2013 | 二分类化 |
| 全 softmax skip-gram | $$-\log\frac{e^{v_c^\top v_t}}{\sum_w e^{v_w^\top v_t}}$$ | 同上 | 原版（算不动） |
| 层级 softmax | 霍夫曼树逐节点二分类 | 同上 | 另一条加速路 |
| InfoNCE（现代对照） | $$-\log\frac{e^{s_+/\tau}}{\sum e^{s_i/\tau}}$$ | CPC/CLIP | 温度+批内负例——SGNS 的 softmax 化后代 |

## 4. 直觉解释

- 每个共现对（真邻居）= 一个正样本；随机配对 = 负样本——**词向量的全部监督信号来自"共现"这一件事**（分布假设："看邻居识单词"）
- K 越大负例越多、信号越强，但每步更贵；K=5 是经典甜点
- 与 [交叉熵](/ai-fa/explore/30-Formulas/交叉熵) 的关系：每个二分类项 $$\log\sigma(\cdot)$$ 本身就是二类交叉熵（[sigmoid函数](/ai-fa/explore/40-Concepts/sigmoid函数) §3"负采样判别"行）

## 5. 出处

[Efficient Estimation of Word Representations in Vector Space](/ai-fa/explore/10-Papers/01-架构演进/Efficient Estimation of Word Representations in Vector Space（word2vec）)（Mikolov et al. 2013）

## 6. 数学概念分解

- [sigmoid函数](/ai-fa/explore/40-Concepts/sigmoid函数)：真/假邻居打分器
- [内积](/ai-fa/explore/40-Concepts/内积)：相似度原语
- [嵌入向量（Embedding）](/ai-fa/explore/40-Concepts/嵌入向量（Embedding）)：训练的表=嵌入本体
- [独热编码（One-Hot）](/ai-fa/explore/40-Concepts/独热编码（One-Hot）)：词编号的载体（查表视角）

## 7. 与其他公式的关系

- → 派生：整个 [嵌入向量（Embedding）](/ai-fa/explore/40-Concepts/嵌入向量（Embedding）) 时代的起点（专门预训练流派的代表）
- ↔ 同构：[CLIP对比损失](/ai-fa/explore/30-Formulas/CLIP对比损失)（图文对当"邻居"，InfoNCE 化的 SGNS）
- ↔ 对照：[交叉熵](/ai-fa/explore/30-Formulas/交叉熵)（每一项=二类 CE）
