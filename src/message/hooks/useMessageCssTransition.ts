import { useRef } from 'react';
import { unmount } from '../../_util/react-render';

interface UseMessageCssTransitionParams {
  contentRef: React.MutableRefObject<HTMLDivElement>;
  classPrefix: String;
  container: HTMLElement;
}

const useMessageCssTransition = ({ contentRef, classPrefix, container }: UseMessageCssTransitionParams) => {
  const timerRef = useRef(null);

  const contentEle = contentRef?.current;

  const messageAnimationClassPrefix = classPrefix;

  const defaultEvents = {
    onEnter: handleEnter,
    onExited: handleExited,
  };

  function handleEnter() {
    clearTimeout(timerRef.current);
    if (contentEle && contentEle.style.display === 'none') {
      contentEle.style.display = 'block';
    }
  }

  function handleExited() {
    /**
     * 动画结束后默认删除节点实例
     */
    if (contentEle) {
      timerRef.current = setTimeout(() => {
        if (contentEle && contentEle.style.display === 'block') {
          contentEle.style.display = 'none';
        }
        // 删除createElement创建的div元素
        if (container instanceof Element) {
          const unmountResult = unmount(container);
          if (unmountResult) {
            container.parentNode.removeChild(container);
          }
        }
      }, 0);
    }
  }

  return {
    props: {
      timeout: 200,
      nodeRef: contentRef,
      ...defaultEvents,
      // 与公共 className 保持一致
      classNames: {
        appear: `${messageAnimationClassPrefix}-enter ${messageAnimationClassPrefix}-enter-active`,
        appearActive: `${messageAnimationClassPrefix}-enter-active`,
        appearDone: `${messageAnimationClassPrefix}-enter-active ${messageAnimationClassPrefix}-enter-to`,
        enter: `${messageAnimationClassPrefix}-enter ${messageAnimationClassPrefix}-enter-active`,
        enterActive: `${messageAnimationClassPrefix}-enter-active`,
        enterDone: `${messageAnimationClassPrefix}-enter-active ${messageAnimationClassPrefix}-enter-to`,
        exit: `${messageAnimationClassPrefix}-leave ${messageAnimationClassPrefix}-leave-active`,
        exitActive: `${messageAnimationClassPrefix}-leave-active`,
        exitDone: `${messageAnimationClassPrefix}-leave-active ${messageAnimationClassPrefix}-leave-to`,
      },
    },
  };
};

export default useMessageCssTransition;
