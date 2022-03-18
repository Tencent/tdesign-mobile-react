/* eslint-disable */

/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 * */

import { TNode, TElement } from '../common';

export interface TdNavbarProps {
  /**
   * 是否添加动画效果
   * @default true
   */
  animation?: boolean;
  /**
   * 是否固定在顶部
   * @default true
   */
  fixed?: boolean;
  /**
   * 首页图标。值为 true 表示显示默认返回图标，值为 false 表示不显示首页图标，值为其他表示自定义图标
   */
  homeIcon?: TNode;
  /**
   * 左侧图标。值为 true 表示显示默认返回图标，值为 false 表示不显示左侧图标，值为其他表示自定义图标
   * @default false
   */
  leftIcon?: TNode;
  /**
   * 右侧图标，可自定义
   */
  rightIcon?: TElement;
  /**
   * 页面标题
   */
  title?: TNode;
  /**
   * 标题文字最大长度，超出的范围使用 `...` 表示
   */
  titleMaxLength?: number;
  /**
   * 是否显示
   * @default true
   */
  visible?: boolean;
}
