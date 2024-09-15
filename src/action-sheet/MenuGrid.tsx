import React, {CSSProperties, TouchEvent, useEffect, useState, useRef} from 'react';
import useConfig from "tdesign-mobile-react/_util/useConfig";
import {Grid, GridItem} from "tdesign-mobile-react";
import classNames from "classnames";
import {ActionSheetItem} from "./type";

export interface MenuGridProps{
    items: Array<string | ActionSheetItem>,
    onSelected?: (index: number) => void,
    count: number,
}

let startX = 0;
let startOffset = 0;
let canMove = true;

const MenuGrid: React.FC<MenuGridProps> = (props) => {
    const {
        items,
        onSelected,
        count
    } = props;
    const [offset, setOffset] = useState(0);
    const [transition, setTransition] = useState(true);
    const [pageNum, setPageNum] = useState(1);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [actionItems, setactionItems] = useState<Array<Array<ActionSheetItem>>>([])
    const {classPrefix} = useConfig();
    const name = `${classPrefix}-action-sheet`;
    const containerWrapper = useRef(null);

    useEffect(() => {
        const num = Math.ceil(items && items.length / count);
        setPageNum(num);
        const res: any = [];
        for (let i = 0; i < num; i++) {
            const temp = items.slice(i * count, (i + 1) * count);
            res.push(temp);
        }
        setactionItems(res);
    }, [items, count])

    const wrapperStyle: CSSProperties = {
        transform: `translate3d(${offset}px, 0, 0)`,
        transition: transition ? 'transform 300ms' : 'all',
    };
    const gridColumn = Math.ceil(count / 2);
    const moveByIndex = (index: number) => {
        setTransition(true);
        if (containerWrapper) {
            const moveOffset = pageNum > 1 ? index * containerWrapper.current.offsetWidth * -1 : 0;
            setOffset(moveOffset);
        }
    };
    // 滑动时的最大偏移
    const getMaxOffset = () => {
        if (!containerWrapper) return 0;

        return (pageNum - 1) * containerWrapper.current.offsetWidth;
    };
    const handleTouchStart = (e: TouchEvent<HTMLDivElement>) => {
        canMove = true;
        setTransition(false);
        startX = e.touches[0].clientX;
        startOffset = startX - offset;
    };
    const handleTouchMove = (e: TouchEvent<HTMLDivElement>) => {
        const {clientX} = e.touches[0];
        const minOffset = 0;
        const maxOffset = getMaxOffset();

        if (Math.abs(clientX - startX) < 15) return;
        let moveOffset = clientX - startOffset;

        // 滑动临界值判单
        if (moveOffset > minOffset) {
            moveOffset = minOffset;
            canMove = false;
        }
        if (Math.abs(moveOffset) >= maxOffset) {
            moveOffset = maxOffset * -1;
            canMove = false;
        }
        setOffset(moveOffset);
    };
    const handleTouchEnd = (e: TouchEvent<HTMLDivElement>) => {
        if (!canMove) return;

        const distance = e.changedTouches[0].clientX - startX;
        const targetIndex = Math.abs(distance) > 50 ? currentIndex + (distance < 0 ? 1 : -1) : currentIndex;
        setCurrentIndex(targetIndex);
        moveByIndex(targetIndex);
    };
    const handleSelected = (index: number) => {
        onSelected?.(index);
    };
    return (
        <div ref={containerWrapper} className={`${name}__menu-wrapper`}>
            <div
                className={`${name}__menu-slider`}
                style={wrapperStyle}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
            >
                {actionItems.map((items, i) => <div key={i} className={`${name}__menu`}>
                        <Grid column={gridColumn}>
                            {items.map((item:ActionSheetItem, index) =>
                                // @ts-ignore
                                <GridItem text={item.label} key={index} onClick={() => handleSelected(i * count + index)} image={item.icon}></GridItem>
                            )}
                        </Grid>
                </div>)}

            </div>
            {pageNum > 1 && <div className={`${name}__indicator`}>
                {Array(pageNum).map((e, index) => <div key={index} className={classNames({
                    [`${name}__indicator-item`]: true,
                    on: currentIndex === index - 1
                })}></div>)}
            </div>}
        </div>
    );
}

MenuGrid.displayName = 'MenuGrid';

export default MenuGrid;
