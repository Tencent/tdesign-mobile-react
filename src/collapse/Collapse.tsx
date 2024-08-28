import React, { forwardRef, memo, useCallback, useMemo, useState } from 'react';
import type { StyledProps } from '../common';
import type { TdCollapseProps, CollapseValue } from './type';
import { collapseDefaultProps } from './defaultProps';
import { CollapseProvider } from './CollapseContext';
import useDefaultProps from '../hooks/useDefaultProps';
import { usePrefixClass } from '../hooks/useClass';
import parseTNode from '../_util/parseTNode';

export interface CollapseProps extends TdCollapseProps, StyledProps {}

const Collapse = forwardRef<HTMLDivElement, CollapseProps>((originProps, ref) => {
  const props = useDefaultProps(originProps, collapseDefaultProps);
  const collapseClass = usePrefixClass('collapse');

  const {
    defaultValue,
    value,
    onChange,
    disabled,
    expandIcon,
    expandMutex,
    defaultExpandAll,
    theme,
    children,
    className,
    style,
  } = props;

  const [activeValue, setActiveValue] = useState<CollapseValue | undefined>(value || defaultValue);

  const onPanelChange = useCallback(
    (panelValue: string | number, args: { e: React.MouseEvent<HTMLDivElement> }) => {
      if (Array.isArray(activeValue)) {
        const hit = activeValue.indexOf(panelValue);

        if (hit > -1) {
          const newVal = activeValue.filter((item) => item !== panelValue);
          setActiveValue(newVal);
          onChange?.(newVal, args);
        } else {
          const newVal = expandMutex ? [panelValue] : activeValue.concat(panelValue);
          setActiveValue(newVal);
          onChange?.(newVal, args);
        }
      }
    },
    [activeValue, onChange, expandMutex],
  );

  const memoProviderValues = useMemo(
    () => ({
      activeValue,
      disabled,
      expandIcon,
      onPanelChange,
      defaultExpandAll,
    }),
    [activeValue, disabled, expandIcon, onPanelChange, defaultExpandAll],
  );

  return (
    <div ref={ref} className={`${collapseClass} ${collapseClass}--${theme} ${className}`} style={style}>
      <CollapseProvider value={memoProviderValues}>{parseTNode(children)}</CollapseProvider>
    </div>
  );
});

export default memo(Collapse);
