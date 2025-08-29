import { describe, it, expect, render } from '@test/utils';
import React from 'react';
import CellGroup from '../CellGroup';
import Cell from '../Cell';

describe('CellGroup', () => {
  it('renders correctly with default props', () => {
    const { container } = render(
      <CellGroup>
        <Cell title="Cell 1" />
        <Cell title="Cell 2" />
      </CellGroup>,
    );

    expect(container.firstChild).toBeInTheDocument();
    expect(container.querySelector('.t-cell-group')).toBeInTheDocument();
  });

  it('renders with title', () => {
    const { getByText } = render(
      <CellGroup title="Group Title">
        <Cell title="Cell 1" />
      </CellGroup>,
    );

    expect(getByText('Group Title')).toBeInTheDocument();
    expect(getByText('Group Title')).toHaveClass('t-cell-group__title');
  });

  it('renders with ReactNode title', () => {
    const titleNode = <span data-testid="custom-title"></span>;
    const { getByTestId } = render(
      <CellGroup title={titleNode}>
        <Cell title="Cell 1" />
      </CellGroup>,
    );

    expect(getByTestId('custom-title')).toBeInTheDocument();
  });

  it('applies bordered class when bordered is true', () => {
    const { container } = render(
      <CellGroup bordered>
        <Cell title="Cell 1" />
      </CellGroup>,
    );

    expect(container.querySelector('.t-cell-group--bordered')).toBeInTheDocument();
  });

  it('does not apply bordered class when bordered is false', () => {
    const { container } = render(
      <CellGroup bordered={false}>
        <Cell title="Cell 1" />
      </CellGroup>,
    );

    expect(container.querySelector('.t-cell-group--bordered')).not.toBeInTheDocument();
  });

  it('applies correct theme class', () => {
    const { container } = render(
      <CellGroup theme="card">
        <Cell title="Cell 1" />
      </CellGroup>,
    );

    expect(container.querySelector('.t-cell-group--card')).toBeInTheDocument();
  });

  it('renders children correctly', () => {
    const { getByText } = render(
      <CellGroup>
        <Cell title="First Cell" />
        <Cell title="Second Cell" />
        <div>Custom Content</div>
      </CellGroup>,
    );

    expect(getByText('First Cell')).toBeInTheDocument();
    expect(getByText('Second Cell')).toBeInTheDocument();
    expect(getByText('Custom Content')).toBeInTheDocument();
  });

  it('renders without title when title is not provided', () => {
    const { container } = render(
      <CellGroup>
        <Cell title="Cell 1" />
      </CellGroup>,
    );

    expect(container.querySelector('.t-cell-group__title')).not.toBeInTheDocument();
  });

  it('applies custom className through native props', () => {
    const { container } = render(
      <CellGroup className="custom-class">
        <Cell title="Cell 1" />
      </CellGroup>,
    );

    expect(container.firstChild).toHaveClass('custom-class');
  });

  it('applies custom style through native props', () => {
    const customStyle = { backgroundColor: 'red' };
    const { container } = render(
      <CellGroup style={customStyle}>
        <Cell title="Cell 1" />
      </CellGroup>,
    );

    expect(container.firstChild).toHaveStyle('background-color: rgb(255, 0, 0)');
  });

  it('renders with multiple themes', () => {
    const { container: defaultContainer } = render(
      <CellGroup theme="default">
        <Cell title="Cell 1" />
      </CellGroup>,
    );

    const { container: cardContainer } = render(
      <CellGroup theme="card">
        <Cell title="Cell 1" />
      </CellGroup>,
    );

    expect(defaultContainer.querySelector('.t-cell-group--default')).toBeInTheDocument();
    expect(cardContainer.querySelector('.t-cell-group--card')).toBeInTheDocument();
  });

  it('handles empty children', () => {
    const { container } = render(<CellGroup title="Empty Group" />);

    expect(container.querySelector('.t-cell-group')).toBeInTheDocument();
    expect(container.querySelector('.t-cell-group__title')).toBeInTheDocument();
  });
});
