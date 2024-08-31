import React, { useContext, useMemo, Ref, forwardRef } from 'react';
import classNames from 'classnames';
import {
  CheckIcon,
  MinusIcon,
  CheckCircleFilledIcon,
  CircleIcon,
  MinusCircleFilledIcon,
  MinusRectangleFilledIcon,
  CheckRectangleFilledIcon,
} from 'tdesign-icons-react';
import { TdCheckboxProps } from './type';
import forwardRefWithStatics from '../_util/forwardRefWithStatics';
import CheckboxGroup from './CheckboxGroup';
import useConfig from '../_util/useConfig';
import useDefault from '../_util/useDefault';
import { parseContentTNode } from '../_util/parseTNode';
import { usePrefixClass } from '../hooks/useClass';

export interface CheckBoxProps extends TdCheckboxProps {
  ref: Ref<HTMLLabelElement>;
}

export interface CheckContextValue {
  inject: (props: CheckBoxProps) => CheckBoxProps;
}

export const CheckContext = React.createContext<CheckContextValue>(null);

const Checkbox = forwardRef((_props: CheckBoxProps) => {
  const context = useContext(CheckContext);
  const props = context ? context.inject(_props) : _props;
  const { classPrefix } = useConfig();
  const classPrefixCheckBox = usePrefixClass('checkbox');
  const {
    placement = 'left',
    content,
    indeterminate,
    label,
    onChange,
    checked,
    defaultChecked = false,
    maxLabelRow = 3,
    maxContentRow = 5,
    icon = 'circle',
    contentDisabled = false,
    block = true,
    borderless = false,
  } = props;
  const [internalChecked, setInternalChecked] = useDefault(checked, defaultChecked, onChange);

  const checkboxClassName = classNames(`${classPrefix}-checkbox`, {
    [`${classPrefixCheckBox}--${placement}`]: true,
    [`${classPrefixCheckBox}--checked`]: props.checked,
    [`${classPrefixCheckBox}--block`]: block,
  });

  const isChecked = useMemo(
    () => (props.checkAll ? props.checked : internalChecked),
    [internalChecked, props.checkAll, props.checked],
  );

  const checkIcons = useMemo(() => {
    if (Array.isArray(icon) && icon.length > 1) {
      return icon.map((i) =>
        typeof i === 'string' ? <img key={i} className={`${classPrefixCheckBox}__icon-image`} src={i}></img> : i,
      );
    }
    return [<CheckCircleFilledIcon key="check" />, <CircleIcon key="uncheck" />];
  }, [classPrefixCheckBox, icon]);

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
    const className = `${classPrefixCheckBox}__icon-wrapper`;
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
              [`${classPrefixCheckBox}__icon-circle`]: icon === true,
              [`${classPrefixCheckBox}__icon-${icon}`]: typeof icon === 'string',
              [`${classPrefixCheckBox}__icon-${icon}--disabled`]: props.disabled,
            })}
          ></div>
        )}
        {icon === 'line' && <div className="placeholder"></div>}
      </>
    );
  };

  const renderIconNode = () => {
    if (!icon) {
      return null;
    }
    return (
      <div
        className={classNames({
          [`${classPrefixCheckBox}__icon`]: true,
          [`${classPrefixCheckBox}__icon--${placement}`]: true,
          [`${classPrefixCheckBox}__icon--checked`]: isChecked,
          [`${classPrefixCheckBox}__icon--disabled`]: props.disabled,
        })}
      >
        {renderIconArray()}
      </div>
    );
  };

  const handleClick = (e) => {
    if (contentDisabled || props.disabled) {
      e.preventDefault();
      return;
    }

    setInternalChecked(!internalChecked, { e });
  };

  const renderCheckBoxContent = () => (
    <div
      className={classNames({
        [`${classPrefixCheckBox}__content`]: true,
      })}
      onClick={(event) => {
        event.stopPropagation();
        handleClick(event);
      }}
    >
      <div
        className={classNames({
          [`${classPrefixCheckBox}__title`]: true,
          [`${classPrefixCheckBox}__title--checked`]: isChecked,
          [`${classPrefixCheckBox}__title--disabled`]: props.disabled,
        })}
        style={{ WebkitLineClamp: maxLabelRow }}
      >
        {label}
      </div>
      <div
        className={classNames({
          [`${classPrefixCheckBox}__description`]: true,
          [`${classPrefixCheckBox}__description--disabled`]: props.disabled,
        })}
        style={{ WebkitLineClamp: maxContentRow }}
      >
        {content}
      </div>
    </div>
  );

  return (
    <>
      <div className={checkboxClassName} onClick={handleClick}>
        {renderIconNode()}
        {renderCheckBoxContent()}
        {/* 下边框 */}
        {!borderless && (
          <div className={`${classPrefixCheckBox}__border ${classPrefixCheckBox}__border--${placement}`}></div>
        )}
      </div>
    </>
  );
});

export default forwardRefWithStatics(
  (props: TdCheckboxProps, ref: Ref<HTMLInputElement>) => <Checkbox ref={ref} {...props} />,
  { Group: CheckboxGroup },
);
