import React, { FC, useState, forwardRef, useMemo } from 'react';
import { StarFilledIcon, StarIcon } from 'tdesign-icons-react';
import isFunction from 'lodash/isFunction';
import isEmpty from 'lodash/isEmpty';
import useConfig from '../_util/useConfig';
import type { TdRateProps } from './type';
import type { StyledProps } from '../common';

export interface RateProps extends TdRateProps, StyledProps {}

const Star = (props) => {
  const { size, style, variant } = props;
  if (variant === 'outline') {
    return <StarIcon size={size} style={{ ...style }} />;
  }
  return <StarFilledIcon size={size} style={{ ...style }} />;
};

const defaultUnCheck = '#E3E6EB';
const defaultCheck = '#ED7B2F';

const Rate: FC<RateProps> = forwardRef((props, ref: React.LegacyRef<HTMLInputElement>) => {
  const {
    allowHalf = false,
    color = defaultCheck,
    count = 5,
    disabled = false,
    gap = 6,
    showText = false,
    size = 20,
    texts = ['极差', '失望', '一般', '满意', '惊喜'],
    value = 0,
    onChange,
    variant = 'filled',
    className = '',
    style = {},
  } = props;
  const { classPrefix } = useConfig();
  const prefix = classPrefix;
  const hasDefaultValue = useMemo(() => Object.prototype.hasOwnProperty.call(props, 'defaultValue'), [props]);

  const [refValue, setRefValue] = useState(props?.defaultValue ?? 0);

  let unCheckColor = defaultUnCheck;
  if (Array.isArray(color) && color.length > 1) {
    unCheckColor = color?.[1] ?? defaultUnCheck;
  }

  let checkColor = typeof color === 'string' ? color : defaultCheck;
  if (Array.isArray(color) && color.length > 0) {
    checkColor = color?.[0] ?? defaultCheck;
  }

  const starClickHandle = (number) => {
    !disabled && isFunction(onChange) && onChange(value === number ? 0 : number);
    hasDefaultValue && setRefValue(refValue === number ? 0 : number);
  };

  const getCheckColor = (number) => {
    let referenceValue = value;

    if (hasDefaultValue) {
      referenceValue = refValue;
    }
    return number <= referenceValue ? checkColor : unCheckColor;
  };

  const getVariant = (number) => {
    let referenceValue = value;
    if (hasDefaultValue) {
      referenceValue = refValue;
    }
    return number <= referenceValue ? 'filled' : variant;
  };

  const RateLi = (props) => {
    const { number } = props;
    if (allowHalf) {
      const leftStarNumber = number - 0.5;
      return (
        <>
          <li className={`${prefix}-rate--item ${prefix}-rate-half`} style={{ marginRight: `${gap - 2}px` }}>
            <span
              className={`${prefix}-rate--icon-left`}
              onClick={() => {
                starClickHandle(leftStarNumber);
              }}
            >
              <Star size={size} variant={getVariant(leftStarNumber)} style={{ color: getCheckColor(leftStarNumber) }} />
            </span>
            <span
              className={`${prefix}-rate--icon-right`}
              onClick={() => {
                starClickHandle(number);
              }}
            >
              <Star size={size} variant={getVariant(number)} style={{ color: getCheckColor(number) }} />
            </span>
          </li>
        </>
      );
    }
    return (
      <li className={`${prefix}-rate--item ${prefix}-rate-full`} style={{ marginRight: `${gap - 2}px` }}>
        <span
          className={`${prefix}-rate--icon`}
          onClick={() => {
            starClickHandle(number);
          }}
        >
          <Star size={size} variant={getVariant(number)} style={{ color: getCheckColor(number) }} />
        </span>
      </li>
    );
  };

  const starList = [];
  for (let i = 0; i < count; i++) {
    starList.push(<RateLi key={i} number={i + 1} />);
  }

  const getText = () => {
    let referenceValue = value;
    if (hasDefaultValue) {
      referenceValue = refValue;
    }
    if (!referenceValue) {
      return '';
    }
    if (isEmpty(texts)) {
      return referenceValue;
    }
    return texts?.[Math.ceil(referenceValue) - 1] ?? 'undefined';
  };

  return (
    <div className={`${prefix}-rate ${className}`} style={{ ...style }}>
      <input type="hidden" ref={ref} defaultValue={refValue} />
      <ul className={`${prefix}-rate--list`}>{starList}</ul>
      {showText && <span className={`${prefix}-rate--text`}>{getText()}</span>}
    </div>
  );
});

export default Rate;
