---
type: formula
formula_id: RSSM
aliases: [RSSM转移模型, RSSM, 循环状态空间模型, Recurrent State-Space Model]
domain: 世界模型与序列建模
tags: [formula]
---

# RSSM 转移模型

## 1. 标准形式

$$h_t\;=\;f\big(h_{t-1},\,s_{t-1},\,a_{t-1}\big),\qquad s_t\;\sim\;\begin{cases}q(s_t\mid h_t,\,o_t) & \text{训练（推断网络，看得见观测）}\\ p(s_t\mid h_t) & \text{想象（转移先验，看不见观测）}\end{cases}$$

三个组件：**确定性记忆 $$h$$**（GRU 沿时间滚）、**随机状态 $$s$$**（每步一个小分布）、**双头**（推断网络 $$q$$ 训练时用、先验 $$p$$ 想象时用），两头的 KL 距离是训练项之一：

$$\mathcal{L}\;=\;\mathbb{E}\big[\log\,p(o_t\mid h_t,s_t)\;-\;\beta\,\mathrm{KL}\big(q(s_t\mid h_t,o_t)\,\Vert\,p(s_t\mid h_t)\big)\big]$$

## 2. 表示对照表（家族演化）

| 代 | 随机状态的后验形式 | 备注 |
|---|---|---|
| PlaNet（RSSM 原版） | 连续高斯（对角） | 双线结构首倡 |
| DreamerV2 | **逐维分类**（32 维×32 类） | 从"回归均值"换"查表分布"——梯度更顺、多模态更强，性能大增 |
| DreamerV3 | 分类 + symlog 编码 + free bits | 数值稳定到 200+ 游戏一套超参 |
| 其他路线 | Transformer WM（IRIS：离散 token 序列）/ 像素扩散 WM（DIAMOND：不建 latent，直接画帧） | 对照坐标：**latent 压缩路线 vs 像素直绘路线** |

## 教程：一步更新的双头手算（KL 把先验推向推断）

**第 1 步：确定线先走。** $$h_t = f(h_{t-1}, s_{t-1}, a_{t-1})$$——GRU 滚一步（教学不展开内部），$$h$$ 连续传递、梯度畅通（骨架）。

**第 2 步：随机线两个头（二态简化，V2 分类版 32 类同构）。** **先验头**（没看观测）：$$p(s_t|h_t) = (0.7,\ 0.3)$$；**推断头**（看了真实观测 $$o_t$$）：$$q(s_t|h_t, o_t) = (0.9,\ 0.1)$$——观测把信念从 7:3 拉到 9:1。

**第 3 步：KL 胶水。** $$\mathrm{KL}(q\Vert p) = 0.9\ln\frac{0.9}{0.7} + 0.1\ln\frac{0.1}{0.3} = 0.226 - 0.110 = 0.116$$——损失里的 $$\beta\cdot\mathrm{KL}$$ 项把这个差压向零：**训练逼着先验学会"推断头看了观测才会的判断"**。想象时扔掉 $$q$$ 只带 $$p$$——"没有答案时自己猜分布"的能力由此而来。

**第 4 步：双线动机的数值现场。** 环境是"对手 50/50 向左或右挡路"：纯确定模型被迫输出**平均帧**（左半身+右半身叠影的糊图——多模态被抹，[MDN-RNN](/ai-fa/explore/20-Algorithms/MDN-RNN) 同一病理）；纯随机模型每步采样**切断梯度**（上一步的 $$s$$ 采样挡住反向传播，长程信用传不动）。RSSM 各取一半：$$h$$ 走确定线传梯度（几百步畅通），$$s$$ 走随机线保分布（每步重采）——"确定性账本 + 随机性便签"。

**第 5 步：进入梦引擎。** 训练后用先验 $$p$$ 从 $$h$$ 滚 15 步想象轨迹 $$s_{1:15}$$，actor/critic 在梦上训练（[贝尔曼最优方程](/ai-fa/explore/30-Formulas/贝尔曼最优方程) 的递归在梦态上展开）——RSSM 是把 12288 维像素压进 32×32 离散潜变量的**梦引擎压缩器**。

## 3. 直觉解释

