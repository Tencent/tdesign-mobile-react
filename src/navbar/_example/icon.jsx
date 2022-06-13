import React from 'react';
import { Navbar } from 'tdesign-mobile-react';
import { EllipsisIcon, NotificationIcon } from 'tdesign-icons-react';

const IconUsage = () => (
  <>
    <Navbar leftIcon homeIcon>
      标题
    </Navbar>

    <Navbar
      rightIcon={
        <>
          <NotificationIcon />
          <EllipsisIcon />
        </>
      }
    >
      标题
    </Navbar>
  </>
);

export default IconUsage;
