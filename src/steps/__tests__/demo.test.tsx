import { describe, expect, render, it } from '@test/utils';
import React from 'react';

import horizontalDemo from '../_example/horizontal';
import verticalDemo from '../_example/vertical';
import statusDemo from '../_example/status';
import specialDemo from '../_example/special';

const mapper = {
  horizontalDemo,
  verticalDemo,
  statusDemo,
  specialDemo,
};

describe('Steps', () => {
  Object.keys(mapper).forEach((item) => {
    it(`Steps ${item} demo`, () => {
      const DemoComponent = mapper[item];
      const { container } = render(<DemoComponent />);
      expect(container.firstChild).toMatchSnapshot();
    });
  });
});
