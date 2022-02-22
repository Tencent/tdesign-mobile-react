import React, { FC, useEffect, useRef, useState } from "react";
import useConfig from "tdesign-mobile-react/_util/useConfig";
import { TdStickyProps } from "./type";

const Sticky: FC<TdStickyProps> = (prop) => {
    const {
        container,
        disabled = false,
        offsetTop = 0,
        zIndex = 99,
        onScroll,
    } = prop;

    const { classPrefix } = useConfig();

    const boxRef = useRef();

    const contentRef = useRef();

    return <>
        <div ref={boxRef} >
            <div ref={contentRef} >
            {/* <t-node :content="stickyContent"></t-node> */}
            </div>
        </div>
    </>
}


Sticky.displayName = 'Sticky';

export default Sticky;
