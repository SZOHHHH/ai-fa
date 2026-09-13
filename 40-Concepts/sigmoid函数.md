---
type: concept
aliases: [sigmoid函数, sigmoid, 逻辑函数, logistic函数, S型函数, σ]
domain: 数学基础
tags: [concept]
---

# sigmoid 函数

## 1. 定义（直觉 → 形式）

**直觉**：把任意实数压进 (0,1) 的"S 形滑梯"——输入很负贴着 0、很正贴着 1、中间平滑过渡。它回答的唯一问题是：**"这个分数当'是'的概率有多大？"**

**形式**：
$$\sigma(x) = \frac{1}{1+e^{-x}} = \frac{e^x}{1+e^x}$$

- 全库标准记号 $\sigma(\cdot)$（见 [[00-Meta/记号规范]] §1）
- 值域 (0,1)，单调递增，中心对称点在原点：$\sigma(0)=0.5$、$\sigma(-x) = 1-\sigma(x)$

## 2. 数学性质（它为什么好用）

- **求导自封闭**：$\sigma'(x) = \sigma(x)\,(1-\sigma(x))$——导数由函数值自己算出，反向传播零额外开销
- **对数恒等式**：$\log\sigma(x) = -\log(1+e^{-x}) = -\mathrm{softplus}(-x)$——这是 [[30-Formulas/DPO损失]] 里 $\log\sigma(\cdot)$ 数值稳定实现的来源（softplus = [[40-Concepts/激活函数族]] 成员）
- **sigmoid = 二类 softmax**：$\mathrm{softmax}(z_1, z_2) = \left(\sigma(z_1 - z_2),\; \sigma(z_2 - z_1)\right)$——只对**差**敏感（平移不变），所以天然配"两物比较"
- **softmax 的 logit 视角**：$\sigma(x) = \mathrm{softmax}(x, 0)$——sigmoid 就是在"某分数 vs 基准 0"之间做 softmax
- 概率族出身：Bernoulli 分布的自然参数 → 均值的标准链接（logit 链接）——统计里叫 logistic 函数
- 历史出身：人口增长曲线（Verhulst 1838）——"增长自带刹车"

## 3. 为什么 AI 需要它

| 出现场景 | 用法 | 库内链接 |
|---|---|---|
| 二分类输出头 | 分数 → [0,1] 概率（sigmoid + NLL = [[30-Formulas/交叉熵]] 二分类特例） | [[30-Formulas/交叉熵]] |
| **偏好概率**（BT 模型） | $p(y^+ \succ y^-) = \sigma(r^+ - r^-)$——分数差 → 被偏好概率 | [[40-Concepts/Bradley-Terry模型]] |
| **DPO 损失** | $\log\sigma(\beta \Delta\log\pi)$——DPO 全家（IPO/KTO/SimPO 变体同构）的骨架件 | [[30-Formulas/DPO损失]] |
| **负采样判别** | $\log\sigma(v_c^\top v_t)$——"这对邻居是真/假"的二分类打分 | [[30-Formulas/word2vec负采样]] |
| 门控单元 | $\mathrm{GLU}$ 系：sigmoid 路当"阀门"控制线性路流量 | [[30-Formulas/SwiGLU门控]] |
| 独立 Bernoulli 多标签 | K 个互不排斥的"是/否"头（区别于 K 选 1 的 softmax） | [[40-Concepts/独热编码（One-Hot）]] |

## 4. 常见误区

- **误区**：sigmoid"过时了"——作为**隐藏层激活**确实被 ReLU/GELU 淘汰（梯度饱和），但作为**概率出口/门控/偏好打分**无处不在；"激活的衰退"≠"函数的衰退"
- **误区**：$\sigma(x) + \sigma(-x) = 1$ 所以"两个输出独立"——恰恰相反，这是同一枚硬币两面；互斥二选一必须共用一个 σ（见 BT 卡）
- **误区**：sigmoid 输出是校准概率——只是"可当概率读的分数"，校准是独立课题（同 [[40-Concepts/softmax函数]] 的误区）
- **误区**：饱和区（\|x\| 很大）梯度趋零只是数值烦恼——它是**信息性**的：DPO 梯度权重 $\sigma(\hat r^- - \hat r^+)$ 模型判断已对时梯度自动趋零（自适应刹车）

## 5. 相关概念

- [[40-Concepts/softmax函数]]：K 类推广；sigmoid = 二类特例（差分形式）
- [[40-Concepts/独热编码（One-Hot）]]：二分类标签的两种写法（one-hot 2 维 vs 单标量 0/1+sigmoid）
- [[30-Formulas/DPO损失]]：$\log\sigma$ 骨架 + 梯度权重 $\sigma$ 的自适应机制
- [[40-Concepts/激活函数族]]：sigmoid 作为激活的兴衰史（饱和 → 被 ReLU 系取代）
- [[40-Concepts/概率分布]]：Bernoulli 分布链接函数出身
- [[40-Concepts/梯度]]：自封闭求导
