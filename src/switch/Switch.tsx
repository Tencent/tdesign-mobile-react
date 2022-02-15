import React from 'react';
import { TdSwitchProps } from './type';
import useConfig from '../_util/useConfig';

export interface SwitchProps extends TdSwitchProps {}

const Switch: React.FC<SwitchProps> = ({ children }) => {
  const { classPrefix } = useConfig();

  console.log('classPrefix ===> ', classPrefix);

  return <div>{children}</div>;
};

export default Switch;
