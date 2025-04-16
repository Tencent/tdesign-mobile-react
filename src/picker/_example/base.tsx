import React from 'react';
// import { NoticeBar } from 'tdesign-mobile-react';
import { Popup, Picker } from 'tdesign-mobile-react';

const cityOptions = () => [
  {
    label: '北京市',
    value: '北京市',
  },
  {
    label: '上海市',
    value: '上海市',
    disabled: true,
  },
  {
    label: '广州市',
    value: '广州市',
  },
  {
    label: '深圳市',
    value: '深圳市',
  },
  {
    label: '杭州市',
    value: '杭州市',
  },
  {
    label: '成都市',
    value: '成都市',
  },
  {
    label: '长沙市',
    value: '长沙市',
  },
];

export default function Base() {
  return (
    <Popup visible>
      <Picker columns={cityOptions()} />
    </Popup>
  );
}
