import { createContext } from 'react';
import type { CollapseValue } from './type';

export interface CollapseContextValue {
  activeValue: CollapseValue | undefined;
  disabled: boolean;
  expandIcon: React.ReactNode;
  onPanelChange: (name: string | number, args: { e: React.MouseEvent<HTMLDivElement> }) => void;
  defaultExpandAll: boolean;
}

export const CollapseContext = createContext<CollapseContextValue | null>(null);

export const CollapseProvider = CollapseContext.Provider;
