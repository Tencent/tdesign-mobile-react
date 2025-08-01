import { FormItemValidateResult } from './FormItem';
import {
  AllValidateResult,
  Data,
  FormItemValidateMessage,
  FormRule,
  TdFormItemProps,
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

export interface FormItemContext {
  name: TdFormItemProps['name'];
  resetHandler: () => void;
  resetField: (resetType?: 'initial' | 'empty') => void;
  validate: <T extends Data = Data>(
    trigger: ValidateTriggerType,
    showErrorMessage?: boolean,
  ) => Promise<FormItemValidateResult<T>>;
  validateOnly: <T = Data>(trigger: ValidateTriggerType) => Promise<FormItemValidateResult<T>>;
  setValidateMessage: (validateMessage: FormItemValidateMessage[]) => void;
  disabled?: boolean;
  onChange?: (value: any, ...args) => void;
  onBlur?: (value: any, ...args) => void;
  value?: any;
}
