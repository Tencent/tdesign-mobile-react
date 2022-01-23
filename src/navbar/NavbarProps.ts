import React from "react";

export interface NavbarProps {
  /**
   * @description 是否展示左侧箭头
   */
  leftArrow?: boolean;
  /**
   * @description 标题
   */
  title?: string;
  /**
   * @description 标题最大长度
   */
  maxLen?: number;
  /**
   * @description 展示更多按钮
   */
  rightShow?: boolean;

  onClickRight?: (evt: React.MouseEvent<HTMLElement>) => void;

  onClickText?: (evt: React.MouseEvent<HTMLElement>) => void;

  children?: React.ReactChild;
  right?: any;

  left?: any;
}
