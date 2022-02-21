import React from 'react';
import { Grid, GridItem } from 'tdesign-mobile-react';

const imgUrl = 'https://tdesign.gtimg.com/mobile/%E5%9B%BE%E7%89%87.png'

export default function () {
  return <>
    <Grid gutter={0} column={2} align="left">
      <GridItem 
        description="说明文字" 
        layout="horizontal" 
        image={<img className='img-2 img-horizontal' src={imgUrl}/>}
        text={<div className='text-2'>标题文字</div>}
      />
      <GridItem 
        description="说明文字" 
        layout="horizontal" 
        image={<img className='img-2 img-horizontal' src={imgUrl}/>}
        text={<div className='text-2'>标题文字</div>}
      />
    </Grid>
  </>
}
