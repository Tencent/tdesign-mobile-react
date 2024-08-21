import cls from 'classnames';
import React, { forwardRef, memo, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import { Icon } from 'tdesign-icons-react';
import type { StyledProps } from '../common';
import type { TdTabBarItemProps } from './type';
import { TabBarContext } from './TabBarContext';
import Badge from '../badge';
import useConfig from '../_util/useConfig';
import useTabBarCssTransition from './useTabBarCssTransition';
import parseTNode from '../_util/parseTNode';

export interface TabBarItemProps extends TdTabBarItemProps, StyledProps {}

const defaultBadgeOffset = [0, 0];
const defaultBadgeMaxCount = 99;

const TabBarItem = forwardRef<HTMLDivElement, TabBarItemProps>((props, ref) => {
  const { subTabBar, icon, badgeProps, value, children } = props;

  const hasSubTabBar = useMemo(() => !!subTabBar, [subTabBar]);
  const { defaultIndex, activeValue, updateChild, shape, split, theme, itemCount } = useContext(TabBarContext);

  const { classPrefix } = useConfig();

  const textNode = useRef<HTMLDivElement>(null);

  const [iconOnly, setIconOnly] = useState(false);

  // 组件每次 render 生成一个临时的当前组件唯一值
  const [currentName] = useState<undefined | number | string>(() => {
    if (value) {
      return value;
    }
    return (defaultIndex.current += 1);
  });

  useEffect(() => {
    const height = textNode?.current?.clientHeight;
    setIconOnly(Number(height) === 0);
  }, [textNode]);

  const componentName = `${classPrefix}-tab-bar-item`;

  const [isSpread, setIsSpread] = useState(false);

  const isChecked = useMemo(() => {
    if (hasSubTabBar && Array.isArray(activeValue)) {
      return activeValue.includes(currentName);
    }
    return currentName === activeValue;
  }, [currentName, activeValue, hasSubTabBar]);

  const mergedBadgeProps = useMemo(
    () => ({
      count: 0,
      dot: false,
      offset: defaultBadgeOffset,
      maxCount: defaultBadgeMaxCount,
      ...badgeProps,
    }),
    [badgeProps],
  );

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

  /** 拥挤否 */
  const crowded = itemCount > 3;

  const tabItemCls = cls(
    componentName,
    {
      [`${componentName}--split`]: split,
      [`${componentName}--text-only`]: !icon,
      [`${componentName}--crowded`]: crowded,
    },
    `${componentName}--${shape}`,
  );
  const tabItemInnerCls = cls(
    `${componentName}__content`,
    {
      [`${componentName}__content--checked`]: isChecked,
    },
    `${componentName}__content--${theme}`,
  );
  const tabItemIconCls = cls(`${componentName}__icon`);
  const tabItemSpreadCls = cls(`${componentName}__spread`);
  const tabItemSpreadItemCls = cls(`${componentName}__spread-item`);
  const tabItemTextCls = cls(`${componentName}__text`, {
    [`${componentName}__text--small`]: icon,
  });
  const tabItemIconMenuCls = cls(`${componentName}__icon-menu`);

  const transitionClsNames = useTabBarCssTransition({
    name: 'spread',
  });

  const iconSize = `${iconOnly ? 24 : 20}px`;

  const iconContent =
    icon &&
    React.cloneElement(icon, {
      style: { fontSize: iconSize },
    });

  return (
    <div className={tabItemCls} ref={ref}>
      <div
        role="tab"
        aria-label="TabBar"
        aria-selected={isChecked}
        aria-haspopup={shouldShowSubTabBar}
        className={tabItemInnerCls}
        onClick={toggle}
      >
        {icon && (
          <div className={tabItemIconCls} style={{ height: iconSize }}>
            {badgeProps && (badgeProps?.dot || badgeProps?.count) ? (
              <Badge content={iconContent} {...mergedBadgeProps} />
            ) : (
              iconContent
            )}
          </div>
        )}
        {children && (
          <div ref={textNode} className={tabItemTextCls}>
            {shouldShowSubTabBar && (
              <>
                <Icon name="view-list" size="16" />
                <div className={tabItemIconMenuCls} />
              </>
            )}
            {parseTNode(children)}
          </div>
        )}
      </div>

      <CSSTransition timeout={200} in={showSubTabBar} classNames={transitionClsNames} mountOnEnter unmountOnExit>
        <ul role="menu" className={tabItemSpreadCls}>
          {subTabBar?.map((child, index) => (
            <div
              key={child.value || index}
              role="menuitem"
              aria-label={child.label}
              className={tabItemSpreadItemCls}
              onClick={(e) => {
                e.stopPropagation();
                selectChild(child.value || index);
              }}
            >
              {index !== 0 && <div className={`${componentName}__spread-item-split`} />}
              <div className={`${componentName}__spread-item-text`}>{child.label}</div>
            </div>
          ))}
        </ul>
      </CSSTransition>
    </div>
  );
});

export default memo(TabBarItem);
