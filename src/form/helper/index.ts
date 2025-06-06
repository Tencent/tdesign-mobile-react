import type { ReactElement } from 'react';
import React from 'react';
import { isArray, isFunction } from 'lodash-es';
import { TNode } from '../../common';

export function needValidate(name: string | number, fields: string[] | undefined) {
  if (!fields || !isArray(fields)) return true;
  return fields.indexOf(String(name)) !== -1;
}

export function getNeedValidateChildren(children: TNode, fields: string[]) {
  return React.Children.toArray(children).filter((child) => {
    if (!React.isValidElement(child)) {
      return false;
    }
    return isFunction(child.props.validate) && needValidate(String(child.props.name), fields);
  }) as ReactElement[];
}

export function getResetHandlerChildren(children: TNode, fields: string[]) {
  return React.Children.toArray(children).filter((child) => {
    if (!React.isValidElement(child)) {
      return false;
    }
    return isFunction(child.props.resetHandler) && needValidate(String(child.props.name), fields);
  }) as ReactElement[];
}

export function getUpdatePromisesChildren(children: TNode, keys: string[]) {
  return React.Children.toArray(children).filter((child) => {
    if (!React.isValidElement(child)) {
      return false;
    }
    return isFunction(child.props.setValidateMessage) && keys.includes(String(child.props.name));
  }) as ReactElement[];
}

export function getNeedResetFields(children: TNode, fields: string[]) {
  return React.Children.toArray(children).filter((child) => {
    if (!React.isValidElement(child)) {
      return false;
    }
    return isFunction(child.props.resetField) && needValidate(String(child.props.name), fields);
  }) as ReactElement[];
}
