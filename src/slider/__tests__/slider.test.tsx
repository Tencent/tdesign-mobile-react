import React from 'react';
import { describe, expect, vi, it, test, beforeEach } from '@test/utils';
import { render, fireEvent, screen } from '@testing-library/react';
import Slider from '../index';

const prefix = 't';
const name = `.${prefix}-slider`;
describe('Slider', () => {
  describe('props', () => {
    it(': className', () => {
      const { container } = render(<Slider className="custom-class" />);
      expect(container.firstChild).toHaveClass('custom-class');
    });

    it(': style', () => {
      const { container } = render(<Slider style={{ color: '#fff' }} />);
      expect(container.firstChild).toHaveStyle('color: #fff');
    });

    it(': defaultValue', () => {
      const { container } = render(<Slider defaultValue={30} />);
      expect(container.querySelector(`${name}__bar--default`)).toBeTruthy();
    });
    it(': label', () => {
      const label1 = (value) => `Processed: ${value}`;
      const { container: container1 } = render(<Slider label={label1} value={1} />);
      const { container: container2 } = render(<Slider label={false} value={1} />);
      expect(container1.querySelector(`${name}__dot-value`)).toBeTruthy();
      expect(container2.querySelector(`${name}__dot-value`)).not.toBeTruthy();
      // eslint-disable-next-line
      const label3 = '${value} is a variable';
      const value3 = 123;
      const { container: container3 } = render(<Slider label={label3} value={value3} />);
      expect(container3.querySelector(`${name}__dot-value`)).toBeTruthy();
    });
    it(': value', () => {
      const { container: container1 } = render(<Slider label value={1} />);
      expect(container1.querySelector(`${name}__dot-value`)).toBeTruthy();
    });
    it(': step', () => {
      const { container } = render(<Slider step={20} min={0} max={15} showExtremeValue />);
      const slider = container.querySelector(`${name}__line`);
      fireEvent.click(slider, { clientX: 20 });
      const { container: container1 } = render(<Slider step={0.1} min={0.1} max={0.9} />);
      const slider1 = container1.querySelector(`${name}__line`);
      fireEvent.click(slider1, { clientX: 0.1 });
    });
    it(':disabled', () => {
      const { container } = render(<Slider disabled />);
      const sliderContainer = container.querySelector(`${name}--disabled`);
      expect(sliderContainer).toHaveClass('t-slider--disabled');
    });

    it(': range', () => {
      const { container } = render(<Slider range defaultValue={[20, 80]} />);
      const sliderContainer = container.querySelector(`${name}`);
      const sliders = sliderContainer?.querySelectorAll(`${name}__dot-slider`);
      expect(sliders?.length).toBe(2);
    });

    it(': marks', () => {
      const marks1 = { 0: '0°C', 50: '50°C', 100: '100°C' };
      const marks2 = { 10: (val) => `${val  }%` };
      const { container: container1 } = render(<Slider marks={marks1} theme="capsule" />);
      const { container: container2 } = render(<Slider marks={marks2} />);
      const scaleItems1 = container1.querySelectorAll(`${name}__scale-item`);
      const scaleItems2 = container2.querySelectorAll(`${name}__scale-item`);
      expect(scaleItems1.length).toBe(3);
      expect(scaleItems2.length).toBe(1);
      expect(screen.getByText('0°C')).toBeInTheDocument();
    });
    it(': marks array', () => {
      const testMarks = [10, 20, 30];
      const { container } = render(<Slider marks={testMarks} range value={[10, 20]} />);
      const scaleItems = container.querySelectorAll(`${name}__scale-item`);
      expect(scaleItems).toHaveLength(testMarks.length);
    });
    it(': showExtremeValue', () => {
      render(<Slider showExtremeValue min={0} max={100} />);
      expect(screen.getByText('0')).toBeInTheDocument();
      expect(screen.getByText('100')).toBeInTheDocument();
    });

    it(': showExtremeValue label', () => {
      render(<Slider showExtremeValue label min={0} max={100} />);
      expect(screen.getByText('100')).toBeInTheDocument();
    });

    it(': min range showExtremeValue', () => {
      render(<Slider range showExtremeValue defaultValue={[20, 60]} label={10} min={10} />);
      expect(screen.getByText('10')).toBeInTheDocument();
    });

    it(': theme', () => {
      const themes = ['default', 'capsule'] as const;
      themes.forEach((theme) => {
        const { container } = render(<Slider theme={theme} />);
        const sliderBar = container.querySelector(`${name}__bar`);
        expect(sliderBar).toHaveClass(`t-slider__bar--${theme}`);
      });
    });
  });

  describe('event', () => {
    it(': onChange (single slider)', () => {
      const handleChange = vi.fn();
      const { container } = render(<Slider defaultValue={30} onChange={handleChange} />);
      const sliderLine = container.querySelector(`${name}__line`);
      fireEvent.click(sliderLine, { clientX: 200 });
      expect(handleChange).toHaveBeenCalled();
    });

    it(': onChange (touch interaction)', () => {
      const handleChange = vi.fn();
      const { container: container1 } = render(<Slider defaultValue={30} onChange={handleChange} />);
      const { container: container2 } = render(<Slider disabled defaultValue={30} onChange={handleChange} />);
      const dot1 = container1.querySelector(`${name}__dot`);
      const dot2 = container2.querySelector(`${name}__dot`);
      fireEvent.touchMove(dot1, {
        changedTouches: [{ pageX: 250 } as Touch],
      });
      fireEvent.touchMove(dot1, {
        changedTouches: undefined,
      });
      fireEvent.touchMove(dot2, {
        changedTouches: [{ pageX: 250 } as Touch],
      });
      fireEvent.touchMove(dot2, {
        changedTouches: undefined,
      });
      expect(handleChange).toHaveBeenCalled();
    });
    it(': click handleRangeClick', () => {
      const onChange = vi.fn();
      const { container: container1 } = render(
        <Slider range min={0} max={100} defaultValue={[20, 80]} onChange={onChange} theme="capsule" />,
      );
      const { container: container2 } = render(
        <Slider range={false} min={0} max={100} defaultValue={[20, 80]} onChange={onChange} theme="capsule" />,
      );
      const sliderLine1 = container1.querySelector(`${name}__line`) as HTMLElement;
      const sliderLine2 = container2.querySelector(`${name}__line`) as HTMLElement;

      fireEvent.click(sliderLine1, { clientX: 190 });
      fireEvent.click(sliderLine2, { clientX: 190 });
      expect(onChange).toHaveBeenCalled();
    });

    it(': click disabled', () => {
      const onChange = vi.fn();
      const { container: container1 } = render(
        <Slider disabled range min={0} max={100} defaultValue={[20, 80]} onChange={onChange} />,
      );
      const { container: container2 } = render(
        <Slider disabled range={false} min={0} max={100} defaultValue={[20, 80]} onChange={onChange} />,
      );
      const sliderLine1 = container1.querySelector(`${name}__line`) as HTMLElement;
      const sliderLine2 = container2.querySelector(`${name}__line`) as HTMLElement;
      fireEvent.click(sliderLine1, { clientX: 190 });
      fireEvent.click(sliderLine2, { clientX: 190 });
      expect(onChange).not.toHaveBeenCalled();
    });

    it(': onTouchMoveLeft', () => {
      const onChange = vi.fn();
      const { container } = render(
        <Slider range min={0} max={100} step={1} defaultValue={[20, 80]} onChange={onChange} theme="default" />,
      );
      const leftDot = container.querySelector(`${name}__dot--left`);
      Object.defineProperty(container.querySelector(`${name}__bar`), 'getBoundingClientRect', {
        value: () => ({ left: 100, right: 500, width: 400 }) as DOMRect,
      });
      fireEvent.touchMove(leftDot, {
        changedTouches: undefined as unknown,
      });

      fireEvent.touchMove(leftDot, {
        changedTouches: [{ pageX: 200 } as Touch],
      });
      expect(onChange).toHaveBeenCalledWith(expect.arrayContaining([expect.any(Number), 80]));
    });

    it(': onTouchMoveRight', () => {
      const onChange = vi.fn();
      const { container } = render(
        <Slider range min={0} max={100} step={1} defaultValue={[20, 80]} onChange={onChange} theme="default" />,
      );
      const rightDot = container.querySelector(`${name}__dot--right`);
      Object.defineProperty(container.querySelector(`${name}__bar`), 'getBoundingClientRect', {
        value: () => ({ left: 100, right: 500, width: 400 }) as DOMRect,
      });
      fireEvent.touchMove(rightDot, {
        changedTouches: undefined as unknown,
      });
      fireEvent.touchMove(rightDot, {
        changedTouches: [{ pageX: 300 } as Touch],
      });
      expect(onChange).toHaveBeenCalledWith(expect.arrayContaining([20, expect.any(Number)]));
    });

    it(': touchMove disabled', () => {
      const onChange = vi.fn();
      const { container } = render(
        <Slider disabled range min={0} max={100} defaultValue={[20, 80]} onChange={onChange} />,
      );
      const leftDot = container.querySelector(`${name}__dot--left`);
      const rightDot = container.querySelector(`${name}__dot--right`);
      fireEvent.touchMove(rightDot, {
        changedTouches: undefined as unknown,
      });
      fireEvent.touchMove(leftDot, {
        changedTouches: undefined as unknown,
      });
      fireEvent.touchMove(rightDot, {
        changedTouches: [{ pageX: 300 } as Touch],
      });
      fireEvent.touchMove(leftDot, {
        changedTouches: [{ pageX: 200 } as Touch],
      });
      expect(onChange).not.toHaveBeenCalled();
    });
  });

  describe('slider handleRangeClick', () => {
    const defaultProps = {
      range: true,
      min: 0,
      max: 100,
      step: 1,
      defaultValue: [20, 80],
      onChange: vi.fn(),
    };
    const TRACK_WIDTH = 400;
    const TRACK_LEFT = 100;

    // 模拟轨道位置和宽度
    const mockBoundingClientRect = () => {
      vi.spyOn(HTMLDivElement.prototype, 'getBoundingClientRect').mockImplementation(() => ({
        left: TRACK_LEFT,
        right: TRACK_LEFT + TRACK_WIDTH,
        top: 0,
        bottom: 0,
        width: TRACK_WIDTH,
        height: 0,
        x: TRACK_LEFT,
        y: 0,
        toJSON: vi.fn(),
      }));
    };

    beforeEach(() => {
      vi.clearAllMocks();
    });
    test('click left', () => {
      mockBoundingClientRect();
      const { container } = render(<Slider {...defaultProps} theme="default" />);
      const sliderLine = container.querySelector(`${name}__line`) as HTMLElement;
      fireEvent.click(sliderLine, { clientX: TRACK_LEFT + 100 });
    });

    test('click right', () => {
      mockBoundingClientRect();
      const { container } = render(<Slider {...defaultProps} theme="default" />);
      const sliderLine = container.querySelector(`${name}__line`) as HTMLElement;
      fireEvent.click(sliderLine, { clientX: TRACK_LEFT + 300 });
    });
  });
});
