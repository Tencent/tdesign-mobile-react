import React, { useContext, useMemo, Ref, useState } from 'react';
import cls from 'classnames';
import type { TdAvatarProps } from './type';
import Badge from '../badge/index';
import { StyledProps } from '../common';
import { ConfigContext } from '../config-provider';
import useSizeHook from './hooks/useSizeHooks';
import AvatarGroup from '../avatar-group/AvatarGroup';
import forwardRefWithStatics from '../_util/forwardRefWithStatics';
import { AvatarGroupContext } from '../avatar-group/AvatarGroupContext';

export interface AvatarProps extends TdAvatarProps, StyledProps {
  children?: React.ReactNode;
}

const Avatar = forwardRefWithStatics(
  (props: AvatarProps, ref: Ref<HTMLDivElement>) => {
    const {
      size = '',
      shape = 'circle',
      icon,
      children,
      hideOnLoadFailed = false,
      image = '',
      badgeProps,
      alt = '',
      onError,
      className,
      ...restProps
    } = props;
    const { size: avatarGroupSize } = useContext(AvatarGroupContext) || {};
    const sizeCls = useSizeHook(size || avatarGroupSize);
    const [sizeValue] = useState(size || avatarGroupSize);
    const { classPrefix } = useContext(ConfigContext);
    const baseAvatarCls = `${classPrefix}-avatar`;

    const isIconOnly = icon && !children;

    const avatarCls = cls(
      baseAvatarCls,
      {
        [sizeCls]: true,
        [`${baseAvatarCls}--${shape}`]: shape,
      },
      className,
    );

    // size 没有命中原有 size 规则且 size 仍有值， 推断为 size 值
    const customSize = useMemo(() => {
      if (sizeCls === '' && sizeValue) {
        return {
          width: sizeValue,
          height: sizeValue,
        };
      }
      return {};
    }, [sizeCls, sizeValue]);

    const iconCls = `${baseAvatarCls}__icon`;
    const badgeCls = `${baseAvatarCls}__badge`;
    const innerCls = `${baseAvatarCls}__inner`;

    const renderIcon = <div className={iconCls}>{icon}</div>;
    const renderImage = <img style={customSize} alt={alt} src={image} onError={onError}></img>;
    const renderContent = <span>{children}</span>;
    const renderBadge = <Badge {...badgeProps}></Badge>;

    const isShowImage = image && !hideOnLoadFailed;
    const isShowBadge = !!badgeProps;

    return (
      <div ref={ref} className={avatarCls} style={customSize} {...restProps}>
        <div className={innerCls}>
          {isShowImage && renderImage}
          {!isShowImage && isIconOnly && renderIcon}
          {!isShowImage && !isIconOnly && renderContent}
        </div>
        {isShowBadge && <div className={badgeCls}>{renderBadge}</div>}
      </div>
    );
  },
  {
    Group: AvatarGroup,
  },
);

Avatar.displayName = 'Avatar';

export default Avatar;
