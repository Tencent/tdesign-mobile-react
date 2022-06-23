import React, { useState } from 'react';
import { Search } from 'tdesign-mobile-react/search';
import { SearchIcon } from 'tdesign-icons-react';

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
