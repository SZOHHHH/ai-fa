---
type: formula
formula_id: CLIP-LOSS
aliases: [CLIP损失, 对比学习损失, InfoNCE, 双塔对比]
domain: 多模态
loss_type: contrastive
tags: [formula]
---

# CLIP 对比损失

## 1. 标准形式

$$\mathcal{L} = -\frac{1}{2}\mathbb{E}\!\left[ \sum_{i} \log\frac{e^{\langle v_i, t_i\rangle/\tau}}{\sum_{j} e^{\langle v_i, t_j\rangle/\tau}} + \sum_{i} \log\frac{e^{\langle v_i, t_i\rangle/\tau}}{\sum_{j} e^{\langle v_j, t_i\rangle/\tau}} \right]$$

- $v_i$：图像嵌入；$t_i$：文本嵌入（同一对图文为正样本，批内其余为负样本）
- $\tau$：可学习温度（[[40-Concepts/温度参数]] 的第四位使用者）
- 双向对称：图→文与文→图各做一次 softmax 交叉熵

## 2. 表示对照表

| 表示名 | 公式核心 | 出处 | 说明 |
|---|---|---|---|
| InfoNCE（本库标准） | 如上 | [[10-Papers/08-多模态/Learning Transferable Visual Models From Natural Language Supervision（CLIP）]] | 双向对称版 |
| ALIGN 版 | 同结构、噪声数据 18 亿对 | [[10-Papers/08-多模态/Scaling Up Visual and Vision-Language Representation Learning With Noisy Text Supervision（ALIGN）]] | 规模战胜清洗 |
| SigLIP | sigmoid 逐对独立（非 softmax 批内竞争） | 2023 | 更稳更大批 |
| 图像-文本-其他 | 三塔/多模态扩展 | ImageBind 等 | 嵌入空间家族 |

## 3. 直觉解释

- **"警察抓配对"**：批内 N 对图文打乱洗牌，模型学习把正确配对拉近、错误推远——softmax 分母里全是负样本
- **为什么用对比不用生成**：不重建像素/文本（省算力），只对齐语义空间——"对齐"比"描述"便宜
- **零样本分类**：把类别写成文本（"一张猫的照片"），算图像与各文本的余弦相似度取最大——**分类器免费**
- **温度 τ 可学习**：控制批内负样本的"难度分布"——τ 小则聚焦最难的负样本
- `#loss/contrastive`（本库四大 LOSS 家族的最后一块拼图）

## 4. 出处

| 论文 | 贡献 |
|---|---|
| [[10-Papers/08-多模态/Learning Transferable Visual Models From Natural Language Supervision（CLIP）]] | 4 亿图文对 + 对比对齐 |
| [[10-Papers/08-多模态/Scaling Up Visual and Vision-Language Representation Learning With Noisy Text Supervision（ALIGN）]] | 噪声规模路线 |

## 5. 数学概念分解

- [[40-Concepts/内积]]：相似度
- [[40-Concepts/softmax函数]]：批内竞争
- [[40-Concepts/温度参数]]：τ
- [[40-Concepts/期望]]：batch 期望

## 6. 与其他公式的关系

- `#loss/contrastive` 与 [[30-Formulas/GAN目标]]（对抗）、[[30-Formulas/DDPM训练目标]]（回归）、[[30-Formulas/DPO损失]]（比率）并列为四大损失家族——**本页补全家族最后一块**
- → 被扩散模型复用：CFG 与 SD 系列的文本编码器即 CLIP
- → 对齐思想延续到 VLM（LLaVA 系的视觉-语言投影本质是弱化版对齐）
