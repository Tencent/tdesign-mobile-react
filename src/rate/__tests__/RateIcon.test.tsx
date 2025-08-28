import React from 'react';
import { vi } from 'vitest';
import { describe, it, expect, render, fireEvent } from '@test/utils';
import { RateIcon } from '../RateIcon';

describe('RateIcon', () => {
  it('should render default star icon', () => {
    const { container } = render(
      <RateIcon size={24} icon={[]} color="" isCurrent={false} isSelected={false} isHalf={false} />,
    );
    expect(container.querySelector('.t-rate__icon')).toBeInTheDocument();
  });

  it('should apply selected class when selected', () => {
    const { container } = render(
      <RateIcon size={24} icon={[]} color="" isCurrent={false} isSelected={true} isHalf={false} />,
    );
    const icon = container.querySelector('.t-rate__icon');
    expect(icon).toHaveClass('t-rate__icon--selected');
  });

  it('should apply current class when current', () => {
    const { container } = render(
      <RateIcon size={24} icon={[]} color="" isCurrent={true} isSelected={false} isHalf={false} />,
    );
    const icon = container.querySelector('.t-rate__icon');
    expect(icon).toHaveClass('t-rate__icon--current');
  });

  it('should render half icon when half', () => {
    const { container } = render(
      <RateIcon size={24} icon={[]} color="" isCurrent={false} isSelected={true} isHalf={true} />,
    );
    expect(container.querySelector('.t-rate__icon-left')).toBeInTheDocument();
  });

  it('should apply color styles', () => {
    const { container } = render(
      <RateIcon size={24} icon={[]} color="#ff0000" isCurrent={false} isSelected={true} isHalf={false} />,
    );
    const icon = container.querySelector('.t-rate__icon');
    expect(icon).toHaveStyle('--td-rate-selected-color: #ff0000');
  });

  it('should apply size style', () => {
    const { container } = render(
      <RateIcon size={32} icon={[]} color="" isCurrent={false} isSelected={false} isHalf={false} />,
    );
    const icon = container.querySelector('.t-rate__icon');
    expect(icon).toHaveStyle('font-size: 32px');
  });

  it('should handle click events', () => {
    const handleClick = vi.fn();
    const { container } = render(
      <RateIcon
        size={24}
        icon={[]}
        color=""
        isCurrent={false}
        isSelected={false}
        isHalf={false}
        onClick={handleClick}
      />,
    );

    const icon = container.querySelector('.t-rate__icon') as Element;
    const rect = {
      x: 100,
      width: 24,
      height: 24,
      y: 100,
      top: 100,
      bottom: 124,
      left: 100,
      right: 124,
      toJSON: () => {},
    };
    vi.spyOn(icon, 'getBoundingClientRect').mockReturnValue(rect as DOMRect);

    fireEvent.click(icon, { clientX: 105 });
    expect(handleClick).toHaveBeenCalledWith('left', expect.any(Object));
  });

  it('should handle custom function icon', () => {
    const CustomIcon = () => <span>★</span>;
    const { container } = render(
      <RateIcon size={24} icon={[CustomIcon]} color="" isCurrent={false} isSelected={false} isHalf={false} />,
    );
    expect(container.querySelector('.t-rate__icon')).toBeInTheDocument();
  });

  it('should handle custom element icon', () => {
    const customIcon = <span>☆</span>;
    const { container } = render(
      <RateIcon size={24} icon={[customIcon]} color="" isCurrent={false} isSelected={false} isHalf={false} />,
    );
    expect(container.querySelector('.t-rate__icon')).toBeInTheDocument();
  });

  it('should handle color array', () => {
    const { container } = render(
      <RateIcon
        size={24}
        icon={[]}
        color={['#ff0000', '#000000']}
        isCurrent={false}
        isSelected={true}
        isHalf={false}
      />,
    );
    const icon = container.querySelector('.t-rate__icon');
    expect(icon).toHaveStyle('--td-rate-selected-color: #ff0000');
    expect(icon).toHaveStyle('--td-rate-unselected-color: #000000');
  });

  it('should handle right side click', () => {
    const handleClick = vi.fn();
    const { container } = render(
      <RateIcon
        size={24}
        icon={[]}
        color=""
        isCurrent={false}
        isSelected={false}
        isHalf={false}
        onClick={handleClick}
      />,
    );

    const icon = container.querySelector('.t-rate__icon') as Element;
    const rect = {
      x: 100,
      width: 24,
      height: 24,
      y: 100,
      top: 100,
      bottom: 124,
      left: 100,
      right: 124,
      toJSON: () => {},
    };
    vi.spyOn(icon, 'getBoundingClientRect').mockReturnValue(rect as DOMRect);

    fireEvent.click(icon, { clientX: 115 });
    expect(handleClick).toHaveBeenCalledWith('right', expect.any(Object));
  });

  it('should handle unselected state correctly', () => {
    const { container } = render(
      <RateIcon size={24} icon={[]} color="" isCurrent={false} isSelected={false} isHalf={false} />,
    );
    const icon = container.querySelector('.t-rate__icon');
    expect(icon).toHaveClass('t-rate__icon--unselected');
  });

  it('should handle half selected state correctly', () => {
    const { container } = render(
      <RateIcon size={24} icon={[]} color="" isCurrent={false} isSelected={true} isHalf={true} />,
    );
    const leftIcon = container.querySelector('.t-rate__icon-left');
    expect(leftIcon).toHaveClass('t-rate__icon-left--selected');
  });

  it('should handle half unselected state correctly', () => {
    const { container } = render(
      <RateIcon size={24} icon={[]} color="" isCurrent={false} isSelected={false} isHalf={true} />,
    );
    const leftIcon = container.querySelector('.t-rate__icon-left');
    expect(leftIcon).toHaveClass('t-rate__icon-left--unselected');
  });

  it('should handle undefined color values', () => {
    const { container } = render(
      <RateIcon size={24} icon={[]} color={undefined} isCurrent={false} isSelected={true} isHalf={false} />,
    );
    const icon = container.querySelector('.t-rate__icon');
    expect(icon).toBeInTheDocument();
  });

  it('should handle empty color array', () => {
    const { container } = render(
      <RateIcon size={24} icon={[]} color={[]} isCurrent={false} isSelected={true} isHalf={false} />,
    );
    const icon = container.querySelector('.t-rate__icon');
    expect(icon).toBeInTheDocument();
  });

  it('should handle single color in array', () => {
    const { container } = render(
      <RateIcon size={24} icon={[]} color={['#ff0000']} isCurrent={false} isSelected={true} isHalf={false} />,
    );
    const icon = container.querySelector('.t-rate__icon');
    expect(icon).toHaveStyle('--td-rate-selected-color: #ff0000');
  });

  it('should handle undefined icon values', () => {
    const { container } = render(
      <RateIcon size={24} icon={undefined} color="" isCurrent={false} isSelected={false} isHalf={false} />,
    );
    expect(container.querySelector('.t-rate__icon')).toBeInTheDocument();
  });

  it('should handle null icon values', () => {
    const { container } = render(
      <RateIcon size={24} icon={[null, null]} color="" isCurrent={false} isSelected={false} isHalf={false} />,
    );
    expect(container.querySelector('.t-rate__icon')).toBeInTheDocument();
  });

  it('should handle string icon values', () => {
    const { container } = render(
      <RateIcon size={24} icon={['★', '☆']} color="" isCurrent={false} isSelected={false} isHalf={false} />,
    );
    expect(container.querySelector('.t-rate__icon')).toBeInTheDocument();
  });

  it('should handle zero size', () => {
    const { container } = render(
      <RateIcon size={0} icon={[]} color="" isCurrent={false} isSelected={false} isHalf={false} />,
    );
    const icon = container.querySelector('.t-rate__icon');
    expect(icon).toHaveStyle('font-size: 0px');
  });

  it('should handle negative size', () => {
    const { container } = render(
      <RateIcon size={-10} icon={[]} color="" isCurrent={false} isSelected={false} isHalf={false} />,
    );
    const icon = container.querySelector('.t-rate__icon');
    expect(icon).toHaveStyle('font-size: -10px');
  });

  it('should handle current and selected together', () => {
    const { container } = render(
      <RateIcon size={24} icon={[]} color="" isCurrent={true} isSelected={true} isHalf={false} />,
    );
    const icon = container.querySelector('.t-rate__icon');
    expect(icon).toHaveClass('t-rate__icon--current');
    expect(icon).toHaveClass('t-rate__icon--selected');
  });

  it('should handle current and half together', () => {
    const { container } = render(
      <RateIcon size={24} icon={[]} color="" isCurrent={true} isSelected={true} isHalf={true} />,
    );
    const icon = container.querySelector('.t-rate__icon');
    expect(icon).toHaveClass('t-rate__icon--current');
    expect(container.querySelector('.t-rate__icon-left')).toBeInTheDocument();
  });
});
