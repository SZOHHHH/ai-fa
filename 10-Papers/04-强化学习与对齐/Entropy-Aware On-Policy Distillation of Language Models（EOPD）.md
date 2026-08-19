---
type: paper
title: Entropy-Aware On-Policy Distillation of Language Models
aliases: [EOPD]
year: 2026
authors: [Woogyeol Jin, Taywon Min, Yongjin Yang, Dennis Wei, Yi Zhou, Swanand R. Kadhe, Nathalie Baracaldo, Kimin Lee]
venue: ICML 2026
arxiv: "2603.07079"
pdf: 已下载
line: 强化学习与对齐
matrix_coords: [学生轨迹, JSD/混合, token级]
tags: [paper]
---

# EOPD（熵感知的在线蒸馏）

## 1. 一句话贡献

诊断 OPD 的熵塌缩病根——**反向 KL 在教师高熵区给出的信号既不稳定又过度收缩**——并开出"熵自适应切换散度"的药：教师不确定的地方用前向 KL（覆盖），教师确定的地方用反向 KL（精确模仿）。

## 2. 核心贡献

1. 病理分析：教师分布高熵时，反向 KL 逐 token 估计方差大 + 模式搜索把学生的多样性压塌（Pass@k 的 k>1 掉分）
2. 药方：以教师熵 H(π_T) 为门控信号，自适应混合反向/前向 KL
3. 实验：六个数学推理基准，Pass@8 提升 +1.37/+2.39/+5.05（Qwen3-0.6B/1.7B/4B-Base 相对基线 OPD）——**规模越大收益越大**

## 3. 方法概要

每个 token 位置计算教师分布的熵。熵低（教师知道自己在说什么）→ 反向 KL（锁定教师的模式）；熵高（教师自己也在猜）→ 前向 KL（把教师的整个候选分布搬过来，保多样性）。门控是软的（权重连续变化），训练效率与标准 OPD 相当。

## 4. 核心公式

$$\mathcal{L}_{EOPD} = \mathbb{E}_{y\sim\pi_S}\Big[w\big(H(\pi_T(\cdot|y_{<t}))\big)\cdot\mathrm{KL}_{fwd} + \big(1-w(H)\big)\cdot\mathrm{KL}_{rev}\Big]$$

w(H) 随教师熵单调增（如 sigmoid(γ(H−H₀))）。

**直觉**：名师教棋——残局必杀路线（低熵）你要一步不差地背下来（反向 KL：只学这一路）；开局广阔（高熵）你要把整个开局库都装进脑子（前向 KL：全面覆盖）。用教师熵判断"这是残局还是开局"。

## 5. 与前作关系

- ← [[On-Policy Distillation of Language Models- Learning from Self-Generated Mistakes（GKD）|GKD]]：GKD 的 β（散度混合系数）是**全局常数**，EOPD 把它变成**逐 token 的函数**（熵门控）——"常数→函数"是典型的 B 级论文操作
- ≡ 软硬对偶：PPO 硬裁剪↔[[Soft Adaptive Policy Optimization（SAPO）|SAPO]] 软门控（[[60-Matrices/RL稳定化矩阵]]）、Top-K↔Soft MoE（[[60-Matrices/MoE路由矩阵]]）——**自适应切换又一次出现**，这次在散度轴上
- #loss/distillation

## 6. 影响后续

"熵调度"成为 OPD 方向的标准讨论项；与 Thinking Machines 博客的开放问题（蒸馏奖励×环境奖励）正交可叠加。

## 7. 读前须知

- 需要：前向/反向 KL 的质量覆盖 vs 模式搜索（EOPD 的全部故事建立在这组对偶上）
- 本卡是 **ICML 2026 已接收**作品——**B 级"占格创新"的活体样本**：一个格（学生×散度切换×token级）+ 一个诊断定理（高熵区反向 KL 的方差界）+ 多规模实验（0.6B/1.7B/4B）。**用户的 3 个月目标可以直接对标这张卡的体量**

> 近邻同族：[[Any-OPD- Heterogeneous On-Policy Distillation for Flow-Matching Models via Representation-Space Bridging（Any-OPD）]] · [[CausalOPD- First-Wrong-Step Supervision for Distilling Causal Chain Reasoning（CausalOPD）]]

> 数学根基：[[策略梯度定理]]

> 数学根基：[[蒸馏损失]] · [[DSM目标]]
