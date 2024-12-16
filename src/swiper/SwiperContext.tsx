import React, { RefObject } from 'react';

interface SwiperContextProps {
  addChild?: (
    item: RefObject<HTMLDivElement>,
    updateTranslateStyle: (style: string) => void,
    updateClassNameSuffix: (classNameSuffix: string) => void,
  ) => void;
  removeChild?: (element: RefObject<HTMLDivElement>) => void;
  forceContainerHeight?: (height: number | string) => void;
}

const SwiperContext = React.createContext<SwiperContextProps>({});

export default SwiperContext;
