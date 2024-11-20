import React from 'react';
import {render, fireEvent, screen,  } from '@test/utils';
import ActionSheet from '../ActionSheet';

describe('ActionSheet 组件测试', () => {

    describe('props', () => {
        it('type', async () =>{
            const {container} = render(<ActionSheet visible={true} type='list' items={[]} />);
            expect(container.getElementsByClassName('t-action-sheet__panel-list').length).toBe(1)
            const {container:recontainer} = render(<ActionSheet visible={true} type='grid' items={[]} />);
            expect(recontainer.getElementsByClassName('t-action-sheet__panel-grid').length).toBe(1)
        })

        it('cancelText', async () =>{
            const {container} = render(<ActionSheet visible={true} type='list' items={[]} />);
            expect(container.getElementsByClassName('t-action-sheet__action')[0].textContent).toBe('取消')
            const {container:recontainer} = render(<ActionSheet visible={true} type='list' items={[]} cancelText={'Cancel'}/>);
            expect(recontainer.getElementsByClassName('t-action-sheet__action')[0].textContent).toBe('Cancel')
        })

        it('showCancel', async () => {
            const {container} = render(<ActionSheet visible={true} type='list' items={[]} />);
            expect(container.getElementsByClassName('t-action-sheet__action').length).toBe(1)
            const {container:recontainer} = render(<ActionSheet visible={true} type='list' items={[]} showCancel={false}/>);
            expect(recontainer.getElementsByClassName('t-action-sheet__action').length).toBe(0)
        })

        it('items, count', async () =>{
            const items = [
                {label: '默认按钮'},
                {label: '自定义按钮', color: '#0052D9'},
                {label: '失效按钮', disabled: true},
                {label: '告警按钮', color: '#E34D59'},
            ];
            const {container} = render(<ActionSheet visible={true} type='grid' items={items} count={2} />);
            expect(container.getElementsByClassName('t-action-sheet__menu').length).toBe(2)
            const {container:recontainer} = render(<ActionSheet visible={true} type='grid' items={items} count={4} />);
            expect(recontainer.getElementsByClassName('t-action-sheet__menu').length).toBe(1)
        })

        it('visible', async () => {
            const {container} = render(<ActionSheet visible={true} type='list' items={[]} />);
            expect(container.getElementsByClassName('t-action-sheet__panel').length).toBe(1)
            const {container:recontainer} = render(<ActionSheet visible={false} type='list' items={[]}/>);
            expect(recontainer.getElementsByClassName('t-action-sheet__panel').length).toBe(0)
        })
    })

    describe('events', () => {
        it('onCancel', async () => {
            const onCancel = jest.fn();
            render(<ActionSheet visible={true} type='list' items={[]} onCancel={onCancel} />);
            fireEvent.click(screen.getByText('取消'))
            expect(onCancel).toHaveBeenCalled()
        })

        it('onClose', async () => {
            const onClose = jest.fn();
            render(<ActionSheet visible={true} type='list' items={[]} onClose={onClose} />);
            fireEvent.click(screen.getByText('取消'))
            expect(onClose).toHaveBeenCalled()
        })

        it('onSelected', async () => {
            const items = [{label: '默认按钮'}];
            const onSelected = jest.fn();
            render(<ActionSheet visible={true} type='list' items={items} onSelected={onSelected} />);
            fireEvent.click(screen.getByText('默认按钮'))
            expect(onSelected).toHaveBeenCalled()
        })
    })
});
