import React, { useState } from 'react';
import { SearchIcon } from 'tdesign-icons-react';
import { Search } from '../index';

export default function Base() {
  const [value, setValue] = useState('');

  return (
    <Search
      focus={true}
      placeholder="搜索预设文案"
      value={value}
      onChange={(value) => setValue(value)}
      action="取消"
      leftIcon={<SearchIcon />}
    ></Search>
  );
}
