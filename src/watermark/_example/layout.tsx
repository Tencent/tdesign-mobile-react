import React from 'react';
import { Watermark } from 'tdesign-mobile-react';

export default function LayoutWatermark() {
  return (
    <>
      <div className="summary">Rectangular Grid 矩形布局</div>
      <Watermark watermarkContent={{ text: '文字水印' }} width={120} height={60} y={120} x={80}>
        <div style={{ height: 300 }}></div>
      </Watermark>

      <div className="summary">Hexagonal Grid 六边形网格</div>
      <Watermark watermarkContent={{ text: '文字水印' }} width={120} height={60} y={120} x={80} layout="hexagonal">
        <div style={{ height: 300 }}></div>
      </Watermark>
    </>
  );
}
