import React, { FC, useState, useRef, useLayoutEffect, useCallback, memo } from 'react';
import identity from 'lodash/identity';
import { useSpring, animated } from '@react-spring/web';
import { useDrag } from '@use-gesture/react';
import useConfig from '../_util/useConfig';
import withNativeProps, { NativeProps } from '../_util/withNativeProps';
import nearest from '../_util/nearest';
import Zoomer from './Zoomer';
import { TdImageViewerProps } from './type';

export interface ImageViewerProps extends TdImageViewerProps, NativeProps {
  threshold?: number | string;
  minScale?: number;
  maxScale?: number;
}

type ImageViewerContentProps = Omit<ImageViewerProps, 'visible' | 'backgroundColor'>;

const ImageViewerContent: FC<ImageViewerContentProps> = (props) => {
  const { showIndex, initialIndex, images, threshold, minScale, maxScale, onClose } = props;
  const { classPrefix: prefix } = useConfig();
  const dragLockRef = useRef(false);
  const swiperRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const count = images.length;
  const getSwiperWidth = useCallback(() => swiperRef.current?.clientWidth || 0, [swiperRef]);

  const [{ x }, api] = useSpring(() => ({
    x: 0,
    config: { tension: 250, clamp: true },
  }));

  const swipeTo = useCallback(
    (index: number, immediate = false) => {
      setCurrentIndex(index);
      api.start({
        x: index * getSwiperWidth(),
        immediate,
      });
    },
    [api, getSwiperWidth],
  );

  useLayoutEffect(() => {
    swipeTo(initialIndex, true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useDrag(
    ({ last, offset: [offsetX], direction: [directionX] }) => {
      if (dragLockRef.current) return;
      if (last) {
        const swiperWidth = getSwiperWidth();
        const offsetXList = Array(count)
          .fill(0)
          .map((_, index) => index * swiperWidth);
        const nextOffsetX = nearest({
          items: offsetXList,
          target: offsetX,
          threshold,
          direction: directionX as -1 | 1,
        });
        const nextIndex = offsetXList.findIndex((item) => item === nextOffsetX);
        swipeTo(nextIndex);
      } else {
        api.start({ x: offsetX });
      }
    },
    {
      transform: ([x, y]) => [-x, y],
      from: () => [x.get(), 0],
      bounds: () => ({
        left: 0,
        right: (count - 1) * getSwiperWidth(),
      }),
      rubberband: true,
      axis: 'x',
      pointer: { touch: true },
      target: swiperRef,
    },
  );

  const onScaleChange = useCallback(
    (scale: number) => {
      if (scale !== 1) swipeTo(Math.round(x.get() / getSwiperWidth()));
    },
    [getSwiperWidth, swipeTo, x],
  );

  return (
    <div className="image-viewer-container">
      <div className={`${prefix}-swiper-box`}>
        <animated.div ref={swiperRef} style={{ x: x.to((x) => -x) }} className={`${prefix}-swiper-container`}>
          {images.map((imageUrl, idx) => (
            <Zoomer
              key={idx}
              dragLockRef={dragLockRef}
              onScaleChange={onScaleChange}
              onTap={onClose}
              minScale={minScale}
              maxScale={maxScale}
              className={`${prefix}-swiper-item image-viewer-item-wrap`}
            >
              <img src={imageUrl} alt={imageUrl} draggable={false} />
            </Zoomer>
          ))}
        </animated.div>
      </div>
      {showIndex && <div className="image-viewer-index">{`${currentIndex + 1}/${count}`}</div>}
    </div>
  );
};

ImageViewerContent.displayName = 'ImageViewerContent';

const defaultProps = {
  images: [],
  visible: false,
  showIndex: true,
  initialIndex: 0,
  backgroundColor: 'rgba(0, 0, 0, .6)',
  threshold: 30,
  minScale: 0.618,
  maxScale: 4,
  onClose: identity,
};

const ImageViewer: FC<ImageViewerProps> = memo((props) => {
  const { visible, backgroundColor, ...restProps } = props;
  const { classPrefix: prefix } = useConfig();
  const [active, setActive] = useState(visible);
  const { opacity } = useSpring({
    opacity: visible ? 1 : 0,
    config: {
      duration: 160,
      clamp: true,
    },
    onStart: () => {
      if (visible) setActive(true);
    },
    onRest: () => {
      if (!visible) setActive(false);
    },
  });
  return withNativeProps(
    restProps,
    <animated.div hidden={!active} className={`${prefix}-image-viewer`} style={{ opacity }}>
      {active && (
        <>
          <div className={`${prefix}-image-mask`} style={{ backgroundColor }} />
          <ImageViewerContent {...restProps} />
        </>
      )}
    </animated.div>,
  );
});

ImageViewer.defaultProps = defaultProps;
ImageViewer.displayName = 'ImageViewer';

export default ImageViewer;
