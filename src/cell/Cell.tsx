import React, { useMemo, useCallback } from 'react';
import classnames from 'classnames';
import isString from 'lodash/isString';
import { ChevronRightIcon } from 'tdesign-icons-react';

import { TdCellProps } from './type';
import { cellDefaultProps } from './defaultProps';
import withNativeProps, { NativeProps } from '../_util/withNativeProps';
import useDefaultProps from '../hooks/useDefaultProps';
import useHover from '../hooks/useHover';
import useConfig from '../_util/useConfig';

export interface CellProps extends TdCellProps, NativeProps {}

const Cell: React.FC<CellProps> = (originProps) => {
  const props = useDefaultProps(originProps, cellDefaultProps);
  const {
    align,
    arrow,
    bordered,
    description,
    hover,
    image,
    leftIcon,
    note,
    required,
    rightIcon,
    title,
    onClick,
    children,
  } = props;

  const { classPrefix } = useConfig();

  const name = `${classPrefix}-cell`;

  const classNames = useMemo(
    () => [
      `${name}`,
      `${name}--${align}`,
      {
        [`${name}--borderless`]: !bordered,
      },
    ],
    [align, bordered, name],
  );

  const hoverDisabled = useMemo(() => !hover, [hover]);
  const ref = useHover({ className: `${name}--hover`, disabled: hoverDisabled });

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      onClick && onClick({ e });
    },
    [onClick],
  );

  const readerImage = () => {
    if (isString(image)) {
      return <img src={image} className={`${name}__left-image`} />;
    }
    return image;
  };

  const readerLeft = () => (
    <div className={`${name}__left`}>
      {leftIcon && <div className={`${name}__left-icon`}>{leftIcon}</div>}
      {readerImage()}
    </div>
  );

  const readerTitle = () => {
    if (!title) {
      return null;
    }
    return (
      <div className={`${name}__title`}>
        {title}
        {required && <span className={`${name}--required`}>&nbsp;*</span>}
        {description && <div className={`${name}__description`}>{description}</div>}
      </div>
    );
  };
  const readerRight = () => {
    const Icon = arrow ? <ChevronRightIcon /> : rightIcon;
    if (!Icon) {
      return null;
    }
    return (
      <div className={`${name}__right`}>
        <div className={`${name}__right-icon`}>{Icon}</div>
      </div>
    );
  };

  return withNativeProps(
    props,
    <div ref={ref} className={classnames(classNames)} onClick={handleClick}>
      {readerLeft()}
      {readerTitle()}
      {note ? <div className={`${name}__note`}>{note}</div> : children}
      {readerRight()}
    </div>,
  );
};

Cell.displayName = 'Cell';

export default Cell;
