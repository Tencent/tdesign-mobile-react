import React, { forwardRef, Ref, useContext, useEffect, useMemo, useState } from 'react';
import cls from 'classnames';
import { ShapeEnum, TdAvatarGroupProps } from './type';
import { StyledProps } from '../common';
import { ConfigContext } from '../config-provider';
import Avatar from './Avatar';
import { AvatarGroupContextProvider } from './AvatarGroupContext';

export interface AvatarGroupProps extends TdAvatarGroupProps, StyledProps {
  children?: React.ReactNode;
}

function getValidChildren(children: React.ReactNode) {
  return React.Children.toArray(children).filter((child) => React.isValidElement(child)) as React.ReactElement[];
}

const AvatarGroup = forwardRef((props: AvatarGroupProps, ref: Ref<HTMLDivElement>) => {
  const { cascading, children, max, collapseAvatar, size, className, ...restProps } = props;
  const { classPrefix } = useContext(ConfigContext);
  const [isShowEllipsisContent, setIsShowEllipsisContent] = useState(false);
  const [lastOneShape, setLastOneShape] = useState<ShapeEnum>('circle');

  const baseAvatarGroupCls = `${classPrefix}-avatar-group`;

  const avatarGroupCls = cls(
    baseAvatarGroupCls,
    {
      [`${classPrefix}-avatar--offset-right`]: cascading === 'right-up',
      [`${classPrefix}-avatar--offset-left`]: cascading === 'left-up',
    },
    className,
  );

  const validChildren = getValidChildren(children);
  const childrenCount = validChildren.length;
  const childrenWithinMax = max ? validChildren.slice(0, max) : validChildren;

  const renderCollapseAvatar = useMemo(() => {
    const popupNum = `+${childrenCount - max}`;
    return collapseAvatar || popupNum;
  }, [collapseAvatar, max, childrenCount]);

  const ellipsisSize = useMemo(
    () => childrenWithinMax[childrenWithinMax.length - 1]?.props.size || props.size,
    [childrenWithinMax, props.size],
  );

  useEffect(() => {
    if (max && childrenCount > max) {
      setIsShowEllipsisContent(true);
    } else {
      setIsShowEllipsisContent(false);
    }
  }, [max, childrenCount]);

  useEffect(() => {
    if (
      childrenWithinMax.length > 0 &&
      childrenWithinMax?.[childrenWithinMax.length - 1]?.props?.shape !== lastOneShape
    ) {
      setLastOneShape(childrenWithinMax[childrenWithinMax.length - 1].props.shape);
    }
  }, [childrenWithinMax, lastOneShape]);

  return (
    <div className={avatarGroupCls} ref={ref} {...restProps}>
      <AvatarGroupContextProvider size={size}>
        {childrenWithinMax}
        {isShowEllipsisContent ? (
          <Avatar shape={lastOneShape} size={ellipsisSize}>
            {renderCollapseAvatar}
          </Avatar>
        ) : null}
      </AvatarGroupContextProvider>
    </div>
  );
});

AvatarGroup.displayName = 'AvatarGroup';

export default AvatarGroup;
