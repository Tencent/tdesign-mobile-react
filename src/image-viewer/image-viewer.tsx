import React, { MouseEvent, useRef, useState } from 'react';
import { CloseIcon, DeleteIcon } from 'tdesign-icons-react';
import { TdImageViewerProps, ImageInfo } from './type';
import { StyledProps } from '../common';
import { usePrefixClass } from '../hooks/useClass';
import useDefault from '../_util/useDefault';
import noop from '../_util/noop';
import useDefaultProps from '../hooks/useDefaultProps';
import { imageViewerDefaultProps } from './defaultProps';
import { Swiper as TSwiper } from '../swiper';
import parseTNode from '../_util/parseTNode';
import TSwiperItem from '../swiper/SwiperItem';

export interface ImageViewerProps extends TdImageViewerProps, StyledProps {}

const ImageViewer: React.FC<ImageViewerProps> = (props) => {
  const { visible, defaultVisible, onClose, index, defaultIndex, onIndexChange, closeBtn, deleteBtn, onDelete } =
    useDefaultProps<ImageViewerProps>(props, imageViewerDefaultProps);

  const [show, setShow] = useDefault<boolean, any>(visible, defaultVisible, noop);
  const [currentIndex, setCurrentIndex] = useDefault(index, defaultIndex, onIndexChange);
  const [innerState, setInnerState] = useState({
    dblTapZooming: false, // double tap zooming
    zooming: false, // pinch zooming
    scale: 1,
    touchIndex: 0,
    dragging: false,
    draggedX: 0,
    draggedY: 0,
    extraDraggedX: 0,
  });

  const swiperRootRef = useRef<HTMLDivElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);

  const beforeClose = () => {
    setInnerState({
      ...innerState,
      dblTapZooming: false,
      zooming: false,
      scale: 1,
      dragging: false,
      draggedX: 0,
      draggedY: 0,
      extraDraggedX: 0,
    });
  };

  const imageViewerClass = usePrefixClass('image-viewer');
  const handleClose = (e: MouseEvent, trigger: 'overlay' | 'close-btn') => {
    beforeClose();
    setShow(false);
    onClose?.({ trigger, visible: false, index });
  };
  const handleDelete = () => {
    onDelete?.(currentIndex ?? 0);
  };

  const getPreloadImageIndex = () => {
    const lastIndex = props.images.length - 1;
    if ([undefined, 0].includes(currentIndex)) {
      return [0, 1, lastIndex];
    }
    if (currentIndex === lastIndex) {
      return [lastIndex, lastIndex - 1, 0];
    }
    const prev = currentIndex - 1 >= 0 ? currentIndex - 1 : lastIndex;
    const next = currentIndex + 1 <= lastIndex ? currentIndex + 1 : 0;
    return [currentIndex, prev, next];
  };

  const preloadImageIndex = getPreloadImageIndex();

  const imageInfoList = props.images.map((image, index) => {
    let imageInfo: ImageInfo;
    if (typeof image === 'string') {
      imageInfo = {
        url: image,
        align: 'center',
      };
    } else {
      imageInfo = image;
    }
    return {
      image: imageInfo,
      preload: preloadImageIndex.includes(index),
    };
  });

  const onSwiperChange = (index: number) => {
    if (currentIndex !== index) {
      const trigger = currentIndex < index ? 'next' : 'prev';
      setCurrentIndex(index, { trigger });
    }
  };

  const getImageTransform = () => {
    const { scale, draggedX, draggedY } = innerState;
    return `matrix(${scale}, 0, 0, ${scale}, ${draggedX}, ${draggedY})`;
  };
  const getImageTransitionDuration = () => {
    const { zooming, dragging } = innerState;
    return zooming || dragging ? { transitionDuration: '0s' } : { transitionDuration: '0.3s' };
  };

  return (
    show && (
      <div ref={rootRef} className={imageViewerClass}>
        <div className={`${imageViewerClass}__mask`} onClick={(e) => handleClose(e, 'overlay')}></div>
        <TSwiper
          ref={swiperRootRef}
          autoplay={false}
          height={'100vh'}
          className={`${imageViewerClass}__content`}
          onChange={onSwiperChange}
          current={currentIndex}
          defaultCurrent={currentIndex}
        >
          {imageInfoList.map((info, index) => (
            <TSwiperItem
              key={index}
              className={`${imageViewerClass}__swiper-item`}
              style={{ touchAction: 'none', alignItems: info.image.align, display: 'flex' }}
            >
              <img
                src={info.image.url}
                style={{
                  transform: index === innerState.touchIndex ? getImageTransform() : 'matrix(1, 0, 0, 1, 0, 0)',
                  ...getImageTransitionDuration(),
                  height: '100%',
                }}
                className={`${imageViewerClass}__img`}
              />
            </TSwiperItem>
          ))}
        </TSwiper>

        <div className={`${imageViewerClass}__nav`}>
          <div className={`${imageViewerClass}__nav-close`} onClick={(e) => handleClose(e, 'close-btn')}>
            {parseTNode(closeBtn, null, <CloseIcon />)}
          </div>

          {props.showIndex && (
            <div className={`${imageViewerClass}__nav-index`}>
              {`${Math.min((currentIndex ?? 0) + 1, props.images?.length)}/${props.images?.length}`}
            </div>
          )}

          <div className={`${imageViewerClass}__nav-delete`} onClick={handleDelete}>
            {parseTNode(deleteBtn, null, <DeleteIcon />)}
          </div>
        </div>
      </div>
    )
  );
};

ImageViewer.displayName = 'ImageViewer';

export default ImageViewer;
