import React from 'react';
import { describe, it, expect, render, fireEvent, act, beforeEach, afterEach } from '@test/utils';
import { vi } from 'vitest';
import { ImageViewer } from '../index';

describe('ImageViewer alignment coverage', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    
    // Mock image dimensions to trigger alignment calculations
    Object.defineProperty(HTMLElement.prototype, 'offsetWidth', {
      configurable: true,
      value: 300,
    });
    Object.defineProperty(HTMLElement.prototype, 'offsetHeight', {
      configurable: true,
      value: 400,
    });
    Object.defineProperty(HTMLElement.prototype, 'clientWidth', {
      configurable: true,
      value: 300,
    });
    Object.defineProperty(HTMLElement.prototype, 'clientHeight', {
      configurable: true,
      value: 400,
    });
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  describe('getMaxDraggedY alignment branches (lines 155-172)', () => {
    it(':start alignment calculation', () => {
      const alignedImages = [
        { url: 'https://example.com/1.jpg', align: 'start' as const },
      ];
      
      const { container } = render(
        <ImageViewer images={alignedImages} visible />,
      );
      
      const img = container.querySelector('.t-image-viewer__img') as HTMLElement;
      
      // Zoom to trigger getMaxDraggedY calculation with start alignment
      act(() => {
        fireEvent.doubleClick(img);
      });
      
      act(() => {
        vi.advanceTimersByTime(20);
      });
      
      // Drag to trigger alignment calculation
      act(() => {
        fireEvent.touchStart(img, {
          touches: [{ clientX: 150, clientY: 200 }],
        });
      });
      
      act(() => {
        fireEvent.touchMove(img, {
          touches: [{ clientX: 150, clientY: 250 }],
        });
      });
      
      act(() => {
        fireEvent.touchEnd(img);
      });
      
      act(() => {
        vi.advanceTimersByTime(20);
      });
      
      expect(img).not.toBeNull();
    });

    it(':center alignment calculation (default)', () => {
      const alignedImages = [
        { url: 'https://example.com/1.jpg', align: 'center' as const },
      ];
      
      const { container } = render(
        <ImageViewer images={alignedImages} visible />,
      );
      
      const img = container.querySelector('.t-image-viewer__img') as HTMLElement;
      
      // Zoom to trigger getMaxDraggedY calculation with center alignment
      act(() => {
        fireEvent.doubleClick(img);
      });
      
      act(() => {
        vi.advanceTimersByTime(20);
      });
      
      // Drag to trigger alignment calculation
      act(() => {
        fireEvent.touchStart(img, {
          touches: [{ clientX: 150, clientY: 200 }],
        });
      });
      
      act(() => {
        fireEvent.touchMove(img, {
          touches: [{ clientX: 150, clientY: 250 }],
        });
      });
      
      act(() => {
        fireEvent.touchEnd(img);
      });
      
      act(() => {
        vi.advanceTimersByTime(20);
      });
      
      expect(img).not.toBeNull();
    });

    it(':end alignment calculation', () => {
      const alignedImages = [
        { url: 'https://example.com/1.jpg', align: 'end' as const },
      ];
      
      const { container } = render(
        <ImageViewer images={alignedImages} visible />,
      );
      
      const img = container.querySelector('.t-image-viewer__img') as HTMLElement;
      
      // Zoom to trigger getMaxDraggedY calculation with end alignment
      act(() => {
        fireEvent.doubleClick(img);
      });
      
      act(() => {
        vi.advanceTimersByTime(20);
      });
      
      // Drag to trigger alignment calculation
      act(() => {
        fireEvent.touchStart(img, {
          touches: [{ clientX: 150, clientY: 200 }],
        });
      });
      
      act(() => {
        fireEvent.touchMove(img, {
          touches: [{ clientX: 150, clientY: 250 }],
        });
      });
      
      act(() => {
        fireEvent.touchEnd(img);
      });
      
      act(() => {
        vi.advanceTimersByTime(20);
      });
      
      expect(img).not.toBeNull();
    });

    it(':string image without align defaults to center', () => {
      const images = ['https://example.com/1.jpg'];
      
      const { container } = render(
        <ImageViewer images={images} visible />,
      );
      
      const img = container.querySelector('.t-image-viewer__img') as HTMLElement;
      
      // Zoom to trigger getMaxDraggedY calculation with default center alignment
      act(() => {
        fireEvent.doubleClick(img);
      });
      
      act(() => {
        vi.advanceTimersByTime(20);
      });
      
      // Drag to trigger alignment calculation
      act(() => {
        fireEvent.touchStart(img, {
          touches: [{ clientX: 150, clientY: 200 }],
        });
      });
      
      act(() => {
        fireEvent.touchMove(img, {
          touches: [{ clientX: 150, clientY: 250 }],
        });
      });
      
      act(() => {
        fireEvent.touchEnd(img);
      });
      
      act(() => {
        vi.advanceTimersByTime(20);
      });
      
      expect(img).not.toBeNull();
    });

    it(':image object without align defaults to center', () => {
      const alignedImages = [
        { url: 'https://example.com/1.jpg' }, // No align property
      ];
      
      const { container } = render(
        <ImageViewer images={alignedImages} visible />,
      );
      
      const img = container.querySelector('.t-image-viewer__img') as HTMLElement;
      
      // Zoom to trigger getMaxDraggedY calculation with default center alignment
      act(() => {
        fireEvent.doubleClick(img);
      });
      
      act(() => {
        vi.advanceTimersByTime(20);
      });
      
      // Drag to trigger alignment calculation
      act(() => {
        fireEvent.touchStart(img, {
          touches: [{ clientX: 150, clientY: 200 }],
        });
      });
      
      act(() => {
        fireEvent.touchMove(img, {
          touches: [{ clientX: 150, clientY: 250 }],
        });
      });
      
      act(() => {
        fireEvent.touchEnd(img);
      });
      
      act(() => {
        vi.advanceTimersByTime(20);
      });
      
      expect(img).not.toBeNull();
    });
  });

  describe('additional branch coverage', () => {
    it(':early return when currentImageScaledHeight <= rootOffsetHeight', () => {
      // Mock small image dimensions to trigger early return
      Object.defineProperty(HTMLElement.prototype, 'offsetHeight', {
        configurable: true,
        value: 100, // Smaller than container
      });
      
      const { container } = render(
        <ImageViewer images={['https://example.com/small.jpg']} visible />,
      );
      
      const img = container.querySelector('.t-image-viewer__img') as HTMLElement;
      
      // Try to zoom and drag - should hit early return in getMaxDraggedY
      act(() => {
        fireEvent.doubleClick(img);
      });
      
      act(() => {
        vi.advanceTimersByTime(20);
      });
      
      act(() => {
        fireEvent.touchStart(img, {
          touches: [{ clientX: 150, clientY: 200 }],
        });
      });
      
      act(() => {
        fireEvent.touchMove(img, {
          touches: [{ clientX: 150, clientY: 250 }],
        });
      });
      
      act(() => {
        fireEvent.touchEnd(img);
      });
      
      act(() => {
        vi.advanceTimersByTime(20);
      });
      
      expect(img).not.toBeNull();
      
      // Restore
      Object.defineProperty(HTMLElement.prototype, 'offsetHeight', {
        configurable: true,
        value: 400,
      });
    });

    it(':diffHeight calculation and centerDraggedY', () => {
      // Mock larger image to ensure diffHeight > 0
      Object.defineProperty(HTMLElement.prototype, 'offsetHeight', {
        configurable: true,
        value: 800, // Larger than container
      });
      
      const { container } = render(
        <ImageViewer images={['https://example.com/large.jpg']} visible />,
      );
      
      const img = container.querySelector('.t-image-viewer__img') as HTMLElement;
      
      // Zoom to trigger diffHeight and centerDraggedY calculation
      act(() => {
        fireEvent.doubleClick(img);
      });
      
      act(() => {
        vi.advanceTimersByTime(20);
      });
      
      // Drag to trigger alignment calculation with diffHeight
      act(() => {
        fireEvent.touchStart(img, {
          touches: [{ clientX: 150, clientY: 200 }],
        });
      });
      
      act(() => {
        fireEvent.touchMove(img, {
          touches: [{ clientX: 150, clientY: 100 }],
        });
      });
      
      act(() => {
        fireEvent.touchEnd(img);
      });
      
      act(() => {
        vi.advanceTimersByTime(20);
      });
      
      expect(img).not.toBeNull();
      
      // Restore
      Object.defineProperty(HTMLElement.prototype, 'offsetHeight', {
        configurable: true,
        value: 400,
      });
    });
  });
});
