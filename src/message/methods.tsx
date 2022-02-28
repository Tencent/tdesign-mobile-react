import React from 'react';
import ReactDOM from 'react-dom';
import { TdMessageProps } from './type';
import { defaultProps, MessageThemeListEnum } from './constant';
import Message from './Message';

const createMessage = (props, theme: MessageThemeListEnum) => {
  const config = { ...defaultProps, ...props };
  const el = document.createElement('div');
  document.body.appendChild(el);
  ReactDOM.render(<Message {...{ ...config, theme, el }} />, el);
};

export default {
  info: (props: TdMessageProps) => createMessage(props, MessageThemeListEnum.info),
  success: (props: TdMessageProps) => createMessage(props, MessageThemeListEnum.success),
  warning: (props: TdMessageProps) => createMessage(props, MessageThemeListEnum.warning),
  error: (props: TdMessageProps) => createMessage(props, MessageThemeListEnum.error),
};
