---
type: algo
aliases: [CNN, 卷积神经网络, Convolutional Neural Network, 卷积网络]
line: 架构演进
tags: [algo]
---

# CNN（卷积神经网络）

## 1. 定义

**非数学语言**：用"**滑动共享权重的小窗**"看图像的网络。不是让每个像素连到下层的每个神经元（参数爆炸），而是拿一个很小的权重模板在图上滑动扫描——同一个模板看遍全图。两个先验写死在结构里：**局部性**（邻近像素才相关）与**平移不变**（猫在左上角还是右下角是同一只猫）。层层堆叠后，浅层看边缘纹理、深层看部件物体。

**数学语言**：离散卷积（严格说是互相关）层叠：
$$y[i,j] = \sum_{k=1}^{K}\sum_{l=1}^{K} W[k,l]\, x[i+k-1,\, j+l-1] + b$$
单个 $K\times K$ 核 $W$ 在整张图上**共享**，参数量从 $d_{in}\times d_{out}$（全连接）降到 $K^2 \times C_{in}\times C_{out}$（与图像尺寸无关）。

## 2. 本命论文群

| 论文 | 引入/发展了什么 | 年份 |
|---|---|---|
| LeNet-5（LeCun，未建卡） | 卷积+池化+梯度训练的手写数字识别——CNN 定型 | 1998 |
| [[10-Papers/01-架构演进/ImageNet Classification with Deep Convolutional Neural Networks（AlexNet）]] | ReLU+GPU+dropout 三件套引爆深度学习 | 2012 |
| [[10-Papers/01-架构演进/Batch Normalization- Accelerating Deep Network Training by Reducing Internal Covariate Shift（BN）]] | 让"更深的 CNN"训得动 | 2015 |
| [[10-Papers/01-架构演进/Deep Residual Learning for Image Recognition（ResNet）]] | 残差连接破百层——现代一切深骨干的模板 | 2015 |
| [[10-Papers/01-架构演进/Encoder-Decoder with Atrous Separable Convolution for Semantic Image Segmentation（DeepLabv3+）]] | 空洞卷积+可分离卷积（CNN 精细化分支） | 2018 |
| [[10-Papers/01-架构演进/An Image is Worth 16x16 Words- Transformers for Image Recognition at Scale（ViT）]] | 挑战者：纯注意力吃大数据超过 CNN | 2020 |
| [[10-Papers/01-架构演进/Swin Transformer- Hierarchical Vision Transformer using Shifted Windows（Swin）]] | 注意力架构反过来模仿 CNN 的层次化 | 2021 |

## 3. 核心公式与关键件

- **卷积核共享**（上文 $y[i,j]$ 式）——参数效率的本质
- **感受野叠加**：一层 $3\times3$ 只看 9 格，但 $L$ 层串联后指数扩大——**深度 = 看多大范围**；空洞卷积（[[10-Papers/01-架构演进/Encoder-Decoder with Atrous Separable Convolution for Semantic Image Segmentation（DeepLabv3+）]]）跳着看，不加深也扩野
- **池化/步幅**：小区域取 max/平均——小幅平移不变+分辨率递减（层次化金字塔的来源）
- **训练**：整套跑在 [[20-Algorithms/反向传播]] 上；激活历史见 [[40-Concepts/ReLU]]；深了不稳用 [[30-Formulas/批归一化]]、深了难训用 [[30-Formulas/残差连接]]

## 4. 数学概念分解

[[40-Concepts/梯度]]（卷积的反传=转置卷积）、[[40-Concepts/激活函数族]]、[[40-Concepts/内积]]（卷积核与局部 patch 的内积=相似度打分）、[[20-Algorithms/反向传播]]（端到端训练）

## 5. 变体与演进

| 变体 | 相比本算法改了什么 | 代表 |
|---|---|---|
| 残差 CNN | 每两卷积加恒等直通，破百层 | [[10-Papers/01-架构演进/Deep Residual Learning for Image Recognition（ResNet）]] |
| 全卷积（FCN 系） | 全连接层也换卷积，输出空间图（分割） | DeepLabv3+（同上） |
| 空洞/可分离卷积 | 一步扩感受野/降参数 | DeepLabv3+（同上） |
| 胶囊网络 | 向量神经元+动态路由，治"部件位置错乱" | [[10-Papers/01-架构演进/Dynamic Routing Between Capsules（Capsule）]] |
| NAS 搜索架构 | 把设计网络本身变成搜索问题 | [[10-Papers/01-架构演进/Learning Transferable Architectures for Scalable Image Recognition（NASNet）]] |
| ViT（范式更替） | 图切 patch 当 token，纯注意力 | [[10-Papers/01-架构演进/An Image is Worth 16x16 Words- Transformers for Image Recognition at Scale（ViT）]] |

## 6. 对比表（CNN vs ViT：视觉两大范式的交易）

| | CNN | ViT |
|---|---|---|
| 归纳偏置 | 局部+平移不变**写死在结构里** | 几乎没有，靠数据学 |
| 小数据 | 强（先验顶半个老师）✅ | 弱（没数据学不出"平移不变"） |
| 大数据 | 先验反成天花板 | 持续受益，反超 CNN ✅ |
| 计算形态 | 稠密局部运算（对 GPU 极友好） | 全局注意力 $O(n^2)$ |
| 现代地位 | 边缘设备/下游骨干/扩散 UNet 的编码器 | 大规模预训练默认起点 |

**一句话总结**：CNN 把"看图的方式"（局部、平移不变、层次化）焊进权重共享的结构里——先用先验省数据，ViT 用数据买掉先验；今天视觉系统大多两者混血（如 Swin 把注意力学回了层次化）。
