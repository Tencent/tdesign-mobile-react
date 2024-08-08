import { createPortal } from 'react-dom';
import { ReactElement, ReactPortal } from 'react';
import isFunction from 'lodash/isFunction';
import isString from 'lodash/isString';
import { resolveContainer } from './getContainer';
import { canUseDom } from './canUseDom';
import { AttachNode } from '../common';

export type GetContainer = HTMLElement | (() => HTMLElement) | null;

export function renderToContainer(getContainer: GetContainer, node: ReactElement) {
  if (canUseDom && getContainer) {
    const container = resolveContainer(getContainer);
    return createPortal(node, container as Element) as ReactPortal;
  }
  return node;
}

export function getAttach(node: AttachNode): HTMLElement {
  const attachNode = isFunction(node) ? node() : node;

  if (isString(attachNode)) {
    return document.querySelector(attachNode);
  }
  if (attachNode instanceof HTMLElement) {
    return attachNode;
  }
  return document.body;
}
