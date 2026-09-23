import React, { ReactNode, useRef, useState } from 'react';
import { isObject } from 'lodash-es';
import { ChevronDownSIcon, ChevronUpSIcon } from 'tdesign-icons-react';
import { CommentFold, CommentFoldState, TdCommentProps } from './type';
import { usePrefixClass } from '../hooks/useClass';
import Avatar, { AvatarProps } from '../avatar';
import parseTNode, { parseContentTNode } from '../_util/parseTNode';
import { StyledProps } from '../common';

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
  const { actions, author, avatar, content, datetime, folds, reply, children } = props;
  const commentFolds = folds || DEFAULT_COMMENT_FOLDS;
  const [curFoldsState, setCurFoldsState] = useState<CommentFoldState>('collapsed');
  const foldSteps = useRef(0);
  const rootClassName = usePrefixClass('comment');

  const handleClickFold = (isExpand: boolean) => {
    if (isExpand) {
      foldSteps.current += 1;
    } else {
      foldSteps.current -= 1;
    }
    if (foldSteps.current === 0) {
      setCurFoldsState('collapsed');
    } else if (foldSteps.current === commentFolds.step - 1) {
      setCurFoldsState('expanded');
    } else {
      setCurFoldsState('partial');
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
        return parseTNode(actions);
      }
      const renderLeftPlacement = () =>
        actions
          .filter((item) => item.placement === 'start')
          .map((item) => parseContentTNode(item.content, { disabled: item.disabled }));
      const renderRightPlacement = () =>
        actions
          .filter((item) => item.placement === 'end')
          .map((item) => parseContentTNode(item.content, { disabled: item.disabled }));
      return (
        <div className={`${rootClassName}__bottom`}>
          {renderLeftPlacement()}
          {renderRightPlacement()}
        </div>
      );
    };
    return (
      <div className={`${rootClassName}__bottom`}>
        <div className={`${rootClassName}__datetime`}>{parseTNode(datetime)}</div>
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
          <div className={`${rootClassName}__folds-item`} onClick={() => handleClickFold(true)}>
            {commentFolds.content.collapsed as ReactNode}
            <ChevronDownSIcon />
          </div>
        );
      }
      if (curFoldsState === 'partial') {
        // 半展开
        return (
          <>
            <div className={`${rootClassName}__folds-item`} onClick={() => handleClickFold(true)}>
              {commentFolds.content.partial[0] as ReactNode}
              <ChevronDownSIcon />
            </div>
            <div className={`${rootClassName}__folds-item`} onClick={() => handleClickFold(false)}>
              {commentFolds.content.partial[1] as ReactNode}
              <ChevronUpSIcon />
            </div>
          </>
        );
      }
      // 全展开
      return (
        <div className={`${rootClassName}__folds-item`} onClick={() => handleClickFold(false)}>
          {commentFolds.content.expanded as ReactNode}
          <ChevronUpSIcon />
        </div>
      );
    };
    if (!commentFolds.step) {
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
      {renderFolds()}
    </div>
  );
};

export default Comment;
