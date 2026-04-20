import React, { ForwardedRef, useEffect, useImperativeHandle, useRef, useMemo } from 'react';
import classNames from 'classnames';
import { get, cloneDeep, merge, set, isFunction, isArray, isBoolean, isEmpty, isObject } from 'lodash-es';
import noop from '../_util/noop';
import forwardRefWithStatics from '../_util/forwardRefWithStatics';
import {
  FormInstanceFunctions,
  FormResetParams,
  FormValidateMessage,
  FormValidateParams,
  FormValidateResult,
  TdFormProps,
  NamePath,
  FieldData,
} from './type';
import { FormResetEvent, FormSubmitEvent, StyledProps } from '../common';
import FormItem from './FormItem';
import { formItemDefaultProps } from './defaultProps';
import useDefaultProps from '../hooks/useDefaultProps';
import { usePrefixClass } from '../hooks/useClass';
import useConfig from '../hooks/useConfig';
import useForm, { HOOK_MARK } from './hooks/useForm';
import { FormContext } from './FormContext';
import { FormItemContext } from './const';

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

function needValidate(name: NamePath, fields?: string[]) {
  if (!fields || !Array.isArray(fields)) return true;
  return fields.some((item) => String(item) === String(name));
}

function formatValidateResult(validateResultList: any[]) {
  const result = validateResultList.reduce((r, err) => Object.assign(r || {}, err), {});
  Object.keys(result).forEach((key) => {
    if (result[key] === true) {
      delete result[key];
    }
  });
  return isEmpty(result) ? true : result;
}

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
      requiredMark = globalFormConfig?.requiredMark,
      requiredMarkPosition = globalFormConfig?.requiredMarkPosition,
      scrollToFirstError,
      showErrorMessage,
      resetType,
      rules,
      errorMessage = globalFormConfig?.errorMessage,
      preventSubmitDefault,
      disabled,
      readonly,
      children,
      id,
      onSubmit: onSubmitCustom,
      onValidate,
      onReset: onResetCustom,
      onValuesChange = noop,
    } = useDefaultProps(props, formItemDefaultProps);
    const submitParams = useRef<Pick<FormValidateParams, 'showErrorMessage'>>({});
    const resetParams = useRef<FormResetParams<any>>({});
    const formRef = useRef<HTMLFormElement>(null);
    const formMapRef = useRef(new Map()); // 收集所有包含 name 属性 formItem 实例
    const [form] = useForm();

    const formContentClass = classNames(formClass, className);

    // 获取单个字段值
    function getFieldValue(name: NamePath) {
      if (!name) return null;
      const formItemRef = formMapRef.current.get(String(name));
      if (formItemRef?.current) {
        return formItemRef.current.getValue?.();
      }
      return get(form?.store, name);
    }

    // 获取一组字段名对应的值，当调用 getFieldsValue(true) 时返回所有值
    function getFieldsValue(nameList: string[] | boolean) {
      const fieldsValue: Record<string, any> = {};

      if (nameList === true) {
        // 倒序遍历，嵌套数组子节点先添加，导致外层数据被覆盖
        const entries = Array.from(formMapRef.current.entries());
        for (let i = entries.length - 1; i >= 0; i--) {
          const [name, formItemRef] = entries[i];
          if (formItemRef?.current) {
            const value = formItemRef.current.getValue?.();
            set(fieldsValue, name, value);
          }
        }
        // 合并 store 中的值
        merge(fieldsValue, cloneDeep(form?.store));
      } else {
        if (!Array.isArray(nameList)) {
          console.error('Form', 'The parameter of "getFieldsValue" must be an array');
          return {};
        }
        for (let i = 0; i < nameList.length; i++) {
          const name = nameList[i];
          const formItemRef = formMapRef.current.get(String(name));
          if (formItemRef?.current) {
            const value = formItemRef.current.getValue?.();
            set(fieldsValue, name, value);
          } else {
            const storeValue = get(form?.store, name);
            set(fieldsValue, name, storeValue);
          }
        }
      }
      return cloneDeep(fieldsValue);
    }

    // 递归处理嵌套对象，将叶子节点设置到对应的 FormItem
    function setNestedValue(obj: Record<string, unknown>, prefix = '') {
      Object.keys(obj).forEach((key) => {
        const value = obj[key];
        const fullPath = prefix ? `${prefix}.${key}` : key;

        if (isObject(value) && !Array.isArray(value)) {
          // 递归处理嵌套对象
          setNestedValue(value as Record<string, unknown>, fullPath);
        } else {
          // 叶子节点，尝试设置到 FormItem
          const formItemRef = formMapRef.current.get(fullPath);
          if (formItemRef?.current) {
            formItemRef.current.setValue?.(cloneDeep(value));
          } else if (form?.store) {
            set(form.store, fullPath, value);
          }
        }
      });
    }

    // 设置表单字段值
    function setFieldsValue(fields: Record<string, unknown> = {}) {
      setNestedValue(fields);
    }

    // 设置多组字段状态
    function setFields(fields: FieldData[] = []) {
      if (!Array.isArray(fields)) throw new TypeError('The parameter of "setFields" must be an array');

      fields.forEach((field) => {
        const { name, ...restFields } = field;
        const formItemRef = formMapRef.current.get(String(name));
        formItemRef?.current?.setField?.(restFields);
      });
    }

    function getValidateMessage(fields?: Array<string>) {
      if (typeof fields !== 'undefined' && !isArray(fields)) {
        throw new TypeError('The parameter of "getValidateMessage" must be an array');
      }

      const formItemRefs =
        typeof fields === 'undefined'
          ? [...formMapRef.current.values()]
          : fields.map((name) => formMapRef.current.get(String(name))).filter(Boolean);

      const message: Record<string, any> = {};

      formItemRefs.forEach((formItemRef: any) => {
        const item = formItemRef?.current?.getValidateMessage?.();
        if (isEmpty(item)) return;
        const nameKey = formItemRef?.current?.name;
        const key = Array.isArray(nameKey) ? nameKey.toString() : String(nameKey);
        message[key] = item;
      });

      if (isEmpty(message)) return;

      return message;
    }

    useImperativeHandle(ref, () => ({
      validate,
      submit,
      reset,
      clearValidate: clearValidate as any,
      setValidateMessage: setValidateMessage as any,
      validateOnly,
      currentElement: () => formRef.current!,
      getCurrentElement: () => formRef.current!,
      getFieldValue,
      getFieldsValue: getFieldsValue as any,
      getValidateMessage: getValidateMessage as any,
      setFields,
      setFieldsValue,
    }));

    // form 初始化后清空队列
    useEffect(() => {
      form?.getInternalHooks?.(HOOK_MARK)?.flashQueue?.();
    }, [form]);

    // 使用 useMemo 缓存 context 值
    const formContextValue = useMemo(
      () => ({
        disabled,
        readonly,
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
        formMapRef,
        onFormItemValueChange,
      }),
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [
        disabled,
        readonly,
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
      ],
    );

    async function validate(param?: FormValidateParams) {
      const { fields, trigger = 'all', showErrorMessage } = param || {};
      const list = [...formMapRef.current.values()]
        .filter(
          (formItemRef) =>
            isFunction(formItemRef?.current?.validate) && needValidate(formItemRef?.current?.name, fields),
        )
        .map((formItemRef) => formItemRef?.current?.validate(trigger, showErrorMessage));
      const arr = await Promise.all(list);
      const result = formatValidateResult(arr);
      onValidate?.({
        validateResult: result,
      });
      return result;
    }

    // 校验不通过时，滚动到第一个错误表单
    function scrollTo(selector: string) {
      const doms = formRef.current?.getElementsByClassName(selector);
      const dom = doms?.[0];
      const behavior = scrollToFirstError;
      if (behavior && dom) {
        dom.scrollIntoView({ behavior });
      }
    }

    function getFirstError(result: FormValidateResult<any>) {
      if (isBoolean(result)) {
        return '';
      }

      const keys = Object.keys(result);
      const [firstKey] = keys;
      if (scrollToFirstError && firstKey) {
        const tmpClassName = `${formClass}-item__${firstKey}`;
        scrollTo(tmpClassName);
      }
      const resArr = result[firstKey];
      if (!isArray(resArr)) {
        return '';
      }
      return resArr?.[0]?.message || '';
    }

    async function validateOnly(params?: Omit<FormValidateParams, 'showErrorMessage'>) {
      const { fields, trigger = 'all' } = params || {};
      const list = [...formMapRef.current.values()]
        .filter(
          (formItemRef) =>
            isFunction(formItemRef?.current?.validateOnly) && needValidate(formItemRef?.current?.name, fields),
        )
        .map((formItemRef) => formItemRef?.current?.validateOnly?.(trigger));
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
      submitParams.current = {};
    }

    async function submit(params?: Pick<FormValidateParams, 'showErrorMessage'>) {
      submitParams.current = params || {};
      if (formRef.current) {
        requestSubmit(formRef.current);
      }
    }

    function onReset(e?: FormResetEvent) {
      if (preventSubmitDefault && e) {
        e.preventDefault();
        e.stopPropagation();
      }
      const params = resetParams.current;
      resetParams.current = {};
      [...formMapRef.current.values()].forEach((formItemRef) => {
        if (isFunction(formItemRef?.current?.resetField)) {
          const name = formItemRef?.current?.name;
          if (needValidate(name, params?.fields as string[])) {
            formItemRef?.current?.resetField(params?.type);
          }
        }
      });
      // 重置后清空 store
      if (form?.store) {
        form.store = {};
      }
      onResetCustom?.({ e });
    }

    function reset(params?: FormResetParams<any>) {
      resetParams.current = params || {};
      formRef.current?.reset();
    }

    function clearValidate(fields?: Array<string>) {
      [...formMapRef.current.values()].forEach((formItemRef) => {
        if (isFunction(formItemRef?.current?.resetHandler) && needValidate(formItemRef?.current?.name, fields)) {
          formItemRef?.current?.resetHandler();
        }
      });
    }

    function setValidateMessage(validateMessage: FormValidateMessage<any>) {
      const keys = Object.keys(validateMessage);
      if (!keys.length) return;

      [...formMapRef.current.values()].forEach((formItemRef) => {
        const name = formItemRef?.current?.name;
        if (isFunction(formItemRef?.current?.setValidateMessage) && name) {
          const nameKey = Array.isArray(name) ? name.toString() : String(name);
          if (keys.includes(nameKey)) {
            const msg = validateMessage[nameKey];
            formItemRef?.current?.setValidateMessage(msg);
          }
        }
      });
    }

    function onFormItemValueChange(changedValue: Record<string, unknown>) {
      requestAnimationFrame(() => {
        const allFields = getFieldsValue(true);
        onValuesChange(changedValue, allFields);
      });
    }

    return (
      <FormContext.Provider value={formContextValue}>
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
