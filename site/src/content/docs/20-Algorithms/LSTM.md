---
type: algo
aliases: [LSTM, 长短期记忆网络, Long Short-Term Memory, 门控RNN]
line: 架构演进
tags: [algo]
---

# LSTM（长短期记忆网络）

## 1. 定义

**非数学语言**：给 RNN 装一条**传送带**加三道**阀门**。传送带（细胞状态 $$c_t$$）沿时间直通，信息在上面原样流淌；三道门各自学会开多大——**遗忘门**（清掉传送带上没用的旧货）、**输入门**（放多少新货上车）、**输出门**（此刻对外展示多少）。"学会忘记"是它的全部哲学。

**数学语言**：三道 [sigmoid](/ai-fa/explore/40-Concepts/sigmoid函数) 门 + 一条**加法更新**的状态线：
$$f_t = \sigma(W_f[h_{t-1},x_t]+b_f), \quad i_t = \sigma(W_i[h_{t-1},x_t]+b_i), \quad \tilde{c}_t = \tanh(W_c[h_{t-1},x_t]+b_c)$$
$$c_t = f_t \odot c_{t-1} + i_t \odot \tilde{c}_t, \qquad o_t = \sigma(W_o[h_{t-1},x_t]+b_o), \qquad h_t = o_t \odot \tanh(c_t)$$

**为什么这能治 RNN 的死刑**（[RNN](/ai-fa/explore/20-Algorithms/RNN) §3 的梯度连乘）：$$c_t = f_t \odot c_{t-1} + (\text{新货})$$ 是**加法**——反传时 $$\partial c_t/\partial c_{t-1} = f_t$$ 是**逐元素乘**而非矩阵连乘，且 $$f_t$$ 可学到接近 1 → 梯度沿传送带**近乎无衰减直通**。这正是 [残差连接](/ai-fa/explore/30-Formulas/残差连接)（2015）"恒等直通"思想在时间维的祖先（LSTM 早了 18 年）。

## 2. 本命论文群

| 论文 | 引入/发展了什么 | 年份 |
|---|---|---|
| Hochreiter & Schmidhuber（未建卡） | 原始 LSTM：细胞状态+输入/输出门 | 1997 |
| Gers & Schmidhuber（未建卡） | 补遗忘门——现代形态定型；遗忘偏置初始化经验 | 2000 |
| [World Models](/ai-fa/explore/10-Papers/09-世界模型与JEPA/World Models（世界模型）) | MDN-RNN 用 LSTM 当世界模型动力学引擎 | 2018 |
| [Learning Latent Dynamics for Planning from Pixels](/ai-fa/explore/10-Papers/09-世界模型与JEPA/Learning Latent Dynamics for Planning from Pixels（PlaNet）) | RSSM 换 GRU（LSTM 简化版）建隐空间动力学 | 2019 |
| [Attention Is All You Need](/ai-fa/explore/10-Papers/01-架构演进/Attention Is All You Need（Transformer）) | 掘墓人：注意力取代门控循环成为序列主干 | 2017 |

## 3. 教程：一个记忆单元的完整时间步（逐步代入）

设定记号：$$[h_{t-1},x_t]$$ 表示两向量**拼接**；$$\odot$$ 是逐元素乘（门"拧多大"）；所有 $$W$$ 是学出来的。

**第 1 步：遗忘门——旧货还留几成？**
$$f_t = \sigma(W_f[h_{t-1},x_t]+b_f) \in (0,1)^{d}$$
输出是 $$d$$ 个 0~1 的"旋钮"。读到新词"但是"→ 旋钮集体拧向 0（前文要反转了，旧状态该清）；读到"换句话说"→ 拧向 0.5（要改写但保留骨架）。**它就是 [Mamba 选择门](/ai-fa/explore/30-Formulas/选择机制)的直系祖先**：$$\odot$$ 门控状态线，一脉相承。

**第 2 步：输入门+候选——新货是什么、装多少？**
$$i_t = \sigma(W_i[h_{t-1},x_t]+b_i)\ (\text{装多少}), \qquad \tilde{c}_t = \tanh(W_c[h_{t-1},x_t]+b_c)\ (\text{候选新内容}\in(-1,1)^d)$$
分工：候选用 [tanh](/ai-fa/explore/40-Concepts/激活函数族)（**内容**，有正有负）；门用 sigmoid（**量**，0~1）。"写什么"与"写多少"解耦。

**第 3 步：传送带更新——一行加法，全文最重要的公式。**
$$c_t = f_t \odot c_{t-1} + i_t \odot \tilde{c}_t$$
手算（$$d{=}1$$）：旧货 $$c_{t-1}=0.9$$，遗忘拧 $$f_t=0.1$$，候选 $$\tilde c_t=0.8$$，输入拧 $$i_t=0.7$$：$$c_t = 0.1\times0.9 + 0.7\times0.8 = 0.65$$。旧货几乎清空、新货大量装入——**一次"改写记忆"完成**。对照 vanilla RNN 的 $$h_t = \tanh(W h_{t-1} + \cdots)$$：旧状态被矩阵**搅碎**后重铸；LSTM 的旧状态**原样流过**，只被乘一个门——反传时梯度走的是 $$f_t$$ 这条近路，不再被矩阵反复压缩。

