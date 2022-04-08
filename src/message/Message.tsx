import React, { useEffect, useState, useRef } from 'react';
import classNames from 'classnames';
import isBoolean from 'lodash/isBoolean';
import identity from 'lodash/identity';
import { useBoolean, useTimeout } from 'ahooks';
import { CSSTransition } from 'react-transition-group';
import { Icon } from 'tdesign-icons-react';
import useConfig from '../_util/useConfig';
import { TdMessageProps, MessageThemeList } from './type';
import useMessageCssTransition from './hooks/useMessageCssTransition';
import withNativeProps, { NativeProps } from '../_util/withNativeProps';
import { IconType } from './constant';

interface MessageProps extends TdMessageProps, NativeProps {
  children?: React.ReactNode;
  containerDom: React.ReactNode;
}

export const defaultProps = {
  closeBtn: false, // 是否展示关闭按钮（可自定义关闭按钮）
  duration: 3000, // 消息展示时长
  theme: 'info' as MessageThemeList, // 消息主题
  visible: undefined, // 是否展示
  zIndex: 5000, // 消息层级
  onOpen: identity, // 展示Message时触发
  onOpened: identity, // 展示Message时并且动画结束后触发
  onClose: identity, // 关闭Message时触发
  onClosed: identity, // 关闭Message时并且动画结束后触发
  onVisibleChange: identity, // 可见性变化时触发
  content: '', // 消息内容
  icon: false, // 消息图标
  containerDom: undefined, // 消息容器DOM节点
};

const Message: React.FC<TdMessageProps> = (props: MessageProps) => {
  const {
    children,
    closeBtn,
    duration,
    theme,
    visible,
    zIndex,
    onOpen,
    onOpened,
    onClose,
    onClosed,
    onVisibleChange,
    content,
    icon,
    containerDom,
  } = props;

  const { classPrefix } = useConfig();

  const name = `${classPrefix}-message`;

  const [messageVisible, { setTrue, setFalse }] = useBoolean(false);

  const [isControl, setIsControl] = useState<boolean>(false);

  const contentRef = useRef<HTMLDivElement>(null);

  const cssTransitionState = useMessageCssTransition({
    contentRef,
    classPrefix: 'message',
    onEnter: onOpen,
    onEntered: onOpened,
    onExit: onClose,
    onExited: onClosed,
    containerDom,
  });

  useEffect(() => {
    setIsControl(duration === 0 && isBoolean(visible) && closeBtn !== true);
    if (!(duration === 0 && isBoolean(visible) && closeBtn !== true)) {
      setTrue();
    }
  }, [visible, duration, closeBtn, setTrue]);

  useTimeout(() => {
    setFalse();
  }, duration);

  useEffect(() => {
    onVisibleChange(isControl ? visible : messageVisible);
  }, [onVisibleChange, isControl, visible, messageVisible]);

  const leftIcon = isBoolean(icon) ? <>{icon && <Icon name={IconType[theme]} size={22} />}</> : icon;

  const closeButton = closeBtn === true ? <Icon name="close" size={22} onClick={setFalse} /> : closeBtn;

  return withNativeProps(
    props,
    <CSSTransition in={isControl ? visible : messageVisible} appear {...cssTransitionState.props} unmountOnExit>
      <div
        className={classNames(`${name}`, `${name}-align--center`, `${name}--${theme}`)}
        ref={contentRef}
        style={{ zIndex }}
      >
        {leftIcon}
        <div className={`${name}--txt`}>{content || children}</div>
        {closeButton}
      </div>
    </CSSTransition>,
  );
};

Message.defaultProps = defaultProps;
Message.displayName = 'Message';

export default Message;
