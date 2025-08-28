import React, { useEffect, useState, useRef } from 'react';
import classNames from 'classnames';
import { useTimeout } from 'ahooks';
import { isObject } from 'lodash-es';
import { CSSTransition } from 'react-transition-group';
import { CheckCircleFilledIcon, CloseIcon, ErrorCircleFilledIcon, InfoCircleFilledIcon } from 'tdesign-icons-react';

import type { TdMessageProps, MessageMarquee } from './type';
import useMessageCssTransition from './hooks/useMessageCssTransition';
import useDefaultProps from '../hooks/useDefaultProps';
import { usePrefixClass } from '../hooks/useClass';

import type { StyledProps, TNode } from '../common';
import parseTNode from '../_util/parseTNode';
import { convertUnit } from '../_util/convertUnit';
import { messageDefaultProps } from './defaultProps';

import Link from '../link';

export interface MessageProps extends TdMessageProps, StyledProps {
  container?: Element;
  children?: React.ReactNode;
}

interface IInnerState {
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
}

const iconDefault = {
  info: <InfoCircleFilledIcon size={22} />,
  success: <CheckCircleFilledIcon size={22} />,
  warning: <ErrorCircleFilledIcon size={22} />,
  error: <ErrorCircleFilledIcon size={22} />,
};

const changeNumToStr = (arr: TdMessageProps['offset'] = []) => arr.map((item) => convertUnit(item));

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

const Message: React.FC<MessageProps> = (originProps) => {
  const props = useDefaultProps(originProps, messageDefaultProps);
  const {
    className,
    style,
    children,
    align,
    closeBtn,
    duration,
    theme,
    marquee,
    visible,
    defaultVisible,
    link,
    zIndex,
    content,
    icon,
    container,
    onDurationEnd,
    onCloseBtnClick,
  } = props;

  const name = usePrefixClass('message');

  /**
   * 获取visibleChange函数引用
   */
  const scrollingHandler = useRef<null | (() => void)>(null);

  /**
   * duration为0时，取消倒计时
   */
  const [messageDuration] = useState<number | null>(duration || null);
  const [state, setState] = useState<IInnerState>({
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

  const [messageVisible, setVisible] = useState<boolean>(visible ?? defaultVisible);

  useEffect(() => {
    if (typeof visible !== 'undefined' && messageVisible !== visible) {
      setVisible(visible);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible]);

  const contentRef = useRef<HTMLDivElement>(null);
  const textWrapRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  const cssTransitionState = useMessageCssTransition({
    contentRef,
    classPrefix: 'message',
    container: container as HTMLElement,
  });

  useTimeout(() => {
    setVisible(false);
    onDurationEnd?.();
  }, messageDuration);

  const handleScrolling = () => {
    if (!marquee || (isObject(marquee) && (marquee as MessageMarquee))?.loop === 0) {
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

    setTimeout(() => {
      setState({
        ...state,
        offset: -state.itemWidth,
        duration: (state.itemWidth + state.listWidth) / state.scroll.speed,
      });
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

    if (state.scroll.loop === 0) {
      newState.scroll.marquee = false;
    }

    setState(newState);
  };

  const onLinkClick = (e) => {
    props.onLinkClick?.(e);
  };
  const leftIcon = parseTNode(icon, null, iconDefault[theme] || iconDefault.info);

  const getLinkContent = () => {
    if (typeof link === 'string') {
      return <Link theme="primary" content={link} />;
    }
    if (isObject(link)) {
      return <Link theme="primary" {...link} />;
    }
    return parseTNode(link);
  };

  const clickCloseButton = (e) => {
    setVisible(false);
    onCloseBtnClick?.(e);
  };

  const renderCloseBtn = () => {
    if (!closeBtn) return;

    return closeBtn === true ? (
      <CloseIcon className={`${name}--close-btn`} size={22} onClick={clickCloseButton} />
    ) : (
      parseTNode(closeBtn as string | TNode)
    );
  };

  return (
    <CSSTransition in={messageVisible} appear {...cssTransitionState.props} unmountOnExit>
      <div
        className={classNames(`${name}`, className, `${name}--${theme}`, { [`${name}-align--${align}`]: !!align })}
        ref={contentRef}
        style={{ zIndex, ...getMessageStylesOffset(props.offset), ...style }}
      >
        <div className={`${name}__icon--left`}>{leftIcon}</div>
        <div ref={textWrapRef} className={classNames(`${name}__text-wrap`, { [`${name}__text-nowrap`]: marquee })}>
          <div
            ref={textRef}
            className={`${name}__text`}
            style={state.scroll.marquee ? animateStyle : {}}
            onTransitionEnd={handleTransitionend}
          >
            {parseTNode(content) || parseTNode(children)}
          </div>
        </div>
        {link && (
          <div className={`${name}__link`} onClick={onLinkClick}>
            {getLinkContent()}
          </div>
        )}
        {renderCloseBtn()}
      </div>
    </CSSTransition>
  );
};

Message.displayName = 'Message';

export default Message;
