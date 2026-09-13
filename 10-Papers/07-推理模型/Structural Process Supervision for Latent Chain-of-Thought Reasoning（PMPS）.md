---
type: paper
title: "Structural Process Supervision for Latent Chain-of-Thought Reasoning"
aliases: [PMPS]
year: 2026
authors: [Yiqi Li, Xu Chen, Chen Ju, Jiangchao Yao, et al.]
venue: arXiv 2609.09928（2026-09-09，SJTU + 淘天集团）
arxiv: "2609.09928v1"
pdf: 10-Papers/PDF/Structural Process Supervision for Latent Chain-of-Thought Reasoning（PMPS）.pdf
line: 推理模型
matrix_coords: 待评（轮换线）
tags: [paper]
---
# Structural Process Supervision for Latent Chain-of-Thought Reasoning（PMPS）

## 1. 一句话贡献
给隐式 CoT 的潜嵌入补上缺失的"过程级监督"：引入可学习推理原型做语义锚，把潜嵌入与显式 CoT 嵌入投影到共享原型空间做多对多软对齐，治好表征坍缩——GPT-2 上以不到一半的输出长度超越显式 CoT-SFT。

## 2. 核心贡献
- **首个 latent reasoning 的结构化过程监督框架**：此前 CODI 只对齐答案位置（过程无人管→奇偶坍缩），SIM-CoT 一对一硬配（步数少于嵌入数→尾部坍缩）；PMPS 用原型中介实现不等长序列的多对多软对齐
- **PSA 渐进序列对齐**：高斯位置先验鼓励早期按顺序对齐，余弦退火逐步放松允许自适应匹配——结构先验与灵活性的课程权衡
- **实证**：GSM8K-Aug 上 token 压到显式 CoT 的 47.1%，平均准确率反超 CoT-SFT +3.96%（GPT-2）；三个模型家族上一致领先所有 latent 基线

## 3. 方法概要
1. **自蒸馏双任务**：teacher 任务跑显式 CoT（提供高质量嵌入），student 任务跑潜推理，答案位置对齐隐状态（继承 CODI 骨架）
2. **原型空间投影**：共享两层 MLP 投影头 + $\ell_2$ 归一化，潜嵌入与 CoT 嵌入都打到 K 个可学习原型上打分（内积）
3. **Sinkhorn 均分分配**：对得分矩阵做 Sinkhorn-Knopp 迭代（行归一化=每 token 一个分布，列归一化=每个原型被均匀使用），防原型坍缩（承 SwAV）
4. **多对多匹配**：匹配矩阵 = 两组分配码乘积 $M_{c2l} = Q_c Q_l^\top / \tau_m$，softmax 得双向注意力式权重——一个潜嵌入可吸收多步 CoT，一步 CoT 也可贡献给多个潜嵌入
5. **双向交叉预测损失**：CoT 侧按匹配权重聚合潜嵌入的原型预测，与分配码做交叉熵；对称方向同理
6. **PSA**：匹配分数减去位置偏差惩罚 $\alpha(j/N_c - i/N_l)^2$，$\alpha$ 从 $\alpha_{max}$ 余弦退火到 0
7. 推理时只跑 student——原型/投影头/PSA 全部只在训练用，零推理开销

## 4. 核心公式
- CoT→潜方向交叉预测（潜嵌入集体解释每个 CoT 嵌入）：
$L_{c2l} = -\frac{1}{N_c}\sum_{j=1}^{N_c}\sum_{k=1}^{K} Q_c^{(j,k)} \log\big(\sum_{i=1}^{N_l} A_{c2l}^{(j,i)}\, \phi_{l,i}^{(k)}\big)$
**直觉**：把"第 j 步 CoT 属于原型 k"当作软标签，让被匹配到的潜嵌入们投票出这个归属——每个潜嵌入被迫携带可区分的推理语义，不能复读。
- PSA 位置惩罚（写入匹配分数）：
$\hat{M}_{c2l}^{(j,i)} = M_{c2l}^{(j,i)} - \alpha\cdot\big(\frac{j}{N_c-1} - \frac{i}{N_l-1}\big)^2$，$\alpha(t) = \frac{\alpha_{max}}{2}\big(1+\cos(\pi t/T)\big)$
**直觉**：训练早期强罚"第 1 个潜嵌入配最后一步 CoT"这种乱序匹配，先把顺序骨架立住；后期放开，允许语义驱动的自由聚合。

## 5. 与前作/矩阵关系
- 线锚：[[40-Concepts/思维链（CoT）]] · [[40-Concepts/知识蒸馏]] · [[30-Formulas/交叉熵]]
- ← 前身：CODI（答案位置自蒸馏，无过程监督）/ SIM-CoT（辅助解码器一对一硬配）——本文诊断出二者各自的坍缩形态（奇偶 / 尾部）
- 同族（CoT 长度压缩线）：[[10-Papers/07-推理模型/CoT-Valve- Length-Compressible Chain-of-Thought Tuning（CoT-Valve）]]
- 同日同题：[[Think Wider - Mitigating Latent Rank Collapse in Implicit Chain-of-Thought Reasoning（WIDER）]]（治几何坍缩，与本文治语义坍缩互补）· [[Astar-Thought-V2 - Efficient Latent Reasoning via Geometric Dynamics of LLM（Astar-Thought-V2）]]（显隐交替压缩）

## 6. 影响后续
过程监督（PRM 线）从离散推理步迁入连续潜空间的第一站；原型/Sinkhorn 工具箱（SwAV 系）被引入推理压缩。坍缩诊断方法（逐对余弦相似度热图）是所有 latent reasoning 工作的通用体检项。

## 7. 读前须知
需要 [[40-Concepts/知识蒸馏]]（自蒸馏 teacher/student 架构）与 [[30-Formulas/交叉熵]]（软标签交叉熵的读法）；Sinkhorn-Knopp 只需当作"带均匀使用约束的软聚类"理解，细节可跳过。
