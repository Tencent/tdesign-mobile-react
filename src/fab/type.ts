/* eslint-disable */

/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 * */

import { TElement } from '../common';
import { MouseEvent } from 'react';

export interface TdFabProps {
  /**
   * 透传至 Button 组件
   */
  buttonProps?: object;
  /**
   * 图标
   */
  icon?: TElement;
  /**
   * 文本内容
   * @default ''
   */
  text?: string;
  /**
   * 悬浮按钮点击事件
   */
  onClick?: (context: { e: MouseEvent<HTMLDivElement> }) => void;
}
