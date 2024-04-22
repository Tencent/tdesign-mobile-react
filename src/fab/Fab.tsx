import React, { useMemo, useContext, forwardRef, Ref } from 'react';
import classNames from 'classnames';
import Button, { ButtonProps } from '../button';
import { TdFabProps } from './type';
import { StyledProps } from '../common';
import { ConfigContext } from '../config-provider';

export interface FabProps extends TdFabProps, StyledProps {}

const Fab: React.FC<FabProps> = forwardRef((props, ref: Ref<HTMLButtonElement>) => {
  const { buttonProps, style, icon = null, text, onClick, ...rest } = props;
  const baseButtonProps: ButtonProps = {
    size: 'large',
    theme: 'primary',
    shape: text ? 'round' : 'circle',
  };

  const { classPrefix } = useContext(ConfigContext);
  const name = useMemo(() => `${classPrefix}-fab`, [classPrefix]);

  // 外层样式类
  const FabClasses = classNames({
    [`${name}__button`]: true,
  });

  const onClickHandle = (e) => {
    onClick({ e });
  };

  return (
    <div style={style} className={name} onClick={onClickHandle}>
      <Button ref={ref} className={FabClasses} {...baseButtonProps} {...buttonProps} icon={icon} {...rest}>
        {text}
      </Button>
    </div>
  );
});

Fab.displayName = 'Fab';
export default Fab;
