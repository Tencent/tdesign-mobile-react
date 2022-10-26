import React from 'react';
import { Textarea } from 'tdesign-mobile-react';

export default function Maxcharacter() {
  return <Textarea placeholder="请输入内容" maxcharacter={100} label="标签文字" />;
}
