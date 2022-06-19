/* eslint-disable */

/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 * */

import { TNode, TElement } from '../common';
import { MouseEvent, KeyboardEvent, FocusEvent, FormEvent } from 'react';

export interface TdInputProps {
  /**
   * 文本内容位置，居左/居中/居右
   * @default left
   */
  align?: 'left' | 'center' | 'right';
  /**
   * 自动聚焦
   * @default false
   */
  autofocus?: boolean;
  /**
   * 是否可清空
   * @default false
   */
  clearable?: boolean;
  /**
   * 是否禁用输入框
   * @default false
   */
  disabled?: boolean;
  /**
   * 错误提示文本，值为空不显示
   * @default ''
   */
  errorMessage?: string;
  /**
   * 左侧文本
   */
  label?: TNode;
  /**
   * 用户最多可以输入的字符个数，一个中文汉字表示两个字符长度。`maxcharacter` 和 `maxlength` 二选一使用
   */
  maxcharacter?: number;
  /**
   * 用户最多可以输入的文本长度。值小于等于 0 的时候，则不限制输入长度。`maxcharacter` 和 `maxlength` 二选一使用
   */
  maxlength?: number;
  /**
   * 名称
   * @default ''
   */
  name?: string;
  /**
   * 占位符
   */
  placeholder?: string;
  /**
   * 组件前置图标
   */
  prefixIcon?: TElement;
  /**
   * 输入框尺寸
   * @default small
   */
  size?: 'medium' | 'small';
  /**
   * 后置图标前的后置内容
   */
  suffix?: TNode;
  /**
   * 后置内容 前的分隔符是否显示
   * @default true
   */
  suffixSeperate?: boolean;
  /**
   * 组件后置图标
   */
  suffixIcon?: TElement;
  /**
   * 输入框类型
   * @default text
   */
  type?: 'text' | 'number' | 'url' | 'tel' | 'password' | 'search' | 'submit' | 'hidden';
  /**
   * 是否显示两行
   * @default false
   */
  twoLines?: boolean;

  /**
   * 输入框的值
   */
  value?: InputValue;
  /**
   * 输入框的值，非受控属性
   */
  defaultValue?: InputValue;
  /**
   * 失去焦点时触发
   */
  onBlur?: (value: InputValue, context: { e: FocusEvent<HTMLInputElement> }) => void;
  /**
   * 输入框值发生变化时触发
   */
  onChange?: (
    value: InputValue,
    context?: { e?: FormEvent<HTMLDivElement> | MouseEvent<HTMLElement | SVGElement> },
  ) => void;
  /**
   * 清空按钮点击时触发
   */
  onClear?: (context: { e: MouseEvent<SVGElement> }) => void;
  /**
   * 回车键按下时触发
   */
  onEnter?: (value: InputValue, context: { e: KeyboardEvent<HTMLDivElement> }) => void;
  /**
   * 获得焦点时触发
   */
  onFocus?: (value: InputValue, context: { e: FocusEvent<HTMLInputElement> }) => void;
}

export type InputValue = string | number;
