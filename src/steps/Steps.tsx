import React, { FC, useMemo } from 'react';
import classnames from 'classnames';
import withNativeProps, { NativeProps } from '../_util/withNativeProps';
import useDefault from '../_util/useDefault';
import { TdStepsProps } from './type';
import { stepsDefaultProps } from './defaultProps';
import StepsContext from './StepsContext';
import StepItem from './StepItem';
import useDefaultProps from '../hooks/useDefaultProps';
import { usePrefixClass } from '../hooks/useClass';

export interface StepsProps extends TdStepsProps, NativeProps {}

const Steps: FC<StepsProps> = (props) => {
  const {
    children,
    layout,
    readonly,
    theme,
    sequence,
    current,
    defaultCurrent,
    currentStatus,
    onChange: onCurrentChange,
    options,
  } = useDefaultProps(props, stepsDefaultProps);
  const stepsClass = usePrefixClass('steps');
  const [value, onChange] = useDefault(current, defaultCurrent, onCurrentChange);

  const stepItemList = useMemo(() => {
    if (options) {
      return options.map((item, index: number) => <StepItem key={index} {...item} index={index} />);
    }
    return React.Children.map(children, (child: JSX.Element, index: number) =>
      React.cloneElement(child, {
        index,
      }),
    );
  }, [children, options]);

  return withNativeProps(
    props,
    <StepsContext.Provider
      value={{ value, readonly, theme, layout, onChange, currentStatus, sequence, itemList: stepItemList }}
    >
      <div
        className={classnames(stepsClass, `${stepsClass}--${layout}`, `${stepsClass}--${sequence}`, {
          [`${stepsClass}--readonly`]: readonly,
        })}
      >
        {stepItemList}
      </div>
    </StepsContext.Provider>,
  );
};

Steps.displayName = 'Steps';

export default Steps;
