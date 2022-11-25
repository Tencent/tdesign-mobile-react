import React from 'react';
import { Badge, CellGroup, Cell } from 'tdesign-mobile-react';

export default function BadgeCellDemo() {
  return (
    <div className="tdesign-mobile-demo" style={{ paddingTop: 10 }}>
      <CellGroup style={{ overflow: 'hidden' }}>
        <Cell title="单行标题" arrow note={<Badge dot />}></Cell>
        <Cell title="单行标题" arrow note={<Badge count={16} />}></Cell>
        <Cell
          title="单行标题"
          arrow
          note={
            <>
              <Badge count="NEW" shape="round" />
              <Badge count="NEW" style={{ marginLeft: '8px' }} />
            </>
          }
        ></Cell>
        <Cell title="单行标题" note={<Badge count="NEW" shape="ribbon" />}></Cell>
      </CellGroup>
    </div>
  );
}
