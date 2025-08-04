// 用于判断是否可使用 dom
export const canUseDocument = !!(typeof window !== 'undefined' && window.document && window.document.createElement);

/**
 * 获取当前主题下的token色值
 * --td-bg-color-specialcomponent  背景色token
 * --td-text-color-primary 字体颜色token
 * @returns string
 */
export function getCurrentPrimaryColor(token: string): string {
  if (canUseDocument) {
    const targetElement = document?.documentElement;
    const styles = getComputedStyle(targetElement);
    return styles.getPropertyValue(token).trim();
  }
  return '';
}
