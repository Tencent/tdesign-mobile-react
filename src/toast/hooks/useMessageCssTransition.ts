import { useRef } from 'react';
import ReactDOM from 'react-dom';

interface UseMessageCssTransitionParams {
  contentRef: React.MutableRefObject<HTMLDivElement>;
  classPrefix: String;
  el: React.ReactNode;
}

const useMessageCssTransition = ({ contentRef, classPrefix, el }: UseMessageCssTransitionParams) => {
  const timerRef = useRef(null);

  const contentEle = contentRef?.current;

  const toastAnimationClassPrefix = classPrefix;

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
    // 动画结束后默认删除节点实例
    if (contentEle) {
      timerRef.current = setTimeout(() => {
        if (contentEle && contentEle.style.display === 'block') {
          contentEle.style.display = 'none';
        }
        // 删除createElement创建的div元素
        if (el instanceof Element) {
          const unmountResult = ReactDOM.unmountComponentAtNode(el);
          if (unmountResult) {
            (el as any).parentNode?.removeChild(el);
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
        appear: `${toastAnimationClassPrefix}-enter ${toastAnimationClassPrefix}-enter-active`,
        appearActive: `${toastAnimationClassPrefix}-enter-active`,
        appearDone: `${toastAnimationClassPrefix}-enter-active ${toastAnimationClassPrefix}-enter-to`,
        enter: `${toastAnimationClassPrefix}-enter ${toastAnimationClassPrefix}-enter-active`,
        enterActive: `${toastAnimationClassPrefix}-enter-active`,
        enterDone: `${toastAnimationClassPrefix}-enter-active ${toastAnimationClassPrefix}-enter-to`,
        exit: `${toastAnimationClassPrefix}-leave ${toastAnimationClassPrefix}-leave-active`,
        exitActive: `${toastAnimationClassPrefix}-leave-active`,
        exitDone: `${toastAnimationClassPrefix}-leave-active ${toastAnimationClassPrefix}-leave-to`,
      },
    },
  };
};

export default useMessageCssTransition;
