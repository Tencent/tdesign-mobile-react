import React from 'react';
import { Skeleton } from 'tdesign-mobile-react';
import './style/index.less';

const rowCols = [{ size: '163.5px', borderRadius: '12px' }, 1, { width: '61%' }];

export default function ImageGroupSkeleton() {
  return (
    <>
      <div className="image-group">
        <Skeleton rowCol={rowCols} loading={true} />
        <Skeleton rowCol={rowCols} loading={true} />
      </div>
    </>
  );
}
