import React from 'react';
import { describe, it, expect, render, fireEvent, act, beforeEach, afterEach } from '@test/utils';
import { vi } from 'vitest';
import { ImageViewer } from '../index';

describe('ImageViewer util.ts branch coverage', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it(':covers window.innerHeight fallback branch (line 3)', () => {
    // Mock window.innerHeight to be 0 (falsy) to trigger the fallback
    const originalInnerHeight = window.innerHeight;
    Object.defineProperty(window, 'innerHeight', {
      configurable: true,
      value: 0, // Falsy value to trigger fallback
    });

    // Mock document.documentElement.clientHeight to ensure it's used
    Object.defineProperty(document.documentElement, 'clientHeight', {
      configurable: true,
      value: 600,
    });

    const { container } = render(<ImageViewer images={['https://example.com/1.jpg']} visible />);
    const img = container.querySelector('.t-image-viewer__img') as HTMLElement;
    
    // Trigger operations that use getClientSize
    act(() => {
      fireEvent.doubleClick(img);
    });
    
    act(() => {
      vi.advanceTimersByTime(20);
    });
    
    // Drag to trigger more getClientSize calls
    act(() => {
      fireEvent.touchStart(img, {
        touches: [{ clientX: 150, clientY: 200 }],
      });
    });
    
    act(() => {
      fireEvent.touchMove(img, {
        touches: [{ clientX: 100, clientY: 150 }],
      });
    });
    
    act(() => {
      fireEvent.touchEnd(img);
    });
    
    act(() => {
      vi.advanceTimersByTime(20);
    });
    
    expect(img).not.toBeNull();
    
    // Restore original value
    Object.defineProperty(window, 'innerHeight', {
      configurable: true,
      value: originalInnerHeight,
    });
  });

  it(':covers window.innerHeight undefined branch', () => {
    // Mock window.innerHeight to be undefined to trigger the fallback
    const originalInnerHeight = window.innerHeight;
    delete (window as any).innerHeight;

    // Mock document.documentElement.clientHeight
    Object.defineProperty(document.documentElement, 'clientHeight', {
      configurable: true,
      value: 800,
    });

    const { container } = render(<ImageViewer images={['https://example.com/1.jpg']} visible />);
    const img = container.querySelector('.t-image-viewer__img') as HTMLElement;
    
    // Trigger operations that use getClientSize
    act(() => {
      fireEvent.doubleClick(img);
    });
    
    act(() => {
      vi.advanceTimersByTime(20);
    });
    
    expect(img).not.toBeNull();
    
    // Restore original value
    Object.defineProperty(window, 'innerHeight', {
      configurable: true,
      value: originalInnerHeight,
    });
  });

  it(':covers window.innerHeight null branch', () => {
    // Mock window.innerHeight to be null to trigger the fallback
    const originalInnerHeight = window.innerHeight;
    Object.defineProperty(window, 'innerHeight', {
      configurable: true,
      value: null, // Falsy value
    });

    // Mock document.documentElement.clientHeight
    Object.defineProperty(document.documentElement, 'clientHeight', {
      configurable: true,
      value: 700,
    });

    const { container } = render(<ImageViewer images={['https://example.com/1.jpg']} visible />);
    const img = container.querySelector('.t-image-viewer__img') as HTMLElement;
    
    // Trigger operations that use getClientSize multiple times
    act(() => {
      fireEvent.doubleClick(img);
    });
    
    act(() => {
      vi.advanceTimersByTime(20);
    });
    
    // Multi-touch to trigger more getClientSize calls
    act(() => {
      fireEvent.touchStart(img, {
        touches: [
          { clientX: 100, clientY: 100 },
          { clientX: 200, clientY: 200 }
        ],
      });
    });
    
    act(() => {
      fireEvent.touchMove(img, {
        touches: [
          { clientX: 80, clientY: 80 },
          { clientX: 220, clientY: 220 }
        ],
      });
    });
    
    act(() => {
      fireEvent.touchEnd(img);
    });
    
    act(() => {
      vi.advanceTimersByTime(20);
    });
    
    expect(img).not.toBeNull();
    
    // Restore original value
    Object.defineProperty(window, 'innerHeight', {
      configurable: true,
      value: originalInnerHeight,
    });
  });
});
