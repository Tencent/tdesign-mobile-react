import React, { useState, useMemo } from 'react';
import { useGesture } from '@use-gesture/react';
import { CloseIcon, DeleteIcon } from 'tdesign-icons-react';
import { Swiper, SwiperItem } from '../swiper';
import { Image } from '../image';
import { usePrefixClass } from '../hooks/useClass';
import { TdImageViewerProps } from './type';

export * from './type';

// Custom hook for image preloading
const usePreloadImages = (images, currentIndex) =>
  useMemo(() => {
    const lastIndex = images.length - 1;
    if ([undefined, 0].includes(currentIndex)) {
      return [0, 1, lastIndex];
    }
    if (currentIndex === lastIndex) {
      return [lastIndex, lastIndex - 1, 0];
    }
    const prev = currentIndex - 1 >= 0 ? currentIndex - 1 : lastIndex;
    const next = currentIndex + 1 <= lastIndex ? currentIndex + 1 : 0;
    return [currentIndex, prev, next];
  }, [currentIndex, images]);

// Custom hook for handling zooming and dragging state
const useImageViewerState = () => {
  const [state, setState] = useState({
    dblTapZooming: false,
    zooming: false,
    scale: 1,
    touchIndex: 0,
    dragging: false,
    draggedX: 0,
    draggedY: 0,
    extraDraggedX: 0,
  });

  const handleZoom = (newScale) => {
    setState((prevState) => ({ ...prevState, scale: newScale }));
  };

  const handleDrag = (dx, dy) => {
    setState((prevState) => ({
      ...prevState,
      draggedX: prevState.draggedX + dx,
      draggedY: prevState.draggedY + dy,
    }));
  };

  return { state, handleZoom, handleDrag, setState };
};

// Custom hook for gesture handling
const useGestureHandling = (handleZoom, handleDrag) => {
  const bind = useGesture({
    onDrag: ({ movement: [mx, my] }) => handleDrag(mx, my),
    onPinch: ({ offset: [scale] }) => handleZoom(scale),
  });

  return bind;
};

const ImageViewer = (props: TdImageViewerProps) => {
  // const { onClose, index } = props;
  const imageViewerClass = usePrefixClass('image-viewer');
  const { state, handleZoom, handleDrag } = useImageViewerState();
  const [visible, setVisible] = useState(props.visible);
  const [currentIndex, setIndex] = useState(props.index);

  const preloadImageIndex = usePreloadImages(props.images, currentIndex);
  const bind = useGestureHandling(handleZoom, handleDrag);

  const imageInfoList = useMemo(
    () =>
      props.images.map((image, index) => {
        const { url, align } = typeof image === 'string' ? { url: image, align: 'center' } : image;
        const preload = preloadImageIndex.includes(index);
        return { src: url, preload, align };
      }),
    [props.images, preloadImageIndex],
  );

  return (
    <div className={`${imageViewerClass} ${visible ? 'visible' : ''}`}>
      <Swiper current={currentIndex} onChange={(index) => setIndex(index)}>
        {imageInfoList.map((imageInfo, index) => (
          <SwiperItem key={index} style={{ touchAction: 'none' }}>
            <Image src={imageInfo.src} />
          </SwiperItem>
        ))}
      </Swiper>
      <div {...bind} style={{ transform: `scale(${state.scale})` }}>
        {/* Image viewer controls and other elements go here */}
        <CloseIcon onClick={() => setVisible(false)} />
        <DeleteIcon onClick={() => console.log('Delete action')} />
      </div>
    </div>
  );
};

ImageViewer.defaultProps = {
  visible: false,
  index: 0,
  images: [],
};

export default ImageViewer;
