---
type: concept
aliases: [Wasserstein距离, Wasserstein Distance, 推土机距离, Earth Mover's Distance]
domain: 数学基础
tags: [concept]
---

# Wasserstein 距离

## 1. 定义（直觉 → 形式）

**直觉**：把分布 $P$ 的"沙堆"搬运成分布 $Q$ 的"沙堆"，最少需要移动多少"沙 × 距离"。也叫**推土机距离（EM 距离）**。

**形式**（最优传输定义）：
$$W(P, Q) = \inf_{\gamma \in \Pi(P, Q)} \mathbb{E}_{(x, y) \sim \gamma}\!\left[ \|x - y\| \right]$$
$\Pi(P,Q)$ 是所有"边缘分布分别为 P、Q 的联合分布"（传输方案），取期望搬运代价最小的方案。

**对比 KL**：

| 性质 | KL 散度 | Wasserstein |
|---|---|---|
| 对称性 | ❌ | ✅ |
| $P, Q$ 支撑不重叠 | = ∞ | 有限、连续 |
| 提供几何信息 | 无 | 有（搬运距离）|
| 直接可算 | 需要密度 | 需对偶（见下）|

## 2. 数学形式

- **Kantorovich–Rubinstein 对偶**（WGAN 全靠它）：
$$W(P, Q) = \sup_{\|f\|_{L} \le 1} \left| \mathbb{E}_{x\sim P}[f(x)] - \mathbb{E}_{y\sim Q}[f(y)] \right|$$
上确界在所有 1-[[40-Concepts/Lipschitz连续]] 函数 $f$ 上取。$f$ 就是 WGAN 的**critic**——把"算距离"变成"学一个函数"。
- **梯度可用**：对偶形式光滑可导，训练稳定
- **WGAN 训练**：critic 最大化差值（学距离），生成器最小化被 critic 量出的距离

## 3. 为什么 AI 需要它

| 出现场景 | 用法 |
|---|---|
| [[10-Papers/02-生成建模与扩散/Wasserstein GAN（WGAN）]] | 把 GAN 的 JS 散度换成 W 距离，解决梯度消失与不稳定 |
| [[20-Algorithms/流匹配]] | 理论上 FM 目标是 Wasserstein 泛函的变分形式（连通最优传输） |
| 最优传输 | 大师理论：Monge / Kantorovich 问题，[[20-Algorithms/矩形流]] 的"直线路径"即 OT 最优 |

## 4. 常见误区

- **误区**：WGAN "算出了 W 距离"——只是对偶的近似，critic 容量有限时是下界
- **误区**：W 距离有限就"好优化"——critic 的 Lipschitz 约束（权重裁剪/谱归一化/梯度惩罚）实现不当仍会失真
- **误区**：$W_1$ 之外的 $W_p$（$p>1$）也存在，生成模型默认 $W_1$

## 5. 相关概念

- [[40-Concepts/KL散度]]：另一种分布距离，各有优劣
- [[40-Concepts/Lipschitz连续]]：对偶形式里的约束
- [[40-Concepts/概率分布]]：距离的作用对象
- [[40-Concepts/范数]]：搬运代价里的距离定义
