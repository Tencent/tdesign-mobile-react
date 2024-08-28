import cx from 'classnames';
import React, { ComponentProps, FC, forwardRef, useImperativeHandle, useState } from 'react';
import { StyledProps } from 'tdesign-mobile-react/common';
import useDefaultProps from 'tdesign-mobile-react/hooks/useDefaultProps';
import useConfig from '../_util/useConfig';
import { dropdownMenuDefaultProps } from './defaultProps';
import DropdownItem from './DropdownItem';
import DropdownMenuContext from './DropdownMenuContext';
import type { TdDropdownMenuProps } from './type';

export interface DropdownMenuProps extends TdDropdownMenuProps, StyledProps {}

type DropdownMenuRef = {
  collapseMenu: () => void;
};

const DropdownMenu: FC<DropdownMenuProps & { ref?: React.ForwardedRef<DropdownMenuRef> }> = forwardRef<
  DropdownMenuRef,
  DropdownMenuProps
>((props, ref) => {
  const { className, style, direction, zIndex, closeOnClickOverlay, showOverlay, duration } =
    useDefaultProps<DropdownMenuProps>(props, dropdownMenuDefaultProps);

  const { classPrefix } = useConfig();
  const name = `${classPrefix}-dropdown-menu`;

  const items = [];
  React.Children.forEach(props.children, (child: typeof DropdownItem) => {
    if (
      React.isValidElement<ComponentProps<typeof DropdownItem>>(child) &&
      (child.type as any)?.displayName === DropdownItem.displayName
    ) {
      items.push(child);
    }
  });

  const [activedId, setActivedId] = useState('');

  useImperativeHandle(ref, () => ({
    collapseMenu: () => {
      setActivedId('');
    },
  }));

  return (
    <DropdownMenuContext.Provider
      value={{
        direction,
        zIndex,
        closeOnClickOverlay,
        showOverlay,
        duration,
        activedId,
        onChangeActivedId: setActivedId,
      }}
    >
      <div className={cx(name, className)} style={style}>
        {items}
      </div>
    </DropdownMenuContext.Provider>
  );
});

DropdownMenu.displayName = 'DropdownMenu';

export default DropdownMenu;
