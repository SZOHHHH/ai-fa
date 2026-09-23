---
type: algo
aliases: [RNN, 循环神经网络, Recurrent Neural Network, vanilla RNN, 循环网络]
line: 架构演进
tags: [algo]
---

# RNN（循环神经网络）

## 1. 定义

**非数学语言**：带**记忆**的序列网络。读一个序列（一句话/一串观测/一段音频），每读一个新元素就更新一次内部摘要——这个摘要叫**隐状态**（hidden state），它"压缩了至今为止看过的所有历史"。同一组权重沿时间步反复使用，所以多长的序列都是同一套参数。

**数学语言**：
$$h_t = \phi(W_{hh} h_{t-1} + W_{xh} x_t + b_h), \qquad y_t = W_{hy} h_t + b_y$$
$$\phi$$ 为 tanh 或 [sigmoid](/ai-fa/explore/40-Concepts/sigmoid函数)。训练用 **BPTT**（Backpropagation Through Time）：把循环按时间展开成一个每层**同权重**的深网络，再跑 [反向传播](/ai-fa/explore/20-Algorithms/反向传播)。

## 2. 本命论文群

| 论文 | 引入/发展了什么 | 年份 |
|---|---|---|
| Elman（未建卡） | 简单循环网络（SRN），隐状态概念定型 | 1990 |
| [Efficient Estimation of Word Representations in Vector Space](/ai-fa/explore/10-Papers/01-架构演进/Efficient Estimation of Word Representations in Vector Space（word2vec）) | 同时代的"非循环"路线胜出：滑窗+负采样（[word2vec负采样](/ai-fa/explore/30-Formulas/word2vec负采样)） | 2013 |
| [World Models](/ai-fa/explore/10-Papers/09-世界模型与JEPA/World Models（世界模型）) | MDN-RNN 预测下一隐状态——RNN 当"世界引擎" | 2018 |
| [RWKV - Reinventing RNNs for the Transformer Era](/ai-fa/explore/10-Papers/01-架构演进/RWKV- Reinventing RNNs for the Transformer Era（RWKV）) | 循环架构的现代化复兴 | 2023 |
| [Transformers are SSMs - Generalized Models and Efficient Algorithms Through Structured State Space Duality](/ai-fa/explore/10-Papers/01-架构演进/Transformers are SSMs- Generalized Models and Efficient Algorithms Through Structured St（Mamba-2）) | SSM=结构化循环的新数学衣钵 | 2024 |

## 3. 教程：一个隐状态是怎么"滚动"起来的

**第 0 步：把"读句子"想成传话游戏。** 每个人（时间步）听到一个新词，要把它和"之前听到的全部内容"揉成一句话摘要传给下一个人。$$h_t$$ 就是这份摘要——**有损压缩的记忆**。

**第 1 步：手算一个极小例子。** 设隐状态 2 维，输入 1 维，无偏置，$$\phi=\tanh$$：
$$W_{hh}=\begin{bmatrix} 0.5 & 0\\ 0 & 0.5 \end{bmatrix},\quad W_{xh}=\begin{bmatrix} 1\\ 1 \end{bmatrix},\quad h_0=\begin{bmatrix} 0\\ 0 \end{bmatrix}$$
读序列 $$x_1 = 1$$：
$$h_1 = \tanh\!\left(\begin{bmatrix} 0.5&0\\ 0&0.5 \end{bmatrix}\begin{bmatrix} 0\\ 0 \end{bmatrix} + \begin{bmatrix} 1\\ 1 \end{bmatrix}\cdot 1\right) = \tanh\begin{bmatrix} 1\\ 1 \end{bmatrix} \approx \begin{bmatrix} 0.76\\ 0.76 \end{bmatrix}$$
读 $$x_2 = -2$$：
$$h_2 = \tanh\!\left(0.5\, h_1 + (-2)\, W_{xh}\right) = \tanh\begin{bmatrix} 0.38-2\\ 0.38-2 \end{bmatrix} \approx \begin{bmatrix} -0.94\\ -0.94 \end{bmatrix}$$
注意两件事：①新输入能**翻转**摘要方向（记忆可被新证据改写）；②tanh 把摘要永远锁在 (−1,1)——**压缩必然有损**，这是 RNN 记忆的物理上限。

**第 2 步：同一组矩阵滚到底。** $$t=100$$ 用的 $$W_{hh}, W_{xh}$$ 与 $$t=1$$ 完全相同——参数量与序列长度**无关**（对比：把整句一次喂全连接层，参数随长度爆炸）。

**第 3 步：按时间展开，训练就是深网络。** BPTT=把 $$h_0 \to h_1 \to \cdots \to h_T$$ 画成 $$T$$ 层链（同权重），损失加在各个 $$y_t$$ 上（如预测下一词：$$L = \sum_t \text{CE}(y_t, \text{下一词})$$），然后就是普通的 [反向传播](/ai-fa/explore/20-Algorithms/反向传播) 沿链反传。

