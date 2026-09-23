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

- 逐元素作用于层输出：$h = \mathrm{ReLU}(Wx + b)$
- 原点不可导（左导 0、右导 1）——实践取次梯度，优化从不在乎这一个点
- [[10-Papers/01-架构演进/ImageNet Classification with Deep Convolutional Neural Networks（AlexNet）]]（2012）首次大规模启用并夺冠，从此取代 sigmoid/tanh 成为隐藏层默认

## 2. 数学性质（它为什么好用）

- **正区梯度恒 1**：$\mathrm{ReLU}'(x) = \mathbb{1}[x>0]$——**不饱和**。对比 [[40-Concepts/sigmoid函数]] 饱和区梯度 ≤ 0.25（每层至少砍掉 3/4），ReLU 正区梯度原样穿透任意深度——"梯度高速公路"（[[40-Concepts/梯度]] 视角）
- **计算几乎免费**：一个 max 比较，无指数无除法——训练 billions 参数时代的工程红利
- **稀疏激活**：真实数据下约 30-50% 神经元输出 0——每层只放行部分通路，自带特征选择（这与 L1 稀疏化的"门"思想同源）
- **非零中心 + 负区死区**：两个真实缺陷——前者由 BatchNorm/RMSNorm 兜底（[[30-Formulas/批归一化]]），后者见误区区
- **大度量表**：输出无上界（对比 tanh 的 (−1,1)）——配合归一化才有稳定训练

## 3. 为什么 AI 需要它

| 出现场景 | 用法 | 库内链接 |
|---|---|---|
| 深度 CNN 隐藏层 | AlexNet/ResNet 系标配激活 | [[10-Papers/01-架构演进/ImageNet Classification with Deep Convolutional Neural Networks（AlexNet）]]、[[10-Papers/01-架构演进/Deep Residual Learning for Image Recognition（ResNet）]] |
| 前现代 FFN | Transformer 原版 FFN 用 ReLU | [[20-Algorithms/Transformer]] |
| RL 策略/价值头 | 简单可靠，至今常见 | [[40-Concepts/价值函数（V与Q）]] |
| 门控/扩散位置 | softplus（平滑版）保证恒正 | [[30-Formulas/选择机制]] |
| 平滑后继 | GELU = 概率软化的 ReLU | [[30-Formulas/GELU激活]] |

## 4. 常见误区

- **误区**："ReLU 过时了"——在 LLM 的 FFN 位确实被 [[30-Formulas/SwiGLU门控]] 系取代，但 CNN 骨干、RL 头、判别器等位置仍是默认选项；**位置决定选择**（同 [[40-Concepts/激活函数族]] 的结论）
- **误区**：死神经元（dying ReLU）"纯是缺陷"——单个神经元落进负区且再也出不来，通常是大学习率+大梯度把偏置推负所致；但适度的负区静默正是稀疏性的来源，**病根在学习率不在函数**
- **误区**：ReLU"线性所以没表达力"——单层确实分段线性，但叠层后折点组合可以逼近任意连续函数；非线性来自"折"这个动作本身
- **误区**：原点不可导会出数值问题——测度为零的单点，实际梯度和理论次梯度都工作良好

## 5. 相关概念

- [[40-Concepts/激活函数族]]：全族谱系——ReLU 是"杀死饱和"的世代转折点
- [[40-Concepts/sigmoid函数]]：被 ReLU 取代隐藏层位的前辈；门控位至今共存
- [[30-Formulas/GELU激活]]：直系后继——把硬闸门软化成概率门
- [[40-Concepts/梯度]]：正区梯度恒 1 = 深层反传不衰减的根据
- [[10-Papers/01-架构演进/ImageNet Classification with Deep Convolutional Neural Networks（AlexNet）]]：历史定妆照——2012 ImageNet 冠军配方核心件
