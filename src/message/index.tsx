import _Message from './Message';
import * as methods from './show';

import './style';

export * from './type';

export const Message = _Message;

const { info, warning, success, error } = methods.default;

Message.info = info;
Message.warning = warning;
Message.success = success;
Message.error = error;

export default {
  Message,
};
