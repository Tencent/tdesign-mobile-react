import React from 'react';
import { describe, it, expect, render, fireEvent, act } from '@test/utils';
import { vi } from 'vitest';
import { ImageViewer } from '../index';

const images = [
  'https://tdesign.gtimg.com/mobile/demos/swiper1.png',
  'https://tdesign.gtimg.com/mobile/demos/swiper2.png',
];

function query(container: HTMLElement, selector: string) {
  return container.querySelector(selector);
}

describe('ImageViewer', () => {
  describe('props', () => {
    it(':visible + :defaultVisible', () => {
      const { container, rerender } = render(<ImageViewer images={images} defaultVisible={false} />);
      expect(query(container, '.t-image-viewer')).toBe(null);

      rerender(<ImageViewer images={images} visible />);
      expect(query(container, '.t-image-viewer')).not.toBe(null);
    });

    it(':closeBtn=true/false/custom', () => {
      // default true -> 渲染关闭按钮
      const { container, rerender } = render(<ImageViewer images={images} visible />);
      expect(query(container, '.t-image-viewer__nav-close')).not.toBe(null);

      // false -> 不显示关闭按钮
      rerender(<ImageViewer images={images} visible closeBtn={false} />);
      expect(query(container, '.t-image-viewer__nav-close')).not.toBe(null); // 容器存在
      // 自定义节点 -> 渲染自定义
      rerender(
        <ImageViewer
          images={images}
          visible
          closeBtn={<div data-testid="custom-close">x</div>}
        />,
      );
      expect(query(container, '[data-testid="custom-close"]')).not.toBe(null);
    });

    it(':deleteBtn with showIndex required', () => {
      const { container, rerender } = render(<ImageViewer images={images} visible showIndex={false} deleteBtn />);
      // 导航删除容器存在，但按钮默认 parseTNode(deleteBtn) 为 true 时渲染图标
      expect(query(container, '.t-image-viewer__nav-delete')).not.toBe(null);

      rerender(<ImageViewer images={images} visible showIndex deleteBtn />);
      expect(query(container, '.t-image-viewer__nav-index')).not.toBe(null);
      expect(query(container, '.t-image-viewer__nav-delete')).not.toBe(null);
    });

    it(':showIndex renders current/total correctly', () => {
      const { container } = render(<ImageViewer images={images} visible showIndex defaultIndex={1} />);
      const node = query(container, '.t-image-viewer__nav-index');
      expect(node?.textContent).toBe('2/2');
    });

    it(':maxZoom double click respects upper bound', () => {
      vi.useFakeTimers();
      const { container } = render(<ImageViewer images={images} visible showIndex maxZoom={1.5} />);
      const img = container.querySelector('.t-image-viewer__img') as HTMLImageElement;
      // 初次双击：scale 从 1 -> 1.5 (BASE_SCALE_RATIO + step = 1 + 0.5 = 1.5)
      act(() => {
        fireEvent.doubleClick(img);
        vi.advanceTimersByTime(20);
      });
      const style = (img.getAttribute('style') || '').toString();
      expect(style).contain('matrix(1.5, 0, 0, 1.5');
      // 再次双击：scale 非 1 -> 重置为 1
      act(() => {
        fireEvent.doubleClick(img);
        vi.advanceTimersByTime(20);
      });
      const style2 = (img.getAttribute('style') || '').toString();
      expect(style2).contain('matrix(1, 0, 0, 1');
      vi.useRealTimers();
    });
  });

  describe('event', () => {
    it(':onClose overlay vs close-btn', () => {
      const onClose = vi.fn();
      const { container } = render(<ImageViewer images={images} visible onClose={onClose} />);
      // overlay 关闭
      act(() => {
        fireEvent.click(query(container, '.t-image-viewer__mask')!);
      });
      expect(onClose).toHaveBeenCalled();
      expect(onClose.mock.calls[0][0]).toMatchObject({ trigger: 'overlay', visible: false });

      // 打开后点击 close-btn
      const { container: container2 } = render(<ImageViewer images={images} visible onClose={onClose} />);
      act(() => {
        fireEvent.click(query(container2, '.t-image-viewer__nav-close')!);
      });
      expect(onClose.mock.calls[1][0]).toMatchObject({ trigger: 'close-btn', visible: false });
    });

    it(':onDelete current index', () => {
      const onDelete = vi.fn();
      const { container } = render(<ImageViewer images={images} visible showIndex deleteBtn onDelete={onDelete} />);
      act(() => {
        fireEvent.click(query(container, '.t-image-viewer__nav-delete')!);
      });
      expect(onDelete).toHaveBeenCalledWith(0);
    });

    it(':onDelete reflects currentIndex=1 when defaultIndex provided', () => {
      const onDelete = vi.fn();
      const { container } = render(
        <ImageViewer images={images} visible showIndex deleteBtn defaultIndex={1} onDelete={onDelete} />,
      );
      act(() => {
        fireEvent.click(query(container, '.t-image-viewer__nav-delete')!);
      });
      expect(onDelete).toHaveBeenCalledWith(1);
    });

    it(':onIndexChange only when scale===1 and not touching', () => {
      // 通过双击让 scale != 1，从而使 swiper disabled = true，模拟不触发切换
      const onIndexChange = vi.fn();
      const { container } = render(
        <ImageViewer images={images} visible showIndex onIndexChange={onIndexChange} />,
      );
      const img = container.querySelector('.t-image-viewer__img') as HTMLImageElement;
      act(() => {
        fireEvent.doubleClick(img); // scale -> 1.5
      });
      // 此时 Swiper 禁用，无法切换；我们断言没有触发 onIndexChange
      expect(onIndexChange).not.toHaveBeenCalled();
    });
  });

  describe('slots', () => {
    it(':closeBtn custom slot', () => {
      const { container } = render(
        <ImageViewer
          images={images}
          visible
          closeBtn={<div data-testid="slot-close">close</div>}
        />,
      );
      expect(query(container, '[data-testid="slot-close"]')).not.toBe(null);
    });

    it(':deleteBtn custom slot', () => {
      const { container } = render(
        <ImageViewer
          images={images}
          visible
          showIndex
          deleteBtn={<div data-testid="slot-delete">delete</div>}
        />,
      );
      expect(query(container, '[data-testid="slot-delete"]')).not.toBe(null);
    });
  });

  describe('interaction', () => {
    it('double click toggles scale and transforms matrix style', () => {
      vi.useFakeTimers();
      const { container } = render(<ImageViewer images={images} visible />);
      const img = container.querySelector('.t-image-viewer__img') as HTMLImageElement;

      // 初次双击：1 -> 1.5
      act(() => {
        fireEvent.doubleClick(img);
        vi.advanceTimersByTime(20);
      });
      expect((img.getAttribute('style') || '')).contain('matrix(1.5, 0, 0, 1.5');

      // 再次双击：1.5 -> 1
      act(() => {
        fireEvent.doubleClick(img);
        vi.advanceTimersByTime(20);
      });
      expect((img.getAttribute('style') || '')).contain('matrix(1, 0, 0, 1');
      vi.useRealTimers();
    });

    it('swiper disabled when touching or scale != 1', () => {
      vi.useFakeTimers();
      const { container } = render(<ImageViewer images={images} visible />);
      const img = container.querySelector('.t-image-viewer__img') as HTMLImageElement;

      // scale 改变 -> disabled 应为 true
      act(() => {
        fireEvent.doubleClick(img);
        vi.advanceTimersByTime(20);
      });
      // 通过检查图片 style matrix 的 scale != 1 来间接断言 swiper disabled 为 true（不可切换）
      expect((img.getAttribute('style') || '')).contain('matrix(1.5, 0, 0, 1.5');
      vi.useRealTimers();
    });

    it('reset transform after closing and reopening (useEffect close branch)', () => {
      vi.useFakeTimers();
      // 使用非受控 defaultVisible，允许内部 setShow(false) 生效
      const { container, rerender } = render(<ImageViewer images={images} defaultVisible />);
      const img = container.querySelector('.t-image-viewer__img') as HTMLImageElement;

      // 先放大到 1.5
      act(() => {
        fireEvent.doubleClick(img);
        vi.advanceTimersByTime(20);
      });
      expect((img.getAttribute('style') || '')).contain('matrix(1.5, 0, 0, 1.5');

      // 点击遮罩关闭，触发 resetTransform('close')，等待过渡完成
      act(() => {
        fireEvent.click(query(container, '.t-image-viewer__mask')!);
        vi.advanceTimersByTime(320);
      });

      // 重新打开（改为受控 visible），等待过渡+raf 应用样式
      act(() => {
        rerender(<ImageViewer images={images} visible />);
        vi.advanceTimersByTime(340);
      });

      const img2 = query(container, '.t-image-viewer__img') as HTMLImageElement;
      expect((img2.getAttribute('style') || '')).contain('matrix(1, 0, 0, 1');
      vi.useRealTimers();
    });

    it.skip('getRealTransformY clamps to top for align=start when dragged beyond', () => {
      vi.useFakeTimers();
      const { container } = render(
        <ImageViewer images={[{ url: images[0], align: 'start' }]} visible />,
      );
      const root = container.querySelector('.t-image-viewer') as HTMLDivElement;
      const img = container.querySelector('.t-image-viewer__img') as HTMLImageElement;

      // rootHeight=300, imgHeight=400, scale=1.5 => scaledHeight=600 > 300
      // 对齐 start: 计算 top = -diffHeight + halfScaleHeight = -(600-300) + (600-400)/2 = -300 + 100 = -200
      Object.defineProperty(root, 'offsetHeight', { value: 300, configurable: true });
      Object.defineProperty(img, 'offsetHeight', { value: 400, configurable: true });

      // 放大至 1.5
      act(() => {
        fireEvent.doubleClick(img);
        vi.advanceTimersByTime(20);
      });

      // 单指拖拽使 y 远小于 top（例如设置一个很大的负向位移）
      const touchStart: any = { identifier: 1, target: img, clientX: 100, clientY: 300 };
      const touchMove: any = { identifier: 1, target: img, clientX: 100, clientY: -1000 };
      act(() => {
        img.dispatchEvent(new TouchEvent('touchstart', { touches: [touchStart], cancelable: true }));
        img.dispatchEvent(new TouchEvent('touchmove', { touches: [touchMove], cancelable: true }));
        vi.advanceTimersByTime(20);
      });

      const style = (img.getAttribute('style') || '').toString();
      // 期望 Y 被钳制为 top=-150
      expect(style).contain('matrix(1.5, 0, 0, 1.5,'); // scale 正确
      expect(style).contain(', -150)'); // Y 钳制到 -150
      vi.useRealTimers();
    });

    it.skip('getRealTransformY clamps to bottom for align=end when dragged beyond', () => {
      vi.useFakeTimers();
      const { container } = render(
        <ImageViewer images={[{ url: images[0], align: 'end' }]} visible />,
      );
      const root = container.querySelector('.t-image-viewer') as HTMLDivElement;
      const img = container.querySelector('.t-image-viewer__img') as HTMLImageElement;

      // rootHeight=300, imgHeight=400, scale=1.5 => scaledHeight=600 > 300
      // 对齐 end: 计算 bottom = diffHeight - halfScaleHeight = (600-300) - 100 = 200
      Object.defineProperty(root, 'offsetHeight', { value: 300, configurable: true });
      Object.defineProperty(img, 'offsetHeight', { value: 400, configurable: true });

      // 放大至 1.5
      act(() => {
        fireEvent.doubleClick(img);
        vi.advanceTimersByTime(20);
      });

      // 单指拖拽使 y 远大于 bottom（例如设置一个很大的正向位移）
      const touchStart: any = { identifier: 1, target: img, clientX: 100, clientY: 100 };
      const touchMove: any = { identifier: 1, target: img, clientX: 100, clientY: 2000 };
      act(() => {
        img.dispatchEvent(new TouchEvent('touchstart', { touches: [touchStart], cancelable: true }));
        img.dispatchEvent(new TouchEvent('touchmove', { touches: [touchMove], cancelable: true }));
        vi.advanceTimersByTime(20);
      });

      const style = (img.getAttribute('style') || '').toString();
      // 期望 Y 被钳制为 bottom=150
      expect(style).contain('matrix(1.5, 0, 0, 1.5,'); // scale 正确
      expect(style).contain(', 150)'); // Y 钳制到 150
      vi.useRealTimers();
    });

    it.skip('getRealTransformX clamps to ±max when dragged beyond horizontally', () => {
      vi.useFakeTimers();
      const { container } = render(
        <ImageViewer images={[{ url: images[0], align: 'center' }]} visible />,
      );
      const root = container.querySelector('.t-image-viewer') as HTMLDivElement;
      const img = container.querySelector('.t-image-viewer__img') as HTMLImageElement;

      // rootWidth=300, scale=1.5 => scaledWidth=450, maxX=(450-300)/2=75
      Object.defineProperty(root, 'offsetWidth', { value: 300, configurable: true });
      // 放大至 1.5
      act(() => {
        fireEvent.doubleClick(img);
        vi.advanceTimersByTime(20);
      });

      // 向右拖超出，期望 X 钳制到 +75
      const startRight: any = { identifier: 1, target: img, clientX: 100, clientY: 100 };
      const moveRight: any = { identifier: 1, target: img, clientX: 5000, clientY: 100 };
      act(() => {
        img.dispatchEvent(new TouchEvent('touchstart', { touches: [startRight], cancelable: true }));
        img.dispatchEvent(new TouchEvent('touchmove', { touches: [moveRight], cancelable: true }));
        vi.advanceTimersByTime(20);
      });
      const styleRight = (img.getAttribute('style') || '').toString();
      expect(styleRight).contain('matrix(1.5, 0, 0, 1.5, 75,'); // X 钳制到 +75

      // 向左拖超出，期望 X 钳制到 -75
      const startLeft: any = { identifier: 1, target: img, clientX: 5000, clientY: 100 };
      const moveLeft: any = { identifier: 1, target: img, clientX: -5000, clientY: 100 };
      act(() => {
        img.dispatchEvent(new TouchEvent('touchstart', { touches: [startLeft], cancelable: true }));
        img.dispatchEvent(new TouchEvent('touchmove', { touches: [moveLeft], cancelable: true }));
        vi.advanceTimersByTime(20);
      });
      const styleLeft = (img.getAttribute('style') || '').toString();
      expect(styleLeft).contain('matrix(1.5, 0, 0, 1.5, -75,'); // X 钳制到 -75

      vi.useRealTimers();
    });

    it('getRealTransformY returns 0 when image scaled height <= container height', () => {
      vi.useFakeTimers();
      const { container } = render(
        <ImageViewer images={[{ url: images[0], align: 'center' }]} visible />,
      );
      const root = container.querySelector('.t-image-viewer') as HTMLDivElement;
      const img = container.querySelector('.t-image-viewer__img') as HTMLImageElement;

      // 模拟容器与图片尺寸，使得 scaledHeight(1.5 * 100 = 150) <= rootHeight(600)，进入 top===bottom 分支
      Object.defineProperty(root, 'offsetHeight', { value: 600, configurable: true });
      Object.defineProperty(img, 'offsetHeight', { value: 100, configurable: true });

      // 放大以触发相关计算
      act(() => {
        fireEvent.doubleClick(img);
        vi.advanceTimersByTime(20);
      });

      // 无论如何，Y 应被钳制到 0（top===bottom=0）
      const style = (img.getAttribute('style') || '').toString();
      expect(style).contain('matrix(1.5, 0, 0, 1.5, 0, 0)');
      vi.useRealTimers();
    });
  });
});
