import React, { useState } from 'react';
import ImageViewer from '../ImageViewer';
import Button from '../../button/Button';
import Toast from '../../toast/Toast';

// 图片预览素材
const IMAGE_SOURCE = ['https://oteam-tdesign-1258344706.cos.ap-guangzhou.myqcloud.com/miniprogram/images/preview1.png'];

function Base() {
  // 是否显示图片预览
  const [imageViewerVisible, setImageViewerVisible] = useState(false);

  return (
    <div>
      {/* 预览 */}
      <ImageViewer
        images={IMAGE_SOURCE}
        visible={imageViewerVisible}
        onVisibleChange={setImageViewerVisible}
        onChange={(index) => Toast({ message: `翻到第 ${index} 页` })}
      ></ImageViewer>
      {/* 控制 */}
      <Button
        size="medium"
        variant="outline"
        shape="rectangle"
        block
        onClick={() => setImageViewerVisible(!imageViewerVisible)}
      >
        基础图片预览
      </Button>
    </div>
  );
}

export default Base;
