import React, { useCallback, useMemo } from 'react';
import { useSpring, animated } from '@react-spring/web';
import ClassNames from 'classnames';
import Mask from 'tdesign-mobile-react/mask';
import Button, { TdButtonProps } from 'tdesign-mobile-react/button';
import { StyledProps, TNode } from 'tdesign-mobile-react/common';
import useConfig from '../_util/useConfig';
import widthStopPropagation, { PropagationEvent } from '../_util/widthStopPropagation';
import { TdDialogProps } from './type';

export interface DialogProps extends TdDialogProps, StyledProps {}

export const Dialog: React.FC<DialogProps> = (props) => {
  const {
    className,
    showOverlay = true,
    onOverlayClick,
    closeOnOverlayClick,
    onClose,
    visible,
    title,
    content,
    actions,
    cancelBtn,
    confirmBtn,
    onCancel,
    onConfirm,
    preventScrollThrough = true,
    style,
  } = props;
  const { classPrefix } = useConfig();

  const prefix = useMemo(() => `${classPrefix}-dialog`, [classPrefix]);

  const cls = useCallback((name?: string) => (name ? `${prefix}__${name}` : prefix), [prefix]);

  // 弹窗主体动画
  const dialogSpring = useSpring({
    scale: visible ? 1 : 0.8,
    opacity: visible ? 1 : 0,
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

  // 弹窗按钮事件
  const dialogActions = useMemo<Array<TdButtonProps | TNode>>(() => {
    if (actions && actions.length) return actions;

    const defaultActions: Array<TdButtonProps | TNode> = [
      {
        content: '',
        theme: 'default',
        type: 'button',
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
        content: '',
        theme: 'primary',
        type: 'button',
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
      }

      defaultActions[0] = cancelBtn;
    }

    if (confirmBtn) {
      if (typeof confirmBtn === 'string') {
        (defaultActions[1] as TdButtonProps).content = confirmBtn;
      }

      defaultActions[1] = confirmBtn;
    }

    return defaultActions.filter((btn) => {
      if (typeof btn === 'object') return !!(btn as TdButtonProps).content;

      return !!btn;
    });
  }, [actions, cancelBtn, confirmBtn, onCancel, onClose, onConfirm]);

  // Dialog Dom
  const dialog = useMemo(
    () => (
      <div className={ClassNames(cls(), className)} style={style}>
        {!!title && (
          <div className={ClassNames(cls('header'))}>
            <h3 className={ClassNames(cls('title'))}>{title}</h3>
          </div>
        )}
        {!!content && <div className={ClassNames(cls('body'))}>{content}</div>}
        <div className={cls('footer')}>
          {dialogActions.map((btn) => (typeof btn === 'object' ? <Button {...(btn as TdButtonProps)} /> : btn))}
        </div>
      </div>
    ),
    [className, cls, content, dialogActions, style, title],
  );

  const node = (
    <div>
      {showOverlay ? <Mask click={onOverlayClickHandle} /> : null}
      <animated.div style={dialogSpring}>{dialog}</animated.div>
    </div>
  );

  return widthStopPropagation(preventScrollThrough ? [PropagationEvent.SCROLL] : [], node);
};

export default Dialog;
