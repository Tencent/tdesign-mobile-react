import React from 'react';
import classNames from 'classnames';
import identity from 'lodash/identity';
import isString from 'lodash/isString';
import { Icon } from 'tdesign-icons-react';
import useConfig from '../_util/useConfig';
import withNativeProps, { NativeProps } from '../_util/withNativeProps';
import { TdCellProps } from './type';

export type CellProps = TdCellProps & NativeProps;

export type AlignType = 'top' | 'middle' | 'bottom';

export const defaultProps = {
  align: 'middle' as AlignType,
  arrow: false,
  bordered: true,
  description: '',
  hover: false,
  image: '',
  leftIcon: null,
  note: '',
  required: false,
  rightIcon: null,
  title: '',
  url: '',
  onClick: identity,
};

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
  } = props;

  const { classPrefix } = useConfig();

  const name = `${classPrefix}-cell`;

  const content = (
    <div
      className={classNames([`${name}`, `${name}--${align}`], {
        [`${name}--bordered`]: bordered,
        [`${name}--hover`]: hover,
      })}
      onClick={(e) => {
        onClick({ e });
      }}
    >
      {(leftIcon || image) && (
        <div className={`${name}__left-icon`}>
          {leftIcon}
          {isString(image) ? <img src={image} className={`${name}__image`} /> : image}
        </div>
      )}
      <div className={`${name}__title`}>
        {title && (
          <span>
            {title}
            {required && <span className={`${name}--required`}>&nbsp;*</span>}
          </span>
        )}
        {description && <div className={`${name}__description`}>{description}</div>}
      </div>
      {note && <div className={`${name}__note`}>{note}</div>}
      {arrow && <Icon className={`${name}-content-arrow`} name="chevron-right" size={24} color="#0006" />}
      {rightIcon && <div className={`${name}__right-icon`}>{rightIcon}</div>}
    </div>
  );

  return withNativeProps(
    props,
    <>
      {url ? (
        <a style={{ textDecoration: 'none' }} href={url} rel="noreferrer">
          {content}
        </a>
      ) : (
        <>{content}</>
      )}
    </>,
  );
};

Cell.defaultProps = defaultProps;
Cell.displayName = 'Cell';

export default Cell;
