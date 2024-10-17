import React, { FC, useContext, useMemo } from 'react';
import classnames from 'classnames';
import { CheckIcon, CloseIcon } from 'tdesign-icons-react';
import isNumber from 'lodash/isNumber';
import withNativeProps, { NativeProps } from '../_util/withNativeProps';
import { TdStepItemProps } from './type';
import { stepItemDefaultProps } from './defaultProps';
import StepsContext from './StepsContext';
import useDefaultProps from '../hooks/useDefaultProps';
import { usePrefixClass } from '../hooks/useClass';
import parseTNode from '../_util/parseTNode';

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
  const { title, titleRight, extra, content, icon, status, index, children } = useDefaultProps(
    props,
    stepItemDefaultProps,
  );

  const {
    value,
    readonly,
    theme,
    layout,
    currentStatus: contextStatus,
    onChange,
    sequence,
    itemList,
  } = useContext(StepsContext);

  const stepItemClass = usePrefixClass('step-item');
  const dot = useMemo(() => theme === StepThemeEnum.DOT, [theme]);

  const isLastChild = useMemo(
    () => index === (sequence === 'positive' ? itemList.length - 1 : 0),
    [index, itemList.length, sequence],
  );

  const currentStatus = useMemo(() => {
    if (status !== StepItemStatusEnum.DEFAULT) return status;
    if (index === value) return contextStatus;
    if (isNumber(value) && index < value) return StepItemStatusEnum.FINISH;
    return status;
  }, [contextStatus, index, status, value]);

  const rootClassName = useMemo(
    () =>
      classnames(stepItemClass, `${stepItemClass}--${layout}`, {
        [`${stepItemClass}--default`]: readonly,
        [`${stepItemClass}--${currentStatus}`]: currentStatus,
      }),
    [currentStatus, layout, readonly, stepItemClass],
  );
  const iconWrapperClassName = useMemo(
    () => classnames(`${stepItemClass}__anchor`, `${stepItemClass}__anchor--${layout}`),
    [layout, stepItemClass],
  );
  const dotClass = useMemo(
    () => classnames(`${stepItemClass}__dot`, `${stepItemClass}__dot--${currentStatus}`),
    [currentStatus, stepItemClass],
  );

  const iconClassName = useMemo(
    () =>
      classnames(``, {
        [`${stepItemClass}__icon`]: icon,
        [`${stepItemClass}__icon--${currentStatus}`]: icon,
        [`${stepItemClass}__circle`]: !icon,
        [`${stepItemClass}__circle--${currentStatus}`]: !icon,
      }),
    [currentStatus, icon, stepItemClass],
  );

  const contentClass = useMemo(
    () =>
      classnames(`${stepItemClass}__content`, `${stepItemClass}__content--${layout}`, {
        [`${stepItemClass}__content--${layout}`]: isLastChild,
        [`${stepItemClass}__content--last`]: isLastChild,
      }),
    [isLastChild, layout, stepItemClass],
  );
  const tilteClass = useMemo(
    () =>
      classnames(
        `${stepItemClass}__title`,
        `${stepItemClass}__title--${currentStatus}`,
        `${stepItemClass}__title--${layout}`,
      ),
    [currentStatus, layout, stepItemClass],
  );
  const descriptionClass = useMemo(
    () =>
      classnames(
        `${stepItemClass}__description`,
        `${stepItemClass}__description--${currentStatus}`,
        `${stepItemClass}__description--${layout}`,
      ),
    [currentStatus, layout, stepItemClass],
  );
  const extraClass = useMemo(
    () =>
      classnames(
        `${stepItemClass}__extra`,
        `${stepItemClass}__extra--${currentStatus}`,
        `${stepItemClass}__extra--${layout}`,
      ),
    [currentStatus, layout, stepItemClass],
  );
  const separatorClass = useMemo(
    () =>
      classnames(
        stepItemClass,
        `${stepItemClass}__line`,
        `${stepItemClass}__line--${currentStatus}`,
        `${stepItemClass}__line--${layout}`,
        `${stepItemClass}__line--${theme}`,
        `${stepItemClass}__line--${sequence}`,
      ),
    [currentStatus, layout, sequence, stepItemClass, theme],
  );

  const onStepClick = (e) => {
    if (readonly) return;
    const currentValue = index;
    onChange(currentValue, value, { e });
  };

  const renderIconContent = () => {
    if (icon) {
      return parseTNode(icon);
    }

    if (currentStatus === StepItemStatusEnum.ERROR) {
      return <CloseIcon />;
    }

    if (currentStatus === StepItemStatusEnum.FINISH) {
      return <CheckIcon />;
    }

    return index + 1;
  };

  return withNativeProps(
    props,
    <div className={rootClassName} onClick={onStepClick}>
      <div className={iconWrapperClassName}>
        {dot ? <div className={dotClass}></div> : <div className={iconClassName}>{renderIconContent()}</div>}
      </div>
      <div className={contentClass}>
        <div className={tilteClass}>
          {parseTNode(title)}
          {parseTNode(titleRight)}
        </div>
        <div className={descriptionClass}>{parseTNode(children || content)}</div>
        <div className={extraClass}>{parseTNode(extra)}</div>
      </div>
      {!isLastChild && <div className={separatorClass}></div>}
    </div>,
  );
};

StepItem.displayName = 'StepItem';

export default StepItem;
