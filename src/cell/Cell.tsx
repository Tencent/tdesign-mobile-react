import React from 'react';
import classNames from 'classnames';
import { Icon } from 'tdesign-icons-react';
import useConfig from '../_util/useConfig';
import { TdCellProps } from './type';

enum AlignType {
  TOP = 'top',
  MIDDLE = 'middle',
  BOTTOM = 'bottom',
}

// eslint-disable-next-line @typescript-eslint/no-empty-function
const noop = () => {};

const Cell: React.FC<TdCellProps> = (props) => {
  const {
    align = AlignType.MIDDLE,
    arrow = false,
    bordered = true,
    description,
    hover = false,
    image,
    leftIcon,
    note,
    required = false,
    rightIcon,
    title = '',
    url = '',
    onClick = noop,
  } = props;

  const { classPrefix } = useConfig();

  const isLeft = !!leftIcon || !!image;

  const cellImage = typeof image === 'string' ? <img src={image} className={`${classPrefix}-cell__image`} /> : image;

  const content = (
    <div
      className={classNames([`${classPrefix}-cell`, `${classPrefix}-cell--${align}`], {
        [`${classPrefix}-cell--bordered`]: bordered,
        [`${classPrefix}-cell--hover`]: hover,
      })}
      onClick={(e) => {
        onClick({ e });
      }}
    >
      {isLeft && (
        <div className={`${classPrefix}-cell__left-icon`}>
          {leftIcon}
          {cellImage}
        </div>
      )}
      <div className={`${classPrefix}-cell__title`}>
        {title && (
          <span>
            {title}
            {required && <span className={`${classPrefix}-cell--required`}>&nbsp;*</span>}
          </span>
        )}
        {description && <div className={`${classPrefix}-cell__description`}>{description}</div>}
      </div>
      {note && <div className={`${classPrefix}-cell__note`}>{note}</div>}
      {arrow && <Icon className={`${classPrefix}-cell-content-arrow`} name="chevron-right" size={24} color="#0006" />}
      {rightIcon && <div className={`${classPrefix}-cell__right-icon`}>{rightIcon}</div>}
    </div>
  );

  return (
    <>
      {url ? (
        <a style={{ textDecoration: 'none' }} href={url} rel="noreferrer">
          {content}
        </a>
      ) : (
        <>{content}</>
      )}
    </>
  );
};

export default Cell;
