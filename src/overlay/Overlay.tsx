import React, { FC, useRef, useMemo, CSSProperties } from 'react';
import cls from 'classnames';
import { preventDefault } from 'tdesign-mobile-react/shared/dom';
import { AnimatePresence, motion } from 'framer-motion';
import { NativeProps } from '../_util/withNativeProps';
import useConfig from '../_util/useConfig';
import { TdOverlayProps } from './type';

export interface OverlayProps extends TdOverlayProps, NativeProps {
  children?: React.ReactNode;
}

const defaultProps = {
  visible: true,
  destroyOnClose: false,
  forceRender: false,
  color: 'black',
  opacity: 'default',
  disableBodyScroll: true,
  getContainer: null,
  stopPropagation: ['click'],
} as OverlayProps;

const Overlay: FC<TdOverlayProps> = (props) => {
  const { visible, children } = props;
  const { classPrefix } = useConfig();
  const name = `${classPrefix}-overlay`;
  const classes = useMemo(
    () =>
      cls({
        [name]: true,
        [`${name}--active`]: props.visible,
      }),
    [props.visible, name],
  );

  const rootStyles = useMemo(() => {
    const obj: CSSProperties = props.customStyle ?? {};

    if (props.zIndex) {
      obj.zIndex = props.zIndex;
    }
    if (props.duration) {
      obj.transitionDuration = `${props.duration}ms`;
    }
    if (props.backgroundColor) {
      obj.backgroundColor = props.backgroundColor;
    }
    return obj;
  }, [props.customStyle, props.zIndex, props.duration, props.backgroundColor]);

  const handleTouchMove = (e: TouchEvent) => {
    if (props.preventScrollThrough) {
      preventDefault(e, true);
    }
  };

  const handleClick = (e: MouseEvent) => {
    props.onClick?.({ e });
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className={classes}
          style={rootStyles}
          onClick={handleClick}
          onTouchMove={handleTouchMove}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

Overlay.defaultProps = defaultProps;
Overlay.displayName = 'Overlay';

export default Overlay;
