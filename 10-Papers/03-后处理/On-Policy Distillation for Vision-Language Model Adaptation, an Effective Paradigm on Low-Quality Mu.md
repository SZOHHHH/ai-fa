---
type: paper
title: "On-Policy Distillation for Vision-Language Model Adaptation, an Effective Paradigm on Low-Quality Multimodal Data"
aliases: [OnPoKD, OnPoKD 在线策略蒸馏, VLM 适配的在线策略蒸馏]
year: 2026
authors: [Hongyuan Zhang, Xianda Guo, Yanlun Peng 等]
venue: arXiv 2609.10321（Elsevier 模板预印本，港大/长城汽车等）
arxiv: "2609.10321v1"
pdf: 10-Papers/PDF/On-Policy Distillation for Vision-Language Model Adaptation, an Effective Paradigm on Low-Quality Mu.pdf
line: 后处理
matrix_coords: 蒸馏×后处理｜VLM 适配｜目标构造轴
tags: [paper, 精读层]
layer: 精读
---
# On-Policy Distillation for Vision-Language Model Adaptation, an Effective Paradigm on Low-Quality Multimodal Data

> **精读层卡**（daily 自动采集 2026-09-10 建卡，当日推荐篇 PDF 前 12 页全读升级；元数据出自 arXiv API=已核实）。

## 1. 一句话贡献

把"蒸馏目标怎么构造"从固定配方升级为**策略决策**：一个轻量在线控制器按逐样本/逐阶段的可靠性线索，动态混合"适配教师 + 冻结零样本先验 + 硬标签"三路监督信号，且控制器只在训练期存在、部署时丢弃——推理架构与成本零改变。

## 2. 核心贡献

- **首个把 on-policy 蒸馏用于 VLM 适配**的框架（OnPoKD），核心论点：蒸馏目标构造应是**动态训练决策**而非固定 recipe——教师在类/域偏移下并不可靠，固定教师中心目标会把教师的错误也蒸给学生。
- **三源监督的样本级自适应混合**：教师（任务适配知识）、零样本先验（保开放词汇泛化）、硬标签（软目标冲突时的锚）——相对权重随样本可靠性与训练进度变化。
- **验证反馈的策略更新**：控制器由 held-out 验证流的 action-matching 损失更新（非 RL、非穿过学生优化器的元梯度），把目标构造导向**可迁移性**而非短期训练损失下降。
- **零部署开销**：训练时间 +19~25%、内存 +51%，推理路径与 PromptKD 等基线完全一致；11 数据集 Base-to-Novel HM 83.73→84.62（新类 +1.40 为主），Cross-Dataset 均值 72.66（+1.33）。

## 3. 方法概要

1. **问题设定**：适配教师 $T$、学生 $S$、冻结零样本先验 $P$（同一个 CLIP 的 zero-shot 形态）各自输出 logits——标准 logit 蒸馏对**所有样本统一**用教师分布当目标，前向 KL 的质量覆盖性质让学生连教师在新类/偏移域上的错误也照单全收。
2. **状态构造（不新增任何前向）**：从 $T/S/P$ 已有的前向统计量拼状态向量——各自的置信度、top-2 裕度、归一化熵，加上教师-学生分歧（KL 与 argmax 不一致）、教师-先验冲突、师生图像特征对齐度，共 11 维；归一化训练进度 $p$ 单独作为动作调制项（训练早期保守、学生稳定后放开先验/标签干预）。
3. **动作输出（全部有界）**：两层 MLP 控制器（末端零初始化=起步即教师主导的保守动作）输出三件事——三路混合权重 $\lambda$（ simplex 上带各分量上限的 cap-and-renormalize 投影）、样本权重 $w$（clip 区间）、逐样本温度 $\tau$（clip 区间+不确定性残差）。
4. **自适应目标与训练**：目标 $q_i$ 是三路软目标的加权和，学生按加权 KL 拟合（Base-to-Novel 设定下先验只注入 novel 类切片，base 类仍归教师管）。
5. **验证反馈更新**：每 $K$ 步在验证 minibatch 上评估三模型正确性/置信度，确定性映射 $F_{val}$ 生成"应然动作"，控制器做 action-matching 回归——与学生的 KD 损失完全解耦，不回传穿过学生。
6. **部署**：控制器与先验分支整体丢弃，学生+适配文本分类器原样上线。

## 4. 核心公式

**状态向量**（式 2，可靠性线索打包）：

$s_i=[c_T,m_T,h_T,c_S,m_S,h_S,d_{KL}^{TS},d_{\text{argmax}}^{TS},a_{TS},d_{\text{argmax}}^{TP},d_{KL}^{TP}]$

其中 $c^M=\max_y p_i^M(y)$（置信度）、$m^M=p_i^M(y_1)-p_i^M(y_2)$（top-2 裕度）、$h^M=-\frac{1}{\log C}\sum_y p_i^M(y)\log p_i^M(y)$（归一化熵，见 [[40-Concepts/KL散度]] 与 [[40-Concepts/温度参数]]）。**直觉**：先问"每个模型自己慌不慌"（不确定性三件套），再问"教师和学生/先验吵没吵架"（分歧对），最后看表征层的迁移质量（特征对齐 $a_{TS}$）。

