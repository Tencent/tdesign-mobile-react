export enum ToastThemeListEnum {
  success = 'success',
  warning = 'warning',
  fail = 'fail',
  loading = 'loading',
}

export enum IconType {
  success = 'check-circle',
  warning = 'error-circle',
  fail = 'close-circle',
  loading = 'loading',
}

export const defaultProps = {
  duration: 2000,
  visible: true,
  content: '',
  icon: false,
};
