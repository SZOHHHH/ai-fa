---
type: concept
aliases: [Jensen不等式, Jensen's Inequality]
domain: 数学基础
tags: [concept]
---

# Jensen 不等式

## 1. 定义（直觉 → 形式）

**直觉**：**凹函数下"先平均再代入"≥"先代入再平均"**。打车类比：两队人各自到同一目的地，"平均后走一条路"（凹函数作用于期望）不亏于"每人各走各的再平均"（期望的函数）——凹函数有"先合并不吃亏"的性质。log 是凹函数，所以 $$\log \mathbb{E}[\cdot] \ge \mathbb{E}[\log \cdot]$$。

**形式**：若 $$f$$ 凸：$$f(\mathbb{E}[X]) \le \mathbb{E}[f(X)]$$；若 $$f$$ 凹（如 $$\log$$）：$$f(\mathbb{E}[X]) \ge \mathbb{E}[f(X)]$$。

## 2. 数学形式

- **ELBO 推导中的关键一步**（$$\log$$ 凹）：
$$\log p_\theta(x) = \log \mathbb{E}_{q(z\mid x)}\!\left[ \frac{p_\theta(x,z)}{q(z\mid x)} \right] \ \ge\ \mathbb{E}_{q(z\mid x)}\!\left[ \log \frac{p_\theta(x,z)}{q(z\mid x)} \right] = \text{ELBO}$$
- **取等条件**：$$X$$ 退化（无随机性）或 $$f$$ 线性
- **相关孪生**：EM 算法、变分推断、RL 里的策略评估都以同一不等式为骨架

## 教程：两边各代一组数字（亲眼看见"凹上凸下"）

**第 1 步：凹函数（log）+ 两点分布。** $$X$$ 以各 50% 取 $$1$$ 和 $$100$$：
- 先平均再代入：$$\log\mathbb{E}[X] = \log(50.5) \approx 3.92$$
- 先代入再平均：$$\mathbb{E}[\log X] = \frac{\log 1 + \log 100}{2} = \frac{0+4.605}{2} \approx 2.30$$
- **$$3.92 \ge 2.30$$ ✓**（凹函数：函数在期望之上）。差距从哪来？X 的随机性——**随机性在凹世界里是折损**（确定性拿到 50.5 的对数 > 随机拿 1 或 100 的平均对数）。

**第 2 步：凸函数（平方）同一样本。** $$f(x)=x^2$$：$$(\mathbb{E}[X])^2 = 50.5^2 = 2550$$；$$\mathbb{E}[X^2] = \frac{1+10000}{2}=5000.5$$——**$$5000.5 \ge 2550$$ ✓**（凸函数：函数在期望之下），且差值 $$= \mathrm{Var}(X) = 2450.5$$（这不是巧合：$$\mathbb{E}[X^2]-\mathbb{E}[X]^2$$ 恒等于方差——**Jensen 的缺口本身就是方差**，[方差与协方差](/ai-fa/explore/40-Concepts/方差与协方差)）。

**第 3 步：ELBO 里的一步（认出它）。** $$\log\mathbb{E}_q[\frac{p(x,z)}{q}] \ge \mathbb{E}_q[\log\frac{p(x,z)}{q}]$$——形态=第 1 步：左=真值 $$\log p(x)$$，右=ELBO，**缺口=随机性（用 q 采样带来的）折损**，且可以精确写成 $$\mathrm{KL}(q\|p(z|x))$$（[ELBO](/ai-fa/explore/40-Concepts/ELBO) §2 第 5 步）。Jensen 不等式在哪，下界就在哪。

**第 4 步：取等条件。** $$X$$ 无随机性（$$q$$ 退化为单点）或 $$f$$ 线性——两头都严丝合缝。

## 3. 为什么 AI 需要它

| 出现场景 | 用法 |
|---|---|
| [ELBO](/ai-fa/explore/40-Concepts/ELBO) | 下界成立的唯一一步魔法 |
| [Auto-Encoding Variational Bayes](/ai-fa/explore/10-Papers/02-生成建模与扩散/Auto-Encoding Variational Bayes（VAE）) | 训练目标的合法性来源 |
| [DDPM训练目标](/ai-fa/explore/30-Formulas/DDPM训练目标) | DDPM 的 ELBO 是其多步版本 |
| RL（PPO 下界） | $$\log \mathbb{E} \ge \mathbb{E}\log$$ 同样出现 |

## 4. 常见误区

- **误区**：方向记反——口诀"**凹上凸下**"（凹函数：函数在期望之上；凸函数：函数在期望之下）
- **误区**：Jensen 给的是下界不是等式；差距 = [KL散度](/ai-fa/explore/40-Concepts/KL散度)
- **误区**：只对"期望"成立，对"任意平均"也成立（加权平均同理）

## 5. 自测

1. 凹 f 与凸 g，各写一条不等式？（$$f(\mathbb{E})\ge\mathbb{E}[f]$$；$$g(\mathbb{E})\le\mathbb{E}[g]$$——口诀"凹上凸下"）
2. $$\sqrt{\mathbb{E}[X]}$$ 与 $$\mathbb{E}[\sqrt X]$$ 谁大？（前者——√是凹函数）
3. 平方的 Jensen 缺口等于什么？（方差——$$\mathbb{E}[X^2]=\mathbb{E}[X]^2+\mathrm{Var}(X)$$）
4. ELBO 与真值的差距能用一个词概括来源吗？（采样随机性在凹函数下的折损——量化为 KL）

## 6. 相关概念

- [ELBO](/ai-fa/explore/40-Concepts/ELBO)：最重要的应用
- [期望](/ai-fa/explore/40-Concepts/期望)：不等式的作用对象
- [高斯分布](/ai-fa/explore/40-Concepts/高斯分布)：log-凹性使高斯相关推导顺畅
