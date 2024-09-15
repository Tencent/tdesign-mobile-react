import React, {useState} from "react";
import {ActionSheet, Button} from 'tdesign-mobile-react';
import './style/index.less'

export default function ListDemo() {
    const [open, setOpen] = useState(false);

    const handleSelected = (selected, selectedIndex) => {
        console.log(selected, selectedIndex);
    };
    const handleClose = () => {
        setOpen(false);
        console.log('cancel');
    };
    const items = [
        {label: '默认按钮'},
        {label: '自定义按钮', color: '#0052D9'},
        {label: '失效按钮', disabled: true},
        {label: '告警按钮', color: '#E34D59'},
    ];
    return (
        <div className="button-demo">
            <Button
                size="large"
                variant="outline"
                onClick={() => {
                    console.log(!open)
                    setOpen(!open);
                }}
            >
                列表型
            </Button>
            <ActionSheet visible={open} type='list' items={items} onSelected={handleSelected}
                         onClose={handleClose}/>
        </div>
    );
}
