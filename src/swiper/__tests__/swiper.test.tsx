import React, { useState } from 'react';
import { describe, it, expect, render, fireEvent, vi, act, afterEach } from '@test/utils';
import Swiper from '../index';

const prefix = 't';
const swiperClass = `.${prefix}-swiper`;
const swiperItemClass = `.${prefix}-swiper-item`;
const swiperNavClass = `.${prefix}-swiper-nav`;

const createRect = (width = 300, height = 200): DOMRect => ({
  width,
  height,
  top: 0,
  left: 0,
  bottom: height,
  right: width,
  x: 0,
  y: 0,
  toJSON: () => ({}),
});

const mockElementMetrics = (width = 300, height = 200) => {
  vi.spyOn(HTMLElement.prototype, 'offsetWidth', 'get').mockReturnValue(width);
  vi.spyOn(HTMLElement.prototype, 'offsetHeight', 'get').mockReturnValue(height);
  vi.spyOn(HTMLElement.prototype, 'getBoundingClientRect').mockImplementation(() => createRect(width, height));
};

const flushEffects = async () => {
  await act(async () => {
    await Promise.resolve();
  });
};

describe('Swiper', () => {
  afterEach(() => {
    vi.clearAllTimers();
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  it('renders dots navigation with controls and triggers nav changes', async () => {
    vi.useFakeTimers();
    mockElementMetrics();
    const handleChange = vi.fn();
    const handleClick = vi.fn();

    const { container } = render(
      <Swiper
        autoplay={false}
        loop
        duration={50}
        navigation={{ type: 'dots', showControls: true, placement: 'outside' }}
        onChange={handleChange}
        onClick={handleClick}
      >
        <Swiper.SwiperItem>Slide 1</Swiper.SwiperItem>
        <Swiper.SwiperItem>Slide 2</Swiper.SwiperItem>
        <Swiper.SwiperItem>Slide 3</Swiper.SwiperItem>
      </Swiper>,
    );

    expect(container.querySelector(`${swiperClass}`)).toHaveClass('t-swiper--outside');
    expect(container.querySelectorAll(`${swiperNavClass}__dots-item`).length).toBe(3);
    expect(container.querySelector(`${swiperItemClass}--active`)).toBeInTheDocument();

    const swiperContainer = container.querySelector(`${swiperClass}__container--card`)!;
    fireEvent.click(swiperContainer);
    expect(handleClick).toHaveBeenCalledWith(0);

    const nextBtn = container.querySelector(`${swiperNavClass}__btn--next`)! as HTMLElement;
    fireEvent.click(nextBtn);

    await act(async () => {
      await vi.advanceTimersByTimeAsync(50);
    });

    expect(handleChange).toHaveBeenCalledWith(1, expect.objectContaining({ source: 'nav' }));
    expect(container.querySelectorAll(`${swiperItemClass}--next`).length).toBeGreaterThan(0);
    expect(container.querySelector(`${swiperNavClass}__dots-item--active`)).toBeInTheDocument();
  });

  it('autoplays and loops with fraction navigation', async () => {
    vi.useFakeTimers();
    mockElementMetrics();
    const handleChange = vi.fn();

    const { getByText } = render(
      <Swiper interval={30} duration={20} navigation={{ type: 'fraction' }} onChange={handleChange}>
        <Swiper.SwiperItem>One</Swiper.SwiperItem>
        <Swiper.SwiperItem>Two</Swiper.SwiperItem>
      </Swiper>,
    );

    expect(getByText('1/2')).toBeInTheDocument();

    await act(async () => {
      await vi.advanceTimersByTimeAsync(30);
    });
    await act(async () => {
      await vi.advanceTimersByTimeAsync(20);
    });

    expect(handleChange).toHaveBeenCalledWith(1, expect.objectContaining({ source: 'autoplay' }));
    expect(getByText('2/2')).toBeInTheDocument();

    await act(async () => {
      await vi.advanceTimersByTimeAsync(30);
    });
    await act(async () => {
      await vi.advanceTimersByTimeAsync(20);
    });

    expect(handleChange).toHaveBeenLastCalledWith(0, expect.any(Object));
    expect(getByText('1/2')).toBeInTheDocument();
  });

  it('respects controlled props and layout styles', async () => {
    vi.useFakeTimers();
    mockElementMetrics(240, 180);
    const handleChange = vi.fn();

    const { container, rerender } = render(
      <Swiper
        autoplay={false}
        direction="vertical"
        previousMargin={24}
        nextMargin="16px"
        height={200}
        duration={10}
        loop
        navigation={{ type: 'dots', minShowNum: 4 }}
        onChange={handleChange}
        current={0}
      >
        <Swiper.SwiperItem>First</Swiper.SwiperItem>
        <Swiper.SwiperItem>Second</Swiper.SwiperItem>
        <Swiper.SwiperItem>Third</Swiper.SwiperItem>
      </Swiper>,
    );

    const containerEl = container.querySelector(`${swiperClass}__container--card`)! as HTMLElement;
    expect(containerEl.style.left).toBe('24px');
    expect(containerEl.style.right).toBe('16px');
    expect(containerEl.style.flexDirection).toBe('column');
    expect(containerEl.style.height).toBe('200px');
    expect(container.querySelector(`${swiperNavClass}`)).not.toBeInTheDocument();

    rerender(
      <Swiper
        autoplay={false}
        direction="vertical"
        previousMargin={24}
        nextMargin="16px"
        height={200}
        duration={10}
        loop
        navigation={{ type: 'dots', minShowNum: 4 }}
        onChange={handleChange}
        current={2}
      >
        <Swiper.SwiperItem>First</Swiper.SwiperItem>
        <Swiper.SwiperItem>Second</Swiper.SwiperItem>
        <Swiper.SwiperItem>Third</Swiper.SwiperItem>
      </Swiper>,
    );

    await act(async () => {
      await vi.advanceTimersByTimeAsync(10);
    });

    expect(handleChange).toHaveBeenCalledWith(2, expect.any(Object));
    expect(container.querySelector(`${swiperItemClass}--active`)).toHaveTextContent('Third');
  });

  it('handles swipe gestures in both directions', async () => {
    vi.useFakeTimers();
    mockElementMetrics(300, 250);
    const handleChange = vi.fn();

    const { container } = render(
      <Swiper autoplay={false} loop duration={15} interval={100} onChange={handleChange}>
        <Swiper.SwiperItem>Alpha</Swiper.SwiperItem>
        <Swiper.SwiperItem>Beta</Swiper.SwiperItem>
        <Swiper.SwiperItem>Gamma</Swiper.SwiperItem>
      </Swiper>,
    );

    const swiperContainer = container.querySelector(`${swiperClass}__container--card`)! as HTMLElement;

    fireEvent.touchStart(swiperContainer, { touches: [{ clientX: 200, clientY: 0 }] });
    fireEvent.touchMove(swiperContainer, { touches: [{ clientX: -200, clientY: 0 }] });
    expect(swiperContainer.style.transform).toContain('translateX(-100%)');
    expect(container.querySelectorAll(`${swiperItemClass}--next`).length).toBeGreaterThan(0);
    fireEvent.touchEnd(swiperContainer, { changedTouches: [{ clientX: -200, clientY: 0 }], touches: [] });

    await act(async () => {
      await vi.advanceTimersByTimeAsync(15);
    });
    expect(handleChange).toHaveBeenCalledWith(1, expect.objectContaining({ source: 'touch' }));
    handleChange.mockClear();

    fireEvent.touchStart(swiperContainer, { touches: [{ clientX: 0, clientY: 0 }] });
    fireEvent.touchMove(swiperContainer, { touches: [{ clientX: 20, clientY: 0 }] });
    fireEvent.touchEnd(swiperContainer, { changedTouches: [{ clientX: 20, clientY: 0 }], touches: [] });

    await act(async () => {
      await vi.advanceTimersByTimeAsync(15);
    });
    expect(handleChange).toHaveBeenCalledWith(1, expect.objectContaining({ source: 'touch' }));
    handleChange.mockClear();
    expect(container.querySelector(`${swiperItemClass}--active`)).toHaveTextContent('Beta');

    fireEvent.touchStart(swiperContainer, { touches: [{ clientX: -200, clientY: 0 }] });
    fireEvent.touchMove(swiperContainer, { touches: [{ clientX: 220, clientY: 0 }] });
    expect(swiperContainer.style.transform).toContain('translateX(100%)');
    expect(container.querySelectorAll(`${swiperItemClass}--prev`).length).toBeGreaterThan(0);
    fireEvent.touchEnd(swiperContainer, { changedTouches: [{ clientX: 220, clientY: 0 }], touches: [] });

    await act(async () => {
      await vi.advanceTimersByTimeAsync(15);
    });

    expect(handleChange).toHaveBeenCalledWith(0, expect.objectContaining({ source: 'touch' }));
  });

  it('honors disabled state for navigation and gestures', async () => {
    vi.useFakeTimers();
    mockElementMetrics();
    const handleChange = vi.fn();

    const { container } = render(
      <Swiper autoplay={false} disabled navigation={{ type: 'dots', showControls: true }} onChange={handleChange}>
        <Swiper.SwiperItem>Left</Swiper.SwiperItem>
        <Swiper.SwiperItem>Right</Swiper.SwiperItem>
      </Swiper>,
    );

    const swiperContainer = container.querySelector(`${swiperClass}__container--card`)!;
    const baselineCalls = handleChange.mock.calls.length;
    fireEvent.touchStart(swiperContainer, { touches: [{ clientX: 120, clientY: 0 }] });
    fireEvent.touchMove(swiperContainer, { touches: [{ clientX: 0, clientY: 0 }] });
    fireEvent.touchEnd(swiperContainer, { changedTouches: [{ clientX: 0, clientY: 0 }], touches: [] });

    await act(async () => {
      await vi.advanceTimersByTimeAsync(0);
    });

    expect(handleChange).toHaveBeenCalledTimes(baselineCalls);
    expect(container.querySelector(`${swiperItemClass}--active`)).toHaveTextContent('Left');
  });

  it('resets vertical swipe when movement is below threshold', async () => {
    vi.useFakeTimers();
    mockElementMetrics(240, 360);
    const handleChange = vi.fn();

    const { container } = render(
      <Swiper autoplay={false} loop direction="vertical" duration={12} interval={80} onChange={handleChange}>
        <Swiper.SwiperItem>Top</Swiper.SwiperItem>
        <Swiper.SwiperItem>Bottom</Swiper.SwiperItem>
      </Swiper>,
    );

    const baselineCalls = handleChange.mock.calls.length;
    const swiperContainer = container.querySelector(`${swiperClass}__container--card`)! as HTMLElement;
    const startY = 240;
    const moveY = 180;
    const containerHeight = 360;

    fireEvent.touchStart(swiperContainer, { touches: [{ clientX: 0, clientY: startY }] });
    fireEvent.touchMove(swiperContainer, { touches: [{ clientX: 0, clientY: moveY }] });

    const expectedPercent = ((moveY - startY) / containerHeight) * 100;
    expect(swiperContainer.style.transform).toContain(`translateY(${expectedPercent}%)`);

    fireEvent.touchEnd(swiperContainer, { changedTouches: [{ clientX: 0, clientY: 180 }], touches: [] });

    await act(async () => {
      await vi.advanceTimersByTimeAsync(12);
    });

    expect(handleChange.mock.calls.length).toBeGreaterThan(baselineCalls);
    expect(container.querySelector(`${swiperItemClass}--active`)).toHaveTextContent('Top');
  });

  it('supports card layout with string sizing and nav placement configs', async () => {
    mockElementMetrics(360, 220);

    const { container, rerender } = render(
      <Swiper
        autoplay={false}
        loop
        type="card"
        previousMargin="5%"
        nextMargin="12%"
        height="180px"
        navigation={{ type: 'dots-bar', paginationPosition: 'bottom', placement: 'outside', minShowNum: 1 }}
      >
        <Swiper.SwiperItem>Slide A</Swiper.SwiperItem>
        <Swiper.SwiperItem>Slide B</Swiper.SwiperItem>
        <Swiper.SwiperItem>Slide C</Swiper.SwiperItem>
        <Swiper.SwiperItem>Slide D</Swiper.SwiperItem>
      </Swiper>,
    );

    const cardContainer = container.querySelector(`${swiperClass}__container--card`)! as HTMLElement;
    expect(cardContainer.style.left).toBe('5%');
    expect(cardContainer.style.right).toBe('12%');
    expect(cardContainer.style.height).toBe('180px');

    await flushEffects();
    await flushEffects();
    expect(container.querySelector(`${swiperClass}`)).toHaveClass('t-swiper--card');

    rerender(
      <Swiper
        autoplay={false}
        loop
        type="card"
        previousMargin="5%"
        nextMargin="12%"
        height="180px"
        navigation={{ type: '' as any, placement: 'outside', paginationPosition: 'bottom' }}
      >
        <Swiper.SwiperItem>Slide A</Swiper.SwiperItem>
        <Swiper.SwiperItem>Slide B</Swiper.SwiperItem>
        <Swiper.SwiperItem>Slide C</Swiper.SwiperItem>
        <Swiper.SwiperItem>Slide D</Swiper.SwiperItem>
      </Swiper>,
    );

    await flushEffects();
    await flushEffects();
  });

  it('normalizes swipe offsets and respects guard fallbacks', async () => {
    vi.useFakeTimers();
    const zeroRect = () => createRect(0, 0);
    vi.spyOn(HTMLElement.prototype, 'offsetWidth', 'get').mockReturnValue(undefined as any);
    vi.spyOn(HTMLElement.prototype, 'offsetHeight', 'get').mockReturnValue(undefined as any);
    vi.spyOn(HTMLElement.prototype, 'getBoundingClientRect').mockImplementation(zeroRect);

    const { container, rerender } = render(
      <Swiper autoplay={false} loop={false} navigation={{ type: 'dots', showControls: true }} duration={30}>
        {/* intentionally empty to hit guards */}
      </Swiper>,
    );

    const emptyContainer = container.querySelector(`${swiperClass}__container--card`)! as HTMLElement;
    fireEvent.touchStart(emptyContainer, { touches: [{ clientX: 10, clientY: 5 }] });
    fireEvent.touchMove(emptyContainer, { touches: [{ clientX: 80, clientY: 5 }] });
    fireEvent.touchEnd(emptyContainer, { changedTouches: [{ clientX: 80, clientY: 5 }], touches: [] });
    expect(emptyContainer.style.transform).toBe('');

    rerender(
      <Swiper autoplay={false} loop={false} navigation={{ type: 'dots', showControls: true }} duration={30}>
        <Swiper.SwiperItem>Solo</Swiper.SwiperItem>
        <Swiper.SwiperItem>Partner</Swiper.SwiperItem>
      </Swiper>,
    );

    const fallbackContainer = container.querySelector(`${swiperClass}__container--card`)! as HTMLElement;
    fireEvent.touchStart(fallbackContainer, { touches: [{ clientX: 100, clientY: 0 }] });
    fireEvent.touchMove(fallbackContainer, { touches: [{ clientX: -260, clientY: 0 }] });
    fireEvent.touchEnd(fallbackContainer, { changedTouches: [{ clientX: -260, clientY: 0 }], touches: [] });
    await flushEffects();
    const swiperItems = Array.from(container.querySelectorAll(`${swiperItemClass}`));
    expect(swiperItems[0]).toHaveTextContent('Solo');

    vi.restoreAllMocks();
    vi.useFakeTimers();
    mockElementMetrics(320, 200);

    rerender(
      <Swiper autoplay={false} loop duration={25} navigation={{ type: 'dots', showControls: true }}>
        <Swiper.SwiperItem>One</Swiper.SwiperItem>
        <Swiper.SwiperItem>Two</Swiper.SwiperItem>
        <Swiper.SwiperItem>Three</Swiper.SwiperItem>
      </Swiper>,
    );

    const activeContainer = container.querySelector(`${swiperClass}__container--card`)! as HTMLElement;
    const nextBtn = container.querySelector(`${swiperNavClass}__btn--next`)! as HTMLElement;
    fireEvent.click(nextBtn);

    fireEvent.touchStart(activeContainer, { touches: [{ clientX: 160, clientY: 0 }] });
    fireEvent.touchMove(activeContainer, { touches: [{ clientX: -120, clientY: 0 }] });
    fireEvent.touchEnd(activeContainer, { changedTouches: [{ clientX: -120, clientY: 0 }], touches: [] });

    await act(async () => {
      await vi.advanceTimersByTimeAsync(25);
    });

    fireEvent.touchStart(activeContainer, { touches: [{ clientX: 0, clientY: 0 }] });
    fireEvent.touchMove(activeContainer, { touches: [{ clientX: -700, clientY: 0 }] });
    expect(activeContainer.style.transform).toContain('translateX(-100%)');
    fireEvent.touchEnd(activeContainer, { changedTouches: [{ clientX: -700, clientY: 0 }], touches: [] });

    await act(async () => {
      await vi.advanceTimersByTimeAsync(25);
    });
  });
  it('recomputes when items are removed dynamically', async () => {
    vi.useFakeTimers();
    mockElementMetrics();

    const Demo = () => {
      const [visible, setVisible] = useState(true);
      return (
        <div>
          <Swiper autoplay={false} loop duration={20} interval={50}>
            {visible && <Swiper.SwiperItem>Shown</Swiper.SwiperItem>}
            <Swiper.SwiperItem>Persistent</Swiper.SwiperItem>
          </Swiper>
          <button type="button" onClick={() => setVisible(false)}>
            toggle
          </button>
        </div>
      );
    };

    const { getByText } = render(<Demo />);

    fireEvent.click(getByText('toggle'));

    await act(async () => {
      vi.advanceTimersByTime(20);
    });

    expect(document.querySelectorAll(`${swiperItemClass}`).length).toBe(1);
  });

  it('clamps navigation at bounds without loop and falls back for custom navigation slot', async () => {
    vi.useFakeTimers();
    mockElementMetrics();
    const handleChange = vi.fn();

    const { container, rerender } = render(
      <Swiper
        autoplay={false}
        loop={false}
        duration={18}
        navigation={{ type: 'dots', showControls: true }}
        onChange={handleChange}
      >
        <Swiper.SwiperItem>First</Swiper.SwiperItem>
        <Swiper.SwiperItem>Second</Swiper.SwiperItem>
      </Swiper>,
    );

    const initialCalls = handleChange.mock.calls.length;
    const prevBtn = container.querySelector(`${swiperNavClass}__btn--prev`)! as HTMLElement;
    fireEvent.click(prevBtn);

    await act(async () => {
      await vi.advanceTimersByTimeAsync(18);
    });

    expect(handleChange.mock.calls.length).toBeGreaterThan(initialCalls);
    expect(handleChange).toHaveBeenLastCalledWith(0, expect.objectContaining({ source: 'nav' }));
    expect(container.querySelector(`${swiperItemClass}--active`)).toHaveTextContent('First');

    rerender(
      <Swiper
        autoplay={false}
        loop={false}
        duration={18}
        navigation={() => <span data-testid="custom-nav">slot</span>}
        onChange={handleChange}
      >
        <Swiper.SwiperItem>First</Swiper.SwiperItem>
        <Swiper.SwiperItem>Second</Swiper.SwiperItem>
      </Swiper>,
    );

    expect(container.querySelector('[data-testid="custom-nav"]')).not.toBeInTheDocument();
  });

  it('handles vertical direction with controls and height from items', async () => {
    vi.useFakeTimers();
    mockElementMetrics(300, 400);
    const handleChange = vi.fn();

    const { container } = render(
      <Swiper
        autoplay={false}
        direction="vertical"
        loop
        duration={20}
        navigation={{ type: 'dots', showControls: true }}
        onChange={handleChange}
      >
        <Swiper.SwiperItem>Top</Swiper.SwiperItem>
        <Swiper.SwiperItem>Bottom</Swiper.SwiperItem>
        <Swiper.SwiperItem>Another</Swiper.SwiperItem>
      </Swiper>,
    );

    expect(container.querySelector(`${swiperClass}__container--card`)).toHaveStyle({ flexDirection: 'column' });
    expect(container.querySelector(`${swiperNavClass}__btn`)).not.toBeInTheDocument(); // controls not shown in vertical
    expect(container.querySelectorAll(`${swiperNavClass}__dots-item`).length).toBe(3);

    const swiperContainer = container.querySelector(`${swiperClass}__container--card`)! as HTMLElement;
    fireEvent.touchStart(swiperContainer, { touches: [{ clientX: 0, clientY: 200 }] });
    fireEvent.touchMove(swiperContainer, { touches: [{ clientX: 0, clientY: 50 }] });
    fireEvent.touchEnd(swiperContainer, { changedTouches: [{ clientX: 0, clientY: 50 }], touches: [] });

    await act(async () => {
      await vi.advanceTimersByTimeAsync(20);
    });

    expect(handleChange).toHaveBeenCalledWith(1, expect.objectContaining({ source: 'touch' }));
  });

  it('renders without navigation and uses height from first item', async () => {
    mockElementMetrics(300, 200);
    const mockRect = {
      width: 300,
      height: 150,
      top: 0,
      left: 0,
      bottom: 150,
      right: 300,
      x: 0,
      y: 0,
      toJSON: () => ({}),
    };
    vi.spyOn(HTMLElement.prototype, 'getBoundingClientRect').mockReturnValue(mockRect);

    const { container } = render(
      <Swiper autoplay={false} loop>
        <Swiper.SwiperItem>Item 1</Swiper.SwiperItem>
        <Swiper.SwiperItem>Item 2</Swiper.SwiperItem>
      </Swiper>,
    );

    expect(container.querySelector(`${swiperNavClass}`)).not.toBeInTheDocument();
    expect(container.querySelector(`${swiperClass}__container--card`)).toHaveStyle({ height: '150px' });

    vi.restoreAllMocks();
  });

  it('renders custom navigation as string', async () => {
    const { container } = render(
      <Swiper autoplay={false} navigation="Custom Nav">
        <Swiper.SwiperItem>Slide 1</Swiper.SwiperItem>
      </Swiper>,
    );

    expect(container.textContent).toContain('Custom Nav');
  });

  it('handles navigation object without type property', async () => {
    const { container } = render(
      <Swiper autoplay={false} navigation={{ showControls: true }}>
        <Swiper.SwiperItem>Slide 1</Swiper.SwiperItem>
        <Swiper.SwiperItem>Slide 2</Swiper.SwiperItem>
      </Swiper>,
    );

    expect(container.querySelector(`${swiperNavClass}`)).toBeInTheDocument();
    expect(container.querySelector(`${swiperNavClass}__btn`)).toBeInTheDocument();
  });

  it('exposes SwiperItem as static property', () => {
    expect(Swiper.SwiperItem).toBeDefined();
    expect(typeof Swiper.SwiperItem).toBe('function');
    // Test that static properties are properly hoisted
    expect(Object.keys(Swiper)).toContain('SwiperItem');
    expect(Object.getOwnPropertyDescriptor(Swiper, 'SwiperItem')).toBeDefined();
    // Test property descriptor attributes
    const descriptor = Object.getOwnPropertyDescriptor(Swiper, 'SwiperItem');
    expect(descriptor?.writable).toBe(true);
    expect(descriptor?.enumerable).toBe(true);
    expect(descriptor?.configurable).toBe(true);
  });
});
