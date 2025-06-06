import type { FC } from 'react';
import React, { createContext, forwardRef, useImperativeHandle, useRef } from 'react';
import { isArray, isBoolean, isEmpty } from 'lodash-es';
import { FormItemValidateResult } from './FormItem';
import { usePrefixClass } from '../hooks/useClass';
import { formDefaultProps } from './defaultProps';
import type { FormSubmitEvent, StyledProps } from '../common';
import type {
  Data,
  FormResetParams,
  FormValidateMessage,
  FormValidateParams,
  FormValidateResult,
  TdFormProps,
  ValidateResultList,
} from './type';
import useDefaultProps from '../hooks/useDefaultProps';
import {
  getNeedResetFields,
  getNeedValidateChildren,
  getResetHandlerChildren,
  getUpdatePromisesChildren,
} from './helper';

type Result<TData extends Data> = FormValidateResult<TData>;

export interface FormDisabledContextType {
  disabled?: boolean;
}

export interface FormItemContextMembers {
  name: string | number;
  validate: (trigger: string, showErrorMessage?: boolean) => Promise<FormItemValidateResult<any>>;
  validateOnly: (trigger: string) => Promise<FormItemValidateResult<any>>;
  resetField: (type?: string | undefined) => void;
  resetHandler: () => void;
  setValidateMessage: (messages: FormValidateMessage<any>[string]) => void; // Assuming message for a single field
}

export interface FormContextType {
  // Props passed down
  showErrorMessage?: boolean;
  labelWidth?: TdFormProps['labelWidth'];
  labelAlign?: TdFormProps['labelAlign'];
  contentAlign?: TdFormProps['contentAlign'];
  colon?: boolean;
  requiredMark?: boolean;
  rules?: TdFormProps['rules'];
  errorMessage?: TdFormProps['errorMessage']; // This seems to be a prop for global error messages
  resetType?: TdFormProps['resetType'];
}

// --- Form Component ---
export interface FormExposedMethods {
  validate: (param?: FormValidateParams) => Promise<Result<any>>;
  submit: (params?: Pick<FormValidateParams, 'showErrorMessage'>) => Promise<void>;
  reset: <FormData extends Data>(params?: FormResetParams<FormData>) => void;
  clearValidate: (fields?: Array<string>) => void;
  setValidateMessage: (validateMessage: FormValidateMessage<Data>) => void;
  validateOnly: (params?: Omit<FormValidateParams, 'showErrorMessage'>) => Promise<Result<any>>;
}

export interface FormProps extends TdFormProps, StyledProps {}

export const FormDisabledContext = createContext<FormDisabledContextType | undefined>(undefined);
export const FormContext = createContext<FormContextType | undefined>(undefined);
export const requestSubmit = (target: HTMLFormElement) => {
  if (!(target instanceof HTMLFormElement)) {
    throw new Error('target must be HTMLFormElement');
  }
  const submitter = document.createElement('input');
  submitter.type = 'submit';
  submitter.hidden = true;
  target.appendChild(submitter);
  submitter.click();
  target.removeChild(submitter);
};

