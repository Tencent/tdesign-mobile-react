import React, { useState } from 'react';
import { SearchIcon } from 'tdesign-icons-react';
import { Search, CellGroup } from 'tdesign-mobile-react';

export default function Base() {
  const [value1, setValue1] = useState('搜索预设文案');
  const [value2, setValue2] = useState('搜索预设文案');
  const [value3, setValue3] = useState('搜索预设文案');

  return (
    <>
      <CellGroup title="默认状态">
        <Search
          placeholder="搜索预设文案"
          value={value1}
          onChange={(value) => setValue1(value)}
          action="取消"
          leftIcon={<SearchIcon />}
        ></Search>
      </CellGroup>
      <CellGroup title="点击状态">
        <Search
          focus={true}
          placeholder="搜索预设文案"
          value={value2}
          onChange={(value) => setValue2(value)}
          action="取消"
          leftIcon={<SearchIcon />}
        ></Search>
      </CellGroup>
      <CellGroup title="输入状态">
        <Search
          focus={true}
          placeholder="搜索预设文案"
          value={value3}
          onChange={(value) => setValue3(value)}
          action="取消"
          leftIcon={<SearchIcon />}
        ></Search>
      </CellGroup>
    </>
  );
}
