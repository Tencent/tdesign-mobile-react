import React, { FC } from 'react';
import classNames from 'classnames';
import { TdDividerProps } from './type';
import useConfig from '../_util/useConfig';

const Divider: FC<TdDividerProps> = (props) => {
  const { children, align, dashed, layout, lineColor, content } = props;
  const { classPrefix } = useConfig();
  const name = `${classPrefix}-divider`;

  const classes = classNames(
    name,
    `${layout ? `${name}-${layout}` : ''}`,
    `${align ? `${name}--content-${align}` : ''}`,
    `${dashed ? `${name}--dashed` : ''}`,
  );

  const contentClass = classNames(`${name}__content`);
  const contentInfo = content || children;

  return (
    <div className={classes} style={lineColor ? { borderColor: lineColor } : {}}>
      {contentInfo ? <span className={contentClass}>{contentInfo}</span> : null}
    </div>
  );
};

export default Divider;
