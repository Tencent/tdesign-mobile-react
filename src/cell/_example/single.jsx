import React from 'react';
import { Cell, CellGroup, Badge } from 'tdesign-mobile-react';
import { Icon } from 'tdesign-icons-react';

export default function () {
  return (
    <div className="tdesign-grid-base">
      <CellGroup>
        <Cell title="单行标题" />
        <Cell title="单行标题" required hover />
        <Cell title="单行标题" note="辅助信息" />
        <Cell title="单行标题" arrow />
        <Cell title="单行标题" arrow note="辅助信息" />
        <Cell title="单行标题" arrow note={<Badge count={8} />} />
        <Cell title="单行标题" arrow note="右侧switch" />
        <Cell title="单行标题" leftIcon={<Icon name="app" />} />
      </CellGroup>
    </div>
  );
}
