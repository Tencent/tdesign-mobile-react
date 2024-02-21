import glob from 'glob';
import { vi } from 'vitest';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { IGNORE_ASYNC_EXAMPLE_LIST } from './const';

function runTest() {
  const files = glob.sync('src/**/_example/*.jsx', {
    ignore: IGNORE_ASYNC_EXAMPLE_LIST,
  });

  vi.mock('react-dom', async () => ({
    ...(await vi.importActual('react-dom')),
    createPortal: (node) => node,
  }));

  describe('ssr snapshot test', () => {
    files.forEach((file) => {
      it(`ssr test ${file}`, async () => {
        const demo = await import(`../../${file}`);
        const RealDemoComp = demo.default ? demo.default : demo;
        const html = renderToString(<RealDemoComp />);
        expect(html).toMatchSnapshot();
      });
    });
  });
}

runTest();
