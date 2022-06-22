import React, { forwardRef } from 'react';
import { TdGridProps } from './type';
import useConfig from '../_util/useConfig';

import { GirdProvider } from './GridContext';
import { gridDefaultProps } from './defaultProps';

export interface GridProps extends TdGridProps {
  children: React.ReactNode;
}

const Grid = forwardRef<HTMLDivElement, GridProps>((props, ref) => {
  const { children, align, border, column, gutter } = props;
  const { classPrefix } = useConfig();
  const name = `${classPrefix}-grid`;

  return (
    <GirdProvider gutter={gutter} border={border} column={column} align={align}>
      <div ref={ref} className={name}>
        {children}
      </div>
    </GirdProvider>
  );
});

Grid.displayName = 'Grid';
Grid.defaultProps = gridDefaultProps;

export default Grid;
