---
type: formula
formula_id: MLA
aliases: [MLA公式, 多头潜在注意力, Multi-head Latent Attention, 低秩KV压缩]
domain: 架构
tags: [formula]
---

# MLA 多头潜在注意力

## 1. 标准形式

**压缩**（把 K/V 联合压进低秩潜在向量）：
$$c_t^{KV} = W^{DKV}\, h_t \quad (h_t \in \mathbb{R}^{d_{\text{model}}},\ c_t \in \mathbb{R}^{d_c},\ d_c \ll d_{\text{model}})$$

**升维还原**（每头的 K/V 从潜在向量还原）：
$$k_t^{(i)} = W^{UK}_{(i)}\, c_t^{KV}, \qquad v_t^{(i)} = W^{UV}_{(i)}\, c_t^{KV}$$

**KV Cache 只存 $c_t^{KV}$**（一个 $d_c$ 维向量代替所有头的全部 K/V）。

配套**解耦 RoPE**（因 RoPE 旋转与低秩压缩不可交换，位置部分单独处理）：
$$q_t = W^{UQ} c_t^{Q}, \quad q_t^{R} = W^{QR} h_t \quad (\text{位置分量单独走标准 RoPE})$$

## 2. 表示对照表

| 表示名 | Cache 体积（相对 MHA） | 出处 | 说明 |
|---|---|---|---|
| MHA | 100% | Transformer 2017 | 基准 |
| MQA | $1/h$（如 1/32） | [[10-Papers/01-架构演进/Efficiently Scaling Transformer Inference（MQA）]] | 最省但质量略降 |
| GQA | $g/h$（如 8/32） | [[10-Papers/01-架构演进/GQA- Training Generalized Multi-Query Transformer Models from Multi-Head Checkoffs（GQA）]] | 质量/成本甜点（LLaMA-2/3 采用） |
| **MLA** | ≈ 低秩比（$d_c/d$，可低至 ~10%）+ 解耦项 | [[10-Papers/01-架构演进/DeepSeek-V2- A Strong, Economical, and Efficient Mixture-of-Experts Language Model（MLA）]] | 质量不降反升（等效大 KV 表达） |

## 3. 直觉解释

- **低秩假设**：KV 投影矩阵冗余度高——各头的 K/V 其实活在低维流形上，压到 $d_c$ 维几乎无损
- **"存摘要不存全文"**：MHA 存每个头的 K 和 V（$h \times d$）；MLA 只存**共享潜在摘要** $c^{KV}$，用时现场升维——cache 从"图书馆"变成"摘要卡"
- **解耦 RoPE 的原因**：旋转矩阵 $R_m$ 与升维投影 $W^{UK}$ 不可交换（$\text{旋转} \circ \text{投影} \neq \text{投影} \circ \text{旋转}$）——把带位置的部分（$q^R, k^R$）从压缩通道剥离，各走各路
- **与 LoRA 的精神同源**（跨线呼应）：低秩分解——LoRA 用它增（$\Delta W = BA$），MLA 用它减（压缩表示）——**同一数学的两种用途**

## 4. 出处

| 论文 | 贡献 |
|---|---|
| [[10-Papers/01-架构演进/DeepSeek-V2- A Strong, Economical, and Efficient Mixture-of-Experts Language Model（MLA）]] | 提出（DeepSeek-V2/V3/R1 全系采用） |

## 5. 数学概念分解

- [[40-Concepts/注意力机制]]：母结构
- [[40-Concepts/KV缓存]]：优化目标
- [[30-Formulas/RoPE旋转位置编码]]：解耦的原因
- [[40-Concepts/位置编码]]：位置与压缩的冲突

## 6. 与其他公式的关系

- → **改进自** [[40-Concepts/注意力机制]] 的 KV 路线（MHA→MQA→GQA→MLA）
- → **组合** [[30-Formulas/RoPE旋转位置编码]]（解耦设计）
- 精神同源 LoRA（线 3 建链后回填）：低秩分解双向应用
- 与 [[20-Algorithms/混合专家（MoE）]] 并列：DeepSeek 系"省显存两大件"（MLA 省 KV cache、MoE 省激活 FLOPs）
