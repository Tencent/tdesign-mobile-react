import React from 'react';
import { Textarea } from 'tdesign-mobile-react';

export default function TextareaCard() {
  return (
    <>
      <div className="card textarea-example__card">
        <Textarea
          className="textarea"
          label="标签文字"
          placeholder="请输入文字"
          maxlength={500}
          indicator
          layout="vertical"
        />
      </div>

      <div className="card textarea-example__card card">
        <div className="textarea-example__summary">卡片样式</div>
        <Textarea className="textarea" label="标签文字" placeholder="请输入文字" maxlength={500} indicator />
      </div>
    </>
  );
}
