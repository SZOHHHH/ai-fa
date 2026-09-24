---
type: paper
title: "PointCast: One World Model for Rigid, Articulated, and Deformable Object Manipulation"
aliases: [PointCast]
year: 2026
authors: [Hantao Ye, Ross Worobel, Zhuoli Xie, Mingen Li, Houjian Yu, Youngjin Hong, Changhyun Choi]
venue: arXiv 2026（明尼苏达大学）
arxiv: "2609.28393v1"
pdf: 已下载（PDF/）
line: 世界模型与JEPA
matrix_coords: [生成式WM(扩散系), 几何点集状态(非像素), 单步采样, 机器人操作+MPC]
tags: [paper]
---

# PointCast（点集世界模型）

## 1. 一句话贡献

把操作世界模型的状态空间从像素/潜向量换成**恒等保持的 3D 点集**（物体 128 点+末端执行器 16 点，无网格、无拓扑假设、无材质标签、无外观特征），DiT 骨干一次去噪未来 5 帧全部点位置、flow matching 训练后**单步欧拉采样部署**（16.2ms/窗），单一架构+单一训练配方覆盖刚体/布/绳/多关节柜四类操作，冻结进采样式 MPC 完成四个规划任务。

## 2. 核心贡献

- **逐点轨迹监督（本文灵魂）**：每个点保持恒等、只对自己的轨迹负责——与形状级损失（Chamfer/Hausdorff，比较形状不配对点）形成路线对照。消融实锤：换成 ParticleFormer 的 set-level 损失后，柜体活动关节误差 +79%（形状匹配被"静止柜身"满足即放弃活动件），但刚体域反而 −14.5%——**逐点监督买来铰链 articulated，代价是刚体**，两损失各守一端
- **三注意力 DiT 骨干**：kNN 局部（k=16 邻域）与全局注意力逐块交替+8 个 register token（不属于任何点、只进全局注意力、输出前丢弃）+对 actor 点的交叉注意力（携带指令运动，让物体点自己分辨执行器哪部分在附近、从几何读出接触）；3D RoPE 使注意力只依赖两点相对偏移
- **距离保持先验**：每点与其 6 近邻的初始距离当"弹性骨架"约束（权重 $$w_{ij}=e^{-\gamma d_{ij}^2}$$）——逐点项表达不了的整体结构信息由它补；去掉后活动关节 +18%
- **全窗一次去噪+一步采样**：F=5 帧整窗同时去噪（无时间因果 mask），flow matching 训练后部署 $$S=1$$（单步欧拉直接返回干净窗口）；消融显示逐帧 token+块因果 mask 会带来 +33%～+248% 的灾难性退化、$$S=25$$ 反而比 $$S=1$$ 差——**"整窗一次性预测"与"天生单步"是性能组件而非精度妥协**
- **覆盖度实证**：仿真四域（Newton 仿真器，按物体划分，评估物体全未见）3/4 最佳（rigid 第二）；真机 PGND 六类 4/6 最佳且全六类优于该数据集自家模型；仿真 checkpoint 零样本迁移 2/4 捕获最佳；MPC 闭环（每窗一次网络评估）四任务全部与基线持平或胜出

## 3. 方法概要

1. **点集采集**：每次交互用最远点采样（FPS）从原始观测选 $$K=128$$ 个物体控制点；行 $$i$$ 永远贴物体同一处（仿真由仿真器给 correspondence，真机由 CoTracker3 点跟踪器给）；$$M=16$$ 个 actor 点贴末端执行器/双夹爪表面
2. **条件组装**：$$C_t=(x_t,\ \Delta x_t,\ a_{t:t+F})$$ = 当前几何+一步位移+控制器已承诺的未来 $$F$$ 帧执行器轨迹；位置按首次帧物体包围盒对角线归一化
3. **DiT 去噪**：每点一个 token（融合噪声未来窗+观测位置+一步位移），解码出该点 $$F=5$$ 帧未来位置；flow time $$\tau$$ 不占 token、经 AdaLN 调制每个块
4. **三项损失训练**：flow（回归干净窗口）+vel（速度匹配，clean 端加权）+dist（6 近邻距离保持先验）；柜体上邻居只取同零件点（全文唯一用到零件标签处）
5. **部署**：$$z_0\sim\mathcal{N}(0,I)$$，$$S=1$$ 一步欧拉返回预测窗口；滑动窗口自回归 rollout（追加预测帧进历史、读下一段执行器轨迹）；仿真随机化训练（物体几何/材质参数/指令运动逐 episode 随机）约 7 小时单 A100/H100

## 4. 核心公式

极大似然目标（交互=受控点集序列）：

`$$\max_\theta\ \mathbb{E}_{(C_t,\ x_{t+1:t+F})\sim\mathcal{D}}\left[\log p_\theta\left(x_{t+1:t+F}\mid C_t\right)\right]$$`

**直觉**：给定"现在点在哪+刚怎么动+执行器接下来要怎么走"，让观测到的未来点云尽可能大概率——世界建模就是学这个条件分布，生成式训练只是拟合它的手段。

三项联合损失：

`$$\mathcal{L} = \mathcal{L}_{\text{flow}} + \lambda_v \mathcal{L}_{\text{vel}} + \lambda_a \mathcal{L}_{\text{dist}},\quad \lambda_v = 0.1,\ \lambda_a = 0.01$$`

