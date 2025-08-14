import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import classNames from 'classnames';
import {
  cloneDeep,
  get as lodashGet,
  isArray,
  isBoolean,
  isFunction,
  isNumber,
  isString,
  set as lodashSet,
  template as lodashTemplate,
} from 'lodash-es';
import { ChevronRightIcon } from 'tdesign-icons-react';
import { validate } from './formModel';

import {
  AllValidateResult,
  Data,
  FormErrorMessage,
  FormItemValidateMessage,
  FormRule,
  ValidateTriggerType,
  ValueType,
  TdFormItemProps,
} from './type';
import { AnalysisValidateResult, ErrorListType, FormItemContext, SuccessListType } from './const';
import { usePrefixClass } from '../hooks/useClass';
import useConfig from '../hooks/useConfig';
import { useFormContext } from './FormContext';
import { StyledProps } from '../common';

export interface FormItemProps extends TdFormItemProps, StyledProps {
  children?: React.ReactNode;
}

export type FormItemValidateResult<T extends Data = Data> = { [key in keyof T]: boolean | AllValidateResult[] };

const FormItem: React.FC<FormItemProps> = (props) => {
  const { form: globalFormConfig } = useConfig();
  const formClass = usePrefixClass('form');
  const formItemClass = usePrefixClass('form__item');

  // 状态管理
  const formContext = useFormContext();
  const {
    form,
    colon,
    disabled: disabledFromContext,
    requiredMark: requiredMarkFromContext,
    requiredMarkPosition,
    labelAlign: labelAlignFromContext,
    labelWidth: labelWidthFromContext,
    contentAlign: contentAlignFromContext,
    showErrorMessage: showErrorMessageFromContext,
    resetType: resetTypeFromContext,
    rules: rulesFromContext,
    errorMessage,
  } = formContext;

  const {
    arrow = false,
    for: htmlFor = '',
    help,
    label,
    labelAlign = labelAlignFromContext,
    labelWidth = labelWidthFromContext,
    contentAlign = contentAlignFromContext,
    name,
    requiredMark = requiredMarkFromContext,
    rules = [],
    showErrorMessage,
    children,
  } = props;

  const [errorList, setErrorList] = useState<ErrorListType[]>([]);
  const [successList, setSuccessList] = useState<SuccessListType[]>([]);
  const [resetValidating, setResetValidating] = useState(false);
  const [needResetField, setNeedResetField] = useState(false);
  const [freeShowErrorMessage, setFreeShowErrorMessage] = useState<boolean | undefined>(undefined);
  const [formValue, setFormValue] = useState(lodashGet(form?.store, name));
  const initialValue = useRef('');
  const hasInit = useRef(false);
  const contextRef = useRef<FormItemContext | null>(null);
  const rulesMemoStr = useMemo(() => JSON.stringify(rules), [rules]);

  const shouldShowErrorMessage = useMemo(() => {
    if (isBoolean(freeShowErrorMessage)) return freeShowErrorMessage;
    if (isBoolean(showErrorMessage)) return showErrorMessage;
    return showErrorMessageFromContext;
  }, [freeShowErrorMessage, showErrorMessage, showErrorMessageFromContext]);

  // 计算属性
  const extraNode = useMemo(() => {
    const list = errorList;

    if (shouldShowErrorMessage && list[0]?.message) {
      return list[0].message;
    }
    if (successList.length) {
      return successList[0].message;
    }
    return null;
  }, [errorList, successList, shouldShowErrorMessage]);

  const formItemClasses = useMemo(
    () => [
      formItemClass,
      `${formItemClass}--bordered`,
      `${formClass}--${labelAlign || 'right'}`,
      `${formClass}-item__${name}`,
    ],
    [formItemClass, formClass, labelAlign, name],
  );

  const innerRules = useMemo<FormRule[]>(() => {
    if (rules?.length) return rules;
    if (!name) return [];
    const index = `${name}`.lastIndexOf('.') || -1;
    const pRuleName = `${name}`.slice(index + 1);
    return lodashGet(rulesFromContext, name) || lodashGet(rulesFromContext, pRuleName) || [];
  }, [rules, name, rulesFromContext]);

  const needRequiredMark = useMemo(
    () => requiredMark ?? innerRules.filter((rule) => rule.required).length > 0,
    [requiredMark, innerRules],
  );

  const hasLabel = useMemo(() => !!label, [label]);
  const hasColon = useMemo(() => !!(colon && hasLabel), [colon, hasLabel]);
  const labelClass = `${formClass}__label`;

  const labelClasses = classNames([
    labelClass,
    {
      [`${labelClass}--required`]: needRequiredMark,
      [`${labelClass}--required-right`]: needRequiredMark && requiredMarkPosition === 'right',
      [`${labelClass}--colon`]: hasColon,
      [`${labelClass}--top`]: hasLabel && (labelAlign === 'top' || !labelWidth),
      [`${labelClass}--left`]: labelAlign === 'left' && labelWidth,
      [`${labelClass}--right`]: labelAlign === 'right' && labelWidth,
    },
  ]);
  const formItemRootClasses = classNames(
    [
      ...formItemClasses,
      `${formItemClass}--bordered`,
      `${formClass}--${labelAlign || 'right'}`,
      `${formClass}-item__${name}`,
    ],
    { [`${formClass}__item-with-help`]: help },
  );
  const formItemWrapperClasses = classNames([`${formItemClass}-wrap`, `${formItemClass}--${labelAlign}`]);
  const formItemHelperClasses = classNames([`${formItemClass}-help`, `${formClass}__controls--${contentAlign}`]);
  const formItemExtraClasses = classNames([`${formItemClass}-extra`, `${formClass}__controls--${contentAlign}`]);

  const labelStyle = useMemo(() => {
    if (labelWidth && labelAlign !== 'top') {
      return isNumber(labelWidth) ? { width: `${labelWidth}px` } : { width: labelWidth };
    }
    return {};
  }, [labelWidth, labelAlign]);

  const errorClasses = useMemo(() => {
    if (!shouldShowErrorMessage) {
      return '';
    }
    if (!errorList.length) {
      return '';
    }
    const type = errorList[0]?.type || 'error';
    return type === 'error' ? `${formItemClass}--error` : `${formItemClass}--warning`;
  }, [shouldShowErrorMessage, errorList, formItemClass]);

  const contentClasses = classNames([`${formClass}__controls`, errorClasses]);
  const contentSlotClasses = classNames([`${formClass}__controls-content`, `${formClass}__controls--${contentAlign}`]);

  const contentStyle = useMemo(() => {
    let style = {};
    if (labelWidth && labelAlign !== 'top') {
      if (isNumber(labelWidth)) {
        style = { marginLeft: `${labelWidth}px` };
      } else {
        style = { marginLeft: labelWidth };
      }
    }
    return style;
  }, [labelWidth, labelAlign]);

  const errorMessages = useMemo<FormErrorMessage>(
    () => errorMessage ?? globalFormConfig.errorMessage,
    [errorMessage, globalFormConfig],
  );

  // 方法定义
  const resetHandler = useCallback(() => {
    setNeedResetField(false);
    setErrorList([]);
    setSuccessList([]);
  }, []);

  const getEmptyValue = useCallback((): ValueType => {
    const value = lodashGet(form.store, name);
    if (typeof value === 'string') return '';
    if (Array.isArray(value)) return [];
    if (typeof value === 'object') return {};
    return undefined;
  }, [form.store, name]);

  const resetField = useCallback(
    async (resetType: 'initial' | 'empty' | undefined = resetTypeFromContext): Promise<any> => {
      if (!name) {
        return null;
      }
      if (resetType === 'empty') {
        lodashSet(form.store, name, getEmptyValue());
      } else if (resetType === 'initial') {
        lodashSet(form.store, name, initialValue.current);
      }
      if (resetValidating) {
        setNeedResetField(true);
      } else {
        resetHandler();
      }
    },
    [resetTypeFromContext, name, resetValidating, form.store, getEmptyValue, initialValue, resetHandler],
  );

  const analysisValidateResult = useCallback(
    async (trigger: ValidateTriggerType): Promise<AnalysisValidateResult> => {
      const value = lodashGet(form.store, name);
      const result: AnalysisValidateResult = {
        successList: [],
        errorList: [],
        rules: [],
        resultList: [],
        allowSetValue: false,
      };
      result.rules =
        trigger === 'all' ? innerRules : innerRules.filter((item) => (item.trigger || 'change') === trigger);
      if (innerRules.length && !result.rules?.length) {
        return result;
      }
      result.allowSetValue = true;
      result.resultList = await validate(value, result.rules);
      result.errorList = result.resultList
        .filter((item) => item.result !== true)
        .map((item) => {
          const newItem = { ...item };
          Object.keys(newItem).forEach((key) => {
            if (!newItem.message && errorMessages[key]) {
              const compiled = lodashTemplate(errorMessages[key]);
              const labelName = isString(label) ? label : name;
              newItem.message = compiled({
                name: labelName,
                validate: newItem[key],
              });
            }
          });
          return newItem as ErrorListType;
        });
      // 仅有自定义校验方法才会存在 successList
      result.successList = result.resultList.filter(
        (item) => item.result === true && item.message && item.type === 'success',
      ) as SuccessListType[];
      return result;
    },
    [form.store, name, innerRules, errorMessages, label],
  );

  const validateHandler = useCallback(
    async <T extends Data = Data>(
      trigger: ValidateTriggerType,
      showErrorMessage?: boolean,
    ): Promise<FormItemValidateResult<T>> => {
      setResetValidating(true);
      setFreeShowErrorMessage(showErrorMessage);

      const {
        successList: innerSuccessList,
        errorList: innerErrorList,
        resultList,
        allowSetValue,
      } = await analysisValidateResult(trigger);

      if (allowSetValue) {
        setSuccessList(innerSuccessList || []);
        setErrorList(innerErrorList || []);
      }
      // 重置处理
      if (needResetField) {
        resetHandler();
      }
      setResetValidating(false);

      return {
        [`${name}`]: innerErrorList?.length === 0 ? true : resultList,
      } as FormItemValidateResult<T>;
    },
    [analysisValidateResult, needResetField, resetHandler, name],
  );

  const validateOnly = useCallback(
    async <T extends Data>(trigger: ValidateTriggerType): Promise<FormItemValidateResult<T>> => {
      const { errorList: innerErrorList, resultList } = await analysisValidateResult(trigger);
      return {
        [name]: innerErrorList.length === 0 ? true : resultList,
      } as FormItemValidateResult<T>;
    },
    [analysisValidateResult, name],
  );

  const setValidateMessage = useCallback((validateMessage: FormItemValidateMessage[]) => {
    if (!validateMessage && !isArray(validateMessage)) return;
    if (validateMessage.length === 0) {
      setErrorList([]);
    }
    setErrorList(validateMessage.map((item) => ({ ...item, result: false })));
  }, []);

  const handleBlur = useCallback(async () => {
    await validateHandler('blur');
  }, [validateHandler]);

  // 创建 context 对象
  const context: FormItemContext = useMemo(
    () => ({
      name,
      resetHandler,
      resetField,
      validate: validateHandler,
      validateOnly,
      setValidateMessage,
      value: formValue,
    }),
    [name, resetHandler, resetField, validateHandler, validateOnly, setValidateMessage, formValue],
  );

  useEffect(() => {
    if (initialValue.current || !name) {
      return;
    }
    initialValue.current = lodashGet(form.store, name);
  }, [form.store, name]);

  // 生命周期
  useEffect(() => {
    if (formContext?.children) {
      formContext.children.push(context);
    }
    contextRef.current = context;
    return () => {
      if (formContext?.children) {
        formContext.children = formContext.children.filter((ctx) => ctx !== contextRef.current);
      }
    };
  }, [context, form.store, formContext, name]);

  // 监听规则变化
  useEffect(() => {
    if (!hasInit.current) {
      // 仅在用户有交互后进行校验
      if (formValue) {
        hasInit.current = true;
      }
      return;
    }
    validateHandler('change');
    // eslint-disable-next-line
  }, [formValue, name, rulesMemoStr]);

  // 渲染函数
  const renderRightIconContent = () => {
    if (!arrow) {
      return null;
    }
    return <ChevronRightIcon size="24px" style={{ color: 'rgba(0, 0, 0, .4)' }} />;
  };

  const renderLabelContent = (): React.ReactNode => {
    if (Number(labelWidth) === 0) {
      return '';
    }
    if (isFunction(label)) {
      return label();
    }
    return label;
  };

  const renderHelpNode = () => {
    if (!help) {
      return null;
    }

    return <div className={formItemHelperClasses}>{isFunction(help) ? help() : help}</div>;
  };

  const renderExtraNode = () => {
    if (!extraNode) {
      return null;
    }
    return <div className={formItemExtraClasses}>{extraNode}</div>;
  };

  return (
    <div className={formItemRootClasses}>
      <div className={formItemWrapperClasses}>
        <div className={labelClasses} style={labelStyle}>
          <label htmlFor={htmlFor}>{renderLabelContent()}</label>
        </div>
        <div className={contentClasses} style={contentStyle}>
          <div className={contentSlotClasses}>
            {
              // 受控模式下，children 应该是 input 并传递 value/onChange
              React.isValidElement(children)
                ? React.cloneElement(children as React.ReactElement<FormItemContext>, {
                    ...(children as React.ReactElement<FormItemContext>).props,
                    value: formValue,
                    disabled: disabledFromContext,
                    onChange: (value: any, ...args) => {
                      const newValue = cloneDeep(value);
                      lodashSet(form?.store, name, newValue);
                      setFormValue(newValue);
                      (children as React.ReactElement<FormItemContext>).props?.onChange?.call?.(null, value, ...args);
                    },
                    onBlur: (value: any, ...args: any[]) => {
                      handleBlur();
                      (children as React.ReactElement<FormItemContext>).props?.onBlur?.call?.(null, value, ...args);
                    },
                  })
                : children
            }
          </div>
          {renderHelpNode()}
          {renderExtraNode()}
        </div>
      </div>
      {renderRightIconContent()}
    </div>
  );
};

export default FormItem;
