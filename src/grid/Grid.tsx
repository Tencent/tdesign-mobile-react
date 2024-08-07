import React, { forwardRef, useMemo } from 'react';
import cls from 'classnames';
import { TdGridProps } from './type';
import useConfig from '../_util/useConfig';

import { GirdProvider } from './GridContext';
import { gridDefaultProps } from './defaultProps';
import { StyledProps } from '../common';

export interface GridProps extends TdGridProps, StyledProps {
  children: React.ReactNode;
}

const Grid = forwardRef<HTMLDivElement, GridProps>((props, ref) => {
  const { children, align, border, column, gutter, theme, className, style } = props;
  const { classPrefix } = useConfig();
  const name = `${classPrefix}-grid`;

  const rootStyle = useMemo(() => {
    if (column === 0) return {};
    const ans = {
      padding: `${gutter}px`,
      gridTemplateColumns: `repeat(${column}, 1fr)`,
      gridGap: `${gutter}px`,
      ...style,
    };

    return ans;
  }, [column, gutter, style]);

  return (
    <GirdProvider gutter={gutter} border={border} column={column} align={align} theme={theme}>
      <div
        ref={ref}
        className={cls(name, className, {
          [`${name}--card`]: theme === 'card',
          [`${name}--auto-size`]: column === 0,
          [`${name}--bordered`]: border && !gutter,
        })}
        style={rootStyle}
      >
        {children}
      </div>
    </GirdProvider>
  );
});

Grid.displayName = 'Grid';
Grid.defaultProps = gridDefaultProps;

export default Grid;
