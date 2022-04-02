import React, { FC, forwardRef } from 'react';
import { StarFilledIcon, StarIcon } from 'tdesign-icons-react';
import isEmpty from 'lodash/isEmpty';
import useConfig from '../_util/useConfig';
import type { TdRateProps } from './type';
import type { StyledProps } from '../common';
import useDefault from '../_util/useDefault';
import useColor from '../_util/useColor';

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
    gap = 6,
    showText = false,
    size = 20,
    texts = ['极差', '失望', '一般', '满意', '惊喜'],
    value,
    onChange,
    variant = 'filled',
    className = '',
    style = {},
    defaultValue,
  } = props;
  const { classPrefix } = useConfig();
  const prefix = classPrefix;

  const [refValue, setRefValue] = useDefault(value, defaultValue, onChange);
  const starClickHandle = (number) => {
    setRefValue(refValue === number ? 0 : number);
  };

  const [checkColor, unCheckColor] = useColor(color, defaultCheck, defaultUnCheck);

  const getCheckColor = (number) => (number <= refValue ? checkColor : unCheckColor);

  const getVariant = (number) => (number <= refValue ? 'filled' : variant);

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
    if (!refValue) {
      return '';
    }
    if (isEmpty(texts)) {
      return refValue;
    }
    return texts?.[Math.ceil(refValue) - 1] ?? 'undefined';
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
