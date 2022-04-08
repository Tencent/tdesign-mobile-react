import React from 'react';
import { Switch, Cell } from 'tdesign-mobile-react';

export default function () {
  return (
    <>
      <Cell title="开关" note={<Switch label={['描述信息', '描述信息']} />}></Cell>
      <Cell
        title="开关"
        note={<Switch defaultValue={true} label={({ value }) => (value ? '描述信息' : '描述信息')} />}
      ></Cell>
      <Cell
        title="自定义颜色"
        note={
          <Switch defaultValue label={({ value }) => (value ? '描述信息' : '描述信息')} colors={['green', 'gray']} />
        }
      ></Cell>
    </>
  );
}
