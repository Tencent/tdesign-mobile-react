import React from 'react';
import { describe, it, expect, render, fireEvent, act, beforeEach, afterEach } from '@test/utils';
import { vi } from 'vitest';
import { ImageViewer } from '../index';

const images = [
  'https://tdesign.gtimg.com/mobile/demos/swiper1.png',
  'https://tdesign.gtimg.com/mobile/demos/swiper2.png',
];

describe('ImageViewer edge cases and boundary conditions', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  describe('boundary index scenarios', () => {
    it(':index beyond images length gets clamped', () => {
      const { container } = render(
        <ImageViewer images={images} visible index={10} showIndex />,
      );
      const indexEl = container.querySelector('.t-image-viewer__nav-index') as HTMLElement;
      // Should clamp to max available index
      expect(indexEl.textContent).toMatch(/2\/2/);
    });

    it(':negative index gets clamped to 0', () => {
      const { container } = render(
        <ImageViewer images={images} visible index={-1} showIndex />,
      );
      const indexEl = container.querySelector('.t-image-viewer__nav-index') as HTMLElement;
      // Negative index may result in 0-based display
      expect(indexEl.textContent).toMatch(/[01]\/2/);
    });

    it(':defaultIndex beyond length gets clamped', () => {
      const { container } = render(
        <ImageViewer images={images} visible defaultIndex={5} showIndex />,
      );
      const indexEl = container.querySelector('.t-image-viewer__nav-index') as HTMLElement;
      expect(indexEl.textContent).toMatch(/2\/2/);
    });
  });

  describe('empty and invalid images', () => {
    it(':empty images array', () => {
      const { container } = render(<ImageViewer images={[]} visible />);
      const viewer = container.querySelector('.t-image-viewer');
      expect(viewer).not.toBeNull();
      // Should render without crashing
    });

    it(':single image navigation', () => {
      const onIndexChange = vi.fn();
      const { container } = render(
        <ImageViewer images={[images[0]]} visible onIndexChange={onIndexChange} />,
      );
      
      // Try to trigger swiper change (should not call onIndexChange for same index)
      const swiper = container.querySelector('[data-testid="mock-swiper"]');
      if (swiper) {
        act(() => {
          fireEvent.click(swiper);
        });
        act(() => {
          vi.advanceTimersByTime(20);
        });
      }
      
      // onIndexChange should not be called for single image
      expect(onIndexChange).not.toHaveBeenCalled();
    });
  });

  describe('rapid interactions', () => {
    it(':rapid close and reopen', () => {
      const onClose = vi.fn();
      const { container, rerender } = render(
        <ImageViewer images={images} visible onClose={onClose} />,
      );
      
      // Rapid close
      const overlay = container.querySelector('.t-image-viewer__mask') as HTMLElement;
      act(() => {
        fireEvent.click(overlay);
        fireEvent.click(overlay); // Double click
      });
      
      act(() => {
        vi.advanceTimersByTime(350);
      });
      
      expect(onClose).toHaveBeenCalled();
      
      // Reopen immediately
      rerender(<ImageViewer images={images} visible onClose={onClose} />);
      const newViewer = container.querySelector('.t-image-viewer');
      expect(newViewer).not.toBeNull();
    });

    it(':rapid double-click zoom', () => {
      const { container } = render(<ImageViewer images={images} visible />);
      const img = container.querySelector('.t-image-viewer__img') as HTMLElement;
      
      // Rapid double clicks
      act(() => {
        fireEvent.doubleClick(img);
        fireEvent.doubleClick(img);
        fireEvent.doubleClick(img);
      });
      
      act(() => {
        vi.advanceTimersByTime(50);
      });
      
      // Should handle rapid clicks without error
      expect(img).not.toBeNull();
    });
  });

  describe('transform boundary conditions', () => {
    it(':maxZoom=1 prevents zoom', () => {
      const { container } = render(<ImageViewer images={images} visible maxZoom={1} />);
      const img = container.querySelector('.t-image-viewer__img') as HTMLElement;
      
      act(() => {
        fireEvent.doubleClick(img);
      });
      
      act(() => {
        vi.advanceTimersByTime(20);
      });
      
      // Should not zoom beyond maxZoom=1
      const {transform} = img.style;
      expect(transform).toMatch(/matrix\(1,/); // scale should remain 1
    });

    it(':maxZoom=0.5 clamps to minimum', () => {
      const { container } = render(<ImageViewer images={images} visible maxZoom={0.5} />);
      const img = container.querySelector('.t-image-viewer__img') as HTMLElement;
      
      // Should use minimum scale of 1 even if maxZoom < 1
      const {transform} = img.style;
      expect(transform).toMatch(/matrix\(1,/);
    });
  });

  describe('event propagation', () => {
    it(':close button stops propagation', () => {
      const onClose = vi.fn();
      const onOverlayClick = vi.fn();
      const { container } = render(
        <div onClick={onOverlayClick}>
          <ImageViewer images={images} visible onClose={onClose} />
        </div>,
      );
      
      const closeBtn = container.querySelector('.t-image-viewer__nav-close') as HTMLElement;
      act(() => {
        fireEvent.click(closeBtn);
      });
      
      expect(onClose).toHaveBeenCalled();
      expect(onOverlayClick).not.toHaveBeenCalled(); // Should not bubble up
    });

    it(':delete button event handling', () => {
      const onDelete = vi.fn();
      const { container } = render(
        <ImageViewer images={images} visible onDelete={onDelete} />,
      );
      
      const deleteBtn = container.querySelector('.t-image-viewer__nav-delete') as HTMLElement;
      act(() => {
        fireEvent.click(deleteBtn);
      });
      
      expect(onDelete).toHaveBeenCalled();
    });
  });

  describe('image object format', () => {
    it(':mixed string and object images', () => {
      const mixedImages = [
        'https://example.com/1.jpg',
        { url: 'https://example.com/2.jpg', align: 'start' as const },
        { url: 'https://example.com/3.jpg', align: 'end' as const },
      ];
      
      const { container } = render(
        <ImageViewer images={mixedImages} visible showIndex />,
      );
      
      const indexEl = container.querySelector('.t-image-viewer__nav-index') as HTMLElement;
      expect(indexEl.textContent).toMatch(/1\/3/);
    });

    it(':image object with align property', () => {
      const objectImages = [
        { url: 'https://example.com/1.jpg', align: 'center' as const },
      ];
      
      const { container } = render(<ImageViewer images={objectImages} visible />);
      const viewer = container.querySelector('.t-image-viewer');
      
      // Should render viewer without error
      expect(viewer).not.toBeNull();
    });
  });

  describe('visibility state changes', () => {
    it(':controlled visible false to true transition', () => {
      const { container, rerender } = render(
        <ImageViewer images={images} visible={false} />,
      );
      
      let viewer = container.querySelector('.t-image-viewer');
      expect(viewer).toBeNull();
      
      // Change to visible
      rerender(<ImageViewer images={images} visible={true} />);
      
      act(() => {
        vi.advanceTimersByTime(50);
      });
      
      viewer = container.querySelector('.t-image-viewer');
      expect(viewer).not.toBeNull();
    });

    it(':uncontrolled defaultVisible behavior', () => {
      const { container } = render(
        <ImageViewer images={images} defaultVisible={false} />,
      );
      
      const viewer = container.querySelector('.t-image-viewer');
      expect(viewer).toBeNull(); // Should not be visible initially
    });
  });
});
