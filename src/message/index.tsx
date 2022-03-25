import { attachMethodsToComponent } from 'tdesign-mobile-react/_util/attachMethodsToComponent';
import _Message from './Message';
import * as methods from './methods';

import './style';

export * from './type';

export const Message = _Message;

const { info, warning, success, error } = methods.default;

export default attachMethodsToComponent(Message, {
  info,
  warning,
  success,
  error,
});
