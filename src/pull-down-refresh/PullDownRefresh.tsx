import React, { useRef, useState, ReactNode, useEffect } from 'react';
import classNames from 'classnames';
import identity from 'lodash/identity';
import uniqueId from 'lodash/uniqueId';
import { useDrag } from '@use-gesture/react';
import { useSpring, animated } from '@react-spring/web';
import isBoolean from 'lodash/isBoolean';
import Loading from '../loading';
import useConfig from '../_util/useConfig';
import withNativeProps, { NativeProps } from '../_util/withNativeProps';
import getScrollParent from '../_util/getScrollParent';
import delay from '../_util/delay';
import { TdPullDownRefreshProps } from './type';

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
  threshold?: number;
  onRefresh?: () => Promise<unknown>;
}

const defaultProps = {
  loadingBarHeight: 50,
  loadingTexts: ['下拉刷新', '松手刷新', '正在刷新', '刷新完成'],
  maxBarHeight: 80,
  threshold: 50,
  refreshTimeout: 3000,
  disabled: false,
  onRefresh: () => delay(2000),
  onTimeout: identity,
};

const PullDownRefresh: React.FC<PullDownRefreshProps> = (props) => {
  const {
    children,
    disabled,
    loadingTexts,
    loadingProps,
    loadingBarHeight,
    maxBarHeight,
    threshold,
    refreshTimeout,
    onRefresh,
    onTimeout,
    value,
    onChange,
  } = props;
  const [status, originalSetStatus] = useState(PullStatusEnum.normal);
  const rootRef = useRef<HTMLDivElement>(null);
  const scrollParentRef = useRef<Element | Window>(null);
  const { classPrefix } = useConfig();
  const name = `${classPrefix}-pull-down-refresh`;
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

  const doRefresh = async () => {
    setStatus(PullStatusEnum.loading);
    api.start({ y: loadingBarHeight });
    try {
      const timeoutId = uniqueId(`${name}-timeout_`);
      let timeoutTid: any;
      const res = await Promise.race([
        onRefresh(),
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
    if (!isBoolean(value)) {
      doRefresh();
    }
    onRefresh();
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
      bounds: { top: 0, bottom: maxBarHeight },
      pointer: { touch: true },
      axis: 'y',
      enabled: !disabled && status !== PullStatusEnum.loading,
    },
  );

  const statusText = getStatusText(status, loadingTexts);
  let statusNode: ReactNode = statusText;
  if (status === PullStatusEnum.loading) {
    statusNode = (
      <Loading
        className={`${name}__loading`}
        text={<span className={`${name}__loading-icon`}>{statusText}</span>}
        {...loadingProps}
      />
    );
  }

  return withNativeProps(
    props,
    <div className={name} ref={rootRef}>
      <animated.div className={`${name}__track`} style={{ y }}>
        <div
          className={classNames(`${name}__loading`, `${name}__loading-icon`, `${name}__max`)}
          style={{ height: loadingBarHeight }}
        >
          {statusNode}
        </div>
        {children}
      </animated.div>
    </div>,
  );
};

PullDownRefresh.defaultProps = defaultProps;
PullDownRefresh.displayName = 'PullDownRefresh';

export default PullDownRefresh;
