import { describe, expect, it, vi } from 'vitest';
import {
  addClass,
  removeClass,
  hasClass,
  elementInViewport,
  getWindowScroll,
  getWindowSize,
  stopPropagation,
  preventDefault,
} from '../shared';

describe('shared utils', () => {
  describe('addClass', () => {
    it('should add class to element', () => {
      const element = document.createElement('div');
      addClass(element, 'test-class');
      expect(element.className).toBe('test-class');
    });

    it('should add multiple classes', () => {
      const element = document.createElement('div');
      addClass(element, 'class1 class2');
      expect(element.className).toBe('class1 class2');
    });

    it('should not add duplicate classes', () => {
      const element = document.createElement('div');
      element.className = 'existing';
      addClass(element, 'existing new');
      expect(element.className).toBe('existing new');
    });

    it('should handle null element', () => {
      expect(() => addClass(null, 'test')).not.toThrow();
    });
  });

  describe('removeClass', () => {
    it('should remove class from element', () => {
      const element = document.createElement('div');
      element.className = 'test-class other';
      removeClass(element, 'test-class');
      expect(element.className).toBe('other');
    });

    it('should remove multiple classes', () => {
      const element = document.createElement('div');
      element.className = 'class1 class2 class3';
      removeClass(element, 'class1 class3');
      expect(element.className).toBe('class2');
    });

    it('should handle null element', () => {
      expect(() => removeClass(null, 'test')).not.toThrow();
    });
  });

  describe('hasClass', () => {
    it('should return true if element has class', () => {
      const element = document.createElement('div');
      element.className = 'test-class other';
      expect(hasClass(element, 'test-class')).toBe(true);
    });

    it('should return false if element does not have class', () => {
      const element = document.createElement('div');
      element.className = 'other-class';
      expect(hasClass(element, 'test-class')).toBe(false);
    });

    it('should return false for null element', () => {
      expect(hasClass(null, 'test')).toBe(false);
    });

    it('should throw error if class contains space', () => {
      const element = document.createElement('div');
      expect(() => hasClass(element, 'test class')).toThrow('className should not contain space.');
    });
  });

  describe('elementInViewport', () => {
    it('should return true if element is in viewport', () => {
      const element = document.createElement('div');
      document.body.appendChild(element);
      element.getBoundingClientRect = vi.fn().mockReturnValue({
        top: 10,
        left: 10,
        bottom: 50,
        right: 50,
      });
      expect(elementInViewport(element)).toBe(true);
      document.body.removeChild(element);
    });

    it('should return false if element is not in viewport', () => {
      const element = document.createElement('div');
      document.body.appendChild(element);
      element.getBoundingClientRect = vi.fn().mockReturnValue({
        top: -100,
        left: 10,
        bottom: -50,
        right: 50,
      });
      expect(elementInViewport(element)).toBe(false);
      document.body.removeChild(element);
    });

    it('should check against parent element', () => {
      const parent = document.createElement('div');
      const child = document.createElement('div');
      parent.appendChild(child);
      document.body.appendChild(parent);

      parent.getBoundingClientRect = vi.fn().mockReturnValue({
        top: 0,
        left: 0,
        bottom: 100,
        right: 100,
      });
      child.getBoundingClientRect = vi.fn().mockReturnValue({
        top: 10,
        left: 10,
        bottom: 50,
        right: 50,
      });

      expect(elementInViewport(child, parent)).toBe(true);
      document.body.removeChild(parent);
    });
  });

  describe('getWindowScroll', () => {
    it('should return window scroll position', () => {
      Object.defineProperty(window, 'pageYOffset', { value: 100, writable: true });
      Object.defineProperty(window, 'pageXOffset', { value: 50, writable: true });
      Object.defineProperty(document.documentElement, 'scrollTop', { value: 100, writable: true });
      Object.defineProperty(document.documentElement, 'scrollLeft', { value: 50, writable: true });
      Object.defineProperty(document.body, 'scrollTop', { value: 100, writable: true });
      Object.defineProperty(document.body, 'scrollLeft', { value: 50, writable: true });

      const result = getWindowScroll();
      expect(result).toEqual({ scrollTop: 100, scrollLeft: 50 });
    });
  });

  describe('getWindowSize', () => {
    it('should return window size', () => {
      Object.defineProperty(window, 'innerWidth', { value: 1024, writable: true });
      Object.defineProperty(window, 'innerHeight', { value: 768, writable: true });

      const result = getWindowSize();
      expect(result).toEqual({ width: 1024, height: 768 });
    });

    it('should fallback to document element', () => {
      Object.defineProperty(window, 'innerWidth', { value: undefined, writable: true });
      Object.defineProperty(window, 'innerHeight', { value: undefined, writable: true });
      Object.defineProperty(document.documentElement, 'clientWidth', { value: 800, writable: true });
      Object.defineProperty(document.documentElement, 'clientHeight', { value: 600, writable: true });

      const result = getWindowSize();
      expect(result).toEqual({ width: 800, height: 600 });
    });
  });

  describe('stopPropagation', () => {
    it('should call stopPropagation on event', () => {
      const event = { stopPropagation: vi.fn() } as any;
      stopPropagation(event);
      expect(event.stopPropagation).toHaveBeenCalled();
    });
  });

  describe('preventDefault', () => {
    it('should call preventDefault on cancellable event', () => {
      const event = { preventDefault: vi.fn(), cancelable: true, stopPropagation: vi.fn() } as any;
      preventDefault(event);
      expect(event.preventDefault).toHaveBeenCalled();
    });

    it('should not call preventDefault on non-cancellable event', () => {
      const event = { preventDefault: vi.fn(), cancelable: false, stopPropagation: vi.fn() } as any;
      preventDefault(event);
      expect(event.preventDefault).not.toHaveBeenCalled();
    });

    it('should call stopPropagation when isStopPropagation is true', () => {
      const event = { preventDefault: vi.fn(), cancelable: true, stopPropagation: vi.fn() } as any;
      preventDefault(event, true);
      expect(event.stopPropagation).toHaveBeenCalled();
    });
  });
});
