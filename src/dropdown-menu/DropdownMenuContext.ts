import noop from 'lodash/noop';
import React from 'react';
import { dropdownMenuDefaultProps } from './defaultProps';

const DropdownMenuContext = React.createContext({
  ...dropdownMenuDefaultProps,
  activedId: '',
  onChangeActivedId: noop,
});

export default DropdownMenuContext;
