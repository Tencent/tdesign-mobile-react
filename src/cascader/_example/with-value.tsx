import React, { useState } from 'react';

import { Cascader, Cell } from 'tdesign-mobile-react';
import './style/index.less';

const data = {
  areaList: [
    {
      label: '北京市',
      value: '110000',
      children: [
        {
          value: '110100',
          label: '北京市',
          children: [
            { value: '110101', label: '东城区' },
            { value: '110102', label: '西城区' },
            { value: '110105', label: '朝阳区' },
            { value: '110106', label: '丰台区' },
            { value: '110107', label: '石景山区' },
            { value: '110108', label: '海淀区' },
            { value: '110109', label: '门头沟区' },
            { value: '110111', label: '房山区' },
            { value: '110112', label: '通州区' },
            { value: '110113', label: '顺义区' },
            { value: '110114', label: '昌平区' },
            { value: '110115', label: '大兴区' },
            { value: '110116', label: '怀柔区' },
            { value: '110117', label: '平谷区' },
            { value: '110118', label: '密云区' },
            { value: '110119', label: '延庆区' },
          ],
        },
      ],
    },
    {
      label: '天津市',
      value: '120000',
      children: [
        {
          value: '120100',
          label: '天津市',
          children: [
            { value: '120101', label: '和平区' },
            { value: '120102', label: '河东区' },
            { value: '120103', label: '河西区' },
            { value: '120104', label: '南开区' },
            { value: '120105', label: '河北区' },
            { value: '120106', label: '红桥区' },
            { value: '120110', label: '东丽区' },
            { value: '120111', label: '西青区' },
            { value: '120112', label: '津南区' },
            { value: '120113', label: '北辰区' },
            { value: '120114', label: '武清区' },
            { value: '120115', label: '宝坻区' },
            { value: '120116', label: '滨海新区' },
            { value: '120117', label: '宁河区' },
            { value: '120118', label: '静海区' },
            { value: '120119', label: '蓟州区' },
          ],
        },
      ],
    },
  ],
};

export default function WithValueDemo() {
  const [visible, setVisible] = useState(false);

  const [note, setNote] = useState('请选择地址');

  const [value, setValue] = useState<string | number | undefined>('120119');

  return (
    <>
      <Cell
        title="地址"
        note={note}
        arrow
        onClick={() => {
          setVisible(true);
        }}
      />
      <Cascader
        title="选择地址"
        value={value}
        visible={visible}
        options={data.areaList}
        onChange={(value, selectedOptions) => {
          setNote((selectedOptions as any).map((item) => item.label).join('/') || '');
          setValue(value);
        }}
        onClose={() => {
          setVisible(false);
        }}
      />
    </>
  );
}
