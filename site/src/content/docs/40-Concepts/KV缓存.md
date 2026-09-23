---
type: concept
aliases: [KV缓存, KV Cache, 键值缓存]
domain: 数学基础
tags: [concept]
---

# KV 缓存

## 1. 定义（直觉 → 形式）

**直觉**：自回归生成时，每生成一个新 token 都要"回顾"全部历史 token。但历史 token 的 Key/Value 投影**不会变**——算一次存起来，下次直接用。用显存换计算。

**形式**：生成第 $$n$$ 个 token 时：
- 无缓存：重算全部 $$n$$ 个位置的 $$K = XW_K$$, $$V = XW_V$$——$$O(n^2 d^2)$$ 浪费
- 有缓存：只算新位置的 $$k_n, v_n$$，与缓存拼接——前缀计算 $$O(1)$$ 每步

**缓存体积**（本库标准公式）：
$$\text{KV Cache} = 2 \times n_{\text{layers}} \times n_{\text{ctx}} \times h_{\text{kv}} \times d_{\text{head}} \times \text{bytes}$$
（2 = K 和 V；bytes 取决于精度：FP16=2、INT8=1）

## 2. 数学形式

- **显存压力示例**：7B 模型（32 层、32 头、128 维、FP16）上下文 128k → 每条请求 KV Cache ≈ 8GB+——**长上下文瓶颈往往不在计算在显存**
- **由此驱动的三大优化线**：
  1. 头数削减：MQA（1 组 KV）/ GQA（分组）→ [GQA - Training Generalized Multi-Query Transformer Models from Multi-Head Checkpoints](/ai-fa/explore/10-Papers/01-架构演进/GQA- Training Generalized Multi-Query Transformer Models from Multi-Head Checkoffs（GQA）)
  2. 压缩表示：MLA 低秩潜在 → [DeepSeek-V2 - A Strong, Economical, and Efficient Mixture-of-Experts Language Model](/ai-fa/explore/10-Papers/01-架构演进/DeepSeek-V2- A Strong, Economical, and Efficient Mixture-of-Experts Language Model（MLA）)
  3. 投机采样/前缀共享：系统层方案
- **PagedAttention**：操作系统式分页管理碎片化 cache（vLLM 核心）
- → 压缩极限新锚（260918）：[DeepSeek-V4.1-Flash](/ai-fa/explore/10-Papers/05-MoE/DeepSeek-V4.1-Flash Pushing the Limits of KV Cache Compression)（552B 多模态 MoE 正面攻坚 prefill 计算+HBM/SSD 存储+传输带宽三重瓶颈）
- 与 [注意力计算复杂度](/ai-fa/explore/30-Formulas/注意力计算复杂度) 联动：prefill 是 compute-bound、decode 是 memory-bound

## 教程：7B 模型 cache 体积手算（一张真实账单）

**第 1 步：代入公式。** LLaMA-2-7B：32 层、32 头、$$d_{head}=128$$、FP16（2 字节）、上下文 4096：
$$2 \times 32 \times 4096 \times 32 \times 128 \times 2\ \text{B} = 2\times32\times4096\times32\times128\times2$$
逐级算：$$2\times32=64$$；$$64\times4096=262{,}144$$；$$\times32=8.4\times10^6$$；$$\times128=1.07\times10^9$$ 元素；$$\times2\text{B} = 2.15\text{GB}$$——**每条请求 2.15GB**（权重才 14GB）。

**第 2 步：账单读法。** 批 8 并发 = 17GB cache + 14GB 权重 = 31GB——24GB 卡直接爆。**并发数由 cache 决定不由权重决定**：这就是 vLLM/PagedAttention 存在的理由（分页管理把碎片浪费压掉）。

**第 3 步：GQA 一改见效。** KV 头 32→8（分 4 组）：cache $$\times\frac{8}{32}$$ = **0.54GB/请求**——并发从 4 条变 30 条。Q 头一个不少（表达力基本无损）——**GQA 是"用最少的语义损失换最大的显存"的杠杆点**（[注意力机制](/ai-fa/explore/40-Concepts/注意力机制) §2 谱系表）。

**第 4 步：MLA 的极致（方向感）。** DeepSeek 的 MLA 不存原始 K/V，存**低秩潜在向量**（$$d_c\approx512$$ 一份+升维时重算）：cache 再降一个数量级——代价是注意力的实现复杂化（重吸收进权重）。路线总结：**砍头（GQA）→ 换表示（MLA）→ 系统层分页（vLLM）→ 极限压缩（V4.1-Flash）**。

**第 5 步：为什么历史 KV 不变可以缓存。** 因果掩码下第 $$i$$ 个 token 的 $$k_i, v_i$$ 只依赖**它自己**的输入向量（$$x_i W_K$$），与后面来了什么 token 无关——**算一次永远有效**（这是"自回归+因果"结构的红利；若做全双向注意力重排序，缓存全废）。

## 3. 为什么 AI 需要它

| 出现场景 | 用法 |
|---|---|
| 所有 LLM 推理引擎 | 默认开启 |
| GQA/MLA 论文的动机章节 | "为什么 cache 太大" |
| 批处理调度 | cache 显存决定并发数 |
| [注意力机制](/ai-fa/explore/40-Concepts/注意力机制) 多头家族对比 | MHA vs MQA vs GQA vs MLA 的真实差异就在 cache 体积 |

## 4. 常见误区

- **误区**：KV Cache 是可选优化——现代长上下文推理**离开它直接不可用**（算力浪费数量级）
- **误区**：cache 与模型权重同量级——7B/128k 场景 cache 可达权重的 2–3 倍
- **误区**：GQA "减少注意力头"——减少的是 **KV 投影头**，Q 头保留（表达能力基本不损）

## 5. 自测

1. 13B 模型（40 层/40 头/128 维）4k 上下文 FP16 的 cache？（$$2\times40\times4096\times40\times128\times2\approx3.4$$GB/请求）
2. GQA-8 组为什么表达力几乎不损？（Q 头全保留；K/V 只是"查询用的索引"，共享少量索引够用）
3. 什么情况下 KV 缓存失效？（非因果（双向/重排序）注意力——历史投影依赖上下文全貌）
4. prefill 与 decode 的瓶颈各是什么？（compute-bound / memory-bound——后者每步都要扫全 cache）

## 6. 相关概念

- [注意力机制](/ai-fa/explore/40-Concepts/注意力机制)：缓存的对象
- [注意力计算复杂度](/ai-fa/explore/30-Formulas/注意力计算复杂度)：性能模型
- [混合专家（MoE）](/ai-fa/explore/20-Algorithms/混合专家（MoE）)：参数显存优化的另一极（权重稀疏 vs 缓存压缩）
- [Tokenization（分词）](/ai-fa/explore/40-Concepts/Tokenization（分词）)：缓存与计价以 token 为单位
