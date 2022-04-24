import React from 'react';
import { Skeleton } from 'tdesign-mobile-react';

export default function AvaterText() {
  const rowCols = [1, 1, 1, { width: '70%' }];
  return <Skeleton theme="avatar-text" rowCol={rowCols} />;
}
