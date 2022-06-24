import React from 'react';
import ReactDOM from 'react-dom';
import { MessageThemeList, TdMessageProps } from './type';
import { defaultProps } from './constant';
import Message from './Message';

const createMessage = (props, theme?: MessageThemeList) => {
  const config = { ...defaultProps, ...props };
  let container = document.getElementById('#t-message');
  if (container && ReactDOM.unmountComponentAtNode(container)) {
    container.parentNode.removeChild(container);
  }
  container = document.createElement('div');
  container.id = '#t-message';
  document.body.appendChild(container);
  ReactDOM.render(<Message {...{ ...config, theme, container }} />, container);
};

export default {
  info: (props: TdMessageProps) => createMessage(props, 'info'),
  success: (props: TdMessageProps) => createMessage(props, 'success'),
  warning: (props: TdMessageProps) => createMessage(props, 'warning'),
  error: (props: TdMessageProps) => createMessage(props, 'error'),
};
