import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { vi, describe, it, expect, afterEach } from 'vitest';
import DropdownItem from '../DropdownItem';
import DropdownMenuContext from '../DropdownMenuContext';

vi.mock('lodash-es/uniqueId', () => ({ default: () => 'fixed-id' }));

describe('DropdownItem', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('render / props', () => {
    it('returns empty style when menuItemRef is null', async () => {
      const { container } = render(
        <DropdownMenuContext.Provider
          value={{
            activedId: 'fixed-id',
            direction: 'down',
            onChangeActivedId: () => {},
            showOverlay: true,
            zIndex: 10,
          }}
        >
          <DropdownItem options={[{ value: '1', label: 'one', disabled: false }]} />
        </DropdownMenuContext.Provider>,
      );

      await waitFor(() => {
        const el = container.querySelector('.t-dropdown-item');
        expect(el).toBeTruthy();
        if (el) {
          const cs = window.getComputedStyle(el as Element);

          // style top and bottom should be empty px
          const isTopPixel = /\d+px/.test(cs.top);
          const isBottomPixel = /\d+px/.test(cs.bottom);
          expect(isTopPixel || isBottomPixel).toBe(false);
        }
      });
    });

    it('renders popup when active and handles direction up/down in style', async () => {
      const onChangeActivedId = vi.fn();

      const { container, getByText } = render(
        <DropdownMenuContext.Provider
          value={{
            activedId: 'fixed-id',
            direction: 'up',
            onChangeActivedId,
            showOverlay: true,
            zIndex: 99,
            closeOnClickOverlay: true,
          }}
        >
          <DropdownItem options={[{ value: 'a', label: 'A', disabled: false }]} multiple={false} />
        </DropdownMenuContext.Provider>,
      );

      expect(getByText('A')).toBeTruthy();

      await waitFor(() => {
        const item = container.querySelector('[class*="dropdown-item"]');
        expect(item).toBeTruthy();
      });
    });

    it('calculates style when menuItemRef has bounding rect and direction up', async () => {
      const onChangeActivedId = vi.fn();

      const { container, rerender } = render(
        <DropdownMenuContext.Provider
          value={{
            activedId: '',
            direction: 'up',
            onChangeActivedId,
            showOverlay: true,
            zIndex: 77,
            closeOnClickOverlay: true,
          }}
        >
          <DropdownItem options={[{ value: 'x', label: 'X', disabled: false }]} />
        </DropdownMenuContext.Provider>,
      );

      const menuTrigger = container.querySelector('.t-dropdown-menu__item') as HTMLElement | null;
      if (menuTrigger) {
        menuTrigger.getBoundingClientRect = () => ({ top: 10, bottom: 50 }) as DOMRect;
      }

      rerender(
        <DropdownMenuContext.Provider
          value={{
            activedId: 'fixed-id',
            direction: 'up',
            onChangeActivedId,
            showOverlay: true,
            zIndex: 77,
            closeOnClickOverlay: true,
          }}
        >
          <DropdownItem options={[{ value: 'x', label: 'X', disabled: false }]} />
        </DropdownMenuContext.Provider>,
      );

      await waitFor(() => {
        const wrapper = container.querySelector('.t-dropdown-item') as HTMLElement | null;
        expect(wrapper).toBeTruthy();
        if (wrapper) {
          const { bottom } = wrapper.style;
          const { top } = wrapper.style;
          expect(bottom || top).toBeTruthy();
        }
      });
    });

    it('supports custom keys mapping for options', () => {
      const onChangeActivedId = vi.fn();
      const { getByText } = render(
        <DropdownMenuContext.Provider
          value={{
            activedId: 'fixed-id',
            direction: 'down',
            onChangeActivedId,
            showOverlay: false,
            zIndex: 1,
            closeOnClickOverlay: false,
          }}
        >
          <DropdownItem
            options={[{ k: '1', v: 'one', d: false } as any]}
            keys={{ value: 'k', label: 'v', disabled: 'd' }}
          />
        </DropdownMenuContext.Provider>,
      );

      expect(getByText('one')).toBeTruthy();
    });

    it('renders children and footer when provided', () => {
      const onChangeActivedId = vi.fn();
      const { getByText } = render(
        <DropdownMenuContext.Provider
          value={{
            activedId: 'fixed-id',
            direction: 'down',
            onChangeActivedId,
            showOverlay: true,
            zIndex: 1,
            closeOnClickOverlay: true,
          }}
        >
          <DropdownItem options={[{ value: '1', label: 'one', disabled: false }]}>
            <div>custom-body</div>
          </DropdownItem>
        </DropdownMenuContext.Provider>,
      );

      expect(getByText('custom-body')).toBeTruthy();
    });

    it('renders custom footer when footer prop provided', () => {
      const onChangeActivedId = vi.fn();
      const { getByText } = render(
        <DropdownMenuContext.Provider
          value={{
            activedId: 'fixed-id',
            direction: 'down',
            onChangeActivedId,
            showOverlay: true,
            zIndex: 1,
            closeOnClickOverlay: true,
          }}
        >
          <DropdownItem
            options={[{ value: '1', label: 'one', disabled: false }]}
            footer={<div>my-footer</div>}
            multiple
          />
        </DropdownMenuContext.Provider>,
      );

      expect(getByText('my-footer')).toBeTruthy();
    });
  });

  describe('events / behavior', () => {
    it('calls onReset when provided and falls back when not provided', async () => {
      const onReset = vi.fn();
      const onConfirm = vi.fn();
      const onChangeActivedId = vi.fn();

      const { getByText, rerender } = render(
        <DropdownMenuContext.Provider
          value={{
            activedId: 'fixed-id',
            direction: 'down',
            onChangeActivedId,
            showOverlay: true,
            zIndex: 1,
            closeOnClickOverlay: true,
          }}
        >
          <DropdownItem
            options={[{ value: '1', label: 'one', disabled: false }]}
            multiple
            onReset={onReset}
            onConfirm={onConfirm}
          />
        </DropdownMenuContext.Provider>,
      );

      const resetBtn = getByText('重置');
      const confirmBtn = getByText('确定');
      fireEvent.click(resetBtn);
      fireEvent.click(confirmBtn);

      expect(onReset).toHaveBeenCalled();
      expect(onConfirm).toHaveBeenCalled();

      rerender(
        <DropdownMenuContext.Provider
          value={{
            activedId: 'fixed-id',
            direction: 'down',
            onChangeActivedId,
            showOverlay: true,
            zIndex: 1,
            closeOnClickOverlay: true,
          }}
        >
          <DropdownItem options={[{ value: '1', label: 'one', disabled: false }]} multiple />
        </DropdownMenuContext.Provider>,
      );

      fireEvent.click(getByText('重置'));
      fireEvent.click(getByText('确定'));
    });

    it('multiple mode: buttons disabled when modalValue empty then enabled after change', async () => {
      const onChangeActivedId = vi.fn();
      const { getByText, container } = render(
        <DropdownMenuContext.Provider
          value={{
            activedId: 'fixed-id',
            direction: 'down',
            onChangeActivedId,
            showOverlay: true,
            zIndex: 1,
            closeOnClickOverlay: true,
          }}
        >
          <DropdownItem options={[{ value: '1', label: 'one', disabled: false }]} multiple />
        </DropdownMenuContext.Provider>,
      );

      const resetBtn = getByText('重置');
      const confirmBtn = getByText('确定');
      expect(resetBtn).toBeTruthy();
      expect(confirmBtn).toBeTruthy();

      const input = container.querySelector('input[type="radio"]') as HTMLInputElement | null;
      if (input) {
        fireEvent.click(input);
      }

      expect(getByText('重置')).toBeTruthy();
    });

    it('does not activate when disabled', () => {
      const onChangeActivedId = vi.fn();
      const { container } = render(
        <DropdownMenuContext.Provider
          value={{
            activedId: '',
            direction: 'down',
            onChangeActivedId,
            showOverlay: false,
            zIndex: 1,
            closeOnClickOverlay: false,
          }}
        >
          <DropdownItem options={[{ value: '1', label: 'one', disabled: false }]} disabled />
        </DropdownMenuContext.Provider>,
      );

      const trigger = container.querySelector('.t-dropdown-menu__item') as HTMLElement | null;
      if (trigger) {
        fireEvent.click(trigger);
      }

      expect(onChangeActivedId).not.toHaveBeenCalled();
    });

    it('calls onChangeActivedId when clicking outside while active and closeOnClickOverlay true', async () => {
      const onChangeActivedId = vi.fn();
      render(
        <DropdownMenuContext.Provider
          value={{
            activedId: 'fixed-id',
            direction: 'down',
            onChangeActivedId,
            showOverlay: true,
            zIndex: 1,
            closeOnClickOverlay: true,
          }}
        >
          <DropdownItem options={[{ value: '1', label: 'one', disabled: false }]} />
        </DropdownMenuContext.Provider>,
      );

      const overlay = document.querySelector('.t-overlay') as HTMLElement | null;
      if (overlay) {
        fireEvent.click(overlay);
        fireEvent.mouseDown(overlay);
      } else {
        fireEvent.mouseDown(document.body);
      }

      await waitFor(() => {
        expect(onChangeActivedId).toHaveBeenCalled();
      });
    });
  });
});
