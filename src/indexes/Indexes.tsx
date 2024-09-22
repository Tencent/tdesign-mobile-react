import React, { useState, useRef, useEffect, useMemo } from 'react';
import throttle from 'lodash/throttle';
import cls from 'classnames';
import { TdIndexesProps } from './type';
import { StyledProps } from '../common';
import useDefaultProps from '../hooks/useDefaultProps';
import parseTNode from '../_util/parseTNode';
import { usePrefixClass } from '../hooks/useClass';
import { indexesDefaultProps } from './defaultProps';
import { IndexesProrvider } from './IndexesContext';

export interface IndexesProps extends TdIndexesProps, StyledProps {}

interface GroupTop {
  height: number;
  top: number;
  anchor: string | number;
  totalHeight: number;
}

interface ChildNodes {
  ele: HTMLElement;
  anchor: string | number;
}

const Indexes: React.FC<IndexesProps> = (props) => {
  const { indexList, className, style, sticky, stickyOffset, children, onChange, onSelect } = useDefaultProps(
    props,
    indexesDefaultProps,
  );

  const indexesClass = usePrefixClass('indexes');

  // 当前高亮index
  const [activeSidebar, setActiveSidebar] = useState<string | number>(null);
  // 是否展示index高亮提示
  const [showSidebarTip, setShowSidebarTip] = useState<boolean>(false);

  // 索引主列表的ref
  const indexesRef = useRef<HTMLDivElement>(null);
  const sidebarRef = useRef<HTMLDivElement>(null);
  // 存放tip消失的定时器
  const tipTimer = useRef(null);
  // 存放 anchor 组的scrollTop
  const groupTop = useRef<GroupTop[]>([]);

  const childNodes = useRef<ChildNodes[]>([]);
  const parentRect = useRef({ top: 0 });

  const indexListMemo = useMemo(() => {
    if (!indexList) {
      const start = 'A'.charCodeAt(0);
      const alphabet = [];
      for (let i = start, end = start + 26; i < end; i += 1) {
        alphabet.push(String.fromCharCode(i));
      }
      return alphabet;
    }
    return indexList;
  }, [indexList]);

  const setAnchorOnScroll = (top: number) => {
    let scrollTop = top;
    if (!groupTop.current.length) return;
    const stickyTop = stickyOffset + parentRect.current.top;
    scrollTop += stickyTop;
    const curIndex = groupTop.current.findIndex(
      (group) => scrollTop >= group.top - group.height && scrollTop <= group.top + group.totalHeight - group.height,
    );
    setActiveSidebar(groupTop.current[0].anchor);
    if (curIndex === -1) return;
    const curGroup = groupTop.current[curIndex];
    setActiveSidebar(curGroup.anchor);
    if (sticky) {
      const offset = curGroup.top - scrollTop;
      const betwixt = offset < curGroup.height && offset > 0 && scrollTop > stickyTop;
      childNodes.current.forEach((child, index) => {
        const { ele } = child;
        const wrapperClass = `${indexesClass}-anchor__wrapper`;
        const headerClass = `${indexesClass}-anchor__header`;
        const wrapper = ele.querySelector<HTMLElement>(`.${wrapperClass}`);
        const header = ele.querySelector<HTMLElement>(`.${headerClass}`);
        if (index === curIndex) {
          if (scrollTop - parentRect.current.top > stickyOffset) {
            wrapper.classList.add(`${wrapperClass}--sticky`);
          } else {
            wrapper.classList.remove(`${wrapperClass}--sticky`);
          }
          wrapper.classList.add(`${wrapperClass}--active`);
          header.classList.add(`${headerClass}--active`);
          wrapper.style.cssText = `transform: translate3d(0, ${betwixt ? offset : 0}px, 0); top: ${stickyTop}px`;
        } else if (index + 1 === curIndex) {
          wrapper.classList.add(`${wrapperClass}--sticky`);
          wrapper.classList.add(`${wrapperClass}--active`);
          header.classList.add(`${headerClass}--active`);
          wrapper.style.cssText = `transform: translate3d(0, ${betwixt ? offset - groupTop.current[index].height : 0}px, 0); top: ${stickyTop}px;`;
        } else {
          wrapper.classList.remove(`${wrapperClass}--sticky`);
          wrapper.classList.remove(`${wrapperClass}--active`);
          header.classList.remove(`${headerClass}--active`);
          wrapper.style.cssText = '';
        }
      });
    }
  };

  const scrollToByIndex = (index: number | string) => {
    const curGroup = groupTop.current.find((item) => item.anchor === index);
    if (indexesRef.current) {
      indexesRef.current.scrollTo?.(0, curGroup.top ?? 0);
    }
  };

  const setActiveSidebarAndTip = (index: string | number) => {
    setActiveSidebar(index);
    setShowSidebarTip(true);
  };

  const handleSidebarItemClick = (index: string | number) => {
    onSelect?.(index);
    setActiveSidebarAndTip(index);
    scrollToByIndex(index);
  };

  const handleRootScroll = () => {
    const scrollTop = indexesRef.current?.scrollTop ?? 0;
    setAnchorOnScroll(scrollTop);
  };

  const getAnchorsRect = () => {
    childNodes.current.map((child) => {
      const { ele, anchor } = child;
      // const { index } = dataset;
      const rect = ele.getBoundingClientRect();
      groupTop.current.push({
        height: rect.height,
        top: rect.top - parentRect.current.top,
        anchor,
        totalHeight: 0,
      });
      return child;
    });
  };
  const handleSidebarTouchmove = (event: TouchEvent) => {
    event.preventDefault();
    const { touches } = event;
    const { clientX, clientY } = touches[0];
    const target = document.elementFromPoint(clientX, clientY);
    if (target && target.className === `${indexesClass}__sidebar-item` && target instanceof HTMLElement) {
      const { index } = target.dataset;
      const curIndex = indexListMemo.find((idx) => String(idx) === index);
      if (curIndex !== undefined && activeSidebar !== index) {
        setActiveSidebarAndTip(curIndex);
        scrollToByIndex(curIndex);
      }
    }
  };

  const relation = (ele: HTMLElement, anchor: string | number) => {
    ele && childNodes.current.push({ ele, anchor });
  };

  useEffect(() => {
    const clearSidebarTip = (): void => {
      if (showSidebarTip && activeSidebar !== null) {
        tipTimer.current && clearTimeout(tipTimer.current);
        tipTimer.current = window.setTimeout(() => {
          setShowSidebarTip(false);
        }, 1000);
      }
    };
    if (showSidebarTip) {
      clearSidebarTip();
    }
  }, [showSidebarTip, activeSidebar]);

  useEffect(() => {
    onChange?.(activeSidebar);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeSidebar]);

  useEffect(() => {
    parentRect.current = indexesRef.current?.getBoundingClientRect() || { top: 0 };
    getAnchorsRect();
    groupTop.current.forEach((item, index) => {
      const next = groupTop.current[index + 1];
      // eslint-disable-next-line no-param-reassign
      item.totalHeight = (next?.top || Infinity) - item.top;
    });
    setAnchorOnScroll(0);

    // https://github.com/facebook/react/pull/19654
    // react 中 onTouchMove 等事件默认使用 passive： true，导致无法在listener 中使用 preventDefault()
    const sideBar = sidebarRef.current;
    sideBar && sideBar.addEventListener('touchmove', handleSidebarTouchmove, { passive: false });

    return () => {
      tipTimer.current && clearTimeout(tipTimer.current);
      sideBar && sideBar.removeEventListener('touchmove', handleSidebarTouchmove);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <IndexesProrvider value={{ relation }}>
      <div
        className={cls(indexesClass, className)}
        onScroll={throttle(handleRootScroll, 1000 / 30)}
        style={{ ...style }}
        ref={indexesRef}
      >
        <div ref={sidebarRef} className={`${indexesClass}__sidebar`}>
          {indexListMemo.map((listItem) => (
            <div
              className={cls(`${indexesClass}__sidebar-item`, {
                [`${indexesClass}__sidebar-item--active`]: activeSidebar === listItem,
              })}
              key={listItem}
              data-index={listItem}
              onClick={(e) => {
                e.preventDefault();
                handleSidebarItemClick(listItem);
              }}
            >
              {listItem}
              {showSidebarTip && activeSidebar === listItem && (
                <div className={`${indexesClass}__sidebar-tips`}>{activeSidebar}</div>
              )}
            </div>
          ))}
        </div>
        {parseTNode(children)}
      </div>
    </IndexesProrvider>
  );
};

Indexes.displayName = 'Link';

export default Indexes;
