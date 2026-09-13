---
type: paper
title: "Does Deeper Reasoning Compromise Alignment? Revealing and Mitigating of Alignment Collapse in Large Reasoning Models"
aliases: [ALR, 对齐坍缩]
year: 2026
authors: [Yu-Hang Wu, Yu-Jie Xiong, Henghua Zhang, et al.]
venue: arXiv 2609.08186（2026-09-08，上海工程技大学 + HKUST + A*STAR）
arxiv: "2609.08186v1"
pdf: 10-Papers/PDF/Does Deeper Reasoning Compromise Alignment - Revealing and Mitigating Alignment Collapse in LRMs（ALR）.pdf
line: 推理模型
matrix_coords: 待评（轮换线）
tags: [paper]
---
# Does Deeper Reasoning Compromise Alignment - Revealing and Mitigating Alignment Collapse in LRMs（ALR）

## 1. 一句话贡献
挑战"推理模型更安全"的流行信念：推理深度越大，模型对输入扰动的服从性坍缩越严重（ALR 从 10% 升至 39.5%）——根因是长推理过程与原始输入争抢注意力（attention dilution），用残差连接动态重强调输入即可免训练修复。

## 2. 核心贡献
- **Alignment Collapse 现象 + ALR 度量**：干净输入上深度推理持续涨分（Qwen3-14B AIME 31.7→49.2），但加噪声/嵌套扰动后跌幅随深度放大（-2.9→-16.3）；ALR 量化这种"越想越经不起碰"
- **RT（Reasoning Trap）攻击范式**：故意诱导模型进入长推理，放大既有对抗攻击——攻击成功率随推理深度单调上升
- **机制归因 + RRA 防御**：Attention Dilution——自回归长生成中推理 token 持续稀释对原输入的注意力权重；RRA（Reasoning Residual Alignment）用残差连接把输入表征周期性注回，免训练、不加提示

## 3. 方法概要
1. 用 Qwen3 可切换推理深度（L=0/2048/4096）做受控实验：同题、同模型、只变深度
2. 两种外部扰动：无关噪声文本 / 指令嵌套包裹，测干净 vs 扰动的准确率差 → ALR
3. RT 攻击：构造引诱长思考的提示，让注意力稀释发生，再叠加常规越狱载荷
4. 注意力分析：观测原输入区间的注意力权重随生成步数的衰减曲线 → 定位 dilution
5. RRA：生成过程中以残差形式将输入编码 $h_x$ 以衰减权重加回当前隐状态，对抗稀释

## 4. 核心公式
- 对齐损失率（扰动下的相对衰退）：$ALR = \frac{A(L) - A'(L)}{A(L)}$，其中 $A(L)$/$A'(L)$ 为深度 $L$ 下干净/扰动输入的任务准确率
**直觉**：不看绝对分数，看"加一点扰动掉多少比例"——深度推理买来的分数是用鲁棒性付的账。
- RRA 残差注入（示意）：$\tilde{h}_t = h_t + \beta_t \cdot g(h_x)$，$\beta_t$ 随步数衰减
**直觉**：像给长跑选手定期补水——原指令的表征每隔一段被重新注入，防止注意力"跑远了忘了出发地"。

## 5. 与前作/矩阵关系
- 线锚：[[40-Concepts/注意力机制]]（根因在注意力竞争）· [[30-Formulas/残差连接]]（RRA 的武器就是残差）· [[40-Concepts/思维链（CoT）]]
- 相对同族：[[10-Papers/07-推理模型/CoT-Valve- Length-Compressible Chain-of-Thought Tuning（CoT-Valve）]] 压长度省算力，本文揭示长度的隐藏代价在安全面——一币两面
- 与 [[Think Wider - Mitigating Latent Rank Collapse in Implicit Chain-of-Thought Reasoning（WIDER）]] 共用"坍缩"病理学语言：一个坍缩在表征秩，一个坍缩在对齐鲁棒性

## 6. 影响后续
长 CoT 的安全审计多了"深度-鲁棒性"这条轴；RT 攻击给红队提供了"先诱深再打"的两段式范式；RRA 证明免训练注意力纠偏可行。

## 7. 读前须知
需要 [[40-Concepts/注意力机制]]（softmax 注意力权重分配的零和性）与 [[30-Formulas/残差连接]]；越狱攻击背景（GCG/PAIR）只需概念级了解。
