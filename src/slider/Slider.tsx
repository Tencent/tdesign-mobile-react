import React, { FC, useCallback, useMemo, useRef } from "react";
import classnames from "classnames";
import identity from "lodash/identity";
import isArray from "lodash/isArray";
import useConfig from "tdesign-mobile-react/_util/useConfig";
import nearest from "tdesign-mobile-react/_util/nearest";
import useDefault from "tdesign-mobile-react/_util/useDefault";
import withNativeProps, {
  NativeProps,
} from "tdesign-mobile-react/_util/withNativeProps";
import Handle from "./Handle";
import Marks from "./Marks";
import { SliderValue, TdSliderProps } from "./type";

const defaultProps = {
  disabled: false,
  max: 100,
  min: 0,
  range: false,
  step: 1,
  label: true,
  showExtremeValue: false,
  onChange: identity,
  onDragstart: identity,
  onDragend: identity,
};

export interface SliderProps extends TdSliderProps, NativeProps {}

const Slider: FC<SliderProps> = (props) => {
  const { classPrefix } = useConfig();
  const name = `${classPrefix}-slider`;

  const {
    disabled,
    max,
    min,
    range,
    step,
    value,
    defaultValue,
    marks,
    showExtremeValue,
    label,
    onChange,
    onDragstart,
    onDragend,
  } = props;

  const barRef = useRef<HTMLDivElement>(null);
  const handleRef = useRef<HTMLDivElement>(null);
  const firstValueRef = useRef<[number, number]>();
  const dragLockRef = useRef(false);

  const [rawValue, setRawValue] = useDefault<SliderValue, any>(
    value,
    defaultValue || (range ? [min, min] : min),
    onChange
  );

  // 排序
  const sortValue = useCallback(
    (val: [number, number]): [number, number] => val.sort((a, b) => a - b),
    []
  );

  // 统一单/双游标滑块value结构
  const convertValue = useCallback(
    (value: SliderValue): [number, number] =>
      (range ? value : [min, value]) as [number, number],
    [min, range]
  );

  const reverseValue = useCallback(
    (value: [number, number]): SliderValue => (range ? value : value[1]),
    [range]
  );

  // 计算要显示的点
  const pointList = useMemo(() => {
    if (marks) {
      return isArray(marks)
        ? marks.sort((a, b) => a - b)
        : Object.keys(marks)
            .map(parseFloat)
            .sort((a, b) => a - b);
    }
    const points: number[] = [];
    for (let i = min; i <= max; i += step) {
      points.push(i);
    }
    return points;
  }, [marks, max, min, step]);

  const sliderValue = useMemo(() => sortValue(convertValue(rawValue)), [rawValue, convertValue, sortValue]);

  const trackSize = `${
    (100 * (sliderValue[1] - sliderValue[0])) / (max - min)
  }%`;

  const trackStart = `${(100 * (sliderValue[0] - min)) / (max - min)}%`;

  const getValueByPosition = (position: number) => {
    let newPosition = position;
    if (position < min) {
      newPosition = min;
    } else if (position > max) {
      newPosition = max;
    }

    let value = min;

    // 如果有显示刻度点，就移动到刻度点上
    if (pointList?.length) {
      value = nearest({
        items: pointList,
        target: newPosition,
      });
    } else {
      const lengthPerStep = 100 / ((max - min) / step);
      const steps = Math.round(newPosition / lengthPerStep);
      value = lengthPerStep * steps * (max - min) * 0.01 + min;
    }
    return value;
  };

  // 更新滑块value
  const updateSliderValue = (value: [number, number]) => {
    const next = sortValue(value);
    const current = sliderValue;
    if (next[0] === current[0] && next[1] === current[1]) return;
    setRawValue(reverseValue(next));
  };

  const handleClick = (e) => {
    if (!dragLockRef.current) return;
    if (disabled) return;

    e.stopPropagation();

    const bar = barRef.current;
    if (!bar) return;

    const sliderOffsetLeft = bar.getBoundingClientRect().left;
    const position =
      ((e.clientX - sliderOffsetLeft) / Math.ceil(bar.offsetWidth)) *
        (max - min) +
      min;

    const targetValue = getValueByPosition(position);
    let next: [number, number];
    if (range) {
      if (
        Math.abs(targetValue - sliderValue[0]) >
        Math.abs(targetValue - sliderValue[1])
      ) {
        next = [sliderValue[0], targetValue];
      } else {
        next = [targetValue, sliderValue[1]];
      }
    } else {
      next = [min, targetValue];
    }

    updateSliderValue(next);
  };

  // 游标滑块
  const renderHandle = (index: number) => (
    <Handle
      key={index}
      value={sliderValue[index]}
      min={min}
      max={max}
      disabled={disabled}
      barRef={barRef}
      onDrag={(position, first, last) => {
        if (first) {
          dragLockRef.current = true;
          firstValueRef.current = sliderValue;
          onDragstart();
        }
        const val = getValueByPosition(position);
        const firstValue = firstValueRef.current;
        if (!firstValue) return;
        const next = [...firstValue] as [number, number];
        next[index] = val;
        updateSliderValue(next);
        if (last) {
          onDragend();
          window.setTimeout(() => {
            dragLockRef.current = false;
          }, 100);
        }
      }}
    />
  );

  return withNativeProps(
    props,
    <div
      className={classnames(`${name}-wrap`, {
        [`${classPrefix}-is-disabled`]: disabled,
      })}
    >
      {showExtremeValue && (
        <div className={`${name}-wrap__value-left`}>{min}</div>
      )}
      <div className={name} onClick={handleClick}>
        {/* 总长度 */}
        <div ref={barRef} className={`${name}__bar`}></div>
        {/* 滑块长度 */}
        <div
          className={`${name}__track`}
          style={{
            width: trackSize,
            left: trackStart,
          }}
          ref={handleRef}
        />
        {/* 双游标滑块操作 */}
        {range && renderHandle(0)}
        {/* 单游标滑块操作 */}
        {renderHandle(1)}
        {/* 刻度内容 */}
        <Marks marks={marks} range={range} value={sliderValue} />
      </div>
      {!range && label && (
        <div className={`${name}-wrap__value`}>{sliderValue[1]}</div>
      )}
      {showExtremeValue && <div className={`${name}-wrap__value`}>{max}</div>}
    </div>
  );
};

Slider.defaultProps = defaultProps;
Slider.displayName = "Slider";

export default Slider;
