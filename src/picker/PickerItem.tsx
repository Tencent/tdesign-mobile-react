import React, { FC, useRef, memo, useCallback, useContext, useMemo } from 'react';
import { useDebounceEffect } from 'ahooks';
import { isUndefined } from 'lodash-es';
import { useDrag } from '@use-gesture/react';
import { useSpring, motion } from 'motion/react';
import useDefaultProps from 'tdesign-mobile-react/hooks/useDefaultProps';
import useConfig from '../hooks/useConfig';
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
  const { options, value, defaultValue, itemIndex, formatter } = useDefaultProps(props, pickerItemDefaultProps);
  const { classPrefix } = useConfig();
  const name = `${classPrefix}-picker-item`;
  const rootRef = useRef<HTMLDivElement>(null);
  const controlRef = useRef<HTMLDivElement>(null);
  const lastIndexRef = useRef<number | undefined>(null);
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

  // const [{ y }, api] = useSpring(() => ({
  //   from: { y: 0 },
  //   config: {
  //     tension: 400,
  //     mass: 0.8,
  //   },
  // }));

  const y = useSpring(0, {
    stiffness: 5,
  });

  const srollTo = useCallback(
    (index: number, immediate = false) => {
      const offsetYList = getOffsetYList();
      let nextIndex = index;
      if (index < 0) {
        nextIndex = 0;
      } else if (index >= offsetYList.length) {
        nextIndex = offsetYList.length - 1;
      }
      const offsetY = offsetYList[nextIndex];
      if (immediate) {
        y.jump(-offsetY);
      } else {
        y.set(-offsetY);
      }
    },
    [getOffsetYList, y],
  );

  const handleChange = (value: number | string) => {
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
        y.set(0);
      }
      lastIndexRef.current = currentIndex;
    },
    [y, currentIndex, srollTo],
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
          y.set(-nextOffsetY);
          handleChange(options[nextIndex].value);
        } else {
          // 受控模式,onChange回调后等待value更新，如果不更新回退到原处
          handleChange(options[nextIndex].value);
          setTimeout(() => {
            if (lastIndex === lastIndexRef.current) {
              y.set(-offsetYList[lastIndex] || 0);
            }
          }, 100);
        }
      } else {
        y.set(-offsetY);
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
  console.log('y', y);
  return withNativeProps(
    props,
    <div className={name} ref={rootRef}>
      <motion.div ref={controlRef} className={`${name}__wrapper`} style={{ y }}>
        {options.map((item) => (
          <div key={item.value} className={`${name}__item`}>
            {(formatter && formatter(item)) || item.label}
          </div>
        ))}
      </motion.div>
    </div>,
  );
});

PickerItem.displayName = 'PickerItem';

export default PickerItem;
