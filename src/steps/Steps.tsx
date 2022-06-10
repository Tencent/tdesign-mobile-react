import React, { FC, useMemo } from 'react';
import classnames from 'classnames';
import withNativeProps, { NativeProps } from 'tdesign-mobile-react/_util/withNativeProps';
import useDefault from 'tdesign-mobile-react/_util/useDefault';
import { TdStepsProps } from './type';
import useConfig from '../_util/useConfig';
import { stepsDefaultProps } from './defaultProps';
import StepsContext from './StepsContext';
import StepItem from './StepItem';

export interface StepsProps extends TdStepsProps, NativeProps {}

const Steps: FC<StepsProps> = (props) => {
  const {
    children,
    layout,
    readonly,
    theme,
    // separator,
    current,
    defaultCurrent,
    onChange: onCurrentChange,
    options,
  } = props;

  const { classPrefix } = useConfig();

  const name = `${classPrefix}-steps`;

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
    <StepsContext.Provider value={{ value, readonly, theme, layout, onChange }}>
      <div
        className={classnames(name, `${name}--${layout}`, `${name}--${theme}-anchor`, {
          [`${name}--readonly`]: readonly,
        })}
      >
        {stepItemList}
      </div>
    </StepsContext.Provider>,
  );
};

Steps.displayName = 'Steps';
Steps.defaultProps = stepsDefaultProps;

export default Steps;
