import React, { Fragment } from 'react';
import { vi } from 'vitest';
import { describe, expect, it, render, fireEvent } from '@test/utils';
import { Indexes, IndexesAnchor } from '../index';
import { CellGroup, Cell } from '../../cell';

const prefix = 't';
const name = `${prefix}-indexes`;

const children = new Array(5).fill('列表内容');
const list = [
  {
    index: 1,
    children,
  },
  {
    index: 3,
    children,
  },
  {
    index: 5,
    children,
  },
  {
    index: 7,
    children,
  },
  {
    index: 8,
    children,
  },
  {
    index: 10,
    children,
  },
  {
    index: '#',
    children,
  },
];
const indexList = list.map((item) => item.index);

describe('Indexes', () => {
  describe('props', () => {
    it('indexList', () => {
      const { container } = render(
        <Indexes indexList={indexList}>
          {list.map((item, index) => (
            <Fragment key={index}>
              <IndexesAnchor index={item.index} />
              <CellGroup>
                {item.children.map((val, idx) => (
                  <Cell key={idx}>{val}</Cell>
                ))}
              </CellGroup>
            </Fragment>
          ))}
        </Indexes>,
      );

      const $indexesSidebar = container.querySelectorAll(`.${name}__sidebar-item`);
      expect($indexesSidebar.length).toBe(indexList.length);
      const contentCells = container.querySelectorAll(`.${prefix}-cell`);
      const contentLength = list.reduce((count, item) => count + item.children.length, 0);
      expect(contentCells.length).toBe(contentLength);
    });

    it('indexList is empty', () => {
      const { container } = render(
        <Indexes>
          {list.map((item, index) => (
            <Fragment key={index}>
              <IndexesAnchor index={item.index} />
              <CellGroup>
                {item.children.map((val, idx) => (
                  <Cell key={idx}>{val}</Cell>
                ))}
              </CellGroup>
            </Fragment>
          ))}
        </Indexes>,
      );
      const $indexesSidebar = container.querySelectorAll(`.${name}__sidebar-item`);
      expect($indexesSidebar.length).toBe(26);
    });

    it('sticky', () => {
      const { container } = render(
        <Indexes indexList={indexList}>
          {list.map((item, index) => (
            <Fragment key={index}>
              <IndexesAnchor index={item.index} />
              <CellGroup>
                {item.children.map((val, idx) => (
                  <Cell key={idx}>{val}</Cell>
                ))}
              </CellGroup>
            </Fragment>
          ))}
        </Indexes>,
      );

      fireEvent.scroll(container.firstChild, { target: { scrollTop: 100 } });
      const $indexesAnchors = container.querySelectorAll<HTMLElement>(`.${name}-anchor__wrapper`);
      expect($indexesAnchors[0].classList.contains(`${name}-anchor__wrapper--sticky`)).toBeTruthy();
      expect($indexesAnchors[0].style.top).toBe('0px');
    });

    it('sticky is false', () => {
      const { container } = render(
        <Indexes indexList={indexList} sticky={false}>
          {list.map((item, index) => (
            <Fragment key={index}>
              <IndexesAnchor index={item.index} />
              <CellGroup>
                {item.children.map((val, idx) => (
                  <Cell key={idx}>{val}</Cell>
                ))}
              </CellGroup>
            </Fragment>
          ))}
        </Indexes>,
      );

      const $indexesAnchorSticky = container.querySelector<HTMLElement>(`${name}-anchor__wrapper--sticky`);
      expect($indexesAnchorSticky).toBeNull();
    });

    it('stickyOffset', () => {
      const stickyOffset = 50;
      const { container } = render(
        <Indexes indexList={indexList} stickyOffset={stickyOffset}>
          {list.map((item, index) => (
            <Fragment key={index}>
              <IndexesAnchor index={item.index} />
              <CellGroup>
                {item.children.map((val, idx) => (
                  <Cell key={idx}>{val}</Cell>
                ))}
              </CellGroup>
            </Fragment>
          ))}
        </Indexes>,
      );
      fireEvent.scroll(container.firstChild, { target: { scrollTop: 100 } });
      const $indexesAnchor = container.querySelector<HTMLElement>(`.${name}-anchor__wrapper`);
      expect($indexesAnchor.style.top).toBe(`${stickyOffset}px`);
    });
  });

  describe('event', () => {
    it('select', () => {
      const selectFn = vi.fn();
      const { container } = render(
        <Indexes indexList={indexList} onSelect={selectFn}>
          {list.map((item, index) => (
            <Fragment key={index}>
              <IndexesAnchor index={item.index} />
              <CellGroup>
                {item.children.map((val, idx) => (
                  <Cell key={idx}>{val}</Cell>
                ))}
              </CellGroup>
            </Fragment>
          ))}
        </Indexes>,
      );
      const $sideBarItem = container.querySelector<HTMLElement>(`.${name}__sidebar-item`);
      fireEvent.click($sideBarItem);
      expect(selectFn).toBeCalledWith(list[0].index);
    });

    it('change', () => {
      const selectFn = vi.fn();
      const changeFn = vi.fn();
      const { container } = render(
        <Indexes indexList={indexList} onSelect={selectFn} onChange={changeFn}>
          {list.map((item, index) => (
            <Fragment key={index}>
              <IndexesAnchor index={item.index} />
              <CellGroup>
                {item.children.map((val, idx) => (
                  <Cell key={idx}>{val}</Cell>
                ))}
              </CellGroup>
            </Fragment>
          ))}
        </Indexes>,
      );
      const $sideBarItems = container.querySelectorAll<HTMLElement>(`.${name}__sidebar-item`);
      fireEvent.click($sideBarItems[1]);
      expect(selectFn).toBeCalledWith(list[1].index);
      expect(changeFn).toBeCalledWith(list[1].index);
    });
  });

  describe('behavior', () => {
    it('touch sidebar show tips', async () => {
      const { container } = render(
        <Indexes indexList={indexList}>
          {list.map((item, index) => (
            <Fragment key={index}>
              <IndexesAnchor index={item.index} />
              <CellGroup>
                {item.children.map((val, idx) => (
                  <Cell key={idx}>{val}</Cell>
                ))}
              </CellGroup>
            </Fragment>
          ))}
        </Indexes>,
      );
      const $sideBarItem = container.querySelector<HTMLElement>(`.${name}__sidebar-item`);
      fireEvent.click($sideBarItem);
      const $sidebarTip = container.querySelector(`.${name}__sidebar-tips`);
      expect($sidebarTip).toBeDefined();
      expect($sidebarTip.textContent).toBe(String(indexList[0]));
      await new Promise<void>((resolve) => {
        setTimeout(() => {
          resolve();
        }, 1000);
      });
      expect(container.querySelector(`.${name}__sidebar-tips`)).toBeNull();
    });

    it('sidebar touchmove', () => {
      const changeFn = vi.fn();
      const { container } = render(
        <Indexes indexList={indexList} onChange={changeFn}>
          {list.map((item, index) => (
            <Fragment key={index}>
              <IndexesAnchor index={item.index} />
              <CellGroup>
                {item.children.map((val, idx) => (
                  <Cell key={idx}>{val}</Cell>
                ))}
              </CellGroup>
            </Fragment>
          ))}
        </Indexes>,
      );
      const $sideBar = container.querySelector<HTMLElement>(`.${name}__sidebar`);
      document.elementFromPoint = function (clientX: number, clientY: number) {
        const $sideBarItems = $sideBar.querySelectorAll<HTMLElement>(`.${name}__sidebar-item`);
        return $sideBarItems[Math.floor(clientY / 20)];
      };
      fireEvent.touchStart($sideBar, { touches: [{ clientX: 20, clientY: 10 }] });
      fireEvent.touchMove($sideBar, { touches: [{ clientX: 20, clientY: 50 }] });
      fireEvent.touchEnd($sideBar, { touches: [{ clientX: 20, clientY: 50 }] });
      expect(changeFn).toBeCalledWith(indexList[Math.floor(50 / 20)]);
      const $sidebarTip = container.querySelector(`.${name}__sidebar-tips`);
      expect($sidebarTip).toBeDefined();
      expect($sidebarTip.textContent).toBe(String(indexList[Math.floor(50 / 20)]));
    });
  });
});
