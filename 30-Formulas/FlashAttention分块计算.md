---
type: formula
formula_id: FLASH-ATTN
aliases: [FlashAttention, 分块注意力, tiling attention, IO感知注意力]
domain: 架构
tags: [formula]
---

# FlashAttention 分块计算

## 1. 标准形式

**数学上完全等于** [[30-Formulas/注意力核心公式]]：$\mathrm{softmax}(QK^\top/\sqrt{d_k})V$。
变化只在**计算顺序**：把 $Q, K, V$ 分成小块，逐块载入 SRAM（快显存），用**在线 softmax**（online softmax）增量更新结果，永不物化 $n \times n$ 注意力矩阵。

**在线 softmax 更新式**（灵魂算法）：
$$m_{\text{new}} = \max(m_{\text{old}},\ m_{\text{block}}), \quad l_{\text{new}} = e^{m_{\text{old}} - m_{\text{new}}} l_{\text{old}} + e^{m_{\text{block}} - m_{\text{new}}} \sum_j e^{s_j}$$
$$O_{\text{new}} = \frac{e^{m_{\text{old}} - m_{\text{new}}} l_{\text{old}}\, O_{\text{old}} + e^{S_{\text{block}} - m_{\text{new}}} V_{\text{block}}}{l_{\text{new}}}$$
（$m$：运行最大值；$l$：运行分母和；$O$：运行输出——见块到时修正此前所有块）

## 2. 表示对照表

| 表示名 | 核心思想 | 出处 | 说明 |
|---|---|---|---|
| FA1（tiling + online softmax） | 如上 | 2022 | 原始 |
| FA2（减少non-matmul FLOPs） | 更优的分块与重计算 | 2023 | 常数再降 ~2× |
| FA3（异步/warp 特化） | Hopper 硬件深挖 | 2024 | FP8 支持 |
- 反向传播：不存注意力矩阵，**重算**（recompute）——省显存的代价换更少的 HBM 读写，反而更快

## 3. 直觉解释

- **IO 才是瓶颈**：GPU 有三级存储（寄存器/SRAM ~19TB/s、HBM ~1.5-3TB/s）——标准实现把 $n^2$ 矩阵写回 HBM 再读回来，Flash 把整块计算关在 SRAM 里
- **在线 softmax 的魔法**：softmax 需要全局 max 和全局和才能归一化——分块算时先"预归一化"，后面块发现更大值时**回头修正**（用 $e^{m_{old}-m_{new}}$ 缩放系数）——数学严格等价
- **算术强度**：反复用 SRAM 中的数据做矩阵乘 → 每字节读写支撑更多浮点运算 → GPU 利用率起飞
- **本质**：不是近似算法——精确注意力，只是"重新安排了写作业的顺序"

## 4. 出处

| 论文 | 贡献 |
|---|---|
| [[10-Papers/01-架构演进/FlashAttention- Fast and Memory-Efficient Exact Attention with IO-Awareness（FlashAttention）]] | 提出 tiling + online softmax |

## 5. 数学概念分解

- [[30-Formulas/注意力核心公式]]：被重排的母公式
- [[40-Concepts/softmax函数]]：数值稳定与在线化
- [[30-Formulas/注意力计算复杂度]]：IO 复杂度视角

## 6. 与其他公式的关系

- ≡ **等价变形**（数学不变）：[[30-Formulas/注意力核心公式]]
- → 被所有训练/推理框架默认采用；长上下文可行性的工程基石
- 对比线性注意力（Performer 等）：它们改**数学**（近似），Flash 不改数学只改**计算图**——两条路线正交可叠加
