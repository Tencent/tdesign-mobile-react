import React, { FC } from "react";

const prefix = 't';
const name = `${prefix}-mask`;

export interface TdMaskProps {
    transparent?: boolean;
    click?: (visible) => void;
}

const Mask: FC<TdMaskProps> = (prop) => {
    const { click, transparent } = prop;

    const maskClassName = transparent ? `${name}--transparent` : name;

    return <>
       <div className={maskClassName} onClick={click}>
       </div>
    </>
}

export default Mask;
