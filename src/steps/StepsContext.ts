import React, { MouseEvent } from 'react';
import { TNode } from '../common';

interface StepsContextProps {
  value: string | number;
  readonly: boolean;
  theme: 'default' | 'dot';
  layout: 'horizontal' | 'vertical';
  currentStatus?: 'default' | 'process' | 'finish' | 'error';
  sequence?: 'positive' | 'reverse';
  itemList: TNode[];
  onChange: (current: string | number, previous: string | number, context?: { e?: MouseEvent<HTMLDivElement> }) => void;
}

const StepsContext = React.createContext<StepsContextProps>({
  value: 0,
  readonly: false,
  onChange: null,
  theme: 'default',
  layout: 'horizontal',
  sequence: 'positive',
  itemList: [],
  currentStatus: 'default',
});

export default StepsContext;
