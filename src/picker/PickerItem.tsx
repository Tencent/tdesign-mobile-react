import React, { FC, useRef, memo, useCallback, useContext, useMemo } from 'react';
import { useDebounceEffect } from 'ahooks';
import isUndefined from 'lodash/isUndefined';
import { useDrag } from '@use-gesture/react';
import { useSpring, animated } from '@react-spring/web';
import useConfig from '../_util/useConfig';
import nearest from '../_util/nearest';
import withNativeProps, { NativeProps } from '../_util/withNativeProps';
import PickerContext from './picker-context';
import { pickerItemDefaultProps } from './defaultProps';
import { TdPickerItemProps, PickerValue } from './type';

export interface PickerItemProps extends TdPickerItemProps, NativeProps {
  value?: PickerValue;
  defaultValue?: PickerValue;
  onChange?: (value: PickerValue) => void;
  itemIndex?: number;
}

const PickerItem: FC<PickerItemProps> = memo((props) => {
  const { options, value, defaultValue, itemIndex, formatter } = props;
  const { classPrefix } = useConfig();
  const name = `${classPrefix}-picker-item`;
  const rootRef = useRef<HTMLDivElement>(null);
  const controlRef = useRef<HTMLDivElement>(null);
  const lastIndexRef = useRef<number | undefined>();
  const pickerContext = useContext(PickerContext);

  const count = options.length;
  const currentIndex = useMemo(
    () => options.findIndex((option) => (isUndefined(value) ? defaultValue : value) === option.value),
    [options, defaultValue, value],
  );

  const getControlItemHeight = useCallback(() => {
    if (!controlRef.current) return 0;
    return controlRef.current.clientHeight / count;
  }, [controlRef, count]);

  const getControlYCompensation = useCallback(() => {
    if (!rootRef.current) return 0;
    const controlItemHeight = getControlItemHeight();
    return (rootRef.current.clientHeight - controlItemHeight) / 2;
  }, [rootRef, getControlItemHeight]);

  const getOffsetYList = useCallback(() => {
    const itemHeight = getControlItemHeight();
    const yCompensation = getControlYCompensation();
    return Array(count)
      .fill(0)
      .map((_, index) => index * itemHeight - yCompensation);
  }, [count, getControlItemHeight, getControlYCompensation]);

  const [{ y }, api] = useSpring(() => ({
    from: { y: 0 },
    config: {
      tension: 400,
      mass: 0.8,
    },
  }));

  const srollTo = useCallback(
    (index: number, immediate = false) => {
      const offsetYList = getOffsetYList();
      let nextIndex = index;
      if (index < 0) {
        nextIndex = 0;
      } else if (index >= offsetYList.length) {
        nextIndex = offsetYList.length - 1;
      }
      api.start({ y: offsetYList[nextIndex], immediate });
    },
    [api, getOffsetYList],
  );

  const hanldeChange = (value: number | string) => {
    const pickerValue = pickerContext.value?.slice(0) || [];
    pickerValue[itemIndex] = value;
    pickerContext.onChange?.(pickerValue, itemIndex);
    props.onChange?.(value);
  };

  useDebounceEffect(
    () => {
      if (currentIndex === lastIndexRef.current) return;
      if (currentIndex >= 0) {
        srollTo(currentIndex, isUndefined(lastIndexRef.current));
      } else {
        api.start({ y: 0 });
      }
      lastIndexRef.current = currentIndex;
    },
    [api, currentIndex, srollTo],
    { wait: 100 },
  );

  useDrag(
    ({ offset: [, offsetY], direction: [, directionY], last }) => {
      if (last) {
        const offsetYList = getOffsetYList();
        const lastIndex = lastIndexRef.current;
        const nextOffsetY = nearest({
          items: offsetYList,
          target: offsetY,
          threshold: 10,
          direction: directionY as -1 | 1,
        });
        const nextIndex = offsetYList.findIndex((item) => item === nextOffsetY);
        if (isUndefined(value)) {
          lastIndexRef.current = nextIndex;
          api.start({
            to: async (next) => {
              await next({ y: nextOffsetY });
              hanldeChange(options[nextIndex].value);
            },
          });
        } else {
          // 受控模式,onChange回调后等待value更新，如果不更新回退到原处
          hanldeChange(options[nextIndex].value);
          setTimeout(() => {
            if (lastIndex === lastIndexRef.current) {
              api.start({ y: offsetYList[lastIndex] || 0 });
            }
          }, 100);
        }
      } else {
        api.start({ y: offsetY });
      }
    },
    {
      target: rootRef,
      axis: 'y',
      from: () => [0, y.get()],
      transform: ([x, y]) => [x, -y],
      filterTaps: true,
      pointer: { touch: true },
      rubberband: true,
      preventDefault: true,
      bounds: () => {
        const controlYCompensation = getControlYCompensation();
        let bottom: undefined | number;
        if (controlRef.current) {
          bottom = controlRef.current.clientHeight - controlYCompensation - getControlItemHeight();
        }
        return {
          top: -controlYCompensation,
          bottom,
        };
      },
    },
  );

  return withNativeProps(
    props,
    <div className={name} ref={rootRef}>
      <animated.div ref={controlRef} className={`${name}__wrapper`} style={{ y: y.to((y) => -y) }}>
        {options.map((item) => (
          <div key={item.value} className={`${name}__item`}>
            {(formatter && formatter(item)) || item.label}
          </div>
        ))}
      </animated.div>
    </div>,
  );
});

PickerItem.defaultProps = pickerItemDefaultProps;
PickerItem.displayName = 'PickerItem';

export default PickerItem;
