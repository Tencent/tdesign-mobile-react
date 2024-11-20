import React, { useState } from 'react';
import { Toast } from 'tdesign-mobile-react';
import ImageViewer from '../ImageViewer';
import Button from '../../button/Button';

// 图片预览素材
const IMAGE_SOURCE = [
  'https://oteam-tdesign-1258344706.cos.ap-guangzhou.myqcloud.com/miniprogram/images/preview1.png',
  'https://oteam-tdesign-1258344706.cos.ap-guangzhou.myqcloud.com/miniprogram/images/preview3.png',
  'https://oteam-tdesign-1258344706.cos.ap-guangzhou.myqcloud.com/miniprogram/images/preview2.png',
];

function ImageList() {
  // 是否显示图片预览
  const [imageViewerVisible, setImageViewerVisible] = useState(false);

  return (
    <div>
      {/* 预览 */}
      <ImageViewer
        images={IMAGE_SOURCE}
        visible={imageViewerVisible}
        showIndex={true}
        initialIndex={2}
        deleteBtn={true}
        closeBtn={true}
        onVisibleChange={setImageViewerVisible}
        onChange={(index) => Toast({ message: `翻到第 ${index} 页` })}
        onClose={(trigger, visible, index) => console.log('close', trigger, visible, index)}
        onDelete={(index) => Toast({ message: `删除第 ${index} 页` })}
      ></ImageViewer>
      {/* 控制 */}
      <Button
        size="medium"
        variant="outline"
        shape="rectangle"
        block
        onClick={() => setImageViewerVisible(!imageViewerVisible)}
      >
        有删除操作
      </Button>
    </div>
  );
}

export default ImageList;
