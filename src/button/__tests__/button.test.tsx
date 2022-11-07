import React from 'react';
import { render } from '@test/utils';
import Button from '../Button';

// 测试组件代码 Example 快照
// testExamples(__dirname);
const prefix = 't';
const name = `${prefix}-button`;
// const SIZE_CLASSNAMES = {
//   small: `${prefix}-size-s`,
//   medium: `${prefix}-size-m`,
//   large: `${prefix}-size-l`,
// };
const TEXT = 'tdesign-mobile-vue';

describe('Button 组件测试', () => {
  describe('props', () => {
    it(': theme', async () => {
      const { rerender, container } = render(<Button>{TEXT}</Button>);
      const buttonNode = container.querySelector('.t-button');
      expect(buttonNode.textContent.trim()).toBe(TEXT);
      await rerender(<Button theme="danger">{TEXT}</Button>);
      const dangerBtn = container.querySelector('.t-button');
      expect(dangerBtn.classList.contains(`${name}-danger`)).toBeTruthy();
    });
  });
});
