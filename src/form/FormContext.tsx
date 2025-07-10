import { createContext, useContext } from 'react';
import { TdFormItemProps, TdFormProps } from './type';
import { FormItemContext } from './const';
import { TNode } from '../common';
import { InternalFormInstance } from './hooks/interface';

export interface FormContextType {
  showErrorMessage?: TdFormProps['showErrorMessage'];
  labelWidth?: TdFormProps['labelWidth'];
  labelAlign?: TdFormProps['labelAlign'];
  contentAlign?: TdFormProps['contentAlign'];
  colon?: TdFormProps['colon'];
  requiredMark?: TdFormProps['requiredMark'];
  rules?: TdFormProps['rules'];
  errorMessage?: TdFormProps['errorMessage'];
  resetType?: TdFormProps['resetType'];
  children?: FormItemContext[];
  form?: InternalFormInstance;
  statusIcon?: boolean | TNode<TdFormItemProps>;
  disabled?: TdFormProps['disabled'];
  onFormItemValueChange: (changedValue: Record<string, unknown>) => void;
  requiredMarkPosition?: TdFormProps['requiredMarkPosition'];
}

export const FormContext = createContext<FormContextType | undefined>(undefined);

export const useFormContext = () => {
  const context = useContext(FormContext);
  if (context === undefined) {
    throw new Error('useFormContext must be used within a FormProvider');
  }
  return context;
};
