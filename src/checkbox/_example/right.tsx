import React from 'react';
import { Checkbox } from 'tdesign-mobile-react';

export default function () {
  return (
    <>
      <Checkbox label="多选" value="0" defaultChecked />
      <div style={{ height: '16px' }} />
      <Checkbox label="多选" value="1" placement="right" defaultChecked />
    </>
  );
}
