import React, { FC, useContext, useMemo } from 'react';
import classnames from 'classnames';
import withNativeProps, { NativeProps } from 'tdesign-mobile-react/_util/withNativeProps';
import { Icon } from 'tdesign-icons-react';
import { TdStepItemProps } from './type';
import useConfig from '../_util/useConfig';
import { stepItemDefaultProps } from './defaultProps';
import StepsContext from './StepsContext';

export enum StepItemStatusEnum {
  DEFAULT = 'default',
  PROCESS = 'process',
  FINISH = 'finish',
  ERROR = 'error',
}

export enum StepThemeEnum {
  DEFAULT = 'default',
  DOT = 'dot',
}

export enum StepLayoutEnum {
  VERTICAL = 'vertical',
  HORIZONTAL = 'horizontal',
}

export interface StepItemProps extends TdStepItemProps, NativeProps {
  index: number;
}

const StepItem: FC<StepItemProps> = (props) => {
  const { title, content, icon, status, index, children } = props;

  const { value, readonly, theme, layout, onChange } = useContext(StepsContext);

  const { classPrefix } = useConfig();

  const name = `${classPrefix}-step`;

  const dot = useMemo(() => theme === StepThemeEnum.DOT && layout === StepLayoutEnum.VERTICAL, [theme, layout]);

  const onStepClick = (e) => {
    if (readonly || dot) return;
    const currentValue = index;
    onChange(currentValue, value, { e });
  };

  const innerClassName = useMemo(() => {
    if (typeof icon === 'boolean') {
      return `${name}__inner`;
    }
    return classnames(`${name}__inner`, `${name}__inner__icon`);
  }, [name, icon]);

  const iconContent = useMemo(() => {
    if (dot) {
      return '';
    }

    if (status === StepItemStatusEnum.ERROR) {
      return <Icon name="close" />;
    }

    if (index < value && readonly) {
      return <Icon name="check" />;
    }

    if (typeof icon === 'boolean') {
      return index + 1;
    }

    if (typeof icon === 'string') {
      return <Icon name={icon} size="24" />;
    }

    return icon;
  }, [status, index, value, readonly, icon, dot]);

  const currentStatus = useMemo(() => {
    if (status !== StepItemStatusEnum.DEFAULT) {
      return status;
    }
    if (+value === index) {
      return StepItemStatusEnum.PROCESS;
    }
    if (+value > index) {
      return StepItemStatusEnum.FINISH;
    }
    return '';
  }, [value, index, status]);

  return withNativeProps(
    props,
    <div
      className={classnames(`${name}`, {
        [`${name}--default`]: !readonly,
        [`${name}--${currentStatus}`]: currentStatus,
      })}
    >
      <div className={innerClassName}>
        <div className={`${name}-icon`}>
          <div
            className={classnames(`${name}-icon__number`, {
              [`${name}-icon__dot`]: dot,
            })}
            onClick={onStepClick}
          >
            {iconContent}
          </div>
        </div>
        <div className={`${name}-content`}>
          <div className={`${name}-title`}>{title}</div>
          <div className={`${name}-description`}>{content || children}</div>
          <div className={`${name}-extra`} />
        </div>
      </div>
    </div>,
  );
};

StepItem.displayName = 'StepItem';
StepItem.defaultProps = stepItemDefaultProps;

export default StepItem;
