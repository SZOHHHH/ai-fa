# AI Formula Atlas

**以公式链路为骨架的 AI 算法知识网络**——每篇论文都从数学根基讲起：公式优先、直觉先行、可验证。

[![Online Site](https://img.shields.io/badge/online-site-8A2BE2)](https://szohhhh.github.io/ai-fa/) [![CI](https://github.com/SZOHHHH/ai-fa/actions/workflows/check.yml/badge.svg)](https://github.com/SZOHHHH/ai-fa/actions) [![License: CC BY-NC 4.0](https://img.shields.io/badge/content-CC_BY--NC_4.0-blue)](./LICENSE-CONTENT) [![License: MIT](https://img.shields.io/badge/code-MIT-yellow)](./LICENSE-CODE)

**🌐 在线浏览（无需安装 Obsidian）**：https://szohhhh.github.io/ai-fa/ —— 站点随本仓库 push 自动重建。

## 这是什么

一个以**数学公式与推导**为主导的 Obsidian 知识库：307 张论文卡（覆盖 10 条研究主线）+ 17 个算法实体 + 61 个公式实体 + 44 个概念实体 + 12 张研究矩阵，构成四类实体交叉的双网络（论文演化网 + 数学公式网）。

## 核心创新点

1. **公式优先**：每张论文卡核心是"核心公式 + 逐项直觉解释"，不是摘要罗列。统一记号规范（t∈[0,1]、x₀/z/ε_θ/v_θ…），非主流论文符号用对照表换算
2. **可验证**：`node tools/check_links.js` 保证 0 红链、frontmatter 类型正确——CI 红链即构建失败
3. **两层收录**：奠基层（范式论文）+ 占位层（热点方向占位者，82 张）——既是学习库也是研究方向雷达；**全部卡片统一七节结构**（一句话贡献/核心贡献/方法概要/核心公式/与前作矩阵关系/影响后续/读前须知）

## 快速开始

```bash
git clone https://github.com/<you>/ai-fa.git
# 用 Obsidian 打开仓库根目录作为 vault
node tools/check_links.js   # 验证库完整性
```

## 目录结构

| 目录 | 内容 |
|---|---|
| `10-Papers/` | 307 张论文卡（10 条研究线；`layer: 占位` = 占位层卡） |
| `20-Algorithms/` | 17 个算法族实体（本命论文群） |
| `30-Formulas/` | 61 个数学公式实体（标准形式+表示对照表+直觉） |
| `40-Concepts/` | 44 个概念实体（直觉先行） |
| `60-Matrices/` | 12 张研究矩阵（方向×机制 格点图） |
| `50-Canvas/` | 11 张族谱 Canvas（`tools/gen_canvas.js` 再生成） |
| `00-Meta/` | 治理文档：记号规范 / 模板与建模指南 / 研究矩阵规范 / 论文来源策略 |
| `tools/` | check_links（红链校验）/ gen_canvas（Canvas 生成） |
| `.github/` | CI：push 时自动跑红链校验 |

> PDF 全文不入库（版权）；卡片 frontmatter 的 `arxiv` 字段直达原文。

## License

- **内容**：[CC BY-NC 4.0](./LICENSE-CONTENT)（禁止商用，转载署名）
- **代码**：[MIT](./LICENSE-CODE)
