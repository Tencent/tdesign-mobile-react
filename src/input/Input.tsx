import React, { FC } from 'react';
import { TdInputProps } from './type';
// import { TElement } from '../common'

export interface InputProps extends TdInputProps, React.InputHTMLAttributes<HTMLInputElement> {}

// const renderIcon = (classPrefix: string, type: 'prefix' | 'suffix', icon: TElement) => {
//   let result: React.ReactNode = null;

//   if (icon) result = icon;

//   if (typeof icon === 'function') result = icon();

//   if (result) {
//     result = <span className={`${classPrefix}-input__${type}`}>{result}</span>;
//   }

//   return result;
// };

const Input: FC<TdInputProps> = () => 
  // const { children } = props;
   (
    <div>
      <span></span>
      <input type="text" className='' />
      <span></span>
    </div>
  )
;

export default Input;
