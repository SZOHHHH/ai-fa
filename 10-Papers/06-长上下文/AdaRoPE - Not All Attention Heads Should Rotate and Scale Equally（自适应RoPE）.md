---
type: paper
title: "AdaRoPE: Not All Attention Heads Should Rotate and Scale Equally"
aliases: [AdaRoPE]
year: 2026
authors: [Shaowen Wang, Yuke Zheng, Tansheng Zhu, Shuang Chen, Shaofan Liu, Suncong Zheng, Jian Li]
venue: arXiv v3 2026-09-11（cs.AI+cs.CL，蚂蚁/清华系）
arxiv: "2607.19363"
pdf: 已下载（PDF/）
line: 长上下文
matrix_coords: 位置编码×逐头自适应×长度外推
tags: [paper, 轮换命中, 长上下文]
layer: 精化层（摘要级+摘要核实，PDF 待深读）
---
# AdaRoPE: Not All Attention Heads Should Rotate and Scale Equally

> **中文速览**：做了什么——标准 RoPE 对所有注意力头用同一套旋转频率与缩放，AdaRoPE 指出**头的功能角色不同，需要的频率范围和注意力缩放因子也不同**（用简化检索任务+长度泛化场景做了经验+理论双重论证）；一刀切浪费嵌入维度、长上下文尤其掉分。怎么做的——给每个头配**可学习的旋转频率+可学习的注意力缩放因子**（AdaRoPE）。效果——预训练 LLM 上稳定超 RoPE 变体（含 partial RoPE、NoPE）；上下文扩展场景下，YaRN 式统一缩放被证明次优，逐头缩放外推/持续预训练两种设定都更好，且更保短上下文性能。

## 1. 一句话贡献
RoPE 的"统一频率表"批判：每个注意力头学自己的旋转频率与缩放因子——位置编码的参数应在"头"粒度自适应，而不是全局一刀切。

## 2. 核心贡献
- **诊断**：简化检索任务+长度泛化实验证明不同功能头需要不同频率范围/缩放——理论与经验双重验证。
- **机制**：AdaRoPE=逐头可学习旋转频率+逐头注意力缩放因子。
- **长度外推**：证明 YaRN 类**统一**频率/缩放在外推与长上下文持续预训练两设定都次优；逐头缩放扩展上下文同时更保短上下文性能。

## 3. 方法概要（分步）
1. 把 RoPE 的全局 base（决定频率表）与注意力温度改成逐头可学习参数。
2. 预训练时与模型 jointly 学习（头的功能分化自然带出频率分化）。
3. 上下文扩展：外推设定直接用学好的逐头参数；持续预训练设定在长序列上继续训。
4. 对比 partial RoPE（部分维度不旋转）、NoPE（去位置编码）与 YaRN（统一缩放外推）。

## 4. 核心公式
（待 PDF 精读补全——摘要级暂记直觉）RoPE 频率表逐头化：$\theta_{h,i} = b_h^{-2i/d}$，每头自己的 base $b_h$ 加自己的缩放 $\alpha_h$：**"近看细纹理、远看大轮廓"——有的头管局部句法（高频），有的头管长程检索（低频），强行共用一张频率表等于让所有头用同一副眼镜**。可学习化让分工自发涌现。

## 5. 与前作/矩阵关系
- ← 谱系前身：[[10-Papers/01-架构演进/RoFormer- Enhanced Transformer with Rotary Position Embedding（RoPE）|RoFormer（RoPE）]]（旋转位置编码之源——AdaRoPE 直接改造它的"全局频率表"假设）。
- ↔ 上下文扩展家族：[[10-Papers/06-长上下文/YaRN- Efficient Context Window Extension of Large Language Models（YaRN）|YaRN]]（统一缩放外推——本文证明其次优）、[[10-Papers/06-长上下文/Extending Context Window of Large Language Models via Positional Interpolation（PI）|PI]]（位置插值路线）。
- 方法论呼应：**"平均参数掩盖异质子群"的批判模式**——与 SinkProbe（sink 是优化目标产物非架构宿命）、WIDER（潜秩坍缩诊断）同一批判家族：全局统一设定常是对混合总体的错误简化。

## 6. 影响后续
- 位置编码从"全局设计"走向"逐头学习"，新模型可能默认逐头频率；YaRN 类统一外推法引用时需注明次优边界。
- 与 E1/E2 无域重叠（LLM 位置编码 vs 像素扩散 WM），arch 线教学参考。

## 7. 读前须知
- 前置：RoPE 旋转机制（[[30-Formulas/RoPE旋转位置编码]] 的复数旋转直觉 + [[40-Concepts/位置编码]] 总览；论文细节先看 [[10-Papers/01-架构演进/RoFormer- Enhanced Transformer with Rotary Position Embedding（RoPE）|RoFormer]] 卡）、频率-波长的直觉（低频=长程、高频=局部）。
- 理论部分（头的频率需求刻画）需线性代数基础；公式细节待 PDF 深读补第 4 节。
