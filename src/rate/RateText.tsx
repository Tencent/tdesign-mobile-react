import cx from 'classnames';
import React from 'react';
import { usePrefixClass } from '../hooks/useClass';
import { TdRateProps } from './type';

type Props = {
  texts: TdRateProps['texts'];
  value: number;
};

export const RateText = (props: Props) => {
  const textClass = usePrefixClass('rate__text');

  const { value, texts } = props;

  const text = (Array.isArray(texts) ? texts[value - 1] : '') || `${value}分`;

  return (
    <span
      className={cx(textClass, {
        [`${textClass}--active`]: value > 0,
      })}
    >
      {value ? text : '未评分'}
    </span>
  );
};
