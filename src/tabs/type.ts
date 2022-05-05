/* eslint-disable */

/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 * updated at 2022-01-07 16:30:49
 * */
import { CSSProperties } from 'react';
import { TNode } from '../common';

export interface TdTabPanelProps {
  /**
   * 触发元素，同 triggerElement
   */
  children?: TNode;
  /**
   * 标签名
   */
  label: string;
  /**
   * 标签值
   */
  value: string | number;
  /**
   * 是否禁用
   */
  disabled?: boolean;
}

export interface TdTabsProps {
  /**
   * 触发元素，同 triggerElement
   */
  children?: any;
  /**
   * 容器内容
   */
  content?: TNode;
  /**
   * 默认选中值
   */
  defaultValue?: number | string;
  /**
   * 选项卡列表
   * @default []
   */
  list?: Array<TdTabPanelProps>;
  /**
   * 动画效果设置
   */
  animation?: CSSProperties;
  /**
   * 选项卡位置
   * @default 'top'
   */
  placement?: 'left' | 'right' | 'bottom';
  /**
   * 是否展示底部激活条
   * @default true
   */
  showBottomLine?: boolean;
  /**
   * 尺寸大小
   */
  size?: 'large' | 'small' | 'default';
  /**
   * 激活的选项卡发生变化时触发
   */
  change?: (value) => void;
}
