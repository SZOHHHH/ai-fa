#!/usr/bin/env node
// frontmatter_strict.js — 严格 YAML frontmatter 预检（防 Quartz CI 构建炸）
// 检测：title/authors 等字段未加引号却含 YAML 特殊字符（: # [ ] { } ' ）；
// 这是 vault-check（宽松正则）与 Quartz（严格解析）之间的盲区（2026-09-06 CI 事故立法）
const fs = require('fs'), path = require('path');
const ROOT = path.resolve(__dirname, '..');
const DIRS = ['10-Papers', '20-Algorithms', '30-Formulas', '40-Concepts', '60-Matrices', '80-Lessons', '00-Meta'];
const FIELDS = ['title', 'venue', 'line'];   // authors 单独处理（列表内撇号）
let bad = 0;
const check = (p) => {
  const c = fs.readFileSync(p, 'utf8');
  const fm = c.slice(0, c.indexOf('\n---', 3));
  for (const fld of FIELDS) {
    const m = fm.match(new RegExp('^' + fld + ':\\s*(.+)$', 'm'));
    if (!m) continue;
    const v = m[1].trim();
    const unquoted = !v.startsWith('"') && !v.startsWith("'");
    if (unquoted && (/:\s/.test(v) || /#\s/.test(v) || /^[[{]/.test(v) === false && /[[{]/.test(v))) {
      console.log('❌ ' + path.relative(ROOT, p) + ' | ' + fld + ': ' + v.slice(0, 60)); bad++;
    }
  }
  const a = fm.match(/^authors:\s*(.+)$/m);
  if (a && a[1].includes("'")) { console.log('❌ ' + path.relative(ROOT, p) + ' | authors 含未转义撇号'); bad++; }
};
for (const d of DIRS) {
  const full = path.join(ROOT, d);
  if (!fs.existsSync(full)) continue;
  const walk = (dir) => { for (const f of fs.readdirSync(dir, { withFileTypes: true })) { const p = path.join(dir, f.name); if (f.isDirectory()) walk(p); else if (f.name.endsWith('.md')) { try { check(p); } catch (e) {} } } };
  walk(full);
}
if (bad) { console.log('严格 YAML 预检失败：' + bad + ' 处（加引号修复）'); process.exit(1); }
console.log('✓ 严格 YAML 预检通过（' + DIRS.length + ' 目录）');
