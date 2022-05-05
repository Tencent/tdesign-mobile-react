import { useContext, useMemo } from 'react';
import { ConfigContext } from 'tdesign-mobile-react/config-provider';

export const SIZE_CLASSNAMES = {
  small: `-size-s`,
  medium: `-size-m`,
  large: `-size-l`,
  default: '',
  xs: `-size-xs`,
  xl: `-size-xl`,
  block: `-size-full-width`,
};

export type sizeType = 'small' | 'medium' | 'large' | 'xs' | 'xl' | 'block' | 'default';

function useSizeHook(size: sizeType) {
  const { classPrefix } = useContext(ConfigContext);
  return useMemo(() => (SIZE_CLASSNAMES[size] ? `${classPrefix}${SIZE_CLASSNAMES[size]}` : ''), [size, classPrefix]);
}

export default useSizeHook;
