import React from 'react';
import { describe, expect, vi, it, cleanup } from '@test/utils';
import { render, fireEvent, screen } from '@testing-library/react';

import Search from '../index';

const getSearch = () => screen.getByRole('searchbox');
const getActionBtn = () => screen.queryByText('搜索');
const prefix = 't';
const name = `.${prefix}-search`;

describe('Search', () => {
  describe('props', () => {
    it(': leftIcon', () => {
      const CustomSuffix = () => <span data-testid="custom-suffix">✓</span>;
      render(<Search leftIcon={<CustomSuffix />} />);
      expect(screen.getByTestId('custom-suffix')).toBeInTheDocument();
      const { container } = render(<Search leftIcon="search" />);
      expect(container.querySelector('.t-search__input-box .t-icon')).toBeTruthy();
    });
    it(': clearable', () => {
      const { container } = render(<Search clearable value="test" />);
      expect(container.querySelector(`${name}__clear`)).toBeTruthy();
    });

    it(': action', () => {
      const { rerender } = render(<Search action="搜索" />);
      rerender(<Search action="搜索" value="test" />);
      expect(screen.getByText('搜索').parentElement).toBeInTheDocument();
      rerender(<Search action="搜索" value="" />);
      expect(getActionBtn()).not.toBeInTheDocument();
      rerender(<Search value="test" />);
      expect(getActionBtn()).not.toBeInTheDocument();
    });
    it(': center', () => {
      const { container } = render(<Search center />);
      expect(container.querySelector(`${name}--center`)).toBeTruthy();
    });
    it(': disabled', () => {
      render(<Search disabled />);
      expect(getSearch()).toBeDisabled();
      expect(getActionBtn()).not.toBeInTheDocument();
      cleanup();

      render(<Search disabled value="test" clearable />);
      expect(getSearch()).toBeDisabled();
    });
    it(':focus', () => {
      render(<Search focus />);
      expect(getSearch()).toHaveFocus();

      cleanup();
      render(<Search focus={false} />);
      expect(getSearch()).not.toHaveFocus();
    });
    it(': placeholder', () => {
      const customPlaceholder = '自定义占位符';
      render(<Search placeholder={customPlaceholder} />);
      expect(getSearch()).toHaveAttribute('placeholder', customPlaceholder);
    });
    it(': readonly', () => {
      const { container } = render(<Search readonly />);
      expect(container.querySelector(`${name}__input-box`)).toBeTruthy();
    });
    it(': shape', () => {
      const shapes = ['square', 'round'] as const;
      shapes.forEach((shape) => {
        const { container } = render(<Search shape={shape} />);
        expect(container.querySelector(`${name}__input-box--${shape}`)).toBeTruthy();
      });
    });
    it(': value', () => {
      render(<Search value="search" />);
      expect(getSearch()).toHaveValue('search');
    });
    it(': defaultValue', () => {
      const { container } = render(<Search defaultValue="new" />);
      expect(container.querySelector('.t-search')).not.toBe(null);
    });
  });

  describe('event', () => {
    it(': onActionClick', () => {
      const handleActionClick = vi.fn();
      render(<Search action="搜索" value="test" onActionClick={handleActionClick} />);
      fireEvent.click(screen.getByText('搜索'));
      expect(handleActionClick).toHaveBeenCalledTimes(1);
    });

    it(': onBlur', () => {
      const handleBlur = vi.fn();
      render(<Search onBlur={handleBlur} />);
      fireEvent.blur(getSearch());
      expect(handleBlur).toHaveBeenCalled();
    });

    it(':onClear', () => {
      const handleClear = vi.fn();
      const { container } = render(<Search clearable value="test" onClear={handleClear} />);
      fireEvent.click(container.querySelector(`${name}__clear`) as HTMLElement);
      expect(handleClear).toHaveBeenCalled();
    });

    it(':onFocus', () => {
      const handleFocus = vi.fn();
      render(<Search onFocus={handleFocus} />);
      fireEvent.focus(getSearch());
      expect(handleFocus).toHaveBeenCalled();
    });
    it(': onChange', () => {
      const handleChange = vi.fn();
      render(<Search value="10" onChange={handleChange} />);
      const search = getSearch();
      fireEvent.input(search, { target: { value: '20' } });
      expect(handleChange).toHaveBeenCalledTimes(1);
    });

    it(': onSubmit', () => {
      const handleSubmit = vi.fn();
      render(<Search onSubmit={handleSubmit} />);
      const input = getSearch();
      const testValue = '提交内容';
      fireEvent.input(input, { target: { value: testValue } });
      fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });
      expect(handleSubmit).toHaveBeenCalledTimes(1);
      expect(handleSubmit).toHaveBeenCalledWith({
        value: testValue,
        e: expect.anything(),
      });
    });
  });
});
