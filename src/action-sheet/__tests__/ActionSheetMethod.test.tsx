import { describe, it, expect } from '@test/utils';

describe('ActionSheetMethod', () => {
  describe('module exports', () => {
    it('should export show and close functions', async () => {
      const module = await import('../ActionSheetMethod');
      expect(typeof module.show).toBe('function');
      expect(typeof module.close).toBe('function');
    });

    it('should be able to call show function', async () => {
      const module = await import('../ActionSheetMethod');
      expect(() => {
        module.show({
          items: ['Item 1', 'Item 2'],
        });
      }).not.toThrow();
    });

    it('should be able to call close function', async () => {
      const module = await import('../ActionSheetMethod');
      expect(() => {
        module.close();
      }).not.toThrow();
    });

    it('should handle show with empty config', async () => {
      const module = await import('../ActionSheetMethod');
      expect(() => {
        module.show({});
      }).not.toThrow();
    });

    it('should handle show with various config options', async () => {
      const module = await import('../ActionSheetMethod');
      expect(() => {
        module.show({
          items: ['Test Item'],
          theme: 'grid',
          description: 'Test Description',
          visible: true,
        });
      }).not.toThrow();
    });

    it('should handle multiple show calls', async () => {
      const module = await import('../ActionSheetMethod');
      expect(() => {
        module.show({ items: ['Item 1'] });
        module.show({ items: ['Item 2'] });
      }).not.toThrow();
    });

    it('should handle show and close sequence', async () => {
      const module = await import('../ActionSheetMethod');
      expect(() => {
        module.show({ items: ['Item 1'] });
        module.close();
        module.show({ items: ['Item 2'] });
        module.close();
      }).not.toThrow();
    });
  });
});
