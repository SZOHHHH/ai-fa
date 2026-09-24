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

**KV Cache 只存 $$c_t^{KV}$$**（一个 $$d_c$$ 维向量代替所有头的全部 K/V）。

配套**解耦 RoPE**（因 RoPE 旋转与低秩压缩不可交换，位置部分单独处理）：
$$q_t = W^{UQ} c_t^{Q}, \quad q_t^{R} = W^{QR} h_t \quad (\text{位置分量单独走标准 RoPE})$$

## 2. 表示对照表

| 表示名 | Cache 体积（相对 MHA） | 出处 | 说明 |
|---|---|---|---|
| MHA | 100% | Transformer 2017 | 基准 |
| MQA | $$1/h$$（如 1/32） | [Efficiently Scaling Transformer Inference](/ai-fa/explore/10-Papers/01-架构演进/Efficiently Scaling Transformer Inference（MQA）) | 最省但质量略降 |
| GQA | $$g/h$$（如 8/32） | [GQA - Training Generalized Multi-Query Transformer Models from Multi-Head Checkpoints](/ai-fa/explore/10-Papers/01-架构演进/GQA- Training Generalized Multi-Query Transformer Models from Multi-Head Checkoffs（GQA）) | 质量/成本甜点（LLaMA-2/3 采用） |
| **MLA** | ≈ 低秩比（$$d_c/d$$，可低至 ~10%）+ 解耦项 | [DeepSeek-V2 - A Strong, Economical, and Efficient Mixture-of-Experts Language Model](/ai-fa/explore/10-Papers/01-架构演进/DeepSeek-V2- A Strong, Economical, and Efficient Mixture-of-Experts Language Model（MLA）) | 质量不降反升（等效大 KV 表达） |

## 教程：一张 cache 账单 + 吸收技巧

**第 1 步：MHA 基准（与 [KV缓存](/ai-fa/explore/40-Concepts/KV缓存) 同一副算盘）。** 7B 配置：32 层×32 头×128 维×fp16，上下文 4096 → 每请求 2.15GB。换算到"每 token 每层存几个元素"：$$2\times32\times128 = 8192$$（K 4096 + V 4096）。

**第 2 步：MLA 只存摘要。** 压缩维 $$d_c = 512$$ + 解耦 RoPE 的 $$k^R$$ 64 维 $$= 576$$ 元素——占比 $$576/8192 = 7\%$$。GB 账：$$2.15\times0.07 \approx 0.15\text{GB}$$/请求。**对照 GQA-8 的 0.54GB：MLA 再省 3.6 倍且每头表达力一个不少**（GQA 砍 KV 头、MLA 压 KV 表示——省的深度不同）。

**第 3 步：推理时怎么"现榨"出 K/V（吸收技巧）。** 第 $$i$$ 头的打分 $$q^{(i)\top}k^{(i)} = q^{(i)\top}W^{UK}_{(i)}c_t^{KV}$$——**把 $$W^{UK}_{(i)}$$ 先乘进 query 侧** $$(W^{UK}_{(i)})^\top q^{(i)}$$，直接拿 $$d_c$$ 维的 $$c_t$$ 打分，**根本不升维出每头 K**；V 同理把 $$W^{UV}$$ 吸进输出投影。矩阵乘法**结合律换序**——与 Performer 换序（[稀疏与线性注意力](/ai-fa/explore/40-Concepts/稀疏与线性注意力) §教程）同一招数学。

**第 4 步：为什么 RoPE 必须单独走一条道。** 旋转 $$R_m$$ 与升维投影 $$W^{UK}$$ **不可交换**：若把位置旋转做在压缩通道里，升维还原时位置信息会被投影搅乱（旋转 ∘ 投影 ≠ 投影 ∘ 旋转）。解法：带位置的 $$q^R, k^R$$（64 维小通道）绕开压缩、走标准 RoPE；无位置的内容走压缩大通道——**两条道在注意力打分处会合**（打分 = 内容分 + 位置分）。

**第 5 步：读法。** MLA = 低秩假设（KV 活在低维流形）+ 结合律搬运（吸收）+ 位置分流（解耦 RoPE）——三件套换"cache 从图书馆变摘要卡"。

## 3. 直觉解释

- **低秩假设**：KV 投影矩阵冗余度高——各头的 K/V 其实活在低维流形上，压到 $$d_c$$ 维几乎无损
- **"存摘要不存全文"**：MHA 存每个头的 K 和 V（$$h \times d$$）；MLA 只存**共享潜在摘要** $$c^{KV}$$，用时现场升维——cache 从"图书馆"变成"摘要卡"
- **解耦 RoPE 的原因**：旋转矩阵 $$R_m$$ 与升维投影 $$W^{UK}$$ 不可交换（$$\text{旋转} \circ \text{投影} \neq \text{投影} \circ \text{旋转}$$）——把带位置的部分（$$q^R, k^R$$）从压缩通道剥离，各走各路
- **与 LoRA 的精神同源**（跨线呼应）：低秩分解——LoRA 用它增（$$\Delta W = BA$$），MLA 用它减（压缩表示）——**同一数学的两种用途**

## 4. 出处

| 论文 | 贡献 |
|---|---|
| [DeepSeek-V2 - A Strong, Economical, and Efficient Mixture-of-Experts Language Model](/ai-fa/explore/10-Papers/01-架构演进/DeepSeek-V2- A Strong, Economical, and Efficient Mixture-of-Experts Language Model（MLA）) | 提出（DeepSeek-V2/V3/R1 全系采用） |

## 5. 数学概念分解

- [注意力机制](/ai-fa/explore/40-Concepts/注意力机制)：母结构
- [KV缓存](/ai-fa/explore/40-Concepts/KV缓存)：优化目标
- [RoPE旋转位置编码](/ai-fa/explore/30-Formulas/RoPE旋转位置编码)：解耦的原因
- [位置编码](/ai-fa/explore/40-Concepts/位置编码)：位置与压缩的冲突

## 6. 自测

1. 7B 配置（32 头/128 维/$$d_c{=}512$$+64）MLA cache 占 MHA 几成？（$$576/8192 = 7\%$$→约 0.15GB vs 2.15GB）
2. "吸收"用的什么数学？（矩阵乘结合律换序——$$q^\top W^{UK} c$$ 把升维矩阵搬到 query 侧，免物化每头 K）
3. RoPE 为什么不能进压缩通道？（旋转与线性投影不可交换——位置信息会被升维搅乱；故 64 维 $$k^R$$ 单列 cache）
4. MLA 与 GQA 省显存的路径差异？（GQA 砍 KV 头数=硬省（表达打折）；MLA 低秩压缩=软省（等效大 KV 表达））

## 7. 与其他公式的关系

- → **改进自** [注意力机制](/ai-fa/explore/40-Concepts/注意力机制) 的 KV 路线（MHA→MQA→GQA→MLA）
- → **组合** [RoPE旋转位置编码](/ai-fa/explore/30-Formulas/RoPE旋转位置编码)（解耦设计）
- 精神同源 LoRA（线 3 建链后回填）：低秩分解双向应用
- 与 [混合专家（MoE）](/ai-fa/explore/20-Algorithms/混合专家（MoE）) 并列：DeepSeek 系"省显存两大件"（MLA 省 KV cache、MoE 省激活 FLOPs）
