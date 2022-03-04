import React, { Fragment, ReactNode } from 'react';
import cls from 'classnames';
import useCountDown from './hooks/useCountDown';
import { TdCountDownProps } from './type';

import './style';

const name = 't-countdown';

export type CountDownProps = TdCountDownProps;

const CountDown: React.FC<CountDownProps> = (props) => {
  const {
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
  const { timeText, timeList } = useCountDown({
    autoStart,
    millisecond,
    time,
    format,
    onChange,
    onFinish,
  });

  if (!timeText) return null;

  let contentNode: ReactNode = null;
  if (content) {
    contentNode = content;
  } else if (splitWithUnit) {
    contentNode = timeList.map(({ digit, unit, match }) => (
      <Fragment key={match}>
        <span className={`${name}-digit ${name}-digit-${match}`}>{digit}</span>
        {unit && <span className={`${name}-unit ${name}-unit-${match}`}>{unit}</span>}
      </Fragment>
    ));
  } else {
    contentNode = timeText;
  }

  return <span className={cls(name, `${name}__${theme}`, `${name}__${size}`)}>{contentNode}</span>;
};

export default CountDown;
