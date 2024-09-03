import React from 'react';
import { Checkbox } from 'tdesign-mobile-react';

export default function () {
  return (
    <Checkbox.Group
      defaultValue={['1', '2']}
      className="theme-card"
      options={[
        { label: '多选', value: '1' },
        { label: '多选', value: '2' },
        {
          label: '多选标题多行多选标题多行多选标题多行多选标题多行多选标题多行多选标题',
          value: '3',
          maxLabelRow: 2,
        },
      ]}
    ></Checkbox.Group>
  );
}
