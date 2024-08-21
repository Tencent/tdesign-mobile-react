import React, { useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { InfoCircleFilledIcon, CheckCircleFilledIcon, CloseCircleFilledIcon } from 'tdesign-icons-react';
import cls from 'classnames';
import { ConfigContext } from '../config-provider';
import type { StyledProps } from '../common';
import type { TdNoticeBarProps, NoticeBarTrigger } from './type';
import useDefault from '../_util/useDefault';

export interface NoticeBarProps extends TdNoticeBarProps, StyledProps {}

type IconType = ReturnType<typeof InfoCircleFilledIcon>;

type frameState = {
  duration: number;
  offset: number;
  listWidth: number;
  itemWidth: number;
  timer: number;
  nextTimer: number;
  scroll: {
    marquee: boolean;
    speed: number;
    loop: number; // 值为 -1 表示循环播放，值为 0 表示不循环播放
    delay: number;
  };
};

const defaultReduceState: () => frameState = () => ({
  duration: 0,
  offset: 0,
  listWidth: 0,
  itemWidth: 0,
  timer: null,
  nextTimer: null,
  scroll: {
    marquee: false,
    speed: 50,
    loop: -1, // 值为 -1 表示循环播放，值为 0 表示不循环播放
    delay: 0,
  },
});

const defaultIcons: Record<TdNoticeBarProps['theme'], IconType> = {
  info: <InfoCircleFilledIcon />,
  success: <CheckCircleFilledIcon />,
  warning: <InfoCircleFilledIcon />,
  error: <CloseCircleFilledIcon />,
};

function filterUndefinedValue<T extends Record<string, any>>(obj: T): Partial<T> {
  const keys = Object.keys(obj);
  const result = keys.reduce((prev, next: keyof T) => {
    if (typeof obj[next] !== 'undefined') {
      return {
        ...prev,
        [next]: obj[next],
      };
    }
    return prev;
  }, {});

  return result;
}

function useAnimationSettingValue() {
  const animationSettingValue = useRef<frameState>(defaultReduceState());
  const [, setState] = useState(0);

  function updateScroll(obj: Partial<frameState['scroll']>) {
    animationSettingValue.current = {
      ...animationSettingValue.current,
      scroll: {
        ...animationSettingValue.current.scroll,
        ...obj,
      },
    };
    setState(Math.random());
  }

  function updateAnimationFrame(obj: Partial<frameState>) {
    animationSettingValue.current = {
      ...animationSettingValue.current,
      ...obj,
    };
    setState(Math.random());
  }

  function resetFrame(obj: frameState) {
    animationSettingValue.current = obj || defaultReduceState();
    setState(Math.random());
  }
  return {
    animationSettingValue,
    updateScroll,
    updateAnimationFrame,
    resetFrame,
  };
}

const NoticeBar: React.FC<NoticeBarProps> = (props) => {
  const { classPrefix } = useContext(ConfigContext);
  const {
    content,
    extra,
    marquee,
    prefixIcon,
    suffixIcon,
    theme = 'info',
    visible,
    defaultVisible,
    onChange,
    onClick,
  } = props;

  const { animationSettingValue, updateScroll, updateAnimationFrame } = useAnimationSettingValue();

  const name = `${classPrefix}-notice-bar`;

  const showExtraText = !!extra;
  const rootClasses = useMemo(() => cls([name, `${name}--${theme}`]), [name, theme]);

  const computedPrefixIcon: TdNoticeBarProps['prefixIcon'] | IconType | null = useMemo(() => {
    let temp = null;
    if (prefixIcon !== '') {
      if (Object.keys(defaultIcons).includes(theme)) {
        temp = defaultIcons[theme];
      }

      return prefixIcon || temp || null;
    }
    return null;
  }, [prefixIcon, theme]);

  const handleClick = useCallback(
    (trigger: NoticeBarTrigger) => {
      onClick?.(trigger);
    },
    [onClick],
  );

  const animateStyle = useMemo(
    () => ({
      transform: animationSettingValue.current.offset ? `translateX(${animationSettingValue.current.offset}px)` : '',
      transitionDuration: `${animationSettingValue.current.duration}s`,
      transitionTimingFunction: 'linear',
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [animationSettingValue.current.offset, animationSettingValue.current.duration],
  );

  const listDOM = useRef<HTMLDivElement | null>(null);
  const itemDOM = useRef<HTMLDivElement | null>(null);

  const [isShow] = useDefault(visible, defaultVisible, onChange);

  function handleScrolling() {
    // 过滤 marquee 为 false
    if (!marquee) {
      return;
    }
    // 过滤 loop 为 0
    if (typeof marquee !== 'boolean' && marquee?.loop === 0) {
      return;
    }

    let updateScrollState: ReturnType<typeof defaultReduceState>['scroll'] = defaultReduceState().scroll;

    // marquee 为 true 时，需要计算滚动的位置
    if (typeof marquee === 'boolean') {
      updateScrollState = {
        ...animationSettingValue.current.scroll,
        ...defaultReduceState().scroll,
        marquee: true,
      };
    } else {
      updateScrollState = {
        ...animationSettingValue.current.scroll,
        ...filterUndefinedValue(marquee),
        marquee: true,
      };
    }

    updateScroll(updateScrollState);

    setTimeout(() => {
      const listDOMWidth = listDOM.current?.getBoundingClientRect().width;
      const itemDOMWidth = itemDOM.current?.getBoundingClientRect().width;
      if (itemDOMWidth > listDOMWidth) {
        updateAnimationFrame({
          offset: -itemDOMWidth,
          duration: itemDOMWidth / animationSettingValue.current.scroll.speed,
          listWidth: listDOMWidth,
          itemWidth: itemDOMWidth,
        });
      }
    }, animationSettingValue.current.scroll.delay || 200);
  }

  function handleTransitionend() {
    const { listWidth, itemWidth, scroll } = animationSettingValue.current;
    const { loop, speed } = scroll;
    // 触发再次滚的
    const transitionLoop = loop - 1;
    if (transitionLoop === 0) {
      updateScroll({
        loop: transitionLoop,
        marquee: false,
      });
      return;
    }
    updateScroll({
      loop: transitionLoop,
    });

    updateAnimationFrame({
      offset: listWidth,
      duration: 0,
    });

    setTimeout(() => {
      updateAnimationFrame({
        offset: -itemWidth,
        duration: itemWidth / speed,
      });
    }, 0);
  }

  const listScrollDomCls = cls(`${name}__list`, {
    [`${name}__list--scrolling`]: animationSettingValue.current.scroll.marquee,
  });

  const listItemScrollDomCls = cls(`${name}__item`, {
    [`${name}__item-detail`]: showExtraText,
  });

  const renderPrefixIcon = useMemo(
    () =>
      computedPrefixIcon ? (
        <div className={`${name}__hd`} onClick={() => handleClick('prefix-icon')}>
          {computedPrefixIcon}
        </div>
      ) : null,
    [handleClick, name, computedPrefixIcon],
  );

  function onClickExtra(e: React.MouseEvent<HTMLSpanElement, MouseEvent>) {
    e.stopPropagation();
    handleClick('extra');
  }

  const itemDomStyle = animationSettingValue.current.scroll.marquee ? animateStyle : {};

  const hasBeenExecute = useRef(false);

  useEffect(() => {
    if (!hasBeenExecute.current) {
      if (isShow) {
        hasBeenExecute.current = true;
        handleScrolling();
      }
      return;
    }
    onChange?.(isShow);
    setTimeout(() => {
      if (isShow) {
        updateAnimationFrame({
          offset: animationSettingValue.current.listWidth,
          duration: 0,
        });
        handleScrolling();
      }
    }, 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isShow]);

  if (!isShow) {
    return null;
  }

  return (
    <div className={rootClasses}>
      <div className={`${name}__inner`}>
        {renderPrefixIcon}
        <div className={`${name}__bd`}>
          <div ref={listDOM} className={listScrollDomCls}>
            <div
              ref={itemDOM}
              className={listItemScrollDomCls}
              onTransitionEnd={handleTransitionend}
              style={itemDomStyle}
            >
              <span className={`${name}__text`} onClick={() => handleClick('content')}>
                {content}
                {showExtraText && (
                  <span className={`${name}__text-detail`} onClick={onClickExtra}>
                    {extra}
                  </span>
                )}
              </span>
            </div>
          </div>
        </div>

        {suffixIcon && (
          <div className={`${name}__ft`} onClick={() => handleClick('suffix-icon')}>
            {suffixIcon}
          </div>
        )}
      </div>
    </div>
  );
};

NoticeBar.displayName = 'NoticeBar';

export default NoticeBar;
