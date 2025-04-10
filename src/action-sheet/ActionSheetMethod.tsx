import React from 'react';
import renderToBody from '../_util/renderToBody';
import ActionSheet from './ActionSheet';
import type { ActionSheetProps } from './ActionSheet';

let destroyRef: () => void;

export function show(config: Partial<ActionSheetProps>) {
  destroyRef?.();

  const app = document.createElement('div');

  document.body.appendChild(app);

  destroyRef = renderToBody(<ActionSheet {...config} visible />);
}

export function close() {
  destroyRef?.();
}
