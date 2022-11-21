import React from 'react';
import useConfig from "tdesign-mobile-react/_util/useConfig";
import {ActionSheetItem} from "./type";

export interface MenuListProps {
    items: Array<string | ActionSheetItem>,
    onSelected?: (index: number) => void;
}

const MenuList: React.FC<MenuListProps> = (props) => {
    const {
        items,
        onSelected
    } = props;

    const {classPrefix} = useConfig();
    const name = `${classPrefix}-action-sheet`;

    return (
        <div className={`${name}__menu`}>
            {items.map((item: ActionSheetItem, index) =>
                <button key={index}
                        className={`${name}__cell`}
                        disabled={item.disabled}
                        onClick={() => onSelected(index)}>
                    {/* {item.icon && <span className={`${name}__cell-icon`} style={{color: item.color}}>{item.icon}</span>} */}
                    <div className={`${name}__cell-text`} style={{color: item.color}}>
                        {item.label}
                    </div>
                </button>
            )}

        </div>
    );
}

MenuList.displayName = 'ActionSheet';

export default MenuList;
