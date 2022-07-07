import React, { useMemo, useCallback } from 'react';
import classNames from 'classnames';
import isString from 'lodash/isString';
import { ChevronRightIcon } from 'tdesign-icons-react';

import { TdCellProps } from './type';
import { cellDefaultProps } from './defaultProps';
import withNativeProps, { NativeProps } from '../_util/withNativeProps';
import useConfig from '../_util/useConfig';

export interface CellProps extends TdCellProps, NativeProps {}

const Cell: React.FC<CellProps> = (props) => {
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
    url,
    onClick,
    children,
  } = props;

  const { classPrefix } = useConfig();

  const name = `${classPrefix}-cell`;

  const renderIcon = useMemo(() => {
    let content: React.ReactNode | null = null;
    if (arrow) {
      content = <ChevronRightIcon size={24} />;
    } else if (rightIcon) {
      content = rightIcon;
    }

    if (content === null) {
      return content;
    }

    return <div className={`${name}__right-icon`}>{content}</div>;
  }, [arrow, rightIcon, name]);

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      onClick && onClick({ e });
    },
    [onClick],
  );

  const content = (
    <div
      className={classNames([`${name}`, `${name}--${align}`], {
        [`${name}--bordered`]: bordered,
        [`${name}--hover`]: hover,
      })}
      onClick={handleClick}
    >
      {(leftIcon || image) && (
        <div className={`${name}__left-icon`}>
          {leftIcon}
          {isString(image) ? <img src={image} className={`${name}__image`} /> : image}
        </div>
      )}
      {title && (
        <div className={`${name}__title`}>
          {title}
          {required && <span className={`${name}--required`}>&nbsp;*</span>}
          {description && <div className={`${name}__description`}>{description}</div>}
        </div>
      )}
      {(note || children) && <div className={`${name}__note`}>{children ? children : note}</div>}
      {renderIcon}
    </div>
  );

  return withNativeProps(
    props,
    url ? (
      <a style={{ textDecoration: 'none' }} href={url} rel="noreferrer">
        {content}
      </a>
    ) : (
      content
    ),
  );
};

Cell.defaultProps = cellDefaultProps;
Cell.displayName = 'Cell';

export default Cell;
