import React from 'react';
import { Textarea } from 'tdesign-mobile-react';

export default function Maxlength() {
  return <Textarea placeholder="请输入内容" maxlength={20} />;
}
