import React from 'react';
import { attachMethodsToComponent } from '../_util/attachMethodsToComponent';
import _Message from './Message';
import type { MessageProps } from './Message';
import * as methods from './methods';
import type {
  MessageInfoMethod,
  MessageErrorMethod,
  MessageCloseAll,
  MessageSuccessMethod,
  MessageWarningMethod,
} from './type';

import './style';

export * from './type';
export interface MessageType extends React.FC<MessageProps> {
  info: MessageInfoMethod;
  warning: MessageWarningMethod;
  success: MessageSuccessMethod;
  error: MessageErrorMethod;
  closeAll: MessageCloseAll;
}

const { info, warning, success, error, closeAll } = methods.default;

export const Message: MessageType = attachMethodsToComponent(_Message, {
  info,
  warning,
  success,
  error,
  closeAll,
});

export default Message;
