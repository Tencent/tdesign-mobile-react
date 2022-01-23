import { createContext } from 'react';

export const defaultClassPrefix = 't';

export interface Config {
  /**
   * 组件类名前缀
   *
   * @default 't'
   */
  classPrefix?: string;
}

export const defaultContext = {
  classPrefix: defaultClassPrefix,
};

const ConfigContext = createContext<Config>(defaultContext);

export default ConfigContext;
