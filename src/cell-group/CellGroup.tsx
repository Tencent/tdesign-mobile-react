import React from 'react';
import classNames from 'classnames';
import { TdCellGroupProps } from './type';

const prefix = 't';
const name = `${prefix}-cell-group`;

const CellGroup: React.FC<TdCellGroupProps> = (prop) => {
  const { children, bordered = false, title = '' } = prop;

  return (
    <>
      <div className={classNames(`${name}`, `${name}__container`, { 'border--top-bottom': bordered })}>
        {title && <div className={`${name}__title`}>{title}</div>}
        <div className={`${name}-body`}>{children}</div>
      </div>
    </>
  );
};

export default CellGroup;
