import React, { FC } from 'react';
import { TdButtonProps } from './type';

export interface ButtonProps extends TdButtonProps, React.ButtonHTMLAttributes<HTMLButtonElement> {}

const Button: FC<TdButtonProps> = (props) => {
  const { children } = props;
  return <button>{children}</button>;
};

export default Button;
