import React from 'react';
import { Checkbox } from 'tdesign-mobile-react/checkbox';

export default function () {
  return (
    <>
      <Checkbox.Group
        max={2}
      >
        <Checkbox label="苹果" value="1"/>
        <Checkbox label="香蕉" value="2"/>
        <Checkbox label="菠萝" value="3"/>
      </Checkbox.Group>
    </>
  );
}
