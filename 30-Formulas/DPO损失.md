---
type: formula
formula_id: DPO-LOSS
aliases: [DPO损失, Direct Preference Optimization, 直接偏好优化]
domain: 强化学习与对齐
loss_type: expectation-of-ratio
tags: [formula]
---

# DPO 损失

## 1. 标准形式

$$\mathcal{L}_{\text{DPO}}(\theta) = -\,\mathbb{E}_{(x,\, y^+,\, y^-)\sim\mathcal{D}}\!\left[ \log \sigma\!\left( \beta \log\frac{\pi_\theta(y^+ \mid x)}{\pi_{\mathrm{ref}}(y^+ \mid x)} - \beta \log\frac{\pi_\theta(y^- \mid x)}{\pi_{\mathrm{ref}}(y^- \mid x)} \right) \right]$$

- $y^+ / y^-$：同一 prompt 下被偏好 / 被拒绝的回答（本库记号规范 §3）
- $\beta$：温度（对应 RLHF 里的 KL 惩罚系数，控制离参考多远）
- **读法**：让"偏好的回答"的（对参考归一化的）对数概率**相对**"被拒绝的回答"尽量高

## 2. 表示对照表

| 表示名 | 公式核心 | 出处 | 说明 |
|---|---|---|---|
| sigmoid 比对版（本库标准） | 如上 | DPO 2023 | 标准形 |
| 隐式奖励表达 | $\hat r_\theta(x,y) = \beta\log\frac{\pi_\theta}{\pi_{\text{ref}}}$ | 同上 | DPO 的"隐藏奖励模型" |
| 梯度形式 | $\nabla\mathcal{L} \propto -\beta\,\sigma(\hat r^- - \hat r^+)\,[\nabla\log\pi(y^+) - \nabla\log\pi(y^-)]$ | 同上分析节 | 权重 $\sigma(\hat r^- - \hat r^+)$：**模型当前判断与数据冲突时梯度最大** |
| IPO 版 | 换成平方损失 $\mathbb{E}[(\hat r^+ - \hat r^- - \frac{1}{2\beta})^2]$ | Azar et al. 2023 | 防"偏好概率→1 仍无界追分"的病态 |
| SimPO 版 | 去参考：长度归一化 $r = \frac{\beta}{|y|}\log\pi(y|x) + \gamma$ | SimPO 2024 | 无 $\pi_{\text{ref}}$，省一半显存 |

## 3. 直觉解释

**推导链一行版**：RLHF 目标 → 有闭式最优解（[[30-Formulas/RLHF目标]] §2 末行）→ 反解出 $r$ = $\beta\log\frac{\pi}{\pi_{\text{ref}}} + \beta\log Z$ → 代入 [[40-Concepts/Bradley-Terry模型]] 的偏好似然 → $Z(x)$ 在 $y^+/y^-$ 相减时**抵消** → 得 DPO。**奖励模型被"内嵌"进策略本身**——不再需要训练单独的 $r_\phi$，不再需要在线采样，纯监督学习搞定对齐。

- **损失直觉**：像"对比学习"——拉近 $y^+$、推远 $y^-$，但都在**对数概率比空间**里做
- **梯度洞察**：$\sigma(\hat r^- - \hat r^+)$ 是自适应权重——模型已经很对时梯度趋零；模型判断与人类偏好冲突时全力拉
- **β 的双面性**：大 β = 紧 KL（保守）；小 β = 松（但偏好信号弱化）
- **失败模式**：$\hat r^-$ 的概率被无底线压低（模型自信推远坏答案 → 分布漂移到 OOD）——IPO/正则化修此病

## 4. 出处

| 论文 | 贡献 |
|---|---|
| [[10-Papers/04-强化学习与对齐/Direct Preference Optimization- Your Language Model is Secretly a Reward Model（DPO）]] | 提出 |
| [[10-Papers/04-强化学习与对齐/A General Theoretical Paradigm to Understand Learning from Human Preferences（IPO）]] | 理论重审，指出过优化病态 |
| [[10-Papers/04-强化学习与对齐/SimPO- Simple Preference Optimization with a Reference-Free Reward（SimPO）]] | 无参考变体 |
| [[10-Papers/04-强化学习与对齐/KTO- Model Alignment as Prospect Theoretic Optimization（KTO）]] | 前景理论重构 |

## 5. 数学概念分解

- [[40-Concepts/Bradley-Terry模型]]：偏好似然骨架
- [[40-Concepts/KL散度]]：β 的来源
- [[40-Concepts/期望]]：数据集期望
- [[40-Concepts/梯度]]：梯度权重 $\sigma$ 的自适应机制

## 6. 与其他公式的关系

- ⊂ **特化自** [[30-Formulas/RLHF目标]]：闭式解代入 BT 模型（等价变形链）
- 对比 [[30-Formulas/PPO裁剪目标]]：离线 vs 在线；单阶段 vs 多阶段——**对齐两范式的分水岭**
- → **衍生家族**：[[30-Formulas/IPO损失]]、[[30-Formulas/SimPO损失]]、[[30-Formulas/KTO损失]]、[[30-Formulas/ORPO损失]]
- `#loss/expectation-of-ratio`（对数概率比族的代表）
