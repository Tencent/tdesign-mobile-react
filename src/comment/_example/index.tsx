import React from 'react';
import TDemoHeader from '../../../site/mobile/components/DemoHeader';
import TDemoBlock from '../../../site/mobile/components/DemoBlock';
import Base from './base';
import Image from './image';
import Reply from './reply';
import './style/index.less';
import LongPress from './long-press';

export default function CommentDemo() {
  return (
    <div className="tdesign-mobile-demo">
      <TDemoHeader
        title="Comment 评论"
        summary="评论用于对页面内容的反馈、评价、讨论等，如对文章的评价，对话题的讨论等。"
      />
      <TDemoBlock title="01 组件类型" summary="基础评论">
        <Base />
      </TDemoBlock>
      <TDemoBlock summary="图片评论">
        <Image />
      </TDemoBlock>
      <TDemoBlock summary="回复评论">
        <Reply />
      </TDemoBlock>
      <TDemoBlock title="02 组件状态" summary="评论操作：长按">
        <LongPress />
      </TDemoBlock>
    </div>
  );
}
