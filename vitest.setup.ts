/* eslint-disable @typescript-eslint/no-empty-function */
// import 'vitest-axe/extend-expect';
import { expect } from 'vitest';
import * as matchers from '@testing-library/jest-dom/matchers';

import '@testing-library/jest-dom/vitest';
import MockDate from 'mockdate';

expect.extend(matchers);

const { getComputedStyle } = window;

// 固定时间，当使用 new Date() 时，返回固定时间，防止“当前时间”的副作用影响，导致 snapshot 变更，mockdate 插件见 https://github.com/boblauer/MockDate
MockDate.set('2020-12-28 00:00:00');

window.getComputedStyle = (elt) => getComputedStyle(elt);
window.Element.prototype.scrollTo = () => {};
window.scrollTo = () => {};

global.ResizeObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));

window.HTMLCanvasElement.prototype.getContext = vi.fn().mockImplementation(() => ({}));
