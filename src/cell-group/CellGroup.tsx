import React from 'react';
import classNames from 'classnames';
import useConfig from '../_util/useConfig';
import { TdCellGroupProps } from './type';
import withNativeProps, { NativeProps } from '../_util/withNativeProps';

export type CellGroupProps = TdCellGroupProps & NativeProps;

const defaultProps = {
  bordered: false,
  title: '',
};

const CellGroup: React.FC<CellGroupProps> = (props) => {
  const { children, bordered, title } = props;
  const { classPrefix } = useConfig();
  const name = `${classPrefix}-cell-group`;

  return withNativeProps(
    props,
    <div
      className={classNames(`${name}`, `${name}__container`, {
        'border--top-bottom': bordered,
      })}
    >
      {title && <div className={`${name}__title`}>{title}</div>}
      <div className={`${name}-body`}>{children}</div>
    </div>,
  );
};

CellGroup.defaultProps = defaultProps;
CellGroup.displayName = 'CellGroup';

export default CellGroup;
