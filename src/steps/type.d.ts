import { ReactNode } from 'react';

export interface StepsPropsTypes {
  children: Array<ReactNode> | ReactNode;
  current?: number;
  direction?: 'horizontal' | 'vertical';
}

export interface PubStepPropsTypes {
  title?: string | ReactNode;
  description?: string | ReactNode;
  icon?: string | ReactNode;
  status?: 'normal' | 'error';
}
