import React from 'react';
import { describe, expect, it, vi } from '@test/utils';
import { AppIcon } from 'tdesign-icons-react';
import Toast from '../index';

const sleep = (time) =>
  new Promise((resolve) => {
    setTimeout(resolve, time);
  });
const ICON_CLASS_MAP = {
  loading: '.t-icon-loading',
  success: '.t-icon-check-circle',
  warning: '.t-icon-error-circle',
  error: '.t-icon-close-circle',
};

describe('Toast', () => {
  describe('props', () => {
    it(': message', async () => {
      const message = 'Hello TDesign';
      expect(document.querySelector('.t-toast')).toBeFalsy();

      await Toast(message);
      await sleep(0);
      expect(document.querySelector('.t-toast')).toBeTruthy();
      expect(document.querySelector('.t-toast__text').innerHTML.trim()).toBe(message);
    });

    it(': direction', async () => {
      const textDirection = async (direction, target?: string) => {
        await Toast({ direction });
        await sleep(0);
        expect(document.querySelector(`.t-toast--${target || direction}`)).toBeTruthy();
      };
      await textDirection('column');
      await textDirection('row');
      await textDirection(undefined, 'row');
    });

    it(': icon', async () => {
      expect(document.querySelector('.t-icon-app')).toBeFalsy();
      await Toast({
        icon: <AppIcon />,
      });
      await sleep(0);
      expect(document.querySelector('.t-icon-app')).toBeTruthy();
    });

    it(': theme', async () => {
      const testTheme = async (theme, target) => {
        expect(document.querySelector(target)).toBeFalsy();
        await Toast({
          theme,
          message: '1',
        });
        await sleep(0);
        expect(document.querySelector(target)).toBeTruthy();
      };
      await testTheme('loading', ICON_CLASS_MAP.loading);
      await testTheme('success', ICON_CLASS_MAP.success);
      await testTheme('warning', ICON_CLASS_MAP.warning);
      await testTheme('error', ICON_CLASS_MAP.error);
    });

    it(': showOverlay', async () => {
      const testShowOverlay = async (showOverlay) => {
        await Toast({
          showOverlay,
        });
        await sleep(0);
        const overlay = document.querySelector('.t-overlay');
        if (showOverlay) {
          expect(overlay).toBeTruthy();
        } else {
          expect(overlay).toBeFalsy();
        }
      };
      await testShowOverlay(true);
      await testShowOverlay(false);
    });

    it(': overlayProps', async () => {
      const duration = 1000;
      await Toast({
        showOverlay: true,
        overlayProps: {
          duration,
        },
      });
      await sleep(0);
      const overlay = document.querySelector('.t-overlay');
      expect(overlay).toBeTruthy();
      expect(window.getComputedStyle(overlay).animationDuration).toBe(`${duration}ms`);
    });

    it(': placement', async () => {
      const testPlacement = async (placement, target) => {
        await Toast({
          placement,
        });
        await sleep(0);
        const wrapper = document.querySelector('.t-toast');
        expect(wrapper).toBeTruthy();
        expect(window.getComputedStyle(wrapper).top).toBe(target);
      };
      await testPlacement('top', '25%');
      await testPlacement('bottom', '75%');
      await testPlacement('middle', '45%');
      await testPlacement(undefined, '45%');
    });

    it(': preventScrollThrough', async () => {
      const testPreventScrollThrough = async (preventScrollThrough, target) => {
        const lockClass = 't-toast--lock';
        document.body.classList.remove(lockClass);

        await Toast({
          preventScrollThrough,
        });
        await sleep(0);
        expect(!!document.querySelector(`.${lockClass}`)).toBe(target);
      };
      await testPreventScrollThrough(true, true);
      await testPreventScrollThrough(false, false);
    });

    it(': duration', async () => {
      const testDuration = async (duration) => {
        await Toast({
          duration,
        });
        await sleep(0);
        expect(document.querySelector('.t-toast')).toBeTruthy();
        await sleep(duration);
        await sleep(300);
        if (duration) {
          expect(document.querySelector('.t-toast')).toBeFalsy();
        }
      };
      await testDuration(1000);
      await testDuration(0);
    });
  });

  describe('event', () => {
    it(': close', async () => {
      const onClose = vi.fn();
      await Toast({
        onClose,
      });
      await sleep(2100);
      expect(onClose).toHaveBeenCalled();
    });

    it(': destroy', async () => {
      const onDestroy = vi.fn();
      await Toast({
        onDestroy,
        message: ' ',
      });
      await Toast.clear();
      expect(onDestroy).toHaveBeenCalled();
    });
  });

  describe('method', () => {
    it(': method', async () => {
      const testMethod = async (method, target, props) => {
        const handler = await Toast[method](props);
        await sleep(300);
        expect(document.querySelector(target)).toBeTruthy();
        await handler.destroy?.();
      };
      const message = 'Hello';
      await testMethod('loading', ICON_CLASS_MAP.loading, message);
      await testMethod('success', ICON_CLASS_MAP.success, message);
      await testMethod('error', ICON_CLASS_MAP.error, { message });
      await testMethod('warning', ICON_CLASS_MAP.warning, { message });
    });

    it(': attach', async () => {
      const spyConsole = vi.spyOn(console, 'error');
      await Toast({
        message: ' ',
        attach: 'abc',
      });
      expect(spyConsole).toHaveBeenCalledWith('attach is not exist');
      expect(document.querySelector('.t-toast')).toBeFalsy();

      const testClass = 'test-toast';
      const testDom = document.createElement('div');
      testDom.classList.add(testClass);
      document.body.appendChild(testDom);
      await Toast({
        message: ' ',
        attach: `.${testClass}`,
      });
      await sleep(300);
      expect(testDom.querySelector('.t-toast')).toBeTruthy();
    });
  });
});
