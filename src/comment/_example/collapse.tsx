import React, { useEffect, useRef } from 'react';
import { ActionSheet, Button, Comment, CommentFold, Tag } from 'tdesign-mobile-react';
import { SendIcon, ThumbUpIcon, Uncomfortable1Icon } from 'tdesign-icons-react';

const REPLY_COUNT = 6; // 回复评论总数
const MAIN_COMMENT_AUTHOR = 'Name1 名称';

interface ReplyItem {
  author: string;
  avatar: string;
  content: string;
  datetime: string;
  likeNum: number;
  replyTo?: string; // 回复对象的名称
}

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
  const [replyInfo, setReplyInfo] = React.useState<ReplyItem[]>([]);
  const [showActionSheet, setShowActionSheet] = React.useState(false);
  const [replyValue, setReplyValue] = React.useState('');
  const [replyTarget, setReplyTarget] = React.useState<string | null>(null); // 当前回复的目标用户
  const timerRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const longPressTargetRef = useRef<string | null>(null); // 长按时记录目标评论的作者
  const lastReplyRef = useRef<HTMLDivElement>(null); // 最后一条回复的 ref，用于滚动定位

  // 触发回复某人
  const handleReply = (authorName: string) => {
    setReplyTarget(authorName);
    // 延迟聚焦，确保 state 更新后 input 已渲染
    setTimeout(() => {
      inputRef.current?.focus();
    }, 100);
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>, author: string) => {
    e.stopPropagation();
    longPressTargetRef.current = author;
    timerRef.current = setTimeout(() => {
      setShowActionSheet(true);
    }, 800);
  };

  const handleTouchEnd = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  };

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

  const handleSubmit = () => {
    if (!replyValue.trim()) return;

    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');

    const newReply: ReplyItem = {
      author: '我',
      avatar: 'https://tdesign.gtimg.com/mobile/demos/avatar2.png',
      content: replyValue,
      datetime: `今天${hours}:${minutes}·广东`,
      likeNum: 0,
      ...(replyTarget ? { replyTo: replyTarget } : {}),
    };

    setReplyInfo((prev) => [...prev, newReply]);

    // 更新折叠状态：展开全部并更新总数
    setCommentFold((prev) => {
      const newTotal = replyInfo.length + 1;
      return {
        ...prev,
        state: 'expanded',
        total: newTotal,
        content: {
          collapsed: `展开${newTotal - 1}条回复`,
          partial: ['展开更多回复', '收起'],
          expanded: '收起',
        },
      };
    });

    setTimeout(() => {
      lastReplyRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 500);

    setReplyValue('');
    setReplyTarget(null);
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
    const visibleItems = getRenderReplyItem();
    return visibleItems.map((item, index) => (
      <div
        key={`${item.author}-${index}`}
        ref={index === visibleItems.length - 1 ? lastReplyRef : undefined}
        onTouchStart={(e) => handleTouchStart(e, item.author)}
        onTouchEnd={handleTouchEnd}
        onTouchMove={handleTouchEnd}
      >
        <Comment
          avatar={{ shape: 'circle', size: '20px', image: item.avatar }}
          author={
            <div className="mobile-comment__author">
              <div>{item.author}</div>
            </div>
          }
          actions={[
            {
              placement: 'start',
              content: (
                <div className="mobile-comment__reply-button" onClick={() => handleReply(item.author)}>
                  回复
                </div>
              ),
              key: 'reply',
            },
            {
              placement: 'end',
              content: (
                <div className="mobile-comment__actions">
                  <Button className="mobile-comment__actions-button" icon={<ThumbUpIcon size="14px" />} variant="text">
                    {item.likeNum || ''}
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
          content={
            item.replyTo ? (
              <span>
                回复<span className="mobile-comment__reply-name">{item.replyTo}</span>：{item.content}
              </span>
            ) : (
              item.content
            )
          }
          datetime={item.datetime}
        />
      </div>
    ));
  };
  return (
    <div className="mobile-comment">
      <div
        onTouchStart={(e) => handleTouchStart(e, MAIN_COMMENT_AUTHOR)}
        onTouchEnd={handleTouchEnd}
        onTouchMove={handleTouchEnd}
      >
        <Comment
          avatar={{ shape: 'circle', size: '32px', image: 'https://tdesign.gtimg.com/mobile/demos/avatar1.png' }}
          author={
            <div className="mobile-comment__author">
              <div>{MAIN_COMMENT_AUTHOR}</div>
              <Tag className="mobile-comment__author-tag" variant="light" theme="primary" shape="round">
                作者
              </Tag>
            </div>
          }
          actions={[
            {
              placement: 'start',
              content: (
                <div className="mobile-comment__reply-button" onClick={() => handleReply(MAIN_COMMENT_AUTHOR)}>
                  回复
                </div>
              ),
              key: 'reply',
            },
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
      <div className="mobile-comment__input">
        <input
          ref={inputRef}
          className="mobile-comment__input-content"
          placeholder={replyTarget ? `回复${replyTarget}` : '请输入内容'}
          value={replyValue}
          onChange={(e) => setReplyValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleSubmit();
            }
          }}
        />
        <Button
          className="mobile-comment__input-button"
          disabled={!replyValue}
          size="small"
          icon={<SendIcon />}
          shape="circle"
          theme="primary"
          onClick={handleSubmit}
        />
      </div>
      <ActionSheet
        visible={showActionSheet}
        cancelText="取消"
        items={['回复', '转发', '复制', '举报']}
        onSelected={(selected) => {
          const label = typeof selected === 'string' ? selected : selected.label;
          if (label === '回复' && longPressTargetRef.current) {
            handleReply(longPressTargetRef.current);
          }
          setShowActionSheet(false);
        }}
        onClose={() => {
          setShowActionSheet(false);
        }}
        onCancel={() => {
          setShowActionSheet(false);
        }}
      />
    </div>
  );
}
