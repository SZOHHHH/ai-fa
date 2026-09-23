---
type: formula
aliases: [均方误差, MSE, Mean Squared Error, 平方损失, L2损失, 均方根误差, RMSE]
domain: 数学基础
tags: [formula]
---

# 均方误差（MSE）

## 1. 标准形式

$$\mathcal{L}_{\text{MSE}} = \frac{1}{n}\sum_{i=1}^{n}\left(y_i - \hat y_i\right)^2, \qquad \mathrm{RMSE} = \sqrt{\mathcal{L}_{\text{MSE}}}$$

**直觉**：预测偏离真值的"平方平均账单"——大错重罚（错 2 罚 4、错 3 罚 9），小错宽容。RMSE 开根号回到**原量纲**（"平均差多少米"而非"平方米"），报告用。

## 2. 出处与身份（它不是拍脑袋的）

- **MLE 出身**：假设噪声 $$\epsilon \sim \mathcal{N}(0,\sigma^2)$$ 时，最小化 MSE = 最大似然（[最大似然估计（MLE）](/ai-fa/explore/40-Concepts/最大似然估计（MLE）) §2 第 2 步的完整推导）——**平方损失=高斯假设的影子**
- **回归正配**：线性回归+MSE=凸问题，闭式解 $$w^\star=(X^\top X)^{-1}X^\top y$$（[线性模型（回归与分类）](/ai-fa/explore/40-Concepts/线性模型（回归与分类）) §2）
- **梯度极简**：$$\partial \mathcal{L}/\partial \hat y = \frac{2}{n}(\hat y - y)$$——误差本身（无饱和因子），配 sigmoid 出口时才有病（那是 sigmoid 的锅，见下）

## 3. 教程：梯度怎么流、误差怎么算

**手算**：预测 $$\hat y = (2.0, 3.0)$$，真值 $$y = (1.5, 4.0)$$：
$$\mathcal{L} = \frac{(0.5)^2 + (-1.0)^2}{2} = \frac{0.25+1.0}{2} = 0.625$$
梯度（对预测）：$$(\hat y - y) = (0.5, -1.0)$$——**符号告诉你每个预测该往哪边挪、大小告诉你挪多急**。

**在库内的五个化身**：

| 化身 | 形态 | 库内链接 |
|---|---|---|
| 回归损失 | 原样 | [线性模型（回归与分类）](/ai-fa/explore/40-Concepts/线性模型（回归与分类）) |
| 蒸馏特征匹配 | teacher/student 中间层均方（FitNet 系） | [蒸馏损失](/ai-fa/explore/30-Formulas/蒸馏损失) |
| 状态对齐 | 隐状态回归（世界模型转移预测） | [RSSM转移模型](/ai-fa/explore/30-Formulas/RSSM转移模型) |
| 方差正则对照 | VICReg 把"方差别塌"写成 MSE 型罚项 | [VICReg三正则](/ai-fa/explore/30-Formulas/VICReg三正则) |
| 去噪回归 | 扩散 $$\epsilon$$-预测：$$\|\epsilon - \hat\epsilon_\theta\|^2$$ 本质是 MSE | [DDPM训练目标](/ai-fa/explore/30-Formulas/DDPM训练目标) |

## 4. 表示对照

- $$\hat y$$：预测；$$y$$：真值（回归目标或 teacher 输出）
- 逐元素平方再平均——**每个维度同权**（多维时是逐维平方和，不是先求范数再平方）
- 与 MAE（L1）：MSE=高斯 MLE、对离群点敏感（平方放大）；MAE=拉普拉斯 MLE、稳健但零点不可导
- Huber：近处平方远处线性——两者的工程折中

## 5. 常见误区

- **误区**：MSE 配 sigmoid 输出天经地义——**病态**：$$p$$ 近 0/1 时梯度被 $$\sigma'(\le 0.25)$$ 压瘪，错得越远学得越慢；分类出口必须交叉熵（[交叉熵](/ai-fa/explore/30-Formulas/交叉熵)）
- **误区**：MSE 对离群点"只是稍微敏感"——平方放大：一个 10 倍误差=100 倍罚项，一个离群点能绑架整批梯度；重尾场景换 MAE/Huber
- **误区**：RMSE 和 MSE 优化结果一样——极值点一样，但**超参调优/早停的量纲感完全不同**（RMSE 可读、MSE 会被大方差任务放大）
- **误区**：多维 MSE 要先算范数——逐维平方**先加**再平均；$$\ell_2$$ 范数正则（权重衰减）是另一回事（[过拟合与正则化](/ai-fa/explore/40-Concepts/过拟合与正则化)）

## 6. 相关概念

- [最大似然估计（MLE）](/ai-fa/explore/40-Concepts/最大似然估计（MLE）)：理论出身（高斯假设）
- [高斯分布](/ai-fa/explore/40-Concepts/高斯分布)：噪声模型本体
- [交叉熵](/ai-fa/explore/30-Formulas/交叉熵)：分类侧的对手损失
- [蒸馏损失](/ai-fa/explore/30-Formulas/蒸馏损失)：知识蒸馏里的 MSE 用法
- [范数](/ai-fa/explore/40-Concepts/范数)：MSE=逐维平方和/n，与范数的平方同构
- [方差与协方差](/ai-fa/explore/40-Concepts/方差与协方差)：MSE=偏差²+方差（当估计器有偏时，见该卡 §3）
