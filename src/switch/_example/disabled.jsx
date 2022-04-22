import React from 'react';
import { Switch, Cell } from 'tdesign-mobile-react';

export default function () {
  return (
    <>
      <Cell title="开关开启禁用" note={<Switch defaultValue={true} disabled />}></Cell>
      <Cell title="开关关闭禁用" note={<Switch disabled />}></Cell>
      <Cell title="开关开启禁用" note={<Switch label={['描述信息', '描述信息']} defaultValue={true} disabled />}></Cell>
      <Cell title="开关关闭禁用" note={<Switch label={['描述信息', '描述信息']} disabled />}></Cell>
    </>
  );
}
