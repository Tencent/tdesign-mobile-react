import React from 'react';
import ReactDOM from 'react-dom';
import { TdMessageProps } from './type';
import { defaultProps, MessageThemeListEnum } from './constant';
import Message from './Message';

const createMessage = (props, theme: MessageThemeListEnum) => {
  const config = { ...defaultProps, ...props };
  const container = document.createElement('div');
  document.body.appendChild(container);
  ReactDOM.createPortal(<Message {...{ ...config, theme, container }} />, document.body);
};

export default {
  info: (props: TdMessageProps) => createMessage(props, MessageThemeListEnum.info),
  success: (props: TdMessageProps) => createMessage(props, MessageThemeListEnum.success),
  warning: (props: TdMessageProps) => createMessage(props, MessageThemeListEnum.warning),
  error: (props: TdMessageProps) => createMessage(props, MessageThemeListEnum.error),
};
