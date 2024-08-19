import React, { forwardRef, Fragment, useRef, useMemo, useState, useEffect, SyntheticEvent } from 'react';
import classNames from 'classnames';
import { CloseIcon as TdCloseIcon } from 'tdesign-icons-react';
import { useInViewport } from 'ahooks';
import Loading from '../loading';
import { StyledProps } from '../common';
import { TdImageProps } from './type';
import { imageDefaultProps } from './defaultProps';
import parseTNode from '../_util/parseTNode';
import useDefaultProps from '../hooks/useDefaultProps';
import { usePrefixClass } from '../hooks/useClass';

export interface ImageProps extends TdImageProps, StyledProps {}

const Image = forwardRef<HTMLDivElement, ImageProps>((props) => {
  const {
    className,
    style,
    src,
    alt,
    error,
    fallback,
    fit,
    lazy,
    loading,
    shape,
    position,
    referrerpolicy,
    srcset,
    onError,
    onLoad,
  } = useDefaultProps<ImageProps>(props, imageDefaultProps);

  const imageClass = usePrefixClass('image');
  const ref = useRef<HTMLImageElement>(null);

  const [imageSrc, setImageSrc] = useState(src);
  const [isLoad, setIsLoad] = useState(true);
  const [isError, setIsError] = useState(false);
  const hasLoad = useRef<boolean>(false);

  const rootClasses = classNames(
    {
      [`${imageClass}`]: true,
      [`${imageClass}--${shape}`]: true,
    },
    className,
  );

  // Loading Element
  const LoadingStatus = useMemo(() => {
    if (!isLoad) return null;

    return loading || <Loading theme="dots" inheritColor={true} />;
  }, [isLoad, loading]);

  // Loading Failed Element
  const FailedStatus = useMemo(() => {
    if (!isError) return null;

    return error || <TdCloseIcon size="22px" />;
  }, [isError, error]);

  // 观察元素是否在可见区域
  const [isInViewport] = useInViewport(ref);

  useEffect(() => {
    if (!lazy || hasLoad.current) {
      setImageSrc(src);
    } else {
      setImageSrc(isInViewport ? src : '');
    }
  }, [src, lazy, isInViewport]);

  const renderMask = () =>
    LoadingStatus || FailedStatus ? (
      <div className={`${imageClass}__mask`}>{parseTNode(LoadingStatus || FailedStatus)}</div>
    ) : null;

  // 图片加载完成回调
  const handleLoad = (e: SyntheticEvent<HTMLImageElement>) => {
    hasLoad.current = true;
    setIsLoad(false);
    setIsError(false);
    onLoad?.({ e });
  };

  // 图片加载失败回调
  const handleError = (e: SyntheticEvent<HTMLImageElement>) => {
    hasLoad.current = true;
    setIsLoad(false);
    setIsError(true);
    if (fallback) {
      setImageSrc(fallback);
    }
    onError?.({ e });
  };

  const renderImage = () => (
    <img
      className={classNames(`${imageClass}__img`, `${imageClass}--fit-${fit}`, `${imageClass}--position-${position}`)}
      src={imageSrc}
      alt={alt}
      referrerPolicy={referrerpolicy}
      onLoad={handleLoad}
      onError={handleError}
    />
  );

  const renderImageSrcset = () => (
    <picture>
      {Object.entries(srcset).map(([type, url]) => (
        <source key={url} type={type} srcSet={url} />
      ))}
      {src && renderImage()}
    </picture>
  );

  return (
    <div ref={ref} className={rootClasses} style={style}>
      {renderMask()}
      <Fragment>{srcset && Object.keys(srcset).length ? renderImageSrcset() : renderImage()}</Fragment>
    </div>
  );
});

Image.displayName = 'Image';

export default Image;
