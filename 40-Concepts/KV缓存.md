---
type: concept
aliases: [KV缓存, KV Cache, 键值缓存]
domain: 数学基础
tags: [concept]
---

# KV 缓存

## 1. 定义（直觉 → 形式）

**直觉**：自回归生成时，每生成一个新 token 都要"回顾"全部历史 token。但历史 token 的 Key/Value 投影**不会变**——算一次存起来，下次直接用。用显存换计算。

**形式**：生成第 $n$ 个 token 时：
- 无缓存：重算全部 $n$ 个位置的 $K = XW_K$, $V = XW_V$——$O(n^2 d^2)$ 浪费
- 有缓存：只算新位置的 $k_n, v_n$，与缓存拼接——前缀计算 $O(1)$ 每步

**缓存体积**（本库标准公式）：
$$\text{KV Cache} = 2 \times n_{\text{layers}} \times n_{\text{ctx}} \times h_{\text{kv}} \times d_{\text{head}} \times \text{bytes}$$
（2 = K 和 V；bytes 取决于精度：FP16=2、INT8=1）

## 2. 数学形式

- **显存压力示例**：7B 模型（32 层、32 头、128 维、FP16）上下文 128k → 每条请求 KV Cache ≈ 8GB+——**长上下文瓶颈往往不在计算在显存**
- **由此驱动的三大优化线**：
  1. 头数削减：MQA（1 组 KV）/ GQA（分组）→ [[10-Papers/01-架构演进/GQA- Training Generalized Multi-Query Transformer Models from Multi-Head Checkoffs（GQA）]]
  2. 压缩表示：MLA 低秩潜在 → [[10-Papers/01-架构演进/DeepSeek-V2- A Strong, Economical, and Efficient Mixture-of-Experts Language Model（MLA）]]
  3. 投机采样/前缀共享：系统层方案
- **PagedAttention**：操作系统式分页管理碎片化 cache（vLLM 核心）
- 与 [[30-Formulas/注意力计算复杂度]] 联动：prefill 是 compute-bound、decode 是 memory-bound

## 3. 为什么 AI 需要它

| 出现场景 | 用法 |
|---|---|
| 所有 LLM 推理引擎 | 默认开启 |
| GQA/MLA 论文的动机章节 | "为什么 cache 太大" |
| 批处理调度 | cache 显存决定并发数 |
| [[40-Concepts/注意力机制]] 多头家族对比 | MHA vs MQA vs GQA vs MLA 的真实差异就在 cache 体积 |

## 4. 常见误区

- **误区**：KV Cache 是可选优化——现代长上下文推理**离开它直接不可用**（算力浪费数量级）
- **误区**：cache 与模型权重同量级——7B/128k 场景 cache 可达权重的 2–3 倍
- **误区**：GQA "减少注意力头"——减少的是 **KV 投影头**，Q 头保留（表达能力基本不损）

## 5. 相关概念

- [[40-Concepts/注意力机制]]：缓存的对象
- [[30-Formulas/注意力计算复杂度]]：性能模型
- [[20-Algorithms/混合专家（MoE）]]：参数显存优化的另一极（权重稀疏 vs 缓存压缩）
