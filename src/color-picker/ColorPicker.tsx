import React, { FC, TouchEvent, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import classNames from 'classnames';
import { usePrefixClass } from '../hooks/useClass';
import { Color, Coordinate, genGradientPoint, getColorObject, gradientColors2string } from '../_common/js/color-picker';
import {
  DEFAULT_COLOR,
  DEFAULT_LINEAR_GRADIENT,
  SATURATION_PANEL_DEFAULT_HEIGHT,
  SATURATION_PANEL_DEFAULT_WIDTH,
  SLIDER_DEFAULT_WIDTH,
} from '../_common/js/color-picker/constants';
import { PanelRectType } from './types';
import { genSwatchList, getCoordinate, getFormatList } from './helper/format';
import type { StyledProps } from '../common';
import type { GradientColorPoint } from '../_common/js/color-picker/gradient';
import type { ColorPickerChangeTrigger, TdColorPickerProps, colorModesEnum } from './type';
import { colorPickerDefaultProps } from './defaultProps';
import useDefaultProps from '../hooks/useDefaultProps';
import { ALPHA_MAX, GRADIENT_THUMB_HIT_TOLERANCE, HUE_MAX } from './constants';

export interface ColorPickerProps extends TdColorPickerProps, StyledProps {}

const ColorPicker: FC<ColorPickerProps> = (props) => {
  const {
    format,
    type,
    enableAlpha,
    swatchColors,
    style,
    value,
    defaultValue,
    fixed,
    colorModes,
    enableMultipleGradient,
    onChange,
    onPaletteBarChange,
  } = useDefaultProps(props, colorPickerDefaultProps);
  const [formatList, setFormatList] = useState<[string, Array<string | number>]>(['', []]);
  const [innerSwatchList, setInnerSwatchList] = useState([]);
  const [sliderInfo, setSliderInfo] = useState(0);
  const [panelRect, setPanelRect] = useState<PanelRectType>({
    width: SATURATION_PANEL_DEFAULT_WIDTH,
    height: SATURATION_PANEL_DEFAULT_HEIGHT,
    left: 0,
    top: 0,
  });
  const [sliderRect, setSilderRect] = useState({
    width: SLIDER_DEFAULT_WIDTH,
    left: 0,
  });
  const [saturationThumbStyle, setSaturationThumbStyle] = useState({
    top: '0',
    left: '0',
    color: '',
  });
  const [hueSliderStyle, setHueSliderStyle] = useState({
    color: '',
    left: '0%',
  });
  const [alphaSliderStyle, setAlphahueSliderStyle] = useState({
    color: '',
    left: '0%',
  });
  const resizeObserverRef = useRef<ResizeObserver>(null);
  const saturationElementRef = useRef<HTMLDivElement>(null);
  const sliderElementRef = useRef<HTMLDivElement>(null);
  const gradientElementRef = useRef<HTMLDivElement>(null);
  const hasInit = useRef<boolean>(false);
  const [, setUpdateId] = useState(0); // 确保渐变点变化后 UI 同步更新
  const innerModes = useMemo(() => (Array.isArray(colorModes) ? colorModes : [colorModes]), [colorModes]);
  const supportMonochrome = innerModes.includes('monochrome');
  const supportGradient = innerModes.includes('linear-gradient');

  const getModeByValue = useCallback(
    (input?: string): colorModesEnum => {
      if (!supportGradient) return 'monochrome';
      if (!supportMonochrome) return 'linear-gradient';
      return Color.isGradientColor(input) ? 'linear-gradient' : 'monochrome';
    },
    [supportMonochrome, supportGradient],
  );

  // 仅有渐变模式时，纯色入参需兜底为默认渐变色；无入参时按支持的模式取兜底色
  const getLegalInput = useCallback(
    (input?: string) => {
      if (input && getModeByValue(input) === 'linear-gradient' && !Color.isGradientColor(input)) {
        return DEFAULT_LINEAR_GRADIENT;
      }
      return input || (getModeByValue() === 'linear-gradient' ? DEFAULT_LINEAR_GRADIENT : DEFAULT_COLOR);
    },
    [getModeByValue],
  );

  const color = useRef<Color>(null);
  if (!color.current) {
    color.current = new Color(getLegalInput(value || defaultValue));
  }
  const isMultiple = type === 'multiple';
  const rootClassName = usePrefixClass('color-picker');
  const contentClassName = classNames(`${rootClassName}__body`, `${rootClassName}__body--${type}`);
  const getSliderThumbStyle = useCallback(
    ({ value, maxValue }) => {
      const { width } = sliderRect;
      if (!width) return;
      const left = Math.round((value / maxValue) * 100);
      return {
        left: `${left}%`,
        color: color.current.rgb,
      };
    },
    [sliderRect],
  );
  const getSaturationThumbStyle = useCallback(
    ({ saturation, value }) => {
      const { width, height } = panelRect;
      const top = Math.round((1 - value) * height);
      const left = Math.round(saturation * width);
      return {
        color: color.current.rgb,
        left: `${left}px`,
        top: `${top}px`,
      };
    },
    [panelRect],
  );

  const setCoreStyle = useCallback(
    (format: ColorPickerProps['format']) => {
      setSliderInfo(color.current.hue);
      setHueSliderStyle(getSliderThumbStyle({ value: color.current.hue, maxValue: HUE_MAX }));
      setAlphahueSliderStyle(getSliderThumbStyle({ value: color.current.alpha * 100, maxValue: ALPHA_MAX }));
      setSaturationThumbStyle(
        getSaturationThumbStyle({
          saturation: color.current.saturation,
          value: color.current.value,
        }),
      );
      setFormatList(getFormatList(format, color.current));
    },
    [getSaturationThumbStyle, getSliderThumbStyle],
  );

  const getEleRect = useCallback(
    (format: ColorPickerProps['format']) => {
      if (!saturationElementRef.current || !sliderElementRef.current) {
        return;
      }
      const saturationRect = saturationElementRef.current.getBoundingClientRect();
      const sliderRect = sliderElementRef.current.getBoundingClientRect();
      setPanelRect({
        width: saturationRect.width || SATURATION_PANEL_DEFAULT_WIDTH,
        height: saturationRect.height || SATURATION_PANEL_DEFAULT_HEIGHT,
        left: saturationRect.left || 0,
        top: saturationRect.top || 0,
      });
      setSilderRect({
        left: sliderRect.left || 0,
        width: sliderRect.width || SLIDER_DEFAULT_WIDTH,
      });
      setTimeout(() => {
        setCoreStyle(format);
      });
    },
    [setCoreStyle],
  );

  useEffect(() => {
    if (!saturationElementRef.current) {
      return;
    }
    resizeObserverRef.current = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (entry.contentRect.width && entry.contentRect.height) {
        getEleRect(format);
      }
    });
    resizeObserverRef.current.observe(saturationElementRef.current);
    return () => {
      resizeObserverRef.current?.disconnect?.();
    };
  }, [format, getEleRect]);

  useEffect(() => {
    function init() {
      const result = getLegalInput(value || defaultValue);
      color.current = new Color(result);
      hasInit.current = true;
      getEleRect(format);
    }

    if (hasInit.current) {
      return;
    }
    init();
  }, [value, defaultValue, format, getEleRect, getLegalInput]);

  useEffect(() => {
    if (!value) {
      return;
    }
    const legalValue = getLegalInput(value);
    const currentValue = color.current.isGradient
      ? color.current.linearGradient
      : color.current.getFormatsColorMap()[format];
    if (legalValue === currentValue) {
      return;
    }
    color.current.isGradient = getModeByValue(value) === 'linear-gradient';
    color.current.update(legalValue);
    setCoreStyle(format);
    setUpdateId((prev) => prev + 1);
  }, [value, format, getLegalInput, getModeByValue, setCoreStyle]);

  useEffect(() => {
    setCoreStyle(format);
  }, [format, setCoreStyle]);

  useEffect(() => {
    setInnerSwatchList(genSwatchList(swatchColors));
  }, [swatchColors]);

  function getSaturationAndValueByCoordinate(coordinate: Coordinate) {
    const { width, height } = panelRect;
    const { x, y } = coordinate;
    let saturation = x / width;
    let value = 1 - y / height;
    saturation = Math.min(1, Math.max(0, saturation));
    value = Math.min(1, Math.max(0, value));

    return {
      saturation,
      value,
    };
  }

  function handleSaturationDrag(e: TouchEvent) {
    const coordinate = getCoordinate(e, panelRect, fixed);
    const { saturation, value } = getSaturationAndValueByCoordinate(coordinate);
    onChangeSaturation({ saturation, value });
  }

  function handleChangeSlider({ value, isAlpha }) {
    if (isAlpha) {
      color.current.alpha = value / 100;
    } else {
      color.current.hue = value;
    }
    emitColorChange(isAlpha ? 'palette-alpha-bar' : 'palette-hue-bar');
    setCoreStyle(format);
  }

  function handleSliderDrag(e: TouchEvent, isAlpha = false) {
    const { width } = sliderRect;
    const coordinate = getCoordinate(e, sliderRect);
    const { x } = coordinate;
    const maxValue = isAlpha ? ALPHA_MAX : HUE_MAX;

    const value = Math.min(maxValue, Math.max(0, Math.round((x / width) * maxValue * 100) / 100));
    handleChangeSlider({ value, isAlpha });
  }

  function onChangeSaturation({ saturation, value }) {
    const { saturation: sat, value: val } = color.current;
    if (value !== val && saturation !== sat) {
      color.current.saturation = saturation;
      color.current.value = value;
    } else if (saturation !== sat) {
      color.current.saturation = saturation;
    } else if (value !== val) {
      color.current.value = value;
    } else {
      return;
    }
    onPaletteBarChange?.({
      color: getColorObject(color.current),
    });
    setCoreStyle(format);
  }

  // 渐变轴外面包了一层 padding，宽度与饱和度面板不同，需按轴自身的位置换算
  function getGradientLeftByCoordinate(e: TouchEvent): number | null {
    const { clientX } = e?.changedTouches?.[0] || {};
    if (!Number.isFinite(clientX)) {
      return null;
    }
    const rect = gradientElementRef.current?.getBoundingClientRect();
    const width = rect?.width || panelRect.width;
    if (!width) {
      return null;
    }
    const left = rect?.width ? rect.left : panelRect.left;
    return Math.min(100, Math.max(0, ((clientX - left) / width) * 100));
  }

  // 按下时命中已有渐变点则选中它，否则在按下位置新增渐变点（受 enableMultipleGradient 控制）
  function selectGradientPoint(left: number) {
    const { gradientColors } = color.current;
    const tolerance = (GRADIENT_THUMB_HIT_TOLERANCE / panelRect.width) * 100;
    const hitPoint = gradientColors.find((point) => Math.abs(point.left - left) <= tolerance);

    if (hitPoint) {
      color.current.gradientSelectedId = hitPoint.id;
      setCoreStyle(format);
      return;
    }
    if (!enableMultipleGradient) {
      return;
    }

    const newPoint = genGradientPoint(Math.round(left * 100) / 100, color.current.rgba);
    color.current.gradientColors = [...gradientColors, newPoint];
    color.current.gradientSelectedId = newPoint.id;
    emitColorChange('palette-saturation-brightness');
    setCoreStyle(format);
  }

  // 拖动时更新当前选中渐变点的位置
  function updateGradientSelectedPoint(left: number) {
    const { gradientColors, gradientSelectedId } = color.current;
    const index = gradientColors.findIndex((point) => point.id === gradientSelectedId);
    if (index === -1) {
      return;
    }
    const nextLeft = Math.round(left * 100) / 100;
    if (gradientColors[index].left === nextLeft) {
      return;
    }
    color.current.gradientColors = gradientColors.map((point, i) =>
      i === index ? { ...point, left: nextLeft } : point,
    );
    emitColorChange('palette-saturation-brightness');
    setCoreStyle(format);
  }

  function handleGradientSliderDrag(e: TouchEvent, isStart = false) {
    if (!color.current.isGradient) {
      return;
    }
    const left = getGradientLeftByCoordinate(e);
    if (left === null) {
      return;
    }
    if (isStart) {
      selectGradientPoint(left);
      return;
    }
    updateGradientSelectedPoint(left);
  }

  function handleDiffDrag(dragType: string, e: TouchEvent, isStart = false) {
    switch (dragType) {
      case 'saturation':
        handleSaturationDrag(e);
        break;
      case 'hue-slider':
        handleSliderDrag(e);
        break;
      case 'alpha-slider':
        handleSliderDrag(e, true);
        break;
      case 'gradient-slider':
        handleGradientSliderDrag(e, isStart);
        break;
    }
  }

  function formatValue() {
    if (color.current.isGradient) {
      return color.current.linearGradient;
    }
    return color.current.getFormatsColorMap()[format] || color.current.css;
  }

  function emitColorChange(trigger: ColorPickerChangeTrigger) {
    const value = formatValue();
    onChange?.(value, {
      trigger,
      color: getColorObject(color.current),
    });
  }

  const onTouchStart = (e: TouchEvent, dragType: string) => {
    handleDiffDrag(dragType, e, true);
  };
  const onTouchMove = (e: TouchEvent, dragType: string) => {
    handleDiffDrag(dragType, e);
  };

  const onTouchEnd = (e: TouchEvent, dragType: string) => {
    setTimeout(() => {
      handleDiffDrag(dragType, e);
    });
  };

  const handleSwatchClicked = (swatch: string) => {
    color.current.update(swatch);
    setCoreStyle(format);
    emitColorChange('preset');
  };

  const renderPicker = () => {
    const renderAlphaContent = () => (
      <div className={classNames(`${rootClassName}__slider-wrapper`, `${rootClassName}__slider-wrapper--alpha-type`)}>
        <div
          className={`${rootClassName}__slider-padding`}
          style={{
            background: `linear-gradient(90deg, rgba(0,0,0,.0) 0%, rgba(0,0,0,.0) 93%, ${alphaSliderStyle.color} 93%, ${alphaSliderStyle.color} 100%`,
          }}
        />
        <div
          className={`${rootClassName}__slider`}
          onTouchStart={(e) => onTouchStart(e, 'alpha-slider')}
          onTouchMove={(e) => onTouchMove(e, 'alpha-slider')}
          onTouchEnd={(e) => onTouchEnd(e, 'alpha-slider')}
        >
          <div
            className={`${rootClassName}__rail`}
            style={{ background: `linear-gradient(to right, rgba(0, 0, 0, 0), ${alphaSliderStyle.color}` }}
          />
          <div className={`${rootClassName}__thumb`} style={{ ...alphaSliderStyle }} />
        </div>
      </div>
    );

    const renderGradientSlider = () => {
      const sortedColors = [...color.current.gradientColors].sort((pointA, pointB) => pointA.left - pointB.left);
      const startColor = sortedColors[0]?.color;
      const endColor = sortedColors[sortedColors.length - 1]?.color;

      return (
        <div
          className={classNames(`${rootClassName}__slider-wrapper`, `${rootClassName}__slider-wrapper--gradient-type`)}
        >
          <div
            className={`${rootClassName}__slider-padding`}
            style={{
              background: `linear-gradient(90deg, ${startColor} 0%, ${startColor} 50%, ${endColor} 50%, ${endColor} 100%)`,
            }}
          />
          <div
            className={`${rootClassName}__slider`}
            ref={gradientElementRef}
            onTouchStart={(e) => onTouchStart(e, 'gradient-slider')}
            onTouchMove={(e) => onTouchMove(e, 'gradient-slider')}
            onTouchEnd={(e) => onTouchEnd(e, 'gradient-slider')}
          >
            <div
              className={`${rootClassName}__gradient-thumbs`}
              style={{ background: gradientColors2string({ points: sortedColors, degree: 90 }) }}
            >
              {sortedColors.map((point: GradientColorPoint) => (
                <div
                  key={point.id}
                  className={classNames(
                    `${rootClassName}__thumb`,
                    `${rootClassName}__thumb--gradient`,
                    point.id === color.current.gradientSelectedId ? `${rootClassName}__thumb--active` : null,
                  )}
                  style={{ left: `${Math.round(point.left * 100) / 100}%`, color: point.color }}
                />
              ))}
            </div>
          </div>
        </div>
      );
    };

    const renderMultipleContent = () => (
      <>
        {color.current.isGradient ? renderGradientSlider() : null}
        <div
          className={`${rootClassName}__saturation`}
          ref={saturationElementRef}
          style={{ background: `hsl(${sliderInfo}, 100%, 50%)` }}
          onTouchStart={(e) => onTouchStart(e, 'saturation')}
          onTouchMove={(e) => onTouchMove(e, 'saturation')}
          onTouchEnd={(e) => onTouchEnd(e, 'saturation')}
        >
          <div
            className={`${rootClassName}__thumb`}
            style={
              saturationThumbStyle.color
                ? {
                    top: `${saturationThumbStyle.top}`,
                    left: `${saturationThumbStyle.left}`,
                    color: `${saturationThumbStyle.color}`,
                  }
                : { top: `${saturationThumbStyle.top}`, left: `${saturationThumbStyle.left}` }
            }
          />
        </div>
        <div className={`${rootClassName}__sliders-wrapper`}>
          <div className={`${rootClassName}__sliders`}>
            <div
              className={classNames(`${rootClassName}__slider-wrapper`, `${rootClassName}__slider-wrapper--hue-type`)}
            >
              <div
                className={`${rootClassName}__slider`}
                ref={sliderElementRef}
                onTouchStart={(e) => onTouchStart(e, 'hue-slider')}
                onTouchMove={(e) => onTouchMove(e, 'hue-slider')}
                onTouchEnd={(e) => onTouchEnd(e, 'hue-slider')}
              >
                <div className={`${rootClassName}__rail`} />
                <div
                  className={`${rootClassName}__thumb`}
                  style={{ color: hueSliderStyle.color, left: hueSliderStyle.left }}
                />
              </div>
            </div>
            {enableAlpha ? renderAlphaContent() : null}
          </div>
        </div>
        <div className={`${rootClassName}__format`}>
          <div className={classNames(`${rootClassName}__format-item`, `${rootClassName}__format-item--first`)}>
            {formatList[0]}
          </div>
          <div className={classNames(`${rootClassName}__format-item`, `${rootClassName}__format-item--second`)}>
            <div className={`${rootClassName}__format-inputs`}>
              {formatList[1]?.map((item, index) => (
                <div
                  key={index}
                  className={classNames(
                    `${rootClassName}__format-input`,
                    `${rootClassName}__format-input--${index === formatList.length - 1 && formatList.length === 2 ? 'fixed' : 'base'}`,
                  )}
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </>
    );

    const renderInnerSwatchList = () => (
      <div className={`${rootClassName}__swatches-wrap`}>
        <div className={`${rootClassName}__swatches`}>
          {isMultiple ? <div className={`${rootClassName}__swatches-title`}>系统预设色彩</div> : null}
          <div className={`${rootClassName}__swatches-items`}>
            {innerSwatchList.map((swatch) => (
              <div
                key={swatch}
                className={`${rootClassName}__swatches-item`}
                onClick={() => handleSwatchClicked(swatch)}
              >
                <div className={`${rootClassName}__swatches-inner`} style={{ backgroundColor: swatch }} />
              </div>
            ))}
          </div>
        </div>
      </div>
    );

    const renderColorPicker = () => (
      <div className={`${rootClassName}__panel`} style={style}>
        <div className={contentClassName}>
          <>
            {isMultiple ? renderMultipleContent() : null}
            {innerSwatchList.length ? renderInnerSwatchList() : null}
          </>
        </div>
      </div>
    );

    return renderColorPicker();
  };

  return renderPicker();
};

export default ColorPicker;
