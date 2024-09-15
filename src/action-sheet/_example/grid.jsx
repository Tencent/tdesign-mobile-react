import React, {useState} from "react";
import {ActionSheet, Button} from 'tdesign-mobile-react';
import './style/index.less'

export default function GridDemo() {
    const [open, setOpen] = useState(false);

    const handleSelected = (selected, selectedIndex) => {
        console.log(selected, selectedIndex);
    };
    const handleClose = () => {
        setOpen(false);
        console.log('cancel');
    };
    const items = [
        {label: '文字', icon: 'https://sola.gtimg.cn/aoi/sola/20210202154301_WqMVBt9mQS.png'},
        {label: '文字', icon: 'https://sola.gtimg.cn/aoi/sola/20210202154301_WqMVBt9mQS.png'},
        {label: '文字', icon: 'https://sola.gtimg.cn/aoi/sola/20210202154301_WqMVBt9mQS.png'},
        {label: '文字', icon: 'https://sola.gtimg.cn/aoi/sola/20210202154301_WqMVBt9mQS.png'},
        {label: '文字', icon: 'https://sola.gtimg.cn/aoi/sola/20210202154301_WqMVBt9mQS.png'},
        {label: '文字', icon: 'https://sola.gtimg.cn/aoi/sola/20210202154301_WqMVBt9mQS.png'},
        {label: '文字', icon: 'https://sola.gtimg.cn/aoi/sola/20210202154301_WqMVBt9mQS.png'},
        {label: '文字', icon: 'https://sola.gtimg.cn/aoi/sola/20210202154301_WqMVBt9mQS.png'},
    ]
    return (
        <div className="button-demo">
            <Button
                size="large"
                variant="outline"
                onClick={() => {
                    setOpen(!open);
                }}
            >
                宫格型
            </Button>
            <ActionSheet visible={open} type='grid' items={items} count={8} onSelected={handleSelected}
                         onClose={handleClose}/>
        </div>
    );
}
