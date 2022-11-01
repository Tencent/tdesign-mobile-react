import React, { useState } from 'react';
import { SearchIcon } from 'tdesign-icons-react';
import { Search, CellGroup } from 'tdesign-mobile-react';

export default function Base() {
  const [value, setValue] = useState('');

  return (
    <CellGroup title="基础搜索框">
      <Search
        placeholder="搜索预设文案"
        value={value}
        onChange={(value) => setValue(value)}
        action="取消"
        leftIcon={<SearchIcon />}
      ></Search>
    </CellGroup>
  );
}
