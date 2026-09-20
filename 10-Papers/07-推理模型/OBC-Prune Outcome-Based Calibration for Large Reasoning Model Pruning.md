---
type: paper
title: "OBC-Prune: Outcome-Based Calibration for Large Reasoning Model Pruning"
aliases: [OBC-Prune]
year: 2026
authors: [Ha Lan Nguyen, Huy Hoang Tran, Trac-Duy Tran, Dung D. Le]
venue: arXiv（VinUniversity+Johns Hopkins，2026-09-15）
arxiv: "2609.17890v1"
pdf: 已下载（PDF/）
line: 推理模型
matrix_coords: 模型压缩×校准（推理模型剪枝的结果导向校准格）
tags: [paper]
---
# OBC-Prune: Outcome-Based Calibration for Large Reasoning Model Pruning

## 1. 一句话贡献
把推理模型（LRM）一次性剪枝的校准数据从"所有 rollout token 一视同仁"改成"按对最终答案的因果贡献分账"——保护让模型答对的推理电路、放松让模型答错的电路，不改任何剪枝求解器一行代码，SparseGPT/Wanda/ALPS 三后端全线涨分且 CoT 崩溃率大降。

## 2. 核心贡献
- **结果分层校准**：首个按"最终答案对错"分层 LRM 剪枝校准数据的框架——同题难度配对（16 次采样只留既有对又有错的题），同题配对天然消掉难度混杂。
- **免训练因果打分**：注意力抑制干预给每句推理打因果分（Thought Anchors 的干预度量首次从事后解释工具转为压缩目标），无需跨序列对齐、无需步级监督、无需域特定奖励模型。
- **求解器无关注入**：token 权重开方后直接缩放激活向量进入二阶统计量（Hessian/Gram/通道能量），三个结构迥异的后端求解器零改动。
- **实证**：DeepSeek-R1-Distill-Qwen 1.5B/7B/14B @ 40/50% 稀疏度，MATH500/LiveCodeBench/AIME-25 全面 ≥ 最强基线 SSGR 且优势随稀疏度扩大；剪后模型隐状态最贴 dense 模型、CoT 终止失败率最低（7B MATH500@50%：1.6% vs C4 17.6%）、完成长度最接近 dense。

## 3. 方法概要
四阶段流水线：
1. **难度配对构造**：每题采 16 条 CoT rollout（温度 0.8），只保留"至少一条对+至少一条错"的题（全对/全错扔掉——没有对照就隔离不出结果效应），凑满 N=128 对；正确侧取中位长度 rollout（供重建统计量，先前证据偏好中等长度），错误侧取最长 near-miss rollout（最大化因果打分可定位的句子数）。
2. **注意力抑制打分**：rollout 按段落切句；对第 k 句构造抑制掩码（后文 token 不许 attend 这句），从句首重跑 forward，后续每步预测分布相对基线的 KL 偏移取平均=原始因果效应；减去前面各句效应的均值去掉"早出句子天然影响更多后文"的位置优势，softmax 归一成句权重。
3. **token 权重转换**：正确 rollout 的 token 按其所属句的因果分上调权重，错误 rollout 的下调——同一个"因果重要"在两条轨迹里含义相反（正确轨迹里是功臣要保，错误轨迹里是祸根可弃）。
4. **校准统计量重加权**：每个 token 的激活向量乘 $\sqrt{w}$ 后进后端的二阶统计量累积——对 SparseGPT 恰好等于加权最小二乘的 Hessian，"答对轨迹关键步骤剪了罚重、答错轨迹关键步骤剪了罚轻"。

## 4. 核心公式
- 干预因果效应 $\text{effect}_{\text{raw}}(k,R) = \frac{1}{T-b_k}\sum_{t=b_k+1}^{T} D_{\text{KL}}\left(p_t \,\Vert\, \tilde{p}^{(k)}_t\right)$
  **直觉**：把第 k 句从后文视野里"捂住"（attention 屏蔽干预），后文预测分布平均偏了多少 = 这句话的因果分量；偏得越多说明下游越依赖它。其中 $p_t$ 是正常 forward 的下一步 token 分布（$\text{基线预测}$），$\tilde{p}^{(k)}_t$ 是屏蔽第 k 句后重算的分布，$b_k$ 是该句末位置。
