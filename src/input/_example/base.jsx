import React, { useState } from 'react';
import { Input } from 'tdesign-mobile-react/input';
import { Button } from 'tdesign-mobile-react/button';
import { InfoCircleFilledIcon } from 'tdesign-icons-react';
import TDemoBlock from '../../../site/mobile/components/DemoBlock';
import TDemoHeader from '../../../site/mobile/components/DemoHeader';

export default function Base() {
  const [value1, setValue1] = useState('');
  const [value2, setValue2] = useState('');
  const [value3, setValue3] = useState('');
  const [value4, setValue4] = useState('');
  const [value5, setValue5] = useState('');
  const [value6, setValue6] = useState('');
  const [value7, setValue7] = useState('请输入文字');
  const [value8, setValue8] = useState('请输入文字');
  const [value9, setValue9] = useState('不可编辑的内容');
  const [value10, setValue10] = useState('12132131');
  const [value11, setValue11] = useState('');
  const [value12, setValue12] = useState('');
  const [value13, setValue13] = useState('');
  const [value14, setValue14] = useState('');
  const [value15, setValue15] = useState('');
  const [value16, setValue16] = useState('');

  return (
    <>
      <TDemoHeader title="Input 输入框" summary="空状态时的占位提示。" />

      <TDemoBlock title="01 类型" summary="基础文本框">
        <Input
          label={'标签文字'}
          placeholder="请输入文字"
          value={value1}
          onChange={(value) => {
            setValue1(value);
          }}
        />
      </TDemoBlock>

      <TDemoBlock summary="必填、选填文本框">
        <Input
          label={'标签文字'}
          placeholder="请输入文字"
          required={true}
          value={value2}
          onChange={(value) => {
            setValue2(value);
          }}
        />
        <Input
          label={'标签文字'}
          placeholder="请输入文字（选填）"
          value={value3}
          onChange={(value) => {
            setValue3(value);
          }}
        />
      </TDemoBlock>

      <TDemoBlock summary="无标题文本框">
        <Input
          placeholder="请输入文字"
          value={value4}
          onChange={(value) => {
            setValue4(value);
          }}
        />
      </TDemoBlock>

      <TDemoBlock summary="带提示信息文本框">
        <Input
          label={'标准五个字'}
          placeholder="请输入文字"
          suffixIcon={<InfoCircleFilledIcon />}
          value={value5}
          onChange={(value) => {
            setValue5(value);
          }}
        />
      </TDemoBlock>

      <TDemoBlock summary="长标题文本框">
        <Input
          label={'超长需换行的标签'}
          placeholder="预设文本"
          suffixIcon={<InfoCircleFilledIcon />}
          value={value6}
          onChange={(value) => {
            setValue6(value);
          }}
        />
      </TDemoBlock>

      <TDemoBlock title="02 状态" summary="文本框状态">
        <Input
          label={'标签文字'}
          placeholder="请输入文字"
          value={value7}
          onChange={(value) => {
            setValue7(value);
          }}
        />
        <Input
          label={'填写错误'}
          placeholder="请输入文字"
          errorMessage="提示信息"
          value={value8}
          onChange={(value) => {
            setValue8(value);
          }}
        />
        <Input
          label={'不可编辑'}
          placeholder="请输入文字"
          readonly={true}
          value={value9}
          onChange={(value) => {
            setValue9(value);
          }}
        />
      </TDemoBlock>

      <TDemoBlock title="03 特殊类型" summary="特殊文本框类型">
        <Input
          label={'密码'}
          placeholder="请输入文字"
          type="password"
          clearable={true}
          value={value10}
          onChange={(value) => {
            setValue10(value);
          }}
        />
        <Input
          label={'验证码'}
          placeholder="输入验证码"
          suffix="XYDZ"
          value={value11}
          onChange={(value) => {
            setValue11(value);
          }}
        />
        <Input
          placeholder="请输入手机号码"
          suffix={
            <Button theme="primary" variant="text" size="small">
              发送验证码
            </Button>
          }
          value={value12}
          onChange={(value) => {
            setValue12(value);
          }}
        />
        <Input
          label={'价格'}
          placeholder="0.00"
          suffix="元"
          align="right"
          value={value13}
          onChange={(value) => {
            setValue13(value);
          }}
        />
        <Input
          label={'个数'}
          placeholder="请输入个数"
          suffix="个"
          align="right"
          value={value14}
          onChange={(value) => {
            setValue14(value);
          }}
        />
      </TDemoBlock>

      <TDemoBlock title="04 字数限制" summary="文本框字数限制">
        <Input
          placeholder="最大输入10个字符"
          maxlength={10}
          value={value15}
          onChange={(value) => {
            setValue15(value);
          }}
        />
        <Input
          placeholder="最大输入10个字符，汉字算两个"
          maxcharacter={10}
          value={value16}
          onChange={(value) => {
            setValue16(value);
          }}
        />
      </TDemoBlock>
    </>
  );
}
