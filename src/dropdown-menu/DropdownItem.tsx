import { useClickAway } from 'ahooks';
import cx from 'classnames';
import uniqueId from 'lodash/uniqueId';
import React, { FC, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { CaretDownSmallIcon, CaretUpSmallIcon } from 'tdesign-icons-react';
import { Button, Checkbox, Popup, Radio, RadioGroup } from 'tdesign-mobile-react';
import useDefault from 'tdesign-mobile-react/_util/useDefault';
import CheckboxGroup from 'tdesign-mobile-react/checkbox/CheckboxGroup';
import { StyledProps } from 'tdesign-mobile-react/common';
import useDefaultProps from 'tdesign-mobile-react/hooks/useDefaultProps';
import useConfig from '../_util/useConfig';
import { dropdownItemDefaultProps } from './defaultProps';
import DropdownMenuContext from './DropdownMenuContext';
import type { TdDropdownItemProps } from './type';

export interface DropdownItemProps extends TdDropdownItemProps, StyledProps {}

const DropdownItem: FC<DropdownItemProps> = (props) => {
  const {
    className,
    style,
    disabled,
    options: inputOptions,
    optionsColumns,
    label,
    value,
    defaultValue,
    onChange,
    multiple,
    onConfirm,
    onReset,
    footer,
    keys,
  } = useDefaultProps<DropdownItemProps>(props, dropdownItemDefaultProps);
  const { classPrefix } = useConfig();
  const itemClass = `${classPrefix}-dropdown-item`;
  const [innerValue, setInnerValue] = useDefault(value, defaultValue, onChange);
  const [modalValue, setModalValue] = useState(innerValue);

  const options = useMemo(
    () =>
      inputOptions.map((item) => ({
        value: item[keys?.value ?? 'value'],
        label: item[keys?.label ?? 'label'],
        disabled: item[keys?.disabled ?? 'disabled'],
      })),
    [keys, inputOptions],
  );

  const [id] = useState(uniqueId());

  const { direction, activedId, onChangeActivedId, showOverlay, zIndex, closeOnClickOverlay } =
    useContext(DropdownMenuContext);

  const labelText = useMemo(
    () => label || options.find((item) => item.value === innerValue)?.label || '',
    [options, label, innerValue],
  );

  const isActived = id === activedId;

  const menuItemRef = useRef<HTMLDivElement>();
  const itemRef = useRef<HTMLDivElement>();

  const getDropdownItemStyle = () => {
    const ele = menuItemRef.current;
    if (!ele) {
      return {};
    }

    const { top, bottom } = ele.getBoundingClientRect();

    if (direction === 'up') {
      return {
        transform: 'rotateX(180deg) rotateY(180deg)',
        zIndex,
        bottom: `calc(100vh - ${top}px)`,
      };
    }

    return {
      zIndex,
      top: `${bottom}px`,
    };
  };

  useClickAway(() => {
    if (!isActived || !closeOnClickOverlay) {
      return;
    }
    onChangeActivedId('');
  }, itemRef);

  useEffect(() => {
    if (isActived) {
      setModalValue(innerValue);
    }
  }, [isActived, innerValue]);

  const attach = useCallback(() => itemRef.current || document.body, []);

  return (
    <>
      <div
        ref={menuItemRef}
        className={cx(`${classPrefix}-dropdown-menu__item`, {
          [`${classPrefix}-dropdown-menu__item--active`]: isActived,
          [`${classPrefix}-dropdown-menu__item--disabled`]: disabled,
        })}
        onClick={(e) => {
          if (disabled) {
            return;
          }
          onChangeActivedId(isActived ? '' : id);
          if (!isActived) {
            e.stopPropagation();
          }
        }}
      >
        <div className={`${classPrefix}-dropdown-menu__title`}>{labelText}</div>
        {direction === 'down' ? (
          <CaretDownSmallIcon
            className={cx(`${classPrefix}-dropdown-menu__icon`, {
              [`${classPrefix}-dropdown-menu__icon--active`]: isActived,
            })}
          />
        ) : (
          <CaretUpSmallIcon
            className={cx(`${classPrefix}-dropdown-menu__icon`, {
              [`${classPrefix}-dropdown-menu__icon--active`]: isActived,
            })}
          />
        )}
      </div>
      {isActived ? (
        <div
          key={id}
          className={cx(itemClass, className)}
          style={{
            ...style,
            ...getDropdownItemStyle(),
          }}
          ref={itemRef}
        >
          {/* TODO Popup 暂不支持 duration */}
          <Popup
            attach={attach}
            visible={isActived}
            onVisibleChange={(visible) => {
              if (!visible) {
                onChangeActivedId('');
              }
            }}
            closeOnOverlayClick={closeOnClickOverlay}
            showOverlay={showOverlay}
            zIndex={zIndex}
            style={{
              position: 'absolute',
              borderRadius: 0,
            }}
            overlayProps={{
              style: {
                position: 'absolute',
              },
            }}
            className={`${itemClass}__popup-host`}
          >
            <div className={cx(`${itemClass}__content`, `${classPrefix}-popup__content`)}>
              <div
                className={cx(`${itemClass}__body`)}
                style={
                  direction === 'up'
                    ? {
                        transform: 'rotateX(180deg) rotateY(180deg)',
                      }
                    : {}
                }
              >
                {props.children ? (
                  props.children
                ) : (
                  <>
                    {/* TODO checkbox 组件未升级 样式不对 */}
                    {multiple ? (
                      <CheckboxGroup
                        value={modalValue as (string | number)[]}
                        onChange={(value) => {
                          setModalValue(value);
                        }}
                        // className={`itemClass__checkbox-group`}
                        style={{
                          gridTemplateColumns: `repeat(${optionsColumns}, 1fr)`,
                        }}
                      >
                        {options.map((item, index) => (
                          <Checkbox
                            key={index}
                            value={item.value as string | number}
                            label={item.label}
                            disabled={item.disabled}
                          />
                        ))}
                      </CheckboxGroup>
                    ) : (
                      <RadioGroup
                        value={modalValue as string | number}
                        onChange={(value: string | number) => {
                          setModalValue(value);
                          setInnerValue(value);
                          onChangeActivedId('');
                        }}
                      >
                        {/* TODO radio 暂不支持 icon line */}
                        {options.map((item, index) => (
                          <Radio
                            key={index}
                            value={item.value as string | number}
                            label={item.label}
                            disabled={item.disabled}
                          />
                        ))}
                      </RadioGroup>
                    )}
                  </>
                )}
              </div>

              {footer ? footer : null}

              {multiple && !footer ? (
                <div className={`${itemClass}__footer`}>
                  <Button
                    disabled={Array.isArray(modalValue) && modalValue.length === 0}
                    theme="light"
                    className={`${itemClass}__footer-btn ${itemClass}__reset-btn`}
                    onClick={() => {
                      if (typeof onReset === 'function') {
                        onReset(modalValue);
                      } else {
                        setModalValue(innerValue);
                      }
                    }}
                  >
                    重置
                  </Button>
                  <Button
                    disabled={Array.isArray(modalValue) && modalValue.length === 0}
                    theme="primary"
                    className={`${itemClass}__footer-btn ${itemClass}__confirm-btn`}
                    onClick={() => {
                      if (typeof onConfirm === 'function') {
                        onConfirm(modalValue);
                      } else {
                        setInnerValue(modalValue);
                      }
                      onChangeActivedId('');
                    }}
                  >
                    确定
                  </Button>
                </div>
              ) : null}
            </div>
          </Popup>
        </div>
      ) : null}
    </>
  );
};

DropdownItem.displayName = 'DropdownItem';

export default DropdownItem;
