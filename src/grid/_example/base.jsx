import React from 'react';
import { Grid, GridItem } from 'tdesign-mobile-react';
import TDemoBlock from '../../../site/mobile/components/DemoBlock';
import TDemoHeader from '../../../site/mobile/components/DemoHeader';
import './style/index.less';

const imgUrl = 'https://tdesign.gtimg.com/mobile/%E5%9B%BE%E7%89%87.png';

export default function Base() {
  return (
    <div className="tdesign-mobile-demo">
      <TDemoHeader
        title="Grid 宫格"
        summary="用于功能入口布局，将页面或特定区域切分成若干等大的区块，形成若干功能入口。"
      />
      <TDemoBlock title="01 类型" summary="一行三个">
        <Grid column={3}>
          <GridItem image={imgUrl} text="标题文字" />
          <GridItem image={imgUrl} text="标题文字" />
          <GridItem image={imgUrl} text="标题最多六字" />
        </Grid>
      </TDemoBlock>
      <TDemoBlock summary="一行四个">
        <Grid>
          <GridItem image={imgUrl} text="标题文字" />
          <GridItem image={imgUrl} text="标题文字" />
          <GridItem image={imgUrl} text="标题文字" />
          <GridItem image={imgUrl} text="标题五字内" />
        </Grid>
      </TDemoBlock>
      <TDemoBlock summary="一行五个">
        <Grid column={5}>
          <GridItem image={imgUrl} text="标题文字" />
          <GridItem image={imgUrl} text="标题文字" />
          <GridItem image={imgUrl} text="标题文字" />
          <GridItem image={imgUrl} text="标题文字" />
          <GridItem image={imgUrl} text="最多四字" />
        </Grid>
      </TDemoBlock>

      <TDemoBlock title=" " summary="一行二个带说明宫格">
          <Grid column={2}>
            <GridItem image={imgUrl} layout="horizontal" text="标题文字" description="说明文字" />
            <GridItem image={imgUrl} layout="horizontal" text="标题最多六字" description="说明文字最多八字" />
          </Grid>
      </TDemoBlock>

      <TDemoBlock title=" " summary="一行三个带说明宫格">
        <Grid column={3}>
          <GridItem image={imgUrl} text="标题文字" description="说明文字" />
          <GridItem image={imgUrl} text="标题文字" description="说明文字" />
          <GridItem image={imgUrl} text="标题最多六字" description="说明最多六字" />
        </Grid>
      </TDemoBlock>

      <TDemoBlock title=" " summary="带徽标宫格">
        <div className="grid-demo">
          <Grid>
            <GridItem image={imgUrl} text="标题文字" badgeProps={{ dot: true }} />
            <GridItem image={imgUrl} text="标题文字" badgeProps={{ count: 8 }} />
            <GridItem image={imgUrl} text="标题五字内" badgeProps={{ count: 'New' }} />
            <GridItem image={imgUrl} text="标题五字内" badgeProps={{ count: '···' }} />
          </Grid>
        </div>
      </TDemoBlock>
    </div>
  );
}
