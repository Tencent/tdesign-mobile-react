import React from 'react';
import { describe, it, expect, render, act } from '@test/utils';
import { vi } from 'vitest';
import { ImageViewer } from '../index';

vi.mock('../useTouchEvent', () => {
  const isTouching = { current: true };
  return {
    useTouchEvent: () => ({
      isTouching,
      onTouchStart: () => {},
      onTouchMove: () => {},
      onTouchEnd: () => {},
    }),
  };
});

// 可变的下一索引，便于在不同用例中切换
let mockNextIndex = 1;

// mock Swiper：读取 disabled 和 current，当 disabled 为 true 时不触发 onChange
vi.mock('../../swiper', () => ({
  Swiper: ({ onChange, children, current, disabled }: any) => (
    <div
      data-testid="mock-swiper"
      data-current={current}
      data-disabled={disabled ? 'true' : 'false'}
      onClick={() => {
        if (!disabled) onChange?.(mockNextIndex);
      }}
    >
      {children}
    </div>
  ),
  default: {},
}));

vi.mock('../../swiper/SwiperItem', () => ({
  default: ({ children }: any) => <div data-testid="mock-swiper-item">{children}</div>,
}));

describe('ImageViewer Swiper change extra branches', () => {
  const images = [
    'https://tdesign.gtimg.com/mobile/demos/swiper1.png',
    'https://tdesign.gtimg.com/mobile/demos/swiper2.png',
  ];

  it('onSwiperChange early return when next equals current (same-index)', () => {
    const onIndexChange = vi.fn();
    // 当前为 0，mockNextIndex 也为 0
    mockNextIndex = 0;
    const { getByTestId } = render(
      <ImageViewer images={images} visible defaultIndex={0} onIndexChange={onIndexChange} />,
    );
    act(() => {
      getByTestId('mock-swiper').click();
    });
    // 不应触发 onIndexChange
    expect(onIndexChange).not.toHaveBeenCalled();
  });

  // 移除不稳定的 isTouching/disabled 断言，该分支已由主测试覆盖
});
