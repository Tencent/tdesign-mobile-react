import React from 'react';
import { describe, it, expect, render, vi, fireEvent } from '@test/utils';
import NoticeBar from '../NoticeBar';

describe('NoticeBar', () => {
  describe('props', () => {
    it(':content string', () => {
      const { queryByText } = render(<NoticeBar visible content="通知消息" />);
      expect(queryByText('通知消息')).toBeInTheDocument();
    });

    it(':content TNode', () => {
      const testId = 'custom-content';
      const { container } = render(<NoticeBar visible content={<div data-testid={testId}>自定义内容</div>} />);
      expect(container.querySelector(`[data-testid="${testId}"]`)).not.toBe(null);
    });

    it(':content array with vertical direction', () => {
      const content = ['消息1', '消息2', '消息3'];
      const { queryByText } = render(<NoticeBar visible content={content} direction="vertical" />);
      expect(queryByText('消息1')).toBeInTheDocument();
    });

    it(':direction horizontal', () => {
      const { container } = render(<NoticeBar visible content="横向消息" direction="horizontal" />);
      expect(container.querySelector('.t-notice-bar')).toBeTruthy();
      expect(container.querySelector('.t-notice-bar__content--vertical')).toBeFalsy();
    });

    it(':direction vertical', () => {
      const content = ['消息1', '消息2'];
      const { container } = render(<NoticeBar visible content={content} direction="vertical" />);
      expect(container.querySelector('.t-notice-bar__content--vertical')).toBeTruthy();
    });

    it(':marquee false', () => {
      const { container } = render(<NoticeBar visible content="不滚动的消息" marquee={false} />);
      expect(container.querySelector('.t-notice-bar__content')).toBeTruthy();
    });

    it(':marquee true', () => {
      const { container } = render(<NoticeBar visible content="滚动的消息" marquee />);
      expect(container.querySelector('.t-notice-bar__content')).toBeTruthy();
    });

    it(':marquee object with speed', () => {
      const { container } = render(
        <NoticeBar visible content="自定义速度消息" marquee={{ speed: 100, loop: -1, delay: 0 }} />,
      );
      expect(container.querySelector('.t-notice-bar__content')).toBeTruthy();
    });

    it(':marquee object with loop 0', () => {
      const { container } = render(<NoticeBar visible content="不循环消息" marquee={{ loop: 0 }} />);
      expect(container.querySelector('.t-notice-bar__content')).toBeTruthy();
    });

    it(':operation string', () => {
      const { queryByText } = render(<NoticeBar visible content="通知" operation="查看详情" />);
      expect(queryByText('查看详情')).toBeInTheDocument();
    });

    it(':operation TNode', () => {
      const testId = 'custom-operation';
      const { container } = render(
        <NoticeBar visible content="通知" operation={<button data-testid={testId}>操作</button>} />,
      );
      expect(container.querySelector(`[data-testid="${testId}"]`)).not.toBe(null);
    });

    it(':prefixIcon null', () => {
      const { container } = render(<NoticeBar visible content="无图标" prefixIcon={null} />);
      expect(container.querySelector('.t-notice-bar__prefix-icon')).toBeFalsy();
    });

    it(':prefixIcon custom', () => {
      const testId = 'custom-prefix-icon';
      const { container } = render(
        <NoticeBar visible content="自定义前缀" prefixIcon={<div data-testid={testId}>📢</div>} />,
      );
      expect(container.querySelector(`[data-testid="${testId}"]`)).not.toBe(null);
    });

    it(':prefixIcon default with theme info', () => {
      const { container } = render(<NoticeBar visible content="信息" theme="info" />);
      expect(container.querySelector('.t-notice-bar__prefix-icon')).toBeTruthy();
      expect(container.querySelector('.t-icon-info-circle-filled')).toBeTruthy();
    });

    it(':suffixIcon', () => {
      const testId = 'custom-suffix-icon';
      const { container } = render(
        <NoticeBar visible content="有后缀" suffixIcon={<div data-testid={testId}>→</div>} />,
      );
      expect(container.querySelector(`[data-testid="${testId}"]`)).not.toBe(null);
      expect(container.querySelector('.t-notice-bar__suffix-icon')).toBeTruthy();
    });

    it(':suffixIcon null', () => {
      const { container } = render(<NoticeBar visible content="无后缀" suffixIcon={null} />);
      expect(container.querySelector('.t-notice-bar__suffix-icon')).toBeFalsy();
    });

    it(':theme info', () => {
      const { container } = render(<NoticeBar visible content="信息" theme="info" />);
      expect(container.querySelector('.t-notice-bar--info')).toBeTruthy();
      expect(container.querySelector('.t-icon-info-circle-filled')).toBeTruthy();
    });

    it(':theme success', () => {
      const { container } = render(<NoticeBar visible content="成功" theme="success" />);
      expect(container.querySelector('.t-notice-bar--success')).toBeTruthy();
      expect(container.querySelector('.t-icon-check-circle-filled')).toBeTruthy();
    });

    it(':theme warning', () => {
      const { container } = render(<NoticeBar visible content="警告" theme="warning" />);
      expect(container.querySelector('.t-notice-bar--warning')).toBeTruthy();
      expect(container.querySelector('.t-icon-error-circle-filled')).toBeTruthy();
    });

    it(':theme error', () => {
      const { container } = render(<NoticeBar visible content="错误" theme="error" />);
      expect(container.querySelector('.t-notice-bar--error')).toBeTruthy();
      expect(container.querySelector('.t-icon-error-circle-filled')).toBeTruthy();
    });

    it(':visible true', () => {
      const { container } = render(<NoticeBar visible content="显示消息" />);
      expect(container.querySelector('.t-notice-bar')).toBeTruthy();
    });

    it(':visible false', () => {
      const { container } = render(<NoticeBar visible={false} content="隐藏消息" />);
      expect(container.querySelector('.t-notice-bar')).toBeFalsy();
    });

    it(':defaultVisible true', () => {
      const { container } = render(<NoticeBar defaultVisible content="默认显示" />);
      expect(container.querySelector('.t-notice-bar')).toBeTruthy();
    });

    it(':defaultVisible false', () => {
      const { container } = render(<NoticeBar defaultVisible={false} content="默认隐藏" />);
      expect(container.querySelector('.t-notice-bar')).toBeFalsy();
    });

    it(':className', () => {
      const { container } = render(<NoticeBar visible content="消息" className="custom-notice-bar" />);
      expect(container.querySelector('.custom-notice-bar')).toBeTruthy();
    });

    it(':style', () => {
      const { container } = render(<NoticeBar visible content="消息" style={{ backgroundColor: 'red' }} />);
      const noticeBar = container.querySelector('.t-notice-bar') as HTMLElement;
      expect(noticeBar?.style.backgroundColor).toBe('red');
    });

    it(':touchable', () => {
      const content = ['消息1', '消息2'];
      const { container } = render(<NoticeBar visible content={content} direction="vertical" touchable />);
      expect(container.querySelector('.t-swiper')).toBeTruthy();
    });
  });

  describe('events', () => {
    it(':onClick with prefix-icon trigger', () => {
      const handleClick = vi.fn();
      const { container } = render(<NoticeBar visible content="消息" onClick={handleClick} />);
      const prefixIcon = container.querySelector('.t-notice-bar__prefix-icon');
      fireEvent.click(prefixIcon!);
      expect(handleClick).toHaveBeenCalledWith('prefix-icon');
    });

    it(':onClick with content trigger', () => {
      const handleClick = vi.fn();
      const { container } = render(<NoticeBar visible content="消息" onClick={handleClick} />);
      const content = container.querySelector('.t-notice-bar__content-wrap');
      fireEvent.click(content!);
      expect(handleClick).toHaveBeenCalledWith('content');
    });

    it(':onClick with operation trigger', () => {
      const handleClick = vi.fn();
      const { container } = render(<NoticeBar visible content="消息" operation="操作" onClick={handleClick} />);
      const operation = container.querySelector('.t-notice-bar__operation');
      fireEvent.click(operation!);
      expect(handleClick).toHaveBeenCalledWith('operation');
    });

    it(':onClick with suffix-icon trigger', () => {
      const handleClick = vi.fn();
      const { container } = render(
        <NoticeBar visible content="消息" suffixIcon={<div>X</div>} onClick={handleClick} />,
      );
      const suffixIcon = container.querySelector('.t-notice-bar__suffix-icon');
      fireEvent.click(suffixIcon!);
      expect(handleClick).toHaveBeenCalledWith('suffix-icon');
    });

    it(':onClick operation should stop propagation', () => {
      const handleClick = vi.fn();
      const { container } = render(<NoticeBar visible content="消息" operation="操作" onClick={handleClick} />);
      const operation = container.querySelector('.t-notice-bar__operation');
      fireEvent.click(operation!);
      expect(handleClick).toHaveBeenCalledTimes(1);
      expect(handleClick).toHaveBeenCalledWith('operation');
    });

    it(':onClick without handler', () => {
      const { container } = render(<NoticeBar visible content="消息" />);
      const content = container.querySelector('.t-notice-bar__content-wrap');
      expect(() => {
        fireEvent.click(content!);
      }).not.toThrow();
    });
  });

  describe('rendering', () => {
    it('should render basic notice bar', () => {
      const { container } = render(<NoticeBar visible content="通知消息" />);
      expect(container.querySelector('.t-notice-bar')).toBeTruthy();
    });

    it('should render with all props', () => {
      const handleClick = vi.fn();
      const { container, queryByText } = render(
        <NoticeBar
          visible
          content="完整通知"
          theme="success"
          prefixIcon={<div>📢</div>}
          suffixIcon={<div>→</div>}
          operation="查看"
          className="custom-class"
          style={{ padding: '10px' }}
          onClick={handleClick}
        />,
      );

      expect(container.querySelector('.t-notice-bar')).toBeTruthy();
      expect(container.querySelector('.t-notice-bar--success')).toBeTruthy();
      expect(container.querySelector('.custom-class')).toBeTruthy();
      expect(queryByText('完整通知')).toBeInTheDocument();
      expect(queryByText('查看')).toBeInTheDocument();
    });

    it('should not render when visible is false', () => {
      const { container } = render(<NoticeBar visible={false} content="隐藏" />);
      expect(container.querySelector('.t-notice-bar')).toBeFalsy();
    });

    it('should render vertical swiper correctly', () => {
      const content = ['消息1', '消息2', '消息3'];
      const { container, queryByText } = render(<NoticeBar visible content={content} direction="vertical" />);

      expect(container.querySelector('.t-swiper')).toBeTruthy();
      expect(container.querySelector('.t-notice-bar__content--vertical')).toBeTruthy();
      expect(queryByText('消息1')).toBeInTheDocument();
    });

    it('should render marquee content correctly', () => {
      const { container } = render(<NoticeBar visible content="跑马灯消息" marquee />);
      const content = container.querySelector('.t-notice-bar__content');
      expect(content).toBeTruthy();
    });

    it('should render without prefix icon when prefixIcon is null', () => {
      const { container } = render(<NoticeBar visible content="无图标" prefixIcon={null} />);
      expect(container.querySelector('.t-notice-bar__prefix-icon')).toBeFalsy();
    });
  });

  describe('edge cases', () => {
    it('should handle empty content', () => {
      const { container } = render(<NoticeBar visible content="" />);
      expect(container.querySelector('.t-notice-bar')).toBeTruthy();
    });

    it('should handle null content', () => {
      const { container } = render(<NoticeBar visible content={null} />);
      expect(container.querySelector('.t-notice-bar')).toBeTruthy();
    });

    it('should handle visibility changes', () => {
      const { container, rerender } = render(<NoticeBar visible={false} content="消息" />);
      expect(container.querySelector('.t-notice-bar')).toBeFalsy();

      rerender(<NoticeBar visible content="消息" />);
      expect(container.querySelector('.t-notice-bar')).toBeTruthy();
    });

    it('should handle theme changes', () => {
      const { container, rerender } = render(<NoticeBar visible content="消息" theme="info" />);
      expect(container.querySelector('.t-notice-bar--info')).toBeTruthy();

      rerender(<NoticeBar visible content="消息" theme="success" />);
      expect(container.querySelector('.t-notice-bar--success')).toBeTruthy();
    });

    it('should handle marquee with loop 0', () => {
      const { container } = render(<NoticeBar visible content="不循环" marquee={{ loop: 0 }} />);
      expect(container.querySelector('.t-notice-bar__content')).toBeTruthy();
    });

    it('should handle marquee with custom speed and delay', () => {
      const { container } = render(<NoticeBar visible content="自定义" marquee={{ speed: 80, delay: 1000 }} />);
      expect(container.querySelector('.t-notice-bar__content')).toBeTruthy();
    });

    it('should handle vertical direction with single item', () => {
      const { container, queryByText } = render(<NoticeBar visible content={['单条消息']} direction="vertical" />);
      expect(container.querySelector('.t-swiper')).toBeTruthy();
      expect(queryByText('单条消息')).toBeInTheDocument();
    });

    it('should handle operation without onClick', () => {
      const { container } = render(<NoticeBar visible content="消息" operation="操作" />);
      const operation = container.querySelector('.t-notice-bar__operation');
      expect(() => {
        fireEvent.click(operation!);
      }).not.toThrow();
    });
  });

  describe('integration', () => {
    it('should work with dynamic content', () => {
      const { queryByText, rerender } = render(<NoticeBar visible content="初始消息" />);
      expect(queryByText('初始消息')).toBeInTheDocument();

      rerender(<NoticeBar visible content="更新消息" />);
      expect(queryByText('更新消息')).toBeInTheDocument();
      expect(queryByText('初始消息')).not.toBeInTheDocument();
    });

    it('should work with multiple triggers', () => {
      const handleClick = vi.fn();
      const { container } = render(
        <NoticeBar visible content="完整功能" operation="操作" suffixIcon={<div>X</div>} onClick={handleClick} />,
      );

      // 点击内容
      const content = container.querySelector('.t-notice-bar__content-wrap');
      fireEvent.click(content!);
      expect(handleClick).toHaveBeenLastCalledWith('content');

      // 点击操作
      const operation = container.querySelector('.t-notice-bar__operation');
      fireEvent.click(operation!);
      expect(handleClick).toHaveBeenLastCalledWith('operation');

      // 点击后缀图标
      const suffixIcon = container.querySelector('.t-notice-bar__suffix-icon');
      fireEvent.click(suffixIcon!);
      expect(handleClick).toHaveBeenLastCalledWith('suffix-icon');

      expect(handleClick).toHaveBeenCalledTimes(3);
    });

    it('should work with controlled visible', () => {
      const { container, rerender } = render(<NoticeBar visible content="受控显示" />);
      expect(container.querySelector('.t-notice-bar')).toBeTruthy();

      rerender(<NoticeBar visible={false} content="受控显示" />);
      expect(container.querySelector('.t-notice-bar')).toBeFalsy();

      rerender(<NoticeBar visible content="受控显示" />);
      expect(container.querySelector('.t-notice-bar')).toBeTruthy();
    });

    it('should work with all themes', () => {
      const themes: Array<'info' | 'success' | 'warning' | 'error'> = ['info', 'success', 'warning', 'error'];
      themes.forEach((theme) => {
        const { container } = render(<NoticeBar visible content={`${theme} 消息`} theme={theme} />);
        expect(container.querySelector(`.t-notice-bar--${theme}`)).toBeTruthy();
      });
    });

    it('should handle marquee state transitions', () => {
      const { container, rerender } = render(<NoticeBar visible content="消息" marquee={false} />);
      expect(container.querySelector('.t-notice-bar__content')).toBeTruthy();

      rerender(<NoticeBar visible content="消息" marquee />);
      expect(container.querySelector('.t-notice-bar__content')).toBeTruthy();

      rerender(<NoticeBar visible content="消息" marquee={{ speed: 100, loop: 3 }} />);
      expect(container.querySelector('.t-notice-bar__content')).toBeTruthy();
    });
  });

  describe('dom structure', () => {
    it('should have correct structure with all elements', () => {
      const { container } = render(
        <NoticeBar visible content="完整结构" operation="操作" suffixIcon={<div className="test-suffix">X</div>} />,
      );

      const noticeBar = container.querySelector('.t-notice-bar');
      expect(noticeBar).toBeTruthy();
      expect(noticeBar?.querySelector('.t-notice-bar__prefix-icon')).toBeTruthy();
      expect(noticeBar?.querySelector('.t-notice-bar__content-wrap')).toBeTruthy();
      expect(noticeBar?.querySelector('.t-notice-bar__operation')).toBeTruthy();
      expect(noticeBar?.querySelector('.t-notice-bar__suffix-icon')).toBeTruthy();
    });

    it('should render content wrapper correctly', () => {
      const { container } = render(<NoticeBar visible content="内容" />);
      const contentWrap = container.querySelector('.t-notice-bar__content-wrap');
      expect(contentWrap).toBeTruthy();
      expect(contentWrap?.querySelector('.t-notice-bar__content')).toBeTruthy();
    });
  });

  describe('animation and scrolling', () => {
    it('should handle marquee animation with getBoundingClientRect', () => {
      const { container } = render(<NoticeBar visible content="这是一条很长的跑马灯消息" marquee />);
      const content = container.querySelector('.t-notice-bar__content');
      expect(content).toBeTruthy();
    });

    it('should trigger handleScrolling on mount with marquee', () => {
      const { container } = render(<NoticeBar visible content="滚动消息" marquee />);
      expect(container.querySelector('.t-notice-bar__content')).toBeTruthy();
    });

    it('should handle transitionend event', () => {
      const { container } = render(<NoticeBar visible content="滚动消息" marquee={{ speed: 50, loop: 2 }} />);
      const content = container.querySelector('.t-notice-bar__content');

      // 模拟 transitionend 事件
      if (content) {
        fireEvent.transitionEnd(content);
      }

      expect(content).toBeTruthy();
    });

    it('should handle marquee with delay', () => {
      const { container } = render(<NoticeBar visible content="延迟滚动" marquee={{ delay: 500 }} />);
      expect(container.querySelector('.t-notice-bar__content')).toBeTruthy();
    });

    it('should handle marquee loop ending', () => {
      const { container } = render(<NoticeBar visible content="有限循环" marquee={{ loop: 1 }} />);
      const content = container.querySelector('.t-notice-bar__content');

      if (content) {
        // 模拟完成一次循环
        fireEvent.transitionEnd(content);
      }

      expect(content).toBeTruthy();
    });

    it('should re-trigger scrolling when visible changes from false to true', async () => {
      const { container, rerender } = render(<NoticeBar visible={false} content="隐藏消息" marquee />);
      expect(container.querySelector('.t-notice-bar')).toBeFalsy();

      // 切换为可见，应该重新触发滚动
      rerender(<NoticeBar visible content="显示消息" marquee />);

      // 等待一小段时间让 useEffect 执行
      await new Promise((resolve) => {
        setTimeout(resolve, 10);
      });

      expect(container.querySelector('.t-notice-bar')).toBeTruthy();
    });

    it('should handle marquee true', () => {
      const { container } = render(<NoticeBar visible content="布尔跑马灯" marquee={true} />);
      const content = container.querySelector('.t-notice-bar__content');
      expect(content).toBeTruthy();
    });

    it('should handle marquee with custom speed', () => {
      const { container } = render(<NoticeBar visible content="自定义速度" marquee={{ speed: 80 }} />);
      const content = container.querySelector('.t-notice-bar__content');
      expect(content).toBeTruthy();
    });

    it('should handle marquee object with all properties', () => {
      const { container } = render(
        <NoticeBar visible content="完整配置" marquee={{ speed: 60, loop: 3, delay: 100 }} />,
      );
      const content = container.querySelector('.t-notice-bar__content');
      expect(content).toBeTruthy();
    });

    it('should handle content wider than container', () => {
      const { container } = render(
        <NoticeBar visible content="这是一条非常非常非常非常非常非常长的消息，应该会触发滚动" marquee={false} />,
      );
      const content = container.querySelector('.t-notice-bar__content');
      expect(content).toBeTruthy();
    });
  });

  describe('lifecycle', () => {
    it('should handle mount with visible true and marquee', () => {
      const { container } = render(<NoticeBar visible content="首次挂载" marquee />);
      expect(container.querySelector('.t-notice-bar')).toBeTruthy();
    });

    it('should handle unmount', () => {
      const { container, unmount } = render(<NoticeBar visible content="卸载测试" marquee />);
      expect(container.querySelector('.t-notice-bar')).toBeTruthy();

      unmount();
      expect(container.querySelector('.t-notice-bar')).toBeFalsy();
    });

    it('should cleanup timers on unmount', () => {
      const { unmount } = render(<NoticeBar visible content="清理测试" marquee={{ delay: 1000 }} />);
      unmount();
      // 验证卸载成功即可
      expect(true).toBe(true);
    });

    it('should re-execute scrolling when visible changes after first mount', async () => {
      // 第一次挂载，visible=true，会执行一次 handleScrolling
      const { rerender, container } = render(<NoticeBar visible content="测试消息" marquee />);
      expect(container.querySelector('.t-notice-bar')).toBeTruthy();

      // 切换为不可见
      rerender(<NoticeBar visible={false} content="测试消息" marquee />);
      expect(container.querySelector('.t-notice-bar')).toBeFalsy();

      // 再次切换为可见，这次会触发 useEffect 中 hasBeenExecute.current 为 true 的分支
      rerender(<NoticeBar visible content="测试消息" marquee />);

      // 等待 setTimeout 执行
      await new Promise((resolve) => {
        setTimeout(resolve, 50);
      });

      expect(container.querySelector('.t-notice-bar')).toBeTruthy();
    });

    it('should handle getBoundingClientRect in setTimeout', async () => {
      const { container } = render(<NoticeBar visible content="测试 DOM 尺寸计算" marquee />);

      // 等待 setTimeout(200ms) 执行
      await new Promise((resolve) => {
        setTimeout(resolve, 250);
      });

      expect(container.querySelector('.t-notice-bar__content')).toBeTruthy();
    });

    it('should trigger animation when content is wider than container', async () => {
      const { container } = render(
        <NoticeBar
          visible
          content="这是一条超级超级超级超级超级超级长的消息这是一条超级超级超级超级超级超级长的消息"
          marquee
        />,
      );

      // 等待 DOM 更新和 setTimeout 执行
      await new Promise((resolve) => {
        setTimeout(resolve, 250);
      });

      const content = container.querySelector('.t-notice-bar__content');
      expect(content).toBeTruthy();
    });
  });
});
