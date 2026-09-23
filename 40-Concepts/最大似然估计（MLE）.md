---
type: concept
aliases: [最大似然估计, MLE, Maximum Likelihood Estimation, 似然函数, 负对数似然]
domain: 数学基础
tags: [concept]
---

# 最大似然估计（MLE）

## 1. 定义（直觉 → 形式）

**直觉**：调参数让"你看到的数据"成为**最不意外**的结果。硬币抛 10 次 7 正面——参数 $\theta$（正面率）取多少时，这个观测最"顺理成章"？答 0.7。**MLE=选让数据似然最大的参数**。它是深度学习一切损失函数的统一出厂设置。

**形式**：
$$\hat\theta_{\text{MLE}} = \arg\max_\theta \; L(\theta) = \arg\max_\theta \prod_{i=1}^{n} p(x_i;\theta) \;\; \xrightarrow{\text{取负对数}} \;\; \arg\min_\theta \sum_{i=1}^{n} -\log p(x_i;\theta)$$
连乘取对数变连加（数值稳定+可导性不变）——**负对数似然（NLL）就是深度学习语境里的"损失函数"本体**。

## 2. 教程：五分钟推导出你已认识的所有损失

**第 1 步：手算硬币。** 抛 10 次得 7 正，似然 $L(p) = p^7(1-p)^3$。取对数求导置零：
$$\frac{d}{dp}\big[7\log p + 3\log(1-p)\big] = \frac{7}{p} - \frac{3}{1-p} = 0 \;\Rightarrow\; \hat p = \frac{7}{10}$$
样本频率本身就是 MLE——"数出来的比例"背后是严格的极值推导。

**第 2 步：高斯噪声 → MSE。** 假设 $\hat y = f_\theta(x) + \epsilon,\; \epsilon \sim \mathcal{N}(0, \sigma^2)$（[[40-Concepts/高斯分布]]）。则 $p(y\mid x;\theta) \propto e^{-(y-\hat y)^2/2\sigma^2}$，NLL：
$$-\log p = \frac{(y-\hat y)^2}{2\sigma^2} + \text{常数} \;\;\Rightarrow\;\; \text{最小化 NLL} = \text{最小化 } (y-\hat y)^2$$
**平方损失不是拍脑袋选的——它是"噪声是高斯的"这个假设的 MLE**（[[30-Formulas/均方误差（MSE）]] 的出身证明）。

**第 3 步：伯努利 → 交叉熵（二分类）。** 假设 $y \sim \text{Bernoulli}(p_\theta(x))$，$p_\theta = \sigma(w^\top x)$：
$$-\log p(y\mid x) = -\big[y\log p + (1-y)\log(1-p)\big] = \text{二分类交叉熵}$$
**交叉熵=伯努利 MLE**。多项（K 类 softmax）同法=多类交叉熵（[[30-Formulas/交叉熵]]）。

**第 4 步：连乘→连加的深意。** $n$ 条独立样本的似然是**连乘**；连乘的极值=对数连加的极值。梯度下降只能处理**求和型**目标（batch 内平均）——对数把"乘法世界"翻译成"加法世界"，这就是一切训练循环 `loss = mean(nll)` 的合法性来源。

**第 5 步：统一表（查表即得）。**

| 概率假设 | MLE 损失 | 库内链接 |
|---|---|---|
| 高斯噪声 | MSE | [[30-Formulas/均方误差（MSE）]] |
| 伯努lli/多项 | 交叉熵 | [[30-Formulas/交叉熵]] |
| 两个高斯的 KL（变分） | ELBO 里的重构项 | [[40-Concepts/ELBO]] |
| 高斯→高斯蒸馏（均值匹配） | MSE（teacher/student 均值） | [[30-Formulas/蒸馏损失]] |
| 相似对/不相似对 | 对比损失（InfoNCE 族） | [[30-Formulas/CLIP对比损失]] |

**读法：看见一个损失，反问"它在 MLE 什么分布"——损失函数瞬间有了语义。**

## 3. 数学性质速查

- **相合性**：数据无限多时 MLE 收敛到真参数（大数定律撑腰）
- **渐近正态+有效**：大样本下方差达到克拉美-罗下界（不解释名词，一句话：**大样本下没有更好的估计器**）
- **过拟合倾向**：只顾"解释已见数据"——极大似然永远想把方差 fit 到零（见 §4 误区）；**贝叶斯派=MLE+先验**（MAP），正则化的另一张面孔（[[40-Concepts/过拟合与正则化]]）
- **与 KL 的关系**：最小化 NLL ≡ 最小化模型分布与数据分布的 KL（[[40-Concepts/KL散度]]）——MLE 的信息论读法

## 4. 常见误区

- **误区**："似然=概率"——概率是**参数固定、数据变化**；似然是**数据固定、参数变化**。$L(\theta)$ 不是 $\theta$ 的密度（不对 $\theta$ 积分为 1）
- **误区**：MLE 给出"最可能的参数"——它给的是**让数据最可能的参数**（frequentist 语义；"参数最可能"是 MAP/贝叶斯的话术，需先验）
- **误区**：平方损失天然合法——它是"高斯噪声"的 MLE；重尾噪声（离群点）下高斯 MLE 被离群点绑架，应当换拉普拉斯假设（→L1/MAE）
- **误区**：交叉熵是"分类专属技巧"——它是任何离散分布 MLE 的通用形态；语言模型 next-token 训练就是交叉熵=多项 MLE（[[20-Algorithms/Transformer]] 的 $p(x)=\prod_t p(x_t|x_{<t})$ 整体是序列 MLE）

## 5. 自测

1. 抛 20 次得 13 正，MLE 是多少？为什么不用平滑（如 14/21）？（0.65；MLE 无平滑——朴素频率的极端；平滑=加先验=MAP）
2. MSE 与 L1 各是哪个噪声假设的 MLE？（高斯；拉普拉斯——重尾，对离群点稳健）
3. 为什么训练 loop 是 `mean` 而不是 `product`？（对数化连加；mini-batch 均值是期望的无偏估计——[[40-Concepts/期望]]）
4. "最小化 NLL=最小化与数据生成分布的 KL"少了哪半句？（NLL=KL+数据熵 $H(p_{data})$，后者与 $\theta$ 无关——优化等价）

## 6. 相关概念

- [[40-Concepts/概率分布]]/[[40-Concepts/高斯分布]]：假设侧的原材料
- [[40-Concepts/贝叶斯公式]]：MLE→MAP→贝叶斯的进阶阶梯（加先验）
- [[40-Concepts/KL散度]]：MLE 的信息论等价形式
- [[30-Formulas/交叉熵]]/[[30-Formulas/均方误差（MSE）]]：两大出厂损失
- [[30-Formulas/ELBO目标]]：变分推断里的"似然下界"化
- [[40-Concepts/期望]]：NLL 最小化=期望意义下的最小化（SGD 采样对象）
