import { attachMethodsToComponent } from '../_util/attachMethodsToComponent';
import { TdToastProps } from './type';
import * as methods from './methods';

import './style';

export * from './type';

type ToastApi = {
  /** 展示提示 */
  (options?: Partial<TdToastProps> | string): void;
  /** 展示加载提示 */
  loading: (options?: Partial<TdToastProps> | string) => void;
  /** 展示成功提示 */
  success: (options?: Partial<TdToastProps> | string) => void;
  /** 展示失败提示 */
  error: (options?: Partial<TdToastProps> | string) => void;
  /** 关闭提示 */
  clear: () => void;
};

const { success, loading, error, createToast, clear } = methods.default;
const innerToast = (props: TdToastProps) => createToast(props);

export const ToastPlugin: ToastApi = attachMethodsToComponent(innerToast, {
  success,
  error,
  loading,
  clear,
});

export const Toast = ToastPlugin;
export default ToastPlugin;
