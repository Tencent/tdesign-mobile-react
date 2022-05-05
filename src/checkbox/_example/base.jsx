import React from 'react';
import { Checkbox } from 'tdesign-mobile-react/checkbox';

export default function () {
  return (
    <>
      <Checkbox label="多选" />
      <Checkbox label="多选" checked />
      <Checkbox label="多选" checked />
      <Checkbox label="多选" maxContentRow={2} content="多选多选多选多选多选多选多选多选多选多选多选多选多选多选多选多选多选多选多选多选多选多选多选多选多选多选多选多选多选多选多选多选" />
      <Checkbox label="多选" disabled maxContentRow={2} content="多选多选多选多选多选多选多选多选多选多选多选多选多选多选多选多选多选多选多选多选多选多选多选多选多选多选多选多选多选多选多选多选" />
    </>
  );
}
