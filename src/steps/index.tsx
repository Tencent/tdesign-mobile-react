import _Steps from './Steps';
import _StepItem from './StepItem'

import './style';

export type { StepsProps } from './Steps';
export type { StepItemProps } from './StepItem'
export * from './type';

export const Steps = _Steps;
Steps.StepItem = _StepItem;

export default Steps;
