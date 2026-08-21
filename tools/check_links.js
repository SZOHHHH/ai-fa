// 全库验收脚本：红链检查 + frontmatter 校验
// 用法: node 00-Meta/check_links.js
const fs = require('fs'), path = require('path');
const ROOT = path.resolve(__dirname, '..');
const files = [];
function walk(d) {
  for (const f of fs.readdirSync(d)) {
    if (f === 'dist') continue; // 发布副本不参与库级验收
    const p = path.join(d, f);
    const s = fs.statSync(p);
    if (s.isDirectory() && !f.startsWith('.')) walk(p);
    else if (f.endsWith('.md')) files.push(p);
  }
}
walk(ROOT);
const norm = p => p.split(path.sep).join('/');
const names = new Set(files.map(f => path.basename(f, '.md')));
const paths = new Set(files.map(f => norm(f)));
const bad = [], noFm = [], typeErr = [];
const wikiRe = /\[\[([^\]|#]+)(?:#[^\]|]*)?(?:\|(?:[^\]]*))?\]\]/g;
for (const f of files) {
  const t = fs.readFileSync(f, 'utf8');
  const m = t.match(/^---\n([\s\S]*?)\n---/);
  if (!m) { noFm.push(norm(f)); continue; }
  const ty = (m[1].match(/type:\s*(\w+)/) || [])[1];
  const p = norm(f);
  const expect = p.includes('/10-Papers/') ? 'paper' : p.includes('/20-Algorithms/') ? 'algo'
    : p.includes('/30-Formulas/') ? 'formula' : p.includes('/40-Concepts/') ? 'concept' : p.includes('/80-Lessons/') ? 'lesson' : p.includes('/60-Matrices/') ? 'matrix' : p.includes('/70-Ideas/') ? 'idea' : 'meta';
  if (ty !== expect) typeErr.push(p + ' got:' + ty + ' expect:' + expect);
  let mm; wikiRe.lastIndex = 0;
  while ((mm = wikiRe.exec(t))) {
    const target = mm[1].replace(/[\s\\]+$/, '').trim();
    if (target.startsWith('http') || target === '…' || target.includes('…')) continue;
    const ok = names.has(target)
      || (target.includes('/') && [...paths].some(p => p.endsWith('/' + target + '.md') || p === ROOT + '/' + target + '.md'));
    if (!ok) bad.push(norm(f).split('/').pop() + ' -> [[' + target + ']]');
  }
}
console.log('总 md 文件:', files.length);
console.log('缺 frontmatter:', noFm.length ? noFm.join(', ') : '无');
console.log('type 错配:', typeErr.length ? typeErr.join('\n  ') : '无 ✅');
console.log('红链数量:', bad.length);
bad.slice(0, 40).forEach(b => console.log('  ' + b));
