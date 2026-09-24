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

## 教程：两堆沙的搬运方案（+KL 对照现场）

**第 1 步：设定。** 数轴上：$P$ 在位置 0 和 2 各有一单位沙；$Q$ 在位置 1 和 3 各需一单位。

**第 2 步：枚举搬运方案。** 方案甲：$0\to1$（代价 1）、$2\to3$（代价 1），总代价 **2**；方案乙：$0\to3$（3）、$2\to1$（1），总代价 4——**最优传输 = 取最小的方案甲：$W_1(P,Q) = 2$**。

**第 3 步：KL 对照（关键差异）。** $P$ 与 $Q$ 的支撑 $\{0,2\}$ 与 $\{1,3\}$ **完全不重叠**：$\mathrm{KL}(P\Vert Q) = \sum P\log(P/Q) = \log(1/0) = \infty$——KL 认为两分布"无穷远"；Wasserstein 报出一个诚实的 2。**GAN 的原始病灶正在这**：生成器初期与数据支撑不重叠 → JS/KL 梯度消失 → WGAN 换 W 距离后梯度恢复（有限且连续，挪一点沙代价变一点）。

**第 4 步：对偶怎么用（WGAN 实操）。** $W = \sup_{\|f\|_L\le1}|\mathbb{E}_P f - \mathbb{E}_Q f|$：critic 学一个 1-Lipschitz 函数尽量拉开两边的平均分——本例中 $f(x) = x$（斜率 1，合法）给出 $|\mathbb{E}_Q - \mathbb{E}_P| = |2-1| = 1$（下界；更聪明的 critic 逼近真值 2）。**"算距离"变成"学一个函数"**——神经网络的拿手好戏（Lipschitz 约束的实现见 [[30-Formulas/谱归一化]] / [[30-Formulas/梯度惩罚]]）。

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

## 5. 自测

1. P 在 {0,2}、Q 在 {1,3} 各一单位沙：最优搬运与 $W_1$？（$0\to1$、$2\to3$；总代价 2）
2. 同场景 KL 给多少、说明什么？（∞——支撑不重叠时 KL 爆炸而 W 有限连续（WGAN 的动机））
3. 对偶形式把"算距离"变成了什么？（学一个 1-Lipschitz critic 拉开两侧均值——神经网络可解）
4. WGAN 量出的是精确的 W 吗？（对偶的近似——critic 容量有限时是下界）

## 6. 相关概念

- [[40-Concepts/KL散度]]：另一种分布距离，各有优劣
- [[40-Concepts/Lipschitz连续]]：对偶形式里的约束
- [[40-Concepts/概率分布]]：距离的作用对象
- [[40-Concepts/范数]]：搬运代价里的距离定义
