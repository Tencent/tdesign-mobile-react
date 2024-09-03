import React from 'react';
import { Checkbox } from 'tdesign-mobile-react';

export default function () {
  return (
    <Checkbox.Group defaultValue={['checkbox1']} disabled>
      <Checkbox value="checkbox1" label="选项禁用-已选" />
      <Checkbox value="checkbox2" label="选项禁用-默认" />
    </Checkbox.Group>
  );
}
