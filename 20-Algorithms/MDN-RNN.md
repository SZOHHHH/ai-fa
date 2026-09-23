---
type: algo
aliases: [MDN-RNN, 混合密度网络, MDN, Mixture Density Network, 混合密度RNN, MDRNN]
line: 世界模型与JEPA
tags: [algo]
---

# MDN-RNN（混合密度循环网络）

## 1. 定义

**非数学语言**：给 [[20-Algorithms/RNN]] 换一个"会表达不确定性"的输出头。普通回归头预测"下一时刻 = 某个值"；MDN 头预测"下一时刻 = **一组可能的值，各自带概率**"——球撞墙后往左还是往右？两头都答，各标个置信度。它是 [[10-Papers/09-世界模型与JEPA/World Models（世界模型）]]（2018）的"世界引擎"。

**数学语言**：RNN 隐状态 $h_t$ 经 MDN 头输出 K 个高斯分量的参数，下一隐状态的预测分布为混合高斯（GMM）：
$$p(\hat z_{t+1}\mid h_t) = \sum_{k=1}^{K} \pi_k(h_t)\, \mathcal{N}\!\left(\mu_k(h_t),\, \mathrm{diag}(\sigma_k^2(h_t))\right), \qquad \sum_k \pi_k = 1$$
MDN 头=一个线性层吐出 $3K$ 个数：$\{\log \pi_k\}\cup\{\mu_k\}\cup\{\log \sigma_k^2\}$（π 过 softmax、σ 过 exp 保证约束）。

## 2. 本命论文群

| 论文 | 引入/发展了什么 | 年份 |
|---|---|---|
| Bishop MDN（未建卡） | 混合密度输出头（前馈网络时代） | 1994 |
| Graves（未建卡） | RNN+MDN 做手写序列生成 | 2013 |
| [[10-Papers/09-世界模型与JEPA/World Models（世界模型）]] | V·MDN-RNN·C 三件套：MDN-RNN 当可学习的转移模型 | 2018 |
| [[10-Papers/09-世界模型与JEPA/Learning Latent Dynamics for Planning from Pixels（PlaNet）]] | RSSM 替代：确定性+随机双路径 | 2019 |
| Dreamer 系（未建卡） | 沿 RSSM 路线的世界模型家族 | 2019- |

## 3. 教程：从"平均的灾难"到输出一个分布

**第 1 步：MSE 回归的多模态灾难（核心动机）。** 预测 Pong 球撞墙后的位置：真实未来是**双峰**的——70% 往左弹、30% 往右弹。用 [[30-Formulas/均方误差（MSE）]] 训练的回归头会学到什么？MSE 的最优解是**条件均值**：$0.7\times(+10) + 0.3\times(-10) = +4$——一个**物理上不可能出现的位置**（球从来不往正前方弹）。画面表现：预测帧糊成两峰的"叠影"。**结论：未来天然多模态，点预测必错——必须输出分布。**

**第 2 步：MDN 头解剖。** RNN（[[20-Algorithms/LSTM]]，World Models 里具体是 LSTM）照常读编码序列更新隐状态 $h_t$；变化的只在输出层——一个普通线性层，但吐出 $3K$ 个数并分三组处理：
$$\pi = \mathrm{softmax}(\ell), \qquad \mu_k = W_\mu h_t\ \text{（原样）}, \qquad \sigma_k = \exp(W_\sigma h_t)\ \text{（保证恒正）}$$

**第 3 步：手算一个 K=2 的一维例子。** 设 MDN 头对 $h_t$ 输出原始值 $\ell=(1.94,\, -0.94)$，$\mu=(10,\,-10)$，$\log\sigma=(0,\,0)$：
- $\pi = \mathrm{softmax}(1.94, -0.94) \approx (0.87,\, 0.13)$（softmax 温和地放大优势——见 [[40-Concepts/softmax函数]]）
- $\sigma = (e^0, e^0) = (1, 1)$
- 预测分布：$p(\hat z_{t+1}) = 0.87\,\mathcal{N}(10, 1) + 0.13\,\mathcal{N}(-10, 1)$——**左边那个峰更可信，但右边活着**。

**第 4 步：损失=负对数似然（不是 MSE）。** 真实下一编码 $z_{t+1}$ 已知（teacher forcing），损失：
$$\mathcal{L} = -\log\!\left[\sum_k \pi_k\, \mathcal{N}(z_{t+1};\, \mu_k, \sigma_k^2)\right]$$
代入第 3 步、观测 $z_{t+1}=10.5$：第一分量密度 $\mathcal{N}(10.5;10,1)\approx0.352$、第二分量在 10.5 处 $\approx 10^{-45}$（远处分量贡献可忽略）→ $\mathcal{L}=-\log(0.87\times0.352)\approx1.18$。梯度会把 $\mu_1$ 往 10.5 拉、把 $\ell_1$ 再推高——**离观测近的分量吃掉全部梯度，各分量自然分工**（这正是 [[40-Concepts/最大似然估计（MLE）]] 在混合模型上的形态）。

