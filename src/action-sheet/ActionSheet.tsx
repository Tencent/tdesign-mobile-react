import React, {useState, useEffect, MouseEvent} from 'react';
import useConfig from "tdesign-mobile-react/_util/useConfig";
import {Popup} from "tdesign-mobile-react";
import classNames from "classnames";
import {TdActionSheetProps} from "./type";
import MenuList from "./MenuList";
import MenuGrid from "./MenuGrid";

export interface ActionSheetProps extends TdActionSheetProps {
    type?: string;
}

const ActionSheet: React.FC<ActionSheetProps> = (props) => {
    const {
        visible,
        items,
        type,
        count,
        showCancel = true,
        cancelText = '取消',
        onSelected,
        onCancel,
        onClose,
    } = props;
    const [show, setShow] = useState(visible);

    const {classPrefix} = useConfig();
    const name = `${classPrefix}-action-sheet`;

    const rootClasses = classNames(name, {
        [`${name}__panel`]: true,
        [`${name}__panel-list`]: type === 'list',
        [`${name}__panel-grid`]: type === 'grid',
    });
    const handleCancel = (e: MouseEvent<HTMLButtonElement>) => {
        setShow(false);
        onCancel?.({e});
        onClose?.({e});
    };
    const handleOverlayClick = (e: MouseEvent<HTMLDivElement>) => {
        setShow(false);
        onClose?.({e});
    };

    const handleSelected = (index: number) => {
        onSelected?.(items[index], index,);
    };
    useEffect(() => {
        setShow(visible);
    }, [visible]);

    return (
        <Popup
            className={name}
            visible={show}
            placement='bottom'
            overlayProps={{onOverlayClick: handleOverlayClick}}
        >
            <div className={`${rootClasses}`}>
                {
                    type === 'list' ?
                        <>
                            <MenuList items={items} onSelected={handleSelected}></MenuList>
                        </> :
                        <MenuGrid items={items} count={count} onSelected={handleSelected}></MenuGrid>
                }
                {
                    showCancel && <>
                        {
                            type === 'list' && <div className={`${name}__separation`}></div>
                        }
                        <button className={`${name}__action`} onClick={handleCancel}>{cancelText}</button>
                    </>
                }
            </div>
        </Popup>
    );
}

ActionSheet.displayName = 'ActionSheet';

export default ActionSheet;
