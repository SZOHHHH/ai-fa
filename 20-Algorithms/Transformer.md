---
type: algo
aliases: [Transformer, 变换器, Transformer架构]
line: 架构演进
tags: [algo]
---

# Transformer

## 1. 定义

**非数学语言**：全靠注意力的序列处理网络。每个词同时看到所有词（并行），按相关度加权取信息；叠几十层"注意力+前馈"块。两大流派：BERT（完形填空式双向）与 GPT（接龙式单向）。

**数学语言**：$L \times$（多头自注意力 [[30-Formulas/注意力核心公式]] + FFN + LayerNorm + 残差 [[30-Formulas/残差连接]]）堆叠；自回归分解 $p(x) = \prod_t p(x_t \mid x_{<t})$（GPT）或掩码双向建模（BERT）。

## 2. 本命论文群

| 论文 | 引入/发展了什么 | 年份 |
|---|---|---|
| [[10-Papers/01-架构演进/Attention Is All You Need（Transformer）]] | 抛弃 RNN/CNN，纯注意力 | 2017 |
| [[10-Papers/01-架构演进/BERT- Pre-training of Deep Bidirectional Transformers for Language Understanding（BERT）]] | 双向编码器 + MLM 预训练 | 2018 |
| GPT-1（[[10-Papers/01-架构演进/Improving Language Understanding by Generative Pre-Training（GPT-1）]]，OpenAI 官网来源） | 生成式预训练 + 任务微调范式 | 2018 |
| GPT-2/GPT-3（[[10-Papers/01-架构演进/Language Models are Few-Shot Learners（GPT-3）]]） | 规模化 + 上下文学习 | 2019/2020 |
| [[10-Papers/01-架构演进/LLaMA- Open and Efficient Foundation Language Models（LLaMA）]] | 开源权重 + 现代配方（RoPE/RMSNorm/SwiGLU/GQA） | 2023 |

## 3. 核心公式

- [[30-Formulas/注意力核心公式]] —— 灵魂
- [[30-Formulas/残差连接]] —— 结构胶水
- [[40-Concepts/位置编码]] —— 顺序信息
- [[30-Formulas/注意力计算复杂度]] —— 原罪与改进动机

## 4. 数学概念分解

[[40-Concepts/注意力机制]]、[[40-Concepts/softmax函数]]、[[40-Concepts/内积]]、[[40-Concepts/梯度]]（残差反传）、[[40-Concepts/期望]]（自回归似然）

## 5. 变体与演进

| 变体 | 相比本概念改了什么 | 代表 |
|---|---|---|
| 编码器系（BERT） | 双向掩码 + MLM | [[10-Papers/01-架构演进/BERT- Pre-training of Deep Bidirectional Transformers for Language Understanding（BERT）]] |
| 解码器系（GPT） | 因果掩码自回归 | GPT 系 / LLaMA |
- 现代化组件替换 | 正弦PE→RoPE、LayerNorm→RMSNorm、ReLU→SwiGLU | LLaMA 配方 |
| 骨干替换 | 注意力→SSM | [[10-Papers/01-架构演进/Mamba- Linear-Time Sequence Modeling with Selective State Spaces（Mamba）]] |
| 稀疏化 | FFN→MoE | [[20-Algorithms/混合专家（MoE）]] |
| 视觉化 | patch 化进 Transformer | [[10-Papers/01-架构演进/An Image is Worth 16x16 Words- Transformers for Image Recognition at Scale（ViT）]] |

## 6. 对比表

| | Transformer | RNN/LSTM | SSM (Mamba) |
|---|---|---|---|
| 训练并行度 | 全并行 ✅ | 串行 ❌ | 并行扫描 |
| 长程依赖 | 直连（注意力）✅ | 梯度衰减 ❌ | 压缩状态（有损） |
| 推理复杂度/步 | $O(n)$（KV cache） | $O(1)$ | $O(1)$ |
| 训练复杂度 | $O(n^2)$ | $O(n)$ | $O(n)$ / $O(n\log n)$ |
| 记忆方式 | 精确检索（位置寻址） | 隐式（衰减） | 压缩摘要 + 选择性 |

**一句话总结**：Transformer 用"平方复杂度"买了"精确的全局检索"——过去八年的一切架构研究，都在问"这个价格能不能便宜点"。
