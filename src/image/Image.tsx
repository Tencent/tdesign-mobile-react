import React, { FC, useCallback, useMemo, useRef, useState } from 'react';
import ClassNames from 'classnames';
import { CloseIcon, EllipsisIcon } from 'tdesign-icons-react';
import { useInViewport } from 'ahooks';
import useConfig from '../_util/useConfig';
import { TdImageProps } from './type';

export interface ImageProps extends TdImageProps, React.ImgHTMLAttributes<HTMLImageElement> {}

const Image: FC<ImageProps> = React.memo((props) => {
  const {
    src,
    alt,
    fit = 'fill',
    onLoad,
    loading,
    onError,
    lazy,
    shape = 'round',
    position,
    error,
    className,
    style,
    ...others
  } = props;

  const [isLoad, setIsLoad] = useState(true);
  const [isError, setIsError] = useState(false);
  const ref = useRef<HTMLImageElement>(null);
  const hasLoad = useRef<boolean>(false);

  // 统一配置信息
  const { classPrefix } = useConfig();

  // 观察元素是否在可见区域
  const [isInViewport] = useInViewport(ref);

  const prefix = useMemo(() => `${classPrefix}-image`, [classPrefix]);

  // Loading Element
  const LoadingStatus = useMemo(() => {
    if (!isLoad) return null;

    return loading || <EllipsisIcon />;
  }, [isLoad, loading]);

  // Loading Failed Element
  const FailedStatus = useMemo(() => {
    if (!isError) return null;

    return error || <CloseIcon />;
  }, [isError, error]);

  // Image Src
  const imgSrc = useMemo(() => {
    if (!lazy || hasLoad.current) return src;

    if (isInViewport) return src;

    return '';
  }, [src, lazy, isInViewport]);

  // Get ClassName By Prefix
  const getClass = useCallback((cls: string) => `${prefix}__${cls}`, [prefix]);

  return (
    <div className={ClassNames(prefix, `${prefix}--${shape}`, { [className]: className })} ref={ref}>
      {LoadingStatus || FailedStatus ? <div className={getClass('status')}>{LoadingStatus || FailedStatus}</div> : null}
      <img
        {...others}
        className={getClass('img')}
        src={imgSrc}
        alt={alt}
        style={{ objectFit: fit, objectPosition: position, width: 'inherit', height: 'inherit', ...style }}
        onLoad={() => {
          hasLoad.current = true;
          setIsLoad(false);
          setIsError(false);
          onLoad && onLoad();
        }}
        onError={() => {
          if (imgSrc) {
            hasLoad.current = true;
            setIsLoad(false);
            setIsError(true);
            onError && onError();
          }
        }}
      />
    </div>
  );
});

export default Image;
