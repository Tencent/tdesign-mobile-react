import React, { FC, useContext } from 'react';
import classnames from 'classnames';
import useConfig from '../_util/useConfig';
import { TdTabPanelProps } from './type';
import TabContext from './context';

const TabPanel: FC<TdTabPanelProps> = (props) => {
  const { value, label, disabled } = props;

  const { classPrefix } = useConfig();
  const tabPrefix = classPrefix || '';
  const tabProps = useContext(TabContext);
  const { activeKey, horiRef, vetiRef, onChange } = tabProps;

  const change = () => {
    if (disabled) return;
    onChange && onChange(value);
  };
  return (
    <div
      ref={(ref) => {
        if (activeKey === value) {
          vetiRef.current = ref;
        }
      }}
      className={classnames(
        `${tabPrefix}-tabs__nav-item`,
        activeKey === value && `${tabPrefix}-is-active`,
        disabled && `${tabPrefix}-is-disabled`,
      )}
      key={value}
      onClick={() => change()}
    >
      <span
        ref={(ref) => {
          if (activeKey === value) {
            horiRef.current = ref;
          }
        }}
        className={`${tabPrefix}-tabs__nav-item-btn`}
      >
        {label}
      </span>
    </div>
  );
};

export default TabPanel;