**第 5 步：预测=先掷骰子再采样。** 生成/想象时：按 $\pi$ 掷 K 面骰选分量 $k^\ast$，再从 $\mathcal{N}(\mu_{k^\ast}, \sigma_{k^\ast}^2)$ 采样（[[40-Concepts/重参数化]] 保证端到端可导）。温度控制：除 $T$ 于 logits 可调"梦想的保守程度"。对比 MSE 头：一个确定性点 vs 一个可采样的世界观。

**第 6 步：World Models 三件套里的位置。**
$$\underbrace{V}_{\text{卷积编码器}} \to z_t \to \underbrace{M:\ \text{MDN-RNN}}_{p(z_{t+1}\mid z_{\le t}, a_t)\ \text{世界引擎}} \to \underbrace{C}_{\text{线性控制器}\ a_t}$——C 在 M 的**想象 rollout** 里训练（完全不碰真环境），这是"世界模型=可模拟环境"范式的起点。

**第 7 步：谱系与淡出。** PlaNet 的 RSSM 把"MDN 预测整个下一分布"改造成**确定性路径+随机路径**的双通道（[[30-Formulas/RSSM转移模型]]）——随机性被压缩到一个小噪声位，训练更稳；扩散时代"输出分布"由扩散头自己承担，MDN 头在视觉世界模型里淡出，但在小状态/低维控制问题里仍是性价比最高的选择。

## 4. 核心公式速查

| 件 | 公式 | 记忆点 |
|---|---|---|
| 预测分布 | $p(\hat z_{t+1}) = \sum_k \pi_k\,\mathcal{N}(\mu_k, \sigma_k^2)$ | 输出=分布不是点 |
| 头部约束 | $\pi=\mathrm{softmax}(\ell)$，$\sigma=\exp(\cdot)$ | 保证合法参数 |
| 损失 | $\mathcal{L}=-\log\sum_k \pi_k\mathcal{N}(z_{t+1};\mu_k,\sigma_k^2)$ | NLL（不是 MSE） |
| 采样 | $k^\ast\sim\pi$，$z\sim\mathcal{N}(\mu_{k^\ast},\sigma_{k^\ast}^2)$ | 先掷骰再采 |

## 5. 数学概念分解

[[40-Concepts/高斯分布]]（分量本体）、[[40-Concepts/最大似然估计（MLE）]]（损失=NLL 的出身）、[[40-Concepts/softmax函数]]（混合权重的合法化）、[[20-Algorithms/LSTM]]（宿主 RNN）、[[40-Concepts/马尔可夫决策过程]]（转移分布 $p(s'|s,a)$ 的学习版）、[[40-Concepts/重参数化]]（采样可导）

## 6. 变体与演进

| 变体 | 相比本算法改了什么 | 代表 |
|---|---|---|
| RSSM | 确定性 GRU+随机位双路径，训练更稳 | [[10-Papers/09-世界模型与JEPA/Learning Latent Dynamics for Planning from Pixels（PlaNet）]] |
| MDN-LSTM 原教旨 | 隐空间全 GMM 预测 | [[10-Papers/09-世界模型与JEPA/World Models（世界模型）]] |
| 扩散/离散头 | "输出分布"改由扩散或离散 softmax 承担 | Dreamer-v3（离散世界模型） |

## 7. 常见误区

- **误区**：$\sigma$ 是"误差条"——它是**预测分布的一部分**（世界的不确定性本身），大 $\sigma$ 是"这里我看不清"的诚实表达
- **误区**：MDN = MoE——MDN 的分量在**输出空间**（同一目标的多种可能），MoE 的分量在**参数空间**（不同专家算不同函数）（[[20-Algorithms/混合专家（MoE）]]）
- **误区**：分量数 K 越多越好——K 大易出现"分量冗余"（两个分量叠在同一位置）与优化不稳；常见 K=5 就够
- **误区**：MDN 头过时=世界模型不用分布了——恰恰相反，**每个**世界模型都必须表达 $p(z_{t+1})$ 的不确定性，只是表达方式从 GMM 换成了双路径/离散分布

## 8. 自测

1. 为什么 MSE 头在多模态未来必然失败？（最优解=条件均值=不存在的中间态——画面糊）
2. K=2、观测恰在 $\mu_1$ 上时哪个分量吃梯度？（近分量全吃、远分量贡献 $\approx0$——softmax 之外还有密度本身的自动分工）
3. MDN-RNN 训练目标与 VAE 解码器目标的共同数学身份？（都是 MLE/NLL——[[40-Concepts/最大似然估计（MLE）]] 统一表）
4. World Models 里 C 为什么能在纯想象中训练？（MDN-RNN 提供可采样的转移分布——rollout=做梦，醒着只做评测）

**一句话总结**：MDN-RNN = RNN 的"世界观"改造——不再赌一种未来，而是给所有可能的未来标价；它是"世界模型=可学习模拟器"范式（World Models → PlaNet → Dreamer）的第一块引擎。