- **为什么记忆要拆成"确定 + 随机"两条线**：纯确定模型（普通 RNN 世界模型）在随机环境里被迫"猜一个未来"，学到的是平均帧——**抹掉多模态**；纯随机模型（DeepMDN 类）每步独立采样，**长程记忆传不动梯度**（上一步采样把梯度切断，latent overshoot 问题）。RSSM 的答案：**骨架走确定线**（$$h$$ 连续滚，梯度畅通几百步），**新鲜事走随机线**（$$s$$ 每步采，保住"对手可能左可能右"的分布）——**"确定性账本 + 随机性便签"**。
- **两个头为什么必须分开**：训练时模型"作弊"看真实观测 $$o_t$$（推断头 $$q$$），想象时没有未来观测只能靠先验头 $$p$$；KL 项**逼着先验长成推断的样子**——训练结束扔掉 $$q$$ 留 $$p$$，模型学会"没有答案时自己猜分布"。
- **重参数化贯穿**：$$s$$ 采样一律 $$s=\mu+\sigma\odot\epsilon,\ \epsilon\sim\mathcal{N}(0,I)$$（见 [重参数化](/ai-fa/explore/40-Concepts/重参数化)）——随机性外置，梯度才能穿。
- **在想象训练里的角色**：Dreamer 系从 $$h$$ 出发用先验 $$p$$ 滚 15 步"梦"，actor/critic 在 $$s_{1:T}$$ 上训练——RSSM 是整个"梦引擎"的状态压缩器（**把 12288 维像素压进 32×32 的离散潜变量**）。

## 4. 出处

| 论文 | 贡献 |
|---|---|
| [PlaNet 2019](/ai-fa/explore/10-Papers/09-世界模型与JEPA/Learning Latent Dynamics for Planning from Pixels（PlaNet）) | RSSM 提出 + CEM 规划 |
| [Dreamer 2020](/ai-fa/explore/10-Papers/09-世界模型与JEPA/Dream to Control- Learning Behaviors by Latent Imagination（Dreamer）) | RSSM 上挂 actor-critic（想象训练） |
| [DreamerV3 2023](/ai-fa/explore/10-Papers/09-世界模型与JEPA/Mastering Diverse Domains through World Models（DreamerV3）) | 分类潜状态+三稳定化，跨域通吃 |

## 5. 数学概念分解

- [状态空间模型方程](/ai-fa/explore/30-Formulas/状态空间模型方程)：RSSM=它的循环版（加了确定链与动作条件）
- [重参数化](/ai-fa/explore/40-Concepts/重参数化)：随机状态的梯度通路
- [KL散度](/ai-fa/explore/40-Concepts/KL散度)：先验贴推断的胶水
- [马尔可夫链](/ai-fa/explore/40-Concepts/马尔可夫链)：$$s_t$$ 只依赖 $$(h_t)$$ 的马氏结构

## 6. 自测

1. 先验 $$(0.7,0.3)$$、推断 $$(0.9,0.1)$$：KL？（$$0.226-0.110 = 0.116$$——损失压它趋零=先验学推断）
2. 训练后扔掉哪个头？为什么？（扔 $$q$$（推断）留 $$p$$（先验）——想象时没有观测可看）
3. 双线各自的病？（纯确定：随机环境输出平均帧（多模态被抹）；纯随机：每步采样切断梯度（长程传不动））
4. Dreamer 在 RSSM 之上干什么？（先验滚 15 步梦 → actor/critic 在 $$s_{1:15}$$ 上训练——梦引擎的压缩器）

## 7. 与其他公式的关系

- ↔ 对照 [DDPM前向过程](/ai-fa/explore/30-Formulas/DDPM前向过程)/像素扩散系：**latent 压缩 vs 像素生成**两大世界模型路线的公式分界
- → 应用：[贝尔曼最优方程](/ai-fa/explore/30-Formulas/贝尔曼最优方程) 的价值递归在 RSSM 的 $$s_{1:T}$$ 上展开（Dreamer 系的梦内学习）
- → 对偶：[逆动力学（IDM）](/ai-fa/explore/40-Concepts/逆动力学（IDM）) 反推的 $$(s,s')$$ 在 RSSM 系里即 $$(s_t, s_{t+k})$$ 潜状态对
