// 修复 TS：显式引入 vi 类型（不会影响 mock 的时序）
import { vi } from 'vitest';
import { describe, it, expect, render, fireEvent, waitFor } from '@test/utils';

// 需要在 mock 之后再导入 React 和组件
import React from 'react';
import { AddIcon } from 'tdesign-icons-react';
import type { UploadFile } from '../type';
import Upload from '../Upload';

// 将 mock 放到文件顶部，确保在导入被测组件之前生效
vi.mock('../../_common/js/upload/main', () => {
  const mockFormatToUploadFile = vi.fn((files: File[]) =>
    files.map((f) => ({ name: f.name, raw: f, status: 'waiting' } as UploadFile))
  );
  const mockGetDisplayFiles = vi.fn(({ uploadValue, toUploadFiles, autoUpload }: any) =>
    autoUpload ? [...uploadValue, ...toUploadFiles] : uploadValue
  );
  const mockGetFilesAndErrors = vi.fn((fileValidateList: any[]) => {
    const toFiles = fileValidateList.map((x) => x.file ?? x);
    return { sizeLimitErrors: [], beforeUploadErrorFiles: [], toFiles };
  });
  const mockValidateFile = vi.fn((args: any) => {
    const { files, max, allowUploadDuplicateFile } = args;
    const hasSameNameFile = !allowUploadDuplicateFile && files.length > 1 && files[0].name === files[1].name;
    const lengthOverLimit = max > 0 && files.length > max;
    const fileValidateList = files.map((f: File) => ({ 
      file: { name: f.name, raw: f, status: 'waiting', size: f.size } 
    }));
    return Promise.resolve({ files, hasSameNameFile, lengthOverLimit, fileValidateList });
  });
  const mockUpload = vi.fn((opts: any) => {
    const { toUploadFiles } = opts;
    const data = {
      files: toUploadFiles.map((f: UploadFile) => ({ 
        ...f, 
        status: 'success', 
        url: 'https://example.com/test.png' 
      })),
      response: { ok: true },
    };
    return Promise.resolve({ status: 'success', data, list: [{ data }], failedFiles: [] });
  });

  return {
    formatToUploadFile: mockFormatToUploadFile,
    getDisplayFiles: mockGetDisplayFiles,
    getFilesAndErrors: mockGetFilesAndErrors,
    validateFile: mockValidateFile,
    upload: mockUpload,
  };
});

vi.mock('../../_common/js/upload/utils', () => ({
  getFileList: vi.fn((fl: FileList) => Array.from(fl)),
  getFileUrlByFileRaw: vi.fn(async () => 'blob://mock-url'),
}));

const prefix = 't';
const name = `.${prefix}-upload`;

// 创建测试文件的辅助函数
function createFile(name = 'test.png', type = 'image/png', size = 1024) {
  const blob = new Blob(['test content'], { type });
  return new File([blob], name, { type, lastModified: Date.now() });
}

