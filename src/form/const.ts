import { InjectionKey } from 'vue';
import { FormItemValidateResult } from './FormItem';
import {
  AllValidateResult,
  Data,
  FormItemValidateMessage,
  FormRule,
  TdFormItemProps,
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
}

export const FormInjectionKey: InjectionKey<{
  showErrorMessage: TdFormProps['showErrorMessage'];
  labelWidth: TdFormProps['labelWidth'];
  labelAlign: TdFormProps['labelAlign'];
  contentAlign: TdFormProps['contentAlign'];
  colon: TdFormProps['colon'];
  requiredMark: TdFormProps['requiredMark'];
  rules: TdFormProps['rules'];
  errorMessage: TdFormProps['errorMessage'];
  resetType: TdFormProps['resetType'];
  children: FormItemContext[];
}> = Symbol('FormProvide');

export const FormItemInjectionKey: InjectionKey<{
  handleBlur: () => Promise<void>;
}> = Symbol('FormItemProvide');
