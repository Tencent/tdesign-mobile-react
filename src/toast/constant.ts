export enum ToastThemeListEnum {
  success = 'success',
  error = 'error',
  loading = 'loading',
}

export enum IconType {
  success = 'check-circle',
  error = 'close-circle',
  loading = 'loading',
}

export const defaultProps = {
  duration: 2000,
  visible: true,
  content: '',
  icon: false,
};
