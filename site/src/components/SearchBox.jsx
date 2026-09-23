// SearchBox.jsx — Quartz 搜索复刻版（260916）：即时下拉+标题/内容匹配+片段预览
// +↑↓键盘导航+Enter 跳转+Esc 关+Ctrl+K 全局聚焦。数据=contentIndex.json（与图谱同源）
import React, { useEffect, useMemo, useRef, useState } from 'react';

export default function SearchBox() {
  const [index, setIndex] = useState(null);
  const [q, setQ] = useState('');
  const [open, setOpen] = useState(false);
  const [cur, setCur] = useState(0);
  const inputRef = useRef(null);
  const boxRef = useRef(null);

  useEffect(() => {
    fetch(`${import.meta.env.BASE_URL}static/contentIndex.json`).then(r => r.json()).then(setIndex).catch(() => {});
    const onKey = (e) => { if (e.key === 'k' && (e.ctrlKey || e.metaKey) && !e.shiftKey) { e.preventDefault(); inputRef.current?.focus(); } };
    const onClick = (e) => { if (boxRef.current && !boxRef.current.contains(e.target)) setOpen(false); };
    window.addEventListener('keydown', onKey);
    window.addEventListener('click', onClick);
    return () => { window.removeEventListener('keydown', onKey); window.removeEventListener('click', onClick); };
  }, []);

  const results = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s || !index) return [];
    const out = [];
    for (const [slug, e] of Object.entries(index)) {
      const title = e.title || slug.split('/').pop();
      const tl = title.toLowerCase();
      let score = -1, snippet = '';
      if (tl.startsWith(s)) score = 100;
      else if (tl.includes(s)) score = 70;
      else if (slug.toLowerCase().includes(s)) score = 40;
      else {
        const ci = (e.content || '').toLowerCase().indexOf(s);
        if (ci >= 0) {
          score = 20;
          snippet = (e.content || '').slice(Math.max(0, ci - 20), ci + 50).replace(/\s+/g, ' ');
        }
      }
      if (score > 0) out.push({ slug, title, snippet, href: (e.filePath || slug + '.md').replace(/\.md$/, ''), score: score + Math.min(15, ((e.links || []).length)) });
    }
    return out.sort((a, b) => b.score - a.score).slice(0, 9);
  }, [q, index]);

  function go(href) { window.location.href = `${import.meta.env.BASE_URL}explore/` + href; }
  function onKeydown(e) {
    if (e.key === 'ArrowDown') { e.preventDefault(); setCur(c => Math.min(c + 1, results.length - 1)); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); setCur(c => Math.max(c - 1, 0)); }
    else if (e.key === 'Enter' && results[cur]) { e.preventDefault(); go(results[cur].href); }
    else if (e.key === 'Escape') { setOpen(false); inputRef.current?.blur(); }
  }

  return (
    <div className="sbox" ref={boxRef}>
      <input ref={inputRef} value={q}
        onChange={e => { setQ(e.target.value); setCur(0); setOpen(true); }}
        onFocus={() => setOpen(true)}
        onKeyDown={onKeydown}
        placeholder="搜索全库" aria-label="搜索" />
      {open && q.trim() && (
        <ul className="sdrops">
          {results.length === 0 && <li className="snone">无匹配</li>}
          {results.map((r, i) => (
            <li key={r.slug} className={i === cur ? 'son' : ''}
              onMouseEnter={() => setCur(i)}
              onMouseDown={(e) => { e.preventDefault(); go(r.href); }}>
              <span className="stitle">{r.title}</span>
              {r.snippet && <span className="ssnip">…{r.snippet}…</span>}
              <span className="spath">{r.slug.split('/').slice(0, 2).join(' › ')}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