**第 4 步：亲眼看梯度怎么死。** 反传到 $$t$$ 步要穿过连乘：
$$\frac{\partial h_T}{\partial h_t} = \prod_{k=t+1}^{T} \underbrace{W_{hh}}_{\text{矩阵}}\odot\underbrace{\phi'}_{\text{逐元素}}$$
取 $$W_{hh}$$ 的最大特征值 $$\lambda_{max}$$：$$\lambda_{max} < 1 \Rightarrow$$ 梯度 $$\sim \lambda_{max}^{\,T-t}$$ **指数消失**（学不到远处的依赖）；$$> 1 \Rightarrow$$ 指数爆炸（数值发散）。数值实验直觉：0.9 的连乘，50 步后只剩 $$0.9^{50}\approx 0.5\%$$——"50 步之外的事，梯度已经听不见了"。这就是 RNN 的死刑判决书（[LSTM](/ai-fa/explore/20-Algorithms/LSTM) 的动机）。

**第 5 步：第二个死穴——串行。** $$h_t$$ 依赖 $$h_{t-1}$$，训练必须逐步算完，GPU 上万核只能干看。[Transformer](/ai-fa/explore/20-Algorithms/Transformer) 用注意力一步看全序列（全并行），工程上一击致命。

## 4. 核心公式速查

| 件 | 公式 | 记忆点 |
|---|---|---|
| 状态递推 | $$h_t = \phi(W_{hh}h_{t-1}+W_{xh}x_t+b)$$ | 同一组矩阵滚到底 |
| 输出 | $$y_t = W_{hy}h_t + b_y$$ | 摘要→预测 |
| 梯度连乘 | $$\partial h_T/\partial h_t = \prod W_{hh}\,\mathrm{diag}(\phi')$$ | 谱半径决定生死 |
| 参数量 | $$(d_h d_h + d_h d_x + d_h)$$ | 与序列长度无关 |

## 5. 数学概念分解

[梯度](/ai-fa/explore/40-Concepts/梯度)（连乘消散）、[激活函数族](/ai-fa/explore/40-Concepts/激活函数族)（tanh 的零中心+有界压缩）、[马尔可夫链](/ai-fa/explore/40-Concepts/马尔可夫链)（一阶马尔可夫式状态更新——$$h_t$$ 只依赖 $$h_{t-1}$$ 与 $$x_t$$）、[反向传播](/ai-fa/explore/20-Algorithms/反向传播)（BPTT=其时间维形式）、[特征值与特征向量](/ai-fa/explore/40-Concepts/特征值与特征向量)（谱半径=梯度命运的判官）

## 6. 变体与演进

| 变体 | 相比本算法改了什么 | 代表 |
|---|---|---|
| LSTM | 加细胞状态+三道门，加法更新救梯度 | [LSTM](/ai-fa/explore/20-Algorithms/LSTM) |
| GRU | LSTM 简化版：两门合一状态 | 未建卡（见 LSTM 卡 §6） |
| 双向 RNN | 正反各跑一遍再拼（上下文双向） | 语音/NER 时代标配 |
| seq2seq+注意力 | 编码器-解码器；注意力起初是 RNN 外挂 | [注意力机制](/ai-fa/explore/40-Concepts/注意力机制) 前史 |
| SSM/Mamba | 循环形态保留+并行训练两全 | [SSM序列架构（Mamba系）](/ai-fa/explore/20-Algorithms/SSM序列架构（Mamba系）) |
| RWKV | Attention-free 的线性化 RNN 现代改 | [RWKV - Reinventing RNNs for the Transformer Era](/ai-fa/explore/10-Papers/01-架构演进/RWKV- Reinventing RNNs for the Transformer Era（RWKV）) |

## 7. 对比表（序列建模三代）

| | vanilla RNN | LSTM/GRU | Transformer | SSM (Mamba) |
|---|---|---|---|---|
| 训练并行度 | 串行 ❌ | 串行 ❌ | 全并行 ✅ | 并行扫描 ✅ |
| 长程依赖 | 梯度指数消散 ❌ | 门控续命（百步级） | 直连（精确检索）✅ | 压缩状态+选择性 |
| 推理复杂度/步 | $$O(1)$$ ✅ | $$O(1)$$ ✅ | $$O(n)$$（KV cache） | $$O(1)$$ ✅ |
| 记忆方式 | 有损压缩 | 有损压缩（门控） | 精确检索（位置寻址） | 有损压缩（选择门） |

## 8. 常见误区

- **误区**：隐状态"存着历史"=能查历史——它是**压缩摘要**，不是可检索的账本（那是 Transformer KV cache 的语义）；"20 步前那个词是什么"RNN 原则上答不出
- **误区**：梯度消失=数值变 0 报错——是**信号的信噪比**指数劣化（远处梯度淹没在近处梯度里），训练不报错但学不会长依赖，更隐蔽
- **误区**：梯度爆炸可用 LSTM 治——爆炸的标准药是**梯度裁剪**（clip 全局范数）；LSTM 治的是消失
- **误区**：RNN 死了——推理端 $$O(1)$$ 状态更新仍是奢侈品（SSM/RWKV 的复活理由）；死掉的是"串行训练的 vanilla 形态"

## 9. 自测

1. 为什么 RNN 参数量与序列长度无关？（权重沿时间共享）
2. BPTT 为什么叫"Through Time"？（展开后=同权重深网络，沿时间轴反传）
3. $$\lambda_{max}=0.99$$ 与 $$1.01$$ 分别意味着什么？（慢消失/慢爆炸；前者隐蔽地学不动长依赖，后者靠 clip 续命）
4. Transformer 并行在哪一步赢？（$$h_t$$ 不再依赖 $$h_{t-1}$$——注意力一次看全序列）

**一句话总结**：RNN 证明了"一个会更新的隐状态"足以建模序列，但它用连乘梯度与串行训练给这个范式判了缓刑——LSTM 续命、Transformer 换血、SSM 把循环思想用可并行的数学重新请回牌桌。
