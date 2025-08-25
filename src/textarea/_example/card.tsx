import React from 'react';
import { Textarea } from 'tdesign-mobile-react';

export default function TextareaCard() {
  return (
    <div>
      <div className="card textarea-example__card">
        <Textarea
          className="textare"
          label="标签文字"
          placeholder="预设长文本预设长文本"
          maxlength={500}
          indicator
          layout="vertical"
        />
      </div>

      <div className="card textarea-example__card">
        <div className="textarea-example__summary">卡片样式</div>
        <Textarea className="textarea card" label="标签文字" placeholder="请输入文字" maxlength={500} indicator />
      </div>
    </div>
  );
}
