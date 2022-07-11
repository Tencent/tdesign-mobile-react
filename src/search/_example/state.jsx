import React, { useState } from 'react';
import { SearchIcon } from 'tdesign-icons-react';
import { Search } from 'tdesign-mobile-react';

export default function Base() {
  const [value, setValue] = useState('搜索预设文案');

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
