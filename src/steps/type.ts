/* eslint-disable */

/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 * */

import { TNode } from '../common';

export interface TdStepsProps {
  /**
   * 步骤条方向，有两种：横向和纵向
   * @default horizontal
   */
  layout?: 'horizontal' | 'vertical';
  /**
   * 只读状态
   * @default false
   */
  readonly?: boolean;
  /**
   * 步骤条分割符
   * @default line
   */
  separator?: 'line' | 'dashed' | 'arrow';
  /**
   * 步骤条风格
   * @default default
   */
  theme?: 'default' | 'dot';
}

export interface TdStepItemProps {
  /**
   * 步骤描述，同 content
   */
  children?: TNode;
  /**
   * 步骤描述
   * @default ''
   */
  content?: TNode;
  /**
   * 图标，默认显示内置图标，也可以自定义图标，值为 false 则不显示图标。优先级大于 `status` 定义的图标
   * @default true
   */
  icon?: TNode;
  /**
   * 当前步骤的状态
   * @default default
   */
  status?: StepStatus;
  /**
   * 标题
   * @default ''
   */
  title?: TNode;
}

export type StepStatus = 'default' | 'process' | 'finish' | 'error';
