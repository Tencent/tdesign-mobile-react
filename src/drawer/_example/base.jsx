import React, { useState } from 'react';
import { Drawer, Button } from 'tdesign-mobile-react';
import './style/index.less';

export default function Base() {
  const [openBase, setOpenBase] = useState(false);

  return (
    <div className="button-demo">
      <Button
        size="large"
        variant="outline"
        shape="round"
        onClick={() => {
          setOpenBase(!openBase);
        }}
      >
        基础抽屉
      </Button>
      <Drawer visible={openBase} />
    </div>
  );
}
