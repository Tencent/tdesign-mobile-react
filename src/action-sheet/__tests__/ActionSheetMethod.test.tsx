import { describe, it, expect, afterEach } from '@test/utils';
import { show, close } from '../ActionSheetMethod';

describe('ActionSheetMethod', () => {
  afterEach(() => {
    // 清理每次测试后可能残留的 ActionSheet
    close();
  });

  describe('module exports', () => {
    it('should export show and close functions', () => {
      expect(typeof show).toBe('function');
      expect(typeof close).toBe('function');
    });

    it('should be able to call show function', () => {
      expect(() => {
        show({
          items: ['Item 1', 'Item 2'],
        });
      }).not.toThrow();
    });

    it('should be able to call close function', () => {
      expect(() => {
        close();
      }).not.toThrow();
    });

    it('should handle show with empty config', () => {
      expect(() => {
        show({});
      }).not.toThrow();
    });

    it('should handle show with various config options', () => {
      expect(() => {
        show({
          items: ['Test Item'],
          theme: 'grid',
          description: 'Test Description',
          visible: true,
        });
      }).not.toThrow();
    });

    it('should handle multiple show calls', () => {
      expect(() => {
        show({ items: ['Item 1'] });
        show({ items: ['Item 2'] });
      }).not.toThrow();
    });

    it('should handle show and close sequence', () => {
      expect(() => {
        show({ items: ['Item 1'] });
        close();
        show({ items: ['Item 2'] });
        close();
      }).not.toThrow();
    });
  });
});
