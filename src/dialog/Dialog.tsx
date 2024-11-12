import React, { useCallback, useEffect, useMemo, useState } from 'react';
import get from 'lodash/get';
import isString from 'lodash/isString';
import { CloseIcon } from 'tdesign-icons-react';
import classNames from 'classnames';
import Popup from '../popup';
import Button from '../button';
import { StyledProps } from '../common';
import { dialogDefaultProps } from './defaultProps';
import { TdDialogProps } from './type';
import useDefaultProps from '../hooks/useDefaultProps';
import { usePrefixClass } from '../hooks/useClass';
import parseTNode from '../_util/parseTNode';

export interface DialogProps extends TdDialogProps, StyledProps {}

export const Dialog: React.FC<DialogProps> = (props) => {
  const {
    className,
    showOverlay,
    destroyOnClose,
    onOverlayClick,
    overlayProps,
    closeOnOverlayClick,
    buttonLayout,
    onClose,
    visible,
    title,
    content,
    children,
    actions,
    cancelBtn,
    confirmBtn,
    onCancel,
    onClosed,
    onConfirm,
    preventScrollThrough,
    zIndex,
    style,
    width,
    closeBtn,
    middle,
    top,
  } = useDefaultProps(props, dialogDefaultProps);

  const dialogClass = usePrefixClass('dialog');
  const rootStyles = useMemo(() => ({ width: isString(width) ? width : `${width}px` }), [width]);
  const isTextStyleBtn = useMemo(
    () => [confirmBtn, cancelBtn, ...(actions || [])].some((item) => get(item, 'variant') === 'text'),
    [actions, cancelBtn, confirmBtn],
  );
  const footerClass = useMemo(
    () =>
      classNames(`${dialogClass}__footer`, {
        [`${dialogClass}__footer--column`]: buttonLayout === 'vertical',
        [`${dialogClass}__footer--full`]: isTextStyleBtn && get(actions, 'length', 0) === 0,
      }),
    [actions, buttonLayout, dialogClass, isTextStyleBtn],
  );
  const buttonClass = useMemo(
    () =>
      classNames(`${dialogClass}__button`, {
        [`${dialogClass}__button--${buttonLayout}`]: !isTextStyleBtn,
        [`${dialogClass}__button--text`]: isTextStyleBtn,
      }),
    [buttonLayout, dialogClass, isTextStyleBtn],
  );

  const calcBtn = (btn: any) => (isString(btn) ? { content: btn } : btn);
  const actionsBtnProps = useMemo(() => actions?.map((item) => calcBtn(item)), [actions]);
  const confirmBtnProps = useMemo(
    () => ({
      theme: 'primary',
      ...calcBtn(confirmBtn),
    }),
    [confirmBtn],
  );
  const cancelBtnProps = useMemo(
    () => ({
      theme: isTextStyleBtn ? 'default' : 'light',
      ...calcBtn(cancelBtn),
    }),
    [cancelBtn, isTextStyleBtn],
  );

  const [active, setActive] = useState(visible);
  useEffect(() => {
    setActive(visible);
  }, [visible]);

  // 蒙层点击事件
  const onOverlayClickHandle = useCallback(
    (e) => {
      if (typeof onOverlayClick === 'function') {
        onOverlayClick({ e });
      }

      if (closeOnOverlayClick && typeof onClose === 'function') {
        setActive(false);
        onClose({ trigger: 'overlay', e });
      }
    },
    [onOverlayClick, closeOnOverlayClick, onClose],
  );

  const onCloseButtonClickHandle = useCallback(
    (e) => {
      if (typeof onClose === 'function') {
        onClose({ trigger: 'close-btn', e });
      }
      setActive(false);
    },
    [onClose],
  );

  const onCancelButtonClickHandle = useCallback(
    (e) => {
      setActive(false);
      if (typeof onClose === 'function') {
        onClose({ trigger: 'cancel', e });
      }
      if (typeof onCancel === 'function') {
        onCancel({ e });
      }
    },
    [onCancel, onClose],
  );

  const onConfirmButtonClickHandle = useCallback(
    (e) => {
      setActive(false);
      if (typeof onConfirm === 'function') {
        onConfirm(e);
      }
    },
    [onConfirm],
  );

  const renderContentNode = () => {
    const contentNode = parseTNode(children, null, content);
    if (!contentNode) {
      return null;
    }

    return (
      <div className={`${dialogClass}__body`}>
        <div className={`${dialogClass}__body-text`}>{contentNode}</div>
      </div>
    );
  };

  const renderActionsNode = () => {
    const actionsNode = parseTNode(actions);
    if (actionsNode && actionsBtnProps) {
      return actionsBtnProps.map((item, index) => (
        <Button key={index} {...item} className={buttonClass} onClick={onCancelButtonClickHandle}></Button>
      ));
    }
  };

  const renderCancelButtonNode = () => {
    const cancelButtonNode = parseTNode(cancelBtn);
    if (!actions && cancelButtonNode) {
      return <Button {...cancelBtnProps} className={buttonClass} onClick={onCancelButtonClickHandle}></Button>;
    }
  };

  const renderConfirmButtonNode = () => {
    const confirmButtonNode = parseTNode(confirmBtn);
    if (!actions && confirmButtonNode) {
      return <Button {...confirmBtnProps} className={buttonClass} onClick={onConfirmButtonClickHandle}></Button>;
    }
  };

  return (
    <Popup
      visible={active}
      placement="center"
      showOverlay={showOverlay}
      preventScrollThrough={preventScrollThrough}
      overlayProps={overlayProps}
      destroyOnClose={destroyOnClose}
      zIndex={zIndex}
      onClose={onOverlayClickHandle}
      onClosed={onClosed}
    >
      <div className={`${dialogClass} ${className}`} style={{ ...rootStyles, ...style }}>
        {parseTNode(top)}
        {closeBtn && (
          <div className={`${dialogClass}__close-btn`}>
            <CloseIcon onClick={onCloseButtonClickHandle} />
          </div>
        )}
        <div className={`${dialogClass}__content`}>
          {title && <div className={`${dialogClass}__header`}>{parseTNode(title)}</div>}
          {renderContentNode()}
        </div>
        {parseTNode(middle)}
        <div className={footerClass}>
          {renderActionsNode()}
          {renderCancelButtonNode()}
          {renderConfirmButtonNode()}
        </div>
      </div>
    </Popup>
  );
};

export default Dialog;
