import React from 'react';
import { Stepper, Cell } from 'tdesign-mobile-react';

export default function UnitStepper() {
  return <Cell title="文字标题（单位）" rightIcon={<Stepper step={2}></Stepper>}></Cell>;
}
