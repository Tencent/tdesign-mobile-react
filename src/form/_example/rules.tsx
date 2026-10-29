import React from 'react';
import { Button, Checkbox, Form, Input, Stepper } from 'tdesign-mobile-react';

export interface FormApiDemoProps {
  labelAlign?: 'left' | 'right' | 'top';
}

const initialData = {
  phone: '',
  email: '',
  idcard: '',
  url: '',
  age: 20,
  hobby: [],
};

/**
 * 展示 FormRule 内置校验规则：required / min / max / telnumber / email / idcard / url / number 以及自定义 validator 等。
 */
export default function FormRules({ labelAlign = 'left' }: FormApiDemoProps) {
  return (
    <Form
      initialData={initialData}
      labelAlign={labelAlign}
      labelWidth="98px"
      showErrorMessage
      scrollToFirstError="smooth"
      resetType="initial"
      onSubmit={({ validateResult, firstError }) => {
        console.log('[rules onSubmit]', validateResult, firstError);
      }}
    >
      <Form.FormItem
        label="手机号"
        name="phone"
        arrow
        rules={[
          { required: true, message: '手机号不能为空' },
          { telnumber: true, message: '请输入正确的手机号' },
        ]}
      >
        <Input borderless placeholder="请输入手机号" />
      </Form.FormItem>

      <Form.FormItem label="邮箱" name="email" arrow rules={[{ email: true, message: '请输入正确的邮箱地址' }]}>
        <Input borderless placeholder="请输入邮箱" />
      </Form.FormItem>

      <Form.FormItem label="身份证号" name="idcard" arrow rules={[{ idcard: true, message: '请输入正确的身份证号码' }]}>
        <Input borderless placeholder="请输入身份证号码" />
      </Form.FormItem>

      <Form.FormItem
        label="个人主页"
        name="url"
        arrow
        rules={[{ url: { protocols: ['http', 'https'] }, message: '请输入正确的网址' }]}
      >
        <Input borderless placeholder="请输入网址" />
      </Form.FormItem>

      <Form.FormItem
        label="年龄"
        name="age"
        arrow
        rules={[
          { required: true, message: '年龄不能为空' },
          { number: true, message: '年龄必须是数字' },
          { min: 18, message: '年龄不能小于 18 岁' },
          { max: 60, message: '年龄不能大于 60 岁' },
        ]}
      >
        <Stepper theme="filled" />
      </Form.FormItem>

      <Form.FormItem label="兴趣爱好" name="hobby" arrow rules={[{ required: true, message: '请至少选择一个兴趣' }]}>
        <Checkbox.Group borderless direction="horizontal">
          <Checkbox label="阅读" value="read" />
          <Checkbox label="运动" value="sport" />
          <Checkbox label="音乐" value="music" />
        </Checkbox.Group>
      </Form.FormItem>

      <div className="button-group">
        <Button theme="primary" type="submit" size="large">
          校验
        </Button>
        <Button theme="default" variant="base" type="reset" size="large">
          重置
        </Button>
      </div>
    </Form>
  );
}
