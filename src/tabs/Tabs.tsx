import React, { useEffect, useMemo, useRef, useState } from 'react';
import classnames from 'classnames';
import type { FC, HTMLAttributes, CSSProperties } from 'react';
import Sticky from '../sticky';
import Badge from '../badge';
import { TdTabPanelProps, TdTabsProps } from './type';
import TabPanel from './TabPanel';
import useConfig from '../_util/useConfig';
import { usePrefixClass } from '../hooks/useClass';
import useDefaultProps from '../hooks/useDefaultProps';
import { tabsDefaultProps } from './defaultProps';
import parseTNode from '../_util/parseTNode';
import TabContext from './context';

type TabsHTMLAttrs = Pick<HTMLAttributes<HTMLDivElement>, 'className' | 'style'>;
export interface TabsProps extends TdTabsProps, TabsHTMLAttrs {}

const Tabs: FC<TabsProps> = (props) => {
  const {
    bottomLineMode,
    children,
    list,
    animation,
    spaceEvenly,
    showBottomLine,
    size,
    theme,
    stickyProps,
    swipeable,
    onChange,
    onClick,
    onScroll,
    value,
    defaultValue,
  } = useDefaultProps<TabsProps>(props, tabsDefaultProps);
  const tabsClass = usePrefixClass('tabs');
  const tabsClasses = useMemo(
    () =>
      classnames({
        [tabsClass]: true,
        [`${size}`]: size,
      }),
    [size, tabsClass],
  );

  const itemProps = useMemo<Array<TdTabPanelProps>>(() => {
    if (list && list.length > 0) {
      return list;
    }

    const propsArr = [];

    React.Children.forEach(children, (child: JSX.Element) => {
      if (child.type.displayName === TabPanel.displayName) {
        propsArr.push(child.props);
      }
    });

    return propsArr;
  }, [list, children]);

  const [activeKey, setActiveKey] = useState<number | string>(
    defaultValue || defaultValue === 0 ? defaultValue : value,
  );
  const [lineStyle, setLineStyle] = useState({});
  const { classPrefix } = useConfig();
  const activeClass = `${tabsClass}__item--active`;
  const navScrollRef = useRef<HTMLDivElement>(null);
  const navWrapRef = useRef<HTMLDivElement>(null);
  const navLineRef = useRef<HTMLDivElement>(null);

  const [startX, setStartX] = useState(0);
  const [startY, setStartY] = useState(0);
  const [endX, setEndX] = useState(0);
  const [endY, setEndY] = useState(0);
  const [canMove, setCanMove] = useState(true);
  const tabIndex = useMemo(() => {
    let index = 0;
    for (let i = 0; i < itemProps.length; i++) {
      if (itemProps[i].value === activeKey) {
        index = i;
        break;
      }
    }
    return index;
  }, [activeKey, itemProps]);

  const currentIndex = useMemo(() => itemProps.map((p) => p.value).indexOf(activeKey), [activeKey, itemProps]);

  const moveToActiveTab = () => {
    if (navWrapRef.current && navLineRef.current && showBottomLine) {
      const tab = navWrapRef.current.querySelector<HTMLElement>(`.${activeClass}`);
      if (!tab) return;
      const line = navLineRef.current;
      const tabInner = tab.querySelector<HTMLElement>(`.${classPrefix}-badge`);
      const style: CSSProperties = {};
      if (bottomLineMode === 'auto') {
        style.width = `${Number(tabInner?.offsetWidth)}px`;
        style.transform = `translateX(${Number(tab?.offsetLeft) + Number(tabInner?.offsetLeft)}px)`;
      } else if (bottomLineMode === 'full') {
        style.width = `${Number(tab?.offsetWidth)}px`;
        style.transform = `translateX(${Number(tab?.offsetLeft)}px)`;
      } else {
        style.transform = `translateX(${
          Number(tab?.offsetLeft) + (Number(tab?.offsetWidth) - Number(line?.offsetWidth)) / 2
        }px)`;
      }

      if (animation) {
        style.transitionDuration = `${animation.duration}ms`;
      }

      setLineStyle(style);
    }
  };

  const handleTabClick = (item: TdTabPanelProps) => {
    const { value, disabled } = item;
    if (disabled || activeKey === value) {
      return false;
    }
    setActiveKey(item.value);
    if (onChange) {
      onChange(item.value, parseTNode(item.label).toString());
    }
    if (onClick) {
      onClick(item.value, parseTNode(item.label).toString());
    }
    setTimeout(() => {
      moveToActiveTab();
    }, 0);
  };

  const handlerScroll = (context: { scrollTop: number; isFixed: boolean }) => {
    const { scrollTop, isFixed } = context;
    if (stickyProps) {
      onScroll?.(scrollTop, isFixed);
    }
  };

  // 手势滑动开始
  const handleTouchstart = (e: React.TouchEvent) => {
    if (!swipeable) return;
    setStartX(e.targetTouches[0].clientX);
    setStartY(e.targetTouches[0].clientY);
  };

  const handleTouchmove = (e: React.TouchEvent) => {
    if (!swipeable) return;
    if (!canMove) return;
    setEndX(e.targetTouches[0].clientX);
    setEndY(e.targetTouches[0].clientY);

    const dValueX = Math.abs(startX - endX);
    const dValueY = Math.abs(startY - endY);
    if (tabIndex >= 0 && tabIndex < itemProps.length) {
      if (dValueX > dValueY) {
        // if (typeof e.cancelable !== 'boolean' || e.cancelable) {
        //   e.preventDefault();
        // }
        if (dValueX <= 40) return;
        if (startX > endX) {
          // 向左划
          if (tabIndex >= itemProps.length - 1) return;
          setCanMove(false);
          handleTabClick(itemProps[tabIndex + 1]);
        } else if (startX < endX) {
          // 向右划
          if (tabIndex <= 0) return;
          setCanMove(false);
          handleTabClick(itemProps[tabIndex - 1]);
        }
      }
    }
  };

  // 手势滑动结束
  const handleTouchend = () => {
    if (!swipeable) return;
    setCanMove(true);
    setStartX(0);
    setEndX(0);
    setStartY(0);
    setEndY(0);
  };

  useEffect(() => {
    window.addEventListener('resize', moveToActiveTab, false);
    const timeout = setTimeout(() => {
      moveToActiveTab();
    }, 300);

    return () => {
      window.removeEventListener('resize', moveToActiveTab);
      clearTimeout(timeout);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setTimeout(() => {
      moveToActiveTab();
    }, 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  const renderNav = () =>
    itemProps.map((item, index) => {
      const { badgeProps } = item;
      return (
        <div
          key={item.value}
          className={classnames({
            [`${tabsClass}__item ${tabsClass}__item--top`]: true,
            [`${tabsClass}__item--evenly`]: spaceEvenly,
            [`${activeClass}`]: item.value === activeKey,
            [`${tabsClass}__item--disabled`]: item.disabled,
            [`${tabsClass}__item--${theme}`]: true,
          })}
          onClick={() => handleTabClick(item)}
        >
          <Badge {...badgeProps}>
            <div
              className={classnames({
                [`${tabsClass}__item-inner ${tabsClass}__item-inner--${theme}`]: true,
                [`${tabsClass}__item-inner--active`]: theme === 'tag' && item.value === activeKey,
              })}
            >
              <div>{parseTNode(item.label)}</div>
            </div>
          </Badge>
          {theme === 'card' && index === currentIndex - 1 && <div className={`${tabsClass}__item-prefix`}></div>}
          {theme === 'card' && index === currentIndex + 1 && <div className={`${tabsClass}__item-suffix`}></div>}
        </div>
      );
    });

  return (
    <div className={tabsClasses}>
      <Sticky {...stickyProps} onScroll={handlerScroll}>
        <div className={`${tabsClass}__nav`}>
          <div
            ref={navScrollRef}
            className={`${tabsClass}__scroll ${tabsClass}__scroll--top ${tabsClass}__scroll--${theme}`}
          >
            <div ref={navWrapRef} className={`${tabsClass}__wrapper ${tabsClass}__wrapper--${theme}`}>
              {renderNav()}
              {theme === 'line' && showBottomLine && (
                <div
                  ref={navLineRef}
                  style={lineStyle}
                  className={`${tabsClass}__track ${tabsClass}__track--top`}
                ></div>
              )}
            </div>
          </div>
        </div>
      </Sticky>
      <div
        className={`${tabsClass}__content`}
        onTouchStart={handleTouchstart}
        onTouchMove={handleTouchmove}
        onTouchEnd={handleTouchend}
      >
        <TabContext.Provider value={{ activeKey }}>{children}</TabContext.Provider>
      </div>
    </div>
  );
};
Tabs.displayName = 'Tabs';
export default Tabs;
