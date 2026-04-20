import { FieldData, FormValidateMessage, FormResetParams } from '../type';

export type Store = Record<string, any>;
export type NamePath = string | number | Array<string | number>;

export interface InternalFormInstance {
  isInit?: boolean;
  store?: Store;
  getFieldsValue?: (nameList: string[] | boolean) => Store;
  getFieldValue?: (name: NamePath) => unknown;
  setFieldsValue?: (data: Record<string, unknown>) => void;
  setFields?: (fields: FieldData[]) => void;
  getValidateMessage?: (fields?: Array<string>) => Record<string, any> | void;
  reset?: (params?: FormResetParams<any>) => void;
  submit?: (params?: { showErrorMessage?: boolean }) => void;
  validate?: (params?: any) => Promise<any>;
  validateOnly?: (params?: any) => Promise<any>;
  clearValidate?: (fields?: Array<string>) => void;
  setValidateMessage?: (message: FormValidateMessage<any>) => void;
  getInternalHooks?: (key: string) => any;
}
