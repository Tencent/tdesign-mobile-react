import { describe, it, expect, vi } from 'vitest';
import * as Util from '../util';
import getFixScaleEleTransPosition from '../getFixScaleEleTransPosition';

describe('image-viewer utils', () => {
  describe('getClientSize', () => {
    it('reads viewport size from document/window', () => {
      // jsdom: 可直接设置 window.innerHeight 与 document.documentElement.clientWidth
      const originalInnerHeight = window.innerHeight;
      const originalClientWidth = document.documentElement.clientWidth;

      // @ts-ignore
      window.innerHeight = 700;
      Object.defineProperty(document.documentElement, 'clientWidth', {
        configurable: true,
        get: () => 375,
      });

      const { width, height } = Util.getClientSize();
      expect(width).toBe(375);
      expect(height).toBe(700);

      // 恢复
      // @ts-ignore
      window.innerHeight = originalInnerHeight;
      Object.defineProperty(document.documentElement, 'clientWidth', {
        configurable: true,
        get: () => originalClientWidth,
      });
    });
  });

  describe('getFixScaleEleTransPosition', () => {
    it('returns {x:0,y:0} when element fits within viewport', () => {
      const spy = vi.spyOn(Util, 'getClientSize').mockReturnValue({ width: 375, height: 700 });
      const fix = getFixScaleEleTransPosition(300, 400, 0, 0);
      expect(fix).toEqual({ x: 0, y: 0 });
      spy.mockRestore();
    });

    it('fixes X when width > client and left > 0 (drag left beyond 0)', () => {
      const spy = vi.spyOn(Util, 'getClientSize').mockReturnValue({ width: 375, height: 700 });
      // width=500 > clientWidth=375, left=10 => 应回弹到 offsetStart=(width-client)/2=62.5
      const fix = getFixScaleEleTransPosition(500, 300, 10, 0);
      expect(fix).toMatchObject({ x: (500 - 375) / 2 });
      spy.mockRestore();
    });

    it('fixes X when width > client and left + width < client (drag too far right)', () => {
      const spy = vi.spyOn(Util, 'getClientSize').mockReturnValue({ width: 375, height: 700 });
      // width=500 > clientWidth=375, left=-200 -> left+width=300 < 375 => x=-offsetStart
      const fix = getFixScaleEleTransPosition(500, 300, -200, 0);
      expect(fix).toMatchObject({ x: -((500 - 375) / 2) });
      spy.mockRestore();
    });

    it('fixes Y when height > client and top > 0 / or top + height < client', () => {
      const spy = vi.spyOn(Util, 'getClientSize').mockReturnValue({ width: 375, height: 700 });
      // height=800 > clientHeight=700, top=10 => 应回弹到 y=0（offsetStart 对 y 轴为 0）
      const fixTop = getFixScaleEleTransPosition(300, 800, 0, 10);
      expect(Math.abs(fixTop.y)).toBe(0);
      // top=-200 且 top+height=600<700 => 回弹到 y=0
      const fixBottom = getFixScaleEleTransPosition(300, 800, 0, -200);
      expect(Math.abs(fixBottom.y)).toBe(0);
      spy.mockRestore();
    });

    it('fixes X when width <= client but x is out of bounds', () => {
      const spy = vi.spyOn(Util, 'getClientSize').mockReturnValue({ width: 375, height: 700 });
      // 为避免 width<=client & height<=client 的“直接归位”分支，这里让 height > clientHeight
      // width=300 <= 375，left<0 => 回弹到 offsetStart=(width-client)/2=-37.5（函数逻辑返回 start<0 ? offsetStart : -offsetStart）
      const fixLeft = getFixScaleEleTransPosition(300, 800, -10, 0);
      expect(fixLeft).toMatchObject({ x: (300 - 375) / 2 });
      // left+width>client => 回弹到 -offsetStart
      const fixRight = getFixScaleEleTransPosition(300, 800, 100, 0);
      expect(fixRight).toMatchObject({ x: -((300 - 375) / 2) });
      spy.mockRestore();
    });
  });
});
