/* eslint-disable */

/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 * */

import { TNode, TElement } from '../common';
import { MouseEvent } from 'react';

export interface TdPickerProps {
  /**
   * 取消按钮文字
   * @default 取消
   */
  cancelBtn?: string;
  /**
   * 确定按钮文字
   * @default 确认
   */
  confirmBtn?: string;
  /**
   * 底部内容
   */
  footer?: TElement;
  /**
   * 头部内容。值为 true 显示空白头部，值为 false 不显示任何内容，值类型为 TNode 表示自定义头部内容
   * @default true
   */
  header?: TNode;
  /**
   * 标题
   * @default ''
   */
  title?: string;
  /**
   * 选中值
   */
  value?: Array<PickerValue>;
  /**
   * 选中值，非受控属性
   */
  defaultValue?: Array<PickerValue>;
  /**
   * 是否显示
   * @default false
   */
  visible?: boolean;
  /**
   * 点击取消按钮时触发
   * @default ''
   */
  onCancel?: (context: { e: MouseEvent<HTMLButtonElement> }) => void;
  /**
   * 选中变化时候触发
   * @default ''
   */
  onChange?: (value: Array<PickerValue>, index: number) => void;
  /**
   * 点击确认确认按钮时触发
   * @default ''
   */
  onConfirm?: (value: Array<PickerValue>, context: { e: MouseEvent<HTMLButtonElement> }) => void;
}

export interface TdPickerItemProps {
  /**
   * 格式化标签
   */
  formatter?: (option: PickerItemOption) => string;
  /**
   * 数据源
   * @default []
   */
  options?: Array<PickerItemOption>;
}

export type PickerValue = string | number;

export interface PickerItemOption {
  label: string;
  value: string | number;
}
