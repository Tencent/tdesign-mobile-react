import React from 'react';
import { Navbar } from 'tdesign-mobile-react';
import { ChevronLeftIcon, CloseIcon, EllipsisIcon, NotificationIcon } from 'tdesign-icons-react';

const IconUsage = () => (
  <>
    <Navbar
      leftIcon={
        <>
          <ChevronLeftIcon style={{ marginRight: 8 }} />
          <CloseIcon />
        </>
      }
      rightIcon={<EllipsisIcon />}
    >
      标题
    </Navbar>
    <br />
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
