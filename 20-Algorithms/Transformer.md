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

## 教程：跟着 token「追」走一遍 GPT 层（端到端导览）

**第 0 步：设定。** 输入句子"猫 追"（两 token），看下一个 token 怎么被预测出来。**所有数字都与库内公式卡的手算同源**——本教程是它们的导览索引。

**第 1 步：入口。** 分词（[[40-Concepts/Tokenization（分词）]]）→ 查嵌入表得向量（[[40-Concepts/嵌入向量（Embedding）]]）→ 加位置编码（[[30-Formulas/RoPE旋转位置编码]]：第 5 步的"毫米尺/千米尺"）。

**第 2 步：注意力层（灵魂）。** "追"作为 query 回看全场：打分 $q^\top k/\sqrt{d_k}$——[[30-Formulas/注意力核心公式]] 教程用这两个字手算过全程（"追"对"猫"的权重如何压倒对"追"自己）；softmax 后加权取 V（[[40-Concepts/softmax函数]] 的 (2,1,0) 手算）；多头分工（[[40-Concepts/注意力机制]] 六步）。

**第 3 步：FFN 层。** SwiGLU 门控（[[30-Formulas/SwiGLU门控]]：门×货一维手算 −0.269×5）——注意力负责"收集信息"，FFN 负责"加工信息"（占参数 2/3）。

**第 4 步：胶水与堆叠。** 残差（[[30-Formulas/残差连接]]：三块 0.5 链 0.125 vs 1.875——梯度高速公路）+ RMSNorm（[[30-Formulas/均方根归一化]]）——一个块走完，叠 L 层。

**第 5 步：出口。** 顶层向量投影到词表 logits（设 (2,1,0) 形态）→ softmax 出下一 token 分布（[[40-Concepts/温度参数]] 三档手算：T=1 得 0.680 采样或 argmax）。

**第 6 步：生成循环。** 预测的 token 拼回输入，重复——KV 缓存让历史投影只算一次（[[40-Concepts/KV缓存]]：7B 每请求 2.15GB 的账单）。**每一步的数学都住在一公式卡里，本卡是地图。**

## 4. 数学概念分解

[[40-Concepts/注意力机制]]、[[40-Concepts/softmax函数]]、[[40-Concepts/内积]]、[[40-Concepts/梯度]]（残差反传）、[[40-Concepts/期望]]（自回归似然）、[[20-Algorithms/多层感知机（MLP）]]（FFN 本体）、[[40-Concepts/Tokenization（分词）]]（序列入口）

## 5. 变体与演进

| 变体 | 相比本概念改了什么 | 代表 |
|---|---|---|
| 编码器系（BERT） | 双向掩码 + MLM | [[10-Papers/01-架构演进/BERT- Pre-training of Deep Bidirectional Transformers for Language Understanding（BERT）]] |
| 解码器系（GPT） | 因果掩码自回归 | GPT 系 / LLaMA |
- 现代化组件替换 | 正弦PE→RoPE、LayerNorm→RMSNorm、ReLU→SwiGLU（[[40-Concepts/激活函数族]]） | LLaMA 配方 |
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

**对比对象实体卡**：[[20-Algorithms/RNN]]（被取代的串行范式）、[[20-Algorithms/LSTM]]（门控记忆前朝）、[[20-Algorithms/SSM序列架构（Mamba系）]]（循环思想的并行化复兴）

## 自测

1. 一个 token 走一层 GPT 块的顺序？（嵌入+PE → 注意力（收集）→ 残差+Norm → FFN（加工）→ 残差+Norm）
2. 注意力与 FFN 的分工？（收集信息（谁相关）vs 加工信息（特征变换，占 2/3 参数））
3. 推理时历史 token 的 K/V 为什么不用重算？（因果结构下 $k_i, v_i$ 只依赖自己——KV 缓存）
4. Transformer 用什么买了什么？（平方复杂度买精确全局检索——后续架构研究都在砍价）
