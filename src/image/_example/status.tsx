import React from 'react';
import { Image, Loading } from 'tdesign-mobile-react';

export default function RoundDemo() {
  return (
    <>
      <div className="row">
        <div className="col">
          <p className="tips">加载默认提示</p>
          <Image className="image-container" shape="round" />
        </div>
        <div className="col">
          <p className="tips">加载自定义提示</p>
          <Image className="image-container" shape="round" loading={<Loading />} />
        </div>
      </div>
      <div className="row">
        <div className="col">
          <p className="tips">失败默认提示</p>
          <Image className="image-container" src="x" shape="round" />
        </div>
        <div className="col">
          <p className="tips">失败自定义提示</p>
          <Image
            className="image-container"
            src="x"
            shape="round"
            error={<span style={{ fontSize: 12 }}>加载失败</span>}
          />
        </div>
      </div>
    </>
  );
}
