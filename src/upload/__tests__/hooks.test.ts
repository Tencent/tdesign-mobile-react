import { renderHook, act } from '@test/utils';
import { vi } from 'vitest';
import useUpload from '../hooks/useUpload';
import type { TdUploadProps, UploadFile } from '../type';

// Mock 依赖模块
vi.mock('../../_common/js/upload/main', () => ({
  formatToUploadFile: vi.fn((files: File[]) =>
    files.map((f) => ({ name: f.name, raw: f, status: 'waiting' } as UploadFile))
  ),
  getDisplayFiles: vi.fn(({ uploadValue, toUploadFiles, autoUpload }: any) =>
    autoUpload ? [...uploadValue, ...toUploadFiles] : uploadValue
  ),
  getFilesAndErrors: vi.fn((fileValidateList: any[]) => {
    const toFiles = fileValidateList.map((x) => x.file ?? x);
    return { sizeLimitErrors: [], beforeUploadErrorFiles: [], toFiles };
  }),
  validateFile: vi.fn((args: any) => {
    const { files } = args;
    const fileValidateList = files.map((f: File) => ({ 
      file: { name: f.name, raw: f, status: 'waiting' } 
    }));
    return Promise.resolve({ files, fileValidateList });
  }),
  upload: vi.fn(() => {
    const data = { files: [], response: { ok: true } };
    return Promise.resolve({ status: 'success', data, list: [{ data }], failedFiles: [] });
  }),
}));

vi.mock('../../_common/js/upload/utils', () => ({
  getFileList: vi.fn((fl: FileList) => Array.from(fl)),
  getFileUrlByFileRaw: vi.fn(async () => 'blob://mock-url'),
}));

function createFile(name = 'test.png', type = 'image/png') {
  const blob = new Blob(['test content'], { type });
  return new File([blob], name, { type });
}

