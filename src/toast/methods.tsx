import React from 'react';
import ReactDOM from 'react-dom';
import { TdToastProps } from './type';
import { defaultProps, ToastThemeListEnum } from './constant';
import Toast from './Toast';

const createToast = (props, theme?: ToastThemeListEnum) => {
  const config = { ...defaultProps, ...props };
  const el = document.createElement('div');
  document.body.appendChild(el);
  ReactDOM.render(<Toast {...{ ...config, theme, el }} />, el);
  const destory = () => {
    document.body.removeChild(el);
  };
  return { destory };
};

export default {
  createToast,
  success: (props: TdToastProps) => createToast(props, ToastThemeListEnum.success),
  fail: (props: TdToastProps) => createToast(props, ToastThemeListEnum.fail),
  warning: (props: TdToastProps) => createToast(props, ToastThemeListEnum.warning),
  loading: (props: TdToastProps) => createToast(props, ToastThemeListEnum.loading),
};
