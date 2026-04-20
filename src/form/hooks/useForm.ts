import { useRef } from 'react';
import { InternalFormInstance, Store } from './interface';

class FormStore {
  private store: Store = {};

  public getForm = (): InternalFormInstance => ({
    isInit: true,
    store: this.store,
    getFieldsValue: (multiple?: boolean) => {
      if (multiple) return this.store;
      return { ...this.store };
    },
  });
}

export default function useForm() {
  const formRef = useRef<InternalFormInstance>(Object.create({}));
  if (!formRef.current.isInit) {
    const formStore: FormStore = new FormStore();
    formRef.current = formStore.getForm();
  }

  return [formRef.current];
}
