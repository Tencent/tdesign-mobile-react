import React, { ReactNode, useRef, useState } from 'react';
import { isObject } from 'lodash-es';
import { ChevronDownSIcon, ChevronUpSIcon } from 'tdesign-icons-react';
import { CommentActionItem, CommentFold, CommentFoldState, TdCommentProps } from './type';
import { usePrefixClass } from '../hooks/useClass';
import Avatar, { AvatarProps } from '../avatar';
import parseTNode, { parseContentTNode } from '../_util/parseTNode';
import { StyledProps, TNode } from '../common';

export interface CommentProps extends TdCommentProps, StyledProps {}

const DEFAULT_COMMENT_FOLDS: CommentFold = {
  state: 'collapsed',
  total: 0,
  step: 3,
  content: {
    collapsed: '展开回复',
    partial: ['展开更多回复', '收起'], // [主文案, 副文案]
    expanded: '收起',
  },
};
const Comment: React.FC<TdCommentProps> = (props) => {
  const { actions, author, avatar, content, datetime, folds, reply, children, onActions, onFolds } = props;
  const commentFolds = folds || DEFAULT_COMMENT_FOLDS;
  const [curFoldsState, setCurFoldsState] = useState<CommentFoldState>('collapsed');
  const foldSteps = useRef(0);
  const rootClassName = usePrefixClass('comment');

  const handleClickActions = (event: MouseEvent, action: CommentActionItem | TNode) => {
    onActions?.({ action, e: event });
  };
  const handleClickFold = (event: MouseEvent, isExpand: boolean) => {
    if (!isExpand) {
      // 收起点击后收起全部仅展示 1 条回复
      setCurFoldsState('collapsed');
      foldSteps.current = 0;
      onFolds?.({
        fold: {
          ...commentFolds,
          state: 'collapsed',
        },
        e: event,
      });
      return;
    }
    foldSteps.current += 1;
    if (foldSteps.current === commentFolds.step - 1) {
      setCurFoldsState('expanded');
      onFolds?.({
        fold: {
          ...commentFolds,
          state: 'expanded',
        },
        e: event,
      });
    } else {
      setCurFoldsState('partial');
      onFolds?.({
        fold: {
          ...commentFolds,
          state: 'partial',
        },
        e: event,
      });
    }
  };

  const renderAvatar = () => {
    if (isObject(avatar) && !React.isValidElement(avatar) && typeof avatar !== 'function') {
      return <Avatar className={`${rootClassName}__avatar`} {...(avatar as AvatarProps)} />;
    }
    return parseTNode(avatar);
  };

  const renderAuthor = () => <div className={`${rootClassName}__author`}>{parseTNode(author)}</div>;
  const renderContent = () => <div className={`${rootClassName}__content`}>{parseTNode(content)}</div>;
  const renderFooter = () => {
    const renderActions = () => {
      if (!actions) {
        return null;
      }
      if (!Array.isArray(actions)) {
        return (
          <div onClick={(e) => handleClickActions(e as unknown as MouseEvent, actions)}>{parseTNode(actions)}</div>
        );
      }
      const renderLeftPlacement = () =>
        actions
          .filter((item) => item.placement === 'start')
          .map((item) => (
            <div key={item.key} onClick={(e) => handleClickActions(e as unknown as MouseEvent, item)}>
              {parseContentTNode(item.content, { disabled: item.disabled })}
            </div>
          ));
      const renderRightPlacement = () =>
        actions
          .filter((item) => item.placement === 'end')
          .map((item) => (
            <div key={item.key} onClick={(e) => handleClickActions(e as unknown as MouseEvent, item)}>
              {parseContentTNode(item.content, { disabled: item.disabled })}
            </div>
          ));
      return (
        <>
          <div className={`${rootClassName}-block`}>{renderLeftPlacement()}</div>
          <div className={`${rootClassName}-block`}>{renderRightPlacement()}</div>
        </>
      );
    };
    return (
      <div className={`${rootClassName}__bottom`}>
        <div className={`${rootClassName}__date`}>{parseTNode(datetime)}</div>
        <div className={`${rootClassName}__actions`}>{renderActions()}</div>
      </div>
    );
  };

  const renderReply = () => {
    const replyContent = reply || children;
    return <div className={`${rootClassName}__reply`}>{parseTNode(replyContent)}</div>;
  };

  const renderFolds = () => {
    const renderFoldsContent = () => {
      if (curFoldsState === 'collapsed') {
        // 全收起
        return (
          <div
            className={`${rootClassName}__folds-item`}
            onClick={(e) => handleClickFold(e as unknown as MouseEvent, true)}
          >
            {commentFolds.content.collapsed as ReactNode}
            <ChevronDownSIcon />
          </div>
        );
      }
      if (curFoldsState === 'partial') {
        // 半展开
        return (
          <>
            <div
              className={`${rootClassName}__folds-item`}
              onClick={(e) => handleClickFold(e as unknown as MouseEvent, true)}
            >
              {commentFolds.content.partial[0] as ReactNode}
              <ChevronDownSIcon />
            </div>
            <div
              className={`${rootClassName}__folds-item`}
              onClick={(e) => handleClickFold(e as unknown as MouseEvent, false)}
            >
              {commentFolds.content.partial[1] as ReactNode}
              <ChevronUpSIcon />
            </div>
          </>
        );
      }
      // 全展开
      return (
        <div
          className={`${rootClassName}__folds-item`}
          onClick={(e) => handleClickFold(e as unknown as MouseEvent, false)}
        >
          {commentFolds.content.expanded as ReactNode}
          <ChevronUpSIcon />
        </div>
      );
    };
    if (!commentFolds.total || commentFolds.total <= 1) {
      return null;
    }
    return <div className={`${rootClassName}__folds`}>{renderFoldsContent()}</div>;
  };

  return (
    <div className={`${rootClassName}`}>
      <div className={`${rootClassName}__inner`}>
        {renderAvatar()}
        <div className={`${rootClassName}__content`}>
          {renderAuthor()}
          {renderContent()}
          {renderFooter()}
        </div>
      </div>
      {renderReply()}
      {renderFolds()}
    </div>
  );
};

export default Comment;
