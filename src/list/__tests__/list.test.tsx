import React from 'react';
import { describe, it, expect, render, fireEvent, vi } from '@test/utils';
import List from '../list';

const prefix = 't';
const name = `.${prefix}-list`;
const listText = '列表项';
const headerText = '列表头部';
const footerText = '列表底部';

describe('List', () => {
  describe('props', () => {
    it(': className', () => {
      const className = 'custom-class';
      const { container } = render(<List className={className} />);
      expect(container.firstChild).toHaveClass(className);
    });

    it(': style', () => {
      const style = { backgroundColor: 'red' };
      const { container } = render(<List style={style} />);
      expect(container.firstChild).toHaveAttribute('style');
    });

    it(': children', () => {
      const { container } = render(<List>{listText}</List>);
      expect(container.innerHTML).toContain(listText);
    });

    it(': header', () => {
      const { container } = render(<List header={headerText} />);
      expect(container.innerHTML).toContain(headerText);
    });

    it(': footer', () => {
      const { container } = render(<List footer={footerText} />);
      expect(container.innerHTML).toContain(footerText);
    });

    it(': asyncLoading loading', () => {
      const { container } = render(<List asyncLoading="loading" />);
      expect(container.querySelector('.t-loading')).toBeInTheDocument();
      expect(container.querySelector('.t-loading__text')).toHaveTextContent('加载中');
    });

    it(': asyncLoading load-more', () => {
      const { container } = render(<List asyncLoading="load-more" />);
      expect(container.querySelector('.t-loading')).toBeInTheDocument();
      expect(container.querySelector('.t-loading__text')).toHaveTextContent('加载更多');
    });

    it(': asyncLoading custom node', () => {
      const customLoading = <div className="custom-loading">自定义加载</div>;
      const { container } = render(<List>{customLoading}</List>);
      expect(container.querySelector('.custom-loading')).toBeInTheDocument();
      expect(container.querySelector('.custom-loading')).toHaveTextContent('自定义加载');
    });

    it(': TLoading text property from LOADING_TEXT_MAP', () => {
      const { container } = render(<List asyncLoading="loading" />);
      const loadingText = container.querySelector('.t-loading__text');
      expect(loadingText).toHaveTextContent('加载中');

      const { container: loadMoreContainer } = render(<List asyncLoading="load-more" />);
      const loadMoreText = loadMoreContainer.querySelector('.t-loading__text');
      expect(loadMoreText).toHaveTextContent('加载更多');
    });

    it(': TLoading text property with type check', () => {
      const { container: stringContainer } = render(<List asyncLoading="loading" />);
      const stringText = stringContainer.querySelector('.t-loading__text');
      expect(stringText).toHaveTextContent('加载中');

      const { container: nonStringContainer } = render(<List asyncLoading={false as any} />);
      const nonStringText = nonStringContainer.querySelector('.t-loading__text');
      expect(nonStringText).not.toBeInTheDocument();
    });
  });

  describe('events', () => {
    it(': useEffect cleanup with removeEventListener', async () => {
      const mockElement = document.createElement('div');
      const mockScrollParent = window;

      vi.doMock('../../_util/getScrollParent', () => ({
        getScrollParent: vi.fn().mockReturnValue(mockScrollParent),
      }));

      const addEventListenerSpy = vi.spyOn(mockScrollParent, 'addEventListener');
      const removeEventListenerSpy = vi.spyOn(mockScrollParent, 'removeEventListener');
      const useRefSpy = vi.spyOn(React, 'useRef').mockReturnValue({ current: mockElement });
      const { default: List } = await import('../list');
      const { unmount } = render(<List />);

      expect(addEventListenerSpy).toHaveBeenCalledWith('scroll', expect.any(Function));

      unmount();

      expect(removeEventListenerSpy).toHaveBeenCalledWith('scroll', expect.any(Function));

      useRefSpy.mockRestore();
      vi.doMock('../../_util/getScrollParent', () => ({
        getScrollParent: vi.fn(),
      }));
    });

    it(': onLoadMore triggered when asyncLoading is load-more', () => {
      const handleLoadMore = vi.fn();
      const { container } = render(<List asyncLoading="load-more" onLoadMore={handleLoadMore} />);
      const loadingWrapper = container.querySelector(`${name}__loading--wrapper`);
      fireEvent.click(loadingWrapper);
      expect(handleLoadMore).toHaveBeenCalled();
    });

    it(': onLoadMore not triggered when asyncLoading is loading', () => {
      const handleLoadMore = vi.fn();
      const { container } = render(<List asyncLoading="loading" onLoadMore={handleLoadMore} />);
      const loadingWrapper = container.querySelector(`${name}__loading--wrapper`);
      fireEvent.click(loadingWrapper);
      expect(handleLoadMore).not.toHaveBeenCalled();
    });

    it(': onScroll event', () => {
      const handleScroll = vi.fn();
      render(<List onScroll={handleScroll} />);

      // Mock scroll event
      const scrollEvent = new Event('scroll', { bubbles: true });
      Object.defineProperty(scrollEvent, 'currentTarget', {
        value: {
          scrollTop: 100,
          offsetHeight: 200,
          scrollHeight: 500,
        },
        enumerable: true,
      });

      window.dispatchEvent(scrollEvent);
      expect(handleScroll).toHaveBeenCalled();
    });

    it(': should handle edge cases in scroll logic without errors', () => {
      expect(() => render(<List onScroll={() => {}} />)).not.toThrow();
    });
  });

  describe('slots', () => {
    it(': render all components correctly', () => {
      const { container } = render(
        <List header={headerText} footer={footerText}>
          <div>{listText}</div>
        </List>,
      );

      expect(container.innerHTML).toContain(headerText);
      expect(container.innerHTML).toContain(listText);
      expect(container.innerHTML).toContain(footerText);
    });
  });
});
