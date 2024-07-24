import React, { FC } from 'react';
import classNames from 'classnames';
import { TdDividerProps } from './type';
import { dividerDefaultProps } from './defaultProps';
import { StyledProps } from '../common';
import useConfig from '../_util/useConfig';
import useDefaultProps from '../hooks/useDefaultProps';

export interface DividerProps extends TdDividerProps, StyledProps {}

const Divider: FC<DividerProps> = (props) => {
  const { children, align, dashed, layout, content, style } = useDefaultProps<DividerProps>(props, dividerDefaultProps);
  const { classPrefix } = useConfig();
  const dividerClass = `${classPrefix}-divider`;
  const contentNode = content || children;

  const classes = classNames(dividerClass, {
    [`${dividerClass}--${layout}`]: layout,
    [`${dividerClass}--${align}`]: align,
    [`${dividerClass}--dashed`]: dashed,
  });

  return (
    <div className={classes} style={style} role="separator">
      <div className={`${dividerClass}__content`}>{contentNode}</div>
    </div>
  );
};

Divider.displayName = 'Divider';

export default Divider;
