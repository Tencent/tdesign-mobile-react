import React from 'react';
import { render } from 'tdesign-mobile-react/_util/react-render';
import { MessageThemeList, MessageActionOptionsType } from './type';
import { messageDefaultProps } from './defaultProps';
import Message from './Message';

const isBrowser = typeof window !== 'undefined';

const instanceMap: Map<Element, Record<string, Element>> = new Map();

function destroy(context: Element, root: Element) {
  if (context.contains(root)) {
    context.removeChild(root);
    if (instanceMap.has(root)) {
      instanceMap.delete(root);
    }
  }
}

const createMessage = (props, theme?: MessageThemeList) => {
  const config = {
    ...messageDefaultProps,
    visible: true,
    context: isBrowser ? document.body : null,
    ...props,
  };
  const { context } = config;
  if (!context) {
    console.error('未找到组件, 请确认 context 是否正确');
    return;
  }

  const root = document.createElement('div');
  context.appendChild(root);

  instanceMap.set(root, {
    context,
  });

  render(<Message {...{ ...config, theme, container: root }} />, root);
};

const closeAll = () => {
  if (instanceMap instanceof Map) {
    for (const [key, value] of instanceMap) {
      const { context } = value;
      destroy(context as Element, key);
    }
  }
};

export default {
  info: (props: MessageActionOptionsType) => createMessage(props, 'info'),
  success: (props: MessageActionOptionsType) => createMessage(props, 'success'),
  warning: (props: MessageActionOptionsType) => createMessage(props, 'warning'),
  error: (props: MessageActionOptionsType) => createMessage(props, 'error'),
  closeAll,
};
