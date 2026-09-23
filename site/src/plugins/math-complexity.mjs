// math-complexity.mjs — 公式复杂度分流插件（260916 用户令）
// 复杂行内公式（上下标/分式/算子/较长）从段落/列表项/引用块中**拆出为块级 math 节点**（独立行居中）；
// 单符号（x、v、\gamma、t+1、x_t）保持行内。remark-math 对段内 $$ 仍给 inline 语义——
// 故此处统一在 mdast 层重组：paragraph 遇复杂公式即切分，公式提升为父级块。
function mathComplexity() {
  const isComplex = (v) => {
    const s = (v || '').replace(/\s+/g, '');
    return s.length > 8
      || (/[\^_]/.test(s) && s.length > 4)
      || /\\(frac|dfrac|sum|int|prod|lim|mathbb|mathcal|mathbf|lVert|rVert|begin|hat|bar|overline)/.test(s);
  };
  const transform = (node) => {
    if (node.type === 'paragraph') {
      const out = [];
      let buf = [];
      const flush = () => { if (buf.length) { out.push({ type: 'paragraph', children: buf }); buf = []; } };
      for (const c of node.children || []) {
        if ((c.type === 'inlineMath' || c.type === 'math') && isComplex(c.value)) {
          flush();
          // 关键：公式内容必须经 data.hChildren 传递给 hast（remark-math 的机制）——
          // 只给 hName/hProperties 会生成空元素，rehype-katex 拿到空串 → 空白框
          const m = { ...c, type: 'math', data: {
            hName: 'div', hProperties: { className: ['math', 'math-display'] },
            hChildren: [{ type: 'text', value: c.value }],
          } };
          out.push(m);
        } else buf.push(c);
      }
      flush();
      return out;
    }
    if (node.children) {
      const next = [];
      for (const c of node.children) for (const r of transform(c)) next.push(r);
      node.children = next;
    }
    return [node];
  };
  return (tree) => { transform(tree); };
}
export default mathComplexity;
