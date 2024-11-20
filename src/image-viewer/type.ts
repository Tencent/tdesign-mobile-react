/* eslint-disable */

/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 * */

export interface TdImageViewerProps {
  /**
   * 数据来源，image 列表
   */
  images: Array<string>;
  /**
   * 是否显示
   */
  visible: boolean;
  /**
   * 是否显示页码
   */
  showIndex?: boolean;
  /**
   * 是否显示关闭按钮
   */
  closeBtn?: boolean;
  /**
   * 是否显示删除按钮
   */
  deleteBtn?: boolean;
  /**
   * 当前显示第几张
   */
  initialIndex?: number;
  /**
   * 背景色
   */
  backgroundColor?: string;
  /**
   * 是否显示回调
   */
  onVisibleChange: (visible: boolean) => void;
  /**
   * 翻页时回调
   */
  onChange: (index: number) => void;
  /**
   * 关闭回调
   */
  onClose: (trigger: 'overlay' | 'button', visible: Boolean, index: Number) => void;
  /**
   * 删除回调
   */
  onDelete: (index: number) => void;
}
