import React, { CSSProperties, useCallback, useMemo, useState } from 'react';
import { useSpring, animated } from '@react-spring/web';
import ClassNames from 'classnames';
import useUnmountedRef from 'ahooks/lib/useUnmountedRef';
import Overlay from '../overlay';
import { ButtonProps, TdButtonProps } from '../button';
import { StyledProps, TNode } from '../common';
import useConfig from '../_util/useConfig';
import withStopPropagation, { PropagationEvent } from '../_util/withStopPropagation';
import { TdDialogProps } from './type';
import DialogActionBtn from './DialogActionBtn';

export interface DialogProps extends TdDialogProps, StyledProps {}

export const Dialog: React.FC<DialogProps> = (props) => {
  const {
    className,
    showOverlay = true,
    destroyOnClose,
    onOverlayClick,
    closeOnOverlayClick = true,
    buttonLayout = 'horizontal',
    onClose,
    visible,
    title,
    content,
    actions,
    cancelBtn,
    confirmBtn,
    onCancel,
    onClosed,
    onConfirm,
    preventScrollThrough = true,
    zIndex = 1501,
    style,
  } = props;
  const { classPrefix } = useConfig();
  const unmountRef = useUnmountedRef();

  const prefix = useMemo(() => `${classPrefix}-dialog`, [classPrefix]);

  const cls = useCallback((name?: string) => (name ? `${prefix}__${name}` : prefix), [prefix]);

  const btnLayout = useMemo(() => {
    // 按钮超过两个，强制垂直布局
    if (actions && actions.length > 2) return 'vertical';

    return buttonLayout;
  }, [buttonLayout, actions]);

  const [active, setActive] = useState(visible);

  // 弹窗主体动画
  const dialogSpring = useSpring({
    scale: visible ? 1 : 0.8,
    opacity: visible ? 1 : 0,
    onStart: () => {
      setActive(true);
    },
    onRest: () => {
      if (unmountRef.current) return;
      setActive(visible);

      if (!visible && typeof onClosed === 'function') {
        onClosed();
      }
    },
  });

  // 蒙层动画
  const maskSpring = useSpring({
    opacity: visible ? 1 : 0,
    onStart: () => {
      setActive(true);
    },
    onRest: () => {
      setActive(visible);
    },
  });

  // 蒙层点击事件
  const onOverlayClickHandle = useCallback(
    (e) => {
      if (typeof onOverlayClick === 'function') {
        onOverlayClick({ e });
      }

      if (closeOnOverlayClick && typeof onClose === 'function') {
        onClose({ trigger: 'overlay', e });
      }
    },
    [onOverlayClick, closeOnOverlayClick, onClose],
  );

  // 弹窗按钮
  const dialogActions = useMemo<Array<ButtonProps | TNode>>(() => {
    // 按钮类名
    const btnClassName = ClassNames(cls('btn'), cls(`${btnLayout}-btn`));
    const btnCommonProps = {
      className: btnClassName,
    };
    // 为外部传入的按钮添加类名
    if (actions && actions.length)
      return actions.map((action) => {
        if (React.isValidElement(action)) return React.cloneElement(action, { className: btnClassName } as unknown);

        return {
          ...btnCommonProps,
          ...action,
          className: ClassNames((action as ButtonProps).className, btnClassName),
        };
      });

    const defaultActions: Array<ButtonProps | TNode> = [
      {
        ...btnCommonProps,
        content: '',
        theme: 'default',
        onClick: async (e) => {
          if (typeof onCancel === 'function') {
            await Promise.all([onCancel({ e })]);
          }

          if (typeof onClose === 'function') {
            onClose({ trigger: 'cancel', e });
          }
        },
      },
      {
        ...btnCommonProps,
        content: '',
        theme: 'primary',
        onClick: async (e) => {
          if (typeof onConfirm === 'function') {
            await Promise.all([onConfirm({ e })]);
          }
        },
      },
    ];

    if (cancelBtn) {
      if (typeof cancelBtn === 'string') {
        (defaultActions[0] as TdButtonProps).content = cancelBtn;
      } else if (typeof cancelBtn === 'object') {
        defaultActions[0] = {
          ...(defaultActions[0] as ButtonProps),
          ...cancelBtn,
        };
      } else {
        defaultActions[0] = cancelBtn;
      }
    }

    if (confirmBtn) {
      if (typeof confirmBtn === 'string') {
        (defaultActions[1] as TdButtonProps).content = confirmBtn;
      } else if (typeof confirmBtn === 'object') {
        defaultActions[1] = {
          ...(defaultActions[1] as ButtonProps),
          ...confirmBtn,
        };
      } else {
        defaultActions[1] = confirmBtn;
      }
    }

    const btns = defaultActions
      .filter((btn) => {
        if (typeof btn === 'object') return !!(btn as TdButtonProps).content || !!(btn as TdButtonProps).children;

        return !!btn;
      })
      .map((action: ButtonProps | TNode) => {
        if (React.isValidElement(action)) return React.cloneElement(action, { className: btnClassName } as unknown);

        return {
          ...(action as ButtonProps),
          className: ClassNames((action as ButtonProps).className, btnClassName),
        };
      });

    return btnLayout === 'vertical' ? btns.reverse() : btns;
  }, [actions, btnLayout, cancelBtn, cls, confirmBtn, onCancel, onClose, onConfirm]);

  // Dialog Dom
  const dialog = useMemo(
    () => {
      if (destroyOnClose && !active) return <></>;

      return (
        <div className={ClassNames(cls(), className)} style={style}>
          <div className={cls('header')} hidden={!title}>
            <h3 className={cls('title')}>{title}</h3>
          </div>
          <div className={cls('body')} hidden={!content}>
            {content}
          </div>
          <div
            className={ClassNames(cls('footer'), cls(`${btnLayout}-footer`))}
            hidden={!dialogActions || !dialogActions.length}
          >
            {dialogActions.map((btn, index) =>
              typeof btn === 'object' ? <DialogActionBtn {...(btn as TdButtonProps)} key={index} /> : btn,
            )}
          </div>
        </div>
      );
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [active],
  );

  const wrapStyle = useMemo<CSSProperties>(
    () => ({
      zIndex,
      position: 'fixed',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%,-50%)',
    }),
    [zIndex],
  );

  const node = (
    <div
      style={{
        display: active ? 'unset' : 'none',
      }}
    >
      {showOverlay ? (
        <animated.div style={maskSpring}>
          <Overlay visible={visible} onClick={onOverlayClickHandle} />
        </animated.div>
      ) : null}
      <div className="wrap" style={wrapStyle}>
        <animated.div style={dialogSpring}>{dialog}</animated.div>
      </div>
    </div>
  );

  return withStopPropagation(preventScrollThrough ? [PropagationEvent.SCROLL] : [], node);
};

export default Dialog;
