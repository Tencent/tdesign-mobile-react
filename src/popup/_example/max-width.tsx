import React, { useState } from 'react';
import { Popup, Button } from 'tdesign-mobile-react';

export default function MaxWidth() {
  const [visible, setVisible] = useState(false);

  return (
    <div style={{ padding: '0 16px' }}>
      <Button block variant="outline" theme="primary" onClick={() => setVisible(true)}>
        自定义最大宽度
      </Button>
      <Popup visible={visible} onVisibleChange={setVisible} placement="bottom" maxWidth={600} closeBtn>
        <div style={{ padding: '32px 24px' }}>
          <h3>自定义最大宽度</h3>
          <p style={{ margin: '16px 0 24px' }}>
            宽屏下最大宽度为 600px 并水平居中，窄屏下保持全宽。不传 maxWidth 时保留原有布局。
          </p>
          <Button block theme="primary" onClick={() => setVisible(false)}>
            关闭
          </Button>
        </div>
      </Popup>
    </div>
  );
}
