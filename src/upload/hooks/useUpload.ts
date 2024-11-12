import type { ChangeEvent, MouseEvent } from 'react';
import { useRef, useState } from 'react';
import isString from 'lodash/isString';
import isFunction from 'lodash/isFunction';
import type { InnerProgressContext, OnResponseErrorContext } from '../../_common/js/upload/types';
import type {
  SizeLimitObj,
  SuccessContext,
  TdUploadProps,
  UploadChangeContext,
  UploadFile,
  UploadRemoveContext,
} from '../type';
import { getFileList, getFileUrlByFileRaw } from '../../_common/js/upload/utils';
import {
  formatToUploadFile,
  getDisplayFiles,
  getFilesAndErrors,
  upload,
  validateFile,
} from '../../_common/js/upload/main';
import useDefaultProps from '../../hooks/useDefaultProps';
import { uploadDefaultProps } from '../defaultProps';
import useDefault from '../../_util/useDefault';

export type ValidateParams = Parameters<TdUploadProps['onValidate']>[0];

export default function useUpload(props: TdUploadProps) {
  const {
    allowUploadDuplicateFile,
    action,
    disabled,
    autoUpload,
    multiple,
    files,
    defaultFiles,
    max,
    sizeLimit,
    headers,
    method,
    isBatchUpload,
    name,
    uploadAllFilesInOneRequest,
    mockProgressDuration,
    withCredentials,
    useMockProgress,
    data,
    beforeUpload,
    beforeAllFilesUpload,
    format,
    formatRequest,
    formatResponse,
    requestMethod,
    onChange,
    onCancelUpload,
    onFail,
    onOneFileFail,
    onOneFileSuccess,
    onProgress,
    onSuccess,
    onSelectChange,
    onWaitingUploadFilesChange,
    onValidate,
  } = useDefaultProps(props, uploadDefaultProps);
  const [uploadValue, setUploadValue] = useDefault(files, defaultFiles, onChange);
  const [isUploading, setUploading] = useState(false);
  const [toUploadFiles, setToUploadFiles] = useState<UploadFile[]>([]);
  const [sizeOverLimitMessage, setSizeOverLimitMessage] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const xhrReq = useRef<{ files: UploadFile[]; xhrReq: XMLHttpRequest }[]>([]);

  const displayFiles = getDisplayFiles({
    multiple,
    toUploadFiles,
    uploadValue,
    autoUpload,
    isBatchUpload,
  });

  const uploadFilePercent = ({ file, percent }: { file: UploadFile; percent: number }) => {
    const index = toUploadFiles.findIndex((item) => item.raw === file.raw);
    setToUploadFiles((toUploadFiles: UploadFile[]) => {
      const newUploadFiles = [...toUploadFiles];
      newUploadFiles[index] = { ...toUploadFiles[index], percent };
      return newUploadFiles;
    });
  };

  const updateFilesProgress = () => {
    if (!autoUpload) {
      return;
    }
    setToUploadFiles([...toUploadFiles]);
  };

  const onResponseError = (e: OnResponseErrorContext) => {
    if (!e || !e.files || !e.files[0]) {
      return;
    }
    const { response, event, files } = e;
    updateFilesProgress();
    onOneFileFail?.({
      e: event,
      file: files?.[0],
      currentFiles: files,
      failedFiles: files,
      response,
    });
    // 单选或多文件替换，需要清空上一次上传成功的文件
    if (!multiple || isBatchUpload) {
      setUploadValue([], {
        trigger: 'progress-fail',
        e: event,
        file: files[0],
      });
    }
  };

  // 多文件上传场景，单个文件进度
  const onResponseProgress = (p: InnerProgressContext) => {
    const { event, file, files, percent, type, XMLHttpRequest } = p;
    updateFilesProgress();
    onProgress?.({
      e: event,
      currentFiles: files,
      file,
      percent,
      type,
      XMLHttpRequest,
    });
  };

  // 多文件上传场景，单文件上传成功后
  const onResponseSuccess = (p: SuccessContext) => {
    const { e, fileList, response } = p;
    // 只有多个上传请求同时触发时才需 onOneFileSuccess
    if (multiple) {
      updateFilesProgress();
      onOneFileSuccess?.({
        e,
        file: fileList[0],
        response,
      });
    }
  };

  const t = function <T>(pattern: T, ...args: any[]) {
    const [data] = args;
    if (isString(pattern)) {
      if (!data) return pattern;
      const regular = /\{\s*([\w-]+)\s*\}/g;
      return pattern.replace(regular, (match, key) => {
        if (data) {
          return String(data[key]);
        }
        return '';
      });
    }
    if (isFunction(pattern)) {
      // 重要：组件的渲染必须存在参数 h，不能移除
      if (!args.length) {
        return null;
      }
      return pattern(...args);
    }
    return '';
  };

  const getSizeLimitError: (sizeLimitObj: SizeLimitObj) => any = (sizeLimitObj: SizeLimitObj) => {
    const limit = sizeLimitObj;
    return limit.message
      ? t(limit.message, { sizeLimit: limit.size })
      : `${t('', { sizeLimit: limit.size })} ${limit.unit}`;
  };

  const handleNotAutoUpload = (toFiles: UploadFile[]) => {
    const tmpFiles = multiple && isBatchUpload ? uploadValue.concat(toFiles) : toFiles;
    if (!tmpFiles.length) return;
    const list = tmpFiles.map(
      (file) =>
        new Promise((resolve) => {
          getFileUrlByFileRaw(file.raw as File).then((url) => {
            resolve({ ...file, url: file.url || url });
          });
        }),
    );
    Promise.all(list).then((files) => {
      setUploadValue(files as UploadFile[], {
        trigger: 'add',
        index: uploadValue.length,
        file: toFiles[0],
        files: toFiles,
      });
    });
    setToUploadFiles([]);
  };

  const onFileChange = (files: File[]) => {
    if (disabled) {
      return;
    }
    const params = { currentSelectedFiles: formatToUploadFile([...files], props.format) };
    onSelectChange?.([...files], params);
    validateFile({
      uploadValue,
      files: [...files],
      allowUploadDuplicateFile,
      max,
      sizeLimit,
      isBatchUpload,
      autoUpload,
      format,
      beforeUpload,
      beforeAllFilesUpload,
    }).then((args) => {
      // 自定义全文件校验不通过
      if (args.validateResult?.type === 'BEFORE_ALL_FILES_UPLOAD') {
        const params: ValidateParams = { type: 'BEFORE_ALL_FILES_UPLOAD', files: args.files as UploadFile[] };
        onValidate?.(params);
        return;
      }
      // 文件数量校验不通过
      if (args.lengthOverLimit) {
        const params: ValidateParams = { type: 'FILES_OVER_LENGTH_LIMIT', files: args.files as UploadFile[] };
        onValidate?.(params);
        if (!(args.files as UploadFile[]).length) return;
      }
      // 过滤相同的文件名
      if (args.hasSameNameFile) {
        const params: ValidateParams = { type: 'FILTER_FILE_SAME_NAME', files: args.files as UploadFile[] };
        onValidate?.(params);
      }
      // 文件大小校验结果处理（已过滤超出限制的文件）
      if (args.fileValidateList instanceof Array) {
        const { sizeLimitErrors, beforeUploadErrorFiles, toFiles } = getFilesAndErrors(
          args.fileValidateList,
          getSizeLimitError,
        );
        const tmpWaitingFiles = autoUpload ? toFiles : [...toUploadFiles].concat(toFiles);
        setToUploadFiles(tmpWaitingFiles);
        // 文件大小处理
        if (sizeLimitErrors[0]) {
          setSizeOverLimitMessage(sizeLimitErrors[0]?.file?.response?.error);
          onValidate?.({
            type: 'FILE_OVER_SIZE_LIMIT',
            files: sizeLimitErrors.map((t) => t.file),
          });
        } else {
          setSizeOverLimitMessage('');
          // 自定义方法 beforeUpload 拦截的文件
          if (beforeUploadErrorFiles.length) {
            const params: ValidateParams = { type: 'CUSTOM_BEFORE_UPLOAD', files: beforeUploadErrorFiles };
            onValidate?.(params);
          }
        }
        // 如果是自动上传
        if (autoUpload) {
          uploadFiles(tmpWaitingFiles);
        } else {
          handleNotAutoUpload(tmpWaitingFiles);
        }
      }
    });

    // 清空 <input type="file"> 元素的文件，避免出现重复文件无法选择的情况
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  };

  const onNormalFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const fileList = getFileList(e.target.files as FileList);
    onFileChange?.(fileList);
  };

  /**
   * 上传文件。对外暴露方法，修改时需谨慎
   * @param toFiles 本地上传的文件列表
   */
  function uploadFiles(toFiles?: UploadFile[]) {
    const notUploadedFiles = uploadValue.filter((t) => t.status !== 'success');
    const files = autoUpload ? toFiles || toUploadFiles : notUploadedFiles;
    if (!files || !files.length) {
      return;
    }
    setUploading(true);
    xhrReq.current = [];
    upload({
      action,
      headers,
      method,
      name,
      withCredentials,
      uploadedFiles: uploadValue,
      toUploadFiles: files,
      multiple,
      isBatchUpload,
      autoUpload,
      uploadAllFilesInOneRequest,
      useMockProgress,
      data,
      mockProgressDuration,
      requestMethod,
      formatRequest,
      formatResponse,
      onResponseProgress,
      onResponseSuccess,
      onResponseError,
      setXhrObject: (xhr) => {
        if (xhr.files[0]?.raw && xhrReq.current.find((item) => item.files[0]?.raw === xhr.files[0].raw)) {
          return;
        }
        xhrReq.current = xhrReq.current.concat(xhr);
      },
    }).then(
      // 多文件场景时，全量文件完成后
      ({ status, data, list, failedFiles }) => {
        setUploading(false);
        if (status === 'success') {
          if (autoUpload) {
            setUploadValue([...(data?.files as UploadFile[])], {
              trigger: 'add',
              file: (data?.files as UploadFile[])[0],
            });
          }
          xhrReq.current = [];
          onSuccess?.({
            fileList: data?.files,
            currentFiles: files,
            file: files[0],
            // 只有全部请求完成后，才会存在该字段
            // @ts-ignore
            results: list?.map((t) => t.data),
            // 单文件单请求有一个 response，多文件多请求有多个 response
            response: data?.response || list?.map((t) => t.data?.response),
            XMLHttpRequest: data?.XMLHttpRequest,
          });
        } else if (failedFiles?.[0]) {
          onFail?.({
            e: data?.event,
            file: failedFiles[0],
            failedFiles,
            currentFiles: files,
            response: data?.response,
            XMLHttpRequest: data?.XMLHttpRequest,
          });
        }

        // 非自动上传，文件都在 uploadValue，不涉及 toUploadFiles
        if (autoUpload) {
          setToUploadFiles(failedFiles);
          onWaitingUploadFilesChange?.({ files: failedFiles, trigger: 'uploaded' });
        }
      },
    );
  }

  function onInnerRemove(p: UploadRemoveContext) {
    setSizeOverLimitMessage('');
    p.e.stopPropagation?.();
    const changePrams: UploadChangeContext = {
      e: p.e,
      trigger: 'remove',
      index: p.index,
      file: p.file,
    };
    // remove all files for batchUpload
    if (isBatchUpload || !multiple) {
      setToUploadFiles([]);
      onWaitingUploadFilesChange?.({ files: [], trigger: 'remove' });
      setUploadValue([], changePrams);
    } else if (!autoUpload) {
      const curUploadValue = [...uploadValue];
      curUploadValue.splice(p.index, 1);
      setUploadValue([...curUploadValue], changePrams);
    } else {
      // autoUpload 场景下， p.index < uploadValue.length 表示移除已经上传成功的文件；反之表示移除待上传列表文件
      // eslint-disable-next-line
      if (p.index < uploadValue.length) {
        const curUploadValue = [...uploadValue];
        curUploadValue.splice(p.index, 1);
        setUploadValue([...curUploadValue], changePrams);
      } else {
        const curToUploadFiles = [...toUploadFiles];
        curToUploadFiles.splice(p.index - uploadValue.length, 1);
        setToUploadFiles(curToUploadFiles);
        onWaitingUploadFilesChange?.({ files: [...toUploadFiles], trigger: 'remove' });
      }
    }
    props.onRemove?.(p);
  }

  const cancelUpload = (context?: { file?: UploadFile; e?: MouseEvent }) => {
    xhrReq.current?.forEach((item) => {
      item.xhrReq?.abort();
    });
    setUploading(false);

    if (autoUpload) {
      setToUploadFiles((toUploadFiles) => toUploadFiles.map((item) => ({ ...item, status: 'waiting' })));
    } else {
      const newUploadValue = uploadValue.map((item) => {
        if (item.status !== 'success') {
          return { ...item, status: 'waiting' };
        }
        return item;
      });
      setUploadValue(newUploadValue as UploadFile[], { trigger: 'abort' });
    }

    if (context?.file && !autoUpload) {
      onInnerRemove?.({ file: context.file, e: context.e as MouseEvent<HTMLElement>, index: 0 });
    }

    onCancelUpload?.();
  };

  return {
    toUploadFiles,
    uploadValue,
    displayFiles,
    sizeOverLimitMessage,
    isUploading,
    inputRef,
    disabled,
    xhrReq,
    uploadFilePercent,
    uploadFiles,
    onFileChange,
    onNormalFileChange,
    onInnerRemove,
    cancelUpload,
  };
}
