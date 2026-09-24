---
type: formula
formula_id: DDPM-LOSS
aliases: [DDPM训练目标, 简化损失, L_simple, 噪声预测MSE]
domain: 生成建模
loss_type: regression
tags: [formula]
---

# DDPM 训练目标

## 1. 标准形式

**变分界（完整理论形式）**：
$$\mathcal{L}_{\text{vlb}} = \mathbb{E}_t\!\left[ D_{\mathrm{KL}}\!\left( q(x_{t-1}\mid x_t, x_0)\ \|\ p_\theta(x_{t-1}\mid x_t) \right) \right] + \text{端点项}$$

**简化形式 L_simple（本库标准，实际训练所用）**：
$$\mathcal{L}_{\text{simple}} = \mathbb{E}_{t, x_0, \epsilon}\!\left[ \left\| \epsilon - \epsilon_\theta\!\left( \sqrt{\bar\alpha_t}\, x_0 + \sqrt{1-\bar\alpha_t}\, \epsilon,\ t \right) \right\|_2^2 \right]$$

读法：随机抽时刻 $$t$$、数据 $$x_0$$、噪声 $$\epsilon$$ → 前向造 $$x_t$$ → 让网络从 $$x_t$$ 猜出当初加的噪声 $$\epsilon$$。

## 2. 表示对照表

| 表示名 | 公式核心 | 出处 | 说明 |
|---|---|---|---|
| ε-预测 L_simple | $$\|\epsilon - \epsilon_\theta(x_t, t)\|_2^2$$ | DDPM Ho et al. 2020 | 实操标准，`#loss/regression` |
| x₀-预测 | $$\|x_0 - \hat{x}_0(x_t,t)\|_2^2$$ | DDPM 理论节、像素空间常用 | 与 ε 版差一个时变缩放因子 |
| v-预测 | $$\|v - v_\theta(x_t,t)\|_2^2$$，$$v = \sqrt{\bar\alpha_t}\epsilon - \sqrt{1-\bar\alpha_t}x_0$$ | Salimans & Ho 2022 | 信噪比低时更稳（视频扩散主流） |
| score matching | $$\lambda_t \|s_\theta(x_t,t) - \nabla\log q(x_t\mid x_0)\|^2$$ | SMLD/Score-SDE | 理论母体，见 [DSM目标](/ai-fa/explore/30-Formulas/DSM目标) |
| 加权一般式 | $$\mathbb{E}\left[\lambda_t \|\epsilon - \epsilon_\theta\|^2\right]$$ | iDDPM | $$\lambda_t \equiv 1$$ 时退化为 L_simple |

**换算关系**（三者互为线性变换）：$$\hat{x}_0 = \frac{x_t - \sqrt{1-\bar\alpha_t}\epsilon_\theta}{\sqrt{\bar\alpha_t}}$$，$$v = \sqrt{\bar\alpha_t}\,\epsilon - \sqrt{1-\bar\alpha_t}\,x_0$$——预测目标不同、模型等价，仅训练动态有别。

## 教程：训练循环的一行代码（三次抽样全程）

**第 1 步：三次随机抽样。** 从数据抽 $$x_0 = 2$$（某像素）；从 $$\{1..T\}$$ 抽 $$t = 2$$；从标准正态抽 $$\epsilon = 0.5$$。

**第 2 步：前向造题。** 闭式一步（玩具宇宙见 [DDPM前向过程](/ai-fa/explore/30-Formulas/DDPM前向过程)）：$$x_2 = 0.985\times2 + 0.173\times0.5 = 1.970+0.086 = 2.056$$——**网络的考题**：看见 $$(x_2, t)$$，猜当初加的 $$\epsilon$$。

**第 3 步：网络答卷与判分。** 网络（还没学好）输出 $$\epsilon_\theta(x_2, 2) = 0.6$$。损失 $$= (0.6-0.5)^2 = 0.01$$（真实按维平均，玩具一维）。

**第 4 步：梯度往哪推。** $$\partial L/\partial\epsilon_\theta = 2(\epsilon_\theta - \epsilon) = +0.2$$——把预测往 0.5 压。**没有对抗、没有博弈**——纯回归，这是扩散训练比 GAN 稳定的结构原因（对照 [GAN目标](/ai-fa/explore/30-Formulas/GAN目标)）。

