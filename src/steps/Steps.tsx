import React, { FC } from 'react';
import classnames from 'classnames';
import withNativeProps, { NativeProps } from 'tdesign-mobile-react/_util/withNativeProps';
import { TdStepsProps } from './type';
import useConfig from '../_util/useConfig';
import { stepsDefaultProps } from './defaultProps';

export interface StepsProps extends TdStepsProps, NativeProps {}

const Steps: FC<StepsProps> = (props) => {

  const { children, layout, readonly, theme, separator, current } = props;

  const { classPrefix } = useConfig();
  
  const name = `${classPrefix}-steps`;

  return (
    withNativeProps(
      props,
      <div className={classnames(
        name,
        `${name}--${layout}`,
        `${name}--${theme}-anchor`,
        {
          [`${name}--readonly`]: readonly,
        }
      )}>
        {
          React.Children.map(children, (child, index) => {        
            return React.cloneElement(child, {
              current,
              readonly,
              index,
            })
          })
        }
      </div>
    )
  );
};

Steps.displayName = 'Steps';
Steps.defaultProps = stepsDefaultProps;

export default Steps;
