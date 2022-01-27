import { useState } from 'react';

// eslint-disable-next-line @typescript-eslint/no-empty-function
const noop = () => {};

export interface ChangeHandler<T, P extends any[]> {
  (value: T, ...args: P);
}

export default function useDefault<T, P extends any[]>(
  value: T,
  defaultValue: T,
  onChange: ChangeHandler<T, P>,
): [T, ChangeHandler<T, P>] {
  const [internalValue, setInternalValue] = useState(defaultValue);
  if (typeof value !== 'undefined') {
    return [value, onChange || noop];
  }
  return [
    internalValue,
    (newValue, ...args) => {
      setInternalValue(newValue);
      if (typeof onChange === 'function') {
        onChange(newValue, ...args);
      }
    },
  ];
}
