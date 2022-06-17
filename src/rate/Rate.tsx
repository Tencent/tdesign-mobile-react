import React, { FC, forwardRef } from 'react';
import { StarFilledIcon, StarIcon } from 'tdesign-icons-react';
import isEmpty from 'lodash/isEmpty';
import useConfig from '../_util/useConfig';
import type { TdRateProps } from './type';
import useDefault from '../_util/useDefault';
import useColor from '../_util/useColor';
import withNativeProps, { NativeProps } from '../_util/withNativeProps';
import { rateDefaultProps } from './defaultProps';

export interface RateProps extends TdRateProps, NativeProps {}

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
  const { allowHalf, color, count, gap, showText, size, texts, value, onChange, variant, defaultValue, disabled } =
    props;
  const { classPrefix } = useConfig();
  const name = `${classPrefix}-rate`;

  const [refValue, setRefValue] = useDefault(value, defaultValue, onChange);
  const starClickHandle = (number) => {
    setRefValue(refValue === number ? 0 : number);
  };

  const [checkColor, unCheckColor] = useColor(color, defaultCheck, defaultUnCheck);

  const getHalfCheckColor = (number) => (number <= refValue ? checkColor : 'transparent');

  const getCheckColor = (number) => (number <= refValue ? checkColor : unCheckColor);

  const getVariant = (number) => (number <= refValue ? 'filled' : variant);

  const RateLi = (props) => {
    const { number } = props;
    if (allowHalf) {
      const leftStarNumber = number - 0.5;
      return (
        <>
          <li className={`${name}--item ${name}-half`} style={{ marginRight: `${count - number > 0 ? gap : 0}px` }}>
            <span className={`${name}--placeholder`}>
              <Star size={size} variant={getVariant(leftStarNumber)} style={{ color: unCheckColor }} />
            </span>
            <span
              className={`${name}--icon-left`}
              onClick={() => {
                !disabled && starClickHandle(leftStarNumber);
              }}
            >
              <Star
                size={size}
                variant={getVariant(leftStarNumber)}
                style={{ color: getHalfCheckColor(leftStarNumber) }}
              />
            </span>
            <span
              className={`${name}--icon-right`}
              onClick={() => {
                !disabled && starClickHandle(number);
              }}
            >
              <Star size={size} variant={getVariant(number)} style={{ color: getHalfCheckColor(number) }} />
            </span>
          </li>
        </>
      );
    }
    return (
      <li className={`${name}--item ${name}-full`} style={{ marginRight: `${count - number > 0 ? gap : 0}px` }}>
        <span
          className={`${name}--icon`}
          onClick={() => {
            !disabled && starClickHandle(number);
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

  return withNativeProps(
    props,
    <div className={`${name}`}>
      <input type="hidden" ref={ref} defaultValue={refValue} />
      <ul className={`${name}--list`}>{starList}</ul>
      {showText && <span className={`${name}--text`}>{getText()}</span>}
    </div>,
  );
});

Rate.defaultProps = rateDefaultProps;
Rate.displayName = 'Rate';

export default Rate;