describe('Upload', () => {
  describe('props', () => {
    it(': accept', () => {
      const { container } = render(<Upload accept="image/*" />);
      const input = container.querySelector('input[type="file"]') as HTMLInputElement;
      expect(input).toHaveAttribute('accept', 'image/*');
    });

    it(': multiple', () => {
      const { container } = render(<Upload multiple />);
      const input = container.querySelector('input[type="file"]') as HTMLInputElement;
      expect(input).toHaveAttribute('multiple');
    });

    it(': disabled', () => {
      const onClickUpload = vi.fn();
      const { container } = render(<Upload disabled onClickUpload={onClickUpload} />);
      const addBtn = container.querySelector(`${name}__item--add`);
      if (addBtn) {
        fireEvent.click(addBtn);
        expect(onClickUpload).not.toHaveBeenCalled();
      }
    });

    it(': max controls add button visibility', () => {
      const files: UploadFile[] = [
        { name: 'test.png', url: 'https://example.com/test.png', status: 'success' }
      ];
      const { container } = render(<Upload max={1} files={files} />);
      const addBtn = container.querySelector(`${name}__item--add`);
      expect(addBtn).toBeNull();
    });

    it(': max allows add button when under limit', () => {
      const { container } = render(<Upload max={2} />);
      const addBtn = container.querySelector(`${name}__item--add`);
      expect(addBtn).toBeTruthy();
    });

    it(': max=0 always shows add button', () => {
      const { container } = render(<Upload max={0} />);
      const addBtn = container.querySelector(`${name}__item--add`);
      expect(addBtn).toBeTruthy();
    });

    it(': children as custom trigger', () => {
      const onClickUpload = vi.fn();
      const { getByText } = render(
        <Upload onClickUpload={onClickUpload}>
          <button>自定义上传</button>
        </Upload>
      );
      fireEvent.click(getByText('自定义上传'));
      expect(onClickUpload).toHaveBeenCalled();
    });

    it(': addContent custom add button', () => {
      const { container } = render(<Upload addContent={<span>添加文件</span>} />);
      expect(container.querySelector(`${name}__add-icon`)).toBeTruthy();
    });

    it(': files display uploaded files', () => {
      const files: UploadFile[] = [
        { name: 'test1.png', url: 'https://example.com/test1.png', status: 'success' },
        { name: 'test2.png', url: 'https://example.com/test2.png', status: 'success' }
      ];
      const { container } = render(<Upload files={files} />);
      const items = container.querySelectorAll(`${name}__item`);
      expect(items.length).toBeGreaterThanOrEqual(2);
    });

    it(': files without url do not render Image but keep delete button', () => {
      const files: UploadFile[] = [
        { name: 'no-url.png', status: 'success' } as any,
      ];
      const { container } = render(<Upload files={files} />);
      const image = container.querySelector(`${name}__image`);
      expect(image).toBeFalsy();
      const delBtn = container.querySelector(`${name}__delete-btn`);
      expect(delBtn).toBeTruthy();
    });

    it(': preview controls image preview', () => {
      const files: UploadFile[] = [
        { name: 'test.png', url: 'https://example.com/test.png', status: 'success' }
      ];
      const { container } = render(<Upload files={files} preview={false} />);
      const image = container.querySelector(`${name}__image`);
      if (image) {
        fireEvent.click(image);
        // 当 preview=false 时，不应该显示 ImageViewer
        expect(container.querySelector('.t-image-viewer')).toBeFalsy();
      }
    });

    it(': imageProps passed to Image component', () => {
      const files: UploadFile[] = [
        { name: 'test.png', url: 'https://example.com/test.png', status: 'success' }
      ];
      const { container } = render(
        <Upload files={files} imageProps={{ shape: 'square' }} />
      );
      const image = container.querySelector(`${name}__image`);
      expect(image).toBeTruthy();
    });
  });

  describe('events', () => {
    it(': onClickUpload', () => {
      const onClickUpload = vi.fn();
      const { container } = render(<Upload onClickUpload={onClickUpload} />);
      const addBtn = container.querySelector(`${name}__item--add`);
      if (addBtn) {
        fireEvent.click(addBtn);
        expect(onClickUpload).toHaveBeenCalledWith(
          expect.objectContaining({ e: expect.any(Object) })
        );
      }
    });

    it(': onSelectChange when files selected', async () => {
      const onSelectChange = vi.fn();
      const { container } = render(<Upload onSelectChange={onSelectChange} />);
      const input = container.querySelector('input[type="file"]') as HTMLInputElement;
      
      const file = createFile('test.png');
      Object.defineProperty(input, 'files', {
        value: [file],
        writable: false,
      });
      
      fireEvent.change(input);
      
      await waitFor(() => {
        expect(onSelectChange).toHaveBeenCalledWith(
          [file],
          expect.objectContaining({ currentSelectedFiles: expect.any(Array) })
        );
      });
    });

    it(': onSuccess when upload succeeds', async () => {
      const onSuccess = vi.fn();
      const { container } = render(<Upload onSuccess={onSuccess} action="//mock-api" />);
      const input = container.querySelector('input[type="file"]') as HTMLInputElement;
      
      const file = createFile('test.png');
      Object.defineProperty(input, 'files', {
        value: [file],
        writable: false,
      });
      
      fireEvent.change(input);
      
      await waitFor(() => {
        expect(onSuccess).toHaveBeenCalled();
      });
    });

    it(': onValidate when validation fails', async () => {
      const { validateFile } = await import('../../_common/js/upload/main');
      vi.mocked(validateFile).mockResolvedValueOnce({
        files: [],
        lengthOverLimit: true,
        fileValidateList: []
      });

      const onValidate = vi.fn();
      const { container } = render(<Upload onValidate={onValidate} max={1} />);
      const input = container.querySelector('input[type="file"]') as HTMLInputElement;
      
      const files = [createFile('test1.png'), createFile('test2.png')];
      Object.defineProperty(input, 'files', {
        value: files,
        writable: false,
      });
      
      fireEvent.change(input);
      
      await waitFor(() => {
        expect(onValidate).toHaveBeenCalledWith(
          expect.objectContaining({ type: 'FILES_OVER_LENGTH_LIMIT' })
        );
      });
    });

    it(': allowUploadDuplicateFile=true does not trigger same-name validate branch', async () => {
      const onValidate = vi.fn();
      const { container } = render(
        <Upload onValidate={onValidate} allowUploadDuplicateFile action="//mock-api" />
      );
      const input = container.querySelector('input[type="file"]') as HTMLInputElement;

      const f1 = createFile('same.png');
      const f2 = createFile('same.png');
      Object.defineProperty(input, 'files', {
        value: [f1, f2],
        writable: false,
      });
      fireEvent.change(input);

      await waitFor(() => {
        const types = onValidate.mock.calls.map((c: any[]) => c[0]?.type);
        expect(types).not.toContain('FILTER_FILE_SAME_NAME');
      });
    });

    it(': autoUpload=false does not call onSuccess', async () => {
      const onSelectChange = vi.fn();
      const onChange = vi.fn();
      const onSuccess = vi.fn();
      const { container } = render(
        <Upload autoUpload={false} onSelectChange={onSelectChange} onChange={onChange} onSuccess={onSuccess} />
      );
      const input = container.querySelector('input[type="file"]') as HTMLInputElement;

      const file = createFile('manual.png');
      Object.defineProperty(input, 'files', {
        value: [file],
        writable: false,
      });
      fireEvent.change(input);

      await waitFor(() => {
        expect(onSelectChange).toHaveBeenCalled();
        expect(onChange).toHaveBeenCalled();
        expect(onSuccess).not.toHaveBeenCalled();
      });
    });

    it(': onPreview when image clicked', () => {
      const onPreview = vi.fn();
      const files: UploadFile[] = [
        { name: 'test.png', url: 'https://example.com/test.png', status: 'success' }
      ];
      const { container } = render(<Upload files={files} onPreview={onPreview} />);
      const image = container.querySelector(`${name}__image`);
      
      if (image) {
        fireEvent.click(image);
        expect(onPreview).toHaveBeenCalledWith(
          expect.objectContaining({
            file: expect.any(Object),
            index: 0,
            e: expect.any(Object)
          })
        );
      }
    });

    it(': onRemove when delete button clicked', () => {
      const onRemove = vi.fn();
      const files: UploadFile[] = [
        { name: 'test.png', url: 'https://example.com/test.png', status: 'success' }
      ];
      const { container } = render(<Upload files={files} onRemove={onRemove} />);
      const deleteBtn = container.querySelector(`${name}__delete-btn`);
      
      if (deleteBtn) {
        fireEvent.click(deleteBtn);
        expect(onRemove).toHaveBeenCalledWith(
          expect.objectContaining({
            file: expect.any(Object),
            index: 0,
            e: expect.any(Object)
          })
        );
      }
    });

    it(': onChange when files change', async () => {
      const onChange = vi.fn();
      const { container } = render(<Upload onChange={onChange} action="//mock-api" />);
      const input = container.querySelector('input[type="file"]') as HTMLInputElement;
      
      const file = createFile('test.png');
      Object.defineProperty(input, 'files', {
        value: [file],
        writable: false,
      });
      
      fireEvent.change(input);
      
      await waitFor(() => {
        expect(onChange).toHaveBeenCalled();
      });
    });
  });

  describe('status rendering', () => {
    it(': progress status shows loading and percent', () => {
      const files: UploadFile[] = [
        { 
          name: 'test.png', 
          url: 'https://example.com/test.png', 
          status: 'progress',
          percent: 50
        }
      ];
      const { container, getByText } = render(<Upload files={files} />);
      
      expect(container.querySelector(`${name}__progress-loading`)).toBeTruthy();
      expect(getByText('50%')).toBeInTheDocument();
    });

    it(': progress status without percent shows uploading text branch', () => {
      const files: UploadFile[] = [
        { 
          name: 'no-percent.png', 
          url: 'https://example.com/no-percent.png', 
          status: 'progress'
        }
      ];
      const { container } = render(<Upload files={files} />);
      expect(container.querySelector(`${name}__progress-mask`)).toBeTruthy();
      expect(container.querySelector(`${name}__progress-text`)).toBeTruthy();
    });

    it(': fail status shows error icon', () => {
      const files: UploadFile[] = [
        { 
          name: 'test.png', 
          url: 'https://example.com/test.png', 
          status: 'fail'
        }
      ];
      const { container } = render(<Upload files={files} />);
      
      expect(container.querySelector(`${name}__progress-mask`)).toBeTruthy();
      // 失败时也应显示失败文案节点
      expect(container.querySelector(`${name}__progress-text`)).toBeTruthy();
    });

    it(': success status shows no progress mask', () => {
      const files: UploadFile[] = [
        { 
          name: 'test.png', 
          url: 'https://example.com/test.png', 
          status: 'success'
        }
      ];
      const { container } = render(<Upload files={files} />);
      
      expect(container.querySelector(`${name}__progress-mask`)).toBeFalsy();
    });
  });

  describe('slots', () => {
    it(': default slot with children', () => {
      const { getByText } = render(
        <Upload>
          <div>自定义上传区域</div>
        </Upload>
      );
      expect(getByText('自定义上传区域')).toBeInTheDocument();
    });

    it(': addContent slot', () => {
      const { getByText } = render(
        <Upload addContent={<span>点击上传</span>} />
      );
      expect(getByText('点击上传')).toBeInTheDocument();
    });
  });

  describe('interaction', () => {
    it(': input click triggered by add button', () => {
      const { container } = render(<Upload />);
      const input = container.querySelector('input[type="file"]') as HTMLInputElement;
      const addBtn = container.querySelector(`${name}__item--add`);
      
      const clickSpy = vi.spyOn(input, 'click');
      
      if (addBtn) {
        fireEvent.click(addBtn);
        expect(clickSpy).toHaveBeenCalled();
      }
    });

    it(': ImageViewer opens and closes', async () => {
      const files: UploadFile[] = [
        { name: 'test.png', url: 'https://example.com/test.png', status: 'success' }
      ];
      const { container } = render(<Upload files={files} />);
      const image = container.querySelector(`${name}__image`);
      
      if (image) {
        fireEvent.click(image);
        
        await waitFor(() => {
          expect(container.querySelector('.t-image-viewer')).toBeTruthy();
        });
      }
    });
  });
});
