import React, { FC, useRef, useMemo, useState } from 'react';
import withNativeProps, { NativeProps } from 'tdesign-mobile-react/_util/withNativeProps';
import { PropagationEvent, withStopPropagation } from 'tdesign-mobile-react/_util/widthStopPropagation';
import { GetContainer, renderToContainer } from 'tdesign-mobile-react/_util/renderToContainer';
import { useLockScroll } from 'tdesign-mobile-react/_util/useLockScroll';
import { useUnmountedRef } from 'ahooks';
import { useSpring, animated } from '@react-spring/web';
import { useShouldRender } from 'tdesign-mobile-react/_util/useShouldRender';

const prefix = 't';
const name = `${prefix}-mask`;

export interface TdMaskProps extends NativeProps {
  visible?: boolean;
  onMaskClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  destroyOnClose?: boolean;
  forceRender?: boolean;
  disableBodyScroll?: boolean;
  color?: 'black' | 'white';
  opacity?: 'default' | 'thin' | 'thick' | number;
  getContainer?: GetContainer;
  afterShow?: () => void;
  afterClose?: () => void;
  stopPropagation?: PropagationEvent[];
  children?: React.ReactNode;
}

const opacityRecord = {
  default: 0.55,
  thin: 0.35,
  thick: 0.75,
};

const defaultProps = {
  visible: true,
  destroyOnClose: false,
  forceRender: false,
  color: 'black',
  opacity: 'default',
  disableBodyScroll: true,
  getContainer: null,
  stopPropagation: ['click'],
} as TdMaskProps;

const Mask: FC<TdMaskProps> = (props) => {
  const ref = useRef<HTMLDivElement>(null);
  useLockScroll(ref, props.visible && props.disableBodyScroll);

  const background = useMemo(() => {
    const opacity = opacityRecord[props.opacity] ?? props.opacity;
    const rgb = props.color === 'white' ? '255, 255, 255' : '0, 0, 0';
    return `rgba(${rgb}, ${opacity})`;
  }, [props.color, props.opacity]);

  const [active, setActive] = useState(props.visible);
  const unmountedRef = useUnmountedRef();
  const { opacity } = useSpring({
    opacity: props.visible ? 1 : 0,
    config: {
      precision: 0.01,
      mass: 1,
      tension: 200,
      friction: 30,
      clamp: true,
    },
    onStart: () => {
      setActive(true);
    },
    onRest: () => {
      if (unmountedRef.current) return;
      setActive(props.visible);
      if (props.visible) {
        props.afterShow?.();
      } else {
        props.afterClose?.();
      }
    },
  });
  const shouldRender = useShouldRender(active, props.forceRender, props.destroyOnClose);

  const node = withStopPropagation(
    props.stopPropagation,
    withNativeProps(
      props,
      <animated.div
        className={name}
        ref={ref}
        style={{
          background,
          opacity,
          ...props.style,
          display: active ? 'unset' : 'none',
        }}
        onClick={(e) => {
          if (e.target === e.currentTarget) {
            props.onMaskClick?.(e);
          }
        }}
      >
        {props.onMaskClick && <div className={`${prefix}-aria-button`} role="button" onClick={props.onMaskClick} />}
        <div className={`${prefix}-content`}>{shouldRender && props.children}</div>
      </animated.div>,
    ),
  );

  return renderToContainer(props.getContainer, node);
};

Mask.defaultProps = defaultProps;
Mask.displayName = 'Mask';

export default Mask;
