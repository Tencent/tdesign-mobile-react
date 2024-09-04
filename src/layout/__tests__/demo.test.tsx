import { describe, expect, render, it } from '@test/utils';

import baseDemo from '../_example/base';
import indexDemo from '../_example/index';
import offsetDemo from '../_example/offset';

const mapper = {
  baseDemo,
  indexDemo,
  offsetDemo,
};

describe('Col', () => {
  Object.keys(mapper).forEach((demoName) => {
    it(`Col ${demoName} demo works fine`, () => {
      const { container } = render(mapper[demoName]);

      expect(container.firstChild).toMatchSnapshot();
    });
  });
});
