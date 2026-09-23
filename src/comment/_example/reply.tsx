import React, { useEffect, useState } from 'react';
import { Button, Comment, CommentFold, Tag } from 'tdesign-mobile-react';
import { ThumbUpIcon, Uncomfortable1Icon } from 'tdesign-icons-react';

const REPLY_COUNT = 6; // 回复评论总数
export default function () {
  const [commentFold, setCommentFold] = React.useState<CommentFold>({
    state: 'collapsed',
    total: REPLY_COUNT,
    step: 3,
    content: {
      collapsed: `展开${REPLY_COUNT - 1}条回复`,
      partial: ['展开更多回复', '收起'],
      expanded: '收起',
    },
  });
  const [replyInfo, setReplyInfo] = useState([]);

  useEffect(() => {
    setReplyInfo(
      new Array(REPLY_COUNT).fill({}).map((__, index) => ({
        author: `Name${index + 1} 名称`,
        avatar: 'https://tdesign.gtimg.com/mobile/demos/avatar1.png',
        content: '这是一段很长很长很长很长很长很长的评论内容。',
        datetime: '今天16:38·广东',
        likeNum: 6,
      })),
    );
  }, []);

  const handleUpdateFold = (context: { e: Event; fold: CommentFold }) => {
    setCommentFold(context.fold);
  };

  const renderReply = () => {
    const getRenderReplyItem = () => {
      if (commentFold.state === 'collapsed') {
        return replyInfo.slice(0, 1);
      }
      if (commentFold.state === 'partial') {
        return replyInfo.slice(0, 3);
      }
      return replyInfo;
    };
    return getRenderReplyItem().map((item) => (
      <Comment
        key={item.author}
        avatar={{ shape: 'circle', size: '20px', image: item.avatar }}
        author={
          <div className="mobile-comment__author">
            <div>{item.author}</div>
          </div>
        }
        actions={[
          { placement: 'start', content: <div className="mobile-comment__reply-button">回复</div>, key: 'reply' },
          {
            placement: 'end',
            content: (
              <div className="mobile-comment__actions">
                <Button className="mobile-comment__actions-button" icon={<ThumbUpIcon size="14px" />} variant="text">
                  {item.likeNum}
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
        content={item.content}
        datetime={item.datetime}
      />
    ));
  };
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
        folds={commentFold}
        reply={renderReply()}
        onFolds={handleUpdateFold}
      />
    </div>
  );
}
