import { UploadFile } from './type';

export interface TdUploadFile extends UploadFile {
  // fileList中每个文件的唯一标识
  uid?: string;
}
