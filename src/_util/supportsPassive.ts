import { canUseDocument } from './dom';

// eslint-disable-next-line
export let supportsPassive = false;

if (canUseDocument) {
  try {
    const opts = {};
    Object.defineProperty(opts, 'passive', {
      get() {
        supportsPassive = true;
      },
    });
    window.addEventListener('test-passive', null as any, opts);
  } catch (e) {
    //
  }
}
