import React from 'react';
import { Icon } from 'tdesign-icons-react';
import { Checkbox } from '../index';

export default function () {
  return (
    <>
      <Checkbox 
        label="多选" 
        value="1" 
        icon={[
          <Icon key="1" name="check-rectangle-filled" />,
          <Icon key="2" name="rectangle" />
        ]}
      />
      <Checkbox 
        label="多选" 
        value="2" 
        defaultChecked
        icon={[
          <Icon key="1" name="check-rectangle-filled" />,
          <Icon key="2" name="rectangle" />
        ]}
      />
      <Checkbox 
        label="多选" 
        value="3"
        defaultChecked 
        icon={[
          <Icon key="1" name="check-rectangle-filled" />,
          <Icon key="2" name="rectangle" />
        ]}
      />
    </>
  );
}
