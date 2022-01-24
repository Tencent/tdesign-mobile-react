import React, { FC } from "react";
import { TdGridProps } from "./type";

const prefix = 't';
const name = `${prefix}-grid`;

const Grid: FC<TdGridProps> = (prop) => {
    const { children, align, border, column, gutter, hover } = prop;

    return <>
        <div className={name} style={{paddingRight: gutter}}>
            {
                React.Children.map(children, (child: React.ReactElement) => React.cloneElement(child, {
                    border,
                    align,
                    column,
                    hover,
                }))
            }
        </div>
    </>
}

export default Grid;
