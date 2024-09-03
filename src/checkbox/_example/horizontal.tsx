import React from 'react';
import { Checkbox } from 'tdesign-mobile-react';

export default function () {
  return (
    <Checkbox.Group defaultValue={['0', '1']} className="box">
      <Checkbox block={false} borderless label="多选标题" value="0" />
      <Checkbox block={false} borderless label="多选标题" value="1" />
      <Checkbox block={false} borderless label="上限四字" value="2" />
    </Checkbox.Group>
  );
}
