// AtlasApp.jsx — 图谱工作台壳：双网络切换（260923 用户令：论文谱系 / 数学实体 分图）
// 数学网络=默认（主图谱）；论文网络=10-Papers 谱系。QuartzGraph 以 key=mode 重建仿真。
import React, { useState } from 'react';
import QuartzGraph from './QuartzGraph.jsx';

const MODES = [
  ['math', '数学网络', '公式 · 概念 · 算法 · 矩阵之间的数学连接'],
  ['papers', '论文网络', '论文卡之间的谱系关系（前身/后继/对偶）'],
];

export default function AtlasApp() {
  const [mode, setMode] = useState('math');
  const desc = MODES.find(m => m[0] === mode)[2];
  return (
    <div className="qg-app">
      <div className="qg-bar">
        <span className="qg-title">知识图谱</span>
        <span className="qg-modes">
          {MODES.map(([m, label]) => (
            <button key={m} className={mode === m ? 'on' : ''} onClick={() => setMode(m)}>{label}</button>
          ))}
        </span>
        <span className="qg-hint">{desc} · 滚轮缩放 · 拖动节点 · 点击进入 · <i className="dot-teal"></i> 已读 <i className="dot-gray"></i> 未读</span>
      </div>
      <div className="qg-stage">
        <QuartzGraph key={mode} mode={mode} />
      </div>
    </div>
  );
}
