import React from 'react';
import BaseDemo from './base';
import TextDemo from './text';
import AllowHalfDemo from './allow-half';
import CountDemo from './count';
import SizeDemo from './size';
import DisabledDemo from './disabled';
import ColorDemo from './color';

export default function RadioDemo() {
  return (
    <div className="tdesign-mobile-demo">
      <BaseDemo />
      <TextDemo />
      <SizeDemo />
      <CountDemo />
      <AllowHalfDemo />
      <DisabledDemo />
      <ColorDemo />
    </div>
  );
}
