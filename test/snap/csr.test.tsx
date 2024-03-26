import glob from 'glob';
import React from 'react';
import { render } from '@test/utils';
import { IGNORE_ASYNC_EXAMPLE_LIST } from './const';

function runTest() {
  const files = glob.sync('src/**/_example/*.jsx', {
    ignore: IGNORE_ASYNC_EXAMPLE_LIST,
  });

  describe('csr snapshot test', () => {
    files.forEach((file) => {
      it(`csr test ${file}`, async () => {
        const demo = await import(`../../${file}`);
        const RealDemoComp = demo.default ? demo.default : demo;
        const wrapper = render(<RealDemoComp />);
        expect(wrapper).toMatchSnapshot();
      });
    });
  });
}

runTest();
