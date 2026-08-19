---
type: formula
formula_id: LORA
aliases: [LoRA分解, LoRA公式, 低秩适配]
domain: 后处理与压缩
tags: [formula]
---

# LoRA 分解

## 1. 标准形式

$$W' = W_0 + \Delta W = W_0 + \frac{\alpha}{r}\, B A$$

- $W_0 \in \mathbb{R}^{d \times d}$：冻结的预训练权重
- $B \in \mathbb{R}^{d \times r},\ A \in \mathbb{R}^{r \times d}$：可训练低秩因子（$r \ll d$，典型 8–64）
- $\alpha/r$：缩放（$\alpha$ 固定超参，调 $r$ 不用重调学习率）
- **初始化**：$A \sim \mathcal{N}(0, \sigma^2)$、$B = 0$——训练起点 = 原模型（$\Delta W = 0$）
- 前向：$h = W_0 x + \frac{\alpha}{r} B(Ax)$（旁路结构，推理可合并 $W' = W_0 + BA$ 消额外延迟）

**可训参数**：$2dr$ 代替 $d^2$（$d=4096, r=8$ → 0.4%）

## 2. 表示对照表

| 表示名 | 公式核心 | 出处 | 说明 |
|---|---|---|---|
| LoRA（本库标准） | 如上 | [[10-Papers/03-后处理/LoRA- Low-Rank Adaptation of Large Language Models（LoRA）]] 2021 | 原始 |
| QLoRA | 基座 NF4 量化 + LoRA 旁路（BF16） | [[10-Papers/03-后处理/QLoRA- Efficient Finetuning of Quantized LLMs（QLoRA）]] | 显存极限压 |
| DoRA | $\Delta W$ 分解为幅度+方向分别适配 | [[10-Papers/03-后处理/DoRA- Weight-Decomposed Low-Rank Adaptation（DoRA）]] | 与全参微调差距缩小 |
| Adapter | $W_0 x + W_{\text{up}}\,\sigma(W_{\text{down}} x)$（串行瓶颈层） | [[10-Papers/03-后处理/Parameter-Efficient Transfer Learning for NLP（Adapter）]] | 前身（推理多延迟） |
| Prefix-Tuning | 每层前缀 KV 可学 | [[10-Papers/03-后处理/Prefix-Tuning- Optimizing Continuous Prompts for Generation（Prefix-Tuning）]] | 注意力输入侧 PEFT |

## 3. 直觉解释

- **核心假设**：适配一个任务的 $\Delta W$ 天然低秩——预训练模型已学好"通用骨架"，微调只是少数方向的微调（实证：$\Delta W$ 奇异值谱衰减快）
- **与残差的亲缘**：$h = W_0 x + BAx$ 正是 [[30-Formulas/残差连接]] 的形态——"默认不变，低秩修正"——与 ResNet 的 $x + \mathcal{F}(x)$ 同一哲学
- **零初始化 B 的妙处**：梯度 $\nabla_B \propto A$ 起步非零、$\nabla_A \propto B = 0$ 起步为零——但 $A$ 随机非零，$B$ 首步即动——训练稳定启动
- **为什么胜过 Adapter**：旁路可合并进 $W_0$——**推理零开销**；Adapter 串行多一层算子

## 4. 出处

| 论文 | 贡献 |
|---|---|
| [[10-Papers/03-后处理/LoRA- Low-Rank Adaptation of Large Language Models（LoRA）]] | 提出 |
| [[10-Papers/03-后处理/QLoRA- Efficient Finetuning of Quantized LLMs（QLoRA）]] | 量化组合（65B 单卡微调） |
| [[10-Papers/03-后处理/DoRA- Weight-Decomposed Low-Rank Adaptation（DoRA）]] | 幅度-方向分解改进 |

## 5. 数学概念分解

- [[40-Concepts/低秩分解]]：核心数学
- [[30-Formulas/残差连接]]：结构形态
- [[40-Concepts/量化]]：QLoRA 的另一半

## 6. 与其他公式的关系

- ≡ **形态同族** [[30-Formulas/残差连接]]（加性修正）
- ↔ **同数学异用途** [[30-Formulas/MLA多头潜在注意力]]：低秩分解用于"减"（压缩 KV）
- → **家族**：QLoRA（+量化）、DoRA（+分解幅度）、LoRA+（AB 不对称学习率）
- 与 [[30-Formulas/蒸馏损失]] 正交可组合
