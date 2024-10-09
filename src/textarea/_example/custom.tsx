import React from 'react';
import { Textarea } from 'tdesign-mobile-react';

export default function Events() {
  return (
    <>
      <div className="custom textarea-example__custom ">
        <text className="textarea-example__label">标签文字</text>
        <Textarea className="textarea" placeholder="请输入文字" bordered maxlength={100} indicator />
      </div>
    </>
  );
}
