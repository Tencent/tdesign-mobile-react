import React, { useState } from 'react';
import { Tag } from 'tdesign-mobile-react';
import { Icon } from 'tdesign-icons-react';

const TagOptions = [
  {
    size: 'medium',
    name: '标签',
  },
  {
    name: '标签',
    size: 'medium',
    icon: <Icon name="app" />,
  },
];
const ClosableDemo = () => {
  const [tags, setTags] = useState(TagOptions);

  const onClose = (dex) => {
    setTags((pre) => {
      const temp = [...pre];
      temp.splice(dex, 1);
      return temp;
    });
  };

  return (
    <>
      {tags.map((item, index) => (
        <Tag key={index} theme="primary" closable size={item.size} icon={item.icon} onClose={() => onClose(index)}>
          标签
        </Tag>
      ))}
    </>
  );
};

export default ClosableDemo;
