import React, {
  useRef,
  useCallback,
  useContext,
  useMemo,
  useImperativeHandle,
  useEffect,
  useState,
  forwardRef,
} from 'react';
import { get as lodashGet } from 'lodash-es';
import useDefaultProps from 'tdesign-mobile-react/hooks/useDefaultProps';
import cls from 'classnames';
import useConfig from '../hooks/useConfig';
import withNativeProps, { NativeProps } from '../_util/withNativeProps';
import { PickerValue, PickerColumnItem, TdPickerProps } from './type';
import Picker from './picker.class';
import forwardRefWithStatics from '../_util/forwardRefWithStatics';
import PickerContext from './picker-context';

export interface PickerItemProps extends NativeProps {
  renderLabel?: TdPickerProps['renderLabel'];
  onPick?: (value: { value: string; index: number }) => void;
  value?: PickerValue;
  options: PickerColumnItem[];
}

export type PickerItemExposeRef = {
  setIndex: (index: number) => void;
  setValue: (value: number | string | undefined) => void;
  setOptions: () => void;
  setUpdateItems: () => void;
};

const PickerItem = forwardRef<PickerItemExposeRef, PickerItemProps>((props, ref) => {
  const { options, value, renderLabel } = useDefaultProps(props, {});
  const { classPrefix } = useConfig();
  const name = `${classPrefix}-picker-item`;
  const itemClassName = `${name}__item`;

  const pickerProps = useContext(PickerContext);

  const keys = useMemo(() => pickerProps && pickerProps.keys, [pickerProps]);

  console.log('pickerProps', pickerProps, keys);

  const picker = useRef<Picker | null>(null);

  // const [, updateState] = useState(0);

  // const forceUpdate = useCallback(() => updateState((pre) => pre + 1), []);

  function getIndexByValue(value: number | string | undefined) {
    let defaultIndex = 0;
    if (typeof value !== 'undefined') {
      defaultIndex = options.findIndex((option) => value === option.value);
    }

    return Math.max(0, defaultIndex);
  }

  function updatePickerWithNextTick(index: number) {
    if (picker.current) {
      picker.current.updateItems();
      // forceUpdate();

      picker.current.updateIndex(index, { isChange: false });
    }
  }

  function setIndex(index: number) {
    updatePickerWithNextTick(index);
  }

  function setValue(value: number | string | undefined) {
    updatePickerWithNextTick(getIndexByValue(value));
  }

  const setOptions = () => picker.current?.update();
  const setUpdateItems = () => picker.current?.updateItems();

  const rootRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    if (!rootRef.current) return;
    picker.current = new Picker({
      el: rootRef.current,
      defaultIndex: getIndexByValue(value) || 0,
      keys,
      defaultPickerColumns: options,
      onChange: (index: number) => {
        const curItem = props.options[index];
        const value = lodashGet(curItem, keys?.value ?? 'value');
        const changeValue = {
          value,
          index,
        };
        props.onPick(changeValue);
      },
      classPrefix,
    });
    return () => (picker.current = null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    // mounted 后
    if (rootRef.current && picker.current) {
      picker.current.updateOptions(props.options);
      picker.current.updateItems();
    }
  }, [props.options]);

  function renderOptions() {
    if (options.length === 0) return null;

    return options.map((option, index) => {
      const optionItemCls = cls(itemClassName, {
        [`${itemClassName}--disabled`]: lodashGet(option, keys.disabled ?? 'disabled'),
      });
      return (
        <li key={index} className={optionItemCls}>
          {renderLabel ? renderLabel(option) : lodashGet(option, keys?.label ?? 'label')}
        </li>
      );
    });
  }

  useImperativeHandle(ref, () => ({
    setIndex,
    setValue,
    setOptions,
    setUpdateItems,
  }));

  return withNativeProps(
    props,
    <ul ref={rootRef} className={name}>
      {renderOptions()}
    </ul>,
  );
});

PickerItem.displayName = 'PickerItem';

export default PickerItem;
