import '@testing-library/jest-dom';
import { fireEvent, render, waitFor } from '@testing-library/react';
import React from 'react';
import { describe, expect, it, vi } from 'vitest';
import Image from '../Image';

describe('Image Component', () => {
  // 基本渲染测试
  it('使用默认props渲染', () => {
    const { getByRole } = render(<Image src="test.png" />);
    expect(getByRole('img')).toBeInTheDocument();
  });

  // 属性测试
  it('渲染带 alt 和 src 的图片', () => {
    const { getByAltText } = render(<Image alt="测试图片" src="test.png" />);
    expect(getByAltText('测试图片')).toHaveAttribute('src', 'test.png');
  });

  it('渲染不同形状的图片', () => {
    const shapes = ['circle', 'round', 'square'] as const;
    shapes.forEach((shape) => {
      const { container } = render(<Image shape={shape} src="test.png" />);
      expect(container.firstChild).toHaveClass(`t-image--${shape}`);
    });
  });

  it('渲染填充模式为 cover 的图片', () => {
    const { container } = render(<Image fit="cover" src="test.png" />);
    const img = container.querySelector('.t-image__img');
    expect(img).toHaveClass('t-image--fit-cover');
  });

  it('设置 position 属性', () => {
    const { getByRole } = render(<Image position="top center" src="test.png" />);
    expect(getByRole('img')).toHaveClass('t-image--position-top center');
  });

  it('设置 referrerpolicy 属性', () => {
    const { getByRole } = render(<Image referrerpolicy="no-referrer" src="test.png" />);
    expect(getByRole('img')).toHaveAttribute('referrerPolicy', 'no-referrer');
  });

  // 加载状态测试
  it('显示自定义加载中状态', () => {
    const { container } = render(<Image loading={<span>加载中...</span>} />);
    expect(container.textContent).toContain('加载中');
  });

  it('显示默认加载中状态', () => {
    const { container } = render(<Image />);
    expect(container.querySelector('.t-loading')).toBeInTheDocument();
  });

  // 错误状态测试
  it('处理图片加载失败时触发 onError', async () => {
    const onError = vi.fn();
    const { getByRole } = render(
      <Image src="invalid.png" fallback="fallback.png" onError={onError} />
    );
    const img = getByRole('img');
    fireEvent.error(img);
    
    await waitFor(() => {
      expect(onError).toHaveBeenCalled();
    });
  });

  it('显示自定义错误内容', async () => {
    const { getByRole, getByText } = render(
      <Image src="invalid.png" error={<span>加载失败</span>} />
    );
    const img = getByRole('img');
    fireEvent.error(img);
    
    await waitFor(() => {
      expect(getByText('加载失败')).toBeInTheDocument();
    });
  });

  // 事件处理测试
  it('处理图片加载完成事件', async () => {
    const onLoad = vi.fn();
    const { getByRole } = render(<Image src="test.png" onLoad={onLoad} />);
    const img = getByRole('img');
    fireEvent.load(img);
    
    await waitFor(() => {
      expect(onLoad).toHaveBeenCalled();
    });
  });

  // srcset 测试
  it('渲染带 srcset 的图片', () => {
    const srcset = {
      'image/avif': 'test.avif',
      'image/webp': 'test.webp'
    };
    const { getByRole, container } = render(<Image src="test.jpg" srcset={srcset} />);
    
    const avifSource = container.querySelector('source[type="image/avif"]');
    const webpSource = container.querySelector('source[type="image/webp"]');
    expect(avifSource).toHaveAttribute('srcset', 'test.avif');
    expect(webpSource).toHaveAttribute('srcset', 'test.webp');
    expect(getByRole('img')).toHaveAttribute('src', 'test.jpg');
  });

  // 懒加载测试
  it('支持懒加载', () => {
    // 模拟 IntersectionObserver
    const observe = vi.fn();
    const unobserve = vi.fn();
    global.IntersectionObserver = vi.fn(() => ({
      observe,
      unobserve,
    })) as any;

    const { container } = render(<Image src="test.png" lazy />);
    
    // 验证 IntersectionObserver 被正确初始化并使用
    expect(global.IntersectionObserver).toHaveBeenCalled();
    expect(observe).toHaveBeenCalledWith(container.firstElementChild);
    
    // 清理 mock
    delete global.IntersectionObserver;
  });
});
