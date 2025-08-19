import React, { ForwardedRef, useImperativeHandle, useRef } from 'react';
import classNames from 'classnames';
import { isArray, isBoolean, isEmpty, isFunction } from 'lodash-es';
import noop from '../_util/noop';
import forwardRefWithStatics from '../_util/forwardRefWithStatics';
import {
  Data,
  FormInstanceFunctions,
  FormResetParams,
  FormValidateMessage,
  FormValidateParams,
  FormValidateResult,
  TdFormProps,
  ValidateResultList,
} from './type';
import { FormResetEvent, FormSubmitEvent, StyledProps } from '../common';
import FormItem, { FormItemValidateResult } from './FormItem';
import { formItemDefaultProps } from './defaultProps';
import useDefaultProps from '../hooks/useDefaultProps';
import { usePrefixClass } from '../hooks/useClass';
import useConfig from '../hooks/useConfig';
import useForm from './hooks/useForm';
import { FormContext } from './FormContext';
import { FormItemContext } from './const';

type Result = FormValidateResult<Data>;

export interface FormProps extends TdFormProps, StyledProps {
  children?: React.ReactElement<FormItemContext>[] | React.ReactElement<FormItemContext>;
}

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

const Form = forwardRefWithStatics(
  (props: FormProps, ref: ForwardedRef<FormInstanceFunctions>) => {
    const { form: globalFormConfig } = useConfig();
    const formClass = usePrefixClass('form');

    const {
      style,
      className,
      labelWidth,
      labelAlign,
      colon,
      requiredMark = globalFormConfig.requiredMark,
      requiredMarkPosition = globalFormConfig.requiredMarkPosition,
      scrollToFirstError,
      showErrorMessage,
      resetType,
      rules,
      errorMessage = globalFormConfig.errorMessage,
      preventSubmitDefault,
      disabled,
      children,
      id,
      onSubmit: onSubmitCustom,
      onValidate,
      onReset: onResetCustom,
      onValuesChange = noop,
    } = useDefaultProps(props, formItemDefaultProps);
    const submitParams = useRef<Pick<FormValidateParams, 'showErrorMessage'>>({});
    const resetParams = useRef<FormResetParams<Data>>({});
    const formRef = useRef<HTMLFormElement>(null);
    const [form] = useForm();

    const formContentClass = classNames(formClass, className);

    useImperativeHandle(ref, () => ({
      validate,
      submit,
      reset,
      clearValidate,
      setValidateMessage,
      validateOnly,
    }));

    function needValidate(name: string | number, fields: string[] | undefined) {
      if (!fields || !isArray(fields)) return true;
      return fields.indexOf(`${name}`) !== -1;
    }

    function formatValidateResult<T extends Data>(validateResultList: FormItemValidateResult<T>[]) {
      const result = validateResultList.reduce((r, err) => Object.assign(r || {}, err), {});
      Object.keys(result).forEach((key) => {
        if (result[key] === true) {
          delete result[key];
        }
      });
      return isEmpty(result) ? true : result;
    }

    async function validate(param?: FormValidateParams): Promise<Result> {
      const { fields, trigger = 'all', showErrorMessage } = param || {};
      const list = React.Children.toArray(children)
        .filter(
          (child: React.ReactElement<FormItemContext>) =>
            React.isValidElement(child) &&
            isFunction(child.props.validate) &&
            needValidate(String(child.props.name), fields),
        )
        .map((child: React.ReactElement<FormItemContext>) => {
          if (React.isValidElement(child)) {
            return child.props.validate(trigger, showErrorMessage);
          }
          return null;
        });
      const arr = await Promise.all(list);
      const result = formatValidateResult(arr);
      onValidate?.({
        validateResult: result,
      });
      return result;
    }

    // 校验不通过时，滚动到第一个错误表单
    function scrollTo(selector: string) {
      const doms = formRef.current.getElementsByClassName(selector);
      const dom = doms[0];
      const behavior = scrollToFirstError;
      if (behavior && dom) {
        dom.scrollIntoView({ behavior });
      }
    }

    function getFirstError(result: Result) {
      if (isBoolean(result)) {
        return '';
      }

      const [firstKey] = Object.keys(result);
      if (scrollToFirstError) {
        const tmpClassName = `${formClass}-item__${firstKey}`;
        scrollTo(tmpClassName);
      }
      const resArr = result[firstKey] as ValidateResultList;
      if (!isArray(resArr)) {
        return '';
      }
      return result?.[Object.keys(result)?.[0]]?.[0]?.message || '';
    }

    async function validateOnly(params?: Omit<FormValidateParams, 'showErrorMessage'>) {
      const { fields, trigger = 'all' } = params || {};
      const list = React.Children.toArray(children)
        .filter(
          (child: React.ReactElement<FormItemContext>) =>
            React.isValidElement(child) &&
            isFunction(child.props.validateOnly) &&
            needValidate(String(child.props.name), fields),
        )
        .map((child: React.ReactElement<FormItemContext>) => {
          if (React.isValidElement(child)) {
            return child.props.validateOnly(trigger);
          }
          return null;
        });
      const arr = await Promise.all(list);
      return formatValidateResult(arr);
    }

    function onSubmit(e?: FormSubmitEvent) {
      if (preventSubmitDefault && e) {
        e.preventDefault();
        e.stopPropagation();
      }
      validate(submitParams.current).then((r) => {
        const firstError = getFirstError(r);
        onSubmitCustom?.({
          validateResult: r,
          firstError,
        });
      });
      submitParams.current = undefined;
    }

    async function submit(params?: Pick<FormValidateParams, 'showErrorMessage'>) {
      submitParams.current = params;
      requestSubmit(formRef.current);
    }

    function onReset(e?: FormResetEvent) {
      if (preventSubmitDefault && e) {
        e.preventDefault();
        e.stopPropagation();
      }
      React.Children.toArray(children)
        .filter(
          (child: React.ReactElement<FormItemContext>) =>
            React.isValidElement(child) &&
            isFunction(child.props.resetField) &&
            needValidate(String(child.props.name), resetParams.current?.fields as string[]),
        )
        .forEach((child: React.ReactElement<FormItemContext>) => {
          if (React.isValidElement(child)) {
            child.props.resetField(resetParams.current?.type);
          }
        });
      resetParams.current = undefined;
      onResetCustom?.({ e });
    }

    function reset<FormData extends Data>(params?: FormResetParams<FormData>) {
      (resetParams.current as any) = params;
      formRef.current.reset();
    }

    function clearValidate(fields?: Array<string>) {
      React.Children.toArray(children).forEach((child: React.ReactElement<FormItemContext>) => {
        if (
          React.isValidElement(child) &&
          isFunction(child.props.resetHandler) &&
          needValidate(String(child.props.name), fields)
        ) {
          child.props.resetHandler();
        }
      });
    }

    function setValidateMessage(validateMessage: FormValidateMessage<FormData>) {
      const keys = Object.keys(validateMessage);
      if (!keys.length) return;
      const list = React.Children.toArray(children)
        .filter(
          (child: React.ReactElement<FormItemContext>) =>
            React.isValidElement(child) &&
            isFunction(child.props.setValidateMessage) &&
            keys.includes(`${child.props.name}`),
        )
        .map((child: React.ReactElement<FormItemContext>) => {
          if (React.isValidElement(child)) {
            return child.props.setValidateMessage(validateMessage[`${child.props.name}`]);
          }
          return null;
        });
      Promise.all(list);
    }

    function onFormItemValueChange(changedValue: Record<string, unknown>) {
      const allFields = formRef.current.getFieldsValue(true);
      onValuesChange(changedValue, allFields);
    }

    return (
      <FormContext.Provider
        value={{
          disabled,
          form,
          labelWidth,
          labelAlign,
          colon,
          requiredMark,
          requiredMarkPosition,
          errorMessage,
          showErrorMessage,
          resetType,
          rules,
          onFormItemValueChange,
        }}
      >
        <form
          ref={formRef}
          id={id}
          style={style}
          className={formContentClass}
          onSubmit={(e) => onSubmit(e)}
          onReset={(e) => onReset(e)}
        >
          {children}
        </form>
      </FormContext.Provider>
    );
  },
  { FormItem },
);
export default Form;
