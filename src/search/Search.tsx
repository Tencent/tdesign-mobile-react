import React, { useState, useRef } from 'react';
import type { FC, FormEvent, CompositionEvent, MouseEvent, KeyboardEvent, FocusEvent } from 'react';
import { CloseCircleFilledIcon, SearchIcon } from 'tdesign-icons-react';
import classNames from 'classnames';
import useDefault from '../_util/useDefault';
import parseTNode from '../_util/parseTNode';
import useConfig from '../hooks/useConfig';
import type { TdSearchProps } from './type';
import type { StyledProps } from '../common';
import { searchDefaultProps } from './defaultProps';
import { ENTER_REG } from '../_common/js/common';
import useDefaultProps from '../hooks/useDefaultProps';
import { usePrefixClass } from '../hooks/useClass';
import Cell from '../cell/Cell';

export interface SearchProps extends TdSearchProps, StyledProps {}

const Search: FC<SearchProps> = (props) => {
  const {
    clearable,
    clearTrigger,
    action,
    center,
    disabled,
    focus,
    leftIcon,
    placeholder,
    readonly,
    shape,
    value,
    resultList,
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
  const [showResultList, setShowResultList] = useState(false);

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
    setShowResultList(true);
    if (e instanceof InputEvent) {
      // 中文输入的时候inputType是insertCompositionText所以中文输入的时候禁止触发。
      const checkInputType = e.inputType && e.inputType === 'insertCompositionText';
      if (e.isComposing || checkInputType) return;
    }

    inputValueChangeHandle(e);
  };

  const handleClear = (e: MouseEvent<HTMLDivElement>) => {
    setSearchValue('', { trigger: 'clear', e });
    setFocus(true);
    onClear?.({ e });
  };

  const handleFocus = (e: FocusEvent<HTMLDivElement>) => {
    setFocus(true);
    onFocus?.({ value: searchValue, e });
  };

  const handleBlur = (e: FocusEvent<HTMLDivElement>) => {
    setFocus(false);
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
      setShowResultList(false);
      onSubmit?.({ value: searchValue, e });
    }
  };

  const renderLeftIcon = () => {
    if (leftIcon === 'search') {
      return <SearchIcon />;
    }
    return parseTNode(leftIcon);
  };

  const renderClear = () => {
    if (clearable && searchValue && (clearTrigger === 'always' || (clearTrigger === 'focus' && focusState))) {
      return (
        <div className={`${searchClass}__clear`} onClick={handleClear}>
          <CloseCircleFilledIcon />
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

  const highlightSearchValue = (item: string, value: string) => {
    const parts = item.split(new RegExp(`(${value})`, 'gi'));
    return parts.map((part, index) =>
      part.toLowerCase() === value.toLowerCase() ? (
        <span key={index} className={`${searchClass}__result-item--highLight`}>
          {part}
        </span>
      ) : (
        part
      ),
    );
  };

  const handleSelectOption = (item: string, e: MouseEvent<HTMLDivElement>) => {
    setShowResultList(false);
    setSearchValue(item, { trigger: 'option-click', e });
  };

  const renderResultList = () => {
    if (!showResultList || !resultList || resultList.length === 0) {
      return null;
    }

    return (
      <div className={`${searchClass}__result-list`}>
        {resultList.map((item, index) => (
          <Cell
            key={index}
            className={`${searchClass}__result-item`}
            onClick={(context) => handleSelectOption(item, context.e)}
            title={highlightSearchValue(item, searchValue)}
          />
        ))}
      </div>
    );
  };

  return (
    <div>
      <div className={`${searchClass}`}>
        <div className={`${boxClasses}`}>
          {renderLeftIcon()}
          <input
            ref={inputRef}
            value={searchValue}
            type="search"
            className={`${inputClasses}`}
            style={
              props.cursorColor ? ({ '--td-search-cursor-color': props.cursorColor } as React.CSSProperties) : undefined
            }
            autoFocus={focus}
            placeholder={placeholder}
            readOnly={readonly}
            disabled={disabled}
            onKeyDown={handleSearch}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onInput={handleInput}
            onCompositionEnd={handleCompositionend}
          />
          {renderClear()}
        </div>
        {renderAction()}
      </div>
      {renderResultList()}
    </div>
  );
};

export default Search;
