---
type: algo
aliases: [RNN, 循环神经网络, Recurrent Neural Network, vanilla RNN, 循环网络]
line: 架构演进
tags: [algo]
---

# RNN（循环神经网络）

## 1. 定义

**非数学语言**：带**记忆**的序列网络。读一个序列（一句话/一串观测），每读一个新元素就更新一次内部摘要——这个摘要叫**隐状态**，它"压缩了至今为止看过的所有历史"。同一组权重沿时间步反复使用，所以多长的序列都是同一套参数。

**数学语言**：
$$h_t = \phi(W_{hh} h_{t-1} + W_{xh} x_t + b_h), \qquad y_t = W_{hy} h_t + b_y$$
$\phi$ 为 tanh 或 [[40-Concepts/sigmoid函数|sigmoid]]（[[40-Concepts/激活函数族]]）。训练用 **BPTT**：把循环按时间展开成一个每层同权重的深网络，再跑 [[20-Algorithms/反向传播]]。

## 2. 本命论文群

| 论文 | 引入/发展了什么 | 年份 |
|---|---|---|
| Elman（未建卡） | 简单循环网络（SRN），隐状态概念定型 | 1990 |
| [[10-Papers/01-架构演进/Efficient Estimation of Word Representations in Vector Space（word2vec）]] | 同时代的"非循环"路线胜出：滑窗+负采样（[[30-Formulas/word2vec负采样]]） | 2013 |
| [[10-Papers/09-世界模型与JEPA/World Models（世界模型）]] | MDN-RNN 预测下一隐状态——RNN 当"世界引擎" | 2018 |
| [[10-Papers/01-架构演进/RWKV- Reinventing RNNs for the Transformer Era（RWKV）]] | 循环架构的现代化复兴 | 2023 |
| [[10-Papers/01-架构演进/Transformers are SSMs- Generalized Models and Efficient Algorithms Through Structured St（Mamba-2）]] | SSM=结构化循环的新数学衣钵 | 2024 |

## 3. 核心公式与两大先天病

- **状态递推**（上文 $h_t$ 式）——隐状态=有损压缩的记忆
- **梯度消失/爆炸**：BPTT 沿时间反传要连乘 $W_{hh}$（或其雅可比）$T$ 次：
$$\frac{\partial h_T}{\partial h_t} = \prod_{k=t+1}^{T} W_{hh}\, \mathrm{diag}(\phi')$$
谱半径 <1 → 梯度指数消失（**记不住长依赖**）；>1 → 指数爆炸。这是 RNN 的死刑判决书，也是后续一切改进的动机地图：门控（[[20-Algorithms/LSTM]]）、归一化、状态直通
- **训练无法并行**：$h_t$ 依赖 $h_{t-1}$，必须逐时间步串行——在 GPU 时代这是比梯度消失更致命的工程死穴（[[20-Algorithms/Transformer]] 用注意力一把解决）

## 4. 数学概念分解

[[40-Concepts/梯度]]（连乘消散）、[[40-Concepts/激活函数族]]（tanh 的零中心）、[[40-Concepts/马尔可夫链]]（一阶马尔可夫式的状态更新）、[[20-Algorithms/反向传播]]（BPTT=其时间维形式）

## 5. 变体与演进

| 变体 | 相比本算法改了什么 | 代表 |
|---|---|---|
| LSTM | 加细胞状态+三道门，加法更新救梯度 | [[20-Algorithms/LSTM]] |
| GRU | LSTM 简化版：两门合一状态 | 未建卡（见 LSTM 卡 §5） |
| 双向 RNN | 正反两个方向各跑一遍再拼 | 语音/NER 时代标配 |
| seq2seq+注意力 | 编码器-解码器，注意力起初只是 RNN 的外挂 | 未建卡（见 [[40-Concepts/注意力机制]] 前史） |
| SSM/Mamba | 循环形态保留+并行训练两全 | [[20-Algorithms/SSM序列架构（Mamba系）]] |
| RWKV | Attention-free 的线性化 RNN 现代改 | [[10-Papers/01-架构演进/RWKV- Reinventing RNNs for the Transformer Era（RWKV）]] |

## 6. 对比表（序列建模三代）

| | vanilla RNN | LSTM/GRU | Transformer | SSM (Mamba) |
|---|---|---|---|---|
| 训练并行度 | 串行 ❌ | 串行 ❌ | 全并行 ✅ | 并行扫描 ✅ |
| 长程依赖 | 梯度指数消散 ❌ | 门控续命（百步级） | 直连（精确检索）✅ | 压缩状态+选择性 |
| 推理复杂度/步 | $O(1)$ ✅ | $O(1)$ ✅ | $O(n)$（KV cache） | $O(1)$ ✅ |
| 记忆方式 | 有损压缩 | 有损压缩（门控） | 精确检索（位置寻址） | 有损压缩（选择门） |

**一句话总结**：RNN 证明了"一个会更新的隐状态"足以建模序列，但它用连乘梯度与串行训练给这个范式判了缓刑——LSTM 续命、Transformer 换血、SSM 把循环思想用可并行的数学重新请回牌桌。
