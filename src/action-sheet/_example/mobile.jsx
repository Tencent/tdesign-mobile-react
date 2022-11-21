import React from 'react';
import TDemoBlock from '../../../site/mobile/components/DemoBlock';
import TDemoHeader from "../../../site/mobile/components/DemoHeader";
import ListDemo from './list';
import GridDemo from './grid';
import GridMultipleDemo from './grid-multiple'

export default function MobileDemo() {
    return (
        <div className="tdesign-mobile-demo" style={{backgroundColor: '#fff', height: '100vh'}}>
            <TDemoHeader title="ActionSheet 动作面板" summary="底部弹起的模态面板，包含与当前情境相关的多个选项。"/>
            <TDemoBlock title="01 类型" summary="列表型">
                <ListDemo/>
                <GridDemo/>
                <GridMultipleDemo/>
            </TDemoBlock>
        </div>
    );
}