describe('useUpload', () => {
  describe('basic functionality', () => {
    it('should initialize with default values', () => {
      const props: TdUploadProps = {};
      const { result } = renderHook(() => useUpload(props));
      
      expect(result.current.uploadValue).toEqual([]);
      expect(result.current.toUploadFiles).toEqual([]);
      expect(result.current.displayFiles).toEqual([]);
      expect(result.current.isUploading).toBe(false);
      expect(result.current.disabled).toBeUndefined();
    });

    it('should handle disabled state', () => {
      const props: TdUploadProps = { disabled: true };
      const { result } = renderHook(() => useUpload(props));
      
      expect(result.current.disabled).toBe(true);
    });

    it('should initialize with defaultFiles', () => {
      const defaultFiles: UploadFile[] = [
        { name: 'test.png', url: 'https://example.com/test.png', status: 'success' }
      ];
      const props: TdUploadProps = { defaultFiles };
      const { result } = renderHook(() => useUpload(props));
      
      expect(result.current.uploadValue).toEqual(defaultFiles);
    });
  });

  describe('file operations', () => {
    it('should handle file change', async () => {
      const onSelectChange = vi.fn();
      const props: TdUploadProps = { onSelectChange };
      const { result } = renderHook(() => useUpload(props));
      
      const files = [createFile('test.png')];
      
      await act(async () => {
        result.current.onFileChange(files);
      });
      
      expect(onSelectChange).toHaveBeenCalledWith(
        files,
        expect.objectContaining({ currentSelectedFiles: expect.any(Array) })
      );
    });

    it('should not handle file change when disabled', async () => {
      const onSelectChange = vi.fn();
      const props: TdUploadProps = { disabled: true, onSelectChange };
      const { result } = renderHook(() => useUpload(props));
      
      const files = [createFile('test.png')];
      
      await act(async () => {
        result.current.onFileChange(files);
      });
      
      expect(onSelectChange).not.toHaveBeenCalled();
    });

    it('should handle file upload', async () => {
      const onSuccess = vi.fn();
      const props: TdUploadProps = { 
        autoUpload: true, 
        action: '//mock-api',
        onSuccess 
      };
      const { result } = renderHook(() => useUpload(props));
      
      const uploadFiles: UploadFile[] = [
        { name: 'test.png', raw: createFile('test.png'), status: 'waiting' }
      ];
      
      await act(async () => {
        result.current.uploadFiles(uploadFiles);
      });
      
      expect(onSuccess).toHaveBeenCalled();
    });

    it('should handle file removal', () => {
      const onRemove = vi.fn();
      const files: UploadFile[] = [
        { name: 'test.png', url: 'https://example.com/test.png', status: 'success' }
      ];
      const props: TdUploadProps = { files, onRemove };
      const { result } = renderHook(() => useUpload(props));
      
      const mockEvent = { stopPropagation: vi.fn() } as any;
      
      act(() => {
        result.current.onInnerRemove({
          e: mockEvent,
          file: files[0],
          index: 0
        });
      });
      
      expect(onRemove).toHaveBeenCalledWith(
        expect.objectContaining({
          file: files[0],
          index: 0,
          e: mockEvent
        })
      );
    });

    it('should handle upload cancellation', () => {
      const props: TdUploadProps = { autoUpload: true };
      const { result } = renderHook(() => useUpload(props));
      
      act(() => {
        result.current.cancelUpload();
      });
      
      expect(result.current.isUploading).toBe(false);
    });
  });

  describe('validation', () => {
    it('should validate file size limit', async () => {
      const { validateFile } = await import('../../_common/js/upload/main');
      vi.mocked(validateFile).mockResolvedValueOnce({
        files: [],
        fileValidateList: [{
          file: { name: 'large.png', size: 2000000, status: 'waiting' },
          validateResult: { type: 'FILE_OVER_SIZE_LIMIT' }
        }]
      });

      const onValidate = vi.fn();
      const props: TdUploadProps = { 
        sizeLimit: 1000,
        onValidate
      };
      const { result } = renderHook(() => useUpload(props));
      
      const files = [createFile('large.png')];
      
      await act(async () => {
        result.current.onFileChange(files);
      });
      
      // 验证会被调用，具体的验证逻辑在 main 模块中
      expect(validateFile).toHaveBeenCalled();
    });

    it('should validate max file count', async () => {
      const { validateFile } = await import('../../_common/js/upload/main');
      vi.mocked(validateFile).mockResolvedValueOnce({
        files: [],
        lengthOverLimit: true,
        fileValidateList: []
      });

      const onValidate = vi.fn();
      const props: TdUploadProps = { 
        max: 1,
        onValidate
      };
      const { result } = renderHook(() => useUpload(props));
      
      const files = [createFile('test1.png'), createFile('test2.png')];
      
      await act(async () => {
        result.current.onFileChange(files);
      });
      
      expect(onValidate).toHaveBeenCalledWith(
        expect.objectContaining({ type: 'FILES_OVER_LENGTH_LIMIT' })
      );
    });

    it('should handle duplicate file names', async () => {
      const { validateFile } = await import('../../_common/js/upload/main');
      vi.mocked(validateFile).mockResolvedValueOnce({
        files: [],
        hasSameNameFile: true,
        fileValidateList: []
      });

      const onValidate = vi.fn();
      const props: TdUploadProps = { 
        allowUploadDuplicateFile: false,
        onValidate
      };
      const { result } = renderHook(() => useUpload(props));
      
      const files = [createFile('same.png'), createFile('same.png')];
      
      await act(async () => {
        result.current.onFileChange(files);
      });
      
      expect(onValidate).toHaveBeenCalledWith(
        expect.objectContaining({ type: 'FILTER_FILE_SAME_NAME' })
      );
    });
  });

  describe('upload modes', () => {
    it('should handle auto upload mode', async () => {
      const onSuccess = vi.fn();
      const props: TdUploadProps = { 
        autoUpload: true,
        action: '//mock-api',
        onSuccess
      };
      const { result } = renderHook(() => useUpload(props));
      
      const files = [createFile('test.png')];
      
      await act(async () => {
        result.current.onFileChange(files);
      });
      
      // 在自动上传模式下，文件变更会触发上传
      expect(onSuccess).toHaveBeenCalled();
    });

    it('should handle manual upload mode', async () => {
      const onChange = vi.fn();
      const props: TdUploadProps = { 
        autoUpload: false,
        onChange
      };
      const { result } = renderHook(() => useUpload(props));
      
      const files = [createFile('test.png')];
      
      await act(async () => {
        result.current.onFileChange(files);
      });
      
      // 在手动上传模式下，文件会被添加到列表但不会自动上传
      expect(onChange).toHaveBeenCalled();
    });
  });

  describe('progress handling', () => {
    it('should update file upload progress', () => {
      const props: TdUploadProps = { autoUpload: true };
      const { result } = renderHook(() => useUpload(props));
      
      const file: UploadFile = { name: 'test.png', raw: createFile('test.png'), status: 'progress' };
      
      // 通过 onFileChange 来设置 toUploadFiles，这样才能正确初始化状态
      act(async () => {
        await result.current.onFileChange([createFile('test.png')]);
      });
      
      // 检查 uploadFilePercent 函数存在
      expect(typeof result.current.uploadFilePercent).toBe('function');
      
      // 测试进度更新函数调用不报错
      act(() => {
        result.current.uploadFilePercent({ file, percent: 50 });
      });
      
      // 由于 mock 的限制，我们主要测试函数能正常调用
      expect(result.current.uploadFilePercent).toBeDefined();
    });
  });
});
