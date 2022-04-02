import { Switch, Cell } from 'tdesign-mobile-react';

export default function () {
  return (
    <>
      <Cell title="开关" note={<Switch />}></Cell>
      <Cell title="开关" note={<Switch defaultValue={true} />}></Cell>
      <Cell title="自定义颜色" note={<Switch defaultValue colors={['green', 'gray']} />}></Cell>
    </>
  );
}
