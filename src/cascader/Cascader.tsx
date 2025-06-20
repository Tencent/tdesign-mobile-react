import { useDeepCompareEffect } from 'ahooks';
import classNames from 'classnames';
import last from 'lodash-es/last';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { CloseIcon, ChevronRightIcon } from 'tdesign-icons-react';
import useDefault from '../_util/useDefault';
import { Popup } from '../popup';
import { RadioGroup } from '../radio';
import Tabs from '../tabs';
import { StyledProps, TNode, TreeOptionData } from '../common';
import { usePrefixClass } from '../hooks/useClass';
import useDefaultProps from '../hooks/useDefaultProps';
import parseTNode from '../_util/parseTNode';
import { cascaderDefaultProps } from './defaultProps';
import { TdCascaderProps } from './type';

export interface CascaderProps extends TdCascaderProps, StyledProps {}

const Cascader: React.FC<CascaderProps> = (props) => {
  const cascaderClass = usePrefixClass('cascader');

  const {
    className,
    style,
    value,
    defaultValue,
    visible,
    title,
    placeholder,
    theme,
    subTitles,
    options: inputOptions,
    keys,
    checkStrictly,
    closeBtn,
    onChange,
    onClose,
    onPick,
  } = useDefaultProps<CascaderProps>(props, cascaderDefaultProps);

  const [internalValue, setInternalValue] = useDefault(value, defaultValue, onChange);
  const [internalVisible, setInternalVisible] = useDefault(visible, false, () => ({}));

  const [internalSelectedValues, setInternalSelectedValues] = useState<CascaderProps['value'][]>([]);

  // 根据 inputOptions 和 key 重新构建 options
  const options = useMemo(() => {
    const { label = 'label', value = 'value', children = 'children' } = keys || {};

    const convert = (options: TreeOptionData[]) =>
      options.map((item) => ({
        label: item[label],
        value: item[value],
        children: Array.isArray(item[children]) ? convert(item[children]) : false,
      }));

    return convert(inputOptions);
  }, [inputOptions, keys]);

  const getOptionsList = useCallback((options: TreeOptionData[], internalSelectedValues: CascaderProps['value'][]) => {
    const optionsList: TreeOptionData[][] = [options];

    for (const value of internalSelectedValues) {
      const lastOptions = last(optionsList);
      const next = lastOptions.find((item) => item.value === value);
      if (!next || !Array.isArray(next.children)) {
        break;
      }
      optionsList.push(next.children);
    }

    return optionsList;
  }, []);

  const optionsList = useMemo(
    () => getOptionsList(options, internalSelectedValues),
    [getOptionsList, options, internalSelectedValues],
  );

  const [stepIndex, setStepIndex] = useState(0);

  const labelList = useMemo(() => {
    const labelList: {
      label: TNode;
      isPlaceholder: boolean;
    }[] = [];

    optionsList.forEach((options, index) => {
      const value = internalSelectedValues[index];
      const target = options.find((item) => item.value === value);
      if (target) {
        labelList.push({
          label: target.label,
          isPlaceholder: false,
        });
        return;
      }

      labelList.push({
        label: placeholder,
        isPlaceholder: true,
      });
    });

    return labelList;
  }, [optionsList, internalSelectedValues, placeholder]);

  const selectedValuesByInterValue = useMemo(() => {
    /**
     * checkStrictly true 从外到内 匹配上就挺 返回整个链路上的value
     * checkStrictly false 最后一级的 value 匹配时，返回整个链路上的value
     */
    const findValues = (options: TreeOptionData[]): CascaderProps['value'][] => {
      for (const item of options) {
        if (checkStrictly && item.value === internalValue) {
          return [item.value];
        }

        const isLast = !(Array.isArray(item.children) && item.children.length);
        if (isLast) {
          if (item.value === internalValue) {
            return [item.value];
          }
          continue;
        }
        const targetValue = findValues(item.children as TreeOptionData[]);
        if (targetValue.length) {
          return [item.value, ...targetValue];
        }
      }
      return [];
    };

    return findValues(options);
  }, [options, internalValue, checkStrictly]);

  // 当 selectedValuesByInterValue 深度变化 的时候再控制 selectedValues
  useDeepCompareEffect(() => {
    setInternalSelectedValues(selectedValuesByInterValue);
    setStepIndex(selectedValuesByInterValue.length);
  }, [selectedValuesByInterValue]);

  useEffect(() => {
    const reviseStepIndex = Math.max(Math.min(stepIndex, optionsList.length - 1), 0);
    if (reviseStepIndex !== stepIndex) {
      setStepIndex(reviseStepIndex);
    }
  }, [optionsList, stepIndex]);

  // 结束了
  const onFinish = useCallback(
    (selectedValues: CascaderProps['value'][]) => {
      const selectedOptions = [...optionsList].slice(0, selectedValues.length).map((options, index) => {
        const target = options.find((item) => item.value === selectedValues[index]);
        const { label = 'label', value = 'value' } = keys || {};
        return {
          [label]: target?.label || '',
          [value]: target?.value || '',
        };
      });
      setInternalValue(last(selectedValues), selectedOptions as any);
      onClose?.('finish');
    },
    [onClose, optionsList, setInternalValue, keys],
  );

  return (
    <Popup
      visible={internalVisible}
      placement="bottom"
      onVisibleChange={(visible, trigger) => {
        setInternalVisible(visible);
        onClose?.(trigger);
      }}
    >
      <div className={classNames(cascaderClass, className)} style={style}>
        <div className={`${cascaderClass}__title`}>{parseTNode(title)}</div>
        <div
          className={`${cascaderClass}__close-btn`}
          onClick={() => {
            if (checkStrictly) {
              onFinish(internalSelectedValues);
              return;
            }

            setInternalVisible(false);
            onClose?.('close-btn');
          }}
        >
          {closeBtn === true ? <CloseIcon size={24} /> : parseTNode(closeBtn)}
        </div>
        <div className={`${cascaderClass}__content`}>
          {labelList.length ? (
            <div>
              {theme === 'step' ? (
                <div className={`${cascaderClass}__steps`}>
                  {labelList.map((labeItem, index) => (
                    <div
                      key={index}
                      className={`${cascaderClass}__step`}
                      onClick={() => {
                        setStepIndex(index);
                      }}
                    >
                      <div
                        className={classNames(`${cascaderClass}__step-dot`, {
                          [`${cascaderClass}__step-dot--active`]: !labeItem.isPlaceholder,
                          [`${cascaderClass}__step-dot--last`]: index === labelList.length - 1,
                        })}
                      />
                      <div
                        className={classNames(`${cascaderClass}__step-label`, {
                          [`${cascaderClass}__step-label--active`]: index === stepIndex,
                        })}
                      >
                        {parseTNode(labeItem.label)}
                      </div>
                      <ChevronRightIcon size={22} className={`${cascaderClass}__step-arrow`} />
                    </div>
                  ))}
                </div>
              ) : null}
              {theme === 'tab' && internalVisible ? (
                <Tabs
                  list={labelList.map((item, index) => ({
                    label: item.label,
                    value: index,
                  }))}
                  spaceEvenly={false}
                  value={stepIndex}
                  onChange={(value: number) => {
                    setStepIndex(value);
                  }}
                />
              ) : null}
            </div>
          ) : null}
          {subTitles[stepIndex] ? (
            <div className={`${cascaderClass}__options-title`}>{subTitles[stepIndex]}</div>
          ) : null}
          <div
            className={`${cascaderClass}__options-container`}
            style={{
              width: `${optionsList.length}00vw`,
              transform: `translateX(-${stepIndex}00vw)`,
            }}
          >
            {optionsList.map((curOptions, index) => (
              <div className={`${cascaderClass}__options`} key={index}>
                <div className={`${cascaderClass}-radio-group-${index}`}>
                  <RadioGroup
                    placement="right"
                    icon="line"
                    borderless
                    value={internalSelectedValues[index]}
                    options={curOptions}
                    onChange={(value: string | number) => {
                      const selectedValues = [...internalSelectedValues].slice(0, index);
                      selectedValues.push(value);
                      setInternalSelectedValues(selectedValues);

                      setStepIndex(index + 1);

                      onPick?.(value, index);

                      const next = curOptions.find((item) => item.value === value);
                      if (Array.isArray(next?.children)) {
                        return;
                      }

                      onFinish(selectedValues);
                    }}
                  ></RadioGroup>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Popup>
  );
};

Cascader.displayName = 'Cascader';

export default Cascader;
