import { Switch } from 'tdesign-mobile-react';
import TDemoBlock from '../../../site/mobile/components/DemoBlock';

export default function () {
  return (
    <TDemoBlock title="基础开关">
      <Switch />
      <Switch defaultValue={true} />
    </TDemoBlock>
  );
}
