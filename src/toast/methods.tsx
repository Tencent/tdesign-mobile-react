import React from 'react';
import ReactDOM from 'react-dom';
import { TdToastProps, ToastOptions } from './type';
import { defaultProps, ToastThemeListEnum } from './constant';
import Toast from './Toast';

function getToastProps(props: ToastOptions) {
  let cur = props;
  if (typeof cur === 'string') {
    cur = {
      message: props,
    };
  }
  return cur;
}

let el;
let curProps: TdToastProps;

const clear = () => {
  if (el && el.parentNode) {
    el.parentNode.removeChild(el);
    if (curProps.onDestroy) {
      curProps.onDestroy?.();
    }
  }
};

const createToast = (props: ToastOptions) => {
  let cur = props;
  if (typeof cur === 'string') {
    cur = {
      message: props,
    };
  }
  const config = { ...defaultProps, ...cur } as TdToastProps;

  clear();

  el = document.createElement('div');
  document.body.appendChild(el);
  ReactDOM.render(<Toast {...{ ...config, el }} />, el);
  curProps = config;

  const destroy = () => {
    document.body.removeChild(el);
  };
  return { destroy };
};

export default {
  createToast,
  success: (props: ToastOptions) => createToast({ ...getToastProps(props), theme: ToastThemeListEnum.success }),
  error: (props: ToastOptions) => createToast({ ...getToastProps(props), theme: ToastThemeListEnum.error }),
  loading: (props: ToastOptions) => createToast({ ...getToastProps(props), theme: ToastThemeListEnum.loading }),
  clear,
};
