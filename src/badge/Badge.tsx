import React, { forwardRef, useMemo } from 'react';
import classNames from 'classnames';
import isNumber from 'lodash/isNumber';
import isString from 'lodash/isString';
import type { StyledProps } from '../common';
import type { TdBadgeProps } from './type';
import { badgeDefaultProps } from './defaultProps';
import parseTNode from '../_util/parseTNode';
import useDefaultProps from '../hooks/useDefaultProps';
import useConfig from '../hooks/useConfig';
import { usePrefixClass } from '../hooks/useClass';

export interface BadgeProps extends TdBadgeProps, StyledProps {}

const hasUnit = (unit: string) =>
  unit.indexOf('px') > 0 ||
  unit.indexOf('rpx') > 0 ||
  unit.indexOf('em') > 0 ||
  unit.indexOf('rem') > 0 ||
  unit.indexOf('%') > 0 ||
  unit.indexOf('vh') > 0 ||
  unit.indexOf('vm') > 0;

const Badge = forwardRef<HTMLDivElement, BadgeProps>((originProps, ref) => {
  const props = useDefaultProps(originProps, badgeDefaultProps);
  const { children, className, style, color, content, count, dot, maxCount, offset, shape, showZero, size } = props;

  const { classPrefix } = useConfig();
  const badgeClass = usePrefixClass('badge');

  // 徽标自定义样式
  const badgeInnerStyles = useMemo(() => {
    const mergedStyle: React.CSSProperties = {};
    if (color) mergedStyle.backgroundColor = color;
    if (offset && Array.isArray(offset)) {
      const [right = 0, top = 0]: Array<string | number> = offset;
      mergedStyle.right = hasUnit(right.toString()) ? right : `${right}px`;
      mergedStyle.top = hasUnit(top.toString()) ? top : `${top}px`;
    }
    return mergedStyle;
  }, [color, offset]);

  // 徽标外层样式类
  const badgeClasses = classNames(className, {
    [`${badgeClass}`]: true,
    [`${badgeClass}__ribbon-outer`]: shape === 'ribbon',
  });

  // 徽标内层样式类
  const badgeInnerClasses = classNames({
    [`${badgeClass}--basic`]: true,
    [`${badgeClass}--dot`]: dot,
    [`${badgeClass}--${size}`]: true,
    [`${badgeClass}--${shape}`]: true,
    [`${badgeClass}--count`]: !dot && count,
    [`${classPrefix}-has-count`]: true,
  });

  // 是否展示角标
  const isShowBadge = useMemo(() => {
    if (dot) {
      return true;
    }
    if (!showZero && Number(count) === 0) {
      return false;
    }
    if (count == null) return false;
    return true;
  }, [dot, count, showZero]);

  const readerCount = useMemo(() => {
    if (dot) return null;
    if (isString(count) || isNumber(count)) {
      if (Number(count) === 0) {
        return showZero ? count : null;
      }
      return Number(count) > Number(maxCount) ? `${maxCount}+` : count;
    }
    return parseTNode(count);
  }, [dot, count, maxCount, showZero]);

  const childNode = content || children;

  const readerContent = () => {
    if (typeof content === 'string') {
      return <span className={`${badgeClass}__content-text`}>{content}</span>;
    }
    return parseTNode(childNode);
  };

  const readerBadge = () => {
    if (!isShowBadge) return null;
    return (
      <div className={badgeInnerClasses} style={badgeInnerStyles}>
        {readerCount}
      </div>
    );
  };

  return (
    <div ref={ref} className={badgeClasses} style={style}>
      <div className={`${badgeClass}__content`}>{readerContent()}</div>
      {readerBadge()}
    </div>
  );
});

Badge.displayName = 'Badge';

export default Badge;
