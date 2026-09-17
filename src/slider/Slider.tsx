import React, { FC, useEffect, useRef, useState } from 'react';
import type { MouseEvent, TouchEvent } from 'react';
import classNames from 'classnames';
import { cloneDeep, isFunction } from 'lodash-es';
import { usePrefixClass } from '../hooks/useClass';
import useDefaultProps from '../hooks/useDefaultProps';
import useDefault from '../_util/useDefault';
import { StyledProps } from '../common';
import { SliderValue, TdSliderProps } from './type';
import { sliderDefaultProps } from './defaultProps';
import { trimSingleValue, trimValue } from './utils';
import { BLOCK_SIZE, BORDER_WIDTH } from './constants';

export interface SliderProps extends TdSliderProps, StyledProps {}

const Slider: FC<SliderProps> = (props) => {
  const {
    className,
    style,
    disabled,
    max,
    min,
    range,
    step,
    theme,
    value,
    defaultValue,
    marks,
    showExtremeValue,
    label,
    vertical,
    onChange,
    onDragend,
    onDragstart,
  } = useDefaultProps(props, sliderDefaultProps);

  const [scaleArray, setScaleArray] = useState<any[]>([]);
  const [scaleTextArray, setScaleTextArray] = useState<any[]>([]);
  const [isScale, setIsScale] = useState<boolean>(false);
  const [maxRange, setMaxRange] = useState<number>(0);
  const [dotTopValue, setDotTopValue] = useState<number[]>([0, 0]);
  const [lineLeft, setLineLeft] = useState<number>();
  const [lineRight, setLineRight] = useState<number>(0);
  const [lineBarWidth, setLineBarWidth] = useState<number>(0);
  const rootRef = useRef<HTMLDivElement>(null);
  const leftDotRef = useRef<HTMLDivElement>(null);
  const rightDotRef = useRef<HTMLDivElement>(null);
  const sliderLineRef = useRef<HTMLDivElement>(null);
  const initialLeft = useRef<number>(0);
  const initialRight = useRef<number>(0);
  const [innerValue, setInnerValue] = useDefault(value, defaultValue, onChange);
  const scope = Number(max) - Number(min);

  const rootClassName = usePrefixClass('slider');

  const containerClassName = classNames(
    rootClassName,
    {
      [`${rootClassName}--top`]: label || scaleTextArray.length,
      [`${rootClassName}--disabled`]: disabled,
      [`${rootClassName}--range`]: range,
      [`${rootClassName}--vertical`]: vertical,
    },
    className,
  );
  const sliderLineClassName = classNames(`${rootClassName}__bar`, `${rootClassName}__bar--${theme}`, {
    [`${rootClassName}__bar--disabled`]: disabled,
    [`${rootClassName}__bar--marks`]: isScale && theme === 'capsule',
  });
  const sliderMaxTextClassName = classNames(`${rootClassName}__value`, `${rootClassName}__value--max`);

  useEffect(() => {
    function getInitialStyle(theme: 'default' | 'capsule') {
      const line = sliderLineRef.current?.getBoundingClientRect() as DOMRect;
      const halfBlock = Number(BLOCK_SIZE) / 2;
      const lineRange = vertical ? line.bottom - line.top : line.right - line.left;

      setMaxRange(theme === 'capsule' ? lineRange - BLOCK_SIZE - BORDER_WIDTH : lineRange);
      initialLeft.current = vertical ? line.top : line.left;
      initialRight.current = vertical ? line.bottom : line.right;
      if (theme === 'capsule') {
        initialLeft.current -= halfBlock;
        initialRight.current -= halfBlock;
      }
    }

    if (theme) {
      getInitialStyle(theme);
    }
  }, [theme, vertical]);

  useEffect(() => {
    function setSingleBarWidth(value: number) {
      const halfBlock = theme === 'capsule' ? BLOCK_SIZE / 2 : 0;
      const percentage = (Number(value) - min) / scope;
      setLineBarWidth(percentage * maxRange + halfBlock);
    }

    function setLineStyle(left: number, right: number) {
      const parseNumber = (v: any) => parseInt(v, 10);
      const halfBlock = theme === 'capsule' ? BLOCK_SIZE / 2 : 0;
      const [a, b] = innerValue as Array<number>;

      setDotTopValue([a, b]);

      if (left + right <= maxRange) {
        setLineLeft(parseNumber(left + halfBlock));
        setLineRight(parseNumber(right + halfBlock));
      } else {
        setLineLeft(parseNumber(maxRange + halfBlock - right));
        setLineRight(parseNumber(maxRange - left + halfBlock * 1.5));
      }
    }

    if (!range) {
      setSingleBarWidth(innerValue as number);
      return;
    }
    const left = (maxRange * (innerValue[0] - min)) / scope;
    const right = (maxRange * (max - innerValue[1])) / scope;
    setLineStyle(left, right);
  }, [innerValue, max, maxRange, min, range, scope, theme]);

  useEffect(() => {
    function handleMask(marks: any) {
      const calcPos = (arr: number[]) => {
        const margin = theme === 'capsule' ? BLOCK_SIZE / 2 : 0;
        return arr.map((item) => ({
          val: item,
          left: Math.round(((item - min) / scope) * maxRange) + margin,
        }));
      };
      if (marks?.length && Array.isArray(marks)) {
        setIsScale(true);
        setScaleArray(calcPos(marks));
        setScaleTextArray([]);
      }

      if (Object.prototype.toString.call(marks) === '[object Object]') {
        const scaleArray = Object.keys(marks).map((item) => Number(item));
        const scaleTextArray = scaleArray.map((item) => (isFunction(marks[item]) ? marks[item](item) : marks[item]));
        setIsScale(scaleArray.length > 0);
        setScaleArray(calcPos(scaleArray));
        setScaleTextArray(scaleTextArray);
      }
    }

    if (marks) {
      handleMask(marks);
    }
  }, [marks, maxRange, min, scope, theme]);

  const getValue = (label: any, value: any) => {
    const REGEXP = /[$][{value}]{7}/;
    if (isFunction(label)) {
      return label(value);
    }
    if (label && !REGEXP.test(label)) {
      return value;
    }
    if (REGEXP.test(label)) {
      return label.replace(REGEXP, value);
    }
  };

  const convertPosToValue = (posValue: number, isLeft = true) =>
    isLeft ? (posValue / maxRange) * scope + min : max - (posValue / maxRange) * scope;

  const getPrecision = () => {
    const precisions = [min, max, step].map((item) => {
      const decimalArr = `${item}`.split('.');
      return decimalArr[1] ? decimalArr[1].length : 0;
    });
    return Math.max.apply(null, precisions);
  };

  const calcByStep = (value: number): number => {
    const precision = getPrecision();
    if (step < 0 || step > scope) {
      return Number(parseFloat(`${value}`).toFixed(precision));
    }
    const closestStep = trimSingleValue(Math.round(value / step) * step, min, max);

    return Number(parseFloat(`${closestStep}`).toFixed(precision));
  };

  const changeValue = (value: SliderValue) => {
    setInnerValue(trimValue(value, { min, max, range }));
  };

  const getTouchPosition = (e: TouchEvent) => {
    const touch = e?.changedTouches?.[0] as Touch | undefined;
    if (!touch) {
      return 0;
    }
    return vertical ? touch.pageY : touch.pageX;
  };

  const getMousePosition = (e: MouseEvent) => (vertical ? e.clientY : e.clientX);

  const handleRangeClick = (e: MouseEvent) => {
    e.stopPropagation();
    if (disabled) {
      return;
    }
    const halfBlock = props.theme === 'capsule' ? Number(BLOCK_SIZE) / 2 : 0;
    const position = getMousePosition(e);
    const currentLeft = position - initialLeft.current;
    if (currentLeft < 0 || currentLeft > maxRange + Number(BLOCK_SIZE)) {
      return;
    }

    const leftDotValue = leftDotRef.current?.getBoundingClientRect() as DOMRect;
    const rightDotValue = rightDotRef.current?.getBoundingClientRect() as DOMRect;
    const leftDotPosition = vertical ? leftDotValue.top : leftDotValue.left;
    const rightDotPosition = vertical ? rightDotValue.top : rightDotValue.left;
    // 点击处-halfblock 与 leftDot起始侧的距离（绝对值）
    const distanceLeft = Math.abs(position - leftDotPosition - halfBlock);
    // 点击处-halfblock 与 rightDot起始侧的距离（绝对值）
    const distanceRight = Math.abs(rightDotPosition - position + halfBlock);
    // 哪个绝对值小就移动哪个Dot
    const isMoveLeft = distanceLeft < distanceRight;

    if (isMoveLeft) {
      // 当前leftdot中心 + 偏移量 = 目标起始中心距离
      const left = position - initialLeft.current;
      const leftValue = convertPosToValue(left);
      changeValue([calcByStep(leftValue), innerValue?.[1]]);
    } else {
      const right = -(position - initialRight.current);
      const rightValue = convertPosToValue(right, false);
      changeValue([innerValue?.[0], calcByStep(rightValue)]);
    }
  };

  const handleSingleClick = (e: MouseEvent) => {
    e.stopPropagation();
    if (disabled) {
      return;
    }
    if (!sliderLineRef.current) {
      return;
    }
    const currentLeft = getMousePosition(e) - initialLeft.current;
    const value = convertPosToValue(currentLeft);
    changeValue(calcByStep(value));
  };

  const onTouchStart = (e: TouchEvent<HTMLDivElement>) => {
    onDragstart?.({ e });
  };

  const onTouchEnd = (e: TouchEvent<HTMLDivElement>) => {
    onDragend?.(innerValue, { e });
  };

  const onTouchMoveLeft = (e: TouchEvent) => {
    if (disabled) {
      return;
    }
    const currentLeft = getTouchPosition(e) - initialLeft.current;
    const newData = cloneDeep(innerValue as number[]);
    const leftValue = convertPosToValue(currentLeft);
    newData[0] = calcByStep(leftValue);
    changeValue(newData);
  };

  const onTouchMoveRight = (e: TouchEvent) => {
    if (disabled) {
      return;
    }
    const currentRight = -(getTouchPosition(e) - initialRight.current);
    const newData = cloneDeep(innerValue as number[]);
    const rightValue = convertPosToValue(currentRight, false);
    newData[1] = calcByStep(rightValue);
    changeValue(newData);
  };

  const onSingleDotMove = (e: TouchEvent) => {
    if (disabled) {
      return;
    }
    const value = convertPosToValue(getTouchPosition(e) - initialLeft.current);
    changeValue(calcByStep(value));
  };

  const renderMinText = () => {
    if (!showExtremeValue) {
      return null;
    }
    const textClassName = classNames({
      [`${rootClassName}__value`]: !range,
      [`${rootClassName}__value--min`]: !range,
      [`${rootClassName}__range-extreme`]: range,
      [`${rootClassName}__range-extreme--min`]: range,
    });
    if (range) {
      return <div className={textClassName}>{min}</div>;
    }
    return <div className={textClassName}>{label ? getValue(label, min) : min}</div>;
  };

  const renderMaxText = () => {
    if (!showExtremeValue) {
      return null;
    }
    if (range) {
      return <div className={sliderMaxTextClassName}>{max}</div>;
    }
    return <div className={sliderMaxTextClassName}>{label ? getValue(label, max) : max}</div>;
  };

  const renderScale = () => {
    if (!isScale) {
      return null;
    }
    return scaleArray.map((item, index) => (
      <div
        key={index}
        style={
          vertical
            ? { top: item.left, transform: 'translate(-50%, -50%)' }
            : { left: item.left, transform: 'translateX(-50%)' }
        }
        className={classNames(
          `${rootClassName}__scale-item`,
          `${rootClassName}__scale-item`,
          `${rootClassName}__scale-item--${theme}`,
          {
            [`${rootClassName}__scale-item--active`]:
              (!range && Number(innerValue) >= item.val) ||
              (range && dotTopValue[1] >= item.val && item.val >= dotTopValue[0]),
            [`${rootClassName}__scale-item--disabled`]: disabled,
            [`${rootClassName}__scale-item--hidden`]:
              ((index === 0 || index === scaleArray.length - 1) && theme === 'capsule') || innerValue === item.val,
          },
        )}
      >
        {scaleTextArray.length ? (
          <div className={`${rootClassName}__scale-desc ${rootClassName}__scale-desc--${theme}`}>
            {scaleTextArray[index]}
          </div>
        ) : null}
      </div>
    ));
  };

  const renderLineRange = () => (
    <div
      className={classNames(`${rootClassName}__line`, `${rootClassName}__line--${theme}`, {
        [`${rootClassName}__line--disabled`]: disabled,
      })}
      style={
        vertical
          ? { top: `${lineLeft}px`, bottom: `${lineRight}px` }
          : { left: `${lineLeft}px`, right: `${lineRight}px` }
      }
    >
      <div
        ref={leftDotRef}
        className={classNames(`${rootClassName}__dot`, `${rootClassName}__dot--left`)}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMoveLeft}
        onTouchEnd={onTouchEnd}
        onTouchCancel={onTouchEnd}
      >
        {label ? (
          <div
            className={classNames(`${rootClassName}__dot-value`, {
              [`${rootClassName}__dot-value--sr-only`]: !label,
            })}
          >
            {getValue(label, dotTopValue[0]) || dotTopValue[0]}
          </div>
        ) : null}
        <div className={`${rootClassName}__dot-slider`}></div>
      </div>
      <div
        ref={rightDotRef}
        className={classNames(`${rootClassName}__dot`, `${rootClassName}__dot--right`)}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMoveRight}
        onTouchEnd={onTouchEnd}
        onTouchCancel={onTouchEnd}
      >
        {props.label && (
          <div
            className={classNames(`${rootClassName}__dot-value`, {
              [`${rootClassName}__dot-value--sr-only`]: !props.label,
            })}
          >
            {getValue(props.label, dotTopValue[1]) || dotTopValue[1]}
          </div>
        )}
        <div className={`${rootClassName}__dot-slider`}></div>
      </div>
    </div>
  );

  const renderLineSingle = () => (
    <div
      className={classNames(
        `${rootClassName}__line`,
        `${rootClassName}__line--${theme}`,
        `${rootClassName}__line--single`,
        {
          [`${rootClassName}__line--disabled`]: disabled,
        },
      )}
      style={{ [vertical ? 'height' : 'width']: `${lineBarWidth}px` }}
    >
      <div
        className={`${rootClassName}__dot`}
        onTouchStart={onTouchStart}
        onTouchMove={onSingleDotMove}
        onTouchEnd={onTouchEnd}
        onTouchCancel={onTouchEnd}
      >
        {label ? (
          <div
            className={classNames(`${rootClassName}__dot-value`, {
              [`${rootClassName}__dot-value--sr-only`]: !label,
            })}
          >
            {getValue(label, value) || innerValue}
          </div>
        ) : null}
        <div className={`${rootClassName}__dot-slider`} />
      </div>
    </div>
  );

  return (
    <div ref={rootRef} className={containerClassName} style={style}>
      {renderMinText()}
      <div ref={sliderLineRef} className={sliderLineClassName} onClick={range ? handleRangeClick : handleSingleClick}>
        {renderScale()}
        {range ? renderLineRange() : renderLineSingle()}
      </div>
      {renderMaxText()}
    </div>
  );
};

Slider.displayName = 'Slider';

export default Slider;
