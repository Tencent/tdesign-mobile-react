import React, { useState, useRef } from 'react';
import type { FC, FormEvent, CompositionEvent, MouseEvent, KeyboardEvent, FocusEvent } from 'react';
import { CloseCircleFilledIcon, SearchIcon } from 'tdesign-icons-react';
import classNames from 'classnames';
import useDefault from '../_util/useDefault';
import parseTNode from '../_util/parseTNode';
import useConfig from '../_util/useConfig';
import type { TdSearchProps } from './type';
import type { StyledProps } from '../common';
import { searchDefaultProps } from './defaultProps';
import { ENTER_REG } from '../_common/js/common';
import useDefaultProps from '../hooks/useDefaultProps';
import { usePrefixClass } from '../hooks/useClass';

export interface SearchProps extends TdSearchProps, StyledProps {}

const Search: FC<SearchProps> = (props) => {
  const {
    clearable,
    action,
    center,
    disabled,
    focus,
    leftIcon,
    placeholder,
    readonly,
    shape,
    value,
    onActionClick,
    onBlur,
    onChange,
    onClear,
    onFocus,
    onSubmit,
  } = useDefaultProps(props, searchDefaultProps);
  const [focusState, setFocus] = useState(focus);
  const inputRef = useRef(null);
  const [searchValue, setSearchValue] = useDefault(value, '', onChange);

  const { classPrefix } = useConfig();
  const searchClass = usePrefixClass('search');

  const boxClasses = classNames(`${searchClass}__input-box`, `${searchClass}__input-box--${shape}`, {
    [`${classPrefix}-is-focused`]: focusState,
  });
  const inputClasses = classNames(`${classPrefix}-input__keyword`, {
    [`${searchClass}--center`]: center,
  });

  const inputValueChangeHandle = (e: FormEvent<HTMLInputElement>) => {
    const { value } = e.target as HTMLInputElement;
    setSearchValue(value, { trigger: 'input-change', e });
  };

  const handleInput = (e: FormEvent<HTMLInputElement>) => {
    if (e instanceof InputEvent) {
      // 中文输入的时候inputType是insertCompositionText所以中文输入的时候禁止触发。
      const checkInputType = e.inputType && e.inputType === 'insertCompositionText';
      if (e.isComposing || checkInputType) return;
    }

    inputValueChangeHandle(e);
  };

  const handleClear = (e: MouseEvent<HTMLDivElement>) => {
    setSearchValue('', { trigger: 'input-change' });
    setFocus(true);
    onClear?.({ e });
  };

  const handleFocus = (e: FocusEvent<HTMLDivElement>) => {
    onFocus?.({ value: searchValue, e });
  };

  const handleBlur = (e: FocusEvent<HTMLDivElement>) => {
    onBlur?.({ value: searchValue, e });
  };

  const handleCompositionend = (e: CompositionEvent) => {
    inputValueChangeHandle(e as CompositionEvent<HTMLInputElement>);
  };

  const handleAction = (e: MouseEvent) => {
    onActionClick?.({ e });
  };

  const handleSearch = (e: KeyboardEvent<HTMLDivElement>) => {
    // 如果按的是 enter 键, 13是 enter
    if (ENTER_REG.test(e.code) || ENTER_REG.test(e.key)) {
      e.preventDefault();
      onSubmit?.({ value: searchValue, e });
    }
  };

  const renderLeftIcon = () => {
    if (leftIcon === 'search') {
      return <SearchIcon size="24px" />;
    }
    return parseTNode(leftIcon);
  };

  const renderClear = () => {
    if (clearable && searchValue) {
      return (
        <div className={`${searchClass}__clear`} onClick={handleClear}>
          <CloseCircleFilledIcon size="24" />
        </div>
      );
    }
    return null;
  };

  const renderAction = () => {
    if (action && searchValue) {
      return (
        <div className={`${searchClass}__search-action`} onClick={handleAction}>
          {parseTNode(action)}
        </div>
      );
    }
    return null;
  };

  return (
    <div className={`${searchClass}`}>
      <div className={`${boxClasses}`}>
        {renderLeftIcon()}
        <input
          ref={inputRef}
          value={searchValue}
          type="search"
          className={`${inputClasses}`}
          autoFocus={focus}
          placeholder={placeholder}
          readOnly={readonly}
          disabled={disabled}
          onKeyPress={handleSearch}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onInput={handleInput}
          onCompositionEnd={handleCompositionend}
        />
        {renderClear()}
      </div>
      {renderAction()}
    </div>
  );
};

export default Search;
