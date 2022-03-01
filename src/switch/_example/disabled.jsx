import { Switch } from 'tdesign-mobile-react';
import TDemoBlock from '../../../docs/mobile/components/DemoBlock';

export default function () {
  return (
    <TDemoBlock title="禁用状态">
      <Switch disabled />
      <Switch defaultValue={true} disabled />
    </TDemoBlock>
  );
}
