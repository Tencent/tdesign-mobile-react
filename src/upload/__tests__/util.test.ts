import { describe, it, expect } from '@test/utils';
import { 
  urlCreator, 
  removeProperty, 
  removePropertyAtArray, 
  getIndex, 
  getNewestUidFactory 
} from '../util';

describe('Upload Utils', () => {
  describe('urlCreator', () => {
    it('should return URL creator function', () => {
      const creator = urlCreator();
      expect(typeof creator).toBe('function');
    });

    it('should return webkitURL when available', () => {
      const mockWebkitURL = { createObjectURL: () => 'webkit-url' };
      Object.defineProperty(window, 'webkitURL', {
        value: mockWebkitURL,
        writable: true
      });
      
      const creator = urlCreator();
      expect(creator).toBe(mockWebkitURL);
    });

    it('should return URL when webkitURL not available', () => {
      const mockURL = { createObjectURL: () => 'standard-url' };
      Object.defineProperty(window, 'webkitURL', {
        value: undefined,
        writable: true
      });
      Object.defineProperty(window, 'URL', {
        value: mockURL,
        writable: true
      });
      
      const creator = urlCreator();
      expect(creator).toBe(mockURL);
    });
  });

  describe('removeProperty', () => {
    it('should remove specified property from object', () => {
      const obj = { a: 1, b: 2, c: 3 };
      const result = removeProperty(obj, 'b');
      
      expect(result).toEqual({ a: 1, c: 3 });
      expect(result).not.toBe(obj); // 应该返回新对象
    });

    it('should handle non-existent property', () => {
      const obj = { a: 1, b: 2 };
      const result = removeProperty(obj, 'nonexistent');
      
      expect(result).toEqual({ a: 1, b: 2 });
    });

    it('should handle undefined property', () => {
      const obj = { a: 1, b: undefined };
      const result = removeProperty(obj, 'b');
      
      // 实现不会删除值为 undefined 的键
      expect(result).toEqual({ a: 1, b: undefined });
      expect(Object.prototype.hasOwnProperty.call(result, 'b')).toBe(true);
    });

    it('should preserve original object', () => {
      const obj = { a: 1, b: 2 };
      const result = removeProperty(obj, 'b');
      
      expect(obj).toEqual({ a: 1, b: 2 }); // 原对象不变
      expect(result).toEqual({ a: 1 });
    });
  });

  describe('removePropertyAtArray', () => {
    it('should remove property from all objects in array', () => {
      const arr = [
        { a: 1, b: 2 },
        { a: 3, b: 4 },
        { a: 5, b: 6 }
      ];
      const result = removePropertyAtArray(arr, 'b');
      
      expect(result).toEqual([
        { a: 1 },
        { a: 3 },
        { a: 5 }
      ]);
    });

    it('should handle empty array', () => {
      const arr: any[] = [];
      const result = removePropertyAtArray(arr, 'b');
      
      expect(result).toEqual([]);
    });

    it('should return new array instance', () => {
      const arr = [{ a: 1, b: 2 }];
      const result = removePropertyAtArray(arr, 'b');
      
      expect(result).not.toBe(arr);
      expect(result[0]).not.toBe(arr[0]);
    });

    it('should preserve original array', () => {
      const arr = [{ a: 1, b: 2 }];
      const result = removePropertyAtArray(arr, 'b');
      
      expect(arr).toEqual([{ a: 1, b: 2 }]); // 原数组不变
      expect(result).toEqual([{ a: 1 }]);
    });
  });

  describe('getIndex', () => {
    it('should return function that generates incremental index', () => {
      const indexGenerator = getIndex();
      
      expect(typeof indexGenerator).toBe('function');
      expect(indexGenerator()).toBe(0);
      expect(indexGenerator()).toBe(1);
      expect(indexGenerator()).toBe(2);
    });

    it('should create independent index generators', () => {
      const gen1 = getIndex();
      const gen2 = getIndex();
      
      expect(gen1()).toBe(0);
      expect(gen2()).toBe(0);
      expect(gen1()).toBe(1);
      expect(gen2()).toBe(1);
    });

    it('should maintain state between calls', () => {
      const indexGenerator = getIndex();
      
      indexGenerator(); // 0
      indexGenerator(); // 1
      
      expect(indexGenerator()).toBe(2);
    });
  });

  describe('getNewestUidFactory', () => {
    it('should return function that generates unique IDs', () => {
      const uidFactory = getNewestUidFactory();
      
      expect(typeof uidFactory).toBe('function');
      
      const uid1 = uidFactory();
      const uid2 = uidFactory();
      
      expect(typeof uid1).toBe('string');
      expect(typeof uid2).toBe('string');
      expect(uid1).not.toBe(uid2);
    });

    it('should generate IDs with correct format', () => {
      const uidFactory = getNewestUidFactory();
      const uid = uidFactory();
      
      expect(uid).toMatch(/^td__upload__\d+_\d+__$/);
    });

    it('should include timestamp in ID', () => {
      const beforeTime = Date.now();
      const uidFactory = getNewestUidFactory();
      const uid = uidFactory();
      const afterTime = Date.now();
      
      const timestampMatch = uid.match(/td__upload__(\d+)_\d+__/);
      expect(timestampMatch).toBeTruthy();
      
      if (timestampMatch) {
        const timestamp = parseInt(timestampMatch[1], 10);
        expect(timestamp).toBeGreaterThanOrEqual(beforeTime);
        expect(timestamp).toBeLessThanOrEqual(afterTime);
      }
    });

    it('should generate incremental index in ID', () => {
      const uidFactory = getNewestUidFactory();
      
      const uid1 = uidFactory();
      const uid2 = uidFactory();
      
      const index1Match = uid1.match(/td__upload__\d+_(\d+)__/);
      const index2Match = uid2.match(/td__upload__\d+_(\d+)__/);
      
      expect(index1Match).toBeTruthy();
      expect(index2Match).toBeTruthy();
      
      if (index1Match && index2Match) {
        const index1 = parseInt(index1Match[1], 10);
        const index2 = parseInt(index2Match[1], 10);
        expect(index2).toBe(index1 + 1);
      }
    });

    it('should create independent UID factories', () => {
      const factory1 = getNewestUidFactory();
      const factory2 = getNewestUidFactory();
      
      // 先从第一个工厂生成一个 ID
      factory1();
      
      const uid1 = factory1(); // 这是第二个 ID，索引为 1
      const uid2 = factory2(); // 这是第一个 ID，索引为 0
      
      // 两个工厂生成的 ID 应该不同（因为索引不同）
      expect(uid1).not.toBe(uid2);
    });
  });
});
