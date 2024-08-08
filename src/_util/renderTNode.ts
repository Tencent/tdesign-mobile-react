import { ReactNode } from 'react';
import { TNode } from '../common';

interface JSXRenderContext<T = Record<string, any>> {
  defaultNode?: ReactNode;
  params?: T;
  wrap?: (node: ReactNode) => ReactNode;
}

export const renderTNode = <T = any>(node: TNode<T>, options: JSXRenderContext<T>): ReactNode => {
  const wrap = options.wrap ?? ((node) => node);
  if (typeof node === 'function') {
    return wrap(node(options.params));
  }
  if (node === true) {
    return wrap(options.defaultNode);
  }
  if (!node) {
    return null;
  }
  return wrap(node);
};