**第 5 步：这份能力生成时怎么用。** 反解 $$\hat{x}_0 = (x_2 - 0.173\,\epsilon_\theta)/0.985 = (2.056-0.104)/0.985 = 1.982$$——网络说错 0.1（0.6 vs 0.5），还原的干净图只差 0.018：**对 ε 的惩罚被前向系数稀释后才落到 $$x_0$$ 上**（ε-参数化数值稳定的根源之一）。

**第 6 步：L_simple 到底扔了什么。** 变分界里每步带时变权重 $$\lambda_t$$（$$t$$ 大时权重爆炸——高噪步主导梯度）；L_simple 全设 1 并丢端点项。原文实验：扔掉反而 FID 更好——**理论最优加权和 ≠ 经验最优**，扩散史上最著名的工程反杀。

## 3. 直觉解释

- **为什么预测噪声就行**：知道 $$x_t$$ 和 $$\epsilon$$ 就能反解 $$x_0$$（前向闭式逆用）→ 等于学会了去噪
- $$\mathbb{E}_{t,x_0,\epsilon}$$：三者都随机抽，每步训练样本"时刻不同、内容不同、噪声不同"——天然数据增广
- **L_simple 扔掉了什么**：变分界里的时变权重 $$\lambda_t$$ 和端点项。实验发现扔掉反而更好（高噪声步权重过大伤训练）——工程经验战胜理论最优的著名案例
- `#loss/regression`：本质是回归损失——预测一个高斯噪声向量

## 4. 出处

| 论文 | 贡献 |
|---|---|
| [Denoising Diffusion Probabilistic Models](/ai-fa/explore/10-Papers/02-生成建模与扩散/Denoising Diffusion Probabilistic Models（DDPM）) | 提出 L_simple，FID 首超 GAN |
| [Improved Denoising Diffusion Probabilistic Models](/ai-fa/explore/10-Papers/02-生成建模与扩散/Improved Denoising Diffusion Probabilistic Models（iDDPM）) | 证明 L_simple ≈ 加权 score matching，提出余弦调度 |
| [Score-Based Generative Modeling through Stochastic Differential Equations](/ai-fa/explore/10-Papers/02-生成建模与扩散/Score-Based Generative Modeling through Stochastic Differential Equations（Score-SDE）) | 统一为 score matching 框架 |

## 5. 数学概念分解

- [期望](/ai-fa/explore/40-Concepts/期望)：损失是三变量联合期望（batch 平均近似）
- [范数](/ai-fa/explore/40-Concepts/范数)：平方 L2 距离
- [Score函数](/ai-fa/explore/40-Concepts/Score函数)：ε-预测 ≈ score × 时变尺度
- [ELBO](/ai-fa/explore/40-Concepts/ELBO)：变分界是 ELBO 的负数形式
- [马尔可夫链](/ai-fa/explore/40-Concepts/马尔可夫链)：逐项 KL 依赖马尔可夫分解

## 6. 自测

1. 训练一步抽哪三个随机量？各来自什么分布？（$$t$$ 均匀 1..T；$$x_0$$ 数据分布；$$\epsilon$$ 标准正态）
2. $$\epsilon = 0.5,\ \epsilon_\theta = 0.6$$：loss 与梯度？（0.01；$$\partial L/\partial\epsilon_\theta = +0.2$$ 推向 0.5）
3. ε-预测为什么等价于学去噪？（知道 $$x_t$$ 和 ε，闭式可反解 $$x_0$$——预测噪声=预测干净图，一币两面）
4. L_simple 相对变分界改了什么？为什么反而好？（时变权重全置 1、丢端点项；高噪步权重爆炸伤训练——工程胜理论案例）

## 7. 与其他公式的关系

- → **由** [DDPM后验分布](/ai-fa/explore/30-Formulas/DDPM后验分布) **推导**：KL(q‖p_θ) 展开后高斯间的 KL 只剩均值差 MSE
- ≡ **等价于** [DSM目标](/ai-fa/explore/30-Formulas/DSM目标)（denoising score matching 特例）
- ⊃ **泛化为** [条件流匹配损失](/ai-fa/explore/30-Formulas/条件流匹配损失)：FM 的 $$x_t = \alpha_t x_0 + \sigma_t z$$ 加 MSE 是同一骨架、不同预测量（速度场）
- 对比 [GAN目标](/ai-fa/explore/30-Formulas/GAN目标)：`#loss/regression` vs `#loss/adversarial` ——扩散把 GAN 的对抗博弈换成纯回归，稳定性来源
