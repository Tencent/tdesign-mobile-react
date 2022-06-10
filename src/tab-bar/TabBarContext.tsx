import React, { createContext, MutableRefObject, useMemo } from 'react';
import { ChangeHandler } from '../_util/useDefault';

export const TabBarContext = createContext<{
  defaultIndex: MutableRefObject<number>;
  activeValue: number | string | (number | string)[];
  updateChild: ChangeHandler<number | string | (number | string)[], any[]>;
}>(null);

export function TabBarProvider({ children, value }) {
  const memoValue = useMemo(() => value, [value]);
  return <TabBarContext.Provider value={memoValue}>{children}</TabBarContext.Provider>;
}
