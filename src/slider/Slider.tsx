import React, { FC, useMemo, useRef } from "react";
import classnames from "classnames";
import useConfig from "tdesign-mobile-react/_util/useConfig";
import identity from "lodash/identity";
import nearest from "tdesign-mobile-react/_util/nearest";
import { SliderValue, TdSliderProps } from "./type";
import Handle from "./Handle";
import { usePropsValue } from "../_util/usePropsValues";
import Mark from "./Mark";

const defaultProps = {
  disabled: false,
  max: 100,
  min: 0,
  range: false,
  step: 1,
  value: undefined,
  defaultValue: undefined,
  marks: undefined,
  label: false,
  showExtremeValue: false,
  onChange: identity,
  onDragstart: identity,
  onDragend: identity,
};

const Slider: FC<TdSliderProps> = (props) => {
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
  const dragLockRef = useRef(0);

  const [rawValue, setRawValue] = usePropsValue<SliderValue>({
    value,
    defaultValue: defaultValue || (range ? [min, min] : min),
    onChange,
  });

  // 排序
  const sortValue = (val: [number, number]): [number, number] =>
    val.sort((a, b) => a - b);

  // 统一单/双游标滑块value结构
  const convertValue = (value: SliderValue): [number, number] =>
    (range ? value : [min, value]) as [number, number];

  const reverseValue = (value: [number, number]): SliderValue =>
    range ? value : value[1];

  // 计算要显示的点
  const pointList = useMemo(() => {
    if (marks) {
      return Object.keys(marks)
        .map(parseFloat)
        .sort((a, b) => a - b);
    }
    const points: number[] = [];
    for (let i = min; i <= max; i += step) {
      points.push(i);
    }
    return points;
  }, [marks, max, min, step]);

  const sliderValue = sortValue(convertValue(rawValue));

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
    if (dragLockRef.current > 0) return;
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
          dragLockRef.current = 1;
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
            dragLockRef.current = 0;
          }, 100);
        }
      }}
    />
  );

  return (
    <div
      className={classnames([
        `${name}-wrap`,
        disabled ? `${classPrefix}-is-disabled` : "",
      ])}
    >
      <>
        {showExtremeValue && (
          <div className={`${name}-wrap__value-left`}>{min}</div>
        )}
      </>
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
        <Mark marks={marks} range={range} value={sliderValue} />
      </div>
      <>
        {!range && label && (
          <div className={`${name}-wrap__value`}>{sliderValue[1]}</div>
        )}
      </>
      <>
        {showExtremeValue && <div className={`${name}-wrap__value`}>{max}</div>}
      </>
    </div>
  );
};

Slider.defaultProps = defaultProps;
Slider.displayName = "Slider";

export default Slider;
