import React, { useRef, useState, useEffect, useCallback } from 'react';
import { ChevronLeftIcon, AddCircleIcon, StarIcon, JumpIcon } from 'tdesign-icons-react';
import { Fab } from 'tdesign-mobile-react';
import getScrollParent from '../../_util/getScrollParent';
import './style/collapsible.less';

export default function () {
  const timer = useRef<ReturnType<typeof setTimeout>>(null);
  const fabRef = useRef(null);
  const [scrolling, setScrolling] = useState(false);

  const onScroll = useCallback(() => {
    clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      setScrolling(false);
    }, 100);

    setScrolling(true);
  }, []);

  useEffect(() => {
    const scroller = getScrollParent(fabRef.current);
    scroller.addEventListener('scroll', onScroll);
    return () => {
      clearTimeout(timer.current);
      scroller.removeEventListener('scroll', onScroll);
    };
  }, [onScroll]);

  return (
    <div ref={fabRef}>
      <Fab style={scrolling ? { right: 0, bottom: '64px' } : { right: 16, bottom: 24 }}>
        {scrolling ? (
          <div className="symbol">
            <ChevronLeftIcon />
          </div>
        ) : (
          <div className="wrap">
            <div className="item">
              <AddCircleIcon size="20" />
              <span className="text">添加</span>
            </div>
            <div className="item">
              <StarIcon size="20" />
              <span className="text">收藏</span>
            </div>
            <div className="item">
              <JumpIcon size="20" />
              <span className="text">分享</span>
            </div>
          </div>
        )}
      </Fab>
    </div>
  );
}