const Form: FC<FormProps> = forwardRef<FormExposedMethods, FormProps>((props, ref) => {
  const {
    colon,
    children,
    contentAlign,
    disabled,
    errorMessage,
    labelWidth,
    labelAlign,
    preventSubmitDefault,
    requiredMark,
    rules,
    resetType,
    showErrorMessage,
    scrollToFirstError,
    onReset,
    onSubmit,
    onValidate,
  } = useDefaultProps(props, formDefaultProps);
  const formRef = useRef<HTMLFormElement>(null);
  const submitParamsRef = useRef<Pick<FormValidateParams, 'showErrorMessage'>>();
  const resetParamsRef = useRef<FormResetParams<Data>>();
  const rootClassName = usePrefixClass('form');
  const formDisabledContextValue: FormDisabledContextType = {
    disabled,
  };
  const formContextValue: FormContextType = {
    showErrorMessage,
    labelWidth,
    labelAlign,
    contentAlign,
    colon,
    requiredMark,
    rules,
    errorMessage,
    resetType,
  };

  useImperativeHandle(ref, () => ({
    validate,
    submit,
    reset,
    clearValidate,
    setValidateMessage,
    validateOnly,
  }));

  function scrollTo(selector: string) {
    if (!formRef.current) {
      return;
    }
    const elements = formRef.current.getElementsByClassName(selector);
    if (!elements || !elements.length) {
      return;
    }
    const dom = elements[0];
    const behavior = scrollToFirstError;
    if (behavior && dom) {
      dom.scrollIntoView({ behavior: typeof behavior === 'string' ? (behavior as ScrollBehavior) : 'auto' });
    }
  }

  function getFirstError(result: Result<any>) {
    if (isBoolean(result)) {
      return '';
    }
    const [firstKey] = Object.keys(result);
    if (!firstKey) {
      return '';
    }
    if (scrollToFirstError) {
      const tmpClassName = `${rootClassName}-item__${firstKey}`;
      scrollTo(tmpClassName);
    }
    const resArr = result[firstKey] as ValidateResultList;
    if (!isArray(resArr) || !resArr.length) {
      return '';
    }
    return resArr[0]?.message || '';
  }

  function formatValidateResult<T extends Data>(validateResultList: FormItemValidateResult<T>[]) {
    const result = validateResultList.reduce((r, err) => Object.assign(r || {}, err), {});
    Object.keys(result).forEach((key) => {
      if (result[key] === true || (isArray(result[key]) && result[key].length === 0)) {
        // Adjusted for empty array meaning success
        delete result[key];
      }
    });
    return isEmpty(result) ? true : result;
  }

  async function submit(params?: Pick<FormValidateParams, 'showErrorMessage'>) {
    submitParamsRef.current = params;
    if (formRef.current) {
      requestSubmit(formRef.current);
    }
  }

  async function validate(param?: FormValidateParams): Promise<Result<any>> {
    const { fields, trigger = 'all', showErrorMessage: paramShowErrorMsg } = param || {};
    const needValidateChildren = getNeedValidateChildren(children, fields);
    const list = needValidateChildren.map((child) =>
      child.props.validate(trigger, paramShowErrorMsg ?? formContextValue.showErrorMessage),
    );
    const arr = await Promise.all(list);
    const result = formatValidateResult(arr);
    onValidate?.({ validateResult: result });
    return result;
  }

  async function validateOnly(params?: Omit<FormValidateParams, 'showErrorMessage'>): Promise<Result<any>> {
    const { fields, trigger = 'all' } = params || {};
    const needValidateChildren = getNeedValidateChildren(children, fields);
    const list = needValidateChildren.map((child) => child.props.validateOnly(trigger));
    const arr = await Promise.all(list);
    return formatValidateResult(arr);
  }

  function reset<FormData extends Data>(params?: FormResetParams<FormData>) {
    resetParamsRef.current = params as FormResetParams<Data>;
    formRef.current?.reset();
  }

  function clearValidate(fields?: Array<string>) {
    const resetHandlerChildren = getResetHandlerChildren(children, fields);
    resetHandlerChildren.forEach((child) => {
      child.props.resetHandler();
    });
  }

  async function setValidateMessage(validateMessage: FormValidateMessage<Data>) {
    const keys = Object.keys(validateMessage);
    if (!keys.length) {
      return;
    }
    const validateMessageChildren = getUpdatePromisesChildren(children, keys);
    const updatePromises = validateMessageChildren.map((child) =>
      child.props.setValidateMessage(validateMessage[String(child.props.name)]),
    );
    await Promise.all(updatePromises);
  }

  const handleSubmitInternal = async (e?: FormSubmitEvent) => {
    if (preventSubmitDefault && e) {
      e.preventDefault();
    }
    const res = await validate(submitParamsRef.current);
    const firstError = getFirstError(res);
    onSubmit?.({ validateResult: res, firstError, e });
    submitParamsRef.current = undefined;
  };

  const handleResetInternal = async (e?: React.FormEvent<HTMLFormElement>) => {
    if (preventSubmitDefault && e) {
      e.preventDefault();
    }
    const needResetFormItems = getNeedResetFields(children, resetParamsRef.current?.fields as string[]);
    needResetFormItems.forEach((child) => {
      child.props.resetField(resetParamsRef.current?.type);
    });
    resetParamsRef.current = undefined;
    onReset?.({ e });
  };

  return (
    <FormDisabledContext.Provider value={formDisabledContextValue}>
      <FormContext.Provider value={formContextValue}>
        <form ref={formRef} className={rootClassName} onSubmit={handleSubmitInternal} onReset={handleResetInternal}>
          {children}
        </form>
      </FormContext.Provider>
    </FormDisabledContext.Provider>
  );
});

export default Form;
