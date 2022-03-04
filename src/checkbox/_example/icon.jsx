import React from 'react';
import { Checkbox } from 'tdesign-mobile-react/checkbox';
import { Icon } from 'tdesign-icons-react';

export default function () {
  return (
    <>
      <Checkbox 
        label="苹果" 
        value="1" 
        icon={[
          <Icon key="1" name="check-rectangle-filled" />,
          <Icon key="2" name="check-rectangle" />
        ]}
      />
    </>
  );
}
