/* eslint-disable */

/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 * */

import { PopupProps } from '../popup';
import { TElement } from '../common';

export interface TdColorPickerProps {
  /**
   * 自动关闭。在点击遮罩层时自动关闭，不需要手动设置 visible
   * @default true
   */
  autoClose?: boolean;
  /**
   * 是否可清空
   * @default false
   */
  clearable?: boolean;
  /**
   * 底部插槽，仅在 `usePopup` 为 `true` 时有效
   */
  footer?: TElement;
  /**
   * 顶部插槽，仅在 `usePopup` 为 `true` 时有效
   */
  header?: TElement;
  /**
   * 透传 Popup 组件全部属性
   * @default {}
   */
  popupProps?: PopupProps;
  /**
   * 是否使用弹出层包裹颜色选择器
   * @default false
   */
  usePopup?: boolean;
  /**
   * 是否显示颜色选择器。`usePopup` 为 true 时有效
   * @default false
   */
  visible?: boolean;
  /**
   * 关闭按钮时触发
   */
  onClose?: (trigger: ColorPickerTrigger) => void;
}

export type ColorPickerTrigger = 'overlay';
