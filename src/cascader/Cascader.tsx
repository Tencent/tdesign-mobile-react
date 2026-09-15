import { useDeepCompareEffect } from 'ahooks';
import classNames from 'classnames';
import last from 'lodash-es/last';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { CloseIcon, ChevronRightIcon } from 'tdesign-icons-react';
import useDefault from '../_util/useDefault';
import { Popup } from '../popup';
import { RadioGroup } from '../radio';
import Tabs from '../tabs';
import { StyledProps, TreeOptionData } from '../common';
import { usePrefixClass } from '../hooks/useClass';
import useConfig from '../hooks/useConfig';
import useDefaultProps from '../hooks/useDefaultProps';
import parseTNode from '../_util/parseTNode';
import { cascaderDefaultProps } from './defaultProps';
import { TdCascaderProps } from './type';

export interface CascaderProps extends TdCascaderProps, StyledProps {}

const Cascader: React.FC<CascaderProps> = (props) => {
  const cascaderClass = usePrefixClass('cascader');
  const globalConfig = useConfig();

  const {
    className,
    style,
    value,
    defaultValue,
    visible,
    title,
    header,
    middleContent,
    placeholder,
    theme,
    subTitles,
    options: inputOptions,
    overlayProps,
    keys,
    checkStrictly,
    closeBtn,
    load,
    onChange,
    onClose,
    onPick,
  } = useDefaultProps<CascaderProps>(props, cascaderDefaultProps);

  const placeholderText = placeholder ?? globalConfig?.cascader?.placeholder;

  const [internalValue, setInternalValue] = useDefault(value, defaultValue, onChange);
  const [internalVisible, setInternalVisible] = useDefault(visible, false, () => ({}));
  const [internalSelectedValues, setInternalSelectedValues] = useState<CascaderProps['value'][]>([]);
  const [stepIndex, setStepIndex] = useState(0);

  const normalizedKeys = useMemo(
    () => ({
      label: keys?.label ?? 'label',
      value: keys?.value ?? 'value',
      children: keys?.children ?? 'children',
      disabled: keys?.disabled ?? 'disabled',
    }),
    [keys],
  );

  const normalizeOptionsByKeys = useCallback(
    (sourceOptions: TreeOptionData[]) => {
      const convert = (options: TreeOptionData[]): TreeOptionData[] =>
        options.map((item) => {
          const itemChildren = item[normalizedKeys.children];
          return {
            data: item,
            label: item[normalizedKeys.label],
            value: item[normalizedKeys.value],
            children: Array.isArray(itemChildren) ? convert(itemChildren) : itemChildren === true,
            disabled: item[normalizedKeys.disabled],
          };
        });

      return convert(sourceOptions);
    },
    [normalizedKeys],
  );

  const options = useMemo(() => normalizeOptionsByKeys(inputOptions), [inputOptions, normalizeOptionsByKeys]);

  const getOptionsList = useCallback((rootOptions: TreeOptionData[], selectedValues: CascaderProps['value'][]) => {
    const nextOptionsList: TreeOptionData[][] = [rootOptions];

    for (const selectedValue of selectedValues) {
      const nextOptions = last(nextOptionsList)?.find((item) => item.value === selectedValue);
      if (!nextOptions || !Array.isArray(nextOptions.children) || nextOptions.children.length === 0) break;
      nextOptionsList.push(nextOptions.children);
    }

    return nextOptionsList;
  }, []);

  const [optionsList, setOptionsList] = useState<TreeOptionData[][]>([options]);

  const labelList = useMemo(
    () =>
      optionsList.map((currentOptions, index) => {
        const target = currentOptions.find((item) => item.value === internalSelectedValues[index]);
        return target
          ? { label: target.label, isPlaceholder: false }
          : {
              label: placeholderText,
              isPlaceholder: true,
            };
      }),
    [optionsList, internalSelectedValues, placeholderText],
  );

  const selectedValuesByInterValue = useMemo(() => {
    const findValues = (items: TreeOptionData[]): CascaderProps['value'][] => {
      for (const item of items) {
        if (checkStrictly && item.value === internalValue) return [item.value];

        if (!Array.isArray(item.children) || item.children.length === 0) {
          if (item.value === internalValue) return [item.value];
          continue;
        }

        const childValues = findValues(item.children);
        if (childValues.length) return [item.value, ...childValues];
      }
      return [];
    };

    return findValues(options);
  }, [checkStrictly, internalValue, options]);

  useDeepCompareEffect(() => {
    setInternalSelectedValues(selectedValuesByInterValue);
    setOptionsList(getOptionsList(options, selectedValuesByInterValue));
    setStepIndex(selectedValuesByInterValue.length);
  }, [options, selectedValuesByInterValue, getOptionsList]);

  useEffect(() => {
    const revisedStepIndex = Math.max(Math.min(stepIndex, optionsList.length - 1), 0);
    if (revisedStepIndex !== stepIndex) setStepIndex(revisedStepIndex);
  }, [optionsList, stepIndex]);

  const onFinish = useCallback(
    (selectedValues: CascaderProps['value'][]) => {
      const selectedOptions = optionsList.slice(0, selectedValues.length).map((currentOptions, index) => {
        const target = currentOptions.find((item) => item.value === selectedValues[index]);
        return {
          [normalizedKeys.label]: target?.label || '',
          [normalizedKeys.value]: target?.value || '',
        };
      });

      setInternalValue(last(selectedValues), selectedOptions as any);
      setInternalVisible(false);
      onClose?.('finish');
    },
    [onClose, normalizedKeys, optionsList, setInternalValue, setInternalVisible],
  );

  return (
    <Popup
      visible={internalVisible}
      placement="bottom"
      overlayProps={overlayProps}
      onVisibleChange={(nextVisible, trigger) => {
        setInternalVisible(nextVisible);
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
        {parseTNode(header)}
        <div className={`${cascaderClass}__content`}>
          {labelList.length > 0 && (
            <div>
              {theme === 'step' ? (
                <div className={`${cascaderClass}__steps`}>
                  {labelList.map((labelItem, index) => (
                    <div key={index} className={`${cascaderClass}__step`} onClick={() => setStepIndex(index)}>
                      <div
                        className={classNames(`${cascaderClass}__step-dot`, {
                          [`${cascaderClass}__step-dot--active`]: !labelItem.isPlaceholder,
                          [`${cascaderClass}__step-dot--last`]: index === labelList.length - 1,
                        })}
                      />
                      <div
                        className={classNames(`${cascaderClass}__step-label`, {
                          [`${cascaderClass}__step-label--active`]: index === stepIndex,
                        })}
                      >
                        {parseTNode(labelItem.label)}
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
                  onChange={(nextValue: number) => {
                    setStepIndex(nextValue);
                  }}
                />
              ) : null}
            </div>
          )}
          {parseTNode(middleContent)}
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
            {optionsList.map((currentOptions, index) => (
              <div className={`${cascaderClass}__options`} key={index}>
                <div className={`${cascaderClass}-radio-group-${index}`}>
                  <RadioGroup
                    placement="right"
                    icon="line"
                    borderless
                    value={internalSelectedValues[index]}
                    options={currentOptions}
                    onChange={(nextValue: string | number) => {
                      const targetIndex = currentOptions.findIndex((item) => item.value === nextValue);
                      const target = currentOptions[targetIndex];
                      const selectedValues = [...internalSelectedValues.slice(0, index), nextValue];

                      setInternalSelectedValues(selectedValues);
                      onPick?.({
                        value: nextValue,
                        label: String(target?.label || ''),
                        index: targetIndex,
                        level: index,
                      });

                      if (target?.children === true && load) {
                        load({ data: target.data, value: target.value, label: target.label })
                          .then((loadedChildren) => {
                            setOptionsList((prev) => [
                              ...prev.slice(0, index + 1),
                              normalizeOptionsByKeys(loadedChildren),
                            ]);
                            setStepIndex(index + 1);
                          })
                          .catch((error) => {
                            console.error('Load children failed:', error);
                          });
                        return;
                      }

                      if (target && Array.isArray(target.children) && target.children.length > 0) {
                        const children = target.children as TreeOptionData[];
                        setOptionsList((prev) => [...prev.slice(0, index + 1), children]);
                        setStepIndex(index + 1);
                        return;
                      }

                      setOptionsList((prev) => prev.slice(0, index + 1));
                      setStepIndex(index);
                      onFinish(selectedValues);
                    }}
                  />
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
