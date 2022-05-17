import cls from 'classnames';
import React, { forwardRef, memo, useContext, useEffect, useMemo, useState } from 'react';

import { CSSTransition } from 'react-transition-group';
import type { StyledProps } from '../common';
import type { TdTabBarItemProps } from './type';
import { TabBarContext } from './TabBarContext';
import Badge from '../badge';
import useConfig from '../_util/useConfig';
import useTabBarCssTransition from './useTabBarCssTransition';

export interface TabBarItemProps extends TdTabBarItemProps, StyledProps {}

const defaultBadgeOffset = [0, 5];
const defaultBadgeMaxCount = 99;

const TabBarItem = forwardRef<HTMLDivElement, TabBarItemProps>((props, ref) => {
  const { subTabBar, icon, badgeProps, value, children } = props;

  const hasSubTabBar = useMemo(() => !!subTabBar, [subTabBar]);
  const { defaultIndex, activeValue, updateChild } = useContext(TabBarContext);
  // 组件每次 render 生成一个临时的当前组件唯一值
  const [currentName] = useState<undefined | number | string>(() => {
    if (value) {
      return value;
    }
    return (defaultIndex.current += 1);
  });

  const { classPrefix } = useConfig();

  const componentName = `${classPrefix}-tab-bar-item`;

  const [isSpread, setIsSpread] = useState(false);

  const isChecked = useMemo(() => {
    if (hasSubTabBar && Array.isArray(activeValue)) {
      return activeValue.includes(currentName);
    }
    return currentName === activeValue;
  }, [currentName, activeValue, hasSubTabBar]);

  useEffect(() => {
    if (!isChecked) {
      setIsSpread(() => false);
    }
  }, [isChecked]);

  const isToggleCurrent = useMemo(
    () => Array.isArray(activeValue) && activeValue[0] === currentName,
    [activeValue, currentName],
  );

  const shouldShowSubTabBar = useMemo(() => subTabBar && Array.isArray(subTabBar) && subTabBar.length > 0, [subTabBar]);
  const showSubTabBar = useMemo(() => shouldShowSubTabBar && isSpread, [shouldShowSubTabBar, isSpread]);

  const toggle = () => {
    if (hasSubTabBar) {
      setIsSpread(true);

      if (!isToggleCurrent) {
        updateChild([currentName]);
      }
      return;
    }

    updateChild(currentName);
  };

  const selectChild = (childName: number | string) => {
    if (!(Array.isArray(activeValue) && activeValue[1] === childName)) {
      updateChild([currentName, childName]);
    }
    setIsSpread(() => false);
  };

  const tabItemCls = cls(componentName, {
    [`${classPrefix}-no-border`]: icon,
  });
  const tabItemInnerCls = cls(`${componentName}__content`, {
    [`${classPrefix}-is-checked`]: isChecked,
    [`${componentName}--onlytext`]: !icon,
  });
  const tabItemIconCls = cls(`${componentName}__icon`);
  const tabItemSpreadCls = cls(`${componentName}__spread`);
  const tabItemSpreadItemCls = cls(`${componentName}__spread-item`);
  const tabItemTextCls = cls(`${componentName}__text`);
  const tabItemIconMenuCls = cls(`${componentName}__icon-menu`);

  const transitionClsNames = useTabBarCssTransition({
    name: 'spread',
  });

  return (
    <div
      role="tab"
      aria-label="TabBar"
      aria-selected={isChecked}
      aria-haspopup={shouldShowSubTabBar}
      className={tabItemCls}
      ref={ref}
    >
      <div className={tabItemInnerCls} onClick={toggle}>
        {icon && (
          <div className={tabItemIconCls}>
            {badgeProps && (badgeProps?.dot || badgeProps?.count) ? (
              <Badge
                content={icon}
                {...badgeProps}
                maxCount={badgeProps.maxCount || defaultBadgeMaxCount}
                offset={badgeProps.offset || defaultBadgeOffset}
              />
            ) : (
              icon
            )}
          </div>
        )}
        {children && (
          <div className={tabItemTextCls}>
            {shouldShowSubTabBar && <div className={tabItemIconMenuCls} />}
            {children}
          </div>
        )}

        <CSSTransition timeout={200} in={showSubTabBar} classNames={transitionClsNames} mountOnEnter unmountOnExit>
          <ul role="menu" className={tabItemSpreadCls}>
            {subTabBar?.map((child, index) => (
              <li
                key={child.value || index}
                role="menuitem"
                aria-label={child.label}
                className={tabItemSpreadItemCls}
                onClick={(e) => {
                  e.stopPropagation();
                  selectChild(child.value || index);
                }}
              >
                {child.label}
              </li>
            ))}
          </ul>
        </CSSTransition>
      </div>
    </div>
  );
});

export default memo(TabBarItem);
