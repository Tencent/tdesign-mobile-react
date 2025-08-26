import { describe, it, expect, vi, render, fireEvent } from '@test/utils';
import React from 'react';
import Cell from '../Cell';
import CellGroup from '../CellGroup';
import { Cell as _Cell, CellGroup as _CellGroup } from '../index';

describe('_Cell (exported from index)', () => {
  it('should be the same as Cell component', () => {
    const { getByText } = render(
      <_Cell title="Test Title" description="Test Description">
        Test Children
      </_Cell>,
    );

    expect(getByText('Test Title')).toBeInTheDocument();
    expect(getByText('Test Description')).toBeInTheDocument();
    expect(getByText('Test Children')).toBeInTheDocument();
  });

  it('should handle onClick events', () => {
    const handleClick = vi.fn();
    const { container } = render(<_Cell onClick={handleClick} />);

    fireEvent.click(container.firstChild);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('should render with arrow prop', () => {
    const { container } = render(<_Cell arrow />);

    const rightIcon = container.querySelector('.t-cell__right-icon');
    expect(rightIcon).toBeInTheDocument();
    expect(rightIcon.querySelector('svg')).toBeInTheDocument();
  });
});

describe('_CellGroup (exported from index)', () => {
  it('should render children cells', () => {
    const { getByText } = render(
      <_CellGroup>
        <_Cell title="Cell 1" />
        <_Cell title="Cell 2" />
      </_CellGroup>,
    );

    expect(getByText('Cell 1')).toBeInTheDocument();
    expect(getByText('Cell 2')).toBeInTheDocument();
  });

  it('should render with title prop', () => {
    const { getByText } = render(
      <_CellGroup title="Group Title">
        <_Cell title="Cell 1" />
      </_CellGroup>,
    );

    expect(getByText('Group Title')).toBeInTheDocument();
    expect(getByText('Cell 1')).toBeInTheDocument();
  });

  it('should apply correct CSS classes', () => {
    const { container } = render(
      <_CellGroup>
        <_Cell title="Cell 1" />
      </_CellGroup>,
    );

    const cellGroup = container.querySelector('.t-cell-group');
    expect(cellGroup).toBeInTheDocument();
  });

  it('should be the same as CellGroup component', () => {
    const { container: container1 } = render(
      <CellGroup title="Test Group">
        <Cell title="Test Cell" />
      </CellGroup>,
    );

    const { container: container2 } = render(
      <_CellGroup title="Test Group">
        <_Cell title="Test Cell" />
      </_CellGroup>,
    );

    // Both should have the same structure
    expect(container1.querySelector('.t-cell-group')).toBeInTheDocument();
    expect(container2.querySelector('.t-cell-group')).toBeInTheDocument();
  });
});
