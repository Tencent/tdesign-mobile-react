import React from 'react';
import { Icon } from 'tdesign-icons-react';
import { Radio } from 'tdesign-mobile-react/radio';

export default function () {
  const ICON1 = <Icon className="t-icon" name="notification-filled" />;
  const ICON2 = <Icon className="t-icon" name="notification" />;
  return (
    <>
      <Radio>单选</Radio>
      <div>-------------------------------------</div>
      <Radio>
        单选单选单选单选单选单选单选单选单选单选单选单选单选单选单选单选单选单选单选单选单选单选单选单选单选单选单选单选选单选单选单选单选单选单选单选选单选单选单选单选单选单选单选
      </Radio>
      <div>-------------------------------------</div>
      <Radio disabled>
        单选单选单选单选单选单选单选单选单选单选单选单选单选单选单选单选单选单选单选单选单选单选单选单选单选单选单选单选选单选单选单选单选单选单选单选选单选单选单选单选单选单选单选
      </Radio>
      <div>-------------------------------------</div>
      <Radio contentDisabled>内容区域不可点击</Radio>
      <div>-------------------------------------</div>
      <Radio allowUncheck>可取消选择</Radio>
      <div>-------------------------------------</div>
      <Radio checked>直接被选中</Radio>
      <div>-------------------------------------</div>
      <Radio content={<p style={{ color: 'red' }}>自定义内容</p>}></Radio>
      <div>-------------------------------------</div>
      <Radio icon="stroke-line">stroke line</Radio>
      <div>-------------------------------------</div>
      <Radio icon={[ICON1, ICON2]}>自定义图标</Radio>
      <div>-------------------------------------</div>
      <Radio align="right">右侧选择</Radio>
      <div>-------------------------------------</div>
    </>
  );
}
