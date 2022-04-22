import React, { useState } from 'react';
import { Search } from 'tdesign-mobile-react/search';
import { SearchIcon } from 'tdesign-icons-react';
import TDemoBlock from '../../../site/mobile/components/DemoBlock';
import TDemoHeader from '../../../site/mobile/components/DemoHeader';

export default function Base() {
  const [value1, setValue1] = useState('');
  const [value2, setValue2] = useState('');
  const [value3, setValue3] = useState('');
  const [value4, setValue4] = useState('搜索预设文案');

  return (
    <>
      <TDemoHeader title="Search 搜索框" summary="用于用户输入搜索信息，并进行页面内容搜索" />

      <TDemoBlock title="01 类型" summary="基础搜索框">
        <Search
          focus={false}
          placeholder="搜索预设文案"
          value={value1}
          onChange={(value) => setValue1(value)}
          action="取消"
          leftIcon={<SearchIcon />}
        ></Search>
      </TDemoBlock>
      <TDemoBlock title="02 状态" summary="默认状态">
        <Search
          focus={false}
          placeholder="搜索预设文案"
          value={value2}
          onChange={(value) => setValue2(value)}
          action="取消"
          leftIcon={<SearchIcon />}
        ></Search>
      </TDemoBlock>
      <TDemoBlock title="" summary="点击状态">
        <Search
          focus={false}
          placeholder="搜索预设文案"
          value={value3}
          onChange={(value) => setValue3(value)}
          action="取消"
          leftIcon={<SearchIcon />}
        ></Search>
      </TDemoBlock>
      <TDemoBlock title="" summary="输入状态">
        <Search
          focus={true}
          placeholder="搜索预设文案"
          value={value4}
          onChange={(value) => setValue4(value)}
          action="取消"
          leftIcon={<SearchIcon />}
        ></Search>
      </TDemoBlock>
    </>
  );
}
