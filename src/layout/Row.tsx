import React, { createContext, forwardRef, useMemo } from 'react';
import classNames from 'classnames';

import type { TdRowProps } from './type';

import { NativeProps } from '../_util/withNativeProps';

import useConfig from '../_util/useConfig';
import { convertUnit } from '../_util/convertUnit';
import parseTNode from '../_util/parseTNode';

export interface RowProps extends TdRowProps, NativeProps {
  /**
   * 默认子元素内容
   */
  children?: React.ReactNode;
}

export const RowContext = createContext<{ gutter: RowProps['gutter'] }>({ gutter: undefined });

const Row = forwardRef<HTMLDivElement, RowProps>((props, ref) => {
  const { children, className = '', gutter, style } = props;
  const { classPrefix } = useConfig();
  const prefix = classPrefix;

  const computedStyle = useMemo(() => {
    const mergedStyle = { ...style };
    if (!gutter) {
      return mergedStyle;
    }

    const gutterVal = convertUnit(-gutter / 2);

    mergedStyle.marginRight = gutterVal;
    mergedStyle.marginLeft = gutterVal;

    return mergedStyle;
  }, [gutter, style]);

  return (
    <div className={classNames([`${prefix}-row`], className)} ref={ref} style={computedStyle}>
      <RowContext.Provider value={{ gutter }}>{parseTNode(children)}</RowContext.Provider>
    </div>
  );
});

export default Row;
