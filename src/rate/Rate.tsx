import React, { FC, useState, forwardRef } from 'react';
import { StarFilledIcon, StarIcon } from 'tdesign-icons-react';
import isFunction from 'lodash/isFunction';
import isEmpty from 'lodash/isEmpty';
import { TdRateProps } from './type';
import useConfig from '../_util/useConfig';

export interface RateProps extends TdRateProps {
  variant?: string; // filled	形状类型，有描边类型和填充类型两种。可选项：outline/filled
  clearable?: boolean; // false	是否允许取消选择
  className?: string;
  style?: React.CSSProperties;
}

const Star = (props) => {
  const { size, style, variant } = props;
  if (variant === 'outline') {
    return <StarIcon size={size} style={{ ...style }} />;
  }
  return <StarFilledIcon size={size} style={{ ...style }} />;
};

const defaultUnCheck = '#999999';
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
    Object.prototype.hasOwnProperty.call(props, 'defaultValue') && setRefValue(refValue === number ? 0 : number);
  };

  const getCheckColor = (number) => {
    let referenceValue = value;

    if (Object.prototype.hasOwnProperty.call(props, 'defaultValue')) {
      referenceValue = refValue;
    }
    return number <= referenceValue ? checkColor : unCheckColor;
  };

  const getVariant = (number) => {
    let referenceValue = value;
    if (Object.prototype.hasOwnProperty.call(props, 'defaultValue')) {
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
    if (Object.prototype.hasOwnProperty.call(props, 'defaultValue')) {
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
