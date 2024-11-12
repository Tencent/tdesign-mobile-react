import type { MouseEvent } from 'react';
import React from 'react';
import { AddIcon, CloseCircleIcon, CloseIcon, LoadingIcon } from 'tdesign-icons-react';
import type { TdUploadProps, UploadFile } from './type';
import type { StyledProps } from '../common';
import Image from '../image';
import useUpload from './hooks/useUpload';
import useDefaultProps from '../hooks/useDefaultProps';
import { usePrefixClass } from '../hooks/useClass';
import useConfig from '../hooks/useConfig';
import { uploadDefaultProps } from './defaultProps';
import parseTNode from '../_util/parseTNode';

export interface UploadProps extends TdUploadProps, StyledProps {}

const Upload: React.FC<UploadProps> = (props) => {
  const rootClassName = usePrefixClass('upload');
  const { globalConfig } = useConfig();
  const { onPreview, onClickUpload, addContent, accept, children, files, max, multiple, imageProps } = useDefaultProps(
    props,
    uploadDefaultProps,
  );
  const { displayFiles, inputRef, disabled, onNormalFileChange, onInnerRemove } = useUpload(props);
  const uploadGlobalConfig = globalConfig.upload;

  const handlePreview = (e: MouseEvent, file: UploadFile, index: number) => {
    onPreview?.({
      e: e as MouseEvent<HTMLDivElement>,
      file,
      index,
    });
  };

  const triggerUpload = (e: MouseEvent) => {
    const input = inputRef.current as HTMLInputElement;
    if (disabled) {
      return;
    }
    input.click();
    onClickUpload?.({ e: e as MouseEvent<HTMLDivElement> });
  };

  const renderStatus = (file: UploadFile) => {
    if (file.status !== 'fail' && file.status !== 'progress') {
      return null;
    }
    const renderIcon = () =>
      file.status === 'progress' ? (
        <>
          <LoadingIcon className={`${rootClassName}__progress-loading`} size="24" />
          <div className={`${rootClassName}__progress-text`}>
            {file.percent ? `${file.percent}%` : uploadGlobalConfig.progress.uploadingText}
          </div>
        </>
      ) : (
        <CloseCircleIcon size="24" />
      );
    const renderFailText = () =>
      file.status === 'fail' ? (
        <div className={`${rootClassName}__progress-text`}>{uploadGlobalConfig.progress.failText}</div>
      ) : null;

    return (
      <div className={`${rootClassName}__progress-mask`}>
        {renderIcon()}
        {renderFailText()}
      </div>
    );
  };

  const renderContent = () => {
    const childNode = parseTNode(children);
    const addContentNode = parseTNode(addContent, {}, <AddIcon size="28" />);
    if (max === 0 || (max > 0 && displayFiles.length < max)) {
      if (childNode) {
        return <div onClick={triggerUpload}>{childNode}</div>;
      }
      return (
        <div className={`${rootClassName}__item ${rootClassName}__item--add`} onClick={triggerUpload}>
          <div className={`${rootClassName}__add-icon`}>{addContentNode}</div>
        </div>
      );
    }
  };

  const renderDisplayFiles = () =>
    displayFiles.map((file, index) => (
      <div key={index} className={`${rootClassName}__item`}>
        {file.url ? (
          <div onClick={(e: MouseEvent) => handlePreview(e, file, index)}>
            <Image className={`${rootClassName}__image`} shape="round" {...imageProps} src={file.url} />
          </div>
        ) : null}
        {renderStatus(file)}
        <CloseIcon
          className={`${rootClassName}__delete-btn`}
          onClick={(e: MouseEvent) => onInnerRemove({ e: e as MouseEvent<HTMLDivElement>, file, index })}
        />
      </div>
    ));

  return (
    <div className={`${rootClassName}`}>
      {renderDisplayFiles()}
      {renderContent()}
      <input
        hidden
        ref={inputRef}
        type="file"
        value={files as any}
        multiple={multiple}
        accept={accept}
        onChange={onNormalFileChange}
      />
    </div>
  );
};

export default Upload;
