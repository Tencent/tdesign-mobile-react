import { render, fireEvent } from '@test/utils';
import { describe, test, expect, vi } from 'vitest';
import React from 'react';
import Popup from '../Popup';

describe('Popup', () => {
  test('render popup when visible is true', () => {
    render(
      <Popup visible={true} placement="bottom" duration={0}>
        内容
      </Popup>,
    );
    const el = document.querySelector('.t-popup');
    expect(el).toBeTruthy();
    expect(el!.textContent).toContain('内容');
    expect(el!.classList.contains('t-popup--bottom')).toBe(true);
  });

  test('defaultVisible works', () => {
    render(
      <Popup defaultVisible={true} duration={0}>
        默认显示
      </Popup>,
    );
    expect(document.querySelector('.t-popup')).toBeTruthy();
  });

  test('placement works', () => {
    render(
      <Popup visible={true} placement="top" duration={0}>
        位置
      </Popup>,
    );
    expect(document.querySelector('.t-popup--top')).toBeTruthy();
  });

  test('zIndex works', () => {
    render(
      <Popup visible={true} zIndex={9999} duration={0}>
        z
      </Popup>,
    );
    const popup = document.querySelector('.t-popup') as HTMLElement | null;
    expect(popup).toBeTruthy();
    expect((popup as HTMLElement).style.zIndex).toBe('9999');
  });

  test('showOverlay works', () => {
    render(<Popup visible={true} showOverlay={true} duration={0} />);
    expect(document.querySelector('.t-overlay')).toBeTruthy();
  });

  test('closeOnOverlayClick works (uncontrolled)', () => {
    vi.useFakeTimers();
    const onClose = vi.fn();
    const onVisibleChange = vi.fn();
    render(
      <Popup
        defaultVisible={true}
        showOverlay
        closeOnOverlayClick
        onClose={onClose}
        onVisibleChange={onVisibleChange}
        duration={0}
      >
        内容
      </Popup>,
    );
    const overlay = document.querySelector('.t-overlay') as HTMLElement | null;
    expect(overlay).toBeTruthy();
    fireEvent.click(overlay!);
    vi.advanceTimersByTime(0);
    expect(onClose).toHaveBeenCalledTimes(1);
    expect(onVisibleChange).toHaveBeenCalledWith(false, 'overlay');
    const popup = document.querySelector('.t-popup') as HTMLElement | null;
    expect(popup).toBeTruthy();
    expect(popup.classList.contains('slide-top-leave-active')).toBe(true);
    vi.useRealTimers();
  });

  test('closeBtn works (uncontrolled)', () => {
    vi.useFakeTimers();
    const onClose = vi.fn();
    const onVisibleChange = vi.fn();
    render(
      <Popup defaultVisible={true} closeBtn onClose={onClose} onVisibleChange={onVisibleChange} duration={0}>
        内容
      </Popup>,
    );
    const closeBtn = document.querySelector('.t-popup__close') as HTMLElement | null;
    expect(closeBtn).toBeTruthy();
    fireEvent.click(closeBtn!);
    vi.advanceTimersByTime(0);
    expect(onClose).toHaveBeenCalledTimes(1);
    expect(onVisibleChange).toHaveBeenCalledWith(false, 'close-btn');
    const popup = document.querySelector('.t-popup') as HTMLElement | null;
    expect(popup).toBeTruthy();
    expect(popup.classList.contains('slide-top-leave-active')).toBe(true);
    vi.useRealTimers();
  });

  test('custom closeBtn works', () => {
    render(
      <Popup visible={true} closeBtn={<span className="custom-close">X</span>} duration={0}>
        内容
      </Popup>,
    );
    expect(document.querySelector('.custom-close')).toBeTruthy();
  });

  test('controlled: open/close triggers lifecycle callbacks (but not onVisibleChange)', async () => {
    vi.useFakeTimers();
    const onOpen = vi.fn();
    const onOpened = vi.fn();
    const onClose = vi.fn();
    const onClosed = vi.fn();
    const onVisibleChange = vi.fn();
    const { rerender } = render(
      <Popup
        visible={false}
        onOpen={onOpen}
        onOpened={onOpened}
        onClose={onClose}
        onClosed={onClosed}
        onVisibleChange={onVisibleChange}
        duration={0}
      >
        内容
      </Popup>,
    );
    rerender(
      <Popup
        visible={true}
        onOpen={onOpen}
        onOpened={onOpened}
        onClose={onClose}
        onClosed={onClosed}
        onVisibleChange={onVisibleChange}
        duration={0}
      >
        内容
      </Popup>,
    );
    expect(onOpen).toHaveBeenCalledTimes(1);
    await vi.runAllTimersAsync();
    expect(onOpened).toHaveBeenCalledTimes(1);
    rerender(
      <Popup
        visible={false}
        onOpen={onOpen}
        onOpened={onOpened}
        onClose={onClose}
        onClosed={onClosed}
        onVisibleChange={onVisibleChange}
        duration={0}
      >
        内容
      </Popup>,
    );
    await vi.runAllTimersAsync();
    expect(onClosed).toHaveBeenCalledTimes(1);
    expect(onVisibleChange).not.toHaveBeenCalled();
    vi.useRealTimers();
  });

  test('attach works', () => {
    const { container } = render(
      <div>
        <Popup visible={true} attach={() => document.querySelector('#popup-attach')} duration={0}>
          内容
        </Popup>
        <div id="popup-attach"></div>
      </div>,
    );
    const mountedInAttach = container.querySelector('#popup-attach .t-popup');
    expect(mountedInAttach).toBeTruthy();
  });

  test('overlay click does nothing when closeOnOverlayClick=false', () => {
    vi.useFakeTimers();
    const onClose = vi.fn();
    const onVisibleChange = vi.fn();
    render(
      <Popup
        defaultVisible={true}
        showOverlay
        closeOnOverlayClick={false}
        onClose={onClose}
        onVisibleChange={onVisibleChange}
        duration={0}
      >
        内容
      </Popup>,
    );
    const overlay = document.querySelector('.t-overlay') as HTMLElement;
    fireEvent.click(overlay);
    vi.advanceTimersByTime(0);
    expect(onClose).not.toHaveBeenCalled();
    expect(onVisibleChange).not.toHaveBeenCalled();
    const popup = document.querySelector('.t-popup') as HTMLElement;
    expect(popup).toBeTruthy();
    expect(popup.className).not.toContain('leave-active');
    vi.useRealTimers();
  });

  test('placement=center uses fade-zoom classes', () => {
    render(
      <Popup visible={true} placement="center" duration={0}>
        内容
      </Popup>,
    );
    const el = document.querySelector('.t-popup') as HTMLElement;
    expect(el).toBeTruthy();
    expect(el.classList.contains('t-popup--center')).toBe(true);
  });
});
