import React, { useState } from 'react';
import { ConfigProvider, Rate, Calendar, Cell } from 'tdesign-mobile-react';
import { merge } from 'lodash-es';
import enConfig from 'tdesign-mobile-react/es/locale/en_US';

export default function OtherEn() {
  // 全局特性配置，可以引入英文默认配置 enConfig，还可以在默认配置的基础上进行自定义配置
  const globalConfig = merge(enConfig, {});

  const [rateValue, setRateValue] = useState(3);
  const [dataNote, setDataNote] = useState('');
  const [visible, setVisible] = useState(false);

  const format = (val: Date) => {
    const date = new Date(val);
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
  };

  const handleConfirm = (val: Date) => {
    console.log(val);
    setDataNote(format(val));
    setVisible(false);
  };

  const handleSelect = (val: Date) => {
    console.log(val);
  };

  const onClose = (trigger: string) => {
    setVisible(false);
    console.log('closed by', trigger);
  };

  return (
    <ConfigProvider globalConfig={globalConfig}>
      <div className="rate-demo-cell rate-demo-cell--space">
        <div className="rate-demo-cell__label">Rating</div>
        <Rate
          value={rateValue}
          showText={true}
          onChange={(value) => {
            setRateValue(value);
          }}
        />
      </div>
      <Calendar visible={visible} onConfirm={handleConfirm} onSelect={handleSelect} onClose={onClose}></Calendar>
      <Cell title="Single select date" arrow note={dataNote} onClick={() => setVisible(true)}></Cell>
    </ConfigProvider>
  );
}
