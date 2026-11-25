import React from 'react';
import { describe, expect, vi, it } from '@test/utils';
import { render, fireEvent } from '@testing-library/react';
import Slider from '../index';

describe('Slider bounds changes during dragging', () => {
  it.each([
    { initial: 80, range: false, min: 0, max: 60, expected: 60 },
    { initial: 20, range: false, min: 40, max: 100, expected: 40 },
    { initial: [20, 80], range: true, min: 30, max: 60, expected: [30, 60] },
    { initial: [80, 90], range: true, min: 0, max: 60, expected: [60, 60] },
  ])('reports values within the latest bounds', ({ initial, range, min, max, expected }) => {
    const onDragend = vi.fn();
    const { container, rerender } = render(
      <Slider range={range} defaultValue={initial} onDragend={onDragend} />,
    );
    const dot = container.querySelector<HTMLElement>(
      range ? '.t-slider__dot--right' : '.t-slider__dot',
    )!;
    fireEvent.touchStart(dot, { touches: [{ clientX: 80 } as Touch] });
    rerender(<Slider range={range} min={min} max={max} defaultValue={initial} onDragend={onDragend} />);
    fireEvent.touchEnd(dot, { touches: [], changedTouches: [{ clientX: 80 } as Touch] });
    expect(onDragend).toHaveBeenCalledWith(expected, expect.objectContaining({ e: expect.any(Object) }));
  });
});
