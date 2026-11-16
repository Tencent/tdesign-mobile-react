import React from 'react';
import { render } from '@test/utils';
import { describe, expect, test } from 'vitest';
import Popup from '../Popup';
import type { PopupProps } from '../Popup';

describe('Popup maxWidth', () => {
  test('preserves the existing layout when omitted', () => {
    render(<Popup visible placement="bottom" style={{ width: 320 }} />);
    const popup = document.querySelector<HTMLElement>('.t-popup');
    expect(popup.classList.contains('t-popup--with-max-width')).toBe(false);
    expect(popup.style.maxWidth).toBe('');
    expect(popup.style.width).toBe('320px');
  });

  test.each(['top', 'bottom'] as const)('supports updating and removing maxWidth for %s', (placement) => {
    const { rerender } = render(<Popup visible placement={placement} maxWidth={600} />);
    const popup = document.querySelector<HTMLElement>('.t-popup');
    expect(popup.classList.contains('t-popup--with-max-width')).toBe(true);
    expect(popup.style.maxWidth).toBe('600px');
    expect(popup.hasAttribute('maxwidth')).toBe(false);

    rerender(<Popup visible placement={placement} maxWidth="70vw" />);
    expect(popup.style.maxWidth).toBe('70vw');

    rerender(<Popup visible placement={placement} maxWidth="none" />);
    expect(popup.style.maxWidth).toBe('none');

    rerender(<Popup visible placement={placement} />);
    expect(popup.classList.contains('t-popup--with-max-width')).toBe(false);
    expect(popup.style.maxWidth).toBe('');
  });

  test('accepts zero as a numeric width', () => {
    render(<Popup visible placement="bottom" maxWidth={0} />);
    const popup = document.querySelector<HTMLElement>('.t-popup');
    expect(popup.classList.contains('t-popup--with-max-width')).toBe(true);
    expect(Number.parseFloat(popup.style.maxWidth)).toBe(0);
  });

  test.each(['left', 'right', 'center'] as const)('does not change %s popups', (placement) => {
    render(<Popup visible placement={placement} maxWidth={100} />);
    const popup = document.querySelector<HTMLElement>('.t-popup');
    expect(popup.classList.contains('t-popup--with-max-width')).toBe(false);
    expect(popup.style.maxWidth).toBe('');
  });

  test('removes the limit when placement changes and restores it when changed back', () => {
    const renderPopup = (placement: PopupProps['placement']) => <Popup visible placement={placement} maxWidth={600} />;
    const { rerender } = render(renderPopup('bottom'));
    const popup = document.querySelector<HTMLElement>('.t-popup');
    rerender(renderPopup('left'));
    expect(popup.classList.contains('t-popup--with-max-width')).toBe(false);
    expect(popup.style.maxWidth).toBe('');
    rerender(renderPopup('top'));
    expect(popup.classList.contains('t-popup--with-max-width')).toBe(true);
    expect(popup.style.maxWidth).toBe('600px');
  });
});
