---
type: formula
formula_id: FLASH-ATTN
aliases: [FlashAttention, 分块注意力, tiling attention, IO感知注意力]
domain: 架构
tags: [formula]
---

# FlashAttention 分块计算

## 1. 标准形式

**数学上完全等于** [注意力核心公式](/ai-fa/explore/30-Formulas/注意力核心公式)：$$\mathrm{softmax}(QK^\top/\sqrt{d_k})V$$。
变化只在**计算顺序**：把 $$Q, K, V$$ 分成小块，逐块载入 SRAM（快显存），用**在线 softmax**（online softmax）增量更新结果，永不物化 $$n \times n$$ 注意力矩阵。

**在线 softmax 更新式**（灵魂算法）：
$$m_{\text{new}} = \max(m_{\text{old}},\ m_{\text{block}}), \quad l_{\text{new}} = e^{m_{\text{old}} - m_{\text{new}}} l_{\text{old}} + e^{m_{\text{block}} - m_{\text{new}}} \sum_j e^{s_j}$$
$$O_{\text{new}} = \frac{e^{m_{\text{old}} - m_{\text{new}}} l_{\text{old}}\, O_{\text{old}} + e^{S_{\text{block}} - m_{\text{new}}} V_{\text{block}}}{l_{\text{new}}}$$
（$$m$$：运行最大值；$$l$$：运行分母和；$$O$$：运行输出——见块到时修正此前所有块）

## 2. 表示对照表

| 表示名 | 核心思想 | 出处 | 说明 |
|---|---|---|---|
| FA1（tiling + online softmax） | 如上 | 2022 | 原始 |
| FA2（减少non-matmul FLOPs） | 更优的分块与重计算 | 2023 | 常数再降 ~2× |
| FA3（异步/warp 特化） | Hopper 硬件深挖 | 2024 | FP8 支持 |
- 反向传播：不存注意力矩阵，**重算**（recompute）——省显存的代价换更少的 HBM 读写，反而更快

## 教程：在线 softmax 两块手算（"修正魔法"现场）

**第 1 步：设定。** 一个 query 对 4 个 key，分数分两块到达：块 A $$= (1, 2)$$，块 B $$= (3, 0)$$；对应值 $$v_1..v_4$$。目标：不回头重算块 A，得到与全量 softmax 完全一致的结果。

**第 2 步：处理块 A（维护三个运行量）。** 运行最大 $$m=2$$；运行和 $$l_A = e^{1-2} + e^{2-2} = 0.368 + 1 = 1.368$$；运行输出（未归一）$$\bar O_A = 0.368\,v_1 + 1\,v_2$$。当前答案 $$O = \bar O_A / l_A$$。

**第 3 步：块 B 到达，先改判最大值。** $$m_{\text{new}} = \max(2, 3) = 3$$——块 A 的指数基准过期了。**修正系数 $$e^{m_{\text{old}} - m_{\text{new}}} = e^{-1} = 0.368$$**：旧账全部乘它——$$l_A \to 0.368\times1.368 = 0.503$$，$$\bar O_A \to 0.135\,v_1 + 0.368\,v_2$$（每个旧指数统一降价一档，相对关系不变）。

**第 4 步：并入块 B。** $$l = 0.503 + e^{3-3} + e^{0-3} = 0.503 + 1 + 0.0498 = 1.553$$；$$\bar O = 0.135\,v_1 + 0.368\,v_2 + 1\,v_3 + 0.0498\,v_4$$；$$O = \bar O / 1.553$$。**全程没存过完整的 4 分数行**（真场景里就是那个 $$n\times n$$ 矩阵）——每块用完即弃。

**第 5 步：与全量 softmax 对账。** 全量分母 $$= e^1 + e^2 + e^3 + e^0 = 2.718+7.389+20.09+1 = 31.19$$；在线账本换算：$$l\times e^{m} = 1.553\times20.09 = 31.19$$ ✓ **分毫不差**。权重对照：$$v_1$$ 位 $$0.135/1.553 = 0.087$$ vs $$2.718/31.19 = 0.087$$ ✓；$$v_3$$ 位 $$1/1.553 = 0.644$$ vs $$20.09/31.19 = 0.644$$ ✓——**精确算法，不是近似**。

**第 6 步：省的到底是什么账。** $$n=4096$$ 时每头分数矩阵 $$= 4096^2\times 2\text{B} = 33.5\text{MB}$$——标准实现要把它写回 HBM（~1.5-3TB/s）再读回来（求 max/和、归一、乘 V 至少来回两三趟）；Flash 让 $$128\times128$$ 的块全程住在 SRAM（~19TB/s）算完即弃——**省的是搬运不是浮点**（浮点一次没少算）。

## 3. 直觉解释

- **IO 才是瓶颈**：GPU 有三级存储（寄存器/SRAM ~19TB/s、HBM ~1.5-3TB/s）——标准实现把 $$n^2$$ 矩阵写回 HBM 再读回来，Flash 把整块计算关在 SRAM 里
- **在线 softmax 的魔法**：softmax 需要全局 max 和全局和才能归一化——分块算时先"预归一化"，后面块发现更大值时**回头修正**（用 $$e^{m_{old}-m_{new}}$$ 缩放系数）——数学严格等价
- **算术强度**：反复用 SRAM 中的数据做矩阵乘 → 每字节读写支撑更多浮点运算 → GPU 利用率起飞
- **本质**：不是近似算法——精确注意力，只是"重新安排了写作业的顺序"

## 4. 出处

| 论文 | 贡献 |
|---|---|
| [FlashAttention - Fast and Memory-Efficient Exact Attention with IO-Awareness](/ai-fa/explore/10-Papers/01-架构演进/FlashAttention- Fast and Memory-Efficient Exact Attention with IO-Awareness（FlashAttention）) | 提出 tiling + online softmax |

## 5. 数学概念分解

- [注意力核心公式](/ai-fa/explore/30-Formulas/注意力核心公式)：被重排的母公式
- [softmax函数](/ai-fa/explore/40-Concepts/softmax函数)：数值稳定与在线化
- [注意力计算复杂度](/ai-fa/explore/30-Formulas/注意力计算复杂度)：IO 复杂度视角

## 6. 自测

1. 块 B 到达后旧统计怎么修？（乘 $$e^{m_{\text{old}}-m_{\text{new}}}$$——例中 $$e^{-1}=0.368$$：旧和 1.368→0.503，旧输出同步缩）
2. 为什么说 Flash 是精确算法？（在线账本 $$\times\, e^{m}$$ = 全量分母：31.19 = 31.19——只是重排计算顺序，数学恒等）
3. $$n=4096$$、fp16：每头分数矩阵多大？（$$4096^2\times2 = 33.5\text{MB}$$——被消灭的正是它的 HBM 来回搬运）
4. Flash 与线性注意力的本质区别？（改计算图/精确 vs 改数学/近似——正交路线，可叠加）

## 7. 与其他公式的关系

- ≡ **等价变形**（数学不变）：[注意力核心公式](/ai-fa/explore/30-Formulas/注意力核心公式)
- → 被所有训练/推理框架默认采用；长上下文可行性的工程基石
- 对比线性注意力（Performer 等）：它们改**数学**（近似），Flash 不改数学只改**计算图**——两条路线正交可叠加
