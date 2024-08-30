import React from 'react';
import { describe, it, expect, render } from '@test/utils';

import SideBar from '../SideBar';

describe('SideBar 组件测试', () => {
  const SideBarText = 'SideBar组件';
  it('content', async () => {
    const { queryByText } = render(<SideBar />);
    expect(queryByText(SideBarText)).toMatchSnapshot();
  });
});
