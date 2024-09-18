import React from 'react';
import { Checkbox, CheckboxGroupChangeContext, CheckboxGroupValue } from 'tdesign-mobile-react';

export default function () {
  const checkboxGroupChange = (value: CheckboxGroupValue, context: CheckboxGroupChangeContext) => {
    console.log('value:', value);
    console.log('Event:', context);
  };

  return (
    <Checkbox.Group className="box" defaultValue={['checkbox1', 'checkbox2']} onChange={checkboxGroupChange}>
      <Checkbox block={false} label="多选标题" value="checkbox1" />
      <Checkbox block={false} label="多选标题" value="checkbox2" />
      <Checkbox block={false} label="上限四字" value="checkbox3" />
    </Checkbox.Group>
  );
}
