import React, { useEffect, useState, useRef } from 'react';
import classNames from 'classnames';
import isBoolean from 'lodash/isBoolean';
import { useBoolean, useTimeout } from 'ahooks';
import isObject from 'lodash/isObject';
import { CSSTransition } from 'react-transition-group';
import { Icon } from 'tdesign-icons-react';
import useConfig from '../_util/useConfig';
import type { TdMessageProps, MessageMarquee } from './type';
import useMessageCssTransition from './hooks/useMessageCssTransition';
import withNativeProps, { NativeProps } from '../_util/withNativeProps';
import { defaultProps } from './constant';

export interface MessageProps extends TdMessageProps, NativeProps {
  container?: Element;
}

const Message: React.FC<MessageProps> = (props) => {
  const {
    children,
    align,
    closeBtn,
    duration,
    theme,
    marquee,
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

  const scrollingHandler = useRef<Function>(null);

  handler.current = onVisibleChange;

  /**
   * 判断是否受控，如果是受控，则直接使用使用props中的visible，否则使用messageVisible
   */
  const [isControl] = useState<boolean>(duration === 0 && isBoolean(visible) && closeBtn !== true);

  /**
   * duration为0时，取消倒计时
   */
  const [messageDuration] = useState<number | null>(duration || null);
  const [state, setState] = useState<{
    duration: number;
    offset: number;
    listWidth: number;
    itemWidth: number;
    scroll: {
      marquee: boolean;
      speed: number;
      loop: number;
      delay: number;
    };
  }>({
    duration: 0,
    offset: 0,
    listWidth: 0,
    itemWidth: 0,
    scroll: {
      marquee: false,
      speed: 50,
      loop: -1, // 值为 -1 表示循环播放，值为 0 表示不循环播放
      delay: 300,
    },
  });

  const changeNumToStr = (arr: TdMessageProps['offset'] = []) =>
    arr.map((item) => (typeof item === 'number' ? `${item}px` : item));
  const getMessageStylesOffset = (offset: TdMessageProps['offset']) => {
    const arr = changeNumToStr(offset);
    return offset
      ? {
          top: arr[0],
          right: arr[1],
          left: arr[1],
        }
      : {};
  };

  const [messageVisible, { setTrue, setFalse }] = useBoolean(false);

  const contentRef = useRef<HTMLDivElement>(null);
  const textWrapRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

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
    props.onDurationEnd?.();
  }, messageDuration);

  useEffect(() => {
    handler.current(isControl ? visible : messageVisible);
  }, [isControl, visible, messageVisible]);

  const handleScrolling = () => {
    if (!props?.marquee || (isObject(props?.marquee) && (props?.marquee as MessageMarquee))?.loop === 0) {
      return;
    }

    const { loop, speed, delay } = state.scroll;

    const scroll = {
      marquee: true,
      // 负数统一当作循环播放
      loop: Math.max(
        props.marquee === true || (props.marquee as MessageMarquee)?.loop == null
          ? loop
          : (props.marquee as MessageMarquee)?.loop,
        -1,
      ),
      // 速度必须为正数
      speed: Math.max(
        props.marquee === true || (props.marquee as MessageMarquee)?.speed == null
          ? speed
          : (props.marquee as MessageMarquee)?.speed,
        1,
      ),
      // 延迟不可为负数
      delay: Math.max(
        props.marquee === true || (props.marquee as MessageMarquee)?.delay == null
          ? delay
          : (props.marquee as MessageMarquee)?.delay,
        0,
      ),
    };
    setState({
      ...state,
      scroll,
      offset: 0,
    });

    // 设置动画
    setTimeout(() => {
      const textWrapDOMWidth = textWrapRef.current?.getBoundingClientRect().width;
      const textDOMWidth = textRef.current?.getBoundingClientRect().width;

      setState({
        ...state,
        scroll,
        offset: -textDOMWidth,
        duration: textDOMWidth / state.scroll.speed,
        listWidth: textWrapDOMWidth,
        itemWidth: textDOMWidth,
      });
    }, state.scroll.delay);
  };

  scrollingHandler.current = handleScrolling;

  useEffect(() => {
    scrollingHandler.current();
  }, []);

  const animateStyle = {
    transform: state.offset ? `translateX(${state.offset}px)` : '',
    transitionDuration: `${state.duration}s`,
    transitionTimingFunction: 'linear',
  };

  const resetTransition = () => {
    setState({
      ...state,
      duration: 0,
      offset: state.listWidth,
    });
    // state.duration = 0;
    // state.offset = state.listWidth;

    setTimeout(() => {
      setState({
        ...state,
        offset: -state.itemWidth,
        duration: (state.itemWidth + state.listWidth) / state.scroll.speed,
      });
      // state.offset = -state.itemWidth;
      // state.duration = (state.itemWidth + state.listWidth) / state.scroll.speed;
    }, 0);
  };

  // 动画结束后，初始化动画
  const handleTransitionend = () => {
    resetTransition();

    if (state.scroll.loop === -1) {
      return;
    }

    const newState = {
      ...state,
      scroll: {
        ...state.scroll,
        loop: -(-state.scroll.loop),
      },
    };

    // state.scroll.loop = --state.scroll.loop;

    if (state.scroll.loop === 0) {
      newState.scroll.marquee = false;
    }

    setState(newState);
  };

  const leftIcon = isBoolean(icon) ? (
    <>{icon && <Icon name={`${theme === 'success' ? 'check' : 'error'}-circle-filled`} size={22} />}</>
  ) : (
    icon
  );

  const clickCloseButton = (e) => {
    setFalse();
    props.onCloseBtnClick?.(e);
  };

  const closeButton =
    closeBtn === true ? (
      <Icon className={`${name}--close-btn`} name="close" size={22} onClick={clickCloseButton} />
    ) : (
      closeBtn
    );

  return withNativeProps(
    props,
    <CSSTransition in={isControl ? visible : messageVisible} appear {...cssTransitionState.props} unmountOnExit>
      <div
        className={classNames(`${name}`, `${name}--${theme}`, { [`${name}-align--${align}`]: !!align })}
        ref={contentRef}
        style={{ zIndex, ...getMessageStylesOffset(props.offset) }}
      >
        <div className={`${name}__icon--left`}>{leftIcon}</div>
        <div ref={textWrapRef} className={classNames(`${name}__text-wrap`, { [`${name}__text-nowrap`]: marquee })}>
          <div
            ref={textRef}
            className={`${name}__text`}
            style={state.scroll.marquee ? animateStyle : {}}
            onTransitionEnd={handleTransitionend}
          >
            {content || children}
          </div>
        </div>
        {closeButton}
      </div>
    </CSSTransition>,
  );
};

Message.defaultProps = defaultProps;
Message.displayName = 'Message';

export default Message;
