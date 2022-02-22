import React, { useEffect, useState, useCallback, useRef } from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';
import { CSSTransition } from 'react-transition-group';
import { Icon } from 'tdesign-icons-react';
import useConfig from '../_util/useConfig';
import { TdMessageProps } from './type';
import useMessageCssTransition from './hooks/useMessageCssTransition';
import { defaultProps, IconType, MessageThemeListEnum } from './constant';
import noop from '../_util/noop';

interface MessageProps extends TdMessageProps {
  children?: React.ReactNode;
  el: React.ReactNode;
}

const Message: React.FC = (props: MessageProps) => {
  const {
    children,
    closeBtn = undefined,
    duration = 3000,
    theme = MessageThemeListEnum.info,
    visible = false,
    zIndex = 5000,
    onOpen = noop, // 展示Message时触发
    onOpened = noop, // 展示Message时并且动画结束后触发
    onClose = noop, // 关闭Message时触发
    onClosed = noop, // 关闭Message时并且动画结束后触发
    onVisibleChange = noop, // 可见性变化时触发
    content = '',
    icon = false,
    el,
  } = props;

  const { classPrefix } = useConfig();

  const [messageVisible, setMessageVisible] = useState<boolean>(visible);

  const contentRef = useRef<HTMLDivElement>(null);

  const cssTransitionState = useMessageCssTransition({
    contentRef,
    classPrefix: 'message',
    el,
    onEnter: onOpen,
    onEntered: onOpened,
    onExit: onClose,
    onExited: onClosed,
  });

  const closeMessage = useCallback(() => {
    setMessageVisible(false);
  }, []);

  useEffect(() => {
    let timer = null;
    if (duration && el) {
      timer = setTimeout(() => {
        setMessageVisible(false);
      }, duration);
    }
    return () => {
      clearTimeout(timer);
    };
  }, [duration, el]);

  useEffect(() => {
    onVisibleChange(messageVisible);
  }, [onVisibleChange, messageVisible]);

  const leftIcon = typeof icon === 'boolean' ? <Icon name={IconType[theme]} size={22} /> : icon;

  const closeButton = typeof closeBtn === 'boolean' ? <Icon name="close" size={22} onClick={closeMessage} /> : closeBtn;

  const mainContent = content ? content : children;

  return (
    <CSSTransition in={messageVisible} appear {...cssTransitionState.props}>
      <div
        className={classNames(
          `${classPrefix}-message`,
          `${classPrefix}-message-align--center`,
          `${classPrefix}-message--${theme}`,
        )}
        ref={contentRef}
        style={{ zIndex }}
      >
        {leftIcon}
        <div className={`${classPrefix}-message--txt`}>{mainContent}</div>
        {closeButton}
      </div>
    </CSSTransition>
  );
};

function createMessage(props, theme: MessageThemeListEnum) {
  const config = { ...defaultProps, ...props };
  // const messageContainerClassName = 't-message-container-wrapper';
  // if (document.getElementsByClassName(messageContainerClassName)[0]) {
  //   return;
  // }
  const el = document.createElement('div');
  // el.classList.add(messageContainerClassName);
  document.body.appendChild(el);
  ReactDOM.render(<Message {...{ ...config, theme, el }} />, el);
}

export default {
  info(props: TdMessageProps) {
    return createMessage(props, MessageThemeListEnum.info);
  },
  success(props: TdMessageProps) {
    return createMessage(props, MessageThemeListEnum.success);
  },
  warning(props: TdMessageProps) {
    return createMessage(props, MessageThemeListEnum.warning);
  },
  error(props: TdMessageProps) {
    return createMessage(props, MessageThemeListEnum.error);
  },
};
