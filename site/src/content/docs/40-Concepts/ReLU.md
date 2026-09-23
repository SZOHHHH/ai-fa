---
type: concept
aliases: [ReLU, 修正线性单元, Rectified Linear Unit, 线性整流单元]
domain: 架构
tags: [concept]
---

# ReLU（修正线性单元）

## 1. 定义（直觉 → 形式）

**直觉**：一道**半开的闸门**——负数一律拦下归零，正数原样放行。看起来"不像函数"的笨规则，却是深度学习史上最重要的一个弯折：它让梯度在正区永远保持满值，深度网络第一次真正"训得动"。

**形式**：
$$\mathrm{ReLU}(x) = \max(0,\, x)$$

- 逐元素作用于层输出：$$h = \mathrm{ReLU}(Wx + b)$$
- 原点不可导（左导 0、右导 1）——实践取次梯度（哪边都行），优化从不在乎这一个点
- [ImageNet Classification with Deep Convolutional Neural Networks](/ai-fa/explore/10-Papers/01-架构演进/ImageNet Classification with Deep Convolutional Neural Networks（AlexNet）)（2012）首次大规模启用并夺冠，从此取代 sigmoid/tanh 成为隐藏层默认

## 2. 教程：为什么这么"笨"的函数赢了

**第 1 步：看穿它的形状。** 输入 $$-5$$ → 输出 $$0$$；输入 $$0.3$$ → 输出 $$0.3$$；输入 $$100$$ → 输出 $$100$$。负区整条压平成零（**死区**），正区是 45° 直线（**直通区**）。导数只有两个值：死区 0、直通区 1。

**第 2 步：手算一个 5 层网络的梯度存活率。** 反传时每层要乘 $$\phi'(z)$$（见 [反向传播](/ai-fa/explore/20-Algorithms/反向传播) §3）：
- sigmoid 网络：$$0.25^5 \approx 0.1\%$$ ——梯度穿 5 层只剩千分之一
- ReLU 网络：只要每层至少有一半单元在直通区（实践中通常如此），梯度以 $$\approx 1$$ 的系数穿行 ——**穿多少层都不衰减**

这就是"**梯度高速公路**"的字面意思：[梯度](/ai-fa/explore/40-Concepts/梯度) 不被逐层打折。

**第 3 步：稀疏激活——每层只开部分灯。** 真实输入下约 30-50% 的 ReLU 输出为 0：同一层里一部分神经元"看见自己的图案"（亮），其余沉默。效果=**每条样本走网络的不同子路径**——自带特征选择与轻微正则（与 dropout 的"随机关灯"对照：ReLU 是"输入决定关灯"，见 [过拟合与正则化](/ai-fa/explore/40-Concepts/过拟合与正则化)）。

**第 4 步：死区什么时候变成病。** 若某神经元偏置被大梯度推得很负，**所有训练数据**都落在它的死区 → 梯度恒 0 → 永远不再更新（**dying ReLU**）。诊断特征：某层激活统计里大量单元长期输出 0。药方不是换函数而是：降学习率、用 [批归一化](/ai-fa/explore/30-Formulas/批归一化) 让输入分布回到零附近、或换 Leaky ReLU（负区留 0.01x 的小活口）。

**第 5 步：计算红利。** 一个 `max(0,x)` = 一次比较，无指数无除法。sigmoid 要算 $$e^{-x}$$ + 除法——在 billions 参数的网络里，这个差距乘以每步每层每个单元。工程红利常被理论叙事低估。

## 3. 数学性质速查

- **正区梯度恒 1**：$$\mathrm{ReLU}'(x) = \mathbb{1}[x>0]$$——**不饱和**（对比 [sigmoid函数](/ai-fa/explore/40-Concepts/sigmoid函数) 饱和区 ≤ 0.25，每层至少砍 3/4）
- **计算几乎免费**：一次比较
- **稀疏激活**：30-50% 输出为 0，自带特征选择
- **非零中心**：输出均值 > 0，梯度方向有偏——现代由 BatchNorm/RMSNorm 兜底（[批归一化](/ai-fa/explore/30-Formulas/批归一化)）
- **无上界**：输出可以任意大——配合归一化才有稳定训练
- **处处 Lipschitz-1**（左右斜率有界）——NaN 风险低于无界激活

