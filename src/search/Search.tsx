import React, { FC, useState, useRef } from 'react';
import { CloseCircleFilledIcon } from 'tdesign-icons-react';
import { Button } from 'tdesign-mobile-react/button';
import isFunction from 'lodash/isFunction';
import useConfig from '../_util/useConfig';
import type { TdSearchProps } from './type';
import type { StyledProps } from '../common';

export interface SearchProps extends TdSearchProps, StyledProps {}

const Search: FC<SearchProps> = (props) => {
  const {
    className = '',
    style = {},
    action = '',
    center = false,
    disabled = false,
    focus = false,
    label = '',
    leftIcon,
    placeholder = '',
    rightIcon,
    shape = 'square',
    value = '',
    onActionClick,
    onBlur,
    onChange,
    onClear,
    onFocus,
    onSubmit,
  } = props;
  const { classPrefix } = useConfig();

  const inputRef = useRef(null);
  const [searchActive, setSearchActive] = useState(focus);

  function handleBlur(e: React.FocusEvent<HTMLInputElement, Element>) {
    setSearchActive(false);
    inputRef.current.blur();
    const { value } = e.currentTarget;
    isFunction(onBlur) && onBlur(value, { e });
  }

  function handleClear(e: React.MouseEvent<SVGSVGElement, MouseEvent>) {
    isFunction(onClear) && onClear({ e });
    isFunction(onChange) && onChange('');
  }

  function handleAction(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    isFunction(onActionClick) && onActionClick({ e });
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement> | React.CompositionEvent<HTMLInputElement>) {
    const { value } = e.currentTarget;
    isFunction(onChange) && onChange(value, { e });
  }

  function handleFocus(e: React.FocusEvent<HTMLInputElement, Element>) {
    const { value } = e.currentTarget;
    isFunction(onFocus) && onFocus(value, { e });
  }

  function handleSubmit(e: React.FocusEvent<HTMLInputElement, Element>) {
    const { value } = e.currentTarget;
    isFunction(onSubmit) && onSubmit(value, { e });
  }

  function handleClick() {
    inputRef.current.focus();
    setSearchActive(true);
  }

  const shapeStyle = { borderRadius: shape === 'square' ? null : '50px' };

  return (
    <div
      className={`${classPrefix}-search ${searchActive ? `${classPrefix}-is-focused` : ''} ${className}`}
      style={{ ...style }}
    >
      {label && (
        <div
          className={`${classPrefix}-search__label-text`}
          style={{
            marginLeft: '0px',
            paddingRight: '8px',
            color: 'rgba(0,0,0,0.9)',
            whiteSpace: 'nowrap',
          }}
        >
          {label}
        </div>
      )}
      <div className={`${classPrefix}-search__form`} style={{ ...shapeStyle }}>
        <div className={`${classPrefix}-search__box`}>
          <div className={`${classPrefix}-search__icon-search`}>{leftIcon}</div>
          <input
            style={{ textAlign: center ? 'center' : null }}
            ref={inputRef}
            type="text"
            autoFocus={focus}
            disabled={disabled}
            value={value}
            placeholder={placeholder}
            className={`${classPrefix}-search__input`}
            onBlur={handleBlur}
            onChange={handleChange}
            onFocus={handleFocus}
            onSubmit={handleSubmit}
          />
          <div className={`${classPrefix}-search__icon-close`}>
            {value.length > 0 && <CloseCircleFilledIcon onClick={handleClear} />}
            {rightIcon}
          </div>
        </div>
        <label className={`${classPrefix}-search__label`} style={{ ...shapeStyle }} onClick={handleClick}>
          <div className={`${classPrefix}-search__label-icon-search`}>{leftIcon}</div>
          <span className={`${classPrefix}-search__label-text`}>{placeholder}</span>
        </label>
      </div>
      {searchActive && (
        <Button
          className={`${classPrefix}-search__cancel-button`}
          variant="text"
          theme="primary"
          onClick={handleAction}
        >
          {action}
        </Button>
      )}
    </div>
  );
};

export default Search;
