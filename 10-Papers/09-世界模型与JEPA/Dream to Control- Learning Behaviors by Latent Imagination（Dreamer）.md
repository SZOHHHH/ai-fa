---
type: paper
title: Dream to Control - Learning Behaviors by Latent Imagination
aliases: [Dreamer, DreamerV1]
year: 2020
authors: [Danijar Hafner, Timothy Lillicrap, Jimmy Ba, Mohammad Norouzi]
venue: ICLR 2020
arxiv: "1912.01603"
line: 世界模型与JEPA
matrix_coords: [奖励驱动(RL内部模型), 潜在状态, 游戏控制(RL)]
tags: [paper]
---

# Dreamer（潜空间想象 RL：世界模型成为通用 RL 引擎）

## 1. 一句话贡献

把"在梦里训练"从概念演示升级成**通用 RL 算法**：RSSM 世界模型 + 想象 rollout 上**直接反传**的策略梯度 + critic 稳方差——模型基 RL 第一次在全部基准上同时碾压无模型基线，"Dreamer 系"自此开宗。

## 2. 核心贡献

- **梯度穿梦**：策略的目标是想象轨迹上的期望回报，而想象轨迹本身可微（重参数化采样），所以**策略梯度可以穿过世界模型一路反传**——不是"梦里黑盒试错"，是"梦里解析优化"；
- **actor-critic 双头进梦**：actor 最大化想象回报（梯度直传），critic 回归 λ-return 稳住方差——PlaNet 的"每步 CEM 搜索"被彻底摊销进策略权重；
- **三网分工定型**：世界模型（RSSM+解码器+奖励头）/ actor / critic——训练全在想象、真实环境只管喂新数据；这一分工被后续所有想象训练系（含像素扩散世界模型）沿用；
- 结果：20 个连续控制基准全超当时的 A3C 等模型基与无模型基线，样本效率数量级领先。

## 3. 方法概要

1. **世界模型训练**（真实数据）：RSSM 转移 + 观测重建 + 奖励预测，变分下界全套（继承 PlaNet）；
2. **想象 rollout**：从真实数据的隐状态出发，用先验 $p(s_t\mid h_t)$ 滚 $H=15$ 步梦——每步轨迹全程带梯度（重参数化）；
3. **梦内学习**：
   - 回报估计：$\lambda$-return（n 步真实奖励 + 尾部 $V(s_H)$ 自举打包）；
   - actor：最大化该回报（**梯度经 RSSM 图直传到动作 logits**，不采样估计）；
   - critic：回归 λ-return（自举，梯度不穿模型）；
4. **闭环**：新策略去真实环境采 1000 步 → 回炉——真实交互只占训练量零头。

## 4. 核心公式

$$\max_\theta\;\mathbb{E}_{s_{1:H}\sim p_\phi}\Big[\;V_\lambda\big(s_{1:H}\big)\Big]\qquad\text{（两层嵌套期望：外层世界模型采样，内层价值累积）}$$

**直觉解释**：与无模型策略梯度的本质区别——REINFORCE 把"环境"当黑盒、靠采样估梯度；Dreamer 把"环境"换成**可微的梦**，梯度直接沿着梦的因果链流回策略（"这条路走下去平均会好"可以解析算，不用试出来）。代价：梯度的质量=梦的质量——**模型偏差直接进策略梯度**（这是后续所有"梦山≠真山"讨论的根）。

- 需要的前置：[[30-Formulas/RSSM转移模型]]、[[40-Concepts/策略梯度定理]]、[[40-Concepts/贝尔曼方程]]、[[40-Concepts/重参数化]]

## 5. 与前作/矩阵关系

- ← [[World Models（世界模型）|World Models 2018]]（梦中训练概念）+ [[Learning Latent Dynamics for Planning from Pixels（PlaNet）|PlaNet 2019]]（RSSM 与数据循环）——Dreamer=两者的"梯度化"合体；
- → DreamerV2（隐状态改逐维分类，Atari 200 分超人类）、[[Mastering Diverse Domains through World Models（DreamerV3）|DreamerV3]]（跨域稳定化，Minecraft 采钻石出圈）；
- ↔ 对照 [[Mastering Atari, Go, Chess and Shogi by Planning with a Learned Model（MuZero）|MuZero]]：**学习式想象 vs 搜索式规划**两条现代模型基路线；对照 [[Diffusion for World Modeling- Visual Details Matter in Atari（DIAMOND）|DIAMOND]]：**latent 梦引擎 vs 像素梦引擎**（DIAMOND 把同一套 actor-critic 训练搬进扩散梦）。

## 6. 影响与后续

- "世界模型+想象训练"成为模型基 RL 的主流形态；DreamerV2/V3/Stochastic Dreamer 持续迭代；
- 梯度穿梦的技术被扩散世界模型直接继承（DIAMOND 的 actor-critic 在扩散梦里用同样的 λ-return+自举结构）；
- 局限：模型误差进梯度（长梦漂移）；潜空间丢信息（"压缩即伤害"争论由后续像素路线发起）。

## 7. 读前须知

- **必前置**：[[20-Algorithms/世界模型]]（总览）、[[30-Formulas/RSSM转移模型]]、[[40-Concepts/策略梯度定理]]、[[40-Concepts/重参数化]]；
- **易混点**：①actor 的梯度穿模型、critic 的梯度**不穿**（自举目标当常数）——一穿一停是稳定性的关键设计；②想象 rollout 从真实数据的隐状态出发（不是从零开局）；③Dreamer 的"off-policy 程度"介于两者之间（真实数据回炉但策略每轮更新）；
- **读法建议**：图 1（总架构）→ 图 2（想象训练细图，标注了梯度流）→ 算法 1；实验部分扫 Benchmark 表即可。

> 谱系成员（26）：[[Analytic Planning under Uncertainty with Moment Closure（矩闭合规划）]] · [[Co-Evolving Latent Action World Models（CoLA）]] · [[Delta-JEPA- Learning Action-Sensitive World Models via Latent Difference Decoding（Delta-JEPA）]] · [[DF3- World Modeling via Decoder-Free Feature Forecasting in Autonomous Navigation（DF3）]] · [[Diffusion for World Modeling- Visual Details Matter in Atari（DIAMOND）]] · [[Diffusion Forcing- Next-token Prediction Meets Full-Sequence Diffusion（Diffusion Forcing）]] · [[Factored Latent Action World Models（FLAM）]] · [[Genie 2- A Large-Scale Foundation World Model（Genie 2）]] · [[Genie- Generative Interactive Environments（Genie）]] · [[Hierarchical Planning with Latent World Models（HPLWM）]] · [[Latent Action Pretraining from Videos（LAPA）]] · [[LaWAM- Latent World Action Models for Efficient Dynamics-Aware Robot Policies（LaWAM）]] · …等 26 篇

> 数学根基：[[30-Formulas/RSSM转移模型]] · [[30-Formulas/ELBO目标]] · [[40-Concepts/策略梯度定理]]
