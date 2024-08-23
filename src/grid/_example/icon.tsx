import React from 'react';
import { Grid, GridItem } from 'tdesign-mobile-react';
import { Icon } from 'tdesign-icons-react';

import './style/index.less';

export default function () {
  const iconNode = (iconName) => (
    <div className="icon-wrapper">
      <Icon name={iconName} size={24} />
    </div>
  );
  return (
    <>
      <Grid column={4} className={'grid-demo'}>
        <GridItem text="分享" image={iconNode('share')} />
        <GridItem text="收藏" image={iconNode('star')} />
        <GridItem text="保存" image={iconNode('download')} />
        <GridItem text="编辑" image={iconNode('edit')} />
      </Grid>
    </>
  );
}
