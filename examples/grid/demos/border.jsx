import React from 'react';
import { Grid, GridItem } from 'tdesign-mobile-react';

const imgUrl = 'https://tdesign.gtimg.com/mobile/%E5%9B%BE%E7%89%87.png'

export default function () {
  return <>
        <div className='tdesign-grid-base'>
          <Grid gutter={0} column={3} border={true}>
            <GridItem
              image={<img className='img-3 img-vertical' src={imgUrl}/>}
              text={<div className='text-3'>标题文字</div>}
            />
            <GridItem
              image={<img className='img-3 img-vertical' src={imgUrl}/>}
              text={<div className='text-3'>标题文字</div>}
            />
            <GridItem
              image={<img className='img-3 img-vertical' src={imgUrl}/>}
              text={<div className='text-3'>标题文字</div>}
            />
          </Grid>
        </div>
  </>
}
