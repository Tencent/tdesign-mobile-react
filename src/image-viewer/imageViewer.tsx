import React, { Fragment, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import classNames from 'classnames';
import { CloseIcon, DeleteIcon } from 'tdesign-icons-react';
import useConfig from '../_util/useConfig';
import { TdImageViewerProps } from './type';

export type ImageViewerProps = TdImageViewerProps;

interface sourceItem {
  url: string;
  imgProportion: number;
}

const ImageViewer: React.FC<ImageViewerProps> = ({
  images = [],
  visible = false,
  showIndex = true,
  closeBtn = false,
  deleteBtn = false,
  initialIndex = 1,
  backgroundColor,
  onVisibleChange,
  onChange,
  onClose,
  onDelete,
}) => {
  const PAGING_DURATION = 300;
  const PAGING_SCALE = 0.5;
  // 统一配置信息
  const { classPrefix } = useConfig();
  // prefix
  const prefix = useMemo(() => `${classPrefix}`, [classPrefix]);
  // 视图元素
  const element = useRef<HTMLDivElement>(null);
  const [source, setSource] = useState<Array<sourceItem>>([]);
  // 图片总数
  const [count, setCount] = useState(0);
  // 当前第几张
  const [index, setIndex] = useState(1);
  // 当前偏移量
  const [offset, setOffSet] = useState(0);
  // 容器大小
  const [clientSize, setClientSize] = useState({
    width: 0,
    height: 0,
  });
  // 坐标
  const [dragState, setDrageState] = useState({
    startTime: new Date().getTime(), // 拖拽时间
    startLeft: -1, // 初始 x 坐标
    startTop: -1, // 初始 y 坐标
    itemWidth: -1, // 视图节点 宽度
    itemHeight: -1, // 视图节点 高度
    currentLeft: -1, // 最终 x 坐标
    currentTop: -1, // 最终 y 坐标
  });
  // 是否做动画
  const [isMove, setIsMove] = useState(false);
  // 动画时间
  const [dragTime, setDragTime] = useState(0);
  // 是否锁定拖拽
  const [moveLock, setMoveLock] = useState(true);

  const getPoint = (event: React.TouchEvent<HTMLDivElement>) => {
    const point = event.changedTouches[0];
    return point;
  };

  const handleTouchStart = (event: React.TouchEvent<HTMLDivElement>) => {
    const point = getPoint(event);

    // 初始化坐标信息
    setDrageState({
      ...dragState,
      startTime: new Date().getTime(),
      startLeft: point.pageX,
      startTop: point.pageY,
      itemWidth: element.current.offsetWidth,
      itemHeight: element.current.offsetHeight,
    });

    if (count <= 1 || !moveLock) return;

    setMoveLock(false);
  };
  const handleTouchMove = (event: React.TouchEvent<HTMLDivElement>) => {
    if (count <= 1 || moveLock) return;

    const point = getPoint(event);

    // 实时记录 x y 坐标
    const currentLeft = point.pageX;
    const currentTop = point.pageY;
    // 计算偏移量
    const offsetLeft = currentLeft - dragState.startLeft;
    // const offsetTop = currentTop - dragState.startTop;

    // 滚动穿透
    // event.preventDefault();

    const newOffsetLeft = Math.min(Math.max(-dragState.itemWidth + 1, offsetLeft), dragState.itemWidth - 1);
    const newOffset = newOffsetLeft - dragState.itemWidth * index;
    setOffSet(newOffset);

    setDrageState({
      ...dragState,
      currentLeft,
      currentTop,
    });
  };
  const handleTouchEnd = (event: React.TouchEvent<HTMLDivElement>) => {
    const point = getPoint(event);

    // 点击事件
    if (dragState.startLeft === point.pageX && !closeBtn) {
      setMoveLock(true);
      onVisibleChange && onVisibleChange(false);

      onClose && onClose('overlay', false, index);
      return;
    }
    if (count <= 1 || moveLock) return;
    setMoveLock(true);

    const dragDuration = Math.min(new Date().getTime() - dragState.startTime, 500);
    const isFastDrag = dragDuration < PAGING_DURATION;
    setDragTime(dragDuration);
    if (isFastDrag && dragState.currentLeft === -1) return;

    let action = '';
    const offsetLeft = dragState.currentLeft - dragState.startLeft;
    const { itemWidth } = dragState;

    // 做动画
    setIsMove(true);

    // 偏移量是否大于一半
    if (Math.abs(offsetLeft) > itemWidth * PAGING_SCALE || isFastDrag) {
      if (offsetLeft < 0) {
        // 下一页
        const newOffset = -itemWidth * (index + 1);
        setOffSet(newOffset);
        action = 'next';
      } else {
        // 上一页
        const newOffset = -itemWidth * (index - 1);
        setOffSet(newOffset);
        action = 'prev';
      }
    } else {
      // 复位
      const newOffset = -itemWidth * index;
      setOffSet(newOffset);
    }

    // 复位
    setTimeout(() => {
      setIsMove(false);

      if (action) {
        let currentIndex = index;
        if (action === 'next') {
          currentIndex += 1;
        } else {
          currentIndex -= 1;
        }

        if (currentIndex === count + 1) {
          currentIndex = 1;
        } else if (currentIndex === 0) {
          currentIndex = count;
        }

        setIndex(currentIndex);
        const newOffset = -itemWidth * currentIndex;
        setOffSet(newOffset);

        onChange && onChange(currentIndex);
      }
      // context.emit('change', index.value - 1);
    }, dragDuration);

    // 初始化
    setDrageState({
      startTime: new Date().getTime(), // 拖拽时间
      startLeft: -1, // 初始 x 坐标
      startTop: -1, // 初始 y 坐标
      itemWidth: -1, // 视图节点 宽度
      itemHeight: -1, // 视图节点 高度
      currentLeft: -1, // 最终 x 坐标
      currentTop: -1, // 最终 y 坐标
    });
  };

  const handleClose = () => {
    if (!closeBtn) return;
    onVisibleChange(false);

    onClose && onClose('button', false, index);
  };
  const handleDelete = () => {
    if (!deleteBtn) return;
    onDelete && onDelete(index);
  };

  const handleInitialIndex = useCallback(
    (index: number) => {
      let defaultIndex = 0;
      if (index <= 0) {
        defaultIndex = 1;
      } else if (index > 0 && index >= images.length) {
        defaultIndex = images.length;
      } else if (index > 0 && index < images.length) {
        defaultIndex = index;
      }
      setIndex(defaultIndex);
      setOffSet(-element.current.offsetWidth * defaultIndex || 0);
    },
    [images],
  );
  const handleWidth = useCallback(
    (imgProportion: number) => {
      const clientProportion = clientSize.width === 0 ? 0 : clientSize.width / clientSize.height;

      if (imgProportion < clientProportion) {
        const imgWidthStyle = imgProportion * clientSize.height;
        return `${imgWidthStyle}px`;
      }
      return '100%';
    },
    [clientSize],
  );
  const handleSource = (images: Array<string>): Array<sourceItem> => {
    const frontItem = images[0];
    const endItem = images[images.length - 1];

    // 首尾图片
    const newImages = [...images];
    newImages.push(frontItem);
    newImages.unshift(endItem);

    return newImages.map((m) => ({ url: m, imgProportion: 0 }));
  };
  const handleLoaded = (e, key: number) => {
    const { target } = e;

    const imgWidth = target.naturalWidth;
    const imgHeight = target.naturalHeight;
    const imgProportion = imgWidth / imgHeight;

    source[key].imgProportion = imgProportion;
  };

  useEffect(() => {
    setClientSize({ width: element.current.offsetWidth, height: element.current.offsetHeight });
    handleInitialIndex(initialIndex);
  }, [handleInitialIndex, initialIndex, visible]);

  useEffect(() => {
    setCount(images.length);

    const newImages = handleSource(images);
    setSource(newImages);
  }, [images]);

  return (
    <Fragment>
      <div
        className={`${prefix}-image-viewer`}
        style={{
          visibility: visible ? 'visible' : 'hidden',
          display: clientSize.width === 0 || visible ? 'block' : 'none',
        }}
      >
        {/* 蒙版 */}
        <div className={`${prefix}-image-mask`} style={{ background: backgroundColor }}></div>
        <div className="image-viewer-bar">
          {/* 关闭 */}
          {closeBtn ? (
            <CloseIcon className="image-viewer-icon" style={{ fontSize: '22px' }} onClick={handleClose} />
          ) : (
            <div className="image-viewer-icon"></div>
          )}
          {/* 页码 */}
          {showIndex ? (
            <div className="image-viewer-page">
              {index}/{count}
            </div>
          ) : (
            <div className="image-viewer-page"></div>
          )}
          {/* 删除 */}
          {deleteBtn ? (
            <DeleteIcon className="image-viewer-icon" onClick={handleDelete} />
          ) : (
            <div className="image-viewer-icon"></div>
          )}
        </div>
        {/* 内容 */}
        <div
          className="image-viewer-container"
          ref={element}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onTouchCancel={handleTouchEnd}
        >
          <div className={`${prefix}-image-viewer`}>
            <div className={`${prefix}-swiper-box`}>
              <div
                className={`${prefix}-swiper-container`}
                style={{
                  transform: `translate3d(${offset}px, 0px, 0px) scale(1)`,
                  transition: isMove ? `all ${dragTime === 0 ? '0.3' : dragTime / 1000}s linear` : 'none',
                }}
              >
                {source.map((item, key) => (
                  <div key={key} className={classNames(`${prefix}-swiper-item`, 'image-viewer-item-wrap')}>
                    <div className="item">
                      <img
                        src={item.url}
                        style={{ width: handleWidth(item.imgProportion) }}
                        onLoad={(e) => handleLoaded(e, key)}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default ImageViewer;
