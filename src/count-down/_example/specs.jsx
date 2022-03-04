import React from 'react';
import { CountDown } from 'tdesign-mobile-react/count-down';

import TDemoBlock from '../../../docs/mobile/components/DemoBlock';

export default function () {
  return (
    <>
      <TDemoBlock title="规格">
        <CountDown time={900000} />
      </TDemoBlock>
    </>
  );
}
