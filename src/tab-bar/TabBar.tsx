import React, { forwardRef, memo, useMemo, useRef } from 'react';
import cls from 'classnames';
import useDefault from '../_util/useDefault';
import type { StyledProps } from '../common';
import type { TdTabBarProps } from './type';
import { TabBarProvider } from './TabBarContext';
import parseTNode from '../_util/parseTNode';
import useDefaultProps from '../hooks/useDefaultProps';
import { usePrefixClass } from '../hooks/useClass';
import { tabBarDefaultProps } from './defaultProps';

export interface TabBarProps extends TdTabBarProps, StyledProps {}

const TabBar = forwardRef<HTMLDivElement, TabBarProps>((originProps, ref) => {
  const props = useDefaultProps(originProps, tabBarDefaultProps);
  const { bordered, fixed, onChange, value, defaultValue, safeAreaInsetBottom, shape, split, theme, children } = props;

  const tabBarClass = usePrefixClass('tab-bar');
  const [activeValue, onToggleActiveValue] = useDefault(value, defaultValue, onChange);

  const defaultIndex = useRef(-1);

  const updateChild = onToggleActiveValue;

  const itemCount = React.Children.count(parseTNode(children));

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
    <div
      className={cls(
        tabBarClass,
        {
          [`${tabBarClass}--bordered`]: bordered,
          [`${tabBarClass}--fixed`]: fixed,
          [`${tabBarClass}--safe`]: safeAreaInsetBottom,
        },
        `${tabBarClass}--${props.shape}`,
      )}
      ref={ref}
      role="tablist"
    >
      <TabBarProvider value={memoProviderValues}>{parseTNode(children)}</TabBarProvider>
    </div>
  );
});

export default memo(TabBar);
