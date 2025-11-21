import React from 'react';
import { describe, it, expect, render, act } from '@test/utils';
import { vi } from 'vitest';
import { useImageTransform, type TransformType, type TransformAction } from '../transform';

type Api = {
  get: () => TransformType;
  reset: (action?: TransformAction) => void;
  update: (partial: Partial<TransformType>, action: TransformAction) => void;
  zoom: (ratio: number, action: TransformAction, isTouch?: boolean) => void;
};

function Harness({ onApi, onTransform }: { onApi: (api: Api) => void; onTransform?: (info: { transform: TransformType; action: TransformAction }) => void }) {
  const { transform, resetTransform, updateTransform, dispatchZoomChange } = useImageTransform(1, 3, onTransform);
  React.useEffect(() => {
    onApi({
      get: () => transform,
      reset: (action = 'reset') => resetTransform(action),
      update: (partial, action) => updateTransform(partial, action),
      zoom: (ratio, action, isTouch) => dispatchZoomChange(ratio, action, isTouch),
    });
  }, [transform, resetTransform, updateTransform, dispatchZoomChange, onApi]);
  return null;
}

describe('useImageTransform', () => {
  it('dispatchZoomChange clamps to maxScale and respects minScale when not touch', () => {
    vi.useFakeTimers();
    const onTransform = vi.fn();
    let api: Api;
    render(<Harness onApi={(a) => (api = a)} onTransform={onTransform} />);

    // 放大：ratio=10 -> scale 3（max）
    act(() => {
      api.zoom(10, 'zoomIn');
      vi.advanceTimersByTime(20);
    });
    expect(api.get().scale).toBe(3);

    // 缩小到低于 minScale：ratio=0.1（3 * 0.1 = 0.3）非触摸 => clamp 到 minScale=1
    act(() => {
      api.zoom(0.1, 'zoomOut', false);
      vi.advanceTimersByTime(20);
    });
    expect(api.get().scale).toBe(1);

    vi.useRealTimers();
  });

  it('dispatchZoomChange allows below minScale when isTouch=true', () => {
    vi.useFakeTimers();
    const onTransform = vi.fn();
    let api: Api;
    render(<Harness onApi={(a) => (api = a)} onTransform={onTransform} />);

    // 触摸缩小：ratio=0.5 -> scale 0.5（低于 min 但保留）
    act(() => {
      api.zoom(0.5, 'touchZoom', true);
      vi.advanceTimersByTime(20);
    });
    expect(api.get().scale).toBe(0.5);

    vi.useRealTimers();
  });

  it('resetTransform dispatches only when state changed; close reset returns initial state', () => {
    vi.useFakeTimers();
    const onTransform = vi.fn();
    let api: Api;
    render(<Harness onApi={(a) => (api = a)} onTransform={onTransform} />);

    // 初始 reset：状态未变化 => 不触发 onTransform
    act(() => {
      api.reset('reset');
      vi.advanceTimersByTime(20);
    });
    expect(onTransform).not.toHaveBeenCalled();

    // 更新后再 reset：断言 transform 恢复到初始值
    act(() => {
      api.update({ x: 10, y: 20, scale: 2 }, 'move');
      vi.advanceTimersByTime(20);
      api.reset('close');
      vi.advanceTimersByTime(20);
    });

    const t = api.get();
    expect(t).toMatchObject({ x: 0, y: 0, rotate: 0, scale: 1, flipX: false, flipY: false });

    vi.useRealTimers();
  });

  it('updateTransform batches multiple updates into single onTransform via raf queue', () => {
    vi.useFakeTimers();
    const onTransform = vi.fn();
    let api: Api;
    render(<Harness onApi={(a) => (api = a)} onTransform={onTransform} />);

    // 连续调用 updateTransform，推进 raf 后仅一次 onTransform 合并状态
    act(() => {
      api.update({ x: 1 }, 'move');
      api.update({ y: 2 }, 'move');
      api.update({ scale: 1.5 }, 'move');
      vi.advanceTimersByTime(20);
    });

    expect(api.get()).toMatchObject({ x: 1, y: 2, scale: 1.5 });
    expect(onTransform).toHaveBeenCalledTimes(1);

    vi.useRealTimers();
  });
});
