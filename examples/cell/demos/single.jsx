import React from 'react';
import { Cell, CellGroup } from 'tdesign-mobile-react';

export default function () {
  return (
    <div className="tdesign-grid-base">
      <CellGroup>
        <Cell title="单行标题" />
        <Cell title="单行标题" required hover />
        <Cell title="单行标题" arrow note="辅助信息" />
        <Cell title="单行标题" arrow />
        <Cell title="单行标题" arrow note="辅助信息" />
        <Cell title="单行标题" arrow note="右侧badge" />
        <Cell title="单行标题" arrow note="右侧switch" />
        <Cell title="单行标题" arrow leftIcon="app" />
      </CellGroup>
    </div>
  );
}
