import { createPortal } from 'react-dom';
import { ReactElement, ReactPortal } from 'react';
import { resolveContainer } from './getContainer';
import { canUseDocument } from './dom';

export type GetContainer = HTMLElement | (() => HTMLElement) | null;

export function renderToContainer(getContainer: GetContainer, node: ReactElement) {
  if (canUseDocument && getContainer) {
    const container = resolveContainer(getContainer);
    return createPortal(node, container as Element) as ReactPortal;
  }
  return node;
}
