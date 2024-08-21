import React, { useState, MouseEvent, TouchEvent, useRef, useEffect } from 'react';
import isFunction from 'lodash/isFunction';
import throttle from 'lodash/throttle';
import { Cell, CellGroup } from '../cell';
import { TdIndexesProps, ListItem } from './type';
import { StyledProps } from '../common';
import useConfig from '../_util/useConfig';

const topOffset = 40; // 滑动选中高亮的顶部偏移(px)

export interface IndexesProps extends TdIndexesProps, StyledProps {}

const Indexes: React.FC<IndexesProps> = (props) => {
  const { height, list, onSelect, style } = props;

  const { classPrefix } = useConfig();
  const prefix = classPrefix;
  // 当前高亮index
  const [currentGroup, setCurrentGroup] = useState<ListItem | null>(null);
  // 是否展示index高亮提示
  const [showScrollTip, setShowScrollTip] = useState<boolean>(false);

  // 索引主列表的ref
  const indexesRef = useRef<HTMLDivElement>(null);
  // 存放tip消失的定时器
  const tipTimer = useRef(null);
  // 存放index组的scrollTop
  const groupTop = useRef([]);

  const handleSelect = (argv: { groupIndex: string; childrenIndex: number }) => {
    if (!isFunction(onSelect)) {
      return;
    }

    onSelect(argv);
  };

  const showTips = () => {
    setShowScrollTip(true);
    clearInterval(tipTimer.current);
    tipTimer.current = null;
    tipTimer.current = setTimeout(() => {
      setShowScrollTip(false);
    }, 2000);
  };

  const getCurrentTitleNode = (current?: ListItem) =>
    Array.from(document.getElementsByClassName(`${prefix}-indexes__index-${(current || currentGroup)?.index}`)).find(
      (x): x is HTMLElement => x instanceof HTMLElement,
    );

  const handleSideBarItemClick = (e: MouseEvent<HTMLDivElement>, listItem: ListItem) => {
    setCurrentGroup(listItem);
    showTips();
    getCurrentTitleNode(listItem).scrollIntoView();
  };

  const handleSideBarTouchMove = (e: TouchEvent<HTMLDivElement>) => {
    const { touches } = e;
    const { clientX, clientY } = touches[0];
    const target = document.elementFromPoint(clientX, clientY);

    // 触摸侧边index sidebar
    if (target && target.className.match(`${prefix}-indexes__sidebar-item`) && target instanceof HTMLElement) {
      const { index } = target.dataset;
      const listItem = list.find((element) => element.index === index);
      if (index !== undefined && currentGroup?.index !== index) {
        setCurrentGroup(listItem);
        showTips();
        getCurrentTitleNode(listItem).scrollIntoView();
      }
    }
  };

  const handleScroll = () => {
    // 滑动列表
    const { scrollTop } = indexesRef.current;

    const curIndex = groupTop.current.findIndex((element) => element - topOffset > scrollTop);

    if (curIndex > -1) {
      setCurrentGroup(list[curIndex]);
    }
  };

  const getDomInfo = () => {
    const groupItemDom = document.querySelectorAll('.t-indexes .t-cell-group__container');
    groupTop.current = Array.from(groupItemDom, (element) => element.clientHeight);
    groupTop.current.reduce((acc, cur, index) => {
      const amount = acc + cur;
      groupTop.current[index] = amount;

      return amount;
    });
  };

  useEffect(() => {
    getDomInfo();
  }, []);

  return (
    <div
      className={`${prefix}-indexes`}
      onScroll={throttle(handleScroll, 100)}
      style={{ height: height || window.innerHeight, ...style }}
      ref={indexesRef}
    >
      {list.map((listItem) => (
        <div className={`${prefix}-indexes__anchor ${prefix}-indexes__index-${listItem.index}`} key={listItem.index}>
          <div className={`${prefix}-indexes__title`}>{listItem.title}</div>
          <CellGroup>
            {listItem.children.map((element, index) => (
              <Cell
                title={element.title}
                key={element.title}
                onClick={() => handleSelect({ groupIndex: listItem.index, childrenIndex: index })}
                bordered={false}
              ></Cell>
            ))}
          </CellGroup>
        </div>
      ))}
      <div className={`${prefix}-indexes__sidebar`} onTouchMove={throttle(handleSideBarTouchMove, 100)}>
        {list.map((listItem) => (
          <div
            className={`${prefix}-indexes__sidebar-item ${
              currentGroup?.index === listItem.index ? `${prefix}-indexes__sidebar-item--active` : ''
            }`}
            data-index={listItem.index}
            key={listItem.index}
            onClick={(e) => handleSideBarItemClick(e, listItem)}
          >
            {listItem.index}
            {showScrollTip && currentGroup?.index === listItem.index && (
              <div className={`${prefix}-indexes__sidebar-tip`}>
                <div className={`${prefix}-indexes__sidebar-tip-text`}>{currentGroup?.index}</div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Indexes;
