/* 发布审计器（B47 立法）：publish 后自动扫 dist，私有内容零容忍
 * 用法: node tools/audit_publish.js dist
 * 退出码 1 = 有泄漏/结构问题，禁止 git push
 */
const fs = require("fs");
const path = require("path");

const ROOT = process.argv[2] || "dist";
if (!fs.existsSync(ROOT)) {
  console.error("目标目录不存在: " + ROOT);
  process.exit(1);
}

const issues = [];
const warnings = [];

// ---- 1) 禁发布文件 ----
for (const f of [
  "70-Ideas", "80-Lessons", "CLAUDE.md", ".obsidian", ".claudian", "release",
  "attachments", "10-Papers/PDF", "MVP总体计划.md", "扩充计划-至300篇.md",
  "开源产品方案.md", "敌情终复查报告.md", "全景机会格图.md",
]) {
  if (fs.existsSync(path.join(ROOT, f))) issues.push("泄漏: 禁发布文件/目录 " + f);
}

// ---- 2) 私有内容关键词（只扫内容文件，跳过 tools/ 与 quartz-patch/）----
const patterns = [
  ["组内人名", /赵桉|周毅翔|徐柯楠/],
  ["私有目录", /70-Ideas|80-Lessons/],
  ["内部代号", /AutoDL|autodl|seetacloud|bjb1|diamond-archive|connect\.bjb1/],
  ["口令", /YNfvn|ssh -p 2\d{4}/],
  ["实验私有", /Boxing|boxing_[abcv]|E1实验|E1 实验|distill_Boxing/],
  ["内部流程", /批次报告|敌方核查|敌情报告|B1\d#\d|B\d\d 报告/],
  ["内部工具", /CLAUDE\.md|Claudian/],
  ["红线标记", /竞品红线|组内.{0,6}竞品/],
  ["投稿信息", /ICML 2027 一作|一作已锁定/],
];

let scanned = 0;
(function collect(dir) {
  for (const name of fs.readdirSync(dir)) {
    if (name.startsWith(".")) continue;
    const abs = path.join(dir, name);
    const rel = path.relative(ROOT, abs);
    if (fs.statSync(abs).isDirectory()) {
      if (rel.startsWith("tools") || rel.startsWith("quartz-patch")) continue;
      collect(abs);
    } else if (/\.(md|canvas|yml)$/.test(name)) {
      scanned++;
      const text = fs.readFileSync(abs, "utf8");
      for (const [label, re] of patterns) {
        const m = text.match(re);
        if (m) {
          const line = text.slice(0, m.index).split("\n").length;
          issues.push(`[${label}] ${rel}:${line} "${text.slice(Math.max(0, m.index - 10), m.index + 30).replace(/\n/g, " ")}"`);
        }
      }
    }
  }
})(ROOT);

// ---- 3) quartz-patch 完整性 ----
const patch = [
  "quartz-patch/quartz.config.ts", "quartz-patch/quartz.layout.ts", "quartz-patch/quartz/styles/custom.scss",
  "quartz-patch/quartz/components/GraphPanel.tsx", "quartz-patch/quartz/components/index.ts",
  "quartz-patch/quartz/components/scripts/spa.inline.ts", "quartz-patch/quartz/components/scripts/graph.inline.ts",
  "quartz-patch/quartz/components/scripts/graphpanel.inline.ts", "quartz-patch/quartz/components/styles/graphpanel.scss",
];
const missing = patch.filter((p) => !fs.existsSync(path.join(ROOT, p)));
if (missing.length) issues.push("quartz-patch 缺: " + missing.join(", "));

// ---- 4) 计数核对（递归求和）----
function countMd(dir) {
  let n = 0;
  for (const name of fs.readdirSync(dir)) {
    if (name.startsWith(".")) continue;
    const abs = path.join(dir, name);
    if (fs.statSync(abs).isDirectory()) n += countMd(abs);
    else if (name.endsWith(".md")) n++;
  }
  return n;
}
for (const [dir, expect] of [["10-Papers", 308], ["20-Algorithms", 18], ["30-Formulas", 62], ["40-Concepts", 45], ["60-Matrices", 13]]) {
  const got = countMd(path.join(ROOT, dir));
  if (got !== expect) warnings.push(`计数: ${dir}=${got}（惯例 ${expect}，若库扩充请更新本表）`);
}

// ---- 汇总 ----
console.log(`审计 ${scanned} 个内容文件 + patch 完整性 + 计数`);
if (issues.length) {
  console.log("❌ 禁推（" + issues.length + " 处）：");
  issues.forEach((x) => console.log("  " + x));
  process.exit(1);
}
console.log("✅ 审计通过" + (warnings.length ? "（提醒: " + warnings.join("; ") + "）" : ""));
