---
type: meta
title: "AI Formula Atlas"
tags: [home]
---

# AI 公式图谱 · AI Formula Atlas

> **给数学基础薄弱、想进入算法领域的学习者的 AI 论文知识网络**——公式优先、直觉先行、可验证。

一个以**数学公式与推导**为主导的知识库：**307 张论文卡**（10 条研究主线）+ **61 个公式实体** + **44 个概念实体** + **17 个算法族** + **12 张研究矩阵**，构成双网络（论文演化网 × 数学公式网）。

## 三件别人没做的事

1. **公式优先** 🧮：每张论文卡核心是"核心公式 + 逐项直觉解释"，不是摘要罗列；统一记号规范，非主流符号有对照表换算——看不懂某个公式，点开它链接的公式/概念卡就是零基础解释
2. **可验证** ✅：`node tools/check_links.js` 保证 0 红链、frontmatter 类型正确——CI 中红链即构建失败，库本身是质量工程的示范
3. **两层收录** 🗺️：奠基层（范式论文）+ 占位层（方向占位者）——既是学习库，也是 AI 算法研究方向的雷达

## 怎么逛

- **左侧目录树**：`10-Papers`（按 10 条研究线分目录）/ `30-Formulas`（公式）/ `40-Concepts`（概念）/ `60-Matrices`（研究矩阵）
- **右侧图谱**（Graph view）：看任意一页的双链网络——这正是本库的灵魂
- **搜索**（Ctrl+K）：中文全文检索
- **从 flagship 页开始**：[[10-Papers/01-架构演进/Attention Is All You Need（Transformer）|Transformer]] · [[10-Papers/02-生成建模与扩散/Denoising Diffusion Probabilistic Models（DDPM）|DDPM]] · [[10-Papers/09-世界模型与JEPA/Diffusion for World Modeling- Visual Details Matter in Atari（DIAMOND）|DIAMOND]] · [[60-Matrices/世界模型矩阵|世界模型矩阵]]

## 想要 Obsidian 完整版？

本站由开源仓库 [SZOHHHH/ai-fa](https://github.com/SZOHHHH/ai-fa) 自动构建——clone 后用 Obsidian 打开仓库根目录即得可编辑版本（含贡献规范与验收工具链）。PDF 全文不入库（版权），卡片 frontmatter 的 `arxiv` 字段直达原文。

## License

- 内容：[CC BY-NC 4.0](./LICENSE-CONTENT)（禁商用，转载署名）
- 代码：[MIT](./LICENSE-CODE)
