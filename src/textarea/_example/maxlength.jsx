import React from 'react';
import { Textarea } from 'tdesign-mobile-react';

export default function Maxlength() {
  return <Textarea placeholder="请输入文字" maxlength={100} label="标签文字" />;
}
