import React from 'react';
import { Checkbox } from '../index';

export default function () {
  return (
    <>
      <Checkbox label="多选" disabled/>
      <Checkbox label="多选" checked disabled/>
      <Checkbox label="多选" align="right" disabled/>
      <Checkbox label="多选" align="right" checked disabled/>
    </>
  );
}
