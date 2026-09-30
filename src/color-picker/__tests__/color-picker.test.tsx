import { act, describe, expect, fireEvent, it, render, vi } from '@test/utils';
import React from 'react';

import { Color, getColorObject } from '../../_common/js/color-picker';
import ColorPicker, { ColorPickerProps } from '../index';
import { TypeEnum } from '../type';

const prefix = 't';
const name = `.${prefix}-color-picker`;

const makeTouch = (
  el: Element,
  eventName: string,
  touchPosition?: { clientX?: number; clientY?: number; pageX?: number; pageY?: number },
) => {
  const touchInit = {
    changedTouches: [
      new Touch({
        identifier: 0,
        target: el,
        clientX: touchPosition?.clientX || 0,
        clientY: touchPosition?.clientY || 0,
        pageX: touchPosition?.pageX || 0,
        pageY: touchPosition?.pageY || 0,
      }),
    ],
    bubbles: true,
    cancelable: true,
  };

  const event = new TouchEvent(eventName, touchInit);
  el.dispatchEvent(event);
};

const originGetBoundingClientRect = window.HTMLElement.prototype.getBoundingClientRect;
const originOffsetTopDescriptor = Object.getOwnPropertyDescriptor(window.HTMLElement.prototype, 'offsetTop');

const mockBoundingClientRect = (info) => {
  window.HTMLElement.prototype.getBoundingClientRect = () => info;
};

const restoreBoundingClientRect = () => {
  window.HTMLElement.prototype.getBoundingClientRect = originGetBoundingClientRect;
};

const mockOffsetTop = (value: number) => {
  Object.defineProperty(window.HTMLElement.prototype, 'offsetTop', {
    configurable: true,
    get: () => value,
  });
};

const restoreOffsetTop = () => {
  if (originOffsetTopDescriptor) {
    Object.defineProperty(window.HTMLElement.prototype, 'offsetTop', originOffsetTopDescriptor);
    return;
  }
  delete (window.HTMLElement.prototype as { offsetTop?: number }).offsetTop;
};

const renderColorPicker = (props: ColorPickerProps) => render(<ColorPicker {...props} />);