**直觉**：flow 项管"每点去哪"（对干净窗口的平方误差），vel 项把预测隐含的速度对齐真路径速度（在线性路径上等价于 flow 项乘 $$(1-\tau)^{-2}$$，把权重压向路径干净端），dist 项管"点与点之间结构不散架"——三分工恒定，四类对象同一套权重。

速度匹配项：

`$$\mathcal{L}_{\text{vel}} = \mathbb{E}\left[\left\lVert \frac{f_\theta(z_\tau,\tau,C_t) - z_\tau}{1-\tau} - (z_1 - z_0) \right\rVert^2\right]$$`

**直觉**：网络预测的不是带噪中间态，而是"从当前噪声出发的单位流时间位移"——分母 $$1-\tau$$ 让越接近干净端（$$\tau\to1$$）同样的误差罚得越重，精确兑现"终点质量优先"。

距离保持先验（弹性骨架）：

`$$\mathcal{L}_{\text{dist}} = \frac{1}{W}\sum_i \sum_{j\in\mathcal{N}(i)} w_{ij}\left(\lVert \hat{x}_i - \hat{x}_j \rVert - d_{ij}\right)^2,\quad w_{ij} = e^{-\gamma d_{ij}^2}$$`

**直觉**：首帧量好每点 6 近邻的"静止长度" $$d_{ij}$$，预测中谁把这对点拉长压短就罚谁，近的邻居权重指数级更大——一块无形弹簧网兜住点云，防止逐点回归各走各的把物体撕碎；铰链件上邻居只取同零件，弹簧网自动按零件分组。

## 5. 与前作/矩阵关系

- ≡同格对照 [Diffusion for World Modeling- Visual Details Matter in Atari](/ai-fa/explore/10-Papers/09-世界模型与JEPA/Diffusion for World Modeling- Visual Details Matter in Atari（DIAMOND）)：同是"扩散生成式 WM+下游决策消费"，但状态载体=几何点集 vs 像素——本文开篇即打像素路线："像素把运动与外观纠缠、生成成本高于规划器要用的几何状态"，是 E1 像素路线的**显式反方证词**
- ←整窗一次去噪思想同源于 [Diffusion Forcing- Next-token Prediction Meets Full-Sequence Diffusion](/ai-fa/explore/10-Papers/09-世界模型与JEPA/Diffusion Forcing- Next-token Prediction Meets Full-Sequence Diffusion（Diffusion Forcing）)（全序列扩散 vs 逐帧自回归），且消融"block-causal per-frame tokens +33%～+248%"直接给该争论补了点集域证据
- ←DiT+AdaLN+flow matching 工具链承自 [潜在扩散模型（LDM）](/ai-fa/explore/20-Algorithms/潜在扩散模型（LDM）) 家族
- ⊥近邻划界：ParticleFormer（最近亲：set-level 形状损失+逐粒子材质标签，无代码自实现）、PointWorld（点+DINOv3 外观特征）、PGND（粒子-网格物理嵌入）、[Spatially Aware World Action Model via Geometric Latent Diffusion](/ai-fa/explore/10-Papers/09-世界模型与JEPA/Spatially Aware World Action Model via Geometric Latent Diffusion)（几何潜扩散）——本文主张"只告诉模型点在哪，其余全靠注意力学"
- ↔与 [World Models](/ai-fa/explore/10-Papers/09-世界模型与JEPA/World Models（世界模型）) 经典定义同题：学环境动力学供规划，但把状态从图像/潜空间换成可解释几何点

## 6. 影响后续

- 几何状态 WM 的新基准点：单一配方打通 rigid/articulated/deformable 三态，后续工作大概率沿"点集+扩散 DiT+逐点监督"变体展开（对应像素侧 DIAMOND→Genie 谱系的位置）
- 对"扩散 WM 少步化"提供了**非蒸馏路径**：flow matching 目标下 $$S=1$$ 单步部署是原生能力（且 $$S=25$$ 更差），与 E1"多步教师蒸馏成少步学生"构成方法论对照——少步不必都是蒸馏出来的
- 逐点恒等监督 vs 形状级监督的 trade-off（articulated↑ 刚体↓）预示后续"两阶段/双头"组合方案的空间
- MPC 消费方式（冻结 WM、每窗一次网络评估）是"WM 不训练策略只当模型"用法的干净参照

## 7. 读前须知

- flow matching / 整窗扩散去噪：本文无多步采样迭代概念，先理解 [Diffusion Forcing- Next-token Prediction Meets Full-Sequence Diffusion](/ai-fa/explore/10-Papers/09-世界模型与JEPA/Diffusion Forcing- Next-token Prediction Meets Full-Sequence Diffusion（Diffusion Forcing）) 的"噪声水平独立逐帧"思想更顺
- 点云处理基础：最远点采样（FPS）、kNN 邻域、register token（借鉴大视觉模型的"额外空白 token"技巧）
- 采样式 MPC：CEM/采样打分式规划即可，不需要策略梯度背景
- 评估口径注意：仿真误差单位 mm、柜体只评活动关节、真机按 PGND 官方协议（3s 视界平均位移误差）——跨表数字不可直接比
