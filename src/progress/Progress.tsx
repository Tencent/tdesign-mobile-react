import React, { FC, useMemo } from 'react';
import classnames from 'classnames';
import withNativeProps, { NativeProps } from '../_util/withNativeProps';
import { TdProgressProps } from './type';
import useConfig from '../_util/useConfig';
import { progressDefaultProps } from './defaultProps';
import { getBackgroundColor } from './utils';

export interface ProgressProps extends TdProgressProps, NativeProps {}

const Progress: FC<ProgressProps> = (props) => {
  const { children, percentage, strokeWidth, trackColor, color, label, status } = props;

  const { classPrefix } = useConfig();

  const name = `${classPrefix}-progress`;

  const progressPercent = Math.max(0, Math.min(percentage, 100));

  const progressStatusStyle = useMemo(() => {
    if (percentage >= 100) {
      return 'success';
    }
    return status;
  }, [percentage, status]);

  const progressBarStyle = useMemo(() => {
    const height = typeof strokeWidth === 'string' ? strokeWidth : `${strokeWidth}px`;
    return {
      height,
      backgroundColor: trackColor,
    };
  }, [strokeWidth, trackColor]);

  const progressBarPercenStyle = {
    width: `${progressPercent}%`,
    background: color && getBackgroundColor(color),
  };

  const labelDom = useMemo(() => {
    if (!label) return null;
    return children || `${progressPercent}%`;
  }, [label, children, progressPercent]);

  return withNativeProps(
    props,
    <div className={classnames([`${name}`, `${name}--status--${progressStatusStyle}`])}>
      <div className={`${name}__inner`}>
        <div className={`${name}__bar`} style={progressBarStyle}>
          <div className={`${name}__bar-percent`} style={progressBarPercenStyle}></div>
        </div>
        <div className={`${name}__label`}>{labelDom}</div>
      </div>
    </div>,
  );
};

Progress.displayName = 'Progress';
Progress.defaultProps = progressDefaultProps;

export default Progress;
