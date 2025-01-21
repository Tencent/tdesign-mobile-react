import React, { FC, TouchEvent, useCallback, useEffect, useRef, useState } from 'react';
import { Popup } from 'tdesign-mobile-react';
import classNames from 'classnames';
import { usePrefixClass } from '../hooks/useClass';
import { Color, Coordinate } from '../_common/js/color-picker';
import {
  DEFAULT_COLOR,
  SATURATION_PANEL_DEFAULT_HEIGHT,
  SATURATION_PANEL_DEFAULT_WIDTH,
  SLIDER_DEFAULT_WIDTH,
} from '../_common/js/color-picker/constants';
import { PanelRectType } from './types';
import { genSwatchList, getCoordinate, getFormatList } from './helper/format';
import type { StyledProps } from '../common';
import type { TdColorPickerProps } from './type';
import { colorPickerDefaultProps } from './defaultProps';
import useDefaultProps from '../hooks/useDefaultProps';
import { ALPHA_MAX, HUE_MAX } from './constants';

export interface ColorPickerProps extends TdColorPickerProps, StyledProps {}

const ColorPicker: FC<ColorPickerProps> = (props) => {
  const {
    autoClose,
    format,
    usePopup,
    visible,
    popupProps,
    type,
    enableAlpha,
    swatchColors,
    style,
    value,
    defaultValue,
  } = useDefaultProps(props, colorPickerDefaultProps);
  const { showOverlay = false, zIndex = 11500, overlayProps } = popupProps;
  const [show, setShow] = useState<boolean>(false);
  const [formatList, setFormatList] = useState([]);
  const [innerSwatchList, setInnerSwatchList] = useState([]);
  const [showPrimaryColorPreview] = useState(false);
  const [previewColor, setPreviewColor] = useState('');
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
  const hasInit = useRef<boolean>(false);
  const color = useRef<Color>(null);
  const timer = useRef(null);
  const isMultiple = type === 'multiple';
  const rootClassName = usePrefixClass('color-picker');
  const contentClassName = classNames(`${rootClassName}__body`, `${rootClassName}__body--${type}`);
  const getSliderThumbStyle = useCallback(
    ({ value, maxValue }) => {
      const { width } = sliderRect;
      if (!width) {
        return;
      }
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
      setPreviewColor(color.current.rgba);
      setFormatList(getFormatList(format, color.current));
    },
    [getSaturationThumbStyle, getSliderThumbStyle],
  );

  const getEleRect = useCallback(
    (format: ColorPickerProps['format']) => {
      Promise.all([
        document.querySelector(`.${rootClassName}__saturation`),
        document.querySelector(`.${rootClassName}__slider`),
      ]).then(([saturationRect, sliderRect]) => {
        setPanelRect({
          width: saturationRect.clientWidth || SATURATION_PANEL_DEFAULT_WIDTH,
          height: saturationRect.clientHeight || SATURATION_PANEL_DEFAULT_HEIGHT,
          left: saturationRect.clientLeft || 0,
          top: saturationRect.clientTop || 0,
        });
        setSilderRect({
          left: sliderRect.clientLeft || 0,
          width: sliderRect.clientWidth || SLIDER_DEFAULT_WIDTH,
        });
        setTimeout(() => {
          setCoreStyle(format);
        });
      });
    },
    [rootClassName, setCoreStyle],
  );

  useEffect(() => {
    setShow(visible);
  }, [visible]);

  useEffect(() => {
    function init() {
      const innerValue = value || defaultValue;
      if (!innerValue) {
        return;
      }
      const result = innerValue || DEFAULT_COLOR;
      color.current = new Color(result);
      color.current.update(result);
      getEleRect(format);
      hasInit.current = true;
    }

    if (hasInit.current) {
      return;
    }
    init();
  }, [value, defaultValue, format, getEleRect]);

  useEffect(() => {
    color.current = new Color(value || DEFAULT_COLOR);
  }, [value]);

  useEffect(() => {
    setPreviewColor(value);
  }, [value]);

  useEffect(() => {
    setCoreStyle(format);
  }, [format, setCoreStyle]);

  useEffect(() => {
    setInnerSwatchList(genSwatchList(swatchColors));
  }, [swatchColors]);

  useEffect(() => {
    if (timer.current) {
      clearTimeout(timer.current);
    }

    if (usePopup && show) {
      timer.current = setTimeout(() => {
        getEleRect(format);
      }, 350);
    }
  }, [usePopup, show, format, getEleRect]);

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
    const coordinate = getCoordinate(e, panelRect, usePopup);
    const { saturation, value } = getSaturationAndValueByCoordinate(coordinate);
    onChangeSaturation({ saturation, value });
  }

  function handleChangeSlider({ value, isAlpha }) {
    if (isAlpha) {
      color.current.alpha = value / 100;
    } else {
      color.current.hue = value;
    }
    setCoreStyle(format);
  }

  function handleSliderDrag(e: TouchEvent, isAlpha = false) {
    const { width } = this.data.sliderRect;
    const coordinate = getCoordinate(e, this.data.sliderRect);
    const { x } = coordinate;
    const maxValue = isAlpha ? ALPHA_MAX : HUE_MAX;

    let value = Math.round((x / width) * maxValue * 100) / 100;
    if (value < 0) value = 0;
    if (value > maxValue) value = maxValue;
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
    setCoreStyle(format);
  }

  function handleDiffDrag(dragType: string, e: TouchEvent) {
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
      default:
        break;
    }
  }

  const handleVisibleChange = () => {
    if (autoClose) {
      setShow(false);
    }
  };
  const onTouchStart = (e: TouchEvent, dragType: string) => {
    handleDiffDrag(dragType, e);
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
  };

  const renderPicker = () => {
    const renderPreviewColorContent = () => (
      <div className={classNames(`${rootClassName}__sliders-preview`, `${rootClassName}--bg-alpha`)}>
        <div className={`${rootClassName}__sliders-preview-inner`} style={{ background: previewColor }}></div>
      </div>
    );

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
          onTouchStart={(e) => onTouchStart(e, 'hue-slider')}
          onTouchMove={(e) => onTouchMove(e, 'hue-slider')}
          onTouchEnd={(e) => onTouchEnd(e, 'hue-slider')}
        >
          <div
            className={`${rootClassName}__rail`}
            style={{ background: `linear-gradient(to right, rgba(0, 0, 0, 0), ${alphaSliderStyle.color}` }}
          />
          <div className={`${rootClassName}__thumb`} style={{ ...alphaSliderStyle }} />
        </div>
      </div>
    );

    const renderMultipleContent = () => (
      <>
        <div
          className={`${rootClassName}__saturation`}
          style={{ background: `hsl(${sliderInfo}, 100%, 50%)` }}
          onTouchStart={(e) => onTouchStart(e, 'saturation')}
          onTouchMove={(e) => onTouchMove(e, 'saturation')}
          onTouchEnd={(e) => onTouchEnd(e, 'saturation')}
        >
          <div
            className={`${rootClassName}__thumb`}
            style={{ top: `${saturationThumbStyle.top}px`, left: `${saturationThumbStyle.left}px` }}
          />
        </div>
        <div className={`${rootClassName}__sliders-wrapper`}>
          <div className={`${rootClassName}__sliders`}>
            <div
              className={classNames(`${rootClassName}__slider-wrapper`, `${rootClassName}__slider-wrapper--hue-type`)}
            >
              <div
                className={`${rootClassName}__slider`}
                onTouchStart={(e) => onTouchStart(e, 'alpha-slider')}
                onTouchMove={(e) => onTouchMove(e, 'alpha-slider')}
                onTouchEnd={(e) => onTouchEnd(e, 'alpha-slider')}
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
          {showPrimaryColorPreview ? renderPreviewColorContent() : null}
        </div>
        <div className={`${rootClassName}__format`}>
          <div className={classNames(`${rootClassName}__format-item`, `${rootClassName}__format-item--first`)}>
            {format}
          </div>
          <div className={classNames(`${rootClassName}__format-item`, `${rootClassName}__format-item--second`)}>
            <div className={`${rootClassName}__format-inputs`}>
              {formatList.map((item, index) => (
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

    const renderPopupPicker = () => (
      <Popup
        visible={show}
        showOverlay={showOverlay}
        zIndex={zIndex}
        overlayProps={overlayProps}
        placement="bottom"
        onVisibleChange={handleVisibleChange}
      >
        {renderColorPicker()}
      </Popup>
    );

    return usePopup ? renderPopupPicker() : renderColorPicker();
  };

  return renderPicker();
};

export default ColorPicker;
