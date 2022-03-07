import React, { Fragment, ReactNode, memo } from 'react';
import cls from 'classnames';
import useCountDown from './hooks/useCountDown';
import useConfig from '../_util/useConfig';
import { TdCountDownProps } from './type';

import './style';

export type CountDownProps = TdCountDownProps;

const CountDown: React.FC<CountDownProps> = memo((props) => {
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
  const { classPrefix } = useConfig();
  const name = `${classPrefix}-countdown`;

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
  } else {
    contentNode = timeList.map(({ digit, unit, match }) => (
      <Fragment key={match}>
        <span className={`${name}-digit ${name}-digit-${match}`}>{digit}</span>
        {unit && <span className={`${name}-unit ${name}-unit-${match}`}>{unit}</span>}
      </Fragment>
    ));
  }

  const classNames = cls(name, `${name}__${theme}`, `${name}__${size}`, {
    [`${name}__split-with-unit`]: splitWithUnit,
  });

  return <span className={classNames}>{contentNode}</span>;
});

export default CountDown;
