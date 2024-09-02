import React, { FC, useContext, useEffect, useRef } from 'react';
import cls from 'classnames';
import useConfig from '../_util/useConfig';
import { StyledProps } from '../common';
import parseTNode from '../_util/parseTNode';
import useDefaultProps from '../hooks/useDefaultProps';
import { TdIndexesAnchorProps } from './type';
import { IndexesContext } from './IndexesContext';

export interface IndexesAnchorProps extends TdIndexesAnchorProps, StyledProps {}

const IndexesAnchor: FC<IndexesAnchorProps> = (props) => {
  const { children, index, className, style } = useDefaultProps(props, {});
  const { classPrefix } = useConfig();
  const prefix = classPrefix;
  const name = `${prefix}-indexes-anchor`;
  const indexesAnchorRef = useRef<HTMLDivElement>(null);
  const { relation } = useContext(IndexesContext);

  useEffect(() => {
    relation(indexesAnchorRef.current, index);
  });

  return (
    <div className={cls(name, className)} style={style} ref={indexesAnchorRef} data-index={index}>
      <div className={`${name}__wrapper`}>
        <div className={`${name}__slot`}>{parseTNode(children)}</div>
        <div className={`${name}__header`}>{index}</div>
      </div>
    </div>
  );
};

IndexesAnchor.displayName = 'IndexesAnchor';

export default IndexesAnchor;
