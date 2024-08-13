import classNames from 'classnames';
import React, { forwardRef } from 'react';
import { StyledProps } from '../common';
import { usePrefixClass } from '../hooks/useClass';
import useDefaultProps from '../hooks/useDefaultProps';
import { cascaderDefaultProps } from './defaultProps';
import { TdCascaderProps } from './type';

export interface CascaderProps extends TdCascaderProps, StyledProps {}

const Cascader = forwardRef<HTMLDivElement, CascaderProps>((props) => {
  const cascaderClass = usePrefixClass('cascader');

  const { className, style } =
    useDefaultProps<CascaderProps>(props, cascaderDefaultProps);

  return (
    <div
      className={classNames(cascaderClass, className)}
      style={style}
    >
      cascader
    </div>
  );
});

Cascader.displayName = 'Cascader';

export default Cascader;
