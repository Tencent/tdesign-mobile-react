import React from 'react';
import { Form, Input, Radio, RadioGroup, Switch } from 'tdesign-mobile-react';

export interface FormApiDemoProps {
  labelAlign?: 'left' | 'right' | 'top';
}

const initialData = {
  name: '',
  email: '',
  gender: 'man',
  notice: true,
};

/**
 * 展示 Form / FormItem 的标签、说明、必填标记、箭头、内容对齐等 API。
 * 标签统一控制为 2 个中文，避免与必填符号（*）组合展示时出现换行。
 */
export default function FormItemHelp({ labelAlign = 'left' }: FormApiDemoProps) {
  return (
    <>
      <Form
        initialData={initialData}
        labelAlign={labelAlign}

        colon
        resetType="initial"
        onSubmit={({ validateResult }) => {
          console.log('[help onSubmit]', validateResult);
        }}
      >
        {/* label + requiredMark + help 组合：requiredMarkPosition 默认为 left，必填符号在标签左侧 */}
        <Form.FormItem label="姓名" name="name" requiredMark help="请输入 6-20 位字母、数字或下划线" arrow>
          <Input borderless placeholder="请输入姓名" />
        </Form.FormItem>

        {/* 单个 FormItem 通过 rules.required 自动展示必填标记 */}
        <Form.FormItem
          label="邮箱"
          name="email"
          rules={[{ required: true, message: '邮箱不能为空' }]}
          help="用于接收系统通知"
          arrow
        >
          <Input borderless placeholder="请输入邮箱" />
        </Form.FormItem>

        {/* 单项覆盖 labelAlign 与 contentAlign */}
        <Form.FormItem label="性别" name="gender" labelAlign="left" contentAlign="right" arrow>
          <RadioGroup className="box" borderless>
            <Radio block={false} name="help-gender" value="man" label="男" />
            <Radio block={false} name="help-gender" value="women" label="女" />
          </RadioGroup>
        </Form.FormItem>

        {/* requiredMark=false 隐藏必填标记；arrow 显示右侧箭头 */}
        <Form.FormItem label="通知" name="notice" requiredMark={false} arrow>
          <Switch customValue={[true, false]} />
        </Form.FormItem>
      </Form>

      {/* requiredMarkPosition="right"：必填符号展示在标签右侧 */}
      <Form
        initialData={initialData}
        labelAlign={labelAlign}

        requiredMarkPosition="right"
        resetType="initial"
        onSubmit={({ validateResult }) => {
          console.log('[help onSubmit]', validateResult);
        }}
      >
        <Form.FormItem label="姓名" name="name" rules={[{ required: true, message: '姓名不能为空' }]} arrow>
          <Input borderless placeholder="请输入姓名" />
        </Form.FormItem>
        <Form.FormItem label="邮箱" name="email" rules={[{ required: true, message: '邮箱不能为空' }]} arrow>
          <Input borderless placeholder="请输入邮箱" />
        </Form.FormItem>
      </Form>
    </>
  );
}
