import React from 'react';
import classNames from 'classnames';
import useConfig from '../_util/useConfig';
import { TdCellGroupProps } from './type';

const CellGroup: React.FC<TdCellGroupProps> = (prop) => {
  const { children, bordered = false, title = '' } = prop;
  const { classPrefix } = useConfig();

  return (
    <>
      <div
        className={classNames(`${classPrefix}-cell-group`, `${classPrefix}-cell-group__container`, {
          'border--top-bottom': bordered,
        })}
      >
        {title && <div className={`${classPrefix}-cell-group__title`}>{title}</div>}
        <div className={`${classPrefix}-cell-group-body`}>{children}</div>
      </div>
    </>
  );
};

export default CellGroup;
