import { createContext } from 'react';
import defaultZhLocale from '../_common/js/global-config/mobile/locale/zh_CN';

export const defaultClassPrefix = 't';

export interface Config {
  /**
   * 组件类名前缀
   *
   * @default 't'
   */
  classPrefix?: string;
  globalConfig?: typeof defaultZhLocale;
}

export const defaultContext = {
  classPrefix: defaultClassPrefix,
  globalConfig: defaultZhLocale,
};

const ConfigContext = createContext<Config>(defaultContext);

export default ConfigContext;
