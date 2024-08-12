import React, { useState } from 'react';
import { Overlay, Button } from 'tdesign-mobile-react';

import './style/index.less';

export default function Base() {
  const [visible, setVisible] = useState(false);

  const handleVisible1Change = () => {
    setVisible(false);
  };

  return (
    <div>
      <Button size="large" block variant="outline" theme="primary" onClick={() => setVisible(true)}>
        基础用法
      </Button>
      <Overlay visible={visible} duration={0} onClick={handleVisible1Change} />
    </div>
  );
}
