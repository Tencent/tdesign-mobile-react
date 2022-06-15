import React, { createContext, useMemo } from 'react';
import { TdGridProps } from './type';

export const GridContext = createContext<TdGridProps | null>(null);

interface GridProviderProps extends TdGridProps{
  children: React.ReactNode;
}

export function GirdProvider(props: GridProviderProps) {
  const { children, align, border, column, gutter } = props;

  const memoValue = useMemo(() => ({
    align,
    border,
    column,
    gutter,
  }), [align, border, column, gutter]);

  return <GridContext.Provider value={memoValue}>{children}</GridContext.Provider>;
}
