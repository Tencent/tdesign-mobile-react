import React from 'react';
import { Stepper, Cell } from 'tdesign-mobile-react';

export default function Base() {
  return <Cell title="文字标题" rightIcon={<Stepper></Stepper>}></Cell>;
}
