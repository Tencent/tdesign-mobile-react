import React, { FC, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import useDefaultProps from 'tdesign-mobile-react/hooks/useDefaultProps';
import { usePrefixClass } from 'tdesign-mobile-react/hooks/useClass';
import parseTNode from 'tdesign-mobile-react/_util/parseTNode';
import classNames from 'classnames';
import { StyledProps } from '../common';
import SwiperContext from './SwiperContext';

export interface SwiperItemProps extends StyledProps {
  children?: React.ReactNode;
}

const SwiperItem: FC<SwiperItemProps> = (originProps) => {
  const props = useDefaultProps(originProps, {});
  const { children, style } = props;
  const swiperItemClass = usePrefixClass('swiper-item');
  const imageHostClass = `${swiperItemClass}--image-host`;
  const { addChild, removeChild, forceContainerHeight } = useContext(SwiperContext);
  const [rootStyle, setRootStyle] = useState(style);
  const hostRef = useRef<HTMLDivElement>(null);
  const [classNameSuffix, setClassNameSuffix] = useState('');

  const updateTranslateStyle = useCallback(
    (transform: string) => {
      setRootStyle({ transform, ...style });
    },
    [style],
  );

  const updateClassNameSuffix = (suffix: string) => {
    setClassNameSuffix(suffix);
  };

  useEffect(() => {
    addChild({ divRef: hostRef, updateTranslateStyle, updateClassNameSuffix });
    const rect = hostRef.current?.getBoundingClientRect();
    forceContainerHeight(rect?.height);
    return () => {
      removeChild(hostRef);
    };
  }, [addChild, forceContainerHeight, removeChild, updateTranslateStyle]);

  const itemClassName = useMemo(
    () => classNames(swiperItemClass, classNameSuffix?.length ? `${swiperItemClass}${classNameSuffix}` : ''),
    [classNameSuffix, swiperItemClass],
  );

  const hostClassName = useMemo(
    () => classNames(imageHostClass, classNameSuffix?.length ? `${imageHostClass}${classNameSuffix}` : ''),
    [classNameSuffix, imageHostClass],
  );

  return (
    <div className={itemClassName} style={rootStyle}>
      <div className={hostClassName} ref={hostRef}>
        {parseTNode(children)}
      </div>
    </div>
  );
};

SwiperItem.displayName = 'SwiperItem';

export default SwiperItem;
