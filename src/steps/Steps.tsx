import React, { FC } from 'react';
import c from 'classnames';
import Step from './Step';

interface StepPropsTypes {
  children: Array<typeof Step>;
  current: number;
  direction: 'horizontal' | 'vertical';
}

const Steps: FC<StepPropsTypes> = (stepProps) => {
  const { children, current = 0, direction = 'horizontal' } = stepProps;
  return (
    <div className={c('tdm-step', { 'tdm-step-vertical': direction === 'vertical' })}>
      {children &&
        children.map((child, index) => {
          if (React.isValidElement(child)) {
            return React.cloneElement(child, { active: index <= current, isLast: index === children.length });
          }
          return child;
        })}
    </div>
  );
};

export default Steps;
