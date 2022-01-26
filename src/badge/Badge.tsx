import React, { forwardRef, useContext, useMemo } from 'react';
import { ConfigContext } from 'tdesign-mobile-react/config-provider';
import cls from 'classnames';
import type { StyledProps } from '../common';

import { TdBadgeProps } from './type';

export interface BadgeProps extends TdBadgeProps, StyledProps {}

const badgeDefaultProps: BadgeProps = {
  color: '',
  count: 0,
  dot: false,
  maxCount: 99,
  shape: 'circle',
  showZero: false,
  size: 'medium',
};

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
    color,
    content,
    count,
    dot,
    maxCount,
    offset,
    shape,
    showZero,
    size,
    ...resetProps
  } = props;
  const { classPrefix } = useContext(ConfigContext);
  const hasChildren = useMemo(() => !!(content || children), [content, children]);
  const isRibbon = useMemo(() => !dot && shape === 'ribbon', [shape, dot]);
  /**
   * 合并后的样式
   */
  const computedStyle = useMemo(() => {
    const mergedStyle = { ...style };
    if (color) mergedStyle.backgroundColor = color;
    if (offset && Array.isArray(offset)) {
      const [right, marginTop] = offset;
      mergedStyle.right = resolveOffset(right);
      mergedStyle.marginTop = resolveOffset(marginTop);
    }
    return mergedStyle;
  }, [style, color, offset]);

  const badgeContainerClassName = cls(`${classPrefix}-badge`, isRibbon && `${classPrefix}-badge__ribbon--outer`);

  const badgeClassNames = cls(
    `${classPrefix}-badge__inner`,
    dot && `${classPrefix}-badge--dot`,
    !dot && shape && `${classPrefix}-badge--${shape}`,
    size === 'small' ? `${classPrefix}-badge--${size}` : `${classPrefix}-badge--medium`,
    hasChildren && `${classPrefix}-badge--has-children`,
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
    <div className={badgeClassNames} style={computedStyle} {...resetProps}>
      {renderBadgeContent}
    </div>
  );

  return (
    <div ref={ref} className={badgeContainerClassName}>
      {content || children}
      {renderBadge}
    </div>
  );
});

Badge.defaultProps = badgeDefaultProps;
Badge.displayName = 'Badge';

export default Badge;
