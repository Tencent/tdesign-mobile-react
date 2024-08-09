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
});
