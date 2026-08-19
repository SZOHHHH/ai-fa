---
type: paper
title: Robust Speech Recognition via Large-Scale Weak Supervision
aliases: [Whisper]
year: 2022
authors: [Alec Radford, Jong Wook Kim, Tao Xu, Greg Brockman, Christine McLeavey, Ilya Sutskever]
venue: ICML 2023
arxiv: "2212.04356"
line: 多模态
matrix_coords: [编码器接口, 匹配, 接口级]
tags: [paper]
---

# Whisper（语音识别）

## 1. 一句话贡献

68 万小时弱监督音频 + 简单 encoder-decoder——不做花哨架构，靠数据规模与多样性做鲁棒 ASR，语音的"规模定律"实证。

## 2. 核心贡献

- **弱监督规模**：680k 小时（99k 多语言 + 125k 翻译对），标注噪声靠规模淹没
- **多任务 token 化**：转写/翻译/语言识别/时间戳全用特殊 token 编排——一个模型全家桶
- **零样本迁移**：未见语种/口音/噪声环境稳健（对比传统 ASR 的过拟合）

## 3. 方法概要

1. Log-Mel 频谱 → encoder → decoder 自回归生成文本 token
2. 训练目标就是 next-token（无 CTC/复杂对齐）
3. 弱过滤（去机器翻译腔、无监督语言检测）
4. 零样本评测 60+ 数据集

## 4. 核心公式

- 标准 seq2seq 语言建模损失（audio → text token 序列）——"语音也是语言"的极简主义

## 5. 与前作的关系

- 反潮流：同期 ASR 界在卷自监督（wav2vec 2.0 系），Whisper 回到"监督+规模"
- 数据哲学同 [[10-Papers/08-多模态/Scaling Up Visual and Vision-Language Representation Learning With Noisy Text Supervision（ALIGN）]]：噪声规模 > 精洗小数据

## 6. 影响与后续

- 开源 ASR 事实标准（字幕/会议/配音全行业）；多语言语音栈基座
- 语音 token 思路延续到语音 LLM（audio token 化）

## 7. 读前须知

[[20-Algorithms/Transformer]]（encoder-decoder 复习）、[[10-Papers/01-架构演进/Attention Is All You Need（Transformer）]]

> 近邻同族：[[BLIP-2- Bootstrapping Language-Image Pre-training with Frozen Image Encoders and Large Lan（BLIP-2）]] · [[Chameleon- Mixed-Modal Early-Fusion Foundation Models（Chameleon）]]

> 数学根基：[[视觉语言模型（VLM）]]

> 数学根基：[[注意力核心公式]] · [[CLIP对比损失]]
