import { attachMethodsToComponent } from '../_util/attachMethodsToComponent';
import { TdToastProps } from './type';
import * as methods from './methods';

import './style';

export * from './type';

const { fail, success, loading, warning, createToast } = methods.default;
export const Toast = (props: TdToastProps) => createToast(props);

export default attachMethodsToComponent(Toast, {
  fail,
  success,
  loading,
  warning,
});
