import React, { useRef, useState, ReactNode, useEffect } from 'react';
import classNames from 'classnames';
import uniqueId from 'lodash/uniqueId';
import { useDrag } from '@use-gesture/react';
import { useSpring, animated } from '@react-spring/web';
import isBoolean from 'lodash/isBoolean';
import isNumber from 'lodash/isNumber';
import debounce from 'lodash/debounce';
import { Loading } from 'tdesign-mobile-react';
import useConfig from '../_util/useConfig';
import withNativeProps, { NativeProps } from '../_util/withNativeProps';
import getScrollParent from '../_util/getScrollParent';
import useDefault from '../_util/useDefault';
import { TdPullDownRefreshProps } from './type';
import { pullDownRefreshDefaultProps } from './defaultProps';

const convertUnit = (val: string | number | undefined) => {
  if (val == null) return 0;
  return isNumber(val) ? `${val}px` : val;
};

const reconvertUnit = (val: string | number | undefined) => {
  if (val == null) return 0;
  return isNumber(val) ? Number(val) : Number(val.slice(0, -2));
};

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
}

const threshold = 50;

const PullDownRefresh: React.FC<PullDownRefreshProps> = (props) => {
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
  } = props;
  const [status, originalSetStatus] = useState(PullStatusEnum.normal);
  const rootRef = useRef<HTMLDivElement>(null);
  const scrollParentRef = useRef<Element | Window>(null);
  const [value, onChange] = useDefault(props.value, props.defaultValue, props.onChange);

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

  const onReachBottom = debounce(
    () => {
      const scrollTop = document.documentElement.scrollTop || document.body.scrollTop; // 滚动高度
      const { clientHeight, scrollHeight } = document.documentElement; // 可视区域/屏幕高度， 页面高度
      const distance = 20; // 距离视窗 20 时，开始触发
      if (scrollTop + clientHeight >= scrollHeight - distance) {
        props.onScrolltolower?.();
      }
    },
    300,
    {
      leading: true,
      trailing: false,
    },
  );

  useEffect(() => {
    window.addEventListener('scroll', onReachBottom);
    return () => {
      window.removeEventListener('scroll', onReachBottom);
    };
  }, [onReachBottom]);

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
    if (!isBoolean(value)) {
      doRefresh();
    }
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

PullDownRefresh.defaultProps = pullDownRefreshDefaultProps;
PullDownRefresh.displayName = 'PullDownRefresh';

export default PullDownRefresh;
