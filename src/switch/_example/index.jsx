import { useState } from 'react';
import { Switch } from 'tdesign-mobile-react';

export default function () {
  const [value, setValue] = useState('开');

  return (
    <Switch
      customValue={['开', '关']}
      defaultValue={'开'}
      label={({ value }) => {
        return value;
      }}
      value={value}
      onChange={(value) => {
        // @ts-ignore
        setValue(value);
        console.log('value ===> ', value);
      }}
    />
  );
}
