import React from 'react';
import { StyledProps } from '../common';

export interface SwiperItemProps extends StyledProps {
  children?: React.ReactNode;
}

const SwiperItem = (props: SwiperItemProps) => {
  const { children, className, style } = props;
  return (
    <div className={className} style={style}>
      {children}
    </div>
  );
};

SwiperItem.displayName = 'SwiperItem';

export default SwiperItem;
