import { useMemoizedFn, useUpdate } from "ahooks";
import { SetStateAction, useRef } from "react";

interface Options<T> {
    value?: T,
    defaultValue?: T,
    onChange?: (v: T) => void;
}

/**
 * 用于表单组件value处理受控/非受控模式
 * @param options 
 * @returns 
 */
export function usePropsValue<T> (options: Options<T>) {
    const { value, defaultValue, onChange} = options;

    const update = useUpdate();

    const stateRef = useRef<T>(value !== undefined ? value : defaultValue);

    if (value !== undefined) {
        stateRef.current = value;
    }

    const setState = useMemoizedFn((v: SetStateAction<T>) => {

        // 类似useState中的setState实现
        const nextValue = typeof v === 'function' ? (v as (prevState: T) => T)(stateRef.current) : v;

        // 非受控模式
        if (value === undefined) {
            stateRef.current = nextValue;
            // 强制组件更新
            update();
        }

        // 受控模式
        onChange?.(nextValue);
    });

    return [stateRef.current, setState] as const
}
