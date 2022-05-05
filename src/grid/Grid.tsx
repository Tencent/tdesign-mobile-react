import React, { FC } from "react";
import { TdGridProps } from "./type";
import useConfig from '../_util/useConfig';

const Grid: FC<TdGridProps> = (prop) => {
    const { children, align, border, column, gutter } = prop;

    const { classPrefix } = useConfig();
    const name = `${classPrefix}-grid`;

    return <>
        <div className={name} style={{paddingRight: gutter}}>
            {
                React.Children.map(children, (child: React.ReactElement) => React.cloneElement(child, {
                    border,
                    align,
                    column,
                }))
            }
        </div>
    </>
}

export default Grid;
