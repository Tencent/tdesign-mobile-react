import React from 'react';
import { describe, it, expect, render, screen } from '@test/utils';
import { RateText } from '../RateText';

describe('RateText', () => {
  it('should render text with value', () => {
    render(<RateText value={3} texts={undefined} />);
    expect(screen.getByText('3 分')).toBeInTheDocument();
  });

  it('should render no value text when value is 0', () => {
    render(<RateText value={0} texts={undefined} />);
    expect(screen.getByText('未评分')).toBeInTheDocument();
  });

  it('should render custom texts array', () => {
    const texts = ['很差', '差', '一般', '好', '很好'];
    render(<RateText value={3} texts={texts} />);
    expect(screen.getByText('一般')).toBeInTheDocument();
  });

  it('should apply active class when value > 0', () => {
    const { container } = render(<RateText value={3} texts={undefined} />);
    const text = container.querySelector('.t-rate__text');
    expect(text).toHaveClass('t-rate__text--active');
  });

  it('should not apply active class when value is 0', () => {
    const { container } = render(<RateText value={0} texts={undefined} />);
    const text = container.querySelector('.t-rate__text');
    expect(text).not.toHaveClass('t-rate__text--active');
  });

  it('should handle texts array shorter than value', () => {
    const texts = ['很差', '差'];
    render(<RateText value={5} texts={texts} />);
    expect(screen.getByText('5 分')).toBeInTheDocument();
  });

  it('should handle empty texts array', () => {
    render(<RateText value={3} texts={[]} />);
    expect(screen.getByText('3 分')).toBeInTheDocument();
  });

  it('should handle undefined texts', () => {
    render(<RateText value={3} texts={undefined} />);
    expect(screen.getByText('3 分')).toBeInTheDocument();
  });

  it('should handle null texts', () => {
    render(<RateText value={3} texts={null as any} />);
    expect(screen.getByText('3 分')).toBeInTheDocument();
  });

  it('should handle string texts instead of array', () => {
    render(<RateText value={3} texts={'test' as any} />);
    expect(screen.getByText('3 分')).toBeInTheDocument();
  });

  it('should handle value at array boundary', () => {
    const texts = ['很差', '差', '一般', '好', '很好'];
    render(<RateText value={5} texts={texts} />);
    expect(screen.getByText('很好')).toBeInTheDocument();
  });

  it('should handle value at array start', () => {
    const texts = ['很差', '差', '一般', '好', '很好'];
    render(<RateText value={1} texts={texts} />);
    expect(screen.getByText('很差')).toBeInTheDocument();
  });

  it('should handle zero value with texts', () => {
    const texts = ['很差', '差', '一般', '好', '很好'];
    render(<RateText value={0} texts={texts} />);
    expect(screen.getByText('未评分')).toBeInTheDocument();
  });

  it('should handle negative value', () => {
    render(<RateText value={-1} texts={undefined} />);
    expect(screen.getByText('-1 分')).toBeInTheDocument();
  });

  it('should handle very large value', () => {
    render(<RateText value={100} texts={undefined} />);
    expect(screen.getByText('100 分')).toBeInTheDocument();
  });

  it('should handle decimal value', () => {
    render(<RateText value={2.5} texts={undefined} />);
    expect(screen.getByText('2.5 分')).toBeInTheDocument();
  });

  it('should handle empty string in texts array', () => {
    const texts = ['很差', '', '一般', '好', '很好'];
    render(<RateText value={2} texts={texts} />);
    expect(screen.getByText('2 分')).toBeInTheDocument();
  });

  it('should handle null in texts array', () => {
    const texts = ['很差', null as any, '一般', '好', '很好'];
    render(<RateText value={2} texts={texts} />);
    expect(screen.getByText('2 分')).toBeInTheDocument();
  });

  it('should handle undefined in texts array', () => {
    const texts = ['很差', undefined as any, '一般', '好', '很好'];
    render(<RateText value={2} texts={texts} />);
    expect(screen.getByText('2 分')).toBeInTheDocument();
  });

  it('should handle texts array with single element', () => {
    const texts = ['only one'];
    render(<RateText value={3} texts={texts} />);
    expect(screen.getByText('3 分')).toBeInTheDocument();
  });

  it('should handle texts array with exact matching indices', () => {
    const texts = ['1分', '2分', '3分'];
    render(<RateText value={2} texts={texts} />);
    expect(screen.getByText('2分')).toBeInTheDocument();
  });
});
