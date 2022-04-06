import React, { useMemo } from 'react';
import classNames from 'classnames';
import { TdCollapseProps } from './type';
import { StyledProps } from '../common';
import useDefault from '../_util/useDefault';
import useConfig from '../_util/useConfig';
import noop from '../_util/noop';
import CollapsePanel, { CollapsePanelProps } from './CollapsePanel';

export interface CollapseProps extends TdCollapseProps, StyledProps {
  children?: React.ReactNode;
}

export const CollapseContext = React.createContext(null);

export interface CollapsePanelContextValue {
  inject: (props: CollapsePanelProps) => CollapsePanelProps;
}

const Collapse = function(props: CollapseProps) {
  const { classPrefix } = useConfig();
  const { 
    className,
    style,
    disabled,
    defaultExpandAll,
    expandIcon,
    expandMutex,
    value: propsValue,
    defaultValue,
    onChange: propsOnChange = noop,
    children,
   } = props; 
  const collapseClassNames = classNames(
    className,
    `${classPrefix}-collapse`,
  );  

  const propsValueArr = useMemo(() => {
    if (typeof propsValue === 'string' || typeof propsValue === 'number') {
      return [propsValue];
    }
    if (Array.isArray(propsValue)) {
      return [...propsValue]
    }
  }, [propsValue]);

  let defaultValueArr = [];
  if (typeof defaultValue === 'string' || typeof defaultValue === 'number') {
    defaultValueArr = [defaultValue];
  }
  if (Array.isArray(defaultValue)) {
    defaultValueArr = [...defaultValue];
  }

  const [value, setValue] = useDefault(propsValueArr, defaultValueArr, noop);

  const valueSet = useMemo(() => {
    if (!Array.isArray(value)) return new Set([]);
    return new Set([].concat(value));
  }, [value]);

  const context: CollapsePanelContextValue = {
    inject: (collapsePanelProps) => {
      const { 
        disabled: innerDisabled,
        expandIcon: innerExpandedIcon, 
        value: innerValue,
      } = collapsePanelProps;

      const expanded = valueSet.has(innerValue) || defaultExpandAll;
      const returnDisabled = typeof innerDisabled === 'undefined' ? disabled : innerDisabled;

      return {
        ...collapsePanelProps,
        disabled: returnDisabled,
        expandIcon: typeof innerExpandedIcon === 'undefined' ? expandIcon : innerExpandedIcon,
        isControlled: typeof propsValue !== 'undefined',
        expanded,
        onChange(v) {
          if (value.includes(v)) {
            setValue([...value.filter(item => item !== v)]);
          } else {
            if (expandMutex) {
              setValue([v]);
              return;
            }
            setValue([...value, v]);
          }
          propsOnChange(v);
        }
      };
    },
  };
  return (
    <div className={collapseClassNames} style={style}>
      <CollapseContext.Provider value={context}>
        {React.Children.map(children, (child, index) => {
          if (!React.isValidElement(child)) {
            return child;
          }
          return React.cloneElement(child, {value: index})
        })}
      </CollapseContext.Provider>
    </div>
  );
};

Collapse.Panel = CollapsePanel;

export default Collapse;
