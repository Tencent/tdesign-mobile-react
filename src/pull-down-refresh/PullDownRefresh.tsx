import React, { useRef, useState, type ReactNode, useEffect, useMemo } from 'react';
import classNames from 'classnames';
import { uniqueId, isBoolean } from 'lodash-es';

import { useDebounceFn } from 'ahooks';
import Loading from '../loading';

import { StyledProps } from '../common';
import useDefault from '../_util/useDefault';
import type { TdPullDownRefreshProps } from './type';
import { pullDownRefreshDefaultProps } from './defaultProps';

import { usePrefixClass } from '../hooks/useClass';
import useDefaultProps from '../hooks/useDefaultProps';
import { convertUnit, reconvertUnit } from '../_util/convertUnit';
import { useTouch, isReachTop, easeDistance } from './useTouch';

export enum PullStatusEnum {
  normal,
  loading,
  loosing,
  pulling,
  success,
}

function getStatusText(status: PullStatusEnum, loadingTexts: string[]) {
  switch (status) {
    case PullStatusEnum.pulling:
      return loadingTexts[0];
    case PullStatusEnum.loosing:
      return loadingTexts[1];
    case PullStatusEnum.loading:
      return loadingTexts[2];
    case PullStatusEnum.success:
      return loadingTexts[3];
    default:
      return '';
  }
}

export interface PullDownRefreshProps extends TdPullDownRefreshProps, StyledProps {
  children?: React.ReactNode;
}

const PullDownRefresh: React.FC<PullDownRefreshProps> = (originProps) => {
  const props = useDefaultProps<PullDownRefreshProps>(originProps, pullDownRefreshDefaultProps);
  const {
    className,
    style,
    children,
    loadingTexts,
    loadingProps,
    loadingBarHeight,
    maxBarHeight,
    refreshTimeout,
    onRefresh,
    onTimeout,
    value: propsValue,
    defaultValue,
    onChange: propsOnChange,
    onScrolltolower,
  } = props;
  const [status, originalSetStatus] = useState(PullStatusEnum.normal);
  const rootRef = useRef<HTMLDivElement>(null);
  const [value, onChange] = useDefault(propsValue, defaultValue, propsOnChange);

  const name = usePrefixClass('pull-down-refresh');
  const touch = useTouch();
  const loadingHeight = convertUnit(loadingBarHeight);
  const pureLoadingHeight = reconvertUnit(loadingBarHeight);

  const setStatus = (nextStatus: PullStatusEnum) => {
    if (nextStatus !== status) originalSetStatus(nextStatus);
  };
  const [distance, setDistance] = useState(0);

  useEffect(() => {
    if (onChange) {
      onChange(value);
    }
    if (isBoolean(value) && !value) {
      setStatus(PullStatusEnum.success);
      setDistance(0);
    } else if (value) {
      setStatus(PullStatusEnum.loading);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  const { run } = useDebounceFn(
    () => {
      const scrollTop = document.documentElement.scrollTop || document.body.scrollTop; // 滚动高度
      const { clientHeight, scrollHeight } = document.documentElement; // 可视区域/屏幕高度， 页面高度
      const distance = 20; // 距离视窗 20 时，开始触发
      if (scrollTop + clientHeight >= scrollHeight - distance) {
        onScrolltolower?.();
      }
    },
    {
      leading: true,
      trailing: false,
      wait: 300,
    },
  );

  useEffect(() => {
    window.addEventListener('scroll', run);
    return () => {
      window.removeEventListener('scroll', run);
    };
  }, [run]);

  const doRefresh = async () => {
    setStatus(PullStatusEnum.loading);
    setDistance(pureLoadingHeight);
    try {
      const timeoutId = uniqueId(`${name}-timeout_`);
      let timeoutTid: any;
      const res = await Promise.race([
        onRefresh?.(),
        new Promise((resolve) => {
          timeoutTid = setTimeout(() => {
            resolve(timeoutId);
            onTimeout();
          }, refreshTimeout);
        }),
      ]);
      clearTimeout(timeoutTid);
      if (res !== timeoutId) {
        setStatus(PullStatusEnum.success);
      }
    } finally {
      setTimeout(() => {
        setStatus(PullStatusEnum.normal);
        setDistance(0);
      }, 300);
    }
  };

  const statusText = getStatusText(status, loadingTexts);
  let statusNode: ReactNode = <div className={`${name}__text`}>{statusText}</div>;
  if (status === PullStatusEnum.loading) {
    statusNode = <Loading text={statusText} size="24px" {...loadingProps} />;
  }

  const loading = useMemo(() => status === PullStatusEnum.loading, [status]);

  let touchDir: -1 | 0 | 1;
  const touchThreshold = 5;

  const onTouchStart = (e: React.TouchEvent) => {
    e.stopPropagation();
    if (!isReachTop(e) || loading) return;

    setDistance(0);
    touch.start(e);
    touchDir = 0;
  };

  const onTouchMove = (e: React.TouchEvent) => {
    e.stopPropagation();
    if (!isReachTop(e) || loading) return;
    touch.move(e);

    const { diffY, diffX } = touch;
    const absX = Math.abs(diffX);
    const absY = Math.abs(diffY);

    if (!touchDir && absX < touchThreshold && absY < touchThreshold) {
      return;
    }
    if (!touchDir && absX < absY) {
      touchDir = -1;
    } else if (!touchDir && absX >= absY) {
      touchDir = 1;
    }

    // 左右移动时，不进行后续操作
    if (touchDir === 1) return;

    const nextDistance = easeDistance(diffY, pureLoadingHeight);

    if (nextDistance >= 0 && nextDistance < reconvertUnit(maxBarHeight)) {
      setDistance(nextDistance);
    }

    setStatus(absY >= pureLoadingHeight ? PullStatusEnum.loosing : PullStatusEnum.pulling);
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    e.stopPropagation();
    if (!isReachTop(e) || loading) return;

    if (status === PullStatusEnum.loosing) {
      doRefresh();
      props.onRefresh?.();
    } else {
      setDistance(0);
    }
  };

  const trackStyle = useMemo(
    () => ({
      transform: `translate3d(0, ${distance}px, 0)`,
    }),
    [distance],
  );

  return (
    <div className={classNames(name, className)} style={style} ref={rootRef}>
      <div
        className={classNames(`${name}__track`, { [`${name}__track--loosing`]: status !== PullStatusEnum.pulling })}
        style={trackStyle}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        onTouchCancel={onTouchEnd}
      >
        <div className={`${name}__tips`}>
          <div
            className={`${name}__loading`}
            style={{
              height: loadingHeight,
              maxHeight: loadingHeight,
            }}
          >
            {statusNode}
          </div>
        </div>
        {children}
      </div>
    </div>
  );
};

PullDownRefresh.displayName = 'PullDownRefresh';

export default PullDownRefresh;