describe('ColorPicker', () => {
  describe('props', () => {
    it(': multiple', () => {
      const testCurrentProp = (type: TypeEnum, target: number) => {
        const { container } = renderColorPicker({ type });
        const dom = container.querySelectorAll(`${name}__saturation`);
        expect(dom).toHaveLength(target);
      };
      testCurrentProp(undefined, 0);
      testCurrentProp('base', 0);
      testCurrentProp('multiple', 1);
    });

    it(': enableAlpha', () => {
      const testEnableAlpha = (enableAlpha: boolean) => {
        const { container } = renderColorPicker({ enableAlpha, type: 'multiple' });
        const alphaDom = container.querySelectorAll(`${name}__slider-wrapper--alpha-type`);
        expect(alphaDom).toHaveLength(enableAlpha ? 1 : 0);
      };
      testEnableAlpha(false);
      testEnableAlpha(true);
    });

    it(': swatchColors', () => {
      const testSwatchColors = (swatchColors: Array<string> | null, target: number) => {
        const { container } = renderColorPicker({ swatchColors });
        const dom = container.querySelectorAll(`${name}__swatches-item`);
        expect(dom).toHaveLength(target);
      };
      testSwatchColors(null, 0);
      testSwatchColors([], 0);
      testSwatchColors(undefined, 10);
      testSwatchColors(['red', 'blur'], 2);
    });

    it(': format', () => {
      const testFormat = (format: string, target: string) => {
        const { container } = renderColorPicker({ format: format as ColorPickerProps['format'], type: 'multiple' });
        const dom = container.querySelector(`${name}__format-item--first`);
        expect(dom.innerHTML).toBe(target);
      };
      testFormat('RGB', 'RGB');
      testFormat('123', 'RGB');
      testFormat('HEX', 'HEX');
      testFormat('HEX8', 'HEX8');
    });

    it(': colorModes', () => {
      const gradient = 'linear-gradient(90deg, rgba(241, 29, 0, 1) 0%, rgba(73, 106, 220, 1) 100%)';
      const testGradientBar = (props: ColorPickerProps, target: number) => {
        const { container } = renderColorPicker({ type: 'multiple', ...props });
        expect(container.querySelectorAll(`${name}__slider-wrapper--gradient-type`)).toHaveLength(target);
        expect(container.querySelectorAll(`${name}__thumb--gradient`)).toHaveLength(target * 2);
      };
      testGradientBar({}, 0);
      testGradientBar({ colorModes: ['monochrome', 'linear-gradient'] }, 0);
      testGradientBar({ colorModes: ['monochrome', 'linear-gradient'], value: gradient }, 1);
      testGradientBar({ colorModes: 'linear-gradient' }, 1);
      testGradientBar({ colorModes: 'linear-gradient', value: '#ffffff' }, 1);
      testGradientBar({ colorModes: 'monochrome', value: gradient }, 0);
    });

    it(': enableMultipleGradient', () => {
      const testEnableMultipleGradient = (enableMultipleGradient: boolean) => {
        mockBoundingClientRect({ left: 0, top: 0, width: 300, height: 50 });
        const { container } = renderColorPicker({
          type: 'multiple',
          colorModes: 'linear-gradient',
          enableMultipleGradient,
        });
        restoreBoundingClientRect();
        const el = container.querySelector(`${name}__slider-wrapper--gradient-type ${name}__slider`);

        act(() => {
          makeTouch(el, 'touchstart', { pageX: 150, pageY: 0, clientX: 150, clientY: 0 });
        });

        const thumbs = Array.from(container.querySelectorAll<HTMLElement>(`${name}__thumb--gradient`));
        expect(thumbs).toHaveLength(enableMultipleGradient ? 3 : 2);
        if (enableMultipleGradient) {
          expect(thumbs.map((thumb) => thumb.style.left)).toEqual(['0%', '50%', '100%']);
        }
      };
      testEnableMultipleGradient(true);
      testEnableMultipleGradient(false);
    });
  });

  describe('events', () => {
    it(': preset change', async () => {
      const onChange = vi.fn();
      const { container } = renderColorPicker({ onChange });
      const swatch = container.querySelector(`${name}__swatches-item`);

      fireEvent.click(swatch);
      const result = 'rgb(236, 242, 254)';

      expect(onChange).toHaveBeenCalledTimes(1);
      expect(onChange).toHaveBeenLastCalledWith(result, {
        trigger: 'preset',
        color: getColorObject(new Color(result)),
      });
    });

    it(': saturation change', async () => {
      const testSaturation = async (fixed = false) => {
        const onPaletteBarChange = vi.fn();
        mockBoundingClientRect({
          left: 0,
          top: 0,
          width: 300,
          height: 50,
        });
        const { container } = renderColorPicker({ onPaletteBarChange, type: 'multiple', fixed });
        const el = container.querySelector('.t-color-picker__saturation');

        mockOffsetTop(1000);

        act(() => {
          makeTouch(el, 'touchstart');
          makeTouch(el, 'touchmove', { pageY: 40, pageX: 0, clientY: 40 });
          makeTouch(el, 'touchmove', { pageY: 40, pageX: 0, clientY: 40 });
          makeTouch(el, 'touchmove', { pageY: 30, pageX: 0, clientY: 30 });
          makeTouch(el, 'touchend', { pageY: 30, pageX: 30, clientY: 30 });
        });
        restoreOffsetTop();
        restoreBoundingClientRect();

        expect(onPaletteBarChange).toHaveBeenCalledTimes(3);
        const result = 'rgba(80, 80, 80, 1)';
        const color = new Color(result);
        color.saturation = 0;
        color.value = 0.4;

        expect(onPaletteBarChange).toHaveBeenLastCalledWith({
          color: getColorObject(color),
        });
      };

      await testSaturation();
      await testSaturation(true);
    });

    it(': hue slider change', async () => {
      const onChange = vi.fn();
      const { container } = renderColorPicker({ onChange, type: 'multiple' });
      const el = container.querySelector('.t-color-picker__slider');

      mockBoundingClientRect({
        left: 0,
        top: 0,
        width: 300,
        height: 50,
      });

      act(() => {
        makeTouch(el, 'touchstart', { pageY: 0, pageX: 0, clientX: 0, clientY: 30 });
        makeTouch(el, 'touchmove', { pageY: 0, pageX: 30, clientX: 30, clientY: 30 });
        makeTouch(el, 'touchend', { pageY: 30, pageX: 40, clientX: 40, clientY: 30 });
      });

      expect(onChange).toHaveBeenCalledTimes(2);
      const result = 'rgb(151, 146, 0)';
      expect(onChange).toHaveBeenLastCalledWith(result, {
        trigger: 'palette-hue-bar',
        color: getColorObject(new Color(result)),
      });
    });

    it(': alpha slider change', async () => {
      const onChange = vi.fn();
      const { container } = renderColorPicker({ onChange, type: 'multiple', enableAlpha: true });
      const el = container.querySelector('.t-color-picker__slider-wrapper--alpha-type .t-color-picker__slider');

      mockBoundingClientRect({
        left: 0,
        top: 0,
        width: 300,
        height: 50,
      });
      act(() => {
        makeTouch(el, 'touchstart', { pageY: 0, pageX: 0, clientX: 0, clientY: 30 });
        makeTouch(el, 'touchmove', { pageY: 0, pageX: 40, clientX: 40, clientY: 30 });
        makeTouch(el, 'touchend', { pageY: 30, pageX: 40, clientX: 40, clientY: 30 });
      });

      expect(onChange).toHaveBeenCalledTimes(2);
      const result = 'rgb(0, 31, 151)';
      const color = new Color(result);
      color.alpha = 0.13;
      expect(onChange).toHaveBeenLastCalledWith(result, {
        trigger: 'palette-alpha-bar',
        color: getColorObject(color),
      });
    });

    it(': gradient change', () => {
      const onChange = vi.fn();
      mockBoundingClientRect({ left: 0, top: 0, width: 300, height: 50 });
      const { container } = renderColorPicker({ type: 'multiple', colorModes: 'linear-gradient', onChange });
      restoreBoundingClientRect();
      const el = container.querySelector(`${name}__slider-wrapper--gradient-type ${name}__slider`);

      act(() => {
        makeTouch(el, 'touchstart', { pageX: 300, pageY: 0, clientX: 300, clientY: 0 });
        makeTouch(el, 'touchmove', { pageX: 150, pageY: 0, clientX: 150, clientY: 0 });
      });

      expect(onChange).toHaveBeenCalledTimes(1);
      const [result, context] = onChange.mock.calls[0] as [
        string,
        { color: { linearGradient: string; rgb: string }; trigger: string },
      ];
      expect(result).toBe('linear-gradient(90deg,rgb(241, 29, 0) 0%,rgb(73, 106, 220) 50%)');
      expect(context.trigger).toBe('palette-saturation-brightness');
      expect(context.color.linearGradient).toBe(result);
      expect(context.color.rgb).toBe('rgb(73, 106, 220)');
    });
  });
});
