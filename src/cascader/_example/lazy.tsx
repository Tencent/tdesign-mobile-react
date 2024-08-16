import cloneDeep from 'lodash/cloneDeep';
import React, { useState } from 'react';
import { Icon } from 'tdesign-icons-react';
import { Cascader, Cell, Toast } from 'tdesign-mobile-react';
import './style/index.less';

export default function LazyDemo() {
  const [visible, setVisible] = useState(false);

  const [data, setData] = useState([
    {
      label: '深圳市',
      value: '440300',
      children: [],
    },
  ]);

  const [note, setNote] = useState('请选择地址');

  const [value, setValue] = useState<string | number | undefined>();

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
        options={data}
        onChange={(value, selectedOptions) => {
          setNote((selectedOptions as any).map((item) => item.label).join('/') || '');
          setValue(value);
        }}
        onClose={() => {
          setVisible(false);
        }}
        onPick={(value) => {
          if (value !== '440300') {
            return;
          }
          const newData = cloneDeep(data);
          const target = newData.find((item) => item.value === value);
          if (!target || target.children.length) {
            return;
          }
          const toast = Toast({
            icon: <Icon name="loading" size="24" />,
            message: '加载中...',
            direction: 'column',
            placement: 'middle',
            duration: 10000,
            preventScrollThrough: true,
          });

          setTimeout(() => {
            target.children = [
              { value: '440304', label: '福田区' },
              { value: '440303', label: '罗湖区' },
              { value: '440305', label: '南山区' },
              { value: '440306', label: '宝安区' },
              { value: '440307', label: '龙岗区' },
              { value: '440308', label: '盐田区' },
              { value: '440309', label: '龙华区' },
              { value: '440310', label: '坪山区' },
              { value: '440311', label: '光明区' },
            ];
            setData(newData);
            toast.destroy();
          }, 1000);
        }}
      />
    </>
  );
}
