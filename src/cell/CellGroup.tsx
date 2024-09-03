import React, { useMemo } from 'react';
import classnames from 'classnames';
import useConfig from '../_util/useConfig';
import { TdCellGroupProps } from './type';
import { cellGroupDefaultProps } from './defaultProps';
import withNativeProps, { NativeProps } from '../_util/withNativeProps';
import useDefaultProps from '../hooks/useDefaultProps';

export type CellGroupProps = TdCellGroupProps & NativeProps;

const CellGroup: React.FC<CellGroupProps> = (originProps) => {
  const props = useDefaultProps(originProps, cellGroupDefaultProps);
  const { children, bordered, title, theme } = props;
  const { classPrefix } = useConfig();
  const name = `${classPrefix}-cell-group`;

  const classNames = useMemo(
    () => [
      name,
      `${name}--${theme}`,
      {
        [`${name}--bordered`]: bordered,
      },
    ],
    [name, bordered, theme],
  );

  return withNativeProps(
    props,
    <div>
      {title && <div className={`${name}__title`}>{title}</div>}
      <div className={classnames(classNames)}>{children}</div>
    </div>,
  );
};

CellGroup.displayName = 'CellGroup';

export default CellGroup;
