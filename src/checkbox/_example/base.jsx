import React from 'react';
import { Checkbox } from '../index';

export default function () {
  return (
    <Checkbox.Group defaultValue={['1', '2']}>
      <Checkbox label="多选" value="0" />
      <Checkbox label="多选" value="1" />
      <Checkbox label="多选" value="2" />
      <Checkbox
        value="3"
        maxLabelRow={2}
        label="多选多选多选多选多选多选多选多选多选多选多选多选多选多选多选多选多选多选多选多选多选多选多选多选多选多选多选多选多选多选多选多选"
      />
      <Checkbox
        value="4"
        label="多选"
        maxContentRow={2}
        content="多选多选多选多选多选多选多选多选多选多选多选多选多选多选多选多选多选多选多选多选多选多选多选多选多选多选多选多选多选多选多选多选"
      />
    </Checkbox.Group>
  );
}
