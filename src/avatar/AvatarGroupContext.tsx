import React, { useMemo } from 'react';
import type { AvatarGroupProps } from './AvatarGroup';

export const AvatarGroupContext = React.createContext(null);

export function AvatarGroupContextProvider(props: Pick<AvatarGroupProps, 'size' | 'children'>) {
  const memoSize = useMemo(
    () => ({
      size: props.size,
    }),
    [props.size],
  );
  return <AvatarGroupContext.Provider value={memoSize}>{props.children}</AvatarGroupContext.Provider>;
}
