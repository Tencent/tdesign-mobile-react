import React from 'react';
import { Search } from 'tdesign-mobile-react';
import './style/index.less';

export default function Other() {
  const onChange = (val: string) => {
    console.log('change: ', val);
  };
  return (
    <div className="search-example">
      <Search placeholder="搜索预设文案" onChange={onChange} value="搜索预设文案" />
    </div>
  );
}
