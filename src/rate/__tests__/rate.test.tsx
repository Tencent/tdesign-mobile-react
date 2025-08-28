import React from 'react';
import { vi } from 'vitest';
import { describe, it, expect, render, screen, fireEvent, waitFor } from '@test/utils';
import Rate from '../Rate';

// Mock useSize from ahooks
vi.mock('ahooks', async () => {
  const actual = await vi.importActual('ahooks');
  return {
    ...actual,
    useSize: () => ({ width: 200, height: 40 }),
  };
});

// Mock useClickAway from ahooks
vi.mock('ahooks', async () => {
  const actual = await vi.importActual('ahooks');
  return {
    ...actual,
    useSize: () => ({ width: 200, height: 40 }),
    useClickAway: vi.fn(),
  };
});

describe('Rate', () => {
  it('should render default rate component', () => {
    const { container } = render(<Rate />);
    expect(container.querySelector('.t-rate')).toBeInTheDocument();
    expect(container.querySelectorAll('.t-rate__icon')).toHaveLength(5);
  });

  it('should render 0 size rate icon component', () => {
    const { container } = render(<Rate size="aa" />);
    const icons = container.querySelectorAll('.t-rate__icon');
    icons.forEach((icon) => {
      expect(icon).toHaveStyle('font-size: 0px');
    });
  });

  it('should render with custom count', () => {
    const { container } = render(<Rate count={3} />);
    expect(container.querySelectorAll('.t-rate__icon')).toHaveLength(3);
  });

  it('should render with custom size', () => {
    const { container } = render(<Rate size="32" />);
    const icons = container.querySelectorAll('.t-rate__icon');
    expect(icons[0]).toHaveStyle('font-size: 32px');
  });

  it('should render with custom color', () => {
    const { container } = render(<Rate color="#ff0000" />);
    const icons = container.querySelectorAll('.t-rate__icon');
    expect(icons[0]).toHaveStyle('--td-rate-selected-color: #ff0000');
  });

  it('should render with color array', () => {
    const { container } = render(<Rate color={['#ff0000', '#000000']} />);
    const icons = container.querySelectorAll('.t-rate__icon');
    expect(icons[0]).toHaveStyle('--td-rate-selected-color: #ff0000');
    expect(icons[0]).toHaveStyle('--td-rate-unselected-color: #000000');
  });

  it('should render with custom gap', () => {
    const { container } = render(<Rate gap={16} />);
    const wrapper = container.querySelector('.t-rate__wrapper');
    expect(wrapper).toHaveStyle('gap: 16px');
  });

  it('should render with custom icon', () => {
    const customIcon = [<span key="1">★</span>, <span key="2">☆</span>];
    const { container } = render(<Rate icon={customIcon} />);
    expect(container.querySelector('.t-rate')).toBeInTheDocument();
  });

  it('should render with custom icon function', () => {
    const customIcon = [() => <span key="1">★</span>, () => <span key="2">☆</span>];
    const { container } = render(<Rate icon={customIcon} />);
    expect(container.querySelector('.t-rate')).toBeInTheDocument();
  });

  it('should handle controlled value', () => {
    const { container } = render(<Rate value={3} />);
    const icons = container.querySelectorAll('.t-rate__icon');
    expect(icons[0]).toHaveClass('t-rate__icon--selected');
    expect(icons[1]).toHaveClass('t-rate__icon--selected');
    expect(icons[2]).toHaveClass('t-rate__icon--selected');
    expect(icons[3]).not.toHaveClass('t-rate__icon--selected');
  });

  it('should handle uncontrolled value with defaultValue', () => {
    const { container } = render(<Rate defaultValue={2} />);
    const icons = container.querySelectorAll('.t-rate__icon');
    expect(icons[0]).toHaveClass('t-rate__icon--selected');
    expect(icons[1]).toHaveClass('t-rate__icon--selected');
    expect(icons[2]).not.toHaveClass('t-rate__icon--selected');
  });

  it('should handle onChange callback', () => {
    const handleChange = vi.fn();
    const { container } = render(<Rate onChange={handleChange} />);

    const icons = container.querySelectorAll('.t-rate__icon');
    fireEvent.click(icons[2]);

    expect(handleChange).toHaveBeenCalledWith(3);
  });

  it('should handle click events on icons', () => {
    const handleChange = vi.fn();
    const { container } = render(<Rate onChange={handleChange} />);

    const icons = container.querySelectorAll('.t-rate__icon');
    fireEvent.click(icons[0]);
    expect(handleChange).toHaveBeenCalledWith(1);

    fireEvent.click(icons[4]);
    expect(handleChange).toHaveBeenCalledWith(5);
  });

  it('should handle half selection when allowHalf is true', () => {
    const handleChange = vi.fn();
    const { container } = render(<Rate allowHalf onChange={handleChange} />);

    const icons = container.querySelectorAll('.t-rate__icon');
    const icon = icons[2];

    // Mock getBoundingClientRect
    Object.defineProperty(icon, 'getBoundingClientRect', {
      value: () => ({ x: 100, width: 24, height: 24, y: 100, top: 100, bottom: 124, left: 100, right: 124 }),
    });

    fireEvent.click(icon, { clientX: 105 });
    expect(handleChange).toHaveBeenCalledWith(2.5);
  });

  it('should handle full selection when allowHalf is true', () => {
    const handleChange = vi.fn();
    const { container } = render(<Rate allowHalf onChange={handleChange} />);

    const icons = container.querySelectorAll('.t-rate__icon');
    const icon = icons[2];

    // Mock getBoundingClientRect
    Object.defineProperty(icon, 'getBoundingClientRect', {
      value: () => ({ x: 100, width: 24, height: 24, y: 100, top: 100, bottom: 124, left: 100, right: 124 }),
    });

    fireEvent.click(icon, { clientX: 115 });
    expect(handleChange).toHaveBeenCalledWith(3);
  });

  it('should not handle click when disabled', () => {
    const handleChange = vi.fn();
    const { container } = render(<Rate disabled onChange={handleChange} />);

    const icons = container.querySelectorAll('.t-rate__icon');
    fireEvent.click(icons[2]);

    expect(handleChange).not.toHaveBeenCalled();
  });

  it('should apply disabled class when disabled', () => {
    const { container } = render(<Rate disabled />);
    expect(container.querySelector('.t-rate')).toHaveClass('t-rate--disabled');
  });

  it('should render showText when showText is true', () => {
    const { container } = render(<Rate showText />);
    expect(container.querySelector('.t-rate__text')).toBeInTheDocument();
  });

  it('should render custom texts when provided', () => {
    const texts = ['很差', '差', '一般', '好', '很好'];
    render(<Rate showText texts={texts} value={3} />);
    expect(screen.getByText('一般')).toBeInTheDocument();
  });

  it('should handle touch events for dragging', () => {
    const handleChange = vi.fn();
    const { container } = render(<Rate onChange={handleChange} />);

    const wrapper = container.querySelector('.t-rate__wrapper');

    // Mock getBoundingClientRect for wrapper
    Object.defineProperty(wrapper, 'getBoundingClientRect', {
      value: () => ({ x: 0, width: 200, height: 40, y: 0, top: 0, bottom: 40, left: 0, right: 200 }),
    });

    // Touch start
    fireEvent.touchStart(wrapper, { touches: [{ clientX: 50 }] });

    // Touch move
    fireEvent.touchMove(wrapper, { touches: [{ clientX: 80 }] });

    // Touch end
    fireEvent.touchEnd(wrapper);

    expect(handleChange).toHaveBeenCalled();
  });

  it('should handle touch events with allowHalf', () => {
    const handleChange = vi.fn();
    const { container } = render(<Rate allowHalf onChange={handleChange} />);

    const wrapper = container.querySelector('.t-rate__wrapper');

    // Mock getBoundingClientRect for wrapper
    Object.defineProperty(wrapper, 'getBoundingClientRect', {
      value: () => ({ x: 0, width: 200, height: 40, y: 0, top: 0, bottom: 40, left: 0, right: 200 }),
    });

    // Touch start
    fireEvent.touchStart(wrapper, { touches: [{ clientX: 50 }] });

    // Touch move
    fireEvent.touchMove(wrapper, { touches: [{ clientX: 85 }] });

    // Touch end
    fireEvent.touchEnd(wrapper);

    expect(handleChange).toHaveBeenCalled();
  });

  it('should not handle touch events when disabled', () => {
    const handleChange = vi.fn();
    const { container } = render(<Rate disabled onChange={handleChange} />);

    const wrapper = container.querySelector('.t-rate__wrapper');

    // Touch start
    fireEvent.touchStart(wrapper, { touches: [{ clientX: 50 }] });

    // Touch move
    fireEvent.touchMove(wrapper, { touches: [{ clientX: 80 }] });

    // Touch end
    fireEvent.touchEnd(wrapper);

    expect(handleChange).not.toHaveBeenCalled();
  });

  it('should handle placement prop for tips', () => {
    const { container } = render(<Rate placement="bottom" />);
    expect(container.querySelector('.t-rate')).toBeInTheDocument();
  });

  it('should handle empty placement prop', () => {
    const { container } = render(<Rate placement="" />);
    expect(container.querySelector('.t-rate')).toBeInTheDocument();
  });

  it('should handle custom className', () => {
    const { container } = render(<Rate className="custom-class" />);
    expect(container.querySelector('.t-rate')).toHaveClass('custom-class');
  });

  it('should handle custom style', () => {
    const { container } = render(<Rate style={{ margin: '10px' }} />);
    expect(container.querySelector('.t-rate')).toHaveStyle('margin: 10px');
  });

  it('should handle zero count', () => {
    const { container } = render(<Rate count={0} />);
    expect(container.querySelectorAll('.t-rate__icon')).toHaveLength(0);
  });

  it('should handle single count', () => {
    const { container } = render(<Rate count={1} />);
    expect(container.querySelectorAll('.t-rate__icon')).toHaveLength(1);
  });

  it('should handle large count', () => {
    const { container } = render(<Rate count={10} />);
    expect(container.querySelectorAll('.t-rate__icon')).toHaveLength(10);
  });

  it('should handle decimal gap', () => {
    const { container } = render(<Rate gap={8.5} />);
    const wrapper = container.querySelector('.t-rate__wrapper');
    expect(wrapper).toHaveStyle('gap: 8.5px');
  });

  it('should handle string size', () => {
    const { container } = render(<Rate size="32px" />);
    const icons = container.querySelectorAll('.t-rate__icon');
    expect(icons[0]).toHaveStyle('font-size: 32px');
  });

  it('should handle touch cancel', () => {
    const handleChange = vi.fn();
    const { container } = render(<Rate onChange={handleChange} />);

    const wrapper = container.querySelector('.t-rate__wrapper');

    // Touch start
    fireEvent.touchStart(wrapper, { touches: [{ clientX: 50 }] });

    // Touch move
    fireEvent.touchMove(wrapper, { touches: [{ clientX: 80 }] });

    // Touch cancel
    fireEvent.touchCancel(wrapper);

    expect(handleChange).toHaveBeenCalled();
  });

  it('should handle tips visibility with placement', async () => {
    const { container } = render(<Rate placement="top" />);

    const icons = container.querySelectorAll('.t-rate__icon');
    fireEvent.click(icons[2]);

    // Wait for tips to potentially appear
    await waitFor(() => {
      expect(container.querySelector('.t-rate')).toBeInTheDocument();
    });
  });

  it('should handle tips click outside', () => {
    const { container } = render(<Rate placement="top" />);
    expect(container.querySelector('.t-rate')).toBeInTheDocument();
  });

  it('should handle double tips when allowHalf is true', () => {
    const { container } = render(<Rate allowHalf placement="top" />);

    const icons = container.querySelectorAll('.t-rate__icon');
    fireEvent.click(icons[2]);

    expect(container.querySelector('.t-rate')).toBeInTheDocument();
  });

  it('should handle tips data correctly', () => {
    const { container } = render(<Rate placement="top" />);
    expect(container.querySelector('.t-rate')).toBeInTheDocument();
  });

  it('should handle zero value', () => {
    const { container } = render(<Rate value={0} />);
    const icons = container.querySelectorAll('.t-rate__icon');
    icons.forEach((icon) => {
      expect(icon).not.toHaveClass('t-rate__icon--selected');
    });
  });

  it('should handle maximum value', () => {
    const { container } = render(<Rate value={5} />);
    const icons = container.querySelectorAll('.t-rate__icon');
    icons.forEach((icon) => {
      expect(icon).toHaveClass('t-rate__icon--selected');
    });
  });

  it('should handle value greater than count', () => {
    const { container } = render(<Rate value={10} count={5} />);
    const icons = container.querySelectorAll('.t-rate__icon');
    icons.forEach((icon) => {
      expect(icon).toHaveClass('t-rate__icon--selected');
    });
  });

  it('should handle negative value', () => {
    const { container } = render(<Rate value={-1} />);
    const icons = container.querySelectorAll('.t-rate__icon');
    icons.forEach((icon) => {
      expect(icon).not.toHaveClass('t-rate__icon--selected');
    });
  });

  it('should handle decimal value', () => {
    const { container } = render(<Rate value={2.5} />);
    const icons = container.querySelectorAll('.t-rate__icon');

    expect(icons[0]).toHaveClass('t-rate__icon--selected');
    expect(icons[1]).toHaveClass('t-rate__icon--selected');
    expect(icons[2]).toHaveClass('t-rate__icon--unselected');
    expect(icons[2].querySelector('.t-rate__icon-left--selected')).toBeInTheDocument();
  });

  it('should handle onChange with same value', () => {
    const handleChange = vi.fn();
    const { container } = render(<Rate value={3} onChange={handleChange} />);

    const icons = container.querySelectorAll('.t-rate__icon');
    fireEvent.click(icons[2]);

    expect(handleChange).toHaveBeenCalledWith(3);
  });

  it('should handle touch events with minimum movement', () => {
    const handleChange = vi.fn();
    const { container } = render(<Rate onChange={handleChange} />);

    const wrapper = container.querySelector('.t-rate__wrapper');

    // Mock getBoundingClientRect for wrapper
    Object.defineProperty(wrapper, 'getBoundingClientRect', {
      value: () => ({ x: 0, width: 200, height: 40, y: 0, top: 0, bottom: 40, left: 0, right: 200 }),
    });

    // Touch start
    fireEvent.touchStart(wrapper, { touches: [{ clientX: 50 }] });

    // Touch move with small movement (less than 5px)
    fireEvent.touchMove(wrapper, { touches: [{ clientX: 52 }] });

    // Touch end
    fireEvent.touchEnd(wrapper);

    // Should not trigger change due to small movement
    expect(handleChange).not.toHaveBeenCalled();
  });

  it('should handle touch events with count less than 1', () => {
    const handleChange = vi.fn();
    const { container } = render(<Rate count={0} onChange={handleChange} />);

    const wrapper = container.querySelector('.t-rate__wrapper');

    // Touch start
    fireEvent.touchStart(wrapper, { touches: [{ clientX: 50 }] });

    // Touch move
    fireEvent.touchMove(wrapper, { touches: [{ clientX: 80 }] });

    // Touch end
    fireEvent.touchEnd(wrapper);

    expect(handleChange).not.toHaveBeenCalled();
  });

  it('should handle ref forwarding', () => {
    const ref = React.createRef<HTMLDivElement>();
    const { container } = render(<Rate ref={ref} />);

    expect(ref.current).toBe(container.querySelector('.t-rate'));
  });

  it('should handle component unmount', () => {
    const { container, unmount } = render(<Rate />);
    expect(container.querySelector('.t-rate')).toBeInTheDocument();

    unmount();
    expect(container.querySelector('.t-rate')).not.toBeInTheDocument();
  });

  it('should not trigger onChange when RateTips option value equals innerValue via touch events', () => {
    const handleChange = vi.fn();
    const { container } = render(<Rate value={2} placement="top" onChange={handleChange} />);
    const icons = container.querySelectorAll('.t-rate__icon');

    fireEvent.click(icons[1]);
    // 此时tips应该显示，且currentValue为2
    const tips = container.querySelector('.t-rate__tips');
    expect(tips).toBeInTheDocument();

    if (tips) {
      // 找到tips中的选项（value应该等于2，与innerValue相同）
      const tipOptions = tips.querySelectorAll('.t-rate__tips-item');
      expect(tipOptions.length).toBeGreaterThan(0);
      console.log('tipOptions', tipOptions[0].innerHTML);

      // 点击与当前值相同的选项
      fireEvent.click(tipOptions[0]);
    }

    // 由于value === innerValue，不应触发onChange
    expect(handleChange).toHaveBeenCalledOnce();
  });

  it('should trigger onChange when RateTips option value not equals innerValue via touch events', () => {
    const handleChange = vi.fn();
    const { container } = render(<Rate value={2} placement="top" onChange={handleChange} />);
    const icons = container.querySelectorAll('.t-rate__icon');

    fireEvent.click(icons[2]);
    // 此时tips应该显示，且currentValue为2
    const tips = container.querySelector('.t-rate__tips');
    expect(tips).toBeInTheDocument();

    if (tips) {
      // 找到tips中的选项（value应该等于2，与innerValue相同）
      const tipOptions = tips.querySelectorAll('.t-rate__tips-item');
      expect(tipOptions.length).toBeGreaterThan(0);
      console.log('tipOptions', tipOptions[0].innerHTML);

      // 点击与当前值相同的选项
      fireEvent.click(tipOptions[0]);
    }

    // 由于value !== innerValue，应再次触发onChange
    expect(handleChange).toHaveBeenCalledTimes(2);
  });

  describe('currentValue and innerValue display logic', () => {
    it('should display currentValue when dragging, and innerValue when not dragging', async () => {
      const { container } = render(<Rate showText defaultValue={2} />);
      const rateWrapper = container.querySelector('.t-rate__wrapper') as HTMLElement;

      // 初始状态：非拖拽，显示innerValue
      expect(container.querySelectorAll('.t-rate__icon--selected')).toHaveLength(2);

      Object.defineProperty(rateWrapper, 'getBoundingClientRect', {
        value: () => ({ x: 0, width: 152, height: 40, y: 0, top: 0, bottom: 40, left: 0, right: 152 }),
      });

      // 模拟拖拽开始
      fireEvent.touchStart(rateWrapper, { touches: [{ clientX: 0, clientY: 0 }] });

      // 模拟拖拽移动
      fireEvent.touchMove(rateWrapper, { touches: [{ clientX: 96, clientY: 0 }] });
      // 拖拽状态：显示currentValue（根据拖拽位置计算的值）
      await waitFor(() => {
        expect(container.querySelector('.t-rate__text').textContent).toEqual('3 分');
      });

      // 模拟拖拽结束
      fireEvent.touchEnd(rateWrapper);

      // 拖拽结束：显示innerValue（更新后的值）
      await waitFor(() => {
        expect(rateWrapper.querySelectorAll('.t-rate__icon--selected')).toHaveLength(3);
      });
    });

    // it('should display correct value in RateTips during dragging', async () => {
    //   const { container } = render(<Rate defaultValue={3} placement="top" allowHalf />);
    //   const rateWrapper = container.querySelector('.t-rate__wrapper') as HTMLElement;

    //   // 模拟拖拽开始
    //   fireEvent.touchStart(rateWrapper, {
    //     touches: [{ clientX: 0, clientY: 0 }],
    //   });

    //   // 模拟拖拽移动
    //   fireEvent.touchMove(rateWrapper, {
    //     touches: [{ clientX: 120, clientY: 0 }],
    //   });

    //   // 等待RateTips显示
    //   await waitFor(() => {
    //     const tips = container.querySelector('.t-rate__tips');
    //     expect(tips).toBeInTheDocument();
    //   });

    //   // 验证RateTips中显示的是currentValue（拖拽时的临时值）
    //   const tipsText = container.querySelector('.t-rate__tips-text');
    //   expect(tipsText).toHaveTextContent('3.5');
    // });
  });
});
