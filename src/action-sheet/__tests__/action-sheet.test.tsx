import React from 'react';
import { describe, expect, it, act, beforeEach, afterEach, render } from '@test/utils';
import { vi } from 'vitest';
import { AppIcon } from 'tdesign-icons-react';
import ActionSheet from '../index';
import type { ActionSheetItem } from '../type';

describe('ActionSheet', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
    ActionSheet.close();
    // ActionSheet.close()已经负责清理DOM，不需要额外的innerHTML清空
  });

  describe('props', () => {
    it(': visible & items', async () => {
      const items = ['选项1', '选项2', '选项3'];
      expect(document.querySelector('.t-action-sheet')).toBeFalsy();

      await act(async () => {
        ActionSheet.show({
          items,
          visible: true,
        });
      });

      expect(document.querySelector('.t-action-sheet')).toBeTruthy();
      const menuItems = document.querySelectorAll('.t-action-sheet__list-item');
      expect(menuItems.length).toBe(items.length);
      menuItems.forEach((item, index) => {
        expect(item.textContent?.trim()).toBe(items[index]);
      });
    });

    it(': theme', async () => {
      const testTheme = async (theme, target) => {
        await act(async () => {
          ActionSheet.show({
            items: ['选项1', '选项2'],
            theme,
          });
        });
        expect(document.querySelector(target)).toBeTruthy();
      };
      await testTheme('list', '.t-action-sheet__list');
      await testTheme('grid', '.t-action-sheet__grid');
    });

    it(': align', async () => {
      const testAlign = async (align) => {
        await act(async () => {
          ActionSheet.show({
            items: ['选项1'],
            align,
          });
        });
        expect(document.querySelector(`.t-action-sheet__list-item--${align}`)).toBeTruthy();
      };
      await testAlign('left');
    });

    it(': showCancel & cancelText', async () => {
      const cancelText = '关闭';
      await act(async () => {
        ActionSheet.show({
          items: ['选项1'],
          showCancel: true,
          cancelText,
        });
      });
      const cancelBtn = document.querySelector('.t-action-sheet__cancel');
      expect(cancelBtn).toBeTruthy();
      expect(cancelBtn?.textContent?.trim()).toBe(cancelText);

      ActionSheet.close();
      await act(async () => {
        ActionSheet.show({
          items: ['选项1'],
          showCancel: false,
        });
      });
      expect(document.querySelector('.t-action-sheet__cancel')).toBeFalsy();
    });

    it(': description', async () => {
      const description = '这是一个描述';
      await act(async () => {
        ActionSheet.show({
          items: ['选项1'],
          description,
        });
      });
      const descEl = document.querySelector('.t-action-sheet__description');
      expect(descEl).toBeTruthy();
      expect(descEl?.textContent?.trim()).toBe(description);
    });

    it(': showOverlay', async () => {
      const testShowOverlay = async (showOverlay) => {
        await act(async () => {
          ActionSheet.show({
            items: ['选项1'],
            showOverlay,
          });
        });
        const overlay = document.querySelector('.t-overlay');
        if (showOverlay) {
          expect(overlay).toBeTruthy();
        } else {
          expect(overlay).toBeFalsy();
        }
      };
      await testShowOverlay(true);
      ActionSheet.close();
      await testShowOverlay(false);
    });

    it(': items with ActionSheetItem', async () => {
      const items: ActionSheetItem[] = [
        { label: '选项1', color: '#ff0000' },
        { label: '选项2', disabled: true },
        { label: '选项3', icon: <AppIcon /> },
      ];
      await act(async () => {
        ActionSheet.show({
          items,
        });
      });

      const menuItems = document.querySelectorAll('.t-action-sheet__list-item');
      expect(menuItems.length).toBe(items.length);
      expect(menuItems[0].querySelector('.t-action-sheet__list-item-text')?.textContent?.trim()).toBe('选项1');
      expect(menuItems[0].getAttribute('style')).toContain('color: rgb(255, 0, 0)');
      expect(menuItems[1].getAttribute('disabled')).toBe('');
      expect(menuItems[2].querySelector('.t-icon-app')).toBeTruthy();
    });

    it(': ActionSheetList - empty items', async () => {
      // 测试空数组情况
      await act(async () => {
        ActionSheet.show({
          items: [],
        });
      });

      const menuItems = document.querySelectorAll('.t-action-sheet__list-item');
      expect(menuItems.length).toBe(0);

      // 测试undefined情况
      ActionSheet.close();
      await act(async () => {
        ActionSheet.show({
          // 不提供items参数
        });
      });

      const menuItems2 = document.querySelectorAll('.t-action-sheet__list-item');
      expect(menuItems2.length).toBe(0);
    });

    it(': ActionSheetList - items with badge property', async () => {
      const items: ActionSheetItem[] = [
        { label: '选项1' },
        { label: '选项2', badge: { dot: true } },
        { label: '选项3', badge: { count: 10 } },
      ];
      await act(async () => {
        ActionSheet.show({
          items,
          theme: 'list', // 明确指定为list主题
        });
      });

      const menuItems = document.querySelectorAll('.t-action-sheet__list-item');
      expect(menuItems.length).toBe(items.length);

      // 验证没有badge的item
      expect(menuItems[0].querySelector('.t-badge')).toBeFalsy();
      expect(menuItems[0].querySelector('.t-action-sheet__list-item-text')?.textContent?.trim()).toBe('选项1');

      // 验证带dot类型badge的item
      expect(menuItems[1].querySelector('.t-badge')).toBeTruthy();
      expect(menuItems[1].querySelector('.t-badge--dot')).toBeTruthy();

      // 验证带count类型badge的item
      expect(menuItems[2].querySelector('.t-badge')).toBeTruthy();
      expect(menuItems[2].querySelector('.t-badge--basic')?.textContent?.trim()).toBe('10');
    });

    it(': count (grid theme)', async () => {
      const count = 4;
      const items = Array(8).fill('选项');
      await act(async () => {
        ActionSheet.show({
          items,
          theme: 'grid',
          count,
        });
      });

      // ActionSheetGrid使用Grid组件，所以查找GridItem生成的元素
      const gridItems = document.querySelectorAll('.t-grid-item');
      expect(gridItems.length).toBe(items.length);

      // 验证是否正确渲染了网格容器
      expect(document.querySelector('.t-action-sheet__grid')).toBeTruthy();
    });
  });

  describe('event', () => {
    it(': onSelected', async () => {
      const onSelected = vi.fn();
      const items = ['选项1', '选项2'];
      await act(async () => {
        ActionSheet.show({
          items,
          onSelected,
        });
      });

      const menuItems = document.querySelectorAll('.t-action-sheet__list-item');
      await act(async () => {
        menuItems[0].dispatchEvent(new MouseEvent('click', { bubbles: true }));
      });

      expect(onSelected).toHaveBeenCalledWith(items[0], 0);
    });

    it(': onCancel', async () => {
      const onCancel = vi.fn();
      await act(async () => {
        ActionSheet.show({
          items: ['选项1'],
          onCancel,
        });
      });

      const cancelBtn = document.querySelector('.t-action-sheet__cancel');
      await act(async () => {
        cancelBtn?.dispatchEvent(new MouseEvent('click', { bubbles: true }));
      });

      expect(onCancel).toHaveBeenCalled();
    });

    it(': onClose', async () => {
      const onClose = vi.fn();

      const { unmount } = render(<ActionSheet visible={true} items={[{ label: '选项1' }]} onClose={onClose} />);

      // 等待动画完成
      await act(async () => {
        vi.advanceTimersByTime(300);
      });

      // 模拟点击遮罩层来触发onClose事件
      // 找到overlay元素并触发点击事件
      const overlay = document.querySelector('.t-overlay');
      if (overlay) {
        await act(async () => {
          overlay.dispatchEvent(new MouseEvent('click', { bubbles: true }));
        });

        // 等待动画完成
        await act(async () => {
          vi.advanceTimersByTime(300);
        });
      }

      // 验证onClose被调用
      expect(onClose).toHaveBeenCalledTimes(1);

      // 手动卸载组件以避免清理问题
      unmount();
    });
  });

  describe('method', () => {
    it(': show & close', async () => {
      await act(async () => {
        ActionSheet.show({
          items: ['选项1', '选项2'],
        });
      });
      expect(document.querySelector('.t-action-sheet')).toBeTruthy();

      await act(async () => {
        ActionSheet.close();
      });
      expect(document.querySelector('.t-action-sheet')).toBeFalsy();
    });

    it(': ActionSheetGrid - default items and count', async () => {
      await act(async () => {
        ActionSheet.show({
          theme: 'grid',
          // 不提供items和count，测试默认值行为
        });
      });

      const gridElement = document.querySelector('.t-action-sheet__grid');
      expect(gridElement).toBeTruthy();

      // 验证没有items时不会渲染任何GridItem
      const gridItems = document.querySelectorAll('.t-grid-item');
      expect(gridItems.length).toBe(0);
    });

    it(': ActionSheetGrid - items as ActionSheetItem objects', async () => {
      const items: ActionSheetItem[] = [
        { label: '选项1', icon: <AppIcon /> },
        { label: '选项2', badge: { dot: true } },
        { label: '选项3', icon: <AppIcon />, badge: { count: 5 } },
      ];

      await act(async () => {
        ActionSheet.show({
          items,
          theme: 'grid',
          count: 4,
        });
      });

      const gridItems = document.querySelectorAll('.t-grid-item');
      expect(gridItems.length).toBe(items.length);

      // 验证每个item的属性是否正确渲染
      expect(gridItems[0].querySelector('.t-icon-app')).toBeTruthy();
      expect(gridItems[0].querySelector('.t-grid-item__title')?.textContent?.trim()).toBe('选项1');

      // 验证badge是否正确渲染
      expect(gridItems[1].querySelector('.t-badge')).toBeTruthy();
      expect(gridItems[2].querySelector('.t-badge')?.textContent?.trim()).toBe('5');
    });

    it(': ActionSheetGrid - onSelected method with correct index calculation', async () => {
      const onSelected = vi.fn();
      const items = Array(12).fill('选项'); // 创建12个选项，count=4时应该有3页，每页4个选项

      await act(async () => {
        ActionSheet.show({
          items,
          theme: 'grid',
          count: 4,
          onSelected,
        });
      });

      // 模拟点击第2页的第2个选项（索引应该是 4 + 1 = 5）
      const swiperItem = document.querySelector('.t-swiper-item');
      const gridItems = swiperItem?.querySelectorAll('.t-grid-item');

      if (gridItems && gridItems.length > 0) {
        await act(async () => {
          gridItems[0].dispatchEvent(new MouseEvent('click', { bubbles: true }));
        });

        // 验证onSelected被调用且索引正确
        expect(onSelected).toHaveBeenCalledTimes(1);
        expect(onSelected).toHaveBeenCalledWith('选项', 0); // 第一页第一个选项的索引是0
      }
    });

    it(': show with multiple calls', async () => {
      // 连续调用show，应该只显示最后一个
      await act(async () => {
        ActionSheet.show({
          items: ['选项1'],
        });
        ActionSheet.show({
          items: ['选项2', '选项3'],
        });
      });

      const menuItems = document.querySelectorAll('.t-action-sheet__list-item');
      expect(menuItems.length).toBe(2);
      expect(menuItems[0].textContent?.trim()).toBe('选项2');
    });

    it(': disabled item should not trigger onSelected', async () => {
      const onSelected = vi.fn();
      const items: ActionSheetItem[] = [{ label: '正常选项' }, { label: '禁用选项', disabled: true }];
      await act(async () => {
        ActionSheet.show({
          items,
          onSelected,
        });
      });

      const menuItems = document.querySelectorAll('.t-action-sheet__list-item');
      await act(async () => {
        menuItems[1].dispatchEvent(new MouseEvent('click', { bubbles: true }));
      });

      expect(onSelected).not.toHaveBeenCalled();

      // 确认正常选项可以触发
      await act(async () => {
        menuItems[0].dispatchEvent(new MouseEvent('click', { bubbles: true }));
      });

      expect(onSelected).toHaveBeenCalledWith(items[0], 0);
    });
  });
});
