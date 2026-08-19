---
type: concept
aliases: [Lipschitz连续, Lipschitz Continuity, 利普希茨]
domain: 数学基础
tags: [concept]
---

# Lipschitz 连续

## 1. 定义（直觉 → 形式）

**直觉**：函数变化的"限速器"。Lipschitz 连续函数保证：输入动一点，输出最多按比例动——**斜率被全局封顶**。不封顶的函数可以在极小区间内剧烈震荡。

**形式**：
$$\|f(x_1) - f(x_2)\| \le L\, \|x_1 - x_2\| \quad \forall x_1, x_2$$
最小的 $L$ 叫 Lipschitz 常数。$L=1$ 记作 **1-Lipschitz**。

## 2. 数学形式

- **与可导性**：Lipschitz ⇒ 一致连续 ⇒ 连续；可导函数的 $L \le \sup\|\nabla f\|$
- **Kantorovich–Rubinstein 对偶**：$W_1(P,Q) = \sup_{\|f\|_L \le 1} [\,\mathbb{E}_P f - \mathbb{E}_Q f\,]$——WGAN critic 必须被约束为 1-Lipschitz
- **实现约束的手段**：权重裁剪（WGAN 原文，粗糙）、梯度惩罚 WGAN-GP（2017，主流）、谱归一化（2018）
- **ODE 存在唯一性**：速度场 Lipschitz ⇒ 轨迹不交叉、解唯一（流的正则性）——[[20-Algorithms/流匹配]] 理论的基石之一

## 3. 为什么 AI 需要它

| 出现场景 | 用法 |
|---|---|
| [[10-Papers/02-生成建模与扩散/Wasserstein GAN（WGAN）]] | critic 的 1-Lipschitz 约束（权重裁剪实现） |
| WGAN-GP | 惩罚梯度的范数使其 ≈ 1 |
| [[40-Concepts/常微分方程（ODE）|常微分方程]]：解的存在唯一性条件 | |
| 神经 ODE | 控制轨迹畸变 |
| 谱归一化（GAN 谱系） | 每层权重除以最大奇异值 |

## 4. 常见误区

- **误区**："Lipschitz = 平滑"——平滑通常指可导，Lipschitz 只是斜率有界，函数可以有折角（如 $|x|$）
- **误区**：权重裁剪"实现"了约束——只是硬性逼近，会让 critic 容量受损（WGAN-GP 论文的批评）
- **误区**：神经网络默认不满足任何 Lipschitz 界，必须显式约束

## 5. 相关概念

- [[40-Concepts/Wasserstein距离]]：对偶理论里的角色
- [[40-Concepts/梯度]]：Lipschitz 常数 = 梯度范数上确界
- [[40-Concepts/范数]]：定义里的度量
