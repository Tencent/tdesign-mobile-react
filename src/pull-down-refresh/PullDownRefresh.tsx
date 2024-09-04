import React, { useRef, useState, type ReactNode, useEffect } from 'react';
import classNames from 'classnames';
import uniqueId from 'lodash/uniqueId';
import { useDrag } from '@use-gesture/react';
import { useSpring, animated } from '@react-spring/web';
import isBoolean from 'lodash/isBoolean';
import { useDebounceFn } from 'ahooks';
import Loading from '../loading';
import withNativeProps, { NativeProps } from '../_util/withNativeProps';
import getScrollParent from '../_util/getScrollParent';
import useDefault from '../_util/useDefault';
import type { TdPullDownRefreshProps } from './type';
import { pullDownRefreshDefaultProps } from './defaultProps';
import { usePrefixClass } from '../hooks/useClass';
import useDefaultProps from '../hooks/useDefaultProps';
import { convertUnit, reconvertUnit } from '../_util/convertUnit';

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

export interface PullDownRefreshProps extends TdPullDownRefreshProps, NativeProps {
  disabled?: boolean;
  onRefresh?: () => void;
  children?: React.ReactNode;
}

const threshold = 50;

const PullDownRefresh: React.FC<PullDownRefreshProps> = (originProps) => {
  const props = useDefaultProps<PullDownRefreshProps>(originProps, pullDownRefreshDefaultProps);
  const {
    className,
    style,
    children,
    disabled,
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
  const scrollParentRef = useRef<Element | Window>(null);
  const [value, onChange] = useDefault(propsValue, defaultValue, propsOnChange);

  const name = usePrefixClass('pull-down-refresh');

  const setStatus = (nextStatus: PullStatusEnum) => {
    if (nextStatus !== status) originalSetStatus(nextStatus);
  };

  const [{ y }, api] = useSpring(
    () => ({
      y: 0,
      config: { tension: 300, friction: 30, clamp: true },
    }),
    [],
  );

  useEffect(() => {
    if (onChange) {
      onChange(value);
    }
    if (isBoolean(value) && !value) {
      setStatus(PullStatusEnum.success);
      api.start({ y: 0 });
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
    api.start({ y: reconvertUnit(loadingBarHeight) });
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
      api.start({
        to: async (next) => {
          await next({ y: 0 });
          setStatus(PullStatusEnum.normal);
        },
      });
    }
  };
  const handleRefresh = () => {
    doRefresh();
    onRefresh?.();
  };

  useDrag(
    (state) => {
      const [, offsetY] = state.offset;
      if (state.first) {
        scrollParentRef.current = getScrollParent(rootRef.current);
        setStatus(PullStatusEnum.pulling);
      }

      if (!scrollParentRef.current) return;
      if (state.last) {
        if (status === PullStatusEnum.loosing) {
          handleRefresh();
        } else {
          setStatus(PullStatusEnum.normal);
          api.start({ y: 0 });
        }
      } else {
        setStatus(offsetY >= threshold ? PullStatusEnum.loosing : PullStatusEnum.pulling);
        api.start({ y: offsetY, immediate: true });
      }
    },
    {
      target: rootRef,
      from: [0, y.get()],
      bounds: { top: 0, bottom: reconvertUnit(maxBarHeight) },
      pointer: { touch: true },
      axis: 'y',
      enabled: !disabled && status !== PullStatusEnum.loading,
    },
  );

  const statusText = getStatusText(status, loadingTexts);
  let statusNode: ReactNode = <div className={`${name}__text`}>{statusText}</div>;
  if (status === PullStatusEnum.loading) {
    statusNode = <Loading text={statusText} size="24px" {...loadingProps} />;
  }
  const loadingHeight = convertUnit(loadingBarHeight);

  return withNativeProps(
    props,
    <div className={classNames(name, className)} style={style} ref={rootRef}>
      <animated.div
        className={classNames(`${name}__track`, { [`${name}__track--loosing`]: status !== PullStatusEnum.pulling })}
        style={{ y }}
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
      </animated.div>
    </div>,
  );
};

PullDownRefresh.displayName = 'PullDownRefresh';

export default PullDownRefresh;
