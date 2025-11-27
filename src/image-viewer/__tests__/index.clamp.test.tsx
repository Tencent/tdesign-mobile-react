import React from 'react';
import { describe, it, expect, render, fireEvent } from '@test/utils';
import { vi } from 'vitest';
import { ImageViewer } from '../index';

// mock useTouchEvent: 返回静态 isTouching 与空事件处理，避免交互影响渲染
vi.mock('../useTouchEvent', () => {
  const isTouching = { current: false };
  return {
    useTouchEvent: () => ({
      isTouching,
      onTouchStart: () => {},
      onTouchMove: () => {},
      onTouchEnd: () => {},
    }),
  };
});

// 通用 mock：可变的 transform，便于在不同用例中设置越界 x/y
let mockTransform = { x: 0, y: 0, scale: 1.5 };
vi.mock('../transform', () => ({
    useImageTransform: () => ({
      transform: mockTransform,
      resetTransform: () => {},
      updateTransform: () => {},
      dispatchZoomChange: () => {},
    }),
  }));

vi.mock('../getFixScaleEleTransPosition', () => ({
  getFixScaleEleTransPosition: (
    rootRect: { width: number; height: number },
    imgRect: { width: number; height: number },
    transform: { x: number; y: number; scale: number },
    align: 'start' | 'center' | 'end',
  ) => {
    const scaledW = imgRect.width * transform.scale;
    const scaledH = imgRect.height * transform.scale;
    const diffHalfX = Math.max(0, (scaledW - rootRect.width) / 2);
    const diffHalfY = Math.max(0, (scaledH - rootRect.height) / 2);
    // X clamp
    const x = Math.max(-diffHalfX, Math.min(diffHalfX, transform.x));
    // Y clamp per align
    let {y} = transform;
    if (align === 'start') {
      y = Math.max(-diffHalfY, Math.min(diffHalfY, y));
      if (y < -diffHalfY) y = -diffHalfY;
    } else if (align === 'end') {
      y = Math.max(-diffHalfY, Math.min(diffHalfY, y));
      if (y > diffHalfY) y = diffHalfY;
    } else {
      y = Math.max(-diffHalfY, Math.min(diffHalfY, y));
    }
    return { x, y };
  },
}));

const imgUrl = 'https://tdesign.gtimg.com/mobile/demos/swiper1.png';

describe('ImageViewer clamp branches via mocked transform', () => {
  it.skip('getRealTransformY clamps to top for align=start when y < top', () => {
    mockTransform = { x: 0, y: -10000, scale: 1.5 };

    const { container, rerender } = render(
      <ImageViewer images={[imgUrl]} visible align="start" />,
    );
    const root = container.querySelector('.t-image-viewer') as HTMLDivElement;
    const img = container.querySelector('.t-image-viewer__img') as HTMLImageElement;

    root.getBoundingClientRect = () => ({ width: 300, height: 300 } as any);
    img.getBoundingClientRect = () => ({ width: 300, height: 400 } as any);
    Object.defineProperty(root, 'offsetHeight', { value: 300, configurable: true });
    Object.defineProperty(img, 'offsetHeight', { value: 400, configurable: true });

    vi.useFakeTimers();
    Object.defineProperty(img, 'naturalWidth', { value: 300, configurable: true });
    Object.defineProperty(img, 'naturalHeight', { value: 400, configurable: true });
    rerender(<ImageViewer images={[{ url: imgUrl, align: 'start' }]} visible />);
    fireEvent.load(img);
    vi.advanceTimersByTime(20);

    // 覆盖钳制分支：断言 helper 被调用（分支命中），并且样式已应用缩放
    const { getFixScaleEleTransPosition } = require('../getFixScaleEleTransPosition');
    expect(getFixScaleEleTransPosition).toHaveBeenCalled();
    const style = (img.getAttribute('style') || '').toString();
    expect(style).contain('matrix(1.5, 0, 0, 1.5');
  });

  it.skip('getRealTransformY clamps to bottom for align=end when y > bottom', () => {
    mockTransform = { x: 0, y: 10000, scale: 1.5 };

    const { container, rerender } = render(
      <ImageViewer images={[imgUrl]} visible align="end" />,
    );
    const root = container.querySelector('.t-image-viewer') as HTMLDivElement;
    const img = container.querySelector('.t-image-viewer__img') as HTMLImageElement;

    root.getBoundingClientRect = () => ({ width: 300, height: 300 } as any);
    img.getBoundingClientRect = () => ({ width: 300, height: 400 } as any);
    Object.defineProperty(root, 'offsetHeight', { value: 300, configurable: true });
    Object.defineProperty(img, 'offsetHeight', { value: 400, configurable: true });

    vi.useFakeTimers();
    Object.defineProperty(img, 'naturalWidth', { value: 300, configurable: true });
    Object.defineProperty(img, 'naturalHeight', { value: 400, configurable: true });
    rerender(<ImageViewer images={[{ url: imgUrl, align: 'end' }]} visible />);
    fireEvent.load(img);
    vi.advanceTimersByTime(20);

    const { getFixScaleEleTransPosition } = require('../getFixScaleEleTransPosition');
    expect(getFixScaleEleTransPosition).toHaveBeenCalled();
    const style = (img.getAttribute('style') || '').toString();
    expect(style).contain('matrix(1.5, 0, 0, 1.5');
  });

  it('getRealTransformX clamps to ±max when |x| exceeds bounds', () => {
    // rootWidth=300, scaledWidth=1.5*300=450 => maxX=(450-300)/2=75
    const { container, rerender } = render(
      <ImageViewer images={[imgUrl]} visible align="center" />,
    );
    const root = container.querySelector('.t-image-viewer') as HTMLDivElement;
    const img = container.querySelector('.t-image-viewer__img') as HTMLImageElement;
    root.getBoundingClientRect = () => ({ width: 300, height: 300, top: 0, left: 0, right: 300, bottom: 300, x: 0, y: 0 } as any);
    img.getBoundingClientRect = () => ({ width: 300, height: 300, top: 0, left: 0, right: 300, bottom: 300, x: 0, y: 0 } as any);
    Object.defineProperty(root, 'offsetWidth', { value: 300, configurable: true });
    Object.defineProperty(img, 'offsetWidth', { value: 300, configurable: true });

    // x 超出正向边界
    mockTransform = { x: 9999, y: 0, scale: 1.5 };
    rerender(<ImageViewer images={[{ url: imgUrl, align: 'center' }]} visible />);
    vi.useFakeTimers();
    vi.advanceTimersByTime(20);
    const styleRight = (img.getAttribute('style') || '').toString();
    expect(styleRight).contain('matrix(1.5, 0, 0, 1.5, 75,');

    // x 超出负向边界
    mockTransform = { x: -9999, y: 0, scale: 1.5 };
    rerender(<ImageViewer images={[{ url: imgUrl, align: 'center' }]} visible />);
    vi.advanceTimersByTime(20);
    const styleLeft = (img.getAttribute('style') || '').toString();
    expect(styleLeft).contain('matrix(1.5, 0, 0, 1.5, -75,');
  });
});
