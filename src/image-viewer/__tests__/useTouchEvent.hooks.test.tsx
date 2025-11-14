import React from 'react';
import { describe, it, expect, render, fireEvent, act } from '@test/utils';
import { vi } from 'vitest';
import { ImageViewer } from '../index';

const images = [
  'https://tdesign.gtimg.com/mobile/demos/swiper1.png',
  'https://tdesign.gtimg.com/mobile/demos/swiper2.png',
];

function getImg(container: HTMLElement) {
  return container.querySelector('.t-image-viewer__img') as HTMLImageElement;
}

function styleStr(el: Element) {
  return (el.getAttribute('style') || '').toString();
}

describe('ImageViewer hooks: useTouchEvent', () => {
  it('touchZoom enlarge (two fingers) increases scale', () => {
    vi.useFakeTimers();
    const { container } = render(<ImageViewer images={images} visible />);
    const img = getImg(container);

    // 两指缩放：起始距离 100 -> 移动距离 200，ratio=2 => scale 1 -> 2(受 maxZoom=3)
    act(() => {
      fireEvent.touchStart(img, {
        touches: [{ clientX: 0, clientY: 0 }, { clientX: 100, clientY: 0 }],
      } as any);
    });
    act(() => {
      fireEvent.touchMove(img, {
        touches: [{ clientX: 0, clientY: 0 }, { clientX: 200, clientY: 0 }],
      } as any);
      vi.advanceTimersByTime(20);
    });

    expect(styleStr(img)).contain('matrix(2');

    // 结束触摸
    act(() => {
      fireEvent.touchEnd(img);
      vi.advanceTimersByTime(20);
    });

    // 保持放大状态（未低于 minScale，不会被重置）
    expect(styleStr(img)).contain('matrix(2');

    vi.useRealTimers();
  });

  it('touchZoom shrink then touchEnd resets to minScale when scale < minScale', () => {
    vi.useFakeTimers();
    const { container } = render(<ImageViewer images={images} visible />);
    const img = getImg(container);

    // 两指缩放：起始距离 200 -> 移动距离 100，ratio=0.5 => scale 1 -> 0.5
    act(() => {
      fireEvent.touchStart(img, {
        touches: [{ clientX: 0, clientY: 0 }, { clientX: 200, clientY: 0 }],
      } as any);
    });
    act(() => {
      fireEvent.touchMove(img, {
        touches: [{ clientX: 0, clientY: 0 }, { clientX: 100, clientY: 0 }],
      } as any);
      vi.advanceTimersByTime(20);
    });

    // 此时缩放低于 1
    expect(styleStr(img)).contain('matrix(0.5');

    // 触摸结束后，useTouchEvent 会重置到 minScale=1，且 x/y 归零
    act(() => {
      fireEvent.touchEnd(img);
      vi.advanceTimersByTime(20);
    });

    const s = styleStr(img);
    expect(s).contain('matrix(1, 0, 0, 1, 0, 0');

    vi.useRealTimers();
  });

  it('single finger move updates translate when scale > 1, and touchEnd rebounds to bounds (x/y -> 0 in jsdom)', () => {
    vi.useFakeTimers();
    const { container } = render(<ImageViewer images={images} visible />);
    const img = getImg(container);

    // 先通过双击放大，使可拖拽
    act(() => {
      fireEvent.doubleClick(img); // 1 -> 1.5
      vi.advanceTimersByTime(20);
    });
    expect(styleStr(img)).contain('matrix(1.5');

    // 单指拖拽：起始位置，随后移动
    act(() => {
      fireEvent.touchStart(img, {
        touches: [{ clientX: 50, clientY: 60 }],
      } as any);
    });
    act(() => {
      fireEvent.touchMove(img, {
        touches: [{ clientX: 100, clientY: 120 }],
      } as any);
      vi.advanceTimersByTime(20);
    });

    // 拖拽后应有非零的 translate（x,y）
    const moved = styleStr(img);
    expect(moved).match(/matrix\(1\.5, 0, 0, 1\.5, \-?\d+, \-?\d+\)/);

    // 触摸结束：jsdom 下 img offsetWidth/Height 通常为 0，触发回弹到 (0,0)
    act(() => {
      fireEvent.touchEnd(img);
      vi.advanceTimersByTime(20);
    });
    const rebound = styleStr(img);
    expect(rebound).contain('matrix(1.5, 0, 0, 1.5, 0, 0');

    vi.useRealTimers();
  });
});
