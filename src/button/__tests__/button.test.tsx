import React from 'react';
import { testExamples, render } from '@test/utils';
import Button from '../Button';

// 测试组件代码 Example 快照
testExamples(__dirname);

describe('Button 组件测试', () => {
  const ButtonText = '按钮组件';
  test('content', async () => {
    const { queryByText } = render(<Button content={ButtonText} />);
    expect(queryByText(ButtonText)).toBeInTheDocument();
  });
});
