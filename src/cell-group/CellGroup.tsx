import React, { useMemo } from 'react';
import classnames from 'classnames';
import useConfig from '../_util/useConfig';
import { TdCellGroupProps } from '../cell/type';
import withNativeProps, { NativeProps } from '../_util/withNativeProps';

export type CellGroupProps = TdCellGroupProps & NativeProps;

const defaultProps = {
  bordered: false,
  title: '',
};

const CellGroup: React.FC<CellGroupProps> = (props) => {
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

CellGroup.defaultProps = defaultProps;
CellGroup.displayName = 'CellGroup';

export default CellGroup;
