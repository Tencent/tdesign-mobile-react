import React, { memo, FC, useRef, CSSProperties, MutableRefObject } from 'react';
import identity from 'lodash/identity';
import { useSpring, animated } from '@react-spring/web';
import { createUseGesture, dragAction, pinchAction } from '@use-gesture/react';
import withNativeProps, { NativeProps } from '../_util/withNativeProps';

const useGesture = createUseGesture([dragAction, pinchAction]);

const containerStyle: CSSProperties = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
  height: '100%',
};

const controlStyle: CSSProperties = {
  willChange: 'transfrom',
  cursor: 'grab',
  touchAction: 'none',
  userSelect: 'none',
  overflow: 'hidden',
  maxHeight: '100%',
  maxWidth: '100%',
};

interface ZoomerProps extends NativeProps {
  controlClassName?: string;
  minScale?: number;
  maxScale?: number;
  onScaleChange?: (scale: number) => void;
  dragLockRef?: MutableRefObject<boolean>;
  onTap?: () => void;
}

const defaultProps: ZoomerProps = {
  minScale: 0.618,
  maxScale: 4,
  onScaleChange: identity,
  dragLockRef: { current: false },
  onTap: identity,
};

const Zoomer: FC<ZoomerProps> = memo((props) => {
  const { controlClassName, minScale, maxScale, children, onScaleChange, dragLockRef, onTap } = props;
  const [style, api] = useSpring(() => ({
    x: 0,
    y: 0,
    scale: 1,
    config: { tension: 200 },
  }));
  const containerRef = useRef<HTMLDivElement>(null);
  const controlRef = useRef<HTMLDivElement>(null);

  const bounds = () => {
    let offsetX = 0;
    let offsetY = 0;
    if (controlRef.current && containerRef.current) {
      const scale = style.scale.get();
      const controlWidth = containerRef.current.offsetWidth || 0;
      const controlHeight = containerRef.current.offsetHeight || 0;
      const imageWidth = controlRef.current.offsetWidth || 0;
      const imageHeight = controlRef.current.offsetHeight || 0;
      offsetX = (controlWidth - scale * imageWidth) / 2;
      offsetY = (controlHeight - scale * imageHeight) / 2;
    }
    if (offsetX < 0) {
      offsetX = -offsetX;
    }
    if (offsetY >= 0) {
      offsetY = 0;
    } else {
      offsetY = -offsetY;
    }
    return {
      left: -offsetX,
      right: offsetX,
      top: -offsetY,
      bottom: offsetY,
    };
  };

  useGesture(
    {
      onDrag: ({ pinching, cancel, last, offset: [x, y], tap, elapsedTime }) => {
        if (pinching) return cancel();
        if (tap && elapsedTime > 0 && elapsedTime < 1000) {
          onTap();
          return cancel();
        }
        const scale = style.scale.get();
        dragLockRef.current = scale !== 1;
        if (!dragLockRef.current) return;
        if (last && scale < 1) {
          api.start({ x: 0, y: 0, scale: 1 });
        } else {
          api.start({ x, y });
        }
      },
      onPinch: (state) => {
        const {
          origin: [ox, oy],
          first,
          last,
          movement: [ms],
        } = state;
        let {
          offset: [scale],
          memo,
        } = state;
        if (first) {
          const { width, height, x, y } = controlRef.current.getBoundingClientRect();
          const tx = ox - (x + width / 2);
          const ty = oy - (y + height / 2);
          memo = [style.x.get(), style.y.get(), tx, ty];
        }
        let x = 0;
        let y = 0;
        if (last && scale - 1 < 0.2) {
          scale = 1;
        } else {
          x = memo[0] - (ms - 1) * memo[2];
          y = memo[1] - (ms - 1) * memo[3];
        }
        dragLockRef.current = !last;
        api.start({ scale, x, y });
        onScaleChange(scale);
        return memo;
      },
    },
    {
      target: containerRef,
      drag: {
        from: () => [style.x.get(), style.y.get()],
        bounds,
        rubberband: true,
        pointer: { touch: true },
      },
      pinch: {
        from: () => [style.scale.get(), 0],
        bounds,
        scaleBounds: { min: minScale, max: maxScale },
        rubberband: true,
        pointer: { touch: true },
      },
    },
  );

  return withNativeProps(
    props,
    <div ref={containerRef} style={containerStyle}>
      <animated.div className={controlClassName} ref={controlRef} style={{ ...style, ...controlStyle }}>
        {children}
      </animated.div>
    </div>,
  );
});

Zoomer.defaultProps = defaultProps;
Zoomer.displayName = 'Zoomer';

export default Zoomer;
