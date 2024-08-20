import { createPortal } from 'react-dom';
import { ReactElement, ReactPortal } from 'react';
import { resolveContainer } from './getContainer';
import { canUseDom } from './canUseDom';

export type GetContainer = HTMLElement | (() => HTMLElement) | null;

export function renderToContainer(getContainer: GetContainer, node: ReactElement) {
  if (canUseDom && getContainer) {
    const container = resolveContainer(getContainer);
    return createPortal(node, container as Element) as ReactPortal;
  }
  return node;
}
