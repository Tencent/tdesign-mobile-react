import React, { useState } from 'react';
import { Overlay, Button } from 'tdesign-mobile-react';

import './style/index.less';

export default function Base() {
  const [visible, setVisible] = useState(false);

  return (
    <div>
      <Button size="large" block variant="outline" theme="primary" onClick={() => setVisible(true)}>
        基础用法
      </Button>
      <Overlay visible={visible} onClick={() => setVisible(false)} />
    </div>
  );
}
