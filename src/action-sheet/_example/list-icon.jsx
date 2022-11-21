import React, {useState} from "react";
import {ActionSheet, Button} from 'tdesign-mobile-react';
import './style/index.less'
import {Icon} from "tdesign-icons-react";

export default function ListIconDemo() {
    const [open, setOpen] = useState(true);

    const handleSelected = (selected, selectedIndex) => {
        console.log(selected, selectedIndex);
    };
    const handleCancel = () => {
        setOpen(false);
        console.log('cancel');
    };
    const iconName = 'app';
    const items = [
        {label: '默认按钮', icon: <Icon name={iconName} />},
        {label: '自定义按钮', color: '#0052D9', icon: <Icon name={iconName} />},
        {label: '失效按钮', disabled: true, icon: <Icon name={iconName} />},
        {label: '告警按钮', color: '#E34D59', icon: <Icon name={iconName} />},
    ];
    return (
        <div className="button-demo">
            <Button
                size="large"
                variant="outline"
                onClick={() => {
                    setOpen(!open);
                }}
            >
                带图标列表型
            </Button>
            <ActionSheet visible={open} type='list' items={items} count={8} onSelected={handleSelected}
                         onClose={handleCancel}/>
        </div>
    );
}
