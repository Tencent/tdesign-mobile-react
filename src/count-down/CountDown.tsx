import React, { Fragment, ReactNode, memo, useImperativeHandle, forwardRef, ForwardRefRenderFunction } from 'react';
import cls from 'classnames';
import useCountDown from './hooks/useCountDown';
import useConfig from '../_util/useConfig';
import { TdCountDownProps } from './type';

import './style';

export interface CountDownProps extends TdCountDownProps {
  className?: string;
}

export interface CountDownRef {
  start: () => void;
  reset: () => void;
  pause: () => void;
}

const CountDown: ForwardRefRenderFunction<CountDownRef, CountDownProps> = (props, ref) => {
  const {
    className,
    autoStart = true,
    content,
    millisecond,
    size = 'small',
    splitWithUnit = false,
    time,
    format = 'HH:mm:ss',
    theme = 'default',
    onChange,
    onFinish,
  } = props;
  const { classPrefix } = useConfig();
  const name = `${classPrefix}-countdown`;

  const { timeText, timeList, start, reset, pause } = useCountDown({
    autoStart,
    millisecond,
    time,
    format,
    onChange,
    onFinish,
  });

  useImperativeHandle(ref, () => ({ start, reset, pause }));

  if (!timeText) return null;

  let contentNode: ReactNode = null;
  if (content) {
    contentNode = content;
  } else {
    contentNode = timeList.map(({ digit, unit, match }) => (
      <Fragment key={match}>
        <span className={`${name}-digit ${name}-digit-${match}`}>{digit}</span>
        {unit && <span className={`${name}-unit ${name}-unit-${match}`}>{unit}</span>}
      </Fragment>
    ));
  }

  const classNames = cls(
    name,
    `${name}__${theme}`,
    `${name}__${size}`,
    {
      [`${name}__split-with-unit`]: splitWithUnit,
    },
    className,
  );

  return <span className={classNames}>{contentNode}</span>;
};

export default memo(forwardRef(CountDown));
