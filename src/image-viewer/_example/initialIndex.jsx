import React, { useState } from 'react';
import ImageViewer from '../ImageViewer';
import Button from '../../button/Button';

// 图片预览素材
const IMAGE_SOURCE = ['https://oteam-tdesign-1258344706.cos.ap-guangzhou.myqcloud.com/miniprogram/images/preview3.png'];

function Index() {
  // 是否显示图片预览
  const [imageViewerVisible, setImageViewerVisible] = useState(false);

  return (
    <div>
      {/* 预览 */}
      <ImageViewer
        images={IMAGE_SOURCE}
        visible={imageViewerVisible}
        onVisibleChange={setImageViewerVisible}
      ></ImageViewer>
      {/* 控制 */}
      <Button
        size="medium"
        variant="outline"
        shape="rectangle"
        block
        onClick={() => setImageViewerVisible(!imageViewerVisible)}
      >
        图片超高情况
      </Button>
    </div>
  );
}

export default Index;
