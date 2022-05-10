import identity from 'lodash/identity';
import { MessageThemeList, TdMessageProps } from './type';

export const defaultProps: TdMessageProps = {
  closeBtn: false, // 是否展示关闭按钮（可自定义关闭按钮）
  duration: 3000, // 消息展示时长
  theme: 'info' as MessageThemeList, // 消息主题
  visible: undefined, // 是否展示, false时默认卸载组件
  zIndex: 5000, // 消息层级
  onOpen: identity, // 展示Message时触发
  onOpened: identity, // 展示Message时并且动画结束后触发
  onClose: identity, // 关闭Message时触发
  onClosed: identity, // 关闭Message时并且动画结束后触发
  onVisibleChange: identity, // 可见性变化时触发
  content: '', // 消息内容
  icon: false, // 消息图标
};
