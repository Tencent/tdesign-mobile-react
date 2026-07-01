import React, { MouseEvent, ReactNode, useCallback, useMemo, useRef } from 'react';
import classNames from 'classnames';
import { ChevronDownIcon } from 'tdesign-icons-react';
import useClassName from './hooks/useClassName';
import type { TNode } from '../common';
import type { SortType } from './type';

type SortTypeEnums = Array<'desc' | 'asc'>;

export interface SorterButtonProps {
  sortType: SortType;
  sortOrder: string;
  sortIcon: TNode;
  hideSortTips?: boolean;
  onSortIconClick: (e: MouseEvent<HTMLSpanElement>, p: { descending: boolean }) => void;
}

export default function SorterButton(props: SorterButtonProps) {
  const { sortType = 'all' } = props;
  const { tableSortClasses, negativeRotate180 } = useClassName();
  const allowSortTypes: SortTypeEnums = useMemo(() => (sortType === 'all' ? ['asc', 'desc'] : [sortType]), [sortType]);
  const classes = useMemo(
    () => [tableSortClasses.trigger, { [tableSortClasses.doubleIcon]: allowSortTypes.length > 1 }],
    [allowSortTypes, tableSortClasses],
  );
  const clickSortTimes = useRef(0);

  const onSortIconClick = useCallback(
    (e: MouseEvent<HTMLSpanElement>) => {
      clickSortTimes.current += 1;
      const direction = allowSortTypes[clickSortTimes.current % 2];
      props?.onSortIconClick(e, { descending: direction === 'desc' });
    },
    [allowSortTypes, props],
  );

  function getSortIcon(direction: string, activeClass: string) {
    const defaultIcon = <ChevronDownIcon />;
    const icon = props.sortIcon || defaultIcon;
    const sortClassName = [
      activeClass,
      tableSortClasses.sortIcon,
      tableSortClasses.iconDirection[direction],
      { [negativeRotate180]: direction === 'asc' },
    ];
    return (
      <span key={direction} className={classNames(sortClassName)}>
        {icon as ReactNode}
      </span>
    );
  }

  const sortButton = allowSortTypes.map((direction: string) => {
    const activeClass = direction === props.sortOrder ? tableSortClasses.iconActive : tableSortClasses.iconDefault;
    return getSortIcon(direction, activeClass);
  });

  return (
    <div className={classNames(classes)} onClick={(e: MouseEvent<HTMLSpanElement>) => onSortIconClick(e)}>
      {sortButton}
    </div>
  );
}
