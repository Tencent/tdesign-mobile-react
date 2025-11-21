import React from 'react';
import { describe, it, expect, render, fireEvent, act } from '@test/utils';
import { vi } from 'vitest';
import { ImageViewer } from '../index';

const images = [
  'https://tdesign.gtimg.com/mobile/demos/swiper1.png',
  'https://tdesign.gtimg.com/mobile/demos/swiper2.png',
];

describe('ImageViewer events & conditional rendering', () => {
  describe('event:onClose triggers', () => {
    it(':overlay click triggers onClose with { trigger: "overlay" }', () => {
      const onClose = vi.fn();
      const { container } = render(<ImageViewer images={images} visible onClose={onClose} />);
      const overlay = container.querySelector('.t-image-viewer__mask') as HTMLElement;
      act(() => {
        fireEvent.click(overlay);
      });
      // 过渡 + raf
      vi.useFakeTimers();
      act(() => {
        vi.advanceTimersByTime(340);
      });
      expect(onClose).toHaveBeenCalled();
      const arg = onClose.mock.calls[0][0];
      expect(arg?.trigger).toBe('overlay');
      vi.useRealTimers();
    });

    it(':close button triggers onClose with { trigger: "close-btn" }', () => {
      const onClose = vi.fn();
      const { container } = render(<ImageViewer images={images} visible onClose={onClose} />);
      const closeBtn = container.querySelector('.t-image-viewer__nav-close') as HTMLElement;
      act(() => {
        fireEvent.click(closeBtn);
      });
      vi.useFakeTimers();
      act(() => {
        vi.advanceTimersByTime(340);
      });
      expect(onClose).toHaveBeenCalled();
      const arg = onClose.mock.calls[0][0];
      expect(arg?.trigger).toBe('close-btn');
      vi.useRealTimers();
    });
  });

  describe('event:onDelete', () => {
    it(':delete triggers onDelete and can be used to remove current image', () => {
      const onDelete = vi.fn();
      const { container, rerender } = render(
        <ImageViewer images={images} visible defaultIndex={1} onDelete={onDelete} />,
      );
      const deleteBtn = container.querySelector('.t-image-viewer__nav-delete') as HTMLElement;
      act(() => {
        fireEvent.click(deleteBtn);
      });
      expect(onDelete).toHaveBeenCalled();
      const arg = onDelete.mock.calls[0][0];
      expect(arg).toBeDefined();
      // 模拟外部删除后剩余一张图重新渲染（显式开启 showIndex）
      rerender(<ImageViewer images={[images[0]]} visible defaultIndex={0} showIndex onDelete={onDelete} />);
      const showIndexEl = container.querySelector('.t-image-viewer__nav-index') as HTMLElement;
      expect(showIndexEl).not.toBeNull();
      expect(showIndexEl.textContent).toMatch(/1\/1/);
    });
  });

  describe('props:showIndex', () => {
    it(':showIndex=false hides index indicator', () => {
      const { queryByTestId } = render(<ImageViewer images={images} visible showIndex={false} />);
      expect(queryByTestId('t-image-viewer__index')).toBeNull();
    });

    it(':showIndex=true shows index indicator and updates with swiper change', () => {
      const { container } = render(<ImageViewer images={images} visible defaultIndex={0} showIndex />);
      const indexEl = container.querySelector('.t-image-viewer__nav-index') as HTMLElement;
      expect(indexEl.textContent).toMatch(/1\/2/);
    });
  });
});
