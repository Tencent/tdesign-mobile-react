import React, { FC } from 'react';
import classNames from 'classnames';
import { TdDividerProps } from './type';
import useConfig from '../_util/useConfig';
import withNativeProps, { NativeProps } from '../_util/withNativeProps';

export interface DividerProps extends TdDividerProps, NativeProps {}

const defaultProps = {
  align: 'center',
  dashed: false,
  layout: 'horizontal',
  lineColor: '',
};

const Divider: FC<DividerProps> = (props) => {
  const { children, align, dashed, layout, lineColor, content } = props;
  const { classPrefix } = useConfig();
  const name = `${classPrefix}-divider`;
  const contentNode = content || children;

  const classes = classNames(name, {
    [`${name}-${layout}`]: layout,
    [`${name}--content-${align}`]: align && contentNode,
    [`${name}--dashed`]: dashed,
  });

  return withNativeProps(
    props,
    <div className={classes} style={lineColor ? { borderColor: lineColor } : undefined}>
      {contentNode && <span className={`${name}__content`}>{contentNode}</span>}
    </div>,
  );
};

Divider.defaultProps = defaultProps as DividerProps;
Divider.displayName = 'Divider';

export default Divider;
