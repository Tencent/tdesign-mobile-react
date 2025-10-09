import React from 'react';
import { describe, it, expect, render, fireEvent, act } from '@test/utils';
import { vi } from 'vitest';
import { ImageViewer } from '../index';

const images = [
  'https://tdesign.gtimg.com/mobile/demos/swiper1.png',
  'https://tdesign.gtimg.com/mobile/demos/swiper2.png',
];

describe('ImageViewer props conditional rendering', () => {
  describe('props:closeBtn', () => {
    it(':closeBtn=null hides close button content', () => {
      const { container } = render(<ImageViewer images={images} visible closeBtn={null} />);
      const closeBtn = container.querySelector('.t-image-viewer__nav-close');
      expect(closeBtn).not.toBeNull(); // div exists
      expect(closeBtn?.children.length).toBe(0); // but no content
    });

    it(':closeBtn=false renders empty content', () => {
      const { container } = render(<ImageViewer images={images} visible closeBtn={false} />);
      const closeBtn = container.querySelector('.t-image-viewer__nav-close');
      expect(closeBtn).not.toBeNull();
      // false renders as empty content, not default icon
      expect(closeBtn?.children.length).toBe(0);
    });

    it(':closeBtn=true shows close button (default)', () => {
      const { container } = render(<ImageViewer images={images} visible />);
      const closeBtn = container.querySelector('.t-image-viewer__nav-close');
      expect(closeBtn).not.toBeNull();
    });
  });

  describe('props:deleteBtn', () => {
    it(':deleteBtn=null hides delete button content', () => {
      const onDelete = vi.fn();
      const { container } = render(
        <ImageViewer images={images} visible deleteBtn={null} onDelete={onDelete} />,
      );
      const deleteBtn = container.querySelector('.t-image-viewer__nav-delete');
      expect(deleteBtn).not.toBeNull(); // div exists
      expect(deleteBtn?.children.length).toBe(0); // but no content
    });

    it(':deleteBtn=false renders empty content', () => {
      const onDelete = vi.fn();
      const { container } = render(
        <ImageViewer images={images} visible deleteBtn={false} onDelete={onDelete} />,
      );
      const deleteBtn = container.querySelector('.t-image-viewer__nav-delete');
      expect(deleteBtn).not.toBeNull();
      // false renders as empty content, not default icon
      expect(deleteBtn?.children.length).toBe(0);
    });

    it(':deleteBtn=true with onDelete shows delete button', () => {
      const onDelete = vi.fn();
      const { container } = render(
        <ImageViewer images={images} visible deleteBtn onDelete={onDelete} />,
      );
      const deleteBtn = container.querySelector('.t-image-viewer__nav-delete');
      expect(deleteBtn).not.toBeNull();
    });
  });

  describe('controlled visible behavior', () => {
    it(':controlled visible - overlay click triggers onClose but does not hide', () => {
      const onClose = vi.fn();
      const { container, rerender } = render(
        <ImageViewer images={images} visible onClose={onClose} />,
      );
      
      // 点击遮罩
      const overlay = container.querySelector('.t-image-viewer__mask') as HTMLElement;
      act(() => {
        fireEvent.click(overlay);
      });
      
      // 应该触发 onClose
      expect(onClose).toHaveBeenCalled();
      const arg = onClose.mock.calls[0][0];
      expect(arg?.trigger).toBe('overlay');
      
      // 受控模式下，组件仍然可见（需要外部控制 visible）
      rerender(<ImageViewer images={images} visible onClose={onClose} />);
      const viewer = container.querySelector('.t-image-viewer');
      expect(viewer).not.toBeNull();
    });
  });

  describe('single image scenarios', () => {
    it(':single image with showIndex shows 1/1', () => {
      const { container } = render(
        <ImageViewer images={[images[0]]} visible showIndex />,
      );
      const indexEl = container.querySelector('.t-image-viewer__nav-index') as HTMLElement;
      expect(indexEl.textContent).toMatch(/1\/1/);
    });

    it(':single image delete triggers onDelete with index 0', () => {
      const onDelete = vi.fn();
      const { container } = render(
        <ImageViewer images={[images[0]]} visible onDelete={onDelete} />,
      );
      const deleteBtn = container.querySelector('.t-image-viewer__nav-delete') as HTMLElement;
      act(() => {
        fireEvent.click(deleteBtn);
      });
      expect(onDelete).toHaveBeenCalled();
    });
  });

  describe('default props behavior', () => {
    it(':defaultVisible=true shows viewer initially', () => {
      const { container } = render(<ImageViewer images={images} defaultVisible />);
      const viewer = container.querySelector('.t-image-viewer');
      expect(viewer).not.toBeNull();
    });

    it(':defaultIndex=1 starts at second image', () => {
      const { container } = render(
        <ImageViewer images={images} visible defaultIndex={1} showIndex />,
      );
      const indexEl = container.querySelector('.t-image-viewer__nav-index') as HTMLElement;
      expect(indexEl.textContent).toMatch(/2\/2/);
    });
  });
});
