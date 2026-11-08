---
type: paper
title: "cuRoboV2-Fast: Fast Torque-Limited Collision-Free Motion Planning"
aliases: [cuRoboV2-Fast]
year: 2026
authors: [Balakumar Sundaralingam]
venue: arXiv 2026-11（NVIDIA）
arxiv: "2611.06913v1"
pdf: https://arxiv.org/pdf/2611.06913v1
line: 世界模型与JEPA
matrix_coords: [解析式GPU轨迹优化(非学习WM), B样条+可微逆动力学, 时间参数化TimeOpt, 机器人操作]
tags: [paper]
layer: 已精读（261107 处理段）
---
# cuRoboV2-Fast: Fast Torque-Limited Collision-Free Motion Planning


## 1. 一句话贡献
GPU 加速的运动规划器三件套——B 样条轨迹优化（更少迭代收敛）、可微逆动力学（负载变化免重编译）、TimeOpt 带状牛顿时间参数化（固定路径上采样式速度/加速度/加加速度/力矩约束下优化通过速度）——3kg 负载下 RTX 5090 平均规划 4.4ms，Jetson AGX Orin 上规划比 RTX 5090 上的 cuRoboV1+TOPPRA 还快，实机抓放周期 5.93s（较 cuRoboV2 缩短 34.6%）。

## 2. 核心贡献
- B 样条轨迹优化：同等收敛下初始迭代 25 vs 125 次（cuRoboV1 水平）；GPU 并行 RRT 做路线初始化（并行扩树+并行验边）。
- **TimeOpt**：固定路径上时间参数化，样条局部支撑→带状牛顿系统+原始-对偶预测校正求解；比均匀时间步细化再降平均运动时长 15.7%，100g 基准查询平均 0.28ms。
- 加速的机器人学计算+**可微逆动力学**：负载更新免重编译，力矩受限随载变化。
- 部署：双目相机 YAM 实机抓放周期 5.93s（−34.6% vs cuRoboV2）。

## 3. 方法概要
1. 并行 RRT 搜无碰路线 → 2. B 样条优化轨迹几何（碰撞+动力学约束下精化）→ 3. TimeOpt 在固定路径上优化通过速度剖面（采样式力矩/运动学约束）→ 4. 输出时间参数化轨迹直接执行。全程 GPU 并行（批查询+并行扫描插入）。

## 4. 核心公式（或核心数字与直觉）
- 刚体逆动力学：$\tau = M(q)\,\ddot{q} + C(q,\dot{q})\,\dot{q} + g(q)$
  - 直觉：由轨迹（$q,\dot q,\ddot q$）反算关节力矩——本文把它做成 GPU 可微实现，用于"轨迹→力矩约束"的梯度检查；与 RL 语境的 IDM（由状态转移**反推动作**）**撞词不撞义**：这里是解析力矩方程，不是学习式反推。
- 核心数字：4.4ms 平均规划（RTX 5090，3kg 负载）｜TimeOpt −15.7% 运动时长、0.28ms/查询｜实机周期 −34.6%。

## 5. 与前作/矩阵关系
- ← 前身：cuRoboV1/V2（NVIDIA 系工程链，Apache 2.0 开源）。
- ↔ **同日对照**：[[10-Papers/09-世界模型与JEPA/GPWM Modeling the World as 3D Particle Motion|GPWM]]（同为"机器人操作的规划"：本文=解析优化、结构先验全部来自物理方程；GPWM=学习式生成先验——两极对照，"先验从哪来"的展品）。

## 6. 影响后续
工程侧基准（实时操作规划延迟的新档位）；对库内价值=哨兵校准样本——"inverse dynamics"关键词在此语境下是控制工程词，非反推学习。

## 7. 读前须知
- 在线全文：https://arxiv.org/html/2611.06913v1
