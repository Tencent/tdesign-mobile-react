import { useEffect, RefObject, useCallback } from 'react';
import { useTouch } from './useTouch';
import getScrollParent from './getScrollParent';
import { supportsPassive } from './supportsPassive';

let totalLockCount = 0;

// 移植自vant：https://github.com/youzan/vant/blob/HEAD/src/composables/use-lock-scroll.ts
export function useLockScroll(rootRef: RefObject<HTMLElement>, shouldLock: boolean, lockClass: string) {
  const touch = useTouch();

  const onTouchMove = useCallback(
    (event: TouchEvent) => {
      touch.move(event);

      const direction = touch.deltaY.current > 0 ? '10' : '01';
      const el = getScrollParent(event.target as Element, rootRef.current) as HTMLElement;
      if (!el) return;
      const { scrollHeight, offsetHeight, scrollTop } = el;
      let status = '11';

      if (scrollTop === 0) {
        status = offsetHeight >= scrollHeight ? '00' : '01';
      } else if (scrollTop + offsetHeight >= scrollHeight) {
        status = '10';
      }

      if (status !== '11' && touch.isVertical() && !(parseInt(status, 2) & parseInt(direction, 2))) {
        if (event.cancelable) {
          event.preventDefault();
        }
      }
    },
    [rootRef, touch],
  );

  const lock = useCallback(() => {
    document.addEventListener('touchstart', touch.start);
    document.addEventListener('touchmove', onTouchMove, supportsPassive ? { passive: false } : false);

    if (!totalLockCount) {
      document.body.classList.add(lockClass);
    }

    totalLockCount += 1;
  }, [onTouchMove, touch.start, lockClass]);

  const unlock = useCallback(() => {
    if (totalLockCount) {
      document.removeEventListener('touchstart', touch.start);
      document.removeEventListener('touchmove', onTouchMove);

      totalLockCount -= 1;

      if (!totalLockCount) {
        document.body.classList.remove(lockClass);
      }
    }
  }, [onTouchMove, touch.start, lockClass]);

  useEffect(() => {
    if (shouldLock) {
      lock();
      return () => {
        unlock();
      };
    }
  }, [shouldLock, lock, unlock]);
}
