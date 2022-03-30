import React, { useState } from 'react';
import { Tag } from 'tdesign-mobile-react';

const TagOptions = [
  {
    size: 'medium',
    name: '标签',
  },
];
const ClosableDemo = React.memo(() => {
  const [tags, setTags] = useState(TagOptions);

  const onClose = (dex) => {
    setTags((pre) => {
      const temp = [...pre];
      temp.splice(dex, 1);
      return temp;
    });
  };

  return (
    <div className="t-tag__demo-block">
      {tags.map((opt, dex) => {
        return (
          <Tag key={dex} theme="primary" closable size={opt.size} onClose={() => onClose(dex)}>
            标签
          </Tag>
        );
      })}
    </div>
  );
});

export default ClosableDemo;