## 4. 为什么 AI 需要它

| 出现场景 | 用法 | 库内链接 |
|---|---|---|
| 深度 CNN 隐藏层 | AlexNet/ResNet 系标配激活 | [CNN](/ai-fa/explore/20-Algorithms/CNN)、[Deep Residual Learning for Image Recognition](/ai-fa/explore/10-Papers/01-架构演进/Deep Residual Learning for Image Recognition（ResNet）) |
| 前现代 FFN | Transformer 原版 FFN 用 ReLU | [Transformer](/ai-fa/explore/20-Algorithms/Transformer) |
| RL 策略/价值头 | 简单可靠，至今常见 | [价值函数（V与Q）](/ai-fa/explore/40-Concepts/价值函数（V与Q）) |
| 门控/扩散位置 | softplus（平滑版）保证恒正 | [选择机制](/ai-fa/explore/30-Formulas/选择机制) |
| 平滑后继 | GELU = 概率软化的 ReLU | [GELU激活](/ai-fa/explore/30-Formulas/GELU激活) |

## 5. 变体速览

| 变体 | 公式 | 解决什么 |
|---|---|---|
| Leaky ReLU / PReLU | $$\max(\alpha x, x)$$，$$\alpha\approx0.01$$（可学习=PReLU） | 死区留活口 |
| softplus | $$\log(1+e^x)$$ | 处处可导（Mamba $$\Delta t$$ 用其恒正性） |
| Swish/SiLU | $$x\sigma(x)$$ | 负区软留尾巴（[SwiGLU门控](/ai-fa/explore/30-Formulas/SwiGLU门控) 的"Swi"） |
| GELU | $$x\Phi(x)$$ | 概率门控（BERT/GPT 默认，[GELU激活](/ai-fa/explore/30-Formulas/GELU激活)） |

## 6. 常见误区

- **误区**："ReLU 过时了"——在 LLM 的 FFN 位确实被 SwiGLU 系取代，但 CNN 骨干、RL 头、判别器等位置仍是默认；**位置决定选择**（同 [激活函数族](/ai-fa/explore/40-Concepts/激活函数族) 的结论）
- **误区**：死神经元"纯是缺陷"——适度负区静默是稀疏性的来源；**病根在学习率不在函数**（§2 第 4 步）
- **误区**：ReLU"线性所以没表达力"——单层确实分段线性，但叠层后折点组合可逼近任意连续函数；非线性来自"折"这个动作本身
- **误区**：原点不可导会出数值问题——测度为零的单点，次梯度在实践与理论上都工作良好

## 7. 自测

1. 5 层 sigmoid 与 5 层 ReLU 网络的梯度存活率？（0.1% vs ≈100%——正区恒 1）
2. dying ReLU 的直接诱因与三个药方？（大学习率推偏置入死区；降 lr/批归一化/Leaky）
3. 为什么说 ReLU 自带"每条样本走不同子路径"？（稀疏激活：不同输入点亮不同单元子集）
4. GELU 相对 ReLU 的"软化"软化在哪？（硬闸门 → 概率门：负区不硬归零，按输入分布留量）

## 8. 相关概念

- [激活函数族](/ai-fa/explore/40-Concepts/激活函数族)：全族谱系——ReLU 是"杀死饱和"的世代转折点
- [sigmoid函数](/ai-fa/explore/40-Concepts/sigmoid函数)：被 ReLU 取代隐藏层位的前辈；门控位至今共存
- [GELU激活](/ai-fa/explore/30-Formulas/GELU激活)：直系后继——把硬闸门软化成概率门
- [梯度](/ai-fa/explore/40-Concepts/梯度)：正区梯度恒 1 = 深层反传不衰减的根据
- [反向传播](/ai-fa/explore/20-Algorithms/反向传播)：$$\phi'$$ 逐层连乘的现场——ReLU 赢的位置
- [ImageNet Classification with Deep Convolutional Neural Networks](/ai-fa/explore/10-Papers/01-架构演进/ImageNet Classification with Deep Convolutional Neural Networks（AlexNet）)：历史定妆照——2012 ImageNet 冠军配方核心件
