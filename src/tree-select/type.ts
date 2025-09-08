import { TdTreeSelectProps } from './TdTreeSelectProps';

export interface TreeSelectOption {
  label: string;
  value: string | number;
  disabled?: boolean;
  children?: TreeSelectOption[];
}

export interface TreeSelectProps extends TdTreeSelectProps {
  /**
   * 选项数据
   */
  options?: TreeSelectOption[];
  /**
   * 当前选中的值
   */
  value?: string | number | Array<string | number>;
  /**
   * 默认选中的值
   */
  defaultValue?: string | number | Array<string | number>;
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
  onChange?: (value: string | number | Array<string | number>, selectedOptions: TreeSelectOption | TreeSelectOption[]) => void;
  /**
   * 清除时的回调
   */
  onClear?: () => void;
  /**
   * 展开/收起时的回调
   */
  onExpand?: (expandedKeys: Array<string | number>) => void;
}

export default TreeSelectProps;
