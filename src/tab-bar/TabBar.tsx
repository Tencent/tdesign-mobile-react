import React, { forwardRef, memo, useMemo, useRef } from 'react';
import useConfig from 'tdesign-mobile-react/_util/useConfig';
import useDefault from 'tdesign-mobile-react/_util/useDefault';
import cls from 'classnames';
import type { StyledProps } from '../common';
import type { TdTabBarProps } from './type';
import { TabBarProvider } from './TabBarContext';

export interface TabBarProps extends TdTabBarProps, StyledProps {}

const TabBar = forwardRef<HTMLDivElement, TabBarProps>((props, ref) => {
  const { bordered, fixed, onChange, value, defaultValue } = props;
  const { classPrefix } = useConfig();
  const name = `${classPrefix}-tab-bar`;
  const [activeValue, onToggleActiveValue] = useDefault(value, defaultValue, onChange);

  const defaultIndex = useRef(-1);

  const updateChild = onToggleActiveValue;

  const tabBarClass = cls(name, {
    [`${name}--bordered`]: bordered,
    [`${name}--fixed`]: fixed,
  });

  const memoProviderValues = useMemo(
    () => ({
      defaultIndex,
      activeValue,
      updateChild,
    }),
    [defaultIndex, activeValue, updateChild],
  );

  return (
    <div className={tabBarClass} ref={ref}>
      <TabBarProvider value={memoProviderValues}>{props.children}</TabBarProvider>
    </div>
  );
});

TabBar.defaultProps = {
  bordered: true,
  fixed: true,
};

export default memo(TabBar);
