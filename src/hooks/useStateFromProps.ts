import { useState, useEffect } from 'react';

/**
 * useStateFromProps Hook
 *
 * This hook synchronizes the internal state with the external `initialState`.
 * It updates the internal state only when the external state changes.
 *
 * 该 Hook 用于将内部状态与外部传入的 `initialState` 同步。它只在外部状态发生变化时更新内部状态。
 *
 * @param initialState - The initial external state to be synced with the internal state.
 * - 外部传入的初始状态，将与内部状态同步。
 *
 * @returns A stateful value and a function to update it, in the same manner as `useState`.
 * - 返回一个状态值和一个用于更新该状态的函数，与 `useState` 的使用方式相同。
 *
 * @example
 *
 */
export function useStateFromProps<T>(initialState: T): [T, React.Dispatch<React.SetStateAction<T>>] {
  const [state, setState] = useState<T>(initialState);

  useEffect(() => {
    if (state !== initialState) {
      setState(initialState);
    }
    // 只是在 initialState 改变时更新 state，因此不需要依赖项state
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialState]);

  return [state, setState];
}
