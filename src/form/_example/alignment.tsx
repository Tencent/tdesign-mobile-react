import React from 'react';
import { Button, Form, Input, Stepper, Switch } from 'tdesign-mobile-react';

export interface FormApiDemoProps {
  labelAlign?: 'left' | 'right' | 'top';
}

const initialData = {
  name: '',
  email: '',
  phone: '',
  notice: true,
  count: 1,
};

/**
 * 展示 contentAlign / labelAlign / labelWidth / requiredMark / requiredMarkPosition / showErrorMessage
 * 等属性在不同取值与组合下的布局效果。
 * 标签统一为 2 个中文，避免与必填符号（*）组合展示时出现换行。
 */
export default function FormAlignment({ labelAlign = 'left' }: FormApiDemoProps) {
  return (
    <>
      {/* 1. labelAlign：左对齐 / 右对齐 / 顶部对齐（本节固定展示三种取值，不随排布切换） */}
      <div className="form-section-title">labelAlign：标签对齐方式</div>
      <Form initialData={initialData} labelAlign="left" labelWidth="90px" resetType="initial">
        <Form.FormItem label="姓名" name="name" arrow>
          <Input borderless placeholder="labelAlign=left" />
        </Form.FormItem>
        <Form.FormItem label="邮箱" name="email" arrow>
          <Input borderless placeholder="labelAlign=left" />
        </Form.FormItem>
      </Form>
      <Form initialData={initialData} labelAlign="right" labelWidth="90px" resetType="initial">
        <Form.FormItem label="姓名" name="name" arrow>
          <Input borderless placeholder="labelAlign=right" />
        </Form.FormItem>
        <Form.FormItem label="邮箱" name="email" arrow>
          <Input borderless placeholder="labelAlign=right" />
        </Form.FormItem>
      </Form>
      <Form initialData={initialData} labelAlign="top" resetType="initial">
        <Form.FormItem label="姓名" name="name" arrow>
          <Input borderless placeholder="labelAlign=top（标签在顶部）" />
        </Form.FormItem>
        <Form.FormItem label="邮箱" name="email" arrow>
          <Input borderless placeholder="labelAlign=top（标签在顶部）" />
        </Form.FormItem>
      </Form>

      {/* 2. labelWidth：不同标签宽度 */}
      <div className="form-section-title">labelWidth：标签宽度</div>
      <Form initialData={initialData} labelAlign={labelAlign} labelWidth="48px" resetType="initial">
        <Form.FormItem label="姓名" name="name" arrow>
          <Input borderless placeholder="labelWidth=48px" />
        </Form.FormItem>
      </Form>
      <Form initialData={initialData} labelAlign={labelAlign} labelWidth="80px" resetType="initial">
        <Form.FormItem label="姓名" name="name" arrow>
          <Input borderless placeholder="labelWidth=80px" />
        </Form.FormItem>
      </Form>
      <Form initialData={initialData} labelAlign={labelAlign} labelWidth={120} resetType="initial">
        <Form.FormItem label="姓名" name="name" arrow>
          <Input borderless placeholder="labelWidth=120（数字，自动补 px）" />
        </Form.FormItem>
      </Form>

      {/* 3. contentAlign：内容对齐方式 */}
      <div className="form-section-title">contentAlign：内容对齐方式（left / right）</div>
      <Form initialData={initialData} labelAlign={labelAlign} contentAlign="left" resetType="initial">
        <Form.FormItem label="开关" name="notice" arrow>
          <Switch customValue={[true, false]} />
        </Form.FormItem>
        <Form.FormItem label="数量" name="count" arrow>
          <Stepper theme="filled" />
        </Form.FormItem>
      </Form>
      <Form initialData={initialData} labelAlign={labelAlign} contentAlign="right" resetType="initial">
        <Form.FormItem label="开关" name="notice" arrow>
          <Switch customValue={[true, false]} />
        </Form.FormItem>
        <Form.FormItem label="数量" name="count" arrow>
          <Stepper theme="filled" />
        </Form.FormItem>
      </Form>

      {/* FormItem 级 contentAlign 覆盖 Form 级 */}
      <div className="form-section-title">contentAlign：单项覆盖（Form 级 right，单项 left）</div>
      <Form initialData={initialData} labelAlign={labelAlign} contentAlign="right" resetType="initial">
        <Form.FormItem label="开关" name="notice" arrow>
          <Switch customValue={[true, false]} />
        </Form.FormItem>
        <Form.FormItem label="数量" name="count" arrow contentAlign="left">
          <Stepper theme="filled" />
        </Form.FormItem>
      </Form>

      {/* 4. requiredMark 与 requiredMarkPosition */}
      <div className="form-section-title">requiredMark / requiredMarkPosition：必填标记</div>
      <Form initialData={initialData} labelAlign={labelAlign} resetType="initial">
        <Form.FormItem label="姓名" name="name" requiredMark rules={[{ required: true }]} arrow>
          <Input borderless placeholder="默认 requiredMarkPosition=left" />
        </Form.FormItem>
        <Form.FormItem label="邮箱" name="email" requiredMark={false} rules={[{ required: true }]} arrow>
          <Input borderless placeholder="requiredMark=false（隐藏必填标记）" />
        </Form.FormItem>
      </Form>
      <Form
        initialData={initialData}
        labelAlign={labelAlign}

        requiredMarkPosition="right"
        resetType="initial"
      >
        <Form.FormItem label="姓名" name="name" rules={[{ required: true }]} arrow>
          <Input borderless placeholder="requiredMarkPosition=right" />
        </Form.FormItem>
      </Form>

      {/* 5. showErrorMessage：校验错误信息展示 */}
      <div className="form-section-title">showErrorMessage：校验错误信息</div>
      <ShowErrorMessageDemo labelAlign={labelAlign} showErrorMessage />
      <ShowErrorMessageDemo labelAlign={labelAlign} showErrorMessage={false} />
    </>
  );
}

function ShowErrorMessageDemo({
  showErrorMessage,
  labelAlign = 'left',
}: {
  showErrorMessage?: boolean;
  labelAlign?: 'left' | 'right' | 'top';
}) {
  const [form] = Form.useForm();
  return (
    <>
      <Form
        form={form}
        initialData={{ name: '' }}
        labelAlign={labelAlign}

        showErrorMessage={showErrorMessage}
        resetType="initial"
      >
        <Form.FormItem label="姓名" name="name" rules={[{ required: true, message: '姓名不能为空' }]} arrow>
          <Input borderless placeholder={`showErrorMessage=${String(showErrorMessage)}，点击下方校验按钮`} />
        </Form.FormItem>
      </Form>
      <div className="form-api-actions">
        <Button size="small" variant="outline" onClick={() => form.submit()}>
          校验（showErrorMessage={String(showErrorMessage)}）
        </Button>
      </div>
    </>
  );
}
