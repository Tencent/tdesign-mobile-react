import React from 'react';
import { Checkbox } from 'tdesign-mobile-react/checkbox';

export default function () {
  return (
    <>
      <Checkbox.Group defaultValue={['1', '2']} max={2}>
        <Checkbox label="多选" value="1" />
        <Checkbox label="多选" value="2" />
        <Checkbox label="多选" value="3" />
      </Checkbox.Group>
    </>
  );
}
