import React from 'react';
import { Button, Comment, Tag } from 'tdesign-mobile-react';
import { ThumbUpIcon, Uncomfortable1Icon } from 'tdesign-icons-react';

export default function () {
  return (
    <div className="mobile-comment">
      <Comment
        avatar={{ shape: 'circle', size: '32px', image: 'https://tdesign.gtimg.com/mobile/demos/avatar1.png' }}
        author={
          <div className="mobile-comment__author">
            <div>Name1 名称</div>
            <Tag className="mobile-comment__author-tag" variant="light" theme="primary" shape="round">
              作者
            </Tag>
          </div>
        }
        actions={[
          { placement: 'start', content: <div className="mobile-comment__reply-button">回复</div>, key: 'reply' },
          {
            placement: 'end',
            content: (
              <div className="mobile-comment__actions">
                <Button className="mobile-comment__actions-button" icon={<ThumbUpIcon size="14px" />} variant="text">
                  6
                </Button>
                <Button
                  icon={<Uncomfortable1Icon size="14px" />}
                  className="mobile-comment__actions-button"
                  variant="text"
                />
              </div>
            ),
            key: 'actions',
          },
        ]}
        content="这是一段很长很长很长很长很长很长的评论内容。"
        datetime="今天16:38·广东"
      />
    </div>
  );
}
