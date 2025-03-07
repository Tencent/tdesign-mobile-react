import React from 'react';
import { DropdownItem, DropdownMenu } from 'tdesign-mobile-react';

export const DisabledDemo = () => (
  <DropdownMenu>
    <DropdownItem disabled={true} label="禁用菜单" />
    <DropdownItem disabled={true} label="禁用菜单" />
  </DropdownMenu>
);
