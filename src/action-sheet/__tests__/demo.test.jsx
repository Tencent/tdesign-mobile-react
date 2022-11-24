import React from 'react';
import { testExamples, render } from '@test/utils';
// import ActionSheet from '../ActionSheet';
import {ActionSheet} from 'tdesign-mobile-react';

// 测试组件代码 Example 快照
testExamples(__dirname);

describe('ActionSheet 列表测试', () => {
    const items = [
        {label: '默认按钮'},
        {label: '自定义按钮', color: '#0052D9'},
    ];
    const open = true;
    test('content', async () => {
        const as = render(<ActionSheet visible={open} type='list' items={items}/>);
        expect(as).toMatchSnapshot();
    });
});
