import React from 'react';
import { Cell, CellGroup } from 'tdesign-mobile-react';

const imgUrl = 'https://tdesign.gtimg.com/mobile/%E5%9B%BE%E7%89%87.png';

const imgUrl2 = 'https://tdesign.gtimg.com/mobile/demos/avatar_1.png';

export default function () {
  return (
    <div className="tdesign-grid-base">
      <CellGroup>
        <Cell title="多行标题" description="一段很长很长的内容文字" />
        <Cell title="多行带图标" description="一段很长很长的内容文字" arrow leftIcon="app" />
        <Cell
          title="多行带头像"
          description="一段很长很长的内容文字"
          image={<img src={imgUrl2} width={48} height={48} style={{ borderRadius: '50%' }} />}
          arrow
        />
        <Cell
          title="多行带图片"
          description="一段很长很长的内容文字"
          image={<img src={imgUrl} width={56} height={56} />}
        />
        <Cell title="多行标题" description="一段很长很长的内容文字，长文本自动换行，该选项的描述是一段很长的内容" />
        <Cell
          title="多行高度不定，长文本自动换行，该选项的描述是一段很长的内容"
          description="一段很长很长的内容文字，长文本自动换行，该选项的描述是一段很长的内容一段很长很长的内容文字，长文本自动换行，该选项的描述是一段很长的内容"
        />
      </CellGroup>
    </div>
  );
}
