// eslint-disable-next-line @typescript-eslint/no-empty-function
export const noop = () => {};

export enum MessageThemeListEnum {
  info = 'info',
  success = 'success',
  warning = 'warning',
  error = 'error',
}

export enum IconType {
  info = 'error-circle-filled',
  success = 'check-circle-filled',
  warning = 'error-circle-filled',
  error = 'error-circle-filled',
}

export const defaultProps = {
  duration: 3000,
  theme: MessageThemeListEnum.info,
  visible: true,
  zIndex: 5000,
  content: '',
  icon: false,
};
