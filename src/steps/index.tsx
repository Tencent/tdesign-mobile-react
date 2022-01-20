import React from 'react';
import InnerSteps from './Steps';
import _Step from './Step';
import { StepsPropsTypes } from './type';
import { forwardRefWithStatics } from '../utils/forward-ref-with-statics';

export * from './type';

export const Steps = forwardRefWithStatics(
  (props: StepsPropsTypes, ref: React.Ref<HTMLDivElement>) => (
    <div ref={ref}>
      <InnerSteps {...props}></InnerSteps>
    </div>
  ),
  {
    Step: _Step,
  },
);

export default Steps;
