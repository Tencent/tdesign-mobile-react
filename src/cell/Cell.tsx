import React from 'react';
import classNames from 'classnames';
import { Icon } from 'tdesign-icons-react';
import { TdCellProps } from './type';

const prefix = 't';
const name = `${prefix}-cell`;

enum AlignType {
  TOP = 'top',
  MIDDLE = 'middle',
  BOTTOM = 'bottom',
}

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
    onClick,
  } = props;

  const isUrl = !!url;

  const isLeft = !!leftIcon || !!image;

  const cellImage = typeof image === 'string' ? <img src={image} className={`${name}__image`} /> : image;

  const content = (
    <div
      className={classNames(`${name}`, `${name}--${align}`, bordered && `${name}--bordered`, hover && `${name}--hover`)}
      onClick={(e) => {
        onClick && onClick({ e });
      }}
    >
      {isLeft && (
        <div className={`${name}__left-icon`}>
          {leftIcon}
          {cellImage}
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

  return (
    <>
      {isUrl ? (
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
