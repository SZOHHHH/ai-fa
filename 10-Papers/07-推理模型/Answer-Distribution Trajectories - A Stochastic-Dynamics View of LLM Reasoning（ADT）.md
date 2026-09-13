---
type: paper
title: "Answer-Distribution Trajectories: A Stochastic-Dynamics View of LLM Reasoning"
aliases: [ADT, 答案分布轨迹]
year: 2026
authors: [Mar Gonzàlez I Català, Haitz Sáez de Ocáriz Borde, Davide Murari, et al.]
venue: arXiv 2609.09030（2026-09-08，剑桥 + Harvey Mudd）
arxiv: "2609.09030v1"
pdf: 10-Papers/PDF/Answer-Distribution Trajectories - A Stochastic-Dynamics View of LLM Reasoning（ADT）.pdf
line: 推理模型
matrix_coords: 待评（轮换线）
tags: [paper]
---
# Answer-Distribution Trajectories - A Stochastic-Dynamics View of LLM Reasoning（ADT）

## 1. 一句话贡献
不止看终点对错、也不止看熵曲线——追踪推理展开过程中"答案预测分布 $p(\text{答案}|\text{前缀})$"的完整轨迹，证明它是严格更细的表征（终点与熵都不可逆推轨迹），并用四维动力学画像（探索/修正/运动/承诺）区分八种成功失败机制。

## 2. 核心贡献
- **形式化 + 严格更细性**：命题 2 证明终点映射与熵轨迹映射都非单射——同终点同熵可以有完全不同的假设竞争史（例：答案 12 先领跑后被 18 翻盘，熵曲线看不见）
- **四维修补画像**：探索（有效支撑数 $S_{eff}=e^{H(p)}$）/ 修正（领跑者切换次数 $N_{switch}$、回访 $N_{return}$）/ 运动（TV 路径长、直达率 $R_{direct}$）/ 承诺（锁定时刻 $t_{commit}$）
- **机制分类学**：成功分 stable/rescue/detour/fragile，失败分 never-discovered/escape/failed-rescue/stochastic-miss——escape 与 failed-rescue 正是 overthinking 的动力学定义
- **实证规模**：16 个开源模型 × 4 基准；同准确率的近邻模型机制配比差异巨大；训练目标、规模、温度系统性重塑画像

## 3. 方法概要
1. 对推理 trace 的每个前缀 $C_{1:k}$，独立采样多条续写，把"当前前缀下最终答案的分布"估计出来（对未来说出的推理做边缘化）
2. 得到分布序列 $\mathcal{T} = (p_0, p_1, \dots, p_K)$——答案分布轨迹
3. 沿四维算标量指标组成动力学画像
4. 按金答案是否在各点领跑 + 终点对错，分入八种机制桶
5. 跨模型/任务/温度对比画像，定位"哪种动力学配哪种目标"

## 4. 核心公式
- 前缀条件预测分布：$p_k(a) = p_\theta\big(Y=a \mid Q, C_{1:k}\big) = \sum_{c_{>k}} p_\theta(c_{>k}\mid Q,C_{1:k})\, p_\theta(Y=a\mid Q,C_{1:k},c_{>k})$
**直觉**：把"想到现在，剩下的推理随便走，最终答案会是什么"平均掉——这是推理内部状态的只读探针，不动模型一根手指。
- 运动量（总变差路径）：$J_k = TV(p_k, p_{k+1}) = \frac{1}{2}\sum_a |p_{k+1}(a) - p_k(a)|$，直达率 $R_{direct} = TV(p_0,p_K) / \sum_k J_k$
**直觉**：$R_{direct}$ 低=概率质量反复搬家=绕路/回头路多——把"犹豫"变成可计算的几何量。

## 5. 与前作/矩阵关系
- 线锚：[[40-Concepts/思维链（CoT）]] · [[40-Concepts/马尔可夫链]]（随机动力学视角）· [[40-Concepts/KL散度]]（分布演化度量的近亲 TV）
- ← 前作：熵曲线线（熵只告诉你"多不确定"，不告诉你"谁在和谁竞争"）——本文是它的严格细化
- 对话位（E2 形式同构）：$p(\text{答案}|\text{前缀})$ 的前向轨迹 vs 我们 E2 的 $p(a\mid x_t, \text{goal})$ 后验反推——一个顺着推理看信念演化，一个拿着果反推因；"分布轨迹"工具可借给闭环 goal-hit 的诊断
- 同日同族：[[Astar-Thought-V2 - Efficient Latent Reasoning via Geometric Dynamics of LLM（Astar-Thought-V2）]]（同把推理当动力学系统读：一个读几何、一个读分布）

## 6. 影响后续
给"推理过程评估"提供超越终点/熵的通用语言；overthinking、early-stop、过程奖励设计都可直接取用其机制分类。

## 7. 读前须知
只需要条件概率与 TV 距离（[[40-Concepts/条件概率]]）；命题 1/2 的证明是标准的"构造两条同像轨迹"反例，可读附录 C。
