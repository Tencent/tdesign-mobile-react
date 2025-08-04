import React from 'react';
import { describe, it, expect, render, vi, fireEvent } from '@test/utils';
import { JumpIcon } from 'tdesign-icons-react';

import Link from '../Link';

const prefix = 't';
const name = `.${prefix}-link`;

describe('Link', () => {
  describe('props', () => {
    it(': content', () => {
      const { container } = render(<Link content="link" />);
      expect(container.querySelector(name).textContent).toBe('link');
    });
    it(': children', () => {
      const { container } = render(<Link>link</Link>);
      expect(container.querySelector(name).textContent).toBe('link');
    });
    it(': disabled', () => {
      const { container } = render(<Link disabled />);
      expect(container.querySelector(`${name}--disabled`)).toBeTruthy();
    });
    it(': hover', () => {
      const { container } = render(<Link hover />);
      expect(container.querySelector(`${name}--hover`)).toBeTruthy();
    });
    it(': href', () => {
      const { container } = render(<Link href="https://tdesign.tencent.com/" />);
      expect(container.firstChild).toHaveAttribute('href', 'https://tdesign.tencent.com/');
    });
    it(': prefixIcon', () => {
      const { container } = render(<Link prefixIcon={<JumpIcon />} />);
      expect(container.querySelector(`${name}__prefix-icon`)).toBeTruthy();
    });
    it(': size', () => {
      const sizes = ['small', 'medium', 'large'] as const;
      sizes.forEach((size) => {
        const { container } = render(<Link size={size} />);
        expect(container.querySelector(`${name}--${size}`)).toBeTruthy();
      });
    });
    it(': not size', () => {
      const { container } = render(<Link size={null} />);
      expect(container.querySelector(`${name}--medium`)).toBeTruthy();
    });
    it(': suffixIcon', () => {
      const { container } = render(<Link suffixIcon={<JumpIcon />} />);
      expect(container.querySelector(`${name}__suffix-icon`)).toBeTruthy();
    });
    it(': not theme', () => {
      const { container } = render(<Link theme={null} />);
      expect(container.querySelector(`${name}--default`)).toBeTruthy();
    });
    it(': theme', () => {
      const themes = ['default', 'primary', 'danger', 'warning', 'success'] as const;
      themes.forEach((theme) => {
        const { container } = render(<Link theme={theme} />);
        expect(container.querySelector(`${name}--${theme}`)).toBeTruthy();
      });
    });
    it(': underline', () => {
      const { container } = render(<Link underline />);
      expect(container.querySelector(`${name}--underline`)).toBeTruthy();
    });
  });

  describe('events', () => {
    it(': onClick', () => {
      const onClick = vi.fn();
      const { container } = render(<Link onClick={onClick} />);
      fireEvent.click(container.firstChild);
      expect(onClick).toHaveBeenCalledTimes(1);
    });

    it(': click disabled', () => {
      const onClick = vi.fn();
      const { container } = render(<Link disabled onClick={onClick} />);
      fireEvent.click(container.firstChild);
      expect(onClick).not.toHaveBeenCalled();
    });
  });
});
