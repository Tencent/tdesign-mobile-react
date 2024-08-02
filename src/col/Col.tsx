import React, { forwardRef, useContext } from 'react';
import classNames from 'classnames';

import { TdColProps } from './type';
import { colDefaultProps } from './defaultProps';

import useConfig from '../_util/useConfig';
import { NativeProps } from '../_util/withNativeProps';
import { convertUnit, RowContext, RowProps } from '../row/Row';

export interface ColProps extends TdColProps, NativeProps {
  children?: React.ReactNode;
}

const calcColPadding = (gutter: RowProps['gutter']) => {
  const styles: React.CSSProperties = {};

  if (!gutter) {
    return styles;
  }
  const gutterVal = convertUnit(Number(gutter) / 2);
  styles.paddingRight = gutterVal;
  styles.paddingLeft = gutterVal;
  return styles;
};

const Col = forwardRef<HTMLDivElement, ColProps>((props, ref) => {
  const { offset, span, className, children, style: propStyle } = props;
  const { classPrefix } = useConfig();

  const { gutter } = useContext<{ gutter: RowProps['gutter'] }>(RowContext);

  const colClassNames = classNames(`${classPrefix}-col`, className, {
    [`${classPrefix}-col--${span}`]: span !== undefined,
    [`${classPrefix}-col--offset-${offset}`]: parseInt(offset as string, 10) >= 0,
  });

  const colStyle = {
    ...calcColPadding(gutter),
    ...propStyle,
  };

  return (
    <div className={colClassNames} ref={ref} style={colStyle}>
      {children}
    </div>
  );
});

Col.displayName = 'Col';
Col.defaultProps = colDefaultProps;

export default Col;
