import React from 'react';
import { Checkbox } from 'tdesign-mobile-react/checkbox';

export default function () {
  return (
    <Checkbox.Group defaultValue={['1', '2']}>
      <Checkbox label="多选" align="right" value="0" />
      <Checkbox label="多选" align="right" value="1" />
      <Checkbox label="多选" align="right" value="2" />
      <Checkbox
        label="多选多选多选多选多选多选多选多选多选多选多选多选多选多选多选多选多选多选多选"
        align="right"
        value="3"
        maxLabelRow={1}
      />
    </Checkbox.Group>
  );
}
