import React from 'react';
import { render } from '@test/utils';
import Button from '../Button';

describe('Button 组件测试', () => {
  const ButtonText = '按钮组件';
  test('content', async () => {
    const { queryByText } = render(<Button content={ButtonText} />);
    expect(queryByText(ButtonText)).toBeInTheDocument();
  });
});
