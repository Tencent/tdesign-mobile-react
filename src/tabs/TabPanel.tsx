import React, { FC, useContext } from 'react';
import classnames from 'classnames';
import { ConfigContext } from 'tdesign-mobile-react/config-provider';
import { TdTabPanelProps } from './type';
import TabContext from './context';

const TabPanel: FC<TdTabPanelProps> = (props) => {
  const { value, label, disabled, children } = props;

  console.log('tabpannel', children);

  const { classPrefix } = useContext(ConfigContext);
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
        `${classPrefix}-tabs__nav-item`,
        activeKey === value && `${classPrefix}-is-active`,
        disabled && `${classPrefix}-is-disabled`,
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
        className={`${classPrefix}-tabs__nav-item-btn`}
      >
        {label}
      </span>
    </div>
  );
};

export default TabPanel;
