import {
  AllValidateResult,
  FieldData,
  FormItemValidateMessage,
  FormInstanceFunctions,
  FormRule,
  NamePath,
  TdFormProps,
  ValidateResultType,
  ValidateTriggerType,
} from './type';

export const enum ValidateStatus {
  TO_BE_VALIDATED = 'not',
  SUCCESS = 'success',
  FAIL = 'fail',
}

export type ErrorListType =
  | {
      result: false;
      message: string;
      type: 'error' | 'warning';
    }
  | ValidateResultType;

export type SuccessListType =
  | {
      result: true;
      message: string;
      type: 'success';
    }
  | ValidateResultType;

export interface AnalysisValidateResult {
  successList?: SuccessListType[];
  errorList?: ErrorListType[];
  rules: FormRule[];
  resultList: AllValidateResult[];
  allowSetValue: boolean;
}

export interface FormItemInstance {
  name?: NamePath;
  value?: any;
  initialData?: any;
  getValue?: () => any;
  setValue?: (newVal: any) => void;
  setField?: (field: Omit<FieldData, 'name'>) => void;
  validate?: (trigger?: ValidateTriggerType, showErrorMessage?: boolean) => Promise<Record<string, any>>;
  validateOnly?: (trigger?: ValidateTriggerType) => Promise<Record<string, any>>;
  resetField?: (type?: TdFormProps['resetType']) => void;
  setValidateMessage?: (message: FormItemValidateMessage[]) => void;
  getValidateMessage?: FormInstanceFunctions['getValidateMessage'];
  resetValidate?: () => void;
}
