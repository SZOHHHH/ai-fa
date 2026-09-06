---
type: paper
title: Mastering Atari, Go, Chess and Shogi by Planning with a Learned Model
aliases: [MuZero]
year: 2019
authors: [Julian Schrittwieser, Ioannis Antonoglou, Rosemary Jane Silva, David Silver 等]
venue: Nature 2020
arxiv: "1911.08265"
pdf: 已下载（PDF/）
line: 世界模型与JEPA
matrix_coords: [奖励驱动(RL内部模型), 潜在状态, 游戏控制(RL)]
tags: [paper]
---

# MuZero（不重建环境的规划模型）

## 1. 一句话贡献

**学一个"不需要像环境"的模型照样规划超人类**：模型只承诺三个预测头正确——**奖励、价值、策略先验**——而完全不预测下一帧观测；在围棋/国际象棋/将棋/Atari 四域同时超人类。"**模型为决策服务，不为重建服务**"（value equivalence）的哲学源头。

## 2. 核心贡献

- **隐式模型三函数**：表示函数 $h$（观测→隐状态）、转移函数 $g$（隐状态+动作→新隐状态）、预测函数 $f$（隐状态→策略先验 $p$ /价值 $v$ /奖励 $r$）——**没有任何观测重建损失**；
- **潜空间 MCTS**：搜索在 $g$ 展开的隐状态树上进行，用 [[30-Formulas/MCTS置信上界|PUCT]] 选择、$f$ 的头评价叶节点——棋类+Atari 通用（AlphaZero 的棋类专用+Atari 不能版的统一）；
- **训练=自己跟自己的搜索对弈**：行为来自搜索（更深的树=更强的策略蒸馏目标），价值/奖励头对真实对局结果回归，策略头对搜索分布回归（reanalyse 复用旧数据）；
- **哲学贡献**："模型只需在价值层面等价于真实环境"——后续 value-equivalence 理论线（Grimm et al.）与"决策充分统计量"分析的直接源头。

## 3. 方法概要

1. 真实环境自对弈：根节点观测经 $h$ 入隐状态，MCTS 搜索（$g$ 展开树 + $f$ 评价 + PUCT 分配模拟预算）；
2. 执行搜索得到的动作（按根节点访问分布采样，带温度）；
3. 训练：策略头对齐搜索分布（把"深想一步的策略"蒸给单次前向）、价值头对齐真实结果、奖励头对齐每步真实奖励——**模型学的是"搜索知道的事"**；
4. 全程不知道游戏规则：Atari 版模型连帧转移都不建模，搜索照样成立——**因为规划需要的是 (r,p,v) 正确，不是画面正确**。

## 4. 核心公式

$$s^{k+1}=g\big(s^{k},a^{k}\big),\qquad \big(p^{k},v^{k},r^{k}\big)=f\big(s^{k+1}\big)\qquad(\text{无观测重建项——与 Dreamer 系的根本分界})$$

**直觉解释**：把世界模型想成"考官"——Dreamer 系考官必须画出下一帧（生成式），MuZero 考官只回答三个问题："走这步得几分、局面值多少、该优先试哪步"（决策式）。**画得像 ≠ 答得对**：两条哲学各自成立的前提域不同——MuZero 证明"答题不必会画画"；而需要完整未来分布的任务（想象训练多步）后来被证明离不开生成能力。**这一分界正是"该保什么"问题最早的清晰表达**。

- 需要的前置：[[30-Formulas/MCTS置信上界]]、[[30-Formulas/贝尔曼最优方程]]、[[40-Concepts/贝尔曼方程]]

## 5. 与前作/矩阵关系

- ← AlphaGo/AlphaZero（真规则 MCTS + 神经网络）→ MuZero（**规则也学掉**，只剩三头模型）；← Atari 的 EfficientZero/StMuZer 等后续继续拉高样本效率；
- ↔ 对照 [[Dream to Control- Learning Behaviors by Latent Imagination（Dreamer）|Dreamer]]：**搜索式（决策时刻展开树）vs 学习式（训练时想象 rollout）**；两线在 test-time search 类新工作里重新汇合；
- ↔ 对照 [[Diffusion for World Modeling- Visual Details Matter in Atari（DIAMOND）|DIAMOND]]：DIAMOND 用像素证据反问"压缩掉的信息真的没用吗"——与 MuZero 的"不需要重建"形成谱系两极的张力；决策保真/价值等价思想在两极之间架桥。

## 6. 影响与后续

- Nature 封面级；"模型是规划的充分统计量"成为 model-based 理论研究的合法命题（value equivalence、充分统计量分析、MuZero 不重建为什么够用的系列论文）；
- 高效版（EfficientZero）夺 Atari 100k 榜首多年——**100k 协议的强者恰好是"不重建"路线**，是"重建必要性"讨论的常客论据；
- 局限：需要大量自对弈（样本总量大，省的是"环境访问次数"而不是总计算）；离散动作/可展开树域最自然，连续域要走 TD-MPC 系。

## 7. 读前须知

- **必前置**：[[30-Formulas/MCTS置信上界]]（PUCT 是搜索的心脏）、[[40-Concepts/贝尔曼方程]]、[[40-Concepts/马尔可夫决策过程]]；
- **易混点**：①MuZero 的"模型"不是世界模型常规定义（不预测观测）——读文献时"learned model"一词在两哲学下含义不同；②奖励头 $r$ 预测的是**立即奖励**（供树内累计），价值头 $v$ 是局面估值——别混；③策略头是"搜索的蒸馏目标"而非直接行为——**搜索深度=老师水平**；
- **读法建议**：图 1（三函数图）→ 图 2（搜索示意图）→ 表 1（四域成绩）；附录 A 的隐状态一致性分析是理论向读者彩蛋。

> 近邻同族：[[Analytic Planning under Uncertainty with Moment Closure（矩闭合规划）]]

> 数学根基：[[30-Formulas/MCTS置信上界]] · [[30-Formulas/贝尔曼最优方程]] · [[40-Concepts/贝尔曼方程]]
