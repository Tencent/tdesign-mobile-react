import React, { ChangeEvent, useCallback, useEffect, useRef } from 'react';
import { AddIcon, CloseIcon, RefreshIcon } from 'tdesign-icons-react';
import classNames from 'classnames';
import {
  ProgressContext,
  RequestMethodResponse,
  SizeLimitObj,
  SizeUnit,
  SizeUnitArray,
  SuccessContext,
  TdUploadProps,
  UploadFile,
} from './type';
// eslint-disable-next-line import/no-relative-packages
import request from '../_common/js/upload/xhr';
import useDefault from '../_util/useDefault';
import { StyledProps } from '../common';
import useConfig from '../hooks/useConfig';
import { TdUploadFile } from '.';
import { urlCreator, removeProperty, removePropertyAtArray, getNewestUidFactory } from './util';

// upload 工具函数
const removeUidProperty = (file: TdUploadFile) => removeProperty(file, 'uid');
const removeUidPropertyAtArray = (fileList: TdUploadFile[]) => removePropertyAtArray(fileList, 'uid');
const getNewestUid = getNewestUidFactory();
export interface UploadProps extends TdUploadProps, StyledProps {
  name?: string;
}

const Upload: React.FC<UploadProps> = (props) => {
  const {
    accept,
    action,
    method,
    name,
    files,
    defaultFiles,
    headers,
    max,
    multiple,
    disabled,
    sizeLimit,
    withCredentials,
    className,
    data,
    beforeUpload,
    format,
    requestMethod,
    onProgress,
    onSuccess,
    onFail,
    onRemove,
  } = props;
  const { classPrefix } = useConfig();
  const [fileList, onChange] = useDefault<Array<TdUploadFile>, any[]>(files, defaultFiles || [], props.onChange);

  const uploadRef = useRef<HTMLInputElement>(null);

  const formatFiles = (files: File[] = []): TdUploadFile[] =>
    files.map((fileRaw) => {
      const file = typeof format === 'function' ? format(fileRaw) : fileRaw;
      const uploadFile: TdUploadFile = {
        raw: fileRaw,
        lastModified: fileRaw.lastModified,
        name: fileRaw.name,
        size: fileRaw.size,
        type: fileRaw.type,
        percent: 0,
        status: 'waiting',
        url: urlCreator()?.createObjectURL(fileRaw),
        ...file,
      };
      return uploadFile;
    });

  const getLimitedFiles = (files: Array<TdUploadFile> = []) => {
    const isSingleMode = !multiple;
    const mergeLen = files.length + fileList.length;
    if (isSingleMode) {
      return files.splice(0, 1);
    }

    // 限制了最大的张数
    if (max > 0) {
      const limitedFiles = mergeLen > max ? files.slice(0, max - mergeLen) : files;
      return fileList.concat(limitedFiles);
    }

    return fileList.concat(files);
  };

  const generateUploadFiles = (files: FileList): TdUploadFile[] => {
    const uploadList = formatFiles(Array.from(files));
    return getLimitedFiles(uploadList);
  };

  const handleSizeLimit = (
    fileSize: number,
    sizeLimit: UploadProps['sizeLimit'],
  ): {
    isExceed: boolean;
    message: string;
  } => {
    const unitArr: SizeUnitArray = ['B', 'KB', 'MB', 'GB'];
    // 各个单位和 B 的关系
    const SIZE_MAP = {
      B: 1,
      KB: 1024,
      MB: 1048576, // 1024 * 1024
      GB: 1073741824, // 1024 * 1024 * 1024
    };
    const sizeLimitObj: SizeLimitObj = typeof sizeLimit === 'number' ? { size: sizeLimit, unit: 'KB' } : sizeLimit;
    // fileSize 的单位为 B
    sizeLimitObj.unit = sizeLimitObj.unit.toUpperCase() as SizeUnit;
    if (!unitArr.includes(sizeLimitObj.unit)) {
      console.warn(`TDesign Upload Warn: \`sizeLimit.unit\` can only be one of ${unitArr.join()}`);
    }
    return {
      isExceed: fileSize <= sizeLimitObj.size * SIZE_MAP[sizeLimitObj.unit],
      message: sizeLimitObj.message,
    };
  };

  const isShowAdd = (): boolean => {
    if (!multiple && fileList.length) return false;
    if (multiple && max && fileList.length === max) return false;
    return true;
  };

  const handleBeforeUpload = useCallback(
    (file: TdUploadFile): Promise<boolean> => {
      if (typeof beforeUpload === 'function') {
        const res = beforeUpload(file);
        if (res instanceof Promise) return res;
        return Promise.resolve(res);
      }
      if (sizeLimit) {
        const { isExceed } = handleSizeLimit(file.size, sizeLimit);
        return Promise.resolve(isExceed);
      }
      return Promise.resolve(true);
    },
    [beforeUpload, sizeLimit],
  );

  const handleProgress = useCallback(
    ({ e, file, percent, type = 'mock' }: ProgressContext) => {
      const newFileList = [...fileList];
      const currentFile = newFileList.find((item) => item.uid === (file as TdUploadFile).uid);
      currentFile.percent = percent;
      onProgress?.({ e, file: removeUidProperty(currentFile), percent, type });
      onChange?.(newFileList, { trigger: 'progress' });
    },
    [fileList, onProgress, onChange],
  );

  const handleSuccess = useCallback(
    ({ e, file, response }: SuccessContext) => {
      const newFileList = [...fileList];
      const currentFile = newFileList.find((item) => item.uid === (file as TdUploadFile).uid);
      currentFile.status = 'success';
      if (response.url) currentFile.url = response.url;
      onSuccess?.({
        e,
        file: removeUidProperty(currentFile),
        fileList: removeUidPropertyAtArray(newFileList),
        response,
      });
      onChange?.(newFileList, { trigger: 'success' });
    },
    [fileList, onSuccess, onChange],
  );

  const handleFail = useCallback(
    (options: { e?: ProgressEvent; file: UploadFile }) => {
      const { e, file } = options;
      const newFileList = [...fileList];
      const currentFile = newFileList.find((item) => item.uid === (file as TdUploadFile).uid);
      currentFile.status = 'fail';
      onFail?.({ e, file: removeUidProperty(currentFile) });
      onChange(newFileList, { trigger: 'fail' });
    },
    [fileList, onFail, onChange],
  );

  const handleRequestMethod = useCallback(
    async (file: TdUploadFile) => {
      if (typeof requestMethod !== 'function') {
        console.error('TDesign Upload Error: `requestMethod` must be a function.');
        return;
      }
      const res: RequestMethodResponse = await requestMethod(removeUidProperty(file));
      // 验证请求结果
      if (!res) {
        console.error('TDesign Upload Error: `requestMethodResponse` is required.');
        return;
      }
      if (!res.status) {
        console.error(
          'TDesign Upload Error: `requestMethodResponse.status` is missing, which value is `success` or `fail`',
        );
        return;
      }
      if (!['success', 'fail'].includes(res.status)) {
        console.error('TDesign Upload Error: `requestMethodResponse.status` must be `success` or `fail`');
        return;
      }
      if (res.status === 'success' && (!res.response || !res.response.url)) {
        console.warn(
          'TDesign Upload Warn: `requestMethodResponse.response.url` is required, when `status` is `success`',
        );
      }
      if (res.status === 'success') {
        handleSuccess({ file, response: res.response });
      }
      if (res.status === 'fail') {
        handleFail({ file });
      }
    },
    [requestMethod, handleSuccess, handleFail],
  );

  const handleUpload = useCallback(
    (uploadFile: TdUploadFile): Promise<void> => {
      const file = { ...uploadFile };
      if (file.status !== 'waiting') return;
      if (!action && !requestMethod) {
        console.error('TDesign Upload Error: action or requestMethod is required.');
        return;
      }
      file.status = 'progress';
      if (requestMethod) {
        return handleRequestMethod(file);
      }
      request({
        action,
        method,
        data,
        file,
        name,
        headers,
        withCredentials,
        onSuccess: handleSuccess,
        onProgress: handleProgress,
        onError: handleFail,
      });
    },
    [
      requestMethod,
      action,
      method,
      data,
      name,
      headers,
      withCredentials,
      handleRequestMethod,
      handleSuccess,
      handleProgress,
      handleFail,
    ],
  );

  const handleUpLoadFiles = useCallback(
    (files: TdUploadFile[]) => {
      files.forEach((file) => {
        handleBeforeUpload(file).then((canUpload) => {
          if (canUpload) {
            // 上传
            handleUpload(file);
          }
        });
      });
    },
    [handleBeforeUpload, handleUpload],
  );

  const handleUploadChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (disabled) return;
    const { files } = event.target;
    const uploadFiles = generateUploadFiles(files);
    onChange?.(uploadFiles, { trigger: 'upload' });
  };

  const handleTriggerUpload = () => {
    if (disabled) return;
    uploadRef?.current.click();
  };

  const handleDeleteFile = (file: TdUploadFile, e) => {
    const newFileList = [...fileList];
    const index = newFileList.findIndex((item) => item.uid === file.uid);
    if (index !== -1) {
      newFileList.splice(index, 1);
    }
    onRemove?.({ index, file: removeUidProperty(file), e });
    onChange?.(newFileList, { trigger: 'delete' });
  };

  const handleReloadFile = (file: TdUploadFile) => {
    const newFileList = [...fileList];
    const currentFile = newFileList.find((item) => item.uid === file.uid);
    currentFile.percent = 0;
    currentFile.status = 'waiting';
    onChange?.(newFileList, { trigger: 'reload' });
  };

  useEffect(() => {
    if (fileList && fileList.length) {
      // 若 fileList 中存在 waiting 状态的文件则触发上传
      const hasWaitingStatus = fileList.some((file) => file.status === 'waiting');
      if (hasWaitingStatus) {
        handleUpLoadFiles(fileList);
      }
    }
  }, [fileList, handleUpLoadFiles]);

  useEffect(() => {
    // 添加 uid
    if (fileList && fileList.length) {
      for (let i = 0; i < fileList.length; i++) {
        if (!fileList[i].uid) {
          fileList[i].uid = getNewestUid();
        }
      }
    }
  }, [fileList]);

  const uploadBaseClassNames = `${classPrefix}-upload`;

  const uploadClassNames = classNames(uploadBaseClassNames, className);

  return (
    <div className={uploadClassNames}>
      <ul className={`${uploadBaseClassNames}__card`}>
        {fileList.map((file, index) => (
          <li key={index} className={`${uploadBaseClassNames}__card-item`}>
            <div className={`${uploadBaseClassNames}__card-content ${uploadBaseClassNames}__card-box`}>
              <span
                key="delete-icon"
                className={`${uploadBaseClassNames}__card-delete-item`}
                onClick={(e) => handleDeleteFile(file, e)}
              >
                <CloseIcon className="close-icon" />
              </span>
              <img src={file.url} className={`${uploadBaseClassNames}__card-image`} alt={file.name} />
              {file.status === 'fail' && (
                <div className={`${uploadBaseClassNames}__card-mask`}>
                  <RefreshIcon key="refresh-icon" size={24} onClick={() => handleReloadFile(file)} />
                </div>
              )}
            </div>
          </li>
        ))}
        {isShowAdd() ? (
          <li className={`${uploadBaseClassNames}__card-item`} onClick={() => handleTriggerUpload()}>
            <div className={`${uploadBaseClassNames}__card-container ${uploadBaseClassNames}__card-box`}>
              <AddIcon />
            </div>
          </li>
        ) : null}
      </ul>
      <input
        ref={uploadRef}
        hidden
        type="file"
        accept={accept}
        multiple={multiple}
        onChange={(event) => handleUploadChange(event)}
      />
    </div>
  );
};

export default Upload;
