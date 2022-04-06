import React from 'react';
import TDemoBlock from '../../../site/mobile/components/DemoBlock';
import TDemoHeader from '../../../site/mobile/components/DemoHeader';
import { Image } from 'tdesign-mobile-react';
import { LoadingIcon } from 'tdesign-icons-react';
import './style/index.less';

export default function Base() {
  return (
    <>
      <TDemoHeader title="Image 图片" summary="用于展示效果，主要为上下左右居中裁切、拉伸、平铺等方式。" />
      <TDemoBlock title="01 类型" summary="裁切样式">
        <div className="t-image__demo-base">
          <div className="t-image__demo-wrap">
            <Image src="https://tdesign.gtimg.com/site/upload1.png" fit="cover" style={{ width: 72, height: 72 }} />
            <h5>裁切</h5>
          </div>
          <div className="t-image__demo-wrap">
            <Image src="https://tdesign.gtimg.com/site/upload1.png" fit="contain" style={{ width: 89, height: 72 }} />
            <h5>适应高</h5>
          </div>
          <div className="t-image__demo-wrap">
            <Image src="https://tdesign.gtimg.com/site/upload1.png" fit="fill" style={{ width: 134, height: 72 }} />
            <h5>拉伸</h5>
          </div>
        </div>
      </TDemoBlock>

      <TDemoBlock summary="圆角样式">
        <div className="t-image__demo-base">
          <div className="t-image__demo-wrap">
            <Image src="https://tdesign.gtimg.com/site/upload1.png" shape="square" style={{ width: 72, height: 72 }} />
            <h5>方形</h5>
          </div>
          <div className="t-image__demo-wrap">
            <Image src="https://tdesign.gtimg.com/site/upload1.png" shape="round" style={{ width: 72, height: 72 }} />
            <h5>圆角方形</h5>
          </div>
          <div className="t-image__demo-wrap">
            <Image src="https://tdesign.gtimg.com/site/upload1.png" shape="circle" style={{ width: 72, height: 72 }} />
            <h5>圆角</h5>
          </div>
        </div>
      </TDemoBlock>

      <TDemoBlock title="02 状态" summary="加载中提示">
        <div className="t-image__demo-base">
          <div className="t-image__demo-wrap">
            <Image src="" style={{ width: 72, height: 72 }} />
            <h5>默认提示</h5>
          </div>
          <div className="t-image__demo-wrap">
            <Image src="" loading={<LoadingIcon size="1.5em" />} style={{ width: 72, height: 72 }} />
            <h5>自定义提示</h5>
          </div>
        </div>
      </TDemoBlock>
      <TDemoBlock summary="加载失败提示">
        <div className="t-image__demo-base">
          <div className="t-image__demo-wrap">
            <Image src="https://tdesign.gtimg.com/site/upload111.png" style={{ width: 72, height: 72 }} />
            <h5>默认提示</h5>
          </div>
          <div className="t-image__demo-wrap">
            <Image
              src="https://tdesign.gtimg.com/site/upload1111.png"
              error={<span style={{ fontSize: 12 }}>加载失败</span>}
              style={{ width: 72, height: 72 }}
            />
            <h5>自定义提示</h5>
          </div>
        </div>
      </TDemoBlock>

      <TDemoBlock title="03 规格" summary="常用图片尺寸">
        <div className="t-image__demo-size">
          <div className="t-image__demo-wrap">
            <Image src="https://tdesign.gtimg.com/site/upload1.png" style={{ width: 56, height: 56 }} />
            <h5>图片 56</h5>
          </div>

          <div className="t-image__demo-wrap">
            <Image src="https://tdesign.gtimg.com/site/upload1.png" style={{ width: 48, height: 48 }} />
            <h5>图片 48</h5>
          </div>

          <div className="t-image__demo-wrap">
            <Image src="https://tdesign.gtimg.com/site/upload1.png" style={{ width: 32, height: 32 }} />
            <h5>图片 32</h5>
          </div>

          <div className="t-image__demo-wrap">
            <Image src="https://tdesign.gtimg.com/site/upload1.png" style={{ width: 24, height: 24 }} />
            <h5>图片 24</h5>
          </div>
          <div className="t-image__demo-wrap">
            <Image src="https://tdesign.gtimg.com/site/upload1.png" style={{ width: 120, height: 120 }} />
            <h5>图片 120</h5>
          </div>

          <div className="t-image__demo-wrap">
            <Image src="https://tdesign.gtimg.com/site/upload1.png" style={{ width: 72, height: 72 }} />
            <h5>图片 72</h5>
          </div>
        </div>
      </TDemoBlock>
    </>
  );
}
