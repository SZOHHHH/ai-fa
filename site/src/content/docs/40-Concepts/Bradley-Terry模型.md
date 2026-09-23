---
type: concept
aliases: [Bradley-Terry模型, Bradley-Terry Model, BT模型, 偏好模型]
domain: 数学基础
tags: [concept]
---

# Bradley–Terry 模型

## 1. 定义（直觉 → 形式）

**直觉**：给两个回答分高下，只看"谁更被喜欢"（不问喜欢多少）。BT 模型把"偏好概率"与"两回答的潜在分数"挂钩：分数差越大，压倒性偏好越确定。

**形式**：
$$p(y^+ \succ y^- \mid x) = \frac{\exp r(x, y^+)}{\exp r(x, y^+) + \exp r(x, y^-)} = \sigma\!\left( r(x, y^+) - r(x, y^-) \right)$$
- $$r(x, y)$$：潜在奖励/分数（人类偏好 induce 出来的标量）
- $$\sigma$$：[sigmoid](/ai-fa/explore/40-Concepts/sigmoid函数)（= 二选项 softmax，见同构注）
- **反向解出奖励**（DPO 的钥匙）：给定偏好数据与最优策略，$$r(x,y) = \beta \log \frac{\pi(y\mid x)}{\pi_{\text{ref}}(y\mid x)} + \beta \log Z(x)$$——奖励被策略对数比表达！

## 2. 数学形式

- **历史**：Bradley & Terry 1952，成对比较统计模型（体育排名、推荐系统同款）
- **与 RLHF 的连接**：奖励模型 $$r_\phi$$ 的训练损失 = BT 模型的负对数似然（见 [RLHF目标](/ai-fa/explore/30-Formulas/RLHF目标)）
- **与 DPO 的连接**：把 BT 的闭式奖励代回 RLHF 目标 → [DPO损失](/ai-fa/explore/30-Formulas/DPO损失)——"奖励模型"被彻底内嵌
- **局限**：只建模成对偏好，不建模"好多少"（打分模型/回归头如 KTO 所批评）
- **与 EARS 的连接（260916）**：[EARS](/ai-fa/explore/10-Papers/04-强化学习与对齐/Specifying Reward Functions for RL Without Environment Sampling) 把 BT 偏好比较搬进 LLM 构造的"想象轨迹特征空间"——不采真轨迹也能从偏好对学特征权重

## 教程：从偏好数据到 DPO（手算全链条）

**第 1 步：偏好概率手算。** 回答 A 分数 $$r_A = 2$$、B 分数 $$r_B = 0$$：
$$p(A\succ B) = \sigma(2 - 0) = \sigma(2) \approx 0.88$$
分数差 2 → 88% 偏好；差 4 → $$\sigma(4)\approx0.982$$；差 0 → 50%（平局）。**只有差进 sigmoid**：把两个分数同时 +100，偏好概率分毫不变（平移不变性——绝对分数无意义的第一现场）。

**第 2 步：训练奖励模型（负对数似然）。** 标注员选了 A，模型当前给 $$r_A=1,\ r_B=0.5$$：损失 $$= -\log\sigma(1-0.5) = -\log 0.622 \approx 0.475$$。梯度方向：**拉大 $$r_A - r_B$$**（对 [sigmoid函数](/ai-fa/explore/40-Concepts/sigmoid函数) 卡"自适应刹车"的另一面：模型已分对且分差大时梯度自动趋零）。这就是 RLHF 奖励模型的全部训练公式（[RLHF目标](/ai-fa/explore/30-Formulas/RLHF目标) §奖励模型段）。

**第 3 步：闭式反推（DPO 的钥匙，本卡最重要的一步）。** RLHF 的最优策略有玻尔兹曼闭式 $$\pi^\*(y\mid x) \propto \pi_{ref}(y\mid x)\,e^{r(x,y)/\beta}$$，两边取对号整理：
$$r(x, y) = \beta\log\frac{\pi^\*(y\mid x)}{\pi_{ref}(y\mid x)} + \beta\log Z(x)$$
（$$Z(x)$$ 是配分函数，与 $$y$$ 无关。）

**第 4 步：$$Z(x)$$ 在偏好概率里自杀。** 把上式代回 BT 偏好概率 $$\sigma(r^+ - r^-)$$：两个 $$Z(x)$$ **相减抵消**：
$$p(y^+\succ y^-) = \sigma\!\left(\beta\log\frac{\pi^\*(y^+)}{\pi_{ref}(y^+)} - \beta\log\frac{\pi^\*(y^-)}{\pi_{ref}(y^-)}\right)$$
不可算的配分函数消失了——剩下的全是策略对数比。**把这个式子当损失（偏好数据的 NLL）= DPO**（[DPO损失](/ai-fa/explore/30-Formulas/DPO损失)）：绕过奖励模型，直接在策略上优化偏好。理解了这四步，DPO 不再是"神奇公式"而是"BT+玻尔兹曼+消元"的三步推论。

## 3. 为什么 AI 需要它

| 出现场景 | 用法 |
|---|---|
| [RLHF目标](/ai-fa/explore/30-Formulas/RLHF目标) | 奖励模型的训练损失 |
| [DPO损失](/ai-fa/explore/30-Formulas/DPO损失) | 闭式反推的起点 |
| [KTO损失](/ai-fa/explore/30-Formulas/KTO损失) | 部分继承（前景理论改写），见其对照表 |
| LLM-as-Judge | 成对比较评估的统计基础 |

## 4. 常见误区

- **误区**：BT 给出"绝对分数"——只对**差**敏感（分数整体平移不变），绝对值无意义
- **误区**：偏好概率 = 质量概率——是"被选中概率"，受提问方式影响
- **误区**：BT 假设传递性——模型形式上传递，人类偏好未必（非理性循环）

## 5. 自测

1. $$r_A = 3,\ r_B = 1$$ 的偏好概率？双分同 +5 后呢？（$$\sigma(2)\approx0.88$$；不变——平移不变）
2. 标注选了 A 但模型 $$r_A < r_B$$，损失长什么样？（$$-\log\sigma(\text{负数})$$：分差越负损失越爆炸——对数级惩罚押错方向）
3. DPO 推导中 $$Z(x)$$ 为什么能消？（偏好概率只用**分数差**，两项的 $$Z$$ 相减归零——配分函数与 y 无关）
4. BT 建不了"好多少"——哪个损失试图补这个洞？（KTO：前景理论的 gain/loss 非对称，见 [KTO损失](/ai-fa/explore/30-Formulas/KTO损失)）

## 6. 相关概念

- [KL散度](/ai-fa/explore/40-Concepts/KL散度)：RLHF 目标里的正则（与 BT 相遇处）
- [期望](/ai-fa/explore/40-Concepts/期望)：似然最大化
- [sigmoid函数](/ai-fa/explore/40-Concepts/sigmoid函数)：BT 偏好概率的函数载体
- [DPO损失](/ai-fa/explore/30-Formulas/DPO损失)：最重要的派生公式
