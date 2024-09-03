import React from 'react';
import { Checkbox } from 'tdesign-mobile-react';

export default function () {
  return (
    <Checkbox.Group
      defaultValue={[1, 2, 3]}
      options={[
        { label: '全选', checkAll: true },
        { label: '多选', value: 1 },
        { label: '多选', value: 2 },
        {
          label: '多选',
          value: 3,
          content: '单选描述信息单选描述信息单选描述信息单选描述信息单选描述信息单选描述信息单选描述信息',
        },
      ]}
    ></Checkbox.Group>
  );
}
