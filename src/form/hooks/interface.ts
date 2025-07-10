export type Store = Record<string, any>;

export interface InternalFormInstance {
  isInit?: boolean;
  store?: Store;
}
