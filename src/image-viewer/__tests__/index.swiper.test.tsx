import React from 'react';
import { describe, it, expect, render, fireEvent, act } from '@test/utils';
import { vi } from 'vitest';
import { ImageViewer } from '../index';

let mockNextIndex = 1;

// 通过 vi.mock 替换 Swiper/SwiperItem，使我们能直接触发 onChange
vi.mock('../../swiper', () => ({
  Swiper: ({ onChange, children, current }: any) => (
    <div data-testid="mock-swiper" data-current={current} onClick={() => onChange?.(mockNextIndex)}>
      {children}
    </div>
  ),
  default: {},
}));

vi.mock('../../swiper/SwiperItem', () => ({
    default: ({ children }: any) => <div data-testid="mock-swiper-item">{children}</div>,
  }));

const images = [
  'https://tdesign.gtimg.com/mobile/demos/swiper1.png',
  'https://tdesign.gtimg.com/mobile/demos/swiper2.png',
];

describe('ImageViewer Swiper change branches', () => {
  it('onSwiperChange early return when index unchanged', () => {
    const onIndexChange = vi.fn();
    // currentIndex=0，mockNextIndex=0 -> 不触发 onIndexChange
    mockNextIndex = 0;
    const { getByTestId } = render(
      <ImageViewer images={images} visible defaultIndex={0} onIndexChange={onIndexChange} />,
    );
    act(() => {
      fireEvent.click(getByTestId('mock-swiper'));
    });
    expect(onIndexChange).not.toHaveBeenCalled();
  });

  it('onSwiperChange trigger next when index increases', () => {
    mockNextIndex = 1;
    const onIndexChange = vi.fn();
    const { getByTestId } = render(
      <ImageViewer images={images} visible defaultIndex={0} onIndexChange={onIndexChange} />,
    );
    act(() => {
      fireEvent.click(getByTestId('mock-swiper'));
    });
    expect(onIndexChange).toHaveBeenCalled();
    // 第一次调用，触发应为 next
    const arg = onIndexChange.mock.calls[0][1];
    expect(arg).toMatchObject({ trigger: 'next' });
  });

  it('onSwiperChange trigger prev when index decreases', () => {
    const onIndexChange = vi.fn();
    // 默认当前为 1，点击后触发 onChange(0) → 应为 prev
    mockNextIndex = 0;
    const { getByTestId } = render(
      <ImageViewer images={images} visible defaultIndex={1} onIndexChange={onIndexChange} />,
    );
    act(() => {
      fireEvent.click(getByTestId('mock-swiper'));
    });
    expect(onIndexChange).toHaveBeenCalled();
    const arg = onIndexChange.mock.calls[0][1];
    expect(arg).toMatchObject({ trigger: 'prev' });
  });

  it('does not trigger onIndexChange when scale != 1 (early return)', () => {
    vi.useFakeTimers();
    const onIndexChange = vi.fn();
    const { container, getByTestId } = render(
      <ImageViewer images={images} visible defaultIndex={0} onIndexChange={onIndexChange} />,
    );
    const img = container.querySelector('.t-image-viewer__img') as HTMLImageElement;

    // 通过双击让 scale != 1，并推进 raf
    act(() => {
      fireEvent.doubleClick(img);
      vi.advanceTimersByTime(20);
    });

    // 点击 Swiper（mock），由于 scale!=1，onSwiperChange 早退，不应触发 onIndexChange
    mockNextIndex = 1;
    act(() => {
      fireEvent.click(getByTestId('mock-swiper'));
    });
    expect(onIndexChange).not.toHaveBeenCalled();
    vi.useRealTimers();
  });
});
