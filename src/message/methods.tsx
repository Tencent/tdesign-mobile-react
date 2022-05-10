import React from 'react';
import ReactDOM from 'react-dom';
import { MessageThemeList, TdMessageProps } from './type';
import { defaultProps } from './constant';
import Message from './Message';

const createMessage = (props, theme?: MessageThemeList) => {
  const config = { ...defaultProps, ...props };
  const container = document.createElement('div');
  document.body.appendChild(container);
  ReactDOM.render(<Message {...{ ...config, theme, container }} />, container);
};

export default {
  info: (props: TdMessageProps) => createMessage(props, 'info'),
  success: (props: TdMessageProps) => createMessage(props, 'success'),
  warning: (props: TdMessageProps) => createMessage(props, 'warning'),
  error: (props: TdMessageProps) => createMessage(props, 'error'),
};