- 位置去偏 $\text{effect}(k,R) = \text{effect}_{\text{raw}}(k,R) - \frac{1}{k-1}\sum_{j=1}^{k-1}\text{effect}_{\text{raw}}(j,R)$
  **直觉**：早出的句子天然能影响更多后文 token（位置红利），减去前面句子的平均效应，只留"超出位置红利"的净贡献。
- 权重转换 $w^{\text{correct}}_t = 1+\beta\cdot\tilde{e}(\text{seg}(t), c_p)$，$w^{\text{wrong}}_t = \max\left(\varepsilon,\ 1-\gamma\cdot\tilde{e}(\text{seg}(t), w_p)\right)$
  **直觉**：$\tilde{e}$ 是 softmax 句权重；β=2 控制上调力度、γ=0.5 控制下调力度、ε=0.1 保底（错误 token 仍进统计量，Hessian 保持正定）。核心一行=**因果重要性的符号随结果翻转**。
- 加权统计量 $\tilde{C}_\ell = \sum_{p}\left[\sum_{t\in c_p} w^{\text{correct}}_t\, x^{\ell}_t (x^{\ell}_t)^{\top} + \sum_{t\in w_p} w^{\text{wrong}}_t\, x^{\ell}_t (x^{\ell}_t)^{\top}\right]$
  **直觉**：实现上只是激活乘 $\sqrt{w}$ 再进 Gram/Hessian（$\text{缩放即重加权}$）；对 SparseGPT 这正是加权最小二乘的 Hessian——要复现"因果重要的正确步骤"的权重被剪时重建罚重，错误电路的权重被剪时罚轻。剪枝存活顺序从"激活能量大者存活"改为"对正确结果的因果贡献大者存活"。

## 5. 与前作/矩阵关系
- 线锚：[[40-Concepts/过程奖励与结果奖励（PRM-ORM）]]（同用"结果对错"反哺步级信号——Math-Shepherd 用蒙特卡洛估步分训练奖励，本文用干预效应校准压缩目标）· [[40-Concepts/知识蒸馏]]（同属免重训压缩家族：蒸馏改目标函数，剪枝改校准数据）
- ←前身：[[10-Papers/07-推理模型/Math-Shepherd- Verify and Reinforce LLMs Step-by-step without Human Annotations（Math-Shepherd）]]（结果驱动的步级信号、无人工标注路线的压缩版亲戚）；RAC（CoT rollout 校准）→ SSGR（难度-长度过滤校准）→ 本文补上"按结果分层+因果打分"最后一环
- ≡对偶：[[10-Papers/07-推理模型/CoT-Valve- Length-Compressible Chain-of-Thought Tuning（CoT-Valve）]]（都在削 LRM 推理开销——CoT-Valve 训练时压 token 数，OBC-Prune 推理后压参数数）
- 同日同族：[[SKIP a Self-knowledge-guided Step-wise Preference Learning Framework for Concise Reasoning]]（推理开销削减两条路：训练侧少想 vs 压缩侧少参数）；干预度量来自 Thought Anchors（Bogdan et al. 2025，注意力抑制打分）从解释工具转为压缩目标

## 6. 影响后续
"校准数据的组成与剪枝准则同等重要"的又一实证（接 Ji et al. 2025《Beware of Calibration Data》）；压缩-保真目标错配（统计显著性 ≠ 功能贡献）谱系的 LRM 实例，量化侧同类结果分层可期（Lotfi 2026 已示量化推理模型"以为要想更久"）。对库内价值：E1"保什么比怎么保重要"叙事的外部佐证卡——同一"代理目标≠功能目标"病理在 LRM 剪枝域的落地。

## 7. 读前须知
- 逐层重建框架 $\min_{\hat{W}} \lVert W X - \hat{W} X\rVert_2^2 \ \text{s.t.} \ \lVert \hat{W} \rVert_0 \le S$：一次性剪枝的标准形——需要 [[40-Concepts/范数]]（L0 稀疏约束）与 [[40-Concepts/注意力机制]]（理解 attention 屏蔽干预）；OBS 显著性 $w_q^2/(\mathbf{H}^{-1})_{qq}$ 的直觉=二阶曲率加权的权重敏感度（Hessian 逆对角元大=该方向曲率低=剪了罚轻）。
- KL 散度直觉见 [[40-Concepts/KL散度]]（屏蔽前后两个预测分布的偏离度量）。
- 配对设计的统计直觉：同题对错 rollout 是天然双向对照（消难度混杂）——与 E1/E2 实验台账"同游戏同预算只变损伤源"同一手法。
