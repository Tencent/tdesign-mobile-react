import isFunction from 'lodash/isFunction';

export function resolveContainer(getContainer: HTMLElement | (() => HTMLElement) | undefined | null) {
  const container = isFunction(getContainer) ? getContainer() : getContainer;
  return container || document.body;
}
