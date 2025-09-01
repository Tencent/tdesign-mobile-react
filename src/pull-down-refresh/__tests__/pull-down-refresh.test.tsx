import React from 'react';
import { describe, it, expect, render, vi, waitFor, beforeEach, act } from '@test/utils';
import { PullDownRefresh } from '../index';
import { easeDistance, isReachTop } from '../useTouch';

const prefix = 't';
const name = `.${prefix}-pull-down-refresh`;
// mock height and scrollHeight
const height = 800;
const scrollHeight = height;

// Mock the touch events and scroll
const mockTouch = (element: Element, type: string, touches: Array<{ clientX: number; clientY: number }>) => {
  const event = new TouchEvent(type, {
    touches: touches.map((touch) => ({
      ...touch,
      target: element,
    })) as any,
    bubbles: true,
    cancelable: true,
  });

  Object.defineProperty(event, 'stopPropagation', {
    value: vi.fn(),
  });

  element.dispatchEvent(event);
};

// Mock document properties for scroll detection
const mockScroll = (scrollTop: number) => {
  Object.defineProperty(document.body, 'scrollTop', {
    value: scrollTop,
    writable: true,
  });
  Object.defineProperty(document.body, 'clientHeight', {
    value: height,
    writable: true,
  });
  Object.defineProperty(document.body, 'scrollHeight', {
    value: scrollHeight,
    writable: true,
  });
  Object.defineProperty(document.documentElement, 'scrollTop', {
    value: scrollTop,
    writable: true,
  });
  Object.defineProperty(document.documentElement, 'clientHeight', {
    value: height,
    writable: true,
  });
  Object.defineProperty(document.documentElement, 'scrollHeight', {
    value: scrollHeight,
    writable: true,
  });

  document.body.style.overflowY = 'scroll';
  document.documentElement.style.overflowY = 'scroll';
};

