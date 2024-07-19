import React from 'react';
import { render } from '@test/utils';
import { describe, it, expect } from 'vitest';
import Button from '../Button';

describe('Button 组件测试', () => {
  const ButtonText = '按钮组件';
  it('content', async () => {
    const { queryByText } = render(<Button content={ButtonText} />);
    expect(queryByText(ButtonText)).toMatchSnapshot();
  });
});
