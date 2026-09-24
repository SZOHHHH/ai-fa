---
type: paper
title: "Causal Forcing: Autoregressive Diffusion Distillation Done Right for High-Quality Real-Time Interactive Video Generation"
aliases: [Causal Forcing]
year: 2026
authors: [Hongzhou Zhu, Min Zhao, Guande He, Hang Su, Chongxuan Li, Jun Zhu]
venue: ICML 2026
arxiv: "2602.02214"
pdf: 已下载（PDF/Causal Forcing（因果强制蒸馏）.pdf）
line: 世界模型与JEPA
matrix_coords: [蒸馏加速(扩散→少步AR), 显式像素, 可操作(动作条件)]
tags: [paper]
---

# Causal Forcing（清华 thu-ml）：自回归扩散蒸馏的"正确姿势"

## 1. 一句话贡献

证明**从双向扩散 teacher 蒸馏 AR student 存在理论障碍**（违反逐帧单射性 → 蒸馏退化为条件期望解），并用"**AR teacher 做 ODE 初始化 + Self Forcing 同款 DMD**"两步走绕开它——实时交互视频生成的蒸馏基线自此改写（超 Self Forcing：Dynamic Degree +19.3% / VisionReward +8.7%）。

## 2. 核心贡献

- **理论诊断（本卡核心）**：ODE 蒸馏要求 **frame-level injectivity**（每个噪声帧在 PF-ODE 下唯一对应一个干净帧）；双向 teacher → AR student 的架构 gap 破坏该条件 → 学生学不到 teacher 的流图，**只能收敛到条件期望解（conditional expectation）→ 画质退化**；
- **处方**：先用一个**自回归 teacher** 做 ODE 蒸馏初始化（桥接架构差），再套 Self Forcing 的非对称 DMD 流程；
- **实时成果**：少步 AR 生成达到实时交互水准，全面超基线。

## 3. 方法概要

1. 把双向视频扩散（全注意力、一次去噪整段）转成 AR 形式（因果注意力、逐帧流式）——直接 DMD 蒸馏会踩单射性坑；
2. 先训练/构造 AR teacher（与 student 同因果架构），对其做 ODE 初始化蒸馏（此时单射性成立）；
3. 再做非对称 DMD（real score=frozen teacher、fake score=可学习，同 RL05.5_蒸馏方法族全览_b到v3 里 v3 臂照抄的 DMD 结构）；
4. 后续 ++ 版（2605.15141）做规模化（Causal ODE / Causal Consistency Distillation 两路初始化）。

## 4. 核心公式

**单射性条件（直觉版）**：ODE 蒸馏的损失最优解是流图复制 $$\Leftrightarrow$$ 映射 $$z_t \mapsto z_0$$ 在 teacher 的 PF-ODE 下逐帧可逆；架构 gap 使最优解滑向：

`$$D^*(z_t) = \mathbb{E}[z_0 \mid z_t]$$`

**直觉解释**：这正是**条件期望=均值塌缩**——多模态未来被平均。**与我们 E1 的 L2 探针实测（teacher 事件态方差 16.5× → MSE 蒸馏后塌 172×）是同一现象：他们给了理论证明，我们给了 RL 下游的实测读数，两边互证**。

## 5. 与前作/矩阵关系

- ← 继承 [Diffusion Forcing- Next-token Prediction Meets Full-Sequence Diffusion](/ai-fa/explore/10-Papers/09-世界模型与JEPA/Diffusion Forcing- Next-token Prediction Meets Full-Sequence Diffusion（Diffusion Forcing）)（逐帧噪声框架）与 Self Forcing（AR 实时化，未入库）；
- ≡ 平行于我们的 EMDMD 线：同为"DMD 系蒸馏+多模态保真"，差别=他们的考场是视频指标，我们的考场是 RL 分数；
- → 后继：Causal Forcing++（2605.15141，规模化）、[minWM](/ai-fa/explore/10-Papers/09-世界模型与JEPA/minWM- 全栈实时交互世界模型框架（minWM）)（框架化）。

## 6. 影响后续

实时交互 WM 的蒸馏标准配方（AR 初始化→DMD）；**对我们：②面修复配方的外部参考——我们从未检查过"teacher 架构与 student 的单射性"前提，DMD 失败可能有此成分**。

## 7. 读前须知

PF-ODE 与流图（[NFE（函数求值次数）](/ai-fa/explore/40-Concepts/NFE（函数求值次数）)）；DMD 双网络结构；条件期望与均值塌缩（RL05_Distillation方法_决策保真蒸馏）。

