import React, { forwardRef, memo, useContext, useEffect } from 'react';
import cls from 'classnames';
import type { StyledProps } from '../common';
import type { TdSideBarItemProps } from './type';
import { SideBarContext } from './SideBarContext';
import Badge from '../badge';
import useConfig from '../_util/useConfig';
import parseTNode from '../_util/parseTNode';

export interface SideBarItemProps extends TdSideBarItemProps, StyledProps {}

const SideBarItem = forwardRef<HTMLDivElement, SideBarItemProps>((props, ref) => {
  const { badgeProps, disabled, icon, label, value } = props;
  const { relation, removeRelation, activeValue, onClickItem } = useContext(SideBarContext);

  const { classPrefix } = useConfig();
  const name = `${classPrefix}-side-bar-item`;

  useEffect(() => {
    relation(props);
    return () => {
      removeRelation(props);
    };
  }, [props, relation, removeRelation]);

  const isActive = activeValue === value;

  const onClick = () => {
    if (!disabled) onClickItem(value, label);
  };

  const isShowBadge = badgeProps?.count || badgeProps?.dot;

  return (
    <div
      ref={ref}
      className={cls(name, {
        [`${name}--active`]: isActive,
        [`${name}--disabled`]: disabled,
      })}
      onClick={onClick}
    >
      {isActive && (
        <div>
          <div className={`${name}__line`}></div>
          <div className={`${name}__prefix`}></div>
          <div className={`${name}__suffix`}></div>
        </div>
      )}
      {icon && <div className={`${name}__icon`}>{parseTNode(icon)}</div>}
      {isShowBadge ? <Badge content={label} {...badgeProps} /> : <div>{label}</div>}
    </div>
  );
});

export default memo(SideBarItem);
