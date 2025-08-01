import React, { useEffect, useMemo, useRef } from 'react';
import { Button, Form, Input, Radio, RadioGroup, Rate, Stepper, Textarea } from 'tdesign-mobile-react';
import { BrowseOffIcon } from 'tdesign-icons-react';

const RATE_GAP = 8;
export default function HorizontalForm({ disabled }) {
  const formRef = useRef(null);
  const isInit = useRef(false);
  const rules = useMemo(
    () => ({
      name: [{ validator: (val: any) => val?.length === 8, message: '只能输入8个字符英文' }],
      password: [{ validator: (val: any) => val?.length > 6, message: '长度大于6个字符' }],
      gender: [{ validator: (val: any) => val !== '', message: '不能为空' }],
      birth: [{ validator: (val: any) => val !== '', message: '不能为空' }],
      place: [{ validator: (val: any) => val !== '', message: '不能为空' }],
      description: [{ validator: (val: any) => val > 3, message: '分数过低会影响整体评价' }],
      resume: [{ validator: (val: any) => val !== '', message: '不能为空' }],
    }),
    [],
  );

  useEffect(() => {
    if (isInit.current) {
      return;
    }
    formRef.current?.setValidateMessage(rules);
    isInit.current = true;
  }, [rules]);

  const onReset = () => {
    console.log('===onReset');
  };
  const onSubmit = (e: any) => {
    console.log('===onSubmit', e);
  };
  return (
    <Form
      ref={formRef}
      showErrorMessage
      resetType="initial"
      labelAlign="left"
      scrollToFirstError="auto"
      disabled={disabled}
      rules={rules}
      onReset={onReset}
      onSubmit={onSubmit}
      labelWidth="81px"
    >
      <Form.FormItem label="用户名" name="name" help="请输入用户名">
        <Input borderless placeholder="请输入内容" />
      </Form.FormItem>
      <Form.FormItem label="密码" name="password" help="">
        <Input borderless type="password" placeholder="请输入内容" suffixIcon={<BrowseOffIcon />} />
      </Form.FormItem>
      <Form.FormItem label="性别" name="gender">
        <RadioGroup className="box" borderless>
          <Radio block={false} name="radio" value="man" label="男" />
          <Radio block={false} name="radio" value="woman" label="女" />
          <Radio block={false} name="radio" value="secret" label="保密" />
        </RadioGroup>
      </Form.FormItem>
      <Form.FormItem label="年限" name="age" contentAlign="left">
        <Stepper theme="filled" />
      </Form.FormItem>
      <Form.FormItem label="自我评价" name="description" contentAlign="left">
        <Rate allowHalf showText={false} gap={RATE_GAP} />
      </Form.FormItem>
      <Form.FormItem label="个人简介" name="resume">
        <Textarea className="textarea" indicator maxlength={50} placeholder="请输入个人简介" />
      </Form.FormItem>
      <div className="button-group">
        <Button theme="primary" type="submit" size="large">
          提交
        </Button>
        <Button theme="default" variant="base" type="reset" size="large">
          重置
        </Button>
      </div>
    </Form>
  );
}
