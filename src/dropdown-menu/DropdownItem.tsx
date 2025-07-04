import { useClickAway } from 'ahooks';
import cx from 'classnames';
import uniqueId from 'lodash-es/uniqueId';
import React, { useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { CaretDownSmallIcon, CaretUpSmallIcon } from 'tdesign-icons-react';
import { Button, Checkbox, Popup, RadioGroup } from 'tdesign-mobile-react';
import useDefault from '../_util/useDefault';
import parseTNode from '../_util/parseTNode';
import CheckboxGroup from '../checkbox/CheckboxGroup';
import { StyledProps } from '../common';
import useDefaultProps from '../hooks/useDefaultProps';
import useConfig from '../hooks/useConfig';
import { usePrefixClass } from '../hooks/useClass';
import { dropdownItemDefaultProps } from './defaultProps';
import DropdownMenuContext from './DropdownMenuContext';
import type { TdDropdownItemProps } from './type';

export interface DropdownItemProps extends TdDropdownItemProps, StyledProps {
  children?: React.ReactNode;
}

const DropdownItem: React.FC<DropdownItemProps> = (props) => {
  const {
    className,
    children,
    style,
    disabled,
    options: inputOptions,
    optionsColumns,
    placement,
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
  const dropdownMenuClass = usePrefixClass('dropdown-menu');
  const dropdownItemClass = usePrefixClass('dropdown-item');

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

  const [id] = useState(() => uniqueId());

  const { direction, activedId, onChangeActivedId, showOverlay, zIndex, closeOnClickOverlay } =
    useContext(DropdownMenuContext);

  const labelText = useMemo(
    () => label || options.find((item) => item.value === innerValue)?.label || '',
    [options, label, innerValue],
  );

  const isActived = id === activedId;

  const menuItemRef = useRef<HTMLDivElement>(null);
  const itemRef = useRef<HTMLDivElement>(null);

  const getDropdownItemStyle = () => {
    const ele = menuItemRef.current;
    if (!ele) {
      return {};
    }

    const { top, bottom } = ele.getBoundingClientRect();

    if (direction === 'up') {
      return {
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
        className={cx(`${dropdownMenuClass}__item`, {
          [`${dropdownMenuClass}__item--active`]: isActived,
          [`${dropdownMenuClass}__item--disabled`]: disabled,
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
        <div className={`${dropdownMenuClass}__title`}>{labelText}</div>
        {direction === 'down' ? (
          <CaretDownSmallIcon
            className={cx(`${dropdownMenuClass}__icon`, {
              [`${dropdownMenuClass}__icon--active`]: isActived,
            })}
          />
        ) : (
          <CaretUpSmallIcon
            className={cx(`${dropdownMenuClass}__icon`, {
              [`${dropdownMenuClass}__icon--active`]: isActived,
            })}
          />
        )}
      </div>
      {isActived ? (
        <div
          key={id}
          className={cx(dropdownItemClass, className)}
          style={{
            ...style,
            ...getDropdownItemStyle(),
          }}
          ref={itemRef}
        >
          <Popup
            attach={attach}
            visible={isActived}
            placement={direction === 'up' ? 'bottom' : 'top'}
            closeOnOverlayClick={closeOnClickOverlay}
            showOverlay={showOverlay}
            zIndex={zIndex}
            style={{
              position: 'absolute',
              overflow: 'hidden',
            }}
            overlayProps={{
              style: {
                position: 'absolute',
              },
            }}
            onVisibleChange={(visible) => {
              if (!visible) {
                onChangeActivedId('');
              }
            }}
          >
            <div className={cx(`${dropdownItemClass}__content`, `${classPrefix}-popup__content`)}>
              <div className={cx(`${dropdownItemClass}__body`)}>
                {parseTNode(children) || (
                  <>
                    {multiple ? (
                      <CheckboxGroup
                        value={modalValue as (string | number)[]}
                        onChange={(value) => {
                          setModalValue(value as (string | number)[]);
                        }}
                        className={`${dropdownItemClass}__checkbox-group`}
                        style={{
                          gridTemplateColumns: `repeat(${optionsColumns}, 1fr)`,
                        }}
                      >
                        {options.map((item, index) => (
                          <Checkbox
                            key={`${item.value}-${index}`}
                            className={`${dropdownItemClass}__checkbox-item t-checkbox--tag`}
                            icon={false}
                            borderless
                            value={item.value as string | number}
                            label={item.label}
                            disabled={item.disabled}
                          />
                        ))}
                      </CheckboxGroup>
                    ) : (
                      <RadioGroup
                        className={`${dropdownItemClass}__radio-group`}
                        icon="line"
                        options={options}
                        placement={placement}
                        value={modalValue as string | number}
                        onChange={(value: string | number) => {
                          setModalValue(value);
                          setInnerValue(value);
                          onChangeActivedId('');
                        }}
                      />
                    )}
                  </>
                )}
              </div>
              {parseTNode(footer) ||
                (multiple && (
                  <div className={`${dropdownItemClass}__footer`}>
                    <Button
                      disabled={Array.isArray(modalValue) && modalValue.length === 0}
                      theme="light"
                      className={`${dropdownItemClass}__footer-btn ${dropdownItemClass}__reset-btn`}
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
                      className={`${dropdownItemClass}__footer-btn ${dropdownItemClass}__confirm-btn`}
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
                ))}
            </div>
          </Popup>
        </div>
      ) : null}
    </>
  );
};

DropdownItem.displayName = 'DropdownItem';

export default DropdownItem;
