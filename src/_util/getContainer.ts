import isFunction from 'lodash/isFunction';
import isString from 'lodash/isString';

import { ScrollContainerElement, ScrollContainer } from '../common'

export function resolveContainer(getContainer: ScrollContainerElement | ScrollContainer): ScrollContainerElement {
  if (isString(getContainer)) {
    return getContainer ? (document.querySelector(getContainer) as HTMLElement) : window;
  }
  if (isFunction(getContainer)) {
    return getContainer();
  }
  return getContainer;
}
