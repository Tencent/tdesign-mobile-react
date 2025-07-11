import { glob } from 'glob';
import MockDate from 'mockdate';
import React from 'react';
import { vi } from 'vitest';
import { render } from '@test/utils';
import { BrowserRouter as Router } from 'react-router-dom';
import { IGNORE_ASYNC_EXAMPLE_LIST } from './ssr.test';

// 固定时间，当使用 new Date() 时，返回固定时间，防止“当前时间”的副作用影响，导致 snapshot 变更，mockDate 插件见 https://github.com/boblauer/MockDate
MockDate.set('2020-12-28 00:00:00');

class ResizeObserver {
  observe() {
    return this;
  }

  unobserve() {
    return this;
  }

  disconnect() {
    return this;
  }
}

function runTest() {
  const files = glob.sync('src/**/_example/*.tsx', {
    ignore: IGNORE_ASYNC_EXAMPLE_LIST,
  });

  describe('csr snapshot test', () => {
    HTMLCanvasElement.prototype.getContext = vi.fn();
    global.ResizeObserver = ResizeObserver;

    files.forEach((file) => {
      it(`csr test ${file}`, async () => {
        const demo = await import(`../../${file}`);
        const RealDemoComp = demo.default ? demo.default : demo;
        const { container } = render(
          <Router>
            <RealDemoComp />
          </Router>,
        );
        expect(container).toMatchSnapshot();
      });
    });
  });
}

runTest();
