import { useRef, useState } from 'react';
import { InternalFormInstance } from './interface';

export const HOOK_MARK = 'TD_FORM_INTERNAL_HOOKS';

export type Task = { args: any[]; name: string };

// TODO 后续将所有实例函数迁移到 FormStore 内统一管理
class FormStore {
  private store: Record<string, any> = {};

  private forceRootUpdate: () => void;

  public taskQueue: Task[] = [];

  constructor(forceReRender: () => void) {
    this.forceRootUpdate = forceReRender;
  }

  public flashQueue = () => {
    this.taskQueue.forEach((task) => {
      (this as any)[task.name]?.apply(this, [...task.args]);
    });
    this.taskQueue = [];
  };

  public getForm = (): InternalFormInstance => ({
    isInit: true,
    store: this.store,
    getFieldsValue: undefined,
    getFieldValue: undefined,
    setFieldsValue: (...args: any[]) => {
      this.taskQueue.push({ args, name: 'setFieldsValue' });
    },
    setFields: (...args: any[]) => {
      this.taskQueue.push({ args, name: 'setFields' });
    },
    getValidateMessage: (...args: any[]) => {
      this.taskQueue.push({ args, name: 'getValidateMessage' });
    },
    submit: (...args: any[]) => {
      this.taskQueue.push({ args, name: 'submit' });
    },
    reset: (...args: any[]) => {
      this.taskQueue.push({ args, name: 'reset' });
    },
    clearValidate: (...args: any[]) => {
      this.taskQueue.push({ args, name: 'clearValidate' });
    },
    setValidateMessage: (...args: any[]) => {
      this.taskQueue.push({ args, name: 'setValidateMessage' });
    },
    validate: undefined,
    validateOnly: undefined,
    getInternalHooks: this.getInternalHooks,
  });

  private getInternalHooks = (key: string) => {
    if (key === HOOK_MARK) {
      return {
        setForm: (formInstance: any) => {
          Object.keys(formInstance).forEach((k) => {
            (this as any)[k] = formInstance[k];
          });
        },
        flashQueue: this.flashQueue,
      };
    }
    return null;
  };
}

export default function useForm(form?: InternalFormInstance) {
  const formRef = useRef<InternalFormInstance>(Object.create({}));
  const [, forceUpdate] = useState({});

  if (!formRef.current.isInit) {
    if (form) {
      formRef.current = form;
      // Reset store when reopening
      formRef.current.store = {};
    } else {
      // Create a new FormStore if not provided
      const forceReRender = () => {
        forceUpdate({});
      };

      const formStore: FormStore = new FormStore(forceReRender);

      formRef.current = formStore.getForm();
    }
  }

  return [formRef.current];
}
