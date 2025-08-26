import { describe, it, expect, vi, render, fireEvent, screen } from '@test/utils';
import React from 'react';
import Cell from '../Cell';

describe('Cell', () => {
  it('renders the correct content', () => {
    const { getByText } = render(
      <Cell title="Test Title" description="Test Description">
        Test Children
      </Cell>,
    );

    expect(getByText('Test Title')).toBeInTheDocument();
    expect(getByText('Test Description')).toBeInTheDocument();
    expect(getByText('Test Children')).toBeInTheDocument();
  });

  it('renders left icon and image if provided', () => {
    const { getByTestId } = render(
      <Cell
        leftIcon={<div data-testid="left-icon">Left Icon</div>}
        image="https://tdesign.gtimg.com/mobile/demos/avatar1.png"
      >
        Test Children
      </Cell>,
    );

    expect(getByTestId('left-icon')).toBeInTheDocument();
    expect(screen.getByText('Test Children')).toBeInTheDocument();
  });

  it('renders right icon if provided', () => {
    const { getByTestId } = render(<Cell rightIcon={<div data-testid="right-icon">Right Icon</div>} />);

    expect(getByTestId('right-icon')).toBeInTheDocument();
  });

  it('calls onClick when the cell is clicked', () => {
    const handleClick = vi.fn();
    const { container } = render(<Cell onClick={handleClick} />);

    fireEvent.click(container.firstChild);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('renders required asterisk when required is true', () => {
    const { container } = render(<Cell title="Required Field" required />);

    const requiredElement = container.querySelector('.t-cell--required');
    expect(requiredElement).toBeInTheDocument();
    expect(requiredElement).toHaveTextContent('*');
  });

  it('does not render required asterisk when required is false', () => {
    const { container } = render(<Cell title="Optional Field" required={false} />);

    const requiredElement = container.querySelector('.t-cell--required');
    expect(requiredElement).not.toBeInTheDocument();
  });

  it('renders arrow icon when arrow is true', () => {
    const { container } = render(<Cell arrow />);

    const rightIcon = container.querySelector('.t-cell__right-icon');
    expect(rightIcon).toBeInTheDocument();
    // 检查是否包含箭头图标
    expect(rightIcon.querySelector('svg')).toBeInTheDocument();
  });

  it('does not render arrow icon when arrow is false', () => {
    const { container } = render(<Cell arrow={false} />);

    const rightIcon = container.querySelector('.t-cell__right-icon');
    expect(rightIcon).not.toBeInTheDocument();
  });

  it('renders arrow icon instead of rightIcon when both arrow and rightIcon are provided', () => {
    const { container } = render(<Cell arrow rightIcon={<div data-testid="custom-right-icon">Custom Icon</div>} />);

    const rightIcon = container.querySelector('.t-cell__right-icon');
    expect(rightIcon).toBeInTheDocument();
    // 应该显示箭头图标而不是自定义图标
    expect(rightIcon.querySelector('svg')).toBeInTheDocument();
    expect(container.querySelector('[data-testid="custom-right-icon"]')).not.toBeInTheDocument();
  });

  it('renders note content when note is provided', () => {
    const { container, getByText } = render(<Cell note="Test Note" />);

    const noteElement = container.querySelector('.t-cell__note');
    expect(noteElement).toBeInTheDocument();
    expect(getByText('Test Note')).toBeInTheDocument();
  });

  it('renders children when note is not provided', () => {
    const { getByText } = render(<Cell>Test Children Content</Cell>);

    expect(getByText('Test Children Content')).toBeInTheDocument();
  });

  it('renders note instead of children when both note and children are provided', () => {
    const { container, getByText, queryByText } = render(<Cell note="Test Note">Test Children Content</Cell>);

    const noteElement = container.querySelector('.t-cell__note');
    expect(noteElement).toBeInTheDocument();
    expect(getByText('Test Note')).toBeInTheDocument();
    expect(queryByText('Test Children Content')).not.toBeInTheDocument();
  });
});