describe('PullDownRefresh', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // Reset document properties
    mockScroll(0);
  });

  describe(': props', () => {
    it(': className', () => {
      const { container } = render(
        <PullDownRefresh className="custom-class">
          <div>content</div>
        </PullDownRefresh>,
      );
      expect(container.querySelector('.custom-class')).toBeTruthy();
    });

    it(': style', () => {
      const style = { backgroundColor: 'red' };
      const { container } = render(
        <PullDownRefresh style={style}>
          <div>content</div>
        </PullDownRefresh>,
      );
      const element = container.querySelector(name);
      expect(element).toHaveAttribute('style');
    });

    it(': children', () => {
      const { getByText } = render(
        <PullDownRefresh>
          <div data-testid="child">test content</div>
        </PullDownRefresh>,
      );
      expect(getByText('test content')).toBeInTheDocument();
    });

    it(': disabled', () => {
      const onRefresh = vi.fn();
      const { container } = render(
        <PullDownRefresh disabled onRefresh={onRefresh}>
          <div>content</div>
        </PullDownRefresh>,
      );

      const track = container.querySelector(`${name}__track`);
      mockTouch(track!, 'touchstart', [{ clientX: 0, clientY: 0 }]);
      mockTouch(track!, 'touchmove', [{ clientX: 0, clientY: 100 }]);
      mockTouch(track!, 'touchend', [{ clientX: 0, clientY: 100 }]);

      expect(onRefresh).not.toHaveBeenCalled();
    });

    it(': loadingBarHeight with number', () => {
      const { container } = render(
        <PullDownRefresh loadingBarHeight={60}>
          <div>content</div>
        </PullDownRefresh>,
      );

      const loadingElement = container.querySelector(`${name}__loading`);
      expect(loadingElement).toHaveStyle({ height: '60px' });
    });

    it(': loadingBarHeight with string', () => {
      const { container } = render(
        <PullDownRefresh loadingBarHeight="5rem">
          <div>content</div>
        </PullDownRefresh>,
      );

      const loadingElement = container.querySelector(`${name}__loading`);
      expect(loadingElement).toHaveStyle({ height: '5rem' });
    });

    it(': maxBarHeight with number', () => {
      const { container } = render(
        <PullDownRefresh maxBarHeight={120}>
          <div>content</div>
        </PullDownRefresh>,
      );

      expect(container.querySelector(name)).toBeTruthy();
    });

    it(': maxBarHeight with string', () => {
      const { container } = render(
        <PullDownRefresh maxBarHeight="10rem">
          <div>content</div>
        </PullDownRefresh>,
      );

      expect(container.querySelector(name)).toBeTruthy();
    });

    it(': loadingTexts', () => {
      const customTexts = ['拉下来', '放开手', '加载中', '完成了'];
      const { container } = render(
        <PullDownRefresh loadingTexts={customTexts}>
          <div>content</div>
        </PullDownRefresh>,
      );

      expect(container.querySelector(name)).toBeTruthy();
    });

    it(': loadingProps', () => {
      const loadingProps = { size: '32px', text: 'Loading...' };
      const { container } = render(
        <PullDownRefresh loadingProps={loadingProps} value={true}>
          <div>content</div>
        </PullDownRefresh>,
      );

      expect(container.querySelector('.t-loading')).toBeTruthy();
    });

    it(': refreshTimeout', () => {
      const { container } = render(
        <PullDownRefresh refreshTimeout={5000}>
          <div>content</div>
        </PullDownRefresh>,
      );

      expect(container.querySelector(name)).toBeTruthy();
    });

    it(': value controlled', () => {
      const { container, rerender } = render(
        <PullDownRefresh value={false}>
          <div>content</div>
        </PullDownRefresh>,
      );

      expect(container.querySelector(`${name}__text`)).toBeTruthy();

      rerender(
        <PullDownRefresh value={true}>
          <div>content</div>
        </PullDownRefresh>,
      );

      expect(container.querySelector('.t-loading')).toBeTruthy();
    });

    it(': defaultValue', () => {
      const { container } = render(
        <PullDownRefresh defaultValue={true}>
          <div>content</div>
        </PullDownRefresh>,
      );

      expect(container.querySelector('.t-loading')).toBeTruthy();
    });
  });

  describe(': status', () => {
    it(': normal status ', () => {
      const { container } = render(
        <PullDownRefresh>
          <div>content</div>
        </PullDownRefresh>,
      );

      const textElement = container.querySelector(`${name}__text`);
      expect(textElement).toBeTruthy();
    });

    it(': loading status', () => {
      const { container } = render(
        <PullDownRefresh value={true}>
          <div>content</div>
        </PullDownRefresh>,
      );

      expect(container.querySelector('.t-loading')).toBeTruthy();
    });

    it(': custom loading texts', () => {
      const customTexts = ['拉下来', '放开手', '加载中', '完成了'];
      const { container } = render(
        <PullDownRefresh loadingTexts={customTexts} value={true}>
          <div>content</div>
        </PullDownRefresh>,
      );

      expect(container.querySelector('.t-loading')).toBeTruthy();
    });

    it(': default locale texts', () => {
      const { container } = render(
        <PullDownRefresh value={true}>
          <div>content</div>
        </PullDownRefresh>,
      );

      expect(container.querySelector('.t-loading')).toBeTruthy();
    });
  });

  describe(': events touch and pull', () => {
    it(': touch direction X > Y', async () => {
      const mockRefresh = vi.fn();

      const { container } = render(
        <PullDownRefresh onRefresh={mockRefresh}>
          <div>content</div>
        </PullDownRefresh>,
      );

      const track = container.querySelector(`${name}__track`);

      // absX = 20, absY = 5
      await act(async () => {
        mockTouch(track!, 'touchstart', [{ clientX: 0, clientY: 0 }]);
        mockTouch(track!, 'touchmove', [{ clientX: 20, clientY: 5 }]);
      });
      await act(async () => {
        mockTouch(track!, 'touchstart', [{ clientX: 0, clientY: 0 }]);
        mockTouch(track!, 'touchmove', [{ clientX: 40, clientY: 10 }]);
      });

      expect(mockRefresh).not.toHaveBeenCalled();
    });

    it(': touch direction Y > X', async () => {
      const mockRefresh = vi.fn();

      const { container } = render(
        <PullDownRefresh onRefresh={mockRefresh}>
          <div>content</div>
        </PullDownRefresh>,
      );

      const track = container.querySelector(`${name}__track`);

      // absX = 0, absY = 60
      await act(async () => {
        mockTouch(track!, 'touchstart', [{ clientX: 0, clientY: 0 }]);
        mockTouch(track!, 'touchmove', [{ clientX: 0, clientY: 60 }]);
      });
      await act(async () => {
        mockTouch(track!, 'touchmove', [{ clientX: 0, clientY: 80 }]);
      });
      await act(async () => {
        mockTouch(track!, 'touchend', [{ clientX: 0, clientY: 80 }]);
      });

      expect(mockRefresh).toHaveBeenCalled();
    });

    it(': touch pulling', async () => {
      const mockRefresh = vi.fn(
        () =>
          new Promise((resolve) => {
            setTimeout(resolve, 1000);
          }),
      );

      const { container } = render(
        <PullDownRefresh onRefresh={mockRefresh}>
          <div>content</div>
        </PullDownRefresh>,
      );

      const track = container.querySelector(`${name}__track`);

      await act(async () => {
        mockTouch(track!, 'touchstart', [{ clientX: 0, clientY: 0 }]);
        mockTouch(track!, 'touchmove', [{ clientX: 0, clientY: 20 }]);
      });
      await act(async () => {
        mockTouch(track!, 'touchmove', [{ clientX: 0, clientY: 40 }]);
      });
      await act(async () => {
        mockTouch(track!, 'touchmove', [{ clientX: 0, clientY: 60 }]);
      });
      await act(async () => {
        mockTouch(track!, 'touchend', [{ clientX: 0, clientY: 80 }]);
      });

      expect(mockRefresh).not.toHaveBeenCalled();
    });

    it(': onRefresh timeout', async () => {
      const mockRefresh = vi.fn(
        () =>
          new Promise((resolve) => {
            setTimeout(resolve, 5000);
          }),
      );
      const mockTimeout = vi.fn();

      const { container } = render(
        <PullDownRefresh onRefresh={mockRefresh} onTimeout={mockTimeout}>
          <div>content</div>
        </PullDownRefresh>,
      );

      const track = container.querySelector(`${name}__track`);

      await act(async () => {
        mockTouch(track!, 'touchstart', [{ clientX: 0, clientY: 0 }]);
        mockTouch(track!, 'touchmove', [{ clientX: 0, clientY: 60 }]);
      });
      await act(async () => {
        mockTouch(track!, 'touchmove', [{ clientX: 0, clientY: 80 }]);
      });
      await act(async () => {
        mockTouch(track!, 'touchend', [{ clientX: 0, clientY: 80 }]);
      });

      expect(mockRefresh).toHaveBeenCalled();

      await waitFor(
        () => {
          expect(mockTimeout).toHaveBeenCalled();
        },
        { timeout: 5000 },
      );
    });
  });

  describe(':events scroll', () => {
    it(': onScrollToLower', async () => {
      const onScrollToLower = vi.fn();
      render(
        <PullDownRefresh onScrolltolower={onScrollToLower}>
          <div>content</div>
        </PullDownRefresh>,
      );

      mockScroll(100);
      window.dispatchEvent(new Event('scroll'));

      await waitFor(
        () => {
          expect(onScrollToLower).toHaveBeenCalled();
        },
        { timeout: 400 },
      );
    });
  });

  describe(':hooks', () => {
    it(': useTouch', () => {
      // This would normally be tested in a hook test, but since it's used in the component
      // we can test its behavior through the component
      const { container } = render(
        <PullDownRefresh>
          <div>content</div>
        </PullDownRefresh>,
      );

      const track = container.querySelector(`${name}__track`);

      act(() => {
        mockTouch(track!, 'touchstart', [{ clientX: 100, clientY: 50 }]);
        mockTouch(track!, 'touchmove', [{ clientX: 120, clientY: 80 }]);
      });

      expect(track).toBeTruthy();
    });

    it(': easeDistance', () => {
      expect(easeDistance(25, 50)).toBe(25);
      expect(easeDistance(75, 50)).toBe(63);
      expect(easeDistance(150, 50)).toBe(88);
    });

    it(': isReachTop', () => {
      // Mock a touch event with a target element
      const mockElement = document.createElement('div');
      const mockEvent = {
        target: mockElement,
      } as unknown as React.TouchEvent;

      // Test the function directly
      const result = isReachTop(mockEvent);
      expect(typeof result).toBe('boolean');
    });
  });
});