**自适应蒸馏目标**（式 11，本文核心）：

$q_i=\lambda_i^T\,\text{softmax}(z_i^T/\tau_i)+\lambda_i^P\,q_i^P+\lambda_i^H\,q_i^H$

**直觉**：蒸馏目标不再是"教师的分布"，而是**三路监督的逐样本加权凸组合**——教师靠谱时 $\lambda^T$ 大（继承适配知识），教师与先验打架且先验对时 $\lambda^P$ 升（保开放词汇泛化），两路软目标都不可靠时 $\lambda^H$ 升（硬标签锚定）。对比 [[30-Formulas/蒸馏损失]] 的总损失 $\alpha L_{KD}+(1-\alpha)L_{CE}$：那里的 $\alpha$ 是全局固定超参，这里被拆成逐样本、逐阶段、带上限的三个 $\lambda_i$。

**策略引导训练目标**（式 13）：

$L_{\text{OnPoKD}}=\frac{1}{B}\sum_{i=1}^{B} w_i\,\tau_i^2\, KL(q_i\,\|\,\text{softmax}(z_i^S/\tau_i))$

**直觉**：与 Hinton KD 同构（$\tau^2$ 补偿梯度尺度），但目标 $q_i$、权重 $w_i$、温度 $\tau_i$ 三者全部由控制器按状态现场决定——"在哪学（$w$）、学什么（$q$）、学多软（$\tau$）"三件事都动态化。

**有界混合**（式 8-9）：$\tilde\lambda_i=\text{softmax}(\log b+r_i^\lambda+[0,\beta_P p_i\eta_i^P,\beta_H p_i\eta_i^H])$，再投影到可行集 $\Lambda$（三权和为 1，先验/标签各自设上限、合计也设上限）。**直觉**：教师主导的基线动作 $b$ 打底，策略输出与"先验/标签需求度 $\eta$"（由教师熵与冲突线索的单调函数估计）只能在**有界范围内**偏离——干预是"安全带内的微调"，不是自由重写目标。

## 5. 与前作/矩阵关系

- ← 前身：[[10-Papers/03-后处理/Distilling the Knowledge in a Neural Network（KD）|KD 奠基]]（固定教师目标范式）· PromptKD（VLM 提示蒸馏最强基线，本文直接在其上 +0.89 HM）
- → 后继方向：蒸馏目标动态化/元学习化一族的 VLM 首例
- ≡ 谱系同门（on-policy 蒸馏，但都在 LM 域）：[[10-Papers/04-强化学习与对齐/On-Policy Distillation of Language Models- Learning from Self-Generated Mistakes（GKD）|GKD]]（学生自生成分布上蒸馏）· [[10-Papers/04-强化学习与对齐/MiniLLM- On-Policy Distillation of Large Language Models（MiniLLM）|MiniLLM]]（反向 KL 策略梯度）；OnPoKD 把"on-policy"从**数据分布侧**（在学生分布上采数据）挪到**目标构造侧**（目标随训练状态在线调整）
- ↑ 思想源头：[[10-Papers/03-后处理/A Reduction of Imitation Learning and Structured Prediction to No-Regret Online Learning（DAGGER）|DAGGER]]——"监督信号必须跟着学习器的当前状态走，否则分布漂移下误差复利"的在蒸馏目标上的重生（见 [[40-Concepts/on-policy与off-policy]] 第 4 节"蒸馏 on 化"化身）
- 线锚：[[40-Concepts/知识蒸馏]] · [[40-Concepts/on-policy与off-policy]] · [[40-Concepts/视觉语言模型（VLM）]]（教师/先验底座即 [[10-Papers/08-多模态/Learning Transferable Visual Models From Natural Language Supervision（CLIP）|CLIP]] ViT-B/16）

## 6. 影响后续

蒸馏方法论线"目标构造"轴的 VLM 数据点：此前 on-policy 蒸馏的证据集中在 LM（GKD/MiniLLM/EOPD/Any-OPD 族），本文证明"目标不该固定"在视觉-语言适配同样成立且只需验证反馈即可学到。对更广的蒸馏社区：固定 $\alpha$ 混合软硬目标的标准做法（[[30-Formulas/蒸馏损失]] 实操标配）被指出是次优的——混合比应是样本级决策。消融的关键警示：去掉验证反馈后 FGVCAircraft HM 从 47.66 **塌到 22.74**——自适应目标若无外部可靠性信号校准，比固定目标更危险。

## 7. 读前须知

- 前置：[[40-Concepts/知识蒸馏]]（软标签/温度机制）→ [[30-Formulas/蒸馏损失]]（总损失形态）→ [[40-Concepts/KL散度]]（前向 KL 质量覆盖 vs 反向 KL 的区别，本文选前向但目标可换）
- [[40-Concepts/on-policy与off-policy]] 第 4 节"蒸馏化身"行是理解本文标题的钥匙：本文的 on-policy 指**目标构造跟随训练进程在线更新**，不是 RL 的数据分布意义
- 术语：Base-to-Novel（基类上适配、新类上测泛化，HM=两者调和平均）；零样本先验 $P$=同一个 CLIP 冻结不动的 zero-shot 文本分类器（不是另一个模型）
