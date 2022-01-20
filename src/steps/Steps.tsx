import React, { FC, ReactNode } from 'react';
import c from 'classnames';
import { StepsPropsTypes } from './type';
import './index.less';

const Steps: FC<StepsPropsTypes> = (stepProps) => {
  const { children, current = 0, direction = 'horizontal' } = stepProps;
  const childrenItems = [].concat(children);
  return (
    <div className={c('tdm-step', { 'tdm-step-vertical': direction === 'vertical' })}>
      {childrenItems &&
        React.Children.map<ReactNode, ReactNode>(childrenItems, (child, index) => {
          if (React.isValidElement(child)) {
            return React.cloneElement(child, { active: index <= current, isLast: index === childrenItems.length });
          }
          return child;
        })}
    </div>
  );
};

export default Steps;
