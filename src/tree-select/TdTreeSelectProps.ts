/* eslint-disable */

/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 * */

import { TNode } from '../common';

export interface TdTreeSelectProps {
  /**
   * 选项数据
   */
  options?: Array<TreeSelectOption>;
  /**
   * 当前选中的值
   */
  value?: TreeSelectValue;
  /**
   * 默认选中的值
   */
  defaultValue?: TreeSelectValue;
  /**
   * 是否多选
   */
  multiple?: boolean;
  /**
   * 占位符文本
   */
  placeholder?: string;
  /**
   * 是否禁用
   */
  disabled?: boolean;
  /**
   * 是否显示清除按钮
   */
  clearable?: boolean;
  /**
   * 选择器高度
   */
  height?: string | number;
  /**
   * 值变化时的回调
   */
  onChange?: (value: TreeSelectValue, selectedOptions: TreeSelectOption | TreeSelectOption[]) => void;
  /**
   * 清除时的回调
   */
  onClear?: () => void;
  /**
   * 展开/收起时的回调
   */
  onExpand?: (expandedKeys: Array<string | number>) => void;
}

export interface TreeSelectOption {
  label: string;
  value: string | number;
  disabled?: boolean;
  children?: TreeSelectOption[];
}

export type TreeSelectValue = string | number | Array<string | number>;