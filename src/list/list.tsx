import React, { useRef, useEffect, useCallback } from 'react';
import { TdListProps } from './type';
import useConfig from '../_util/useConfig';

import TLoading from '../loading';
import parseTNode from '../_util/parseTNode';
import getScrollParent from '../_util/getScrollParent';
import useWindowHeight from '../hooks/useWindowHeight';

export interface ListProps extends TdListProps {
  required?: boolean;
  readonly?: boolean;
}

const List: React.FC<ListProps> = (props) => {
  const { classPrefix } = useConfig();
  const { asyncLoading, header, footer, children } = props;
  const name = classPrefix;

  const LOADING_TEXT_MAP = {
    loading: '加载中', // TODO: i18n
    'load-more': '加载更多',
  };

  const root = useRef(null);

  const height = useWindowHeight();

  const onLoadMore = () => {
    if (asyncLoading === 'load-more') {
      props.onLoadMore?.();
    }
  };

  const handleScroll = useCallback((e: WheelEvent<HTMLDivElement> | Event): void => {
    const scrollHeight =
      (e.target as HTMLElement).scrollHeight ||
      Math.max(document.documentElement.scrollHeight, document.body.scrollHeight);

    const scrollTop =
      (e.target as HTMLElement).scrollTop || document.documentElement.scrollTop || document.body.scrollTop;

    const offsetHeight = (e.target as HTMLElement).offsetHeight || height;
    const bottomDistance = scrollHeight - (scrollTop + offsetHeight);
    props.onScroll?.(bottomDistance, scrollTop);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const scorllParent = getScrollParent(root.current);
    if (scorllParent === root.current) return;
    scorllParent.addEventListener('scroll', handleScroll);
    return () => {
      removeEventListener('scroll', handleScroll);
    };
  }, [height, handleScroll]);

  return (
    <div ref={root} className={`${name}-list`} onScroll={(e) => handleScroll(e)}>
      {parseTNode(header)}
      {parseTNode(children)}
      <div className={`${name}-list__loading--wrapper`} onClick={() => onLoadMore()}>
        {typeof props.asyncLoading === 'string' && ['loading', 'load-more'].includes(props.asyncLoading) && (
          <TLoading
            indicator={props.asyncLoading === 'loading'}
            text={typeof props.asyncLoading === 'string' ? LOADING_TEXT_MAP[props.asyncLoading] : ''}
            className={`${name}-list__loading`}
          />
        )}
      </div>
      {parseTNode(footer)}
    </div>
  );
};

export default List;
