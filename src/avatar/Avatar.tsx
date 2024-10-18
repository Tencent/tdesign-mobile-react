import type { FC } from 'react';
import React, { useContext } from 'react';
import cls from 'classnames';
import Image from 'tdesign-mobile-react/image';
import Badge from 'tdesign-mobile-react/badge';
import { AvatarGroupContext } from './AvatarGroupContext';
import { isValidSize } from '../_common/js/avatar/utils';
import parseTNode from '../_util/parseTNode';
import useDefaultProps from '../hooks/useDefaultProps';
import { usePrefixClass } from '../hooks/useClass';
import { avatarDefaultProps } from './defaultProps';
import type { TdAvatarProps } from './type';
import type { StyledProps } from '../common';

export interface AvatarProps extends TdAvatarProps, StyledProps {}

const Avatar: FC<AvatarProps> = (props) => {
  const {
    className,
    size = '',
    shape = 'circle',
    icon,
    children,
    hideOnLoadFailed = false,
    image = '',
    badgeProps,
    alt = '',
    imageProps,
    onError,
  } = useDefaultProps(props, avatarDefaultProps);
  const avatarGroupProps = useContext(AvatarGroupContext) || {};
  const rootClassName = usePrefixClass('avatar');

  const { size: avatarGroupSize, shape: avatarGroupShape } = avatarGroupProps;
  const hasAvatarGroupProps = Object.keys(avatarGroupProps).length > 0;
  const shapeValue = shape || avatarGroupShape || 'circle';
  const sizeValue = size || avatarGroupSize;
  const isCustomSize = !isValidSize(sizeValue);

  const avatarClasses = cls(
    rootClassName,
    `${rootClassName}--${isCustomSize ? 'medium' : sizeValue}`,
    `${rootClassName}--${shapeValue}`,
    {
      [`${rootClassName}--border ${rootClassName}--border-${isCustomSize ? 'medium' : sizeValue}`]: hasAvatarGroupProps,
    },
  );
  const containerClassName = cls(`${rootClassName}__wrapper`, className);

  const customSize = isCustomSize
    ? {
        height: sizeValue,
        width: sizeValue,
        'font-size': `${(Number.parseInt(sizeValue, 10) / 8) * 3 + 2}px`,
      }
    : {};

  const handleImgLoaderError = (context: any) => {
    onError?.(context);
  };

  const renderAvatar = () => {
    if (image && !hideOnLoadFailed) {
      return <Image src={image} alt={alt} {...imageProps} onError={handleImgLoaderError} />;
    }
    if (icon) {
      return <div className={`${rootClassName}__icon`}>{icon}</div>;
    }
    return parseTNode(children);
  };

  return (
    <div className={containerClassName}>
      <div className={`${rootClassName}__badge`}>
        <Badge {...badgeProps}>
          <div className={avatarClasses} style={customSize}>
            {renderAvatar()}
          </div>
        </Badge>
      </div>
    </div>
  );
};

export default Avatar;
