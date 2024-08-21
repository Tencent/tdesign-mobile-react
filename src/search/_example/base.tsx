import React, { useState } from 'react';
import { Search } from 'tdesign-mobile-react';

export default function Base() {
  const [value, setValue] = useState<string>('');
  const onChange = (val: string) => {
    console.log('change: ', val);
    setValue(val);
  };
  const onBlur = () => {
    console.log('blur');
  };
  const onClear = () => {
    console.log('clear');
  };
  const onFocus = () => {
    console.log('focus');
  };

  const onSubmit = () => {
    console.log('submit');
  };
  const onActionClick = () => {
    console.log('action-click');
  };
  return (
    <div className="search-example">
      <Search
        value={value}
        placeholder="请输入关键字"
        onActionClick={onActionClick}
        onBlur={onBlur}
        onChange={onChange}
        onClear={onClear}
        onFocus={onFocus}
        onSubmit={onSubmit}
      />
    </div>
  );
}
