---
type: concept
aliases: [视觉语言模型, VLM, 多模态大模型, 视觉指令微调]
domain: 多模态
tags: [concept]
---

# 视觉语言模型 VLM

## 1. 定义（直觉 → 形式）

**直觉**：给 LLM 装上眼睛。图像经视觉编码器转成"视觉 token"，插入语言模型的 token 流——模型像读文字一样"读图"。

**形式**：$p(y \mid x_{\text{text}}, x_{\text{img}})$，其中 $x_{\text{img}} \to \{\hat v_i\}_{i=1}^K$（投影后的视觉嵌入序列）拼进 LLM 上下文，自回归生成 $y$。

## 2. 数学形式

**三代范式**：

| 代 | 连接方式 | 代表 | 特点 |
|---|---|---|---|
| 交叉注意力 | 视觉进 LLM 的 cross-attn 层 | Flamingo | 冻结 LLM，插入门控注意力 |
| 查询塔 | 可学查询向量抽取视觉特征 | BLIP-2 (Q-Former) | 视觉压缩到固定长度 |
| 线性投影（主流） | MLP 把 ViT patch 投到 LLM 词嵌入空间 | LLaVA | 极简、端到端微调 |

- **视觉 token 化**是所有范式的公共底层：图像 → 序列（与 [[10-Papers/01-架构演进/An Image is Worth 16x16 Words- Transformers for Image Recognition at Scale（ViT）]] 的 patch 化同构）
- **指令微调迁移**：文本指令数据格式直接用于图文对（LLaVA 的 GPT-4 生成指令数据）

## 教程：一张图进 LLM 的全程账单（LLaVA 路线）

**第 1 步：切块。** 224×224 图按 16×16 patch 切：$(224/16)^2 = 196$ 块——**图变序列**（与 ViT 同构，[[10-Papers/01-架构演进/An Image is Worth 16x16 Words- Transformers for Image Recognition at Scale（ViT）|ViT]]）。

**第 2 步：编码。** 每块过 ViT 编码器得一个向量（196 个视觉嵌入）——视觉编码器通常冻结（CLIP 预训练产物，[[30-Formulas/CLIP对比损失]] 的对齐空间）。

**第 3 步：投影。** MLP 把每个视觉嵌入投到 LLM 词嵌入空间（196 × d_model）——**"翻译"成 LLM 听得懂的方言**；LLaVA 的全部新增参数就这一个投影层（两代连接方式见 §2 表）。

**第 4 步：拼上下文。** 序列 = [系统指令] + [196 个视觉 token] + [用户问题"图里有什么？"]——LLM 像读一段 196 词的"图语"再自回归作答。上下文账单：每张图固定消耗 ~200 token 位。

**第 5 步：训练配方。** 阶段一对齐（图文对训练投影层）→ 阶段二指令微调（GPT-4 生成的图文指令数据，文本指令格式直接迁移）——**视觉是"外挂的眼睛"，LLM 本体不动**（三代范式的演进 = 连接方式的简化史：交叉注意力→查询塔→线性投影胜出）。

## 3. 为什么 AI 需要它

| 出现场景 | 用法 |
|---|---|
| [[10-Papers/08-多模态/Flamingo- a Visual Language Model for Few-Shot Learning（Flamingo）]] | 交叉注意力范式开山 |
| [[10-Papers/08-多模态/BLIP-2- Bootstrapping Language-Image Pre-training with Frozen Image Encoders and Large Lan（BLIP-2）]] | Q-Former |
| [[10-Papers/08-多模态/Visual Instruction Tuning（LLaVA）]] | 线性投影+指令微调（开源主流） |
| GPT-4V/ Claude / Gemini | 生产级多模态 |

## 4. 常见误区

- **误区**：VLM = CLIP——CLIP 只对齐嵌入（判别），VLM 生成语言（生成）；后者用前者的编码器很常见
- **误区**：视觉 token 与文本 token "地位相同"——多数架构中视觉 token 只在输入侧（不被预测）
- **误区**：多模态=图文——音（Whisper）、视频（V-JEPA/Sora）各自独立技术栈

## 5. 自测

1. 224×224、patch 16：几个视觉 token？（$(224/16)^2 = 196$——图变序列）
2. LLaVA 新增训练参数是什么？（一个投影 MLP——视觉嵌入译成 LLM 方言）
3. 三代连接范式？（交叉注意力（Flamingo）→ 查询塔（BLIP-2）→ 线性投影（LLaVA 胜出））
4. VLM 与 CLIP 的分工？（CLIP 对齐嵌入（判别）；VLM 生成语言——后者常用前者的编码器）

## 6. 相关概念

- [[30-Formulas/CLIP对比损失]]：对齐预训练
- [[40-Concepts/注意力机制]]：连接层的载体
- [[20-Algorithms/世界模型]]：视频理解的世界模型视角

- → 后继补记（260916）：[[10-Papers/07-推理模型/CORE Improving Compositional Reasoning in MLLM Embedding via Reranker Distillation|CORE]]（MLLM 嵌入的组合推理：重排器蒸馏）
