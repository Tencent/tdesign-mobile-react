import React, { Fragment, ReactNode, memo, useImperativeHandle, forwardRef } from 'react';
import cls from 'classnames';
import useCountDown from './hooks/useCountDown';
import useConfig from '../_util/useConfig';
import withNativeProps, { NativeProps } from '../_util/withNativeProps';
import { TdCountDownProps } from './type';

import './style';

export interface CountDownRef {
  start: () => void;
  reset: () => void;
  pause: () => void;
}

export interface CountDownProps extends TdCountDownProps, NativeProps {}

const defaultProps = {
  autoStart: true,
  size: 'small',
  splitWithUnit: false,
  format: 'HH:mm:ss',
  theme: 'default',
};

const CountDown = forwardRef<CountDownRef, CountDownProps>((props, ref) => {
  const { autoStart, content, millisecond, size, splitWithUnit, time, format, theme, onChange, onFinish } = props;
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
        <span className={`${name}__digit ${name}__digit-${match}`}>{digit}</span>
        {unit && <span className={`${name}__unit ${name}__unit-${match}`}>{unit}</span>}
      </Fragment>
    ));
  }

  const classNames = cls(name, `${name}--${theme}`, `${name}--${size}`, {
    [`${name}--split-with-unit`]: splitWithUnit,
  });

  return withNativeProps(props, <span className={classNames}>{contentNode}</span>);
});

CountDown.defaultProps = defaultProps as CountDownProps;
CountDown.displayName = 'CountDown';

export default memo(CountDown);