**第 4 步：输出门——账本 vs 发言。**
$$o_t = \sigma(W_o[h_{t-1},x_t]+b_o), \qquad h_t = o_t \odot \tanh(c_t)$$
$$c_t$$ 是长期账本，$$h_t$$ 只是"本期摘要"——账本与对外发言分离，长期记忆不被单步任务污染（这步输出同时就是传给下一时间步的 $$h$$）。

**第 5 步：初始化冷知识。** 遗忘门偏置 $$b_f$$ 初始化为 **1**（其余为 0）——开局 $$f_t\approx\sigma(1)\approx0.73$$ 偏"先都记住"，训练才稳定（Gers 的实践贡献；初始化为 0 时早期会莫名忘光）。

## 4. 核心公式速查

| 门 | 公式 | 一句话职责 |
|---|---|---|
| 遗忘门 | $$f_t=\sigma(W_f[h_{t-1},x_t]+b_f)$$ | 旧货留几成 |
| 输入门 | $$i_t=\sigma(W_i[\cdot]+b_i)$$ | 新货装多少 |
| 候选 | $$\tilde c_t=\tanh(W_c[\cdot]+b_c)$$ | 新货是什么 |
| 状态线 | $$c_t = f_t\odot c_{t-1}+i_t\odot\tilde c_t$$ | **加法直通=梯度高速路** |
| 输出门 | $$h_t=o_t\odot\tanh(c_t)$$ | 本期对外说多少 |

参数量约 $$4(d_h^2 + d_h d_x + d_h)$$（四个变换块）——vanilla RNN 的 4 倍。

## 5. 数学概念分解

[sigmoid函数](/ai-fa/explore/40-Concepts/sigmoid函数)（三门的标准件——门控位至今不可替代的例子）、[激活函数族](/ai-fa/explore/40-Concepts/激活函数族)（tanh 做候选/门控分工）、[梯度](/ai-fa/explore/40-Concepts/梯度)（加法更新=梯度高速路的机制）、[RNN](/ai-fa/explore/20-Algorithms/RNN)（被治理的本体）、[反向传播](/ai-fa/explore/20-Algorithms/反向传播)（BPTT 语境）、[残差连接](/ai-fa/explore/30-Formulas/残差连接)（空间维的后裔对照）

## 6. 变体与演进

| 变体 | 相比本算法改了什么 | 代表 |
|---|---|---|
| GRU | 三门并两门（更新/复位）、状态合一——参数少 1/4，效果大体持平 | PlaNet 的 RSSM 用它 |
| Peephole | 门也看细胞状态 $$c$$ | 工程影响有限 |
| 双层堆叠/双向 | 深度与上下文双向 | 语音时代标配 |
| 注意力外挂 | 先给 LSTM 当辅助，后反客为主 | [注意力机制](/ai-fa/explore/40-Concepts/注意力机制) 前史 |
| SSM 选择门 | 门控思想+并行训练两全 | [SSM序列架构（Mamba系）](/ai-fa/explore/20-Algorithms/SSM序列架构（Mamba系）) |

## 7. 对比表（记忆机制三家）

| | LSTM | Transformer | SSM (Mamba) |
|---|---|---|---|
| 长期记忆载体 | 细胞状态传送带（有损） | KV cache（精确检索） | 压缩隐状态（选择性有损） |
| 记忆写入 | 门控加法 | 注意力加权求和 | 选择门控写入 |
| 有效跨度 | 数百步 | 上下文窗口内无限精确 | 数千~数万步 |
| 训练并行 | ❌ 串行 | ✅ | ✅（扫描形式） |
| 历史地位 | 1997-2017 序列之王 | 门控思想的"空间化" | 门控思想的"并行化" |

## 8. 常见误区

- **误区**：LSTM"记住长依赖"靠门控多——真正功劳是**一条加法直通线**；门只是决定流量。删掉 $$f_t\odot c_{t-1}$$ 的恒等通路，三门齐上照样梯度消失
- **误区**：GRU 参数少=表达能力弱一档——大量任务上持平；LSTM 保真更多是"先发优势+调参生态"，不是代差
- **误区**：$$c_t$$ 和 $$h_t$$ 是同一个东西的两个名字——账本（长期）vs 发言（本期）；很多教程图里只画 $$h$$，新手最容易在这里迷路
- **误区**：LSTM 的门=注意力——门控是**逐元素**的（自己管自己的维度），注意力是**跨位置加权**（跨 token 聚合）；量级与语义都不同

## 9. 自测

1. $$f_t \equiv 1, i_t \equiv 0$$ 时传送带行为？（恒等直通——$$c_t = c_{t-1}$$，梯度无损，这就是"高速公路"极限形态）
2. 为什么候选用 tanh 门用 sigmoid？（内容需要有正负/量级 vs 比例必须 0~1）
3. LSTM 的梯度为什么不被矩阵连乘压垮？（$$\partial c_t/\partial c_{t-1}=f_t$$ 逐元素，无矩阵谱半径问题）
4. 残差连接与 LSTM 状态线的共同思想？（恒等通路让梯度原样回家）

**一句话总结**：LSTM 的贡献不是"记忆更长的网络"，而是**"梯度能活着穿过时间"的结构方案**——一条加法直通的状态线，让"控制信息流"变成可学习的能力；残差连接与 Mamba 选择门，都是这条传送带在不同维度的转世。
