import React from 'react';
import { describe, it, expect, render, vi, fireEvent } from '@test/utils';

import { AppIcon } from 'tdesign-icons-react';
import Button from '../Button';

const prefix = 't';
const name = `.${prefix}-button`;
const buttonText = '按钮组件';

describe('Button', () => {
  describe('props', () => {
    it(': block', () => {
      const { container } = render(<Button block />);
      expect(container.querySelector(`${name}--block`)).toBeTruthy();
    });
    it(': children', () => {
      const { queryByText } = render(<Button>{buttonText}</Button>);
      expect(queryByText(buttonText)).toBeInTheDocument();
    });
    it(': content', () => {
      const { queryByText } = render(<Button content={buttonText} />);
      expect(queryByText(buttonText)).toBeInTheDocument();
    });
    it(': disabled', () => {
      const { container } = render(<Button disabled />);
      expect(container.querySelector(`${name}--disabled`)).toBeTruthy();
    });
    it(': ghost', () => {
      const { container } = render(<Button ghost />);
      expect(container.querySelector(`${name}--ghost`)).toBeTruthy();
    });
    it(': icon', () => {
      const { container } = render(<Button icon={<AppIcon />} />);
      expect(container.querySelector('.t-icon-app')).toBeTruthy();
    });
    it(': loading', () => {
      const { container } = render(<Button loading />);
      expect(container.querySelector(`${name}--loading`)).toBeTruthy();
    });
    it(': loadingProps', () => {
      const { container } = render(<Button loading loadingProps={{ duration: 1000 }} />);
      expect(container.querySelector('.t-loading')).toBeInTheDocument();
    });
    it(': shape', () => {
      const shapes = ['rectangle', 'square', 'round', 'circle'] as const;
      shapes.forEach((shape) => {
        const { container } = render(<Button shape={shape} />);
        expect(container.querySelector(`${name}--${shape}`)).toBeTruthy();
      });
    });
    it(': size', () => {
      const sizes = ['extra-small', 'small', 'medium', 'large'] as const;
      sizes.forEach((size) => {
        const { container } = render(<Button size={size} />);
        expect(container.querySelector(`${name}--size-${size}`)).toBeTruthy();
      });
    });
    it(': suffix', () => {
      const { container } = render(<Button suffix={<AppIcon />} />);
      expect(container.querySelector('.t-icon-app')).toBeInTheDocument();
    });
    it(': theme', () => {
      const themes = ['default', 'primary', 'danger', 'light'] as const;
      themes.forEach((theme) => {
        const { container } = render(<Button theme={theme} />);
        expect(container.querySelector(`${name}--${theme}`)).toBeTruthy();
      });
    });
    it(': variant', () => {
      const variants = ['base', 'outline', 'dashed', 'text'] as const;
      variants.forEach((variant) => {
        const { container } = render(<Button variant={variant} />);
        expect(container.querySelector(`${name}--${variant}`)).toBeTruthy();
      });
    });
  });

  describe('events', () => {
    it(': onClick', () => {
      const handleClick = vi.fn();
      const { container } = render(<Button onClick={handleClick} />);
      fireEvent.click(container.firstChild);
      expect(handleClick).toHaveBeenCalled();
    });
    it(': onClick disabled', () => {
      const handleClick = vi.fn();
      const { container } = render(<Button disabled onClick={handleClick} />);
      fireEvent.click(container.firstChild);
      expect(handleClick).not.toHaveBeenCalled();
    });
    it(': onClick loading', () => {
      const handleClick = vi.fn();
      const { container } = render(<Button loading onClick={handleClick} />);
      fireEvent.click(container.firstChild);
      expect(handleClick).not.toHaveBeenCalled();
    });
  });
});
