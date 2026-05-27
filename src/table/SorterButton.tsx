import React, { ReactNode, useMemo } from 'react';
import classNames from 'classnames';
import { ChevronDownIcon } from 'tdesign-icons-react';
import { SortType } from './type';
import { TNode } from '../common';
import useClassName from './hooks/useClassName';
import { useLocaleReceiver } from '../locale/LocalReceiver';

export type SortTypeEnums = Array<'desc' | 'asc'>;

export interface SorterButtonProps {
  sortType: SortType;
  sortOrder: string;
  sortIcon: TNode;
  hideSortTips?: boolean;
  onSortIconClick: (e: React.MouseEvent<HTMLDivElement, MouseEvent>, p: { descending: boolean }) => void;
}

export default function SorterButton(props: SorterButtonProps) {
  const { sortType = 'all' } = props;
  const { tableSortClasses, negativeRotate180 } = useClassName();
  const [locale] = useLocaleReceiver('table');
  const allowSortTypes: SortTypeEnums = useMemo(() => (sortType === 'all' ? ['asc', 'desc'] : [sortType]), [sortType]);
  const classes = useMemo(
    () => [tableSortClasses.trigger, { [tableSortClasses.doubleIcon]: allowSortTypes.length > 1 }],
    [allowSortTypes, tableSortClasses],
  );

  const onSortIconClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>, direction: string) => {
    props.onSortIconClick(e, { descending: direction === 'desc' });
  };

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
      <span
        key={direction}
        className={classNames(sortClassName)}
        onClick={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) => onSortIconClick(e, direction)}
      >
        {icon as ReactNode}
      </span>
    );
  }

  const renderSortButtonContent = allowSortTypes.map((direction: string) => {
    const activeClass = direction === props.sortOrder ? tableSortClasses.iconActive : tableSortClasses.iconDefault;
    if (props.hideSortTips ?? locale.hideSortTips) {
      return getSortIcon(direction, activeClass);
    }
    return null;
  });

  return <div className={classNames(classes)}>{renderSortButtonContent}</div>;
}
