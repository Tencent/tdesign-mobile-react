import React, { FC, useMemo, useRef } from "react";
import classnames from "classnames"
import useConfig from "tdesign-mobile-react/_util/useConfig";
import { animated, useSpring, useSprings } from 'react-spring' 
import { useDrag } from "@use-gesture/react";
import nearest from "tdesign-mobile-react/_util/nearest";
import { SliderValue, TdSliderProps } from "./type";
import Handle from "./Handle";
import { usePropsValue } from "../_util/usePropsValues";

const DEFAULT_DISABLED = false;
const DEFAULT_MAX= 100;
const DEFAULT_MIN= 0;
const DEFAULT_RANGE= false;
const DEFAULT_STEP= 1;
const DEFAULT_TITLE = '';
const DEFAULT_SHOW_VALUE = false;

const Slider: FC<TdSliderProps> = (props) => {
    const { classPrefix } = useConfig();
    const name = `${classPrefix}-slider`;

    const { 
        disabled = DEFAULT_DISABLED,
        max = DEFAULT_MAX,
        min = DEFAULT_MIN,
        range = DEFAULT_RANGE,
        step = DEFAULT_STEP,
        value,
        defaultValue,
        title = DEFAULT_TITLE, // @TODOS 缺api
        showValue = DEFAULT_SHOW_VALUE, // @TODOS 缺api
        marks, // @TODOS 缺api
        onChange
    } = props;

    const barRef = useRef<HTMLDivElement>(null);
    const handleRef = useRef<HTMLDivElement>(null);

    // const bind = useDrag(
    //     ({ down, offset: [offsetX], direction: [directionX] }) => {
    //         api.start({
    //             offsetX: newValue,
    //         })
    //     },
    // )
    // const [{ offsetX, trackWidth }, api] = useSpring(
    //     () => {
    //         return {
    //             offsetX: handleLeft,
    //             trackWidth: 0,
    //             config: {
    //                 // 整体速度
    //                 tension: 0,
    //             }
    //         }
    //     },
    //     []
    // )

    const [rawValue, setRawValue] = usePropsValue<SliderValue>({
        value,
        defaultValue,
        onChange
    });

    // 计算要显示的点
    const pointList = useMemo(() => {
        if (marks) {
            return Object.keys(marks).map(parseFloat).sort((a, b) => a - b);
        }
    }, [marks, step, min, max]);

    const firstValueRef = useRef<[number, number]>();

    const handleClick = (e) => {

        if (disabled) return;

        e.stopPropagation();

        const bar = barRef.current;
        if (!bar) return;

        const sliderOffsetLeft = bar.getBoundingClientRect().left;
        const position = ((e.clientX - sliderOffsetLeft) / Math.ceil(bar.offsetWidth)) * (max - min) + min;

        const targetValue = getValueByPosition(position);
        let next: [number, number];
        if (range) {
            if (Math.abs(targetValue - sliderValue[0]) > Math.abs(targetValue - sliderValue[1])) {
                next = [sliderValue[0], targetValue];
            } else {
                next = [targetValue, sliderValue[1]];
            }
        } else {
            next = [min, targetValue];
        }
        updateSliderValue(next);
    }

    function getValueByPosition(position: number) {
        const newPosition = position < min ? min : position > max ? max : position;
    
        let value = min;
    
        // 如果有显示刻度点，就移动到刻度点上
        if (pointList?.length) {
            value = nearest({
                items: pointList, 
                target: newPosition,
            })
        } else {
            const lengthPerStep = 100 / ((max - min) / step);
            const steps = Math.round(newPosition / lengthPerStep);
            value = steps * lengthPerStep * (max - min) * 0.01 + min;
        }
        return value;
    }

    // 排序
    function sortValue(val: [number, number]): [number, number] {
        return val.sort((a, b) => a - b);
    }

    // 统一单/双游标滑块value结构
    function convertValue(value: SliderValue): [number, number] {
        return (range ? value : [min, value]) as [number, number];
    }
    
    function reverseValue(value: [number, number]): SliderValue {
        return range ? value : value[1];
    }

    const sliderValue = sortValue(convertValue(rawValue));
    
    const trackSize = `${(100 * (sliderValue[1] - sliderValue[0])) / (max - min)}%`;
    console.log(sliderValue);
    22 / 70
    console.log(trackSize);
    
    
    const trackStart = `${(100 * (sliderValue[0] - min)) / (max - min)}%`;

    // 更新滑块value
    function updateSliderValue(value: [number, number]) {
      const next = sortValue(value);
      const current = sliderValue;
      if (next[0] === current[0] && next[1] === current[1]) return;
      setRawValue(reverseValue(next));
    }

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
                        firstValueRef.current = sliderValue;
                    }
                    const val = getValueByPosition(position);
                    const firstValue = firstValueRef.current;
                    if (!firstValue) return;
                    const next = [...firstValue] as [number, number];
                    next[index] = val;
                    updateSliderValue(next);
                }}
            />
        )

    return <>
        <div 
            className={classnames([
                `${name}-wrap`,
                disabled ? `${classPrefix}-is-disabled` : ''
            ])}
        >
           {
               !range ?
               (<>
                    <>
                        {
                            title && (
                                <div className={`${name}-wrap__title`}>
                                    { title }
                                </div>
                            )
                        }
                    </>
                    <div className={name} onClick={handleClick}>
                        {/* 总长度 */}
                        <div ref={barRef} className={`${name}__bar`}></div>
                        {/* 滑块长度 */}
                        <div
                            className={`${name}__track`} 
                            style={{
                                width: trackSize,
                            }}
                            ref={handleRef}
                        />
                        {/* 单游标滑块操作 */}
                        {renderHandle(1)}
                        {/* 刻度内容 */}
                        {
                            marks && (
                                <div className={`${name}__mark`}>
                                    {
                                        Object.keys(marks).map((key) => (
                                            <div 
                                                className={`${name}__mark-text`}
                                                key={key}
                                                style={{
                                                    left: `${key}%`
                                                }}
                                            >
                                                { marks[key] }
                                            </div>
                                        ))
                                    }
                                </div>
                            )
                        }
                    </div>
                    <>
                        {
                            showValue && (
                                <div className={`${name}-wrap__value`}>
                                    { sliderValue[1] }
                                </div>
                            )
                        }
                    </>
                </>) :
               (<>
                    <>
                        {
                            <div className={`${name}-wrap__value-left`}>
                                { min }
                            </div>
                        }
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
                        {renderHandle(1)}

                        {/* 刻度内容 */}
                        {
                            <div className={`${name}__mark`}>
                                {
                                    sliderValue.map((item, index) => (
                                        <div 
                                            className={`${name}__mark-text`}
                                            key={index}
                                            style={{
                                                left: `${item}%`
                                            }}
                                            >
                                                { item }
                                        </div>
                                    ))
                                }
                            </div>
                        }
                    </div>
                    <>
                        {
                            <div className={`${name}-wrap__value`}>
                                { max }
                            </div>
                        }
                    </>
               </>)
           }
        </div>
    </>
}


Slider.displayName = 'Slider';

export default Slider;
