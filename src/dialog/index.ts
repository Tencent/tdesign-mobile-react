import './style';
import { attachMethodsToComponent } from 'tdesign-mobile-react/_util/attachMethodsToComponent';
import { alert } from './alert';
import { confirm } from './confirm';
import { Dialog } from './Dialog';
import { show } from './show';

export type { DialogProps } from './Dialog';
export type { DialogAlertProps } from './alert';
export type { DialogConfirmProps } from './confirm';
export * from './type';

export const DialogPlugin = attachMethodsToComponent(show, {
  alert,
  confirm,
});

export default attachMethodsToComponent(Dialog, {
  alert,
  confirm,
});
