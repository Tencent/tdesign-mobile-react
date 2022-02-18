import React, { FC, useEffect, useRef, useState } from "react";
import classnames from "classnames"
import useConfig from "tdesign-mobile-react/_util/useConfig";
import { TdSliderProps } from "./type";

export interface TouchData {
    startValue?: number;
    newValue?: number;
    startX?: number;
    deltaX?: number; // 拖动的距离
    offsetX?: number; // 拖动的距离，绝对值
}

const DFAULT_TOUCH_DATA = {
    startValue: 0,
    newValue: 0,
    startX: 0,
    deltaX: 0, 
    offsetX: 0, 
}

const DEFAULT_DISABLED = false;
const DEFAULT_MAX= 100;
const DEFAULT_MIN= 0;
const DEFAULT_RANGE= false;
const DEFAULT_STEP= 1;
const DEFAULT_TITLE = '';

const getSliderValue = (value: number | number[]): number[] => {
    if (typeof value === 'number') {
        return [value];
    } 
    return value;
}

const getMarksData = (marks, range) => {
    const arr: number[] = [];
    if (!range && marks) {
        Object.keys(marks).forEach(key => {
            arr.push(parseInt(key, 10))
        })
    }
    return arr.sort((a, b) => a - b);
}

const Slider: FC<TdSliderProps> = (prop) => {
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
        showValue = false, // @TODOS 缺api
        marks, // @TODOS 缺api
        onChange
    } = prop;

    // 判断是否受控
    const isControl = value !== undefined;

    const rootRef = useRef<HTMLDivElement>(null);
    const barRef = useRef<HTMLDivElement>(null);

    const [touchData, setTouchData] = useState<TouchData>(DFAULT_TOUCH_DATA);

    const [sliderValue, setSliderValue] = useState(getSliderValue(isControl ? value : defaultValue));

    const [marksData] = useState(getMarksData(marks, range))

    const [handleLeft, setHandleLeft] = useState([0]);

    const [trackWidth, setTrackWidth] = useState(0);

    const [trackLeft, setTrackLeft] = useState(0);

    useEffect(() => {
        // @TODOS 缺value校验
        if (range) {
            setTrackLeft((sliderValue[0]  - min) / (max - min ) * 100)
            setTrackWidth((sliderValue[1] - sliderValue[0]  - min) / (max - min ) * 100)
            setHandleLeft([(sliderValue[0]  - min) / (max - min ) * 100, (sliderValue[1]  - min) / (max - min ) * 100])
        } else {
            setHandleLeft([(sliderValue[0]  - min) / (max - min ) * 100])
            setTrackWidth((sliderValue[0]  - min) / (max - min ) * 100)
        } 
    }, [sliderValue, max, min, setHandleLeft, setTrackLeft, setTrackWidth, range]);

    const format = (value: number) => {
        let current = value;
        if (!range && marks) {   
            if (marksData.length) {
                let min = marksData[0];
              
                marksData.forEach((marksDataItemValue) => {
                    if (Math.abs(marksDataItemValue - value) < Math.abs(min - value)) {
                        min = marksDataItemValue;
                    }
                });

                current = min;
            }
        }
        return Math.round(Math.max(min, Math.min(current, max)) / step) * step;
    }

    const updateValue = (newValue, index) => {
        if (isControl) {
            // 受控模式才能更新内部状态
            const formatValue = format(newValue)
            if (range) {
                // 双游标
                sliderValue[index] = formatValue;
                setSliderValue([...sliderValue]);
                onChange && onChange(sliderValue);
            } else if (formatValue !== touchData.startValue) {
                // 单游标
                setSliderValue([formatValue]);
                onChange && onChange(sliderValue);
            } 
        }
    }

    const handleTouchStart = (e) => {
        if (disabled) return;
        e.stopPropagation();

        const { dataset: { index } = { index: 0} } = e.target as any;

        setTouchData({
            ...touchData,
            deltaX: 0,
            offsetX: 0,
            startX: e.touches[0].clientX,
            startValue: format(sliderValue[index]),
        })
    }

    const handleTouchMove = (e) => {
        if (disabled) return;
        e.stopPropagation();

        const touch = e.touches[0];

        const deltaX = touch.clientX - touchData.startX;

        const rect = rootRef.current.getBoundingClientRect();

        const total = rect.width;

        const diff = (deltaX / total) * (max - min);

        const newValue = touchData.startValue + diff
        
        const { dataset: { index } = { index: 0} } = e.target as any;

        setTouchData({
            ...touchData,
            deltaX,
            offsetX: Math.abs(deltaX),
            newValue,
        })

        updateValue(newValue, index)
    }

    const handleTouchEnd = (e) => {
        if (disabled) return;
        
        e.stopPropagation();
        e.preventDefault();

        const { dataset: { index } = { index: 0} } = e.target as any;

        updateValue(touchData.newValue, index);
    }

    const handleClick = (e) => {
        if (disabled) return;
        e.stopPropagation();

        const rect = barRef.current.getBoundingClientRect();

        const deltaX = e.clientX - rect.left;

        const total = rect.width;

        const current = (deltaX / total) * (max - min) + min;

        let index = 0;

        if (range) {
            if (Math.abs(current - sliderValue[0]) > Math.abs(current - sliderValue[1])) {
              index = 1;
            }
        }

        setTouchData({
            ...touchData,
            startValue: sliderValue[index],
        })

        updateValue(current, index);
    }

    useEffect(() => {
        setSliderValue(getSliderValue(isControl ? value : defaultValue));
    }, [value, defaultValue, isControl])

    return <>
        <div 
            ref={rootRef} 
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
                            title ? <>
                                <div className={`${name}-wrap__title`}>
                                    { title }
                                </div>
                            </> : null
                        }
                    </>
                    <div className={name} onClick={handleClick}>
                        {/* 总长度 */}
                        <div ref={barRef} className={`${name}__bar`}></div>
                        {/* 滑块长度 */}
                        <div className={`${name}__track`} style={{
                            width: `${trackWidth}%`
                        }}></div>
                        {/* 滑块操作 */}
                        {
                            sliderValue.map((item, index) => (
                                <div 
                                    key={index + 1} 
                                    className={`${name}__handle`} 
                                    style={{
                                    left: `${handleLeft[index]}%`
                                    }}
                                    data-index={index}
                                    onTouchStart={handleTouchStart}
                                    onTouchMove={handleTouchMove}
                                    onTouchEnd={handleTouchEnd}
                                />
                            ))
                        } 
                        {/* 刻度内容 */}
                        {
                            marks && (<div className={`${name}__mark`}>
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
                            </div>)
                        }
                    </div>
                    <>
                        {
                            showValue && sliderValue.map((item, index) => (
                                <div className={`${name}-wrap__value`} key={index}>
                                    { item }
                                </div>
                            ))
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
                        <div className={`${name}__track`} style={{
                            left: `${trackLeft}%`,
                            width: `${trackWidth}%`
                        }} />
                        {/* 滑块操作 */}
                        {
                            sliderValue.map((item, index) => (
                                <div 
                                    key={index + 1} 
                                    className={`${name}__handle`} 
                                    style={{
                                        left: `${handleLeft[index]}%`
                                    }}
                                    data-index={index}
                                    onTouchStart={handleTouchStart}
                                    onTouchMove={handleTouchMove}
                                    onTouchEnd={handleTouchEnd}
                                />
                            ))
                        } 
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

export default Slider;
