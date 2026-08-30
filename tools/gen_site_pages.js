/* 生成站点板块导航页：为 dist 顶层目录写 index.md（中文标题 + 简介 + 全量清单）
 * 用法: node tools/gen_site_pages.js dist
 * 特性:
 *  - 10-Papers 按子目录（研究主线）分组列出全部论文卡
 *  - 其余板块平铺/分组自适应；显示名优先 frontmatter aliases[0]，退 title，退文件名
 *  - wikilink 一律用 dist 相对全路径（markdownLinkResolution: shortest 下最稳）
 * 注意: 生成的 index.md 是 dist 侧产物（不回流 vault），每次 publish 重新生成。
 */
const fs = require("fs");
const path = require("path");

const ROOT = process.argv[2] || "dist";
if (!fs.existsSync(ROOT)) {
  console.error("目标目录不存在: " + ROOT);
  process.exit(1);
}

const SECTIONS = [
  {
    dir: "10-Papers",
    title: "论文 Papers",
    blurb:
      "307 张论文卡 · 10 条研究主线。每张卡七节结构，核心是「核心公式 + 逐项直觉解释」——公式看不懂时，点进它链接的公式/概念卡就是零基础解释。",
  },
  {
    dir: "20-Algorithms",
    title: "算法 Algorithms",
    blurb:
      "算法族实体：把数学公式组装成可运行步骤的「菜谱」。每个算法卡说明流程、复杂度、与组成公式的关系。",
  },
  {
    dir: "30-Formulas",
    title: "公式 Formulas",
    blurb:
      "数学对象实体：定义、推导、直觉解释、被哪些论文使用。论文卡里的每个核心公式在这里都有独立身份。",
  },
  {
    dir: "40-Concepts",
    title: "概念 Concepts",
    blurb:
      "术语与观念实体：on-policy、模式坍塌、去噪……论文里看不懂的词，来这里查零基础解释。",
  },
  {
    dir: "60-Matrices",
    title: "研究矩阵 Matrices",
    blurb:
      "多维研究版图：每格一篇代表作。看方向之间的相邻、对偶与空白——既是导航，也是选题雷达。",
  },
  {
    dir: "00-Meta",
    title: "规范与设置",
    blurb:
      "知识库的底层治理文档：记号规范、矩阵规范、建模指南、论文来源策略。日常浏览可忽略本节。",
  },
];

// —— 解析 frontmatter 的 title 与 aliases[0]（卡片是我们生成的规范格式，逐行 regex 足够）——
function parseMeta(fullPath) {
  const text = fs.readFileSync(fullPath, "utf8");
  const fm = text.startsWith("---") ? text.slice(3, text.indexOf("\n---", 3)) : "";
  let title = null;
  let alias = null;
  const mT = fm.match(/^title:\s*(.+)$/m);
  if (mT) title = mT[1].trim().replace(/^["']|["']$/g, "");
  const mA = fm.match(/^aliases:\s*\[([^\]]*)\]/m);
  if (mA) {
    const first = mA[1].split(",")[0].trim().replace(/^["']|["']$/g, "");
    if (first) alias = first;
  }
  return { title, alias };
}

// 递归收集 md 文件（返回相对 dir 的路径，不含扩展名）
function collectMd(absDir, relDir) {
  const out = [];
  for (const name of fs.readdirSync(absDir).sort((a, b) => a.localeCompare(b, "zh-CN", { numeric: true }))) {
    if (name === "index.md" || name.startsWith(".")) continue;
    const abs = path.join(absDir, name);
    const rel = relDir ? relDir + "/" + name : name;
    if (fs.statSync(abs).isDirectory()) {
      out.push(...collectMd(abs, rel));
    } else if (name.endsWith(".md")) {
      out.push(rel.slice(0, -3));
    }
  }
  return out;
}

function renderList(entries, baseDir) {
  return entries
    .map((rel) => {
      const { title, alias } = parseMeta(path.join(ROOT, baseDir, rel + ".md"));
      const display = alias || title || rel.split("/").pop();
      return `- [[${baseDir}/${rel}|${display}]]`;
    })
    .join("\n");
}

let total = 0;
for (const sec of SECTIONS) {
  const absDir = path.join(ROOT, sec.dir);
  if (!fs.existsSync(absDir)) {
    console.log("SKIP（不存在）: " + sec.dir);
    continue;
  }
  // 分组：10-Papers 按一级子目录；其余若有一级子目录也分组，否则平铺
  const subDirs = fs
    .readdirSync(absDir)
    .filter((n) => fs.statSync(path.join(absDir, n)).isDirectory() && !n.startsWith("."))
    .sort((a, b) => a.localeCompare(b, "zh-CN", { numeric: true }));

  let body;
  const all = collectMd(absDir, "");
  total += all.length;
  if (subDirs.length > 0) {
    const parts = [];
    for (const sub of subDirs) {
      const entries = collectMd(path.join(absDir, sub), sub);
      if (entries.length === 0) continue;
      const label = sub.replace(/^\d+-/, "");
      parts.push(`### ${label}（${entries.length}）\n\n${renderList(entries, sec.dir)}`);
    }
    body = parts.join("\n\n");
  } else {
    body = renderList(all, sec.dir);
  }

  const md = `---\ntitle: "${sec.title}"\ndescription: "${sec.blurb.replace(/"/g, "”")}"\ntags: [section]\n---\n\n# ${sec.title}\n\n> ${sec.blurb}\n\n${body}\n`;
  fs.writeFileSync(path.join(absDir, "index.md"), md);
  console.log(`✓ ${sec.dir}/index.md（${all.length} 条目，${subDirs.length} 组）`);
}
console.log(`完成：${SECTIONS.length} 个板块，共 ${total} 条目`);
