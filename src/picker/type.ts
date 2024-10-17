/* eslint-disable */

/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 * */

import { ButtonProps } from '../button';
import { TNode, KeysType } from '../common';
import { MouseEvent } from 'react';

export interface TdPickerProps {
  /**
   * 取消按钮文字
   * @default true
   */
  cancelBtn?: boolean | string | ButtonProps;
  /**
   * 配置每一列的选项
   * @default []
   */
  columns: Array<PickerColumn> | ((item: Array<PickerValue>) => Array<PickerColumn>);
  /**
   * 确定按钮文字
   * @default true
   */
  confirmBtn?: boolean | string | ButtonProps;
  /**
   * 头部内容。值为 true 显示空白头部，值为 false 不显示任何内容，值类型为 TNode 表示自定义头部内容
   * @default true
   */
  header?: TNode;
  /**
   * 用来定义 value / label 在 `options` 中对应的字段别名
   */
  keys?: KeysType;
  /**
   * 自定义label
   */
  renderLabel?: (item: PickerColumnItem) => string;
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
  onChange?: (
    value: Array<PickerValue>,
    context: { columns: Array<PickerContext>; e: MouseEvent<HTMLDivElement> },
  ) => void;
  /**
   * 点击确认按钮时触发
   * @default ''
   */
  onConfirm?: (
    value: Array<PickerValue>,
    context: { index: number[]; e: MouseEvent<HTMLDivElement>; label: string[] },
  ) => void;
  /**
   * 任何一列选中都会触发，不同的列参数不同。`context.column` 表示第几列变化，`context.index` 表示变化那一列的选中项下标
   * @default ''
   */
  onPick?: (value: Array<PickerValue>, context: PickerContext) => void;
}

export type PickerColumn = PickerColumnItem[];

export interface PickerColumnItem {
  label: string;
  value: string;
}

export type PickerValue = string | number;

export interface PickerContext {
  column: number;
  index: number;
}
