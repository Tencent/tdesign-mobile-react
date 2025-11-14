import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import wrapperRaf from '../raf';

describe('ImageViewer raf utils', () => {
  const originalRAF = globalThis.window?.requestAnimationFrame;
  const originalCancelRAF = globalThis.window?.cancelAnimationFrame;

  beforeEach(() => {
    // 使用 setTimeout 模拟 rAF，便于用 fake timers 精确推进
    vi.useFakeTimers();
    if (typeof window !== 'undefined') {
      // @ts-expect-error override for test
      window.requestAnimationFrame = (cb: FrameRequestCallback) => setTimeout(cb as TimerHandler, 16) as unknown as number;
      // @ts-expect-error override for test
      window.cancelAnimationFrame = (id: number) => clearTimeout(id as unknown as number);
    }
  });

  afterEach(() => {
    vi.useRealTimers();
    if (typeof window !== 'undefined') {
      // 还原 rAF
      // @ts-expect-error restore
      window.requestAnimationFrame = originalRAF as any;
      // @ts-expect-error restore
      window.cancelAnimationFrame = originalCancelRAF as any;
    }
  });

  it('executes callback after specified times (recursive raf)', () => {
    const cb = vi.fn();

    // 需要递归 3 次后执行
    const id = wrapperRaf(cb, 3);
    expect(typeof id).toBe('number');

    // 第一次 tick
    vi.advanceTimersByTime(16);
    expect(cb).not.toHaveBeenCalled();

    // 第二次 tick
    vi.advanceTimersByTime(16);
    expect(cb).not.toHaveBeenCalled();

    // 第三次 tick 后应执行
    vi.advanceTimersByTime(16);
    expect(cb).toHaveBeenCalledTimes(1);

    // ids 中应清理
    // @ts-expect-error ids 在非 production 下可用
    const ids: Map<number, number> | undefined = typeof wrapperRaf.ids === 'function' ? wrapperRaf.ids() : undefined;
    if (ids) {
      expect(ids.size).toBe(0);
    }
  });

  it('cancel prevents callback execution and cleans ids', () => {
    const cb = vi.fn();

    const id = wrapperRaf(cb, 2);
    // 注册后 ids 应有记录
    // @ts-expect-error ids 在非 production 下可用
    const idsBefore: Map<number, number> | undefined = typeof wrapperRaf.ids === 'function' ? wrapperRaf.ids() : undefined;
    if (idsBefore) {
      expect(idsBefore.size).toBeGreaterThan(0);
      expect(idsBefore.has(id)).toBe(true);
    }

    // 取消
    wrapperRaf.cancel(id);

    // 推进足够的时间，确保原本的两个 tick 都过去
    vi.advanceTimersByTime(40);
    expect(cb).not.toHaveBeenCalled();

    // ids 应清理对应 id
    // @ts-expect-error ids 在非 production 下可用
    const idsAfter: Map<number, number> | undefined = typeof wrapperRaf.ids === 'function' ? wrapperRaf.ids() : undefined;
    if (idsAfter) {
      expect(idsAfter.has(id)).toBe(false);
    }
  });

  it('tracks ids during scheduling and clears after execution', () => {
    const cb1 = vi.fn();
    const cb2 = vi.fn();

    const id1 = wrapperRaf(cb1, 1);
    const id2 = wrapperRaf(cb2, 2);

    // 两次注册后，ids 应包含两个 key（至少包含 id2，因为 id1 会在下一 tick 执行并清理）
    // @ts-expect-error ids 在非 production 下可用
    const idsMid: Map<number, number> | undefined = typeof wrapperRaf.ids === 'function' ? wrapperRaf.ids() : undefined;
    if (idsMid) {
      expect(idsMid.size).toBeGreaterThan(0);
      expect(idsMid.has(id2)).toBe(true);
    }

    // 推进 16ms，cb1 执行并清理其 id
    vi.advanceTimersByTime(16);
    expect(cb1).toHaveBeenCalledTimes(1);

    // 此时 ids 仍应包含 id2
    // @ts-expect-error ids 在非 production 下可用
    const idsStill: Map<number, number> | undefined = typeof wrapperRaf.ids === 'function' ? wrapperRaf.ids() : undefined;
    if (idsStill) {
      expect(idsStill.has(id2)).toBe(true);
    }

    // 再推进 16ms，cb2 执行并清理
    vi.advanceTimersByTime(16);
    expect(cb2).toHaveBeenCalledTimes(1);

    // 所有执行完毕后，ids 应为空或不包含 id1/id2
    // @ts-expect-error ids 在非 production 下可用
    const idsDone: Map<number, number> | undefined = typeof wrapperRaf.ids === 'function' ? wrapperRaf.ids() : undefined;
    if (idsDone) {
      expect(idsDone.has(id1)).toBe(false);
      expect(idsDone.has(id2)).toBe(false);
    }
  });
});
