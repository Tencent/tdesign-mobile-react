import React, { useMemo, forwardRef, Ref } from 'react';
import classNames from 'classnames';
import Button, { ButtonProps } from '../button';
import { TdFabProps } from './type';
import { StyledProps } from '../common';
import useConfig from '../hooks/useConfig';

export interface FabProps extends TdFabProps, StyledProps {}

const Fab: React.FC<FabProps> = forwardRef((props, ref: Ref<HTMLButtonElement>) => {
  const { buttonProps, style, icon = null, text, onClick } = props;
  const baseButtonProps: ButtonProps = {
    shape: 'round',
    theme: 'primary',
  };

  const { classPrefix } = useConfig();
  const name = useMemo(() => `${classPrefix}-fab`, [classPrefix]);

  // 外层样式类
  const FabClasses = classNames({
    [`${name}`]: true,
    [`${name}--icon-only`]: icon && !text,
  });

  const onClickHandle = (e) => {
    onClick({ e });
  };

  return (
    <Button
      ref={ref}
      style={style}
      className={FabClasses}
      {...baseButtonProps}
      {...buttonProps}
      onClick={onClickHandle}
    >
      {icon}
      {text && <span className={classNames(`${name}__text`)}>{text}</span>}
    </Button>
  );
});

Fab.displayName = 'Fab';
export default Fab;
