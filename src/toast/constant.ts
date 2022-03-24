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
  duration: 3000,
  visible: true,
  zIndex: 5000,
  content: '',
  icon: false,
};
