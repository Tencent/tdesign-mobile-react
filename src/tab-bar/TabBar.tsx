import React, { forwardRef, memo, useMemo, useRef } from 'react';
import cls from 'classnames';
import useConfig from '../_util/useConfig';
import useDefault from '../_util/useDefault';
import type { StyledProps } from '../common';
import type { TdTabBarProps } from './type';
import { TabBarProvider } from './TabBarContext';

export interface TabBarProps extends TdTabBarProps, StyledProps {}

const TabBar = forwardRef<HTMLDivElement, TabBarProps>((props, ref) => {
  const { bordered, fixed, onChange, value, defaultValue, safeAreaInsetBottom, shape, split, theme } = props;
  const { classPrefix } = useConfig();
  const name = `${classPrefix}-tab-bar`;
  const [activeValue, onToggleActiveValue] = useDefault(value, defaultValue, onChange);

  const defaultIndex = useRef(-1);

  const updateChild = onToggleActiveValue;

  const tabBarClass = cls(
    name,
    {
      [`${name}--bordered`]: bordered,
      [`${name}--fixed`]: fixed,
      [`${name}--safe`]: safeAreaInsetBottom,
    },
    `${name}--${props.shape}`,
  );

  const itemCount = React.Children.count(props.children);

  const memoProviderValues = useMemo(
    () => ({
      defaultIndex,
      activeValue,
      updateChild,
      shape,
      split,
      theme,
      itemCount,
    }),
    [defaultIndex, activeValue, updateChild, shape, split, theme, itemCount],
  );

  return (
    <div className={tabBarClass} ref={ref} role="tablist">
      <TabBarProvider value={memoProviderValues}>{props.children}</TabBarProvider>
    </div>
  );
});

TabBar.defaultProps = {
  bordered: true,
  fixed: true,
  safeAreaInsetBottom: true,
  shape: 'normal',
  split: true,
  theme: 'normal',
};

export default memo(TabBar);
