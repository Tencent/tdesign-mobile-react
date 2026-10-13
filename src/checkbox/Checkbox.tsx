import React, { forwardRef, Ref, useContext, useMemo } from 'react';
import classNames from 'classnames';
import {
  CheckCircleFilledIcon,
  CheckIcon,
  CheckRectangleFilledIcon,
  CircleIcon,
  MinusCircleFilledIcon,
  MinusIcon,
  MinusRectangleFilledIcon,
} from 'tdesign-icons-react';
import { TdCheckboxProps, TdCheckboxGroupProps } from './type';
import forwardRefWithStatics from '../_util/forwardRefWithStatics';
import CheckboxGroup from './CheckboxGroup';
import { StyledProps } from '../common';
import useConfig from '../hooks/useConfig';
import useDefault from '../_util/useDefault';
import parseTNode, { parseContentTNode } from '../_util/parseTNode';
import { usePrefixClass } from '../hooks/useClass';
import useDefaultProps from '../hooks/useDefaultProps';
import { checkboxDefaultProps } from './defaultProps';

export interface CheckboxProps extends TdCheckboxProps, StyledProps {}

export type CheckboxInjectedProps = CheckboxProps & { direction?: TdCheckboxGroupProps['direction'] };

export interface CheckContextValue {
  inject: (props: CheckboxProps) => CheckboxInjectedProps;
}

export const CheckContext = React.createContext<CheckContextValue>(null);

const Checkbox = forwardRef<HTMLDivElement, CheckboxProps>((_props, ref) => {
  const context = useContext(CheckContext);
  const props = useDefaultProps<CheckboxInjectedProps>(context ? context.inject(_props) : _props, checkboxDefaultProps);
  const { classPrefix } = useConfig();
  const checkboxClass = usePrefixClass('checkbox');
  const {
    className,
    placement,
    content,
    indeterminate,
    label,
    onChange,
    checked,
    defaultChecked,
    maxLabelRow,
    maxContentRow,
    icon,
    contentDisabled,
    block,
    borderless,
    checkAll,
    disabled,
    readonly,
    direction,
  } = props;
  const [internalChecked, setInternalChecked] = useDefault(checked, defaultChecked, onChange);

  const checkboxClassName = classNames(`${classPrefix}-checkbox`, {
    [`${checkboxClass}--${placement}`]: true,
    [`${checkboxClass}--checked`]: checked,
    [`${checkboxClass}--block`]: block,
    [`${checkboxClass}--${direction}`]: !!direction,
  });

  const isChecked = useMemo(() => (checkAll ? checked : internalChecked), [internalChecked, checkAll, checked]);

  const checkIcons = useMemo(() => {
    if (Array.isArray(icon) && icon.length > 1) {
      return icon.map((i) =>
        typeof i === 'string' ? <img key={i} className={`${checkboxClass}__icon-image`} src={i}></img> : i,
      );
    }
    return [<CheckCircleFilledIcon key="check" />, <CircleIcon key="uncheck" />];
  }, [checkboxClass, icon]);

  const checkIcon = useMemo(() => {
    if (icon === 'circle' || icon === true) {
      return indeterminate ? <MinusCircleFilledIcon /> : <CheckCircleFilledIcon />;
    }
    if (icon === 'rectangle') {
      return indeterminate ? <MinusRectangleFilledIcon /> : <CheckRectangleFilledIcon />;
    }
    if (icon === 'line') {
      return indeterminate ? <MinusIcon /> : <CheckIcon />;
    }
    return null;
  }, [icon, indeterminate]);

  const renderIconArray = () => {
    const className = `${checkboxClass}__icon-wrapper`;
    if (Array.isArray(icon)) {
      return parseContentTNode(isChecked ? checkIcons[0] : checkIcons[1], {
        className,
      });
    }
    if (isChecked) {
      return parseContentTNode(checkIcon, {
        className,
      });
    }
    return (
      <>
        {(icon === 'circle' || icon === true || icon === 'rectangle') && (
          <div
            className={classNames({
              [`${checkboxClass}__icon-circle`]: icon === true,
              [`${checkboxClass}__icon-${icon}`]: typeof icon === 'string',
              [`${checkboxClass}__icon-${icon}--disabled`]: disabled,
            })}
          ></div>
        )}
        {icon === 'line' && <div className="placeholder"></div>}
      </>
    );
  };

  const renderIconNode = () => (
    <div
      className={classNames({
        [`${checkboxClass}__icon`]: true,
        [`${checkboxClass}__icon--${placement}`]: true,
        [`${checkboxClass}__icon--checked`]: isChecked,
        [`${checkboxClass}__icon--disabled`]: disabled,
      })}
    >
      {renderIconArray()}
    </div>
  );

  const handleClick = (e) => {
    if (contentDisabled || disabled || readonly) {
      e.preventDefault();
      return;
    }

    setInternalChecked(!internalChecked, { e });
  };

  const renderCheckBoxContent = () => (
    <div
      className={classNames({
        [`${checkboxClass}__content`]: true,
      })}
      onClick={(event) => {
        event.stopPropagation();
        handleClick(event);
      }}
    >
      <div
        className={classNames({
          [`${checkboxClass}__title`]: true,
          [`${checkboxClass}__title--checked`]: isChecked,
          [`${checkboxClass}__title--disabled`]: disabled,
        })}
        style={{ WebkitLineClamp: maxLabelRow }}
      >
        {parseTNode(label)}
      </div>
      <div
        className={classNames({
          [`${checkboxClass}__description`]: true,
          [`${checkboxClass}__description--disabled`]: disabled,
        })}
        style={{ WebkitLineClamp: maxContentRow }}
      >
        {parseTNode(content)}
      </div>
    </div>
  );

  return (
    <div ref={ref} className={classNames(checkboxClassName, className)} onClick={handleClick}>
      {icon && renderIconNode()}
      {renderCheckBoxContent()}
      {/* 下边框 */}
      {!borderless && <div className={`${checkboxClass}__border ${checkboxClass}__border--${placement}`}></div>}
    </div>
  );
});

Checkbox.displayName = 'Checkbox';

export default forwardRefWithStatics(
  (props: CheckboxProps, ref: Ref<HTMLDivElement>) => <Checkbox ref={ref} {...props} />,
  { Group: CheckboxGroup },
);
