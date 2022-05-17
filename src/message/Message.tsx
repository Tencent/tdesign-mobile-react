import React, { useEffect, useState, useRef } from 'react';
import classNames from 'classnames';
import isBoolean from 'lodash/isBoolean';
import { useBoolean, useTimeout } from 'ahooks';
import { CSSTransition } from 'react-transition-group';
import { Icon } from 'tdesign-icons-react';
import useConfig from '../_util/useConfig';
import { TdMessageProps } from './type';
import useMessageCssTransition from './hooks/useMessageCssTransition';
import withNativeProps, { NativeProps } from '../_util/withNativeProps';
import { defaultProps } from './constant';

export interface MessageProps extends TdMessageProps, NativeProps {
  container?: Element;
}

const Message: React.FC<MessageProps> = (props) => {
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
    container,
  } = props;

  const { classPrefix } = useConfig();

  const name = `${classPrefix}-message`;

  /**
   * 获取visibleChange函数引用
   */
  const handler = useRef<Function>(null);

  handler.current = onVisibleChange;

  /**
   * 判断是否受控，如果是受控，则直接使用使用props中的visible，否则使用messageVisible
   */
  const [isControl] = useState<boolean>(duration === 0 && isBoolean(visible) && closeBtn !== true);

  /**
   * duration为0时，取消倒计时
   */
  const [messageDuration] = useState<number | null>(duration || null);

  const [messageVisible, { setTrue, setFalse }] = useBoolean(false);

  const contentRef = useRef<HTMLDivElement>(null);

  const cssTransitionState = useMessageCssTransition({
    contentRef,
    classPrefix: 'message',
    onEnter: onOpen,
    onEntered: onOpened,
    onExit: onClose,
    onExited: onClosed,
    container: container as HTMLElement,
  });

  useEffect(() => {
    if (!isControl) {
      setTrue();
    }
  }, [isControl, setTrue]);

  useTimeout(() => {
    setFalse();
  }, messageDuration);

  useEffect(() => {
    handler.current(isControl ? visible : messageVisible);
  }, [isControl, visible, messageVisible]);

  const leftIcon = isBoolean(icon) ? (
    <>{icon && <Icon name={`${theme === 'success' ? 'check' : 'error'}-circle-filled`} size={22} />}</>
  ) : (
    icon
  );

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
