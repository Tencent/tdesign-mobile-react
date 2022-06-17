import React, { MouseEvent } from 'react';

interface StepsContextProps {
  value: string | number;
  readonly: boolean;
  theme: 'default' | 'dot';
  layout: 'horizontal' | 'vertical';
  onChange: (current: string | number, previous: string | number, context?: { e?: MouseEvent<HTMLDivElement> }) => void;
}

const StepsContext = React.createContext<StepsContextProps>({
  value: 0,
  readonly: false,
  onChange: null,
  theme: 'default',
  layout: 'horizontal',
});

export default StepsContext;
