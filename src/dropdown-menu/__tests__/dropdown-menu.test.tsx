import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, fireEvent, act } from '@testing-library/react';
import { DropdownMenu, DropdownItem } from '../index';

const productOptions = [
  { value: 'all', label: '全部产品', disabled: false },
  { value: 'new', label: '最新产品', disabled: false },
  { value: 'hot', label: '最火产品', disabled: false },
  { value: 'disabled', label: '禁用选项', disabled: true },
];

describe('DropdownMenu API', () => {
  it('should render with direction="up"', () => {
    const { container, getByText } = render(
      <DropdownMenu direction="up" zIndex={9999}>
        <DropdownItem label="产品" options={productOptions} />
      </DropdownMenu>,
    );

    expect(container.querySelector('.t-dropdown-menu')).toBeTruthy();

    fireEvent.click(getByText('产品'));
    const dropdownItem = container.querySelector('.t-dropdown-item') as HTMLElement;
    expect(dropdownItem).toBeTruthy();
    if (dropdownItem) {
      expect(dropdownItem.style.zIndex).toBe('9999');
    }
  });

  it('should close on overlay click', () => {
    const { getByText } = render(
      <DropdownMenu closeOnClickOverlay>
        <DropdownItem label="产品" options={productOptions} />
      </DropdownMenu>,
    );
    fireEvent.click(getByText('产品'));
    act(() => {
      document.body.click();
    });
    expect(getByText('产品')).toBeTruthy();
  });

  it('should support single select', () => {
    let value = 'all';
    const handleChange = vi.fn((v) => {
      value = v;
    });
    const { getByText } = render(
      <DropdownMenu>
        <DropdownItem label="产品" options={productOptions} value={value} onChange={handleChange} />
      </DropdownMenu>,
    );
    const title = getByText('产品');
    const item = title.parentElement as HTMLElement;

    fireEvent.click(title);
    fireEvent.click(getByText('最新产品'));
    expect(handleChange).toHaveBeenCalledWith('new');
    expect(item.classList.contains('t-dropdown-menu__item--active')).toBe(false);
  });

  it('should support multiple select and confirm/reset', () => {
    let value = ['all'];
    const handleChange = vi.fn((v) => {
      value = v;
    });
    const handleConfirm = vi.fn();
    const handleReset = vi.fn();
    const { getByText } = render(
      <DropdownMenu>
        <DropdownItem
          label="多选"
          multiple
          options={productOptions}
          value={value}
          onChange={handleChange}
          onConfirm={handleConfirm}
          onReset={handleReset}
        />
      </DropdownMenu>,
    );
    fireEvent.click(getByText('多选'));
    fireEvent.click(getByText('最新产品'));
    fireEvent.click(getByText('确定'));
    expect(handleConfirm).toHaveBeenCalled();

    // 确认会关闭面板，重新打开后再点击重置
    fireEvent.click(getByText('多选'));
    fireEvent.click(getByText('重置'));
    expect(handleReset).toHaveBeenCalled();
  });

  it('should support optionsColumns', () => {
    const { getByText } = render(
      <DropdownMenu>
        <DropdownItem label="双列" multiple optionsColumns={2} options={productOptions} />
      </DropdownMenu>,
    );
    fireEvent.click(getByText('双列'));
    expect(getByText('全部产品')).toBeTruthy();
  });

  it('should support custom footer', () => {
    const { getByText } = render(
      <DropdownMenu>
        <DropdownItem label="自定义" options={productOptions} footer={<div>自定义footer</div>} />
      </DropdownMenu>,
    );
    fireEvent.click(getByText('自定义'));
    expect(getByText('自定义footer')).toBeTruthy();
  });

  it('should toggle active class on click', () => {
    const { getByText } = render(
      <DropdownMenu>
        <DropdownItem label="切换" options={productOptions} />
      </DropdownMenu>,
    );
    const title = getByText('切换');
    const item = title.parentElement as HTMLElement;

    // open
    fireEvent.click(title);
    expect(item.classList.contains('t-dropdown-menu__item--active')).toBe(true);

    // close
    fireEvent.click(title);
    expect(item.classList.contains('t-dropdown-menu__item--active')).toBe(false);
  });

  it("clicking a disabled item shouldn't open", () => {
    const { getByText } = render(
      <DropdownMenu>
        <DropdownItem label="禁用打开" disabled options={productOptions} />
      </DropdownMenu>,
    );
    const title = getByText('禁用打开');
    const item = title.parentElement as HTMLElement;

    fireEvent.click(title);
    expect(item.classList.contains('t-dropdown-menu__item--disabled')).toBe(true);
    expect(item.classList.contains('t-dropdown-menu__item--active')).toBe(false);
  });

  it('should accept className and style on DropdownMenu', () => {
    const { container } = render(
      <DropdownMenu className="my-menu" style={{ color: 'rgb(255, 0, 0)' }}>
        <DropdownItem label="样式测试" options={productOptions} />
      </DropdownMenu>,
    );
    const root = container.querySelector('.my-menu') as HTMLElement;
    expect(Boolean(root)).toBe(true);
    expect(root.style.color === 'rgb(255, 0, 0)').toBe(true);
  });

  it('clicking a disabled option should not trigger onChange', () => {
    const handleChange = vi.fn();
    const { getByText } = render(
      <DropdownMenu>
        <DropdownItem label="含禁用项" options={productOptions} onChange={handleChange} />
      </DropdownMenu>,
    );
    fireEvent.click(getByText('含禁用项'));
    fireEvent.click(getByText('禁用选项'));
    expect(handleChange).not.toHaveBeenCalled();
  });

  it('should support defaultValue (uncontrolled) showing initial label', () => {
    const { getByText } = render(
      <DropdownMenu>
        <DropdownItem options={productOptions} defaultValue="new" />
      </DropdownMenu>,
    );
    expect(getByText('最新产品')).toBeTruthy();
  });

  it('should support keys prop for custom option fields', () => {
    const customOptions = [
      { k: 'a', l: 'A 选项', d: false },
      { k: 'b', l: 'B 选项', d: false },
    ];
    const { getByText } = render(
      <DropdownMenu>
        <DropdownItem
          options={customOptions as any}
          keys={{ value: 'k', label: 'l', disabled: 'd' }}
          defaultValue="b"
        />
      </DropdownMenu>,
    );
    expect(getByText('B 选项')).toBeTruthy();
  });
});
