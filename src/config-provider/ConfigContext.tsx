import { createContext } from 'react';
import merge from 'lodash/merge';
import defaultLocale from '../locale/zh_CN';
import defaultConfig from '../_common/js/global-config/default-config';

export const defaultClassPrefix = 't';

export interface Config {
  /**
   * 组件类名前缀
   *
   * @default 't'
   */
  classPrefix?: string;
  /**
   * 全局配置
   */
  globalConfig?: Locale;
}

export const defaultContext = {
  classPrefix: defaultClassPrefix,
  globalConfig: merge({}, defaultConfig, defaultLocale),
};

export type Locale = typeof defaultLocale;

const ConfigContext = createContext<Config>(defaultContext);

export default ConfigContext;
