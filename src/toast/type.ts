/* eslint-disable */

/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 * updated at 2022-01-07 16:30:49
 * */
import { TNode } from '../common';

export interface TdToastProps {
  /**
   * 触发元素，同 triggerElement
   */
  children?: any;
  /**
   * 图标排列方式
   */
  direction?: 'row' | 'column';
  /**
   * 弹窗显示毫秒数
   */
  duration?: number;
  /**
   * 弹窗显示文字
   */
  message?: string | TNode;
  /**
   * 弹窗展示位置
   * @default 'top'
   */
  placement?: 'top' | 'middle' | 'bottom';
  /**
   * 提示类型
   */
  theme?: 'info' | 'success' | 'warning' | 'error';
  /**
   * 图标
   */
  icon?: boolean | React.ReactNode;
  /**
   * 防止滚动穿透
   */
  preventScrollThrough: boolean;
}
