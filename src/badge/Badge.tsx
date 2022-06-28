import React, { forwardRef, useContext, useMemo } from 'react';
import cls from 'classnames';
import { ConfigContext } from '../config-provider';
import type { StyledProps } from '../common';
import type { TdBadgeProps } from './type';

export interface BadgeProps extends TdBadgeProps, StyledProps {}

function resolveOffset(ofs): number | string | undefined {
  if (typeof ofs === 'undefined') return ofs;
  if (Number.isNaN(ofs)) return;
  if (typeof ofs === 'number') return (ofs * -1) as number;
  return (ofs as string).startsWith('-') ? ofs.replace(/^-/, '') : `-${ofs}`;
}

const Badge = forwardRef<HTMLDivElement, BadgeProps>((props, ref) => {
  const {
    children,
    className,
    style,
    color = '',
    content,
    count = 0,
    dot = false,
    maxCount = 99,
    offset,
    shape = 'circle',
    showZero = false,
    size = 'medium',
    ...resetProps
  } = props;
  const { classPrefix } = useContext(ConfigContext);
  const name = useMemo(() => `${classPrefix}-badge`, [classPrefix]);
  const hasChildren = useMemo(() => !!(content || children), [content, children]);
  const isRibbon = useMemo(() => !dot && shape === 'ribbon', [shape, dot]);

  // 徽标自定义样式
  const computedStyle = useMemo(() => {
    const mergedStyle = { ...style };
    if (color) mergedStyle.backgroundColor = color;
    if (offset && Array.isArray(offset)) {
      const [right, top] = offset;
      mergedStyle.right = resolveOffset(right);
      mergedStyle.top = resolveOffset(top);
    }
    return mergedStyle;
  }, [style, color, offset]);

  // 徽标外层样式类
  const badgeClasses = cls({
    [`${name}`]: true,
    [`${name}__ribbon--outer`]: isRibbon,
  });

  // 徽标内层样式类
  const badgeInnerClasses = cls(
    {
      [`${name}__inner`]: true,
      [`${name}--dot`]: dot,
      [`${name}--${shape}`]: !dot && shape,
      [`${classPrefix}-badge--has-children`]: hasChildren,
    },
    size === 'small' ? `${name}--${size}` : `${name}--medium`,
    className,
  );

  const renderBadgeContent = useMemo(() => {
    if (dot) return null;
    if (typeof count === 'number') {
      if (count === 0) {
        return showZero ? count : null;
      }
      return count >= +maxCount ? maxCount : count;
    }
    return count;
  }, [dot, count, maxCount, showZero]);

  const renderBadge = (
    <div className={badgeInnerClasses} style={computedStyle}>
      {renderBadgeContent}
    </div>
  );

  return (
    <div ref={ref} className={badgeClasses} {...resetProps}>
      {renderBadge}
      {content || children}
    </div>
  );
});

Badge.displayName = 'Badge';

export default Badge;
