import React, { useState } from 'react';
import { ImageViewer, Button } from 'tdesign-mobile-react';

export default function Demo() {
  const [visible, setVisible] = useState(false);

  return (
    <div>
      <Button
        theme="primary"
        onClick={() => {
          setVisible(!visible);
        }}
      >
        {visible ? '隐藏' : '显示'}
      </Button>
      <ImageViewer
        visible={visible}
        onClose={() => setVisible(false)}
        images={[
          'https://imgcache.qq.com/open_proj/proj_qcloud_v2/rocket_images/1606728019829_yw760ok1jmpbep14i.png',
          'https://imgcache.qq.com/open_proj/proj_qcloud_v2/rocket_images/1606728019829_yw760ok1jmpbep14i.png',
          'https://imgcache.qq.com/open_proj/proj_qcloud_v2/rocket_images/1606728019829_yw760ok1jmpbep14i.png',
        ]}
      />
    </div>
  );
}
